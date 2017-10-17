<template>
<div class="index-hot" id="indexhot" data-indexhot="true">
	<div class="swiper-container swiper-container-horizontal index-hot-list" v-for="num in hotList" :id="'swiper'+num.user_id">
		<!-- 店铺信息 -->
        <div class="clearfix img-name">
            <router-link :to="'/shops/'+num.user_id + '?type=2'" class="fl img-author clearfix">
                <img :src="num.useImg" class="author-image fl">
                <div class="img-name-eles">
                    <div class="icon-box clearfix">
                        <span class="spritesmap user-level fl" :class="'s' + num.rank"></span>
                    </div>
                    <p class="img-name-text">{{num.nick}}</p>
                </div> 
                <div class="img-info-else">
                    <span>
                        <span class="dibvam spritesmap score_icon"></span>
                        <span class="icon-list-text">{{ parseFloat(num.average_mark).toFixed(2) }}分</span>
                    </span>
                    <span v-if="num.is_apply">
                        <span class="dibvam spritesmap auth-user" :class="{'personal': num.is_apply==1,'shop': num.is_apply==2}"></span>
                        <span class="icon-list-text">个人认证</span>
                    </span>
                    <span v-if="num.student">
                        <span class="dibvam spritesmap" :class="{'student_ident':num.student ==1,'':num.student ==0}"></span>
                        <span class="icon-list-text">{{ num.category_name }}</span>
                    </span>
                </div>
            </router-link>
            <div class="img-author-follow shotsprites author-follow fr" @click="follow($event)" :id="'userid_'+num.user_id" :data-id="num.user_id" :class="{'already-follow':num.fowstate}">
            </div>
        </div>
        <!-- 店铺信息结束 -->
        <div class="swiper-wrapper-box">
            <!-- 拍品轮播 -->
            <ul class="swiper-wrapper">
                <li class="swiper-slide re" v-for="key in num.good">
                    <router-link 
                        v-if="key.thumb.type == 'img'"
                        :to="'/lotdetails/'+key.id" 
                        class="divbg list-img" 
                    >
                        <img 
                            class="lazy js_picLazy" 
                            src="../../assets/img/xiaofupai_hot.png"
                            :data-original="baseUrl + key.thumb.url + '?x-oss-process=image/resize,w_800'"
                            alt=""
                        />
                    </router-link>
                    <router-link 
                        v-if="key.thumb.type == 'video'"
                        :to="'/lotdetails/'+key.id" 
                        class="list-img video-box"  
                    >   
                        <span class="video-play-rectangle">
                            <i class="shotsprites video-play-rectangle-icon"></i>
                        </span>
                        <video :src="baseUrlVideo + key.thumb.url" :poster="videoPost" style="object-fit: fill;"></video>
                    </router-link>
                    <div class="img-desc">{{ key.desc }}</div>
                    <div class="img-explain clearfix">
                        <div class="fl money">当前<span>￥{{key.current_price}}</span></div>
                        <div class="fl num" v-if="key.bidnum">已有{{key.bidnum}}人出价</div>
                        <div class="fr imglike" :data-id="key.id" :class="{'imglikecur':key.likestatus}">{{key.likes}}</div>
                        <div class="fr imgbrowse">{{key.views}}</div>
                    </div>
                </li>
            </ul>
            <!-- 拍品轮播结束 -->
        </div>        
		<div class="swiper-pagination swiper-pagination-clickable" :id="'dot'+num.user_id"></div>
	</div>

	<!-- 微信分享 -->
	<wx-share :message="wxShareObj"></wx-share>
    
    <!-- 弹窗组件 -->
    <show-confirm 
      v-show="showConf" 
      :msg="tipMsg" 
      :data-userid="goodsIdByfollow"  
      :data-followstate="0"
      @closeBox="closeBox" 
      @childEvent="cancelAttention"
    ></show-confirm>    
</div>

