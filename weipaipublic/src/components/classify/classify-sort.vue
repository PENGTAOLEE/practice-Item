<template>
    <div class="format-sort" id="formatsort" data-sort="true">
        <my-list :formatlist="formatlist"></my-list>
        <div class="cyformat">
            <div class="vertical-list clearfix" v-for="num in formatlist">
                <router-link :to="'/lotdetails/'+num.id" class="fl list-img divbg" :style="{backgroundImage:'url('+ baseUrl +num.thumb.url+'?x-oss-process=image/resize,w_800'+')'}"></router-link>
                <div class="fl list-right">
                    <div class="vertical-list-top">
                        <p class="img-explain">{{num.desc}}</p>
                        <div class="clearfix img-see" :class="'goodsid'+num.id">
                            <span class="fl imgbrowse">{{num.views}}</span>
                            <span class="fl imglike" :data-goodsid="num.id" :class="{ 'imglikecur': num.is_like}">{{num.likes}}</span>
                        </div>
                    </div>
                    <div class="ds-vl-price clearfix">
                        <p class="fl cur">当前价 <span>￥{{num.current_price}}</span></p>
                        <p class="fr num">{{num.bid_count}}<span>次出价</span></p>
                    </div>
                    <div class="ds-vl-time" :data-time="num.last_time" :id="'lasttime'+num.id">距截拍：00时00分00秒</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var list=require("@/components/classify/classify-list");
    var ajax=require("ajax");
    var utils = require('utils');
    var config = window.config;
    export default {
        data:function(){
            return {
                page:1,//默认
                formatlist:[],//商品列表
                timediv:[],//时间的id
                clearTimeid: [],    // 清空时间id数组
                keynum:true,
                baseUrl: window.config.img_url,
                isMerchant: false,  // 学生
                pageUrl: '',
            }
        },
        mounted:function(){
            $(".loading img").hide();
            $(".loading p").show();
            this.dropDown();

            this.$nextTick(function(){
                this.addRouterLink()

                var scrollTop = window.localStorage.getItem('formatlist_scroll_top');
                $(document).scrollTop(scrollTop);
            })

        },
        created:function(){// 组件创建完后获取数据，

            if (utils.getRequest().classify == 'merchant') {
                this.isMerchant = true;
            };
            
            // this.getFormaTlist()

            var formatListData = window.localStorage.getItem('formatlist_data');
            this.pageUrl = location.href; 
            var prevPageUrl = window.localStorage.getItem('formatlist_url');
            // 当前时间 
            var nowTimeStamp = new Date().getTime();
            var lastTimeStamp = window.localStorage.getItem('formatlist_time_stamp');
            var timeDiff = nowTimeStamp - lastTimeStamp;

            if (prevPageUrl == this.pageUrl && timeDiff < 1000*60*5) { 
                this.formatlist = JSON.parse( formatListData ) || [];  
                this.page = window.localStorage.getItem('formatlist_page') || 1;
                // 使用完删除
                this.removeCookie()
            };


            this.formaTlist();
        },
        watch :{//路由发生变化调用该函数
            '$route' : ["initpage","getFormaTlist","addRouterLink","scrollToZo"]
        },
        components:{
            "my-list":list
        },
        beforeDestroy: function() {
            var formatlistJson = JSON.stringify(this.formatlist)
            var scrollHeight = $(document).scrollTop();
            // 记录滚动位置
            var timeStamp = new Date().getTime();
            window.localStorage.setItem('formatlist_time_stamp',timeStamp);
            window.localStorage.setItem('formatlist_scroll_top',scrollHeight);
            window.localStorage.setItem('formatlist_data',formatlistJson );
            window.localStorage.setItem('formatlist_page',this.page);
            window.localStorage.setItem('formatlist_url',this.pageUrl);
        },

        destroyed: function() {
            $(".footer-bottom a").eq(1).removeClass("router-link-active")
        },
        methods:{
            scrollToZo: function() {
                $(document).scrollTop(0);
            },

            // 获取数据
            getFormaTlist: function() {
                if (!this.isMerchant) {
                    this.formaTlist();
                } else {
                    // 推荐店铺拍品列表 【后端做不同接口处理数据】
                    // console.log(222)
                }
            },

            // 添加样式
            addRouterLink: function() {
                $(".footer-bottom a").eq(1).addClass("router-link-active")
            },

            initpage : function (){//路由发生变化数据初始化
                this.page = 1;
                this.formatlist=[];
                this.timediv=[];
            },

            // 移除浏览数据
            removeCookie: function() {
                window.localStorage.removeItem('formatlist_scroll_top');
                window.localStorage.removeItem('formatlist_data');
                window.localStorage.removeItem('formatlist_page'); 
                window.localStorage.removeItem('formatlist_time_stamp');
            },

            formaTlist:function(){//pattern排序模式 num 页数
                // 1、分类id 2、排序 3、分页
                var id = this.$route.hash.substring(1);
                /** modifier LL **/
                id = id ? id : this.$route.params.type;
                /** modify end **/
                var mode = parseInt( this.$route.params.id );
                var that=this;
                var isStudent = utils.getRequest().isstudent;
                this.timediv=[];
                that.keynum=false;
                ajax.classifYformat(id,mode,that.page,isStudent,function(data){
                    if(data.status=="200"){//请求成功
                        $(".loading p").hide();
                        $(".loading img").show();
                        for(var i=0; i<data.data.length; i++){
                            that.timediv.push(data.data[i].id);
                            // 格式化图片格式
                            data.data[i].thumb = JSON.parse( data.data[i].thumb )
                            that.formatlist.push(data.data[i]);
                        }

                        // 页面初始化之前先把页面内的倒计时清空
                        $.each(that.clearTimeid,function(index,item){
                            clearInterval(item.timer)
                        })

                        that.$nextTick(function(){
                            that.imgLike();//点赞

                            $.each(that.timediv,function(index,item){
                                var timer = {};
                                // 创建倒计时
                                timer[index] = that.countDown("#lasttime"+that.timediv[index]);
                                that.clearTimeid.push({
                                    id: item,
                                    timer: timer[index]
                                })
                                delete that.timediv[index]
                            })
                            
                        });
                        that.page++;
                    }else if(data.status=="201"){
                        $(".loading img").hide();
                        $(".loading p").show();
                    }else{//参数错误
                        alert(data.msg);
                    }
                    that.keynum=true;
                });
            },
            dropDown:function(){//下拉刷新
                var that=this;
                $(window).unbind();
                $(window).scroll(function(){
                    if($("#formatsort").attr("data-sort")){
                        var hcon=$(document).height()-$(window).height()-200;
                        var scroll=$(this).scrollTop();
                        if(scroll>hcon&&that.keynum){
                            that.formaTlist();
                        }
                        scroll>1?$(".backtop").show():$(".backtop").hide();
                    }
                });
            },
            imgLike:function(){
                $(".imglike").click(function(){//点赞按钮
                    //一个用户只能点一次
                    var goodsid = parseInt($(this).get(0).dataset.goodsid);
                    if (!$(this).hasClass('imglikecur')) {
                        // 点赞接口
                        ajax.userLike(goodsid,function(data){
                            if (data.status == 200) {
                                var $node = $('.goodsid'+goodsid).find('.imglike');
                                var num=parseInt( $node.html() )+1;
                                var key=parseInt($node.siblings(".imgbrowse").html())+1;
                                $node.addClass("imglikecur").html(num);
                            };
                        })
                        //浏览量加一
                        // $(this).siblings(".imgbrowse").text(key);
                    } 
                    
                });
            },
            countDown:function(obj){//倒计时
                var that=this;
                var timeDiff=Math.floor($(obj).attr("data-time"));
                // var timeDiff= Math.floor('20000' / 1000);
                function timeadd(num){
                    if(num>9){
                        return num;
                    }else{
                        return "0"+num;
                    }
                }
                var time=setInterval(funtime,1000);
                function funtime(){
                    timeDiff--;
                    var h=parseInt(timeDiff/3600);//小时
                    var m=parseInt((timeDiff-h*3600)/60);//分钟
                    var s=parseInt(timeDiff-h*3600-m*60);//秒
                    /** modifier LL 不使用天作为倒计时单位 **/
                    //if(h > 24) {
                    //    // 大于24小时显示 天时分
                    //    var day = parseInt(timeDiff/86400);
                    //    h = parseInt((timeDiff-day*86400)/3600);
                    //    m = parseInt((timeDiff-day*86400-h*3600)/60);
                    //    $(obj).html('距离结束：<span>'+day+'</span>天<span>'+timeadd(h)+'</span>时<span>'+timeadd(m)+'</span>分');
                    //    return;
                    //}
                    /** modify end **/
                    if(s>=0){   
                         $(obj).html('距离结束：<span>'+timeadd(h)+'</span>时<span>'+timeadd(m)+'</span>分<span>'+timeadd(s)+'</span>秒');
                    }else{
                        clearInterval(time);
                        var index=$(obj).parents(".vertical-list").index();
                        $(obj).html('已结拍')
                        // 截拍 拍品仍然显示在列表中
                        // that.formatlist.splice(index,1);
                    }
                };

                return time;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .time-out {

  }
</style>
