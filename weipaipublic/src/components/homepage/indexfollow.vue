<template>
    <div class="parent-item" id="indexfollow" data-indexfollow="true">
    	<!-- 关注列表 -->
    	<details-list v-if="dataList.length != '0'" :details="dataList" @WxShareConfig="wxShareFun" @countDown="bidSuccess"></details-list>
    	
    	<!-- 无关注商品 -->
    	<div class="no-data" v-if="dataList.length == '0'">
    		<div class="no-data-img">
    			<img src="../../assets/img/index_start.png" alt="">
    		</div>
    		<div class="no-data-text">关注的店铺太少了</div>
    		<router-link to="/classify" class="no-data-link">逛逛其他商品</router-link>
    	</div>

    	<!-- 微信分享 -->
    	<wx-share :message="wxShareObj"></wx-share>
    </div>
</template>
<script>
    import detailslist from '@/components/component/details-list'
    import sharePage from '@/components/component/shareSub'
    import ajax from 'assets/js/ajax';
    import utils from 'assets/js/utils'
    export default {
		data:function(){
			return {
		        /* num:"current"*/
                keynum: true,
                loading: false,          // 加载
                page: 1,                 // 当前页数
                dataList: [],
                timeCountDownId: [],     // 倒计时数组 
                clearCountDownArr: {},    // 清空倒计时对象
			    wxShareObj: {},
                logoImg: require("../../assets/img/share_logo.jpg"),
            }    
		},
        props: ['list'],
        created: function() {
            // 微信分享
            this.wxShareObj.title = "小福拍--移动竞拍领航者";
            this.wxShareObj.images = this.logoImg; 
            this.wxShareObj.url = location.href;
            this.wxShareObj.desc = "手边的珍宝库，全品类艺术品，随时随地竞拍！";
            this.hotlist()
        },
		mounted: function(){
            document.title="小福拍";
            var _this = this;

            // 链接样式
            this.addRouterLink()

            this.getFollowData()

            this.$nextTick(function(){
                if (this.dataList.length == 0) {
                    $('.loading').hide()
                };
            })
		},
		components: {
            'details-list': detailslist,
            'wx-share' : sharePage
        },
        methods: {
            wxShareFun: function(options) {
                console.log(options)
                var firstClass = options.typename;
                this.wxShareObj.images = options.images; 
                this.wxShareObj.imgType = options.type;
                this.wxShareObj.url = options.link;
                this.wxShareObj.type = true;

                switch(firstClass){
                    case '书画篆刻':
                        this.wxShareObj.title = "我推荐一件艺术品正在热拍";
                        this.wxShareObj.desc = options.desc;
                        break;
                    default: // 默认文案
                        this.wxShareObj.title = "我在【小福拍】发现了一个好物件，正在热拍中......";
                        this.wxShareObj.desc = options.desc;
                };
                location.hash = options.id;
            },

            //下拉加载
            hotlist: function(){
                var that = this;
                $(window).unbind();
                $(window).scroll(function(){
                    if($("#indexfollow").attr("data-indexfollow")){
                        var hcon=$(document).height()-$(window).height()-200;
                        var hdiv=$(".swiper-container").height();
                        var scroll=$(this).scrollTop();
                        if(scroll>hcon&&that.keynum){
                            that.getFollowData();
                        }
                        scroll>1?$(".backtop").show():$(".backtop").hide();
                        scroll>hdiv? $(".index-nav-in").addClass("index-nav-fixed"): $(".index-nav-in").removeClass("index-nav-fixed");
                    }
                });
            },

            // 路由改变
            addRouterLink: function() {
                $(".footer-bottom a").eq(0).addClass("router-link-active");
            },
            
            // 出价成功回调
            bidSuccess: function(param) {
                // 接收后端传过来的数据
                var id = param.id;
                var index = $('.goods-id'+id).attr('data-index');
                this.timeCountDownId.push({
                    id:        param.id,
                    startTime: param.starttime,
                    endTime:   param.endtime
                })
                clearInterval(this.clearCountDownArr['time_down_'+id])
                this.createCoundown()
            },

            // 创建倒计时
            createCoundown: function() {
                var _this = this;
                setTimeout(function(){
                    // 为每个item添加倒计时
                    if(_this.timeCountDownId) {
                        $.each(_this.timeCountDownId, function(e){
                            // 触发倒计时
                            var timer = 'time_down_' + this.id;
                            var alarm = _this.emitCountDown($("#time_down_"+this.id),this.startTime,this.endTime);

                            _this.clearCountDownArr[timer] = alarm.flag;

                            delete _this.timeCountDownId[e];
                        });
                    }
                },100)
                
            },
            /**
             * 倒计时触发
             * @param  {object} obj          倒计时触发
             * @param  {number} startTime    开始时间戳
             * @param  {number} endTime      结束时间戳
             * @return {object} alarm        倒计时实例
             */
            emitCountDown: function(obj,startTime,endTime) {

                var alarm = new utils.Alarm(startTime, endTime, function (second, minute, hour, day) { //计时钟
                        if (hour > 24) {
                            obj.find('.follow-time .cutdown-timebox').html('<span>'+hour+'</span>时<span>'+minute+'</span>分<span>'+second+'</span>秒' );
                        } else {
                            obj.find('.follow-time .cutdown-timebox').html('<span>'+hour+'</span>时<span>'+minute+'</span>分<span>'+second+'</span>秒' );
                        }
                    }, function () { //倒计时结束
                    
                        obj.find('.follow-time').parent(".cutdown-box").hide();
                        obj.find('.follow-time').parent(".cutdown-box").siblings(".grey").show();
                        
                        // 移除当前元素
                        obj.parents('.follow-item').remove();
                });
                alarm.start();
                return alarm;
            },

            // 固定顶部
            scolle: function(){//滚动事件
                $(window).unbind();
                $(window).scroll(function(){
                    var hdiv=$(".swiper-container").height();
                    var scroll=$(document).scrollTop();
                    scroll>1?$(".backtop").show():$(".backtop").hide();
                    scroll>hdiv? $(".index-nav-in").addClass("index-nav-fixed"): $(".index-nav-in").removeClass("index-nav-fixed");
                });
            },

            // 获取页面数据
            getFollowData: function() {
                var that = this;
                var endTime;
                ajax.getFollowList(that.page,function(data){
                    if (data.status == 200) {
                        that.timeCountDownId = [];
                        that.loading = true;
                        that.page++;

                        for(var i=0; i<data.data.length; i++){
                            if (data.data[i].images) {
                                // 格式化商品
                                data.data[i].images = JSON.parse( data.data[i].images )
                            };
                            if (data.data[i].thumb) {
                                // 格式化头像
                                data.data[i].thumb = JSON.parse( data.data[i].thumb )
                            };
                           
                            

                            that.dataList.push(data.data[i]);

                            // 判定开始时间还是截止时间
                            var status = data.data[i].status;
                            if (status == 8) { // 截拍倒计时
                                endTime = data.data[i].begin_time;
                            } else {// 开拍倒计时
                                endTime = data.data[i].end_time;
                            }

                            that.timeCountDownId.push( {
                                id: data.data[i].id,
                                startTime: data.data[i].nowTime,
                                endTime: endTime
                            } )
                            that.$nextTick(function() {
                                // 微信预览图片
                                utils.wxPreviewImage($('.follow-item .list-img img'),'.list-img');
                            })
                            that.loading = false;
                        }

                        // 更新完dom后
                        that.$nextTick(function(){
                            that.createCoundown()
                        })
                    } else {
                        $('.loading').find('img').hide();
                        $('.loading').find('p').show()
                    }
                })
            },
        }
	}

