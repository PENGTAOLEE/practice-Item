<template>
<div class="classify-format bottom-distance" id="classifyformat" data-format="true">
	<header class="format-header fixed">
        <!-- 非学院拍品 -->
        <div v-if="!isCollege && !isMerchant">
            <router-link :to="'/format/'+type+'/sort/1#'+type" class="title-name fl">默认排序</router-link>
            <router-link :to="'/format/'+type+'/sort/2#'+type" class="title-name fl">最新上拍</router-link>
            <router-link :to="'/format/'+type+'/sort/3#'+type" class="title-name fl">即将截拍</router-link>
        </div>
        <div v-if="isMerchant">
            <router-link :to="'/format/'+type+'/sort/1?classify=merchant#'+type" class="title-name fl">默认排序</router-link>
            <router-link :to="'/format/'+type+'/sort/2?classify=merchant#'+type" class="title-name fl">最新上拍</router-link>
            <router-link :to="'/format/'+type+'/sort/3?classify=merchant#'+type" class="title-name fl">即将截拍</router-link>
        </div>
		<!-- 学院拍品 -->
        <div v-if="isCollege">
            <router-link :to="'/format/'+type+'/sort/1?isstudent=1#'+type" class="title-name fl">默认排序</router-link>
            <router-link :to="'/format/'+type+'/sort/2?isstudent=1#'+type" class="title-name fl">最新上拍</router-link>
            <router-link :to="'/format/'+type+'/sort/3?isstudent=1#'+type" class="title-name fl">即将截拍</router-link>
        </div>
		<div class="ab switch switchcur shotsprites" data-num="1"></div>
		<div class="ab switch vertical shotsprites" data-num="0"></div> 
	</header>
	<router-view></router-view>
	<div class="loading">
		<img src="../../assets/img/loading.gif">
		<p>没有更多了</p>
	</div>
	<div class="backtop fixed shotsprites" @click="backtop"></div>

	<!-- 微信分享 -->
	<!-- <wx-share :message="wxShareObj"></wx-share> -->
</div>
</template>
<script>
    var sharePage = require("@/components/component/shareSub")

    var utils = require('utils');
    export default {
    	data:function(){
    		return {
    			type: null,
    			wxShareObj: {},               // 微信分享
                isCollege: false,             // 是否是学院
                isMerchant: false,            // 是否为推荐商户
                logoImg: require("../../assets/img/share_logo.jpg"),
                hucheng: require("../../assets/img/hucheng.png"),  // 胡诚专场
    		}
    	},
    	watch :{//路由发生变化调用该函数
          '$route' : ["wxSharePage"]
        },
    	created: function() {
            if (decodeURIComponent( utils.getRequest().title) != 'undefined' ) {
              document.title = decodeURIComponent( utils.getRequest().title);
            } else {
    		  document.title = window.localStorage.getItem('format_list_title');
            }

            if (utils.getRequest().type == 'college' || utils.getRequest().isstudent == 1) {
                this.isCollege = true;
            }

            if (utils.getRequest().classify == 'merchant') {
                this.isMerchant = true;
            }

            // 胡诚专场
            this.wxSharePage()
            
    	},
    	mounted:function(){
    		this.type=this.$route.params.type;
    		// 判断当前是否有mode( 路由上的id值 )
    		var defaultId = this.$route.params.id;
    		if (!defaultId) {
                if (utils.getRequest().type == 'college') {
                    this.$router.replace("/format/"+this.type+"/sort/1?isstudent=1&title="+ document.title +"#"+this.type);
                } else if (utils.getRequest().classify == 'merchant') {
                    this.$router.replace("/format/"+this.type+"/sort/1?classify=merchant&title="+ document.title +"#"+this.type);
                } else {
                    this.$router.replace("/format/"+this.type+"/sort/1?title="+ document.title +"#"+this.type);
                }
    		}

    		$(".footer-bottom a").eq(1).addClass("router-link-active");
    		$(".format-header .switch").click(function(){//展示切换
    			$(this).hide().siblings(".switch").show();
    			$(this).parent().siblings(".format-sort").children(".cyformat").hide();
    			$(this).parent().siblings(".format-sort").children(".cyformat").eq($(this).attr("data-num")).show();
    		});        
    	},
        beforeDestroy: function() {
            window.localStorage.setItem('format_list_title',document.title);
        },
    	components:{
    		"wx-share": sharePage
    	},
    	methods:{
            // 微信分享 It seems to be of no use
            wxSharePage: function() {
                // 胡诚专场
                if (document.title == '胡诚专场') {
                    this.wxShareObj.title = '胡诚七夕书画专场正在热拍';
                    this.wxShareObj.images = this.hucheng;
                    this.wxShareObj.desc = '胡诚毕业于中央美术学院，作品正在0元热拍';
                } else {
                    this.wxShareObj.title = document.title + '—小福拍,今日有惊喜哦！';
                    this.wxShareObj.images = this.logoImg;
                    this.wxShareObj.desc = "你想要的【" + document.title + "】都在这里，快挑一件拍回家吧！";
                }

                this.wxShareObj.url = location.href;
            },
    		backtop: function(){//返回顶部
                $("html,body").stop().animate({scrollTop:0},400);
            }

    	}
    }
</script>

<style>
/* 分类展示导航 */
.classify-format{
    padding-top: 4.5rem;
}
.format-header{
    height: 4.5rem;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 99;
    padding-right:4.5rem;
    background-color: #fff;
    border-bottom: 1px solid #c5c5c5;
}
.format-header .title-name{
    width: 33.333%;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    font-size: 1.4rem;
    color: #333;
}
/* .format-header .current{
    color: #ad1a1a;
} */
.format-header a.router-link-active{
     color: #ad1a1a;
}
.format-header .switch{
    top: 0;
    right: 0;
    width: 4.5rem;
    height: 4.4rem;
    /* background: url(../../assets/img/switch.png) no-repeat;
    background-size: 4.5rem 4.4rem; */
    border-left:1px solid #e5e5e5;
    display: none;
}
/* .format-header .vertical{
    background-image: url(../../assets/img/vertical.png);
} */
.format-header .switchcur{
    display: block;
}
.classify-format .cyformat{
    display: none;
    padding:1rem 0 0 1rem;
}
.classify-format .format-current{
    display: block;
}
.vertical-list{
    background-color:#fff;
    margin-bottom: 1rem;
}
.vertical-list-top {
    height: 8.4rem;
    overflow: hidden;
}
.vertical-list .list-img{
    width: 13.5rem;
    height: 13.5rem;
}
.vertical-list .list-right{
    width: 22rem;
    padding:0 1rem;
}
.vertical-list .img-explain{
    font-size: 1.4rem;
    color: #333;
    /*单行文本限制*/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.vertical-list .img-see .imgbrowse{
    background-position: left 0.7rem;
    line-height: 2.3rem;
}
.vertical-list .img-see .imglike{
    padding-right: 0.5rem; 
    height: 4rem;
    background-position: 0.75rem 0.6rem;
    line-height: 2.3rem;
}
.vertical-list .ds-vl-price p{
    line-height: 2rem;
    font-size: 1.4rem;
    color: #ad1a1a;
}
.vertical-list .ds-vl-price .cur span{
    font-size: 1.7rem;
}
.vertical-list .ds-vl-price .num span{
    color: #999;
}
.vertical-list .ds-vl-time{
    font-size: 1.2rem;
    color: #333;
    line-height: 3rem;
}

</style>
