<template>
  <transition name="pages">
    <div class="index bottom-distance">
        <div class="swiper-container swiper-container-horizontal index-bannner list0">
        <!-- <img src="../../assets/img/banner.jpg" alt=""> -->
        <ul class="swiper-wrapper">
          <li 
            class="swiper-slide" 
            v-for="num in [1,2,3,4]"
          > 
          <!--<img src="../../assets/img/banner.jpg" alt=""> -->
            <!-- v-for="num in hotbanner" -->
            <!-- <a :href="num.url" class="banner-slide divbg re" :style="{backgroundImage:'url(' + num.thumb + ')'}"> -->
            <a  href="#" class="banner-slide divbg re" :style="{backgroundImage:'https://sf-sponsor.b0.upaiyun.com/4ea23eebe5bf3d21b6a8cfe99591a734.gif'}">
              <!-- 添加图片预加载 -->
               <img 
                class="lazy js_picLazy" 
                src="../../assets/img/banner.jpg"
                :data-original="num.thumb"
                alt=""
              /> 
            </a>
          </li>
        </ul>
        <div class="swiper-pagination swiper-pagination-clickable key0">
        </div>
      </div>
      <nav class="index-nav">
        <div class="index-nav-in clearfix re">
          <router-link to="/index" class="nav fl" ><span>热门</span></router-link>
          <router-link to="/follow" class="nav fl"><span>关注</span></router-link>
          <router-link to="/picture" class="ab photograph shotsprites"></router-link>
        </div>
      </nav>
      <router-view></router-view>
      <div class="loading">
        <img src="../../assets/img/loading.gif">
        <p>没有更多了</p>
      </div>
      <div class="backtop fixed shotsprites" @click="backtop"></div>
        
      <!-- 微信分享 -->
      <!-- <wx-share :message="wxShareObj"></wx-share> -->

    </div>
  </transition>
</template>

<script>

/*引入js*/
import Swiper from 'swiper'
// import headTop from 'src/components/header/head';
// import {currentcity, searchplace} from 'src/service/getData';

export default {
  // ===
    data () {
        return {
            hotbanner: {},
            baseUrl: 'http://yiping-images.oss-cn-beijing.aliyuncs.com',
            wxShareObj: {},
        }
    },
    // template: require("module/banner/banner.html"),
    created: function() {

        // 微信分享
        this.wxShareObj.title = "小福拍--移动竞拍领航者";
        this.wxShareObj.images = '/res/img/share_logo.jpg'; 
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

        // 当前footer添加active
        addRouterLink: function() {
            $(".footer-bottom a").eq(0).addClass("router-link-active")
        },

        // banner数据
        getBanner: function() {
            var _this = this;
            // ajax.getBanner(function(data){
            //     if (data.status == 200) {
            //         _this.hotbanner = data.data;
            //     } else {
            //         alert(data.data);
            //     }
            // })
        }
    },
    // components:{
    //     'my-footer': footer,
    //     'wx-share': sharePage
    // }
  // ===
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index-bannner{
    height:12rem; 
  }
  /*.swiper-wrapper ul,
  .swiper-wrapper li {
    width: 100%;
    height: 100%;
  }*/
  .swiper-wrapper .banner-slide {
    display: block;
    width: 100%;
    height: 12rem;
  }
  .index-bannner .swiper-wrapper a img{
    height: 12rem;
  }
  .swiper-container .swiper-wrapper,
  .swiper-container .swiper-wrapper li{
    height: auto !important;
  }
  .index-bannner .swiper-pagination span{
    width:2.1rem; 
    height:0.15rem;
    border-radius:0.5rem;
    background-color:#898887;
    margin:0 0.35rem; 
    opacity: 1;
    display: inline-block;
  }
  .index-bannner .swiper-pagination .swiper-active-switch{
    background-color:#fff;
  }
  /* 导航 */
  .index-nav{
    height: 5rem;
  }
  .index-nav-in{
    width: 100%;
    background-color: #fff;
    padding:0 5.5rem;
  }
  .index-nav-fixed{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 11;
  }
  .index-nav-in .nav{
    width: 50%;
    height: 4.4rem;
    line-height: 4.1rem;
    font-size: 1.5rem;
    text-align: center;
    color: #666;
  }
  .index-nav-in .nav span{
    display: inline-block;
    width: 8rem;
    border-bottom: 0.3rem solid #fff;
  }
  .index-nav-in .router-link-active span{
    color: #000;
    border-bottom-color: #ad1a1a;
  }
  .index-nav-in .photograph{
    top: 0;
    right: 0;
    width: 6.1rem;
    height: 4.4rem;
  }
</style>