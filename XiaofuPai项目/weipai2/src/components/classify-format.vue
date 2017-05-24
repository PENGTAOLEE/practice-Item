<template>
<div class="classify-format bottom-distance" id="classifyformat" data-format="true">
	<header class="format-header fixed">
		<router-link :to="'/format/'+type+'/sort/1#'+type" class="title-name fl">默认排序</router-link>
		<router-link :to="'/format/'+type+'/sort/2#'+type" class="title-name fl">最新上拍</router-link>
		<router-link :to="'/format/'+type+'/sort/3#'+type" class="title-name fl">即将截拍</router-link>
		<div class="ab switch switchcur shotsprites" data-num="1"></div>
		<div class="ab switch vertical shotsprites" data-num="0"></div> 
	</header>
	<router-view></router-view>
	<div class="loading">
		<img src="/res/img/loading.gif">
		<p>没有更多了</p>
	</div>
	<div class="backtop fixed shotsprites" @click="backtop"></div>

	<!-- 微信分享 -->
	<wx-share :message="wxShareObj"></wx-share>
</div>
</template>
<script>
define(function(require,explain,module){
	var footer=require("footer")
	var sharePage = require("shareSub")
	
	var utils = require('utils');
	return {
		data:function(){
			return {
				type: null,
				wxShareObj: {},               // 微信分享
			}
		},
		
		created: function() {
			document.title = decodeURIComponent( utils.getRequest().title);

			// 微信分享
			this.wxShareObj.title = document.title + '—小福拍,今日有惊喜哦！';
			this.wxShareObj.images = "/res/img/share_logo.jpg"; 
			this.wxShareObj.url = location.href;
			this.wxShareObj.desc = "你想要的【" + document.title + "】都在这里，快挑一件拍回家吧！";
		},
		mounted:function(){
			this.type=this.$route.params.type;
			// 判断当前是否有mode( 路由上的id值 )
			var defaultId = this.$route.params.id;
			if (!defaultId) {
				this.$router.replace("/format/"+this.type+"/sort/1#"+this.type);
			}
			
			$(".footer-bottom a").eq(1).addClass("router-link-active");
			$(".format-header .switch").click(function(){//展示切换
				$(this).hide().siblings(".switch").show();
				$(this).parent().siblings(".format-sort").children(".cyformat").hide();
				$(this).parent().siblings(".format-sort").children(".cyformat").eq($(this).attr("data-num")).show();
			});        
		},
		components:{
			"my-footer": footer,
			"wx-share": sharePage
		},
		methods:{
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
    /* background: url(/res/img/switch.png) no-repeat;
    background-size: 4.5rem 4.4rem; */
    border-left:1px solid #e5e5e5;
    display: none;
}
/* .format-header .vertical{
    background-image: url(/res/img/vertical.png);
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