</template>
<script>
    import sharePage from '@/components/component/shareSub'
    import showConfirm from '@/components/component/showConfirm'

    import Swiper from 'swiper'

    import ajax from 'assets/js/ajax'
    import utils from 'assets/js/utils'
    var config = window.config;
    
    export default {
    	data:function(){
    		return {
                whetherFollow: true,
                // 取消关注弹窗
                showConf: false,
                tipMsg: '是否取消关注',
                goodsIdByfollow: '',
                hotList:[],
                keynum:true,
                page:1,
                divname:[],
                keyfollow:"已关注",
                notfollow:"+关注",
                baseUrl: window.config.img_url,
                baseUrlVideo: "http://xfpvideoupload.oss-cn-beijing.aliyuncs.com/", // 视频未转码
                wxShareObj: {},
                isHaveOss: false, // 是否添加了oss后缀

                videoPost: require("../../assets/img/video_ns_2.jpg"),
                logoImg: require("../../assets/img/share_logo.jpg"),
    		}
    	},
        
        components: {
            'wx-share': sharePage,
            'show-confirm': showConfirm
        },
        mounted : function(){
            document.title="小福拍";
            // 无数据
            this.$nextTick(function(){
                utils.picCenter(".js_picLazy",'data-original');

                var scrollTop = window.localStorage.getItem('indexhot_scroll_top') || 0;
                
                $(document).scrollTop(scrollTop);
            })
           
            // $('.index-nav-in').removeClass('index-nav-fixed')
        },
        created: function() {
            // 微信分享
            this.wxShareObj.title = "小福拍--移动竞拍领航者";
            this.wxShareObj.images = this.logoImg; 
            this.wxShareObj.url = location.href;
            this.wxShareObj.desc = "手边的珍宝库，全品类艺术品，随时随地竞拍！";

            var indexHotList = window.localStorage.getItem('indexhot_hot_list');
            
            // 点了关注就不再使用缓存
            this.whetherFollow = window.localStorage.getItem('whether_follow');
            window.localStorage.removeItem('whether_follow');

            // 当前时间 
            var nowTimeStamp = new Date().getTime();
            var lastTimeStamp = window.localStorage.getItem('indexhot_time_stamp');
            var timeDiff = nowTimeStamp - lastTimeStamp;

            if (indexHotList && this.whetherFollow != 'false' && timeDiff < 1000*60*5 ) {                 
                this.hotList = JSON.parse( indexHotList );    
                this.page = window.localStorage.getItem('indexhot_page');
                // 使用完删除
                this.removeCookie()
            };
               
            
            this.listData();
            this.hotlist();//下拉刷新

        },
        beforeDestroy: function() {
            var hotlistJson = JSON.stringify(this.hotList)
            var scrollHeight = $(document).scrollTop();
            // 记录滚动位置
            var timeStamp = new Date().getTime();
            window.localStorage.setItem('indexhot_time_stamp',timeStamp);
            window.localStorage.setItem('indexhot_scroll_top',scrollHeight);
            window.localStorage.setItem('indexhot_hot_list',hotlistJson );
            window.localStorage.setItem('indexhot_page',this.page);
        },
        methods: {
            // 移除浏览数据
            removeCookie: function() {
                window.localStorage.removeItem('indexhot_scroll_top');
                window.localStorage.removeItem('indexhot_hot_list');
                window.localStorage.removeItem('indexhot_page'); 
                window.localStorage.removeItem('indexhot_time_stamp'); 
            },

            hotlist: function(){//下拉加载
                var that = this;
                //$(window).unbind();
                $(window).scroll(function(){
                    if($("#indexhot").attr("data-indexhot")){
                        var hcon=$(document).height()-$(window).height()-200;
                        var hdiv=$(".swiper-container").height();
                        var scroll=$(this).scrollTop();
                        if(scroll>hcon&&that.keynum){
                            that.listData();
                            setTimeout(function(){
                                utils.picCenter(".js_picLazy",'data-original')
                            },500)
                            
                        }
                        scroll>1?$(".backtop").show():$(".backtop").hide();
                        scroll>hdiv? $(".index-nav-in").addClass("index-nav-fixed"): $(".index-nav-in").removeClass("index-nav-fixed");
                    }
                });
            },
            listData: function(){//ajax请求数据
                var that=this;
                that.divname=[];
                that.keynum=false;
                ajax.hotList(that.page,function(data){
                    if(data.status==200){
                        for(var i=0; i<data.data.length; i++){
                            // if (data.data[i].good.length > 6) {
                            //     data.data[i].good.length = 6;
                            // }; 
                            if (data.data[i].good.length != 0) {
                                data.data[i].good.length = 1;  
                            };
                            for (var j = 0; j < data.data[i].good.length; j++) {
                                if (!data.data[i].good[j].thumb) {
                                    data.data[i].good[j].thumb = {
                                        type: '',
                                        url: ''
                                    }
                                }
                            };
                            that.hotList.push(data.data[i] );
                            that.divname.push(data.data[i].user_id);
                        }
                        
                        // 轮播图
                        that.$nextTick(function(){
                            that.slide();
                            that.heart();
                        });
                        that.page++;
                        that.keynum=true;
                    }else{
                        that.$nextTick(function() {
                            $(".loading img").hide();
                            $(".loading p").show();    
                        })
                        
                    }
                });
            },
            heart:function(){//点赞
                $(".imglike").unbind();
                var _this=this;
                $(".imglike").click(function(){
                    var judge=$(this).hasClass("imglikecur");//判断是否点赞  judge 为true是已点赞  为false 没有点赞
                    var id=$(this).attr("data-id");
                    var that=this;
                    if(!judge){
                        ajax.userLike(id,function(data){//200成功  502点赞成功   关注失败
                            //console.log(data)
                            if(data.status=="200"){
                                //console.log(2)
                                _this.picturelike(that);
                                $(that).parents(".swiper-wrapper").siblings(".img-name").find(".author-follow").addClass("already-follow").text("已关注");
                            }else if(data.status=="502"){
                                _this.picturelike(that);
                            }
                        });
                    }
                });
            },
            cancelAttention: function(ev) {
                var _this  = this;
                var $confirm  = $('#show-confirm');
                var state = $confirm.attr('data-followstate');
                var userId = $confirm.attr('data-userid');
                var $node = $('#userid_'+userId);
                var isIcon = $node.text();
                ajax.followState(state,userId,(data) => {
                    if(data.status=="502") {
                        alert("未登录")
                    } else if(data.status=="503"){
                        alert("关注失败")
                    } else if(data.status=="200"){
                        // 同步本地数据
                        if (isIcon) {
                          $node.text("+关注")
                        };
                        $node.removeClass("already-follow").addClass("author-follow");
                        $('.goods_item_' + userId).find('.goods_item_follow').removeClass("already-follow").addClass("author-follow");
                        utils.createAttentionEle(1)
                    } else {
                        alert(data.msg)
                    }
                });
            },

            // 关闭弹窗
            closeBox: function() {
                this.showConf = false;
            },

            // 关注
            follow:function(event){
                window.localStorage.setItem('whether_follow','false');
                utils.follow(event,(event) => {
                    // 弹窗
                    this.goodsIdByfollow = $(event.target).attr('data-id');
                    this.showConf = true;
                });
            },

            slide:function(){//轮播图
               for(var i=0; i<this.divname.length; i++){
                    var num=$("#swiper"+this.divname[i]+" .swiper-wrapper li").length//判断li的长度
                    if(num>1){
                        var swiper = new Swiper("#swiper"+this.divname[i],{
                            autoplayDisableOnInteraction : false,
                            setWrapperSize :true,
                            roundLengths : true,
                            loop:true,
                            pagination :"#dot"+this.divname[i],
                            paginationClickable :true,
                        });
                   }
                }
            },
            picturelike:function(that){
                var html=parseInt($(that).text())+1;//当前点赞数加一
                var num=parseInt($(that).siblings(".imgbrowse").text())+1;//当前浏览数加一
                var heartnum=$(that).parents(".swiper-slide").siblings().length;//li的长度
                var parentsindex=$(that).parents(".swiper-slide").index();//当前li的索引
                if(parentsindex=="0"){
                    $(that).parents(".swiper-wrapper").children(".swiper-slide").eq(heartnum-1).find(".imglike").addClass("imglikecur").text(html);
                    $(that).parents(".swiper-wrapper").children(".swiper-slide").eq(heartnum-1).find(".imgbrowse").text(num);
                }else if(parentsindex=="1"){
                    $(that).parents(".swiper-wrapper").children(".swiper-slide").eq(heartnum).find(".imglike").addClass("imglikecur").text(html);
                    $(that).parents(".swiper-wrapper").children(".swiper-slide").eq(heartnum).find(".imgbrowse").text(num);
                }else if(parentsindex==heartnum-1){
                    $(that).parents(".swiper-wrapper").children(".swiper-slide").eq(0).find(".imglike").addClass("imglikecur").text(html);
                    $(that).parents(".swiper-wrapper").children(".swiper-slide").eq(0).find(".imgbrowse").text(num);
                }else if(parentsindex==heartnum){
                    $(that).parents(".swiper-wrapper").children(".swiper-slide").eq(1).find(".imglike").addClass("imglikecur").text(html);
                    $(that).parents(".swiper-wrapper").children(".swiper-slide").eq(1).find(".imgbrowse").text(num);
                }
                $(that).text(html);
                $(that).siblings(".imgbrowse").html(num);
                $(that).addClass("imglikecur");
                
            }
        }
    }

