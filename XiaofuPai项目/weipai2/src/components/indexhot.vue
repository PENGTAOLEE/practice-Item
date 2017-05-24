<template>
<div class="index-hot" id="indexhot" data-indexhot="true">
	<div class="swiper-container swiper-container-horizontal index-hot-list" v-for="num in hotList" :id="'swiper'+num.user_id">
		<!-- 拍品轮播 -->
		<ul class="swiper-wrapper">
			<li class="swiper-slide re" v-for="key in num.good">
				<!-- 图片 -->
				<router-link 
					v-if="key.thumb.type == 'img'"
					:to="'/lotdetails/'+key.id" 
					class="divbg list-img" 
				>
					<!-- :style="{backgroundImage:'url(' + baseUrl + key.thumb.url + '?x-oss-process=image/resize,w_800' + ')'}"	 -->
					<!-- 添加图片预加载 -->
					<img 
						class="lazy js_picLazy" 
						src="/res/img/xiaofupai_hot.png"
						:data-original="baseUrl + key.thumb.url + '?x-oss-process=image/resize,w_800'"
						alt=""
					/>
					<!-- /res/img/loading.gif -->
				</router-link>
				<!-- 图片结束 -->
				<!-- 视频 -->
				<router-link 
					v-if="key.thumb.type == 'video'"
					:to="'/lotdetails/'+key.id" 
					class="list-img video-box" 	
				>	
					<span class="video-play-rectangle">
						<i class="shotsprites video-play-rectangle-icon"></i>
					</span>
					<video :src="baseUrlVideo + key.thumb.url" poster="/res/img/video_ns_2.jpg" style="object-fit: fill;"></video>
				</router-link>
				<!-- 视频结束 -->
				<div class="img-explain ab clearfix">
					<div class="fl money">当前<span>￥{{key.current_price}}</span></div>
                    <div class="fl num">已有{{key.bidnum}}人出价</div>
					<div class="fr imglike" :data-id="key.id" :class="{'imglikecur':key.likestatus}">{{key.likes}}</div>
					<div class="fr imgbrowse">{{key.views}}</div>
				</div>
			</li>
		</ul>
		<!-- 拍品轮播结束 -->
		<!-- 店铺信息 -->
		<div class="clearfix img-name">
			<router-link :to="'/shops/'+num.user_id + '?type=2'" class="fl img-author clearfix">
				<img :src="num.useImg" class="fl">
				<p class="img-name-text fl">{{num.nick}}</p>
			</router-link>
			<div class="author-follow fr" @click="follow($event)" :data-id="num.user_id" :class="{'already-follow':num.fowstate}">
				{{num.fowstate?keyfollow:notfollow}}
			</div>
		</div>
		<!-- 店铺信息结束 -->
		<div class="swiper-pagination swiper-pagination-clickable" :id="'dot'+num.user_id">
		</div>
	</div>

	<!-- 微信分享 -->
	<wx-share :message="wxShareObj"></wx-share>
</div>

