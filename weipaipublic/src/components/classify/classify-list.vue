<template>
<div class="cyformat clearfix format-current">
	<div class="abreas-list fl" v-for="num in formatlist">
		<!-- 提供父容器 避免出现样式错乱 -->
		<div class="img-box">
			<router-link 
				v-if="num.thumb.type == 'img'"
				:to="'/lotdetails/'+num.id" 
				class="list-img divbg" 
				:style="{backgroundImage:'url('+ baseUrl + num.thumb.url+ '?x-oss-process=image/resize,w_800' + ')'}"
			>
			</router-link>
			<!-- 视频 -->
			<router-link
				v-if="num.thumb.type == 'video'"
				:to="'/lotdetails/'+num.id" 
				class="list-img video-box" 	
			>	
				<span class="video-play-rectangle">
					<i class="shotsprites video-play-rectangle-icon"></i>
				</span>
				<video :src="baseUrlVideo + num.thumb.url" :poster="videoPost"  style="object-fit: fill;"></video>
			</router-link>
		</div>
		<p class="img-explain">{{num.desc}}</p>
		<div class="clearfix img-bottom" :class="'goodsid'+num.id">
			<span class="color fl">￥{{num.current_price}}</span>
			<p v-if="num.last_time" class="clearfix fr">
				<span class="imgbrowse">{{num.views}}</span>
				<!-- 店铺首页列表 -->
				<span v-if="num.like_num !== undefined"
					class="imglike" 
					:data-goodsid="num.id" 
					:class="{ 'imglikecur': num.is_like}"
					@click="doLike"
				>{{num.like_num}}</span>
				<!-- 分类数据列表 -->
				<span v-if="num.likes !== undefined"
					class="imglike" 
					:data-goodsid="num.id" 
					:class="{ 'imglikecur': num.is_like}"
					@click="doLike"
				>{{num.likes}}</span>
			</p>
			<p v-if="!num.last_time" class="is-over">
				已结束
			</p>
		</div>
	</div>

	<!-- 微信分享 -->
	<wx-share :message="wxShareObj" v-if="repaint"></wx-share>
</div>

</template>
<script>

	var sharePage = require("@/components/component/shareSub")	
	var config = window.config;
	

    module.exports = {
			data: function() {
				return {
					wxShareObj: {},               // 微信分享
					baseUrl: window.config.img_url,
					baseUrlVideo: "http://xfpvideoupload.oss-cn-beijing.aliyuncs.com/", // 视频未转码
					videoPost: require("../../assets/img/video_ns_2.jpg"),
					logoImg: require("../../assets/img/share_logo.jpg"),
					hucheng: require("../../assets/img/hucheng.png"),  // 胡诚专场
					shuxie: require("../../assets/img/shuxie.png"),   // 书协
					leiqijun: require("../../assets/img/leiqijun.png"), // leiqijun
					repaint: false,
				}
			},
			props:["formatlist"],
			components:{
	    		"wx-share": sharePage
	    	},
			created: function() {
	      // if (document.title == '胡诚专场') { // 胡诚专场
	      //     this.wxShareObj.title = '胡诚书画专场正在热拍';
	      //     this.wxShareObj.images = this.hucheng;
	      //     this.wxShareObj.desc = '胡诚毕业于中央美术学院，作品正在0元热拍';
	      // } else if (document.title == '书协、美协') { // 书协美协
	      // 		this.wxShareObj.title = '中美(书)协会员无底价拍卖场';
	      //     this.wxShareObj.images = this.shuxie;
	      //     this.wxShareObj.desc = '欢迎你来竞猜成交价有福利';
	      // } else if (document.title == '雷奇俊专场') { // 雷奇俊
	      // 		this.wxShareObj.title = '雷奇俊书画专场无底价热拍';
	      //     this.wxShareObj.images = this.leiqijun;
	      //     this.wxShareObj.desc = '师从范志斌，后写意花鸟发起人';
	      // } else {
	      //     this.wxShareObj.title = document.title + '—小福拍,今日有惊喜哦！';
	      //     this.wxShareObj.images = this.logoImg;
	      //     this.wxShareObj.desc = "你想要的【" + document.title + "】都在这里，快挑一件拍回家吧！";
	      // }

	      // 后端配置微信分享
				const WeiXinObj = this.formatlist[0];
	      if (WeiXinObj.fen_logos) {
	      	this.wxShareObj.title = WeiXinObj.fen_titles;
          this.wxShareObj.images = WeiXinObj.fen_logos;
          this.wxShareObj.desc = WeiXinObj.fen_descs;
	      } else {
      	  this.wxShareObj.title = document.title + '—小福拍,今日有惊喜哦！';
          this.wxShareObj.images = this.logoImg;
          this.wxShareObj.desc = "你想要的【" + document.title + "】都在这里，快挑一件拍回家吧！";
	      }

	      this.wxShareObj.url = location.href;
	      
	      setTimeout( () => {
	      	if (location.hash) {
	      		this.repaint = true;	
	      	};
	      },1000)

			},
			mounted: function() {
				
			},
			methods: {	
				doLike: function(ev) {
					var goodsid = $(ev.target).attr('data-goodsid');
					this.$emit('childEvent',ev,goodsid)
				}
			}
		}

</script>
<style>

.abreas-list{
	width: 17.25rem;
	background-color: #fff;
	margin-right: 1rem;	
	margin-bottom: 1rem;
}
.abreas-list .img-box {
	width: 100%;
	height: 17.25rem;
}
.abreas-list .list-img{
	display: block;
	height: 17.25rem;
}
.list-img img {
	width: 100%;
	height: 17.25rem;
}
.abreas-list .img-explain{
	padding:0.3rem 0.5rem 0;
	color: #333;
	font-size: 1.4rem;
	height: 2rem;
	line-height:1.8rem;
	/* 超出隐藏 */
	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.abreas-list .img-bottom{
	font-size: 1.2rem;
    color: #666;
    line-height: 3.5rem;
    padding-left: 0.5rem;
}
.abreas-list .img-bottom .imgbrowse{
	height: 3.5rem;
	line-height: 3.5rem;
}
.abreas-list .img-bottom .imglike{
	height: 3.5rem;
	line-height: 3.4rem;
}
.abreas-list .img-bottom .color{
	font-size: 1.4rem;
}
.abreas-list .imglike{
    padding-right: 0.5rem;
}

.is-over {
	padding-right: 0.5rem;
	text-align: right;
}
</style>