</script>
<style scoped>
/* 列表 */
.index-hot{
	overflow-y: auto;
}

.swiper-wrapper-box {
    position: relative;
}
.img-name {
    position: relative;
    /*height: 5.6rem;*/
    /*height: 3.5rem;*/
    margin-top: 1.2rem;
    background-color: #fff;
}
.img-name-text {
	display:inline-block;
    vertical-align: middle;
	width: 20rem;
	white-space:nowrap; 
	overflow:hidden; 
	text-overflow:ellipsis;
}
.icon-box {
    display: inline-block;
    vertical-align: middle;
}

.auth-user img {
    width: 100%;
    height: 100%;
}

.index-hot-list .img-author{
    display: inline-block;
    height: 5rem;
    /*line-height: 3.5rem;*/
    /*margin-top: .6rem;*/
    /*padding-left: 1.5rem;*/
}

.img-name-eles {
    margin-top: .5rem;
    margin-bottom: .1rem;
    padding-left: 5rem;
}

.img-info-else {
    width: 32rem;
    padding-left: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.index-hot-list .img-author .author-image {
    position: absolute;
    top: .5rem;
    left: 1rem;
    z-index: 3;
    width: 3.8rem;
    height: 3.8rem;
    border: .15rem solid #fff;
    border-radius: 50%;
}
.index-hot-list .img-author p{
    font-size: 1.4rem;
    /*line-height: 3.7rem;*/
    color: #333;
    padding-left: 1rem;
}
.index-hot-list .author-follow,
.index-hot-list .already-follow{
    /*display: inline-block;
    vertical-align: middle;*/
    width: 1.8rem;
    height: 2rem; 
    margin: 1.5rem 1.5rem;
    /*width: 5rem;
    height: 2.3rem;
    line-height: 2.1rem;
    margin: 1.6rem 1.5rem; 
    text-align: center;
    padding:0 0.5rem 0 0.4rem;
    font-size: 1.2rem;
    color: #ff4545;
    border-radius: 50px / 50px;
    border:1px solid #ff4545;*/
}
.index-hot-list .author-follow {
    background-position: -9.1rem -21.6rem;
}
.index-hot-list .already-follow {
    background-position: -12.8rem -21.6rem;
    /*color: #999;
    border-color: #999;*/
}

.img-desc {
    width: 100%;
    margin-bottom: -0.1rem;
    padding: 1rem 1.5rem .6rem 1.5rem;
    background-color: #fff;
    font-family: PingFangSC; 
    font-size: 1.4rem;
    color: #333;
}

.img-desc {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

/*.index-hot .index-hot-list{
	background-color: #fff;
	margin-bottom: 1rem;
}*/

.swiper-wrapper ul,
.swiper-wrapper li {
    width: 100%;
    height: 100%;
}

.index-hot-list .swiper-wrapper .list-img{
	position: relative;
	height: 25rem;
	width: 100%;
	background-color: #eee;
}
.index-hot-list .img-explain{
    height: 4rem;
    margin-top: -0.4rem;
    background-color: #fff;
}
.index-hot-list .img-explain .money{
    color: #333;
	height: 3rem;
	line-height: 4rem;
	font-size: 1.2rem;
	padding: 0 1.5rem;
}
.index-hot-list .img-explain .money span{
	font-size: 1.7rem;
    color: #ad1a1a;
	margin-left: 0.3rem;
}
.index-hot-list .img-explain .num{
	font-size: 1.2rem;
	height: 3rem;
	line-height: 4rem;
	padding:0 0.8rem;
    color: #333;
}
.index-hot-list .img-explain .imgbrowse,
.index-hot-list .img-explain .imglike {
    color: #999;
    height: 4rem;
    line-height: 4rem;
}
.index-hot-list .img-explain .imgbrowse{
	padding-left: 1.8rem;
	/*background-image:url(../../assets/img/fire_icon.png);
    background-size: 1.3rem 1.5rem;*/
}
.index-hot-list .img-explain .imglike{
	background-position: 1rem center;
	padding-left: 2.7rem;
	padding-right: 1.5rem;
}
.index-hot-list .swiper-pagination span{
	width: 0.5rem;
	height: 0.5rem;
	border-radius: 50%;
	background-color: #ffb5b5;
	margin:0 0.5rem;
	opacity: 1;
	display: inline-block;
}
.index-hot-list .swiper-pagination .swiper-active-switch{
	border-radius:0.5rem;
	width: 1rem;
	background-color: #ff4545;
}
.swiper-slide a {
	display: block;
	width: 100%;
	height: 100%;
}

.swiper-pagination {
    position: absolute;
    top: 71%;
    width: 100%;
    height: .8rem;
}

.swiper-pagination-clickable {
    
}
</style>