</template>
<script>


    module.exports = {
    	data:function(){
    		return {
                hotList:[],
                keynum:true,
                page:1,
                divname:[],
                keyfollow:"已关注",
                notfollow:"+关注",
                baseUrl: config.img_url,
                baseUrlVideo: "http://xfpvideoupload.oss-cn-beijing.aliyuncs.com/", // 视频未转码
                wxShareObj: {},
                isHaveOss: false, // 是否添加了oss后缀
    		}
    	},
        
        components: {
            'wx-share': sharePage
        },
        mounted : function(){
            document.title="小福拍";

            // 无数据
            this.$nextTick(function(){
                utils.picCenter(".js_picLazy",'data-original');

                var scrollTop = window.localStorage.getItem('indexhot_scroll_top');
                $(document).scrollTop(scrollTop + 250);
            })
           
            // $('.index-nav-in').removeClass('index-nav-fixed')
        },
        created: function() {
            // 微信分享
            this.wxShareObj.title = "小福拍--移动竞拍领航者";
            this.wxShareObj.images = '/res/img/share_logo.jpg'; 
            this.wxShareObj.url = location.href;
            this.wxShareObj.desc = "手边的珍宝库，全品类艺术品，随时随地竞拍！";

            this.listData();
            this.hotlist();//下拉刷新

        },
        beforeDestroy: function() {
            var scrollHeight = $(document).scrollTop();
            window.localStorage.setItem('indexhot_scroll_top',scrollHeight);
        },
        methods: {
            hotlist: function(){//下拉加载
                var that = this;
                $(window).unbind();
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
                            // 
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
                        $(".loading img").hide();
                        $(".loading p").show();
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
            // 关注
            follow:function(event){//点赞
                var state=0;//关注的状态 1已关注   0未关注
                var userid=$(event.target).attr("data-id");//用户id
                var objname=$(event.target).hasClass("already-follow");
                //objname  是true 说明是已关注   是false  说明没有关注
                objname?state=0:state=1;                
                ajax.followState(state,userid,function(data){
                    if(data.status=="502"){
                        alert("未登录")
                    }else if(data.status=="503"){
                        alert("关注失败")
                    }else if(data.status=="200"){
                        if(state=="1"){
                            $(event.target).addClass("already-follow").text("已关注")
                        }else{
                            $(event.target).removeClass("already-follow").text("+关注")
                        }
                    }
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
<style>
/* 列表 */
.index-hot{
	overflow-y: auto;
}
.img-name-text {
	display:block;
	width: 20rem;
	white-space:nowrap; 
	overflow:hidden; 
	text-overflow:ellipsis;
}
.index-hot .index-hot-list{
	background-color: #fff;
	margin-bottom: 1rem;
}
.index-hot-list .swiper-wrapper .list-img{
	position: relative;
	height: 25rem;
	width: 100%;
	background-color: #eee;
}
.index-hot-list .img-explain{
	left: 0;
	bottom:0;
	height: 3rem;
	right: 0;
	background-color: rgba(0,0,0,0.4);
}
.index-hot-list .img-explain .money{
	height: 3rem;
	line-height: 3rem;
	background-color: rgba(173,26,26,0.9);
	color: #fff;
	font-size: 1.2rem;
	padding: 0 1.5rem 0 1rem;
}
.index-hot-list .img-explain .money span{
	font-size: 1.6rem;
	margin-left: 0.3rem;
}
.index-hot-list .img-explain .num{
	font-size: 1.2rem;
	color: #fff;
	height: 3rem;
	line-height: 3.5rem;
	padding:0 0.8rem;
}
.index-hot-list .img-explain .imgbrowse{
	padding-left: 1.8rem;
	background-image:url(/res/img/imgbrowse.png);
	color: #fff;
	line-height: 2.8rem;
}
.index-hot-list .img-explain .imglike{
	color: #fff;
	line-height: 2.8rem;
	background-image: url(/res/img/imglike.png);
	background-position: 1rem center;
	padding-left: 2.7rem;
	padding-right: 1.5rem;
}
.index-hot-list .img-author{
	padding:1.25rem 5rem 2.5rem 1.5rem;
}
.index-hot-list .img-author img{
	width: 4.4rem;
	height: 4.4rem;
	border-radius: 50%;
}
.index-hot-list .img-author p{
	font-size: 1.6rem;
	line-height: 4.4rem;
	color: #000;
	padding-left: 1rem;
}
.index-hot-list .author-follow{
	height: 2.25rem;
	line-height: 2.1rem;
	padding:0 0.5rem;
	font-size: 1.3rem;
	color: #fa693c;
	border:1px solid #fa693c;
	border-radius: 0.3rem;
	margin:2.4rem 1.5rem 0 0;
}
.index-hot-list .already-follow{
	color: #ccc;
	border-color: #ccc;
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
.video-box {
	/*width:100%;
    position: relative; 
    padding-bottom: 56.25%;
    height: 0;*/
}
.video-box video {
	/*position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;*/
}
</style>