</script>
<style>
/* 首页引导 */
.parent-item {
    margin-top: 1rem;
}
.no-data {
	text-align: center;
}

.no-data-img {
	width: 17.35rem;
	height: 12.5rem;
	margin: 0 auto;
	margin-top: 3rem;
}
.no-data-img img {
	width: 100%;
	height: 100%;
}

.no-data-text {
	margin-top: 4.5rem;
	font-family: PingFangSC;
	font-size: 1.4rem;
	color: #999;
}

.no-data-link {
	display: block;
	width: 17.1rem;
	height: 3.6rem;
	margin: 0 auto;
	margin-top: 2rem;
	line-height: 3.6rem;
	border-radius: .5rem;
	border: .05rem solid #999;
	font-size: 1.6rem;
	font-family: PingFangSC;
	color: #666;
}
.index-follow-margin {
	margin-bottom: 5rem;
}

.follow-content {
	/* main绝对定位，进行内部滚动 */
	position: absolute;
	top: 17rem;
	left: 0;
	width: 100%;
	height: 100%;
	/* 使之可以滚动 */
	overflow-y: scroll;
  	/* 增加该属性，可以增加弹性，是滑动更加顺畅 */
  	-webkit-overflow-scrolling: touch;   
}

.follow-list .follow-time span {
    color: #ad1a1a!important;
}
</style>
