<template>
<transition name="pages">
	<div class="index bottom-distance">
	    <div class="swiper-container swiper-container-horizontal index-bannner list0">
			<ul class="swiper-wrapper">
				<li class="swiper-slide" v-for="num in hotbanner" >
					<a :href="num.url" class="banner-slide divbg re" :style="{backgroundImage:'url(' + num.thumb + ')'}">
					</a>
				</li>
			</ul>
			<div class="swiper-pagination swiper-pagination-clickable key0">
			</div>
		</div>
		<nav class="index-nav">
			<div class="index-nav-in clearfix re">
				<router-link to="/index" class="nav fl" ><span>寻宝</span></router-link>
				<router-link to="/follow" class="nav fl"><span>关注</span></router-link>
				<router-link to="/college" class="nav fl">
					<span>学院</span>
					<i class="spritesmap college-hot"></i>
				</router-link>
				<router-link to="/picture" class="ab photograph shotsprites"></router-link>
			</div>
		</nav>
		<router-view></router-view>
		<div class="loading">
			<img src="../../assets/img/loading.gif">
			<p>没有更多了</p>
		</div>
		<div class="backtop fixed shotsprites" @click="backtop"></div>
	</div>
</transition>

</template>
<script>
    import Swiper from 'swiper';
    var sharePage = require("@/components/component/shareSub")
    var ajax = require("ajax");
    
    export default {
        data:function(){
            return {
                hotbanner: {},
                baseUrl: 'http://yiping-images.oss-cn-beijing.aliyuncs.com',
                wxShareObj: {},
            }
        },
        created: function() {
            // 微信分享
            this.wxShareObj.title = "小福拍--移动竞拍领航者";
            this.wxShareObj.images = '../../assets/img/share_logo.jpg';
            this.wxShareObj.url = location.href;
            this.wxShareObj.desc = "手边的珍宝库，全品类艺术品，随时随地竞拍！";
        },
        mounted: function(){
            this.getBanner()
            this.$nextTick(function(){
                // Swiper
                var swiper = new Swiper('.list0',{
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false,
                    setWrapperSize: true,
                    roundLengths: true,
                    loop: true,
                    pagination : '.key0',
                    paginationClickable: true,
                    observer: true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true//修改swiper的父元素时，自动初始化swiper
                });  
            })
            if (location.pathname == '/') {
                window.localStorage.removeItem('indexhot_scroll_top');
                this.$router.replace("/index");//默认是热门
                // $(".footer-bottom a").eq(0).addClass("router-link-active");
            };


            
        },
        watch: {
            '$route': ["addRouterLink"]
        },
        destroyed: function() {
            $(".footer-bottom a").eq(0).removeClass("router-link-active")
        },
        methods:{
            backtop: function(){
                $("html,body").stop().animate({scrollTop:0},400);
            },

            addRouterLink: function() {
                $(".footer-bottom a").eq(0).addClass("router-link-active")
            },

            getBanner: function() {
                var _this = this;
                ajax.getBanner(function(data){
                    if (data.status == 200) {
                        _this.hotbanner = data.data;
                    } else {
                      //  alert(data.data);
                    }
                })
            }
        }
    }

</script>
<style>
.college-hot {
	position: absolute;
	top: .5rem;
	right: -1.2rem;
	width: 1.9rem;
	height: 1.2rem;
	background-position: 0rem -28.75rem;
}
.index-bannner{
	height:15.65rem; 
}
.swiper-wrapper ul,
.swiper-wrapper li {
	/*width: 100%;
	height: 100%;*/
	background-color: #ccc;
}
.swiper-wrapper .banner-slide {
	display: block;
	width: 100%;
	height: 15.65rem;
}
.index-bannner .swiper-wrapper a img{
	height: 12rem;
}
.swiper-container .swiper-wrapper,
.swiper-container .swiper-wrapper li{
	/*height: auto !important;*/
}
.index-bannner .swiper-pagination {
	padding-right: .6rem;
	text-align: right;
}
.index-bannner .swiper-pagination span{
	width: .5rem; 
	height: .5rem;
	border-radius: 50%;
	background-color:#f5f5f5;
	margin:0 0.35rem; 
	opacity: 1;
	display: inline-block;
}
.index-bannner .swiper-pagination span.swiper-pagination-bullet-active{
	background-color: #ff4545;
}
/* 导航 */
.index-nav{
	height: 4.4rem;
}
.index-nav-in{
	width: 100%;
	background-color: #fff;
	/*padding:0 5.5rem;*/
	border-bottom: 1px solid #ccc;
}
.index-nav-fixed{
	position: fixed;
	left: 0;
	top: 0;
	z-index: 11;
}
.index-nav-in .nav{
	position: relative;
	/*width: 50%;*/
	height: 4.4rem;
	line-height: 4.2rem;
	margin-left: 3rem;
	font-family: PingFangSC;
	font-size: 1.7rem;
	text-align: center;
	color: #666;
}
.index-nav-in .nav span{
	display: inline-block;
	/*width: 7rem;*/
	width: 5rem;

	border-bottom: 0.1rem solid #fff;
}
.index-nav-in .router-link-active span{
	height: 4.4rem;
	color: #000;
	border-bottom-color: #333;
}
.index-nav-in .photograph{
	top: 0;
	right: 0;
	width: 6.1rem;
	height: 4.4rem;
}
</style>
