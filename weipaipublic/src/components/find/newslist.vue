<template>
<div class="newslist">
	<router-link to="/systemmsg" class="news-list-con fixed-top">
		<div class="clearfix">
			<div class="news-list-img fl shotsprites"></div>
			<p class="list-title fl">
				<span>系统消息</span>
				<span class="system-msg-count">({{systemMsgCount}})</span>
			</p>
			<div class="list-bg fr shotsprites to-right"></div>
		</div>
	</router-link>

	<!-- 官方推送 -->
	<div class="shop-item" style="margin-bottom:1rem;">
		<router-link to="/pushworks/1" class="news-list-con user-list" v-if='is_super_buyer==1'>
			<div class="clearfix newslist-bottom">
				<div class="news-list-img fl divbg re" >
					<img src="../../assets/img/logo.png" alt="">
					<span class="ab" v-if='recommendationNum!=0'>{{recommendationNum}}</span>
				</div>
				<p class="newstitle fl"><span class="dibvam">学生作品推荐</span><span class="official-icon">官方</span><br/>[拍品]</p>
				<div class="time fr">{{recommendationTime}}</div>
			</div>
		</router-link>
		<!-- 小福拍私人助手 -->
		<router-link :to="'/newschat/'+aides.toid+'/0'" class="news-list-con user-list" v-if="aides.t_status==1">
			<div class="clearfix newslist-bottom">
				<div class="news-list-img fl divbg re" >
					<img :src="aides.thumb" alt="">
					<span class="ab" v-if='aides.unreadcount>0'>{{aides.unreadcount}}</span>
				</div>
				<p class="newstitle fl"><span class="dibvam">{{aides.name}}</span><br/>{{aides.msg}}</p>
				<div class="time fr">{{ aides.updatetime }}</div>
			</div>
		</router-link>
	</div>
	
	<!-- 聊天列表 -->
	<div class="shop-item">
		<router-link :to="'/newschat/'+ data.toid + '/0'" v-for="(data,index) in contactArr" class="news-list-con user-list" key="index">
			<div class="clearfix newslist-bottom">
				<!-- style="background-image:url(../assets/img/list.jpg)" -->
				<div class="news-list-img fl divbg re" >
					<img :src="data.thumb" alt="">
					<span class="ab" v-if="data.status == 1">{{data.unreadcount}}</span>
				</div>
				<p class="newstitle fl"><span>{{data.name}}</span><br/>{{data.msg}}</p>
				<div class="time fr">{{data.updatetime}}</div>
			</div>
		</router-link>
	</div>
	<!-- <my-footer></my-footer> -->
</div>
</template>
<script>
	var ajax = require("ajax");
	var utils = require("utils");


    module.exports = {
		data : function(){
			return {
				loading: false,
				contactArr : [],
				// totalPage: 0,
				page: 0,
				systemMsgCount : 0,
				aides: {},
				recommendationNum: 0,
				recommendationTime: '',
				is_super_buyer: 0
			}
		},
		created : function(){
			var _this = this;
			// 聊天数据
			this.getContactList();
			utils.dropLoading(function() {
				_this.getContactList();
			})
			
		},
		destroyed: function() {
			this.contactArr = [];
			this.page = 0;
			$(window).unbind('scroll');
			$(".footer-bottom a").eq(2).removeClass("router-link-active");

		},
		mounted : function(){
			document.title="消息中心";
			this.$nextTick(function(){
				this.addRouterLink()
			})
			
		},
		watch: {
			'$route': ["addRouterLink"]
		},
		methods : {
			// 添加样式
			addRouterLink: function() {
				$(".footer-bottom a").eq(2).addClass("router-link-active");
			},
			getContactList : function(){
				var that = this;	 	
				ajax.contactList(that.page,function(res){
					if(res.status == 200){
						that.page++
						$.each(res.data.data, function(e){
							that.contactArr.push(this);
						});
						that.systemMsgCount = res.data.systemMsgCount;
						that.recommendationNum = res.data.num;
						that.recommendationTime = res.data.time;
						that.aides = res.data.aides;
						that.is_super_buyer = res.data.is_super_buyer;
					}
				});
			}
		}
	}

</script>
<style>
.fixed-top {
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	padding:1rem 1rem 1rem 0;
	z-index: 9;
}
.newslist .news-list-con{
	background-color: #fff;
	padding-left: 1rem;
	display: block;
}
.newslist .news-list-con .newslist-bottom {
	padding:1rem 1rem 1rem 0;
	border-bottom: 1px solid #e5e5e5;
}
.newslist .news-list-con:last-child .newslist-bottom {
	border-bottom: none;
}
/*.newslist .news-list-con:first-child .newslist-bottom {
	border-bottom: none;
	margin-bottom: 1rem;
}*/
.newslist .news-list-con .news-list-img {
	width: 4.5rem;
	height: 4.5rem;
	margin-right: 1rem;
	border-radius: 0.4rem;
}
.news-list-img img {
	width: 100%;
	height: 100%;
}
.newslist .news-list-con .news-list-img span{
	right: -0.9rem;
	top: -0.9rem;
	width: 1.8rem;
	height: 1.8rem;
	line-height: 1.8rem;
	font-size: 1rem;
	color: #fff;
	text-align: center;
	border-radius: 50%;
	background-color: #f43530;
}
.newslist .news-list-con .list-title{
	display: inline-block;
	font-size: 1.4rem;
	color: #333;
	line-height: 4.5rem;
}
.newslist .news-list-con .list-bg{
	width: 1rem;
	height: 1.5rem;
	margin-top: 1.5rem;
	margin-right: 0.5rem;
}
.newslist .user-list .newstitle{
	width: 22rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 1.3rem;
	line-height: 2.25rem;
}
.newslist .user-list .newstitle span{
	font-family: PingFangSC;
	font-size: 1.6rem;
	color: #333;
}
.newslist .user-list .time{
	font-size: 1.1rem;
	color: #999;
}

.shop-item:first-of-type {
	margin-top: 8.6rem;
}
.shop-item:last-of-type {
	margin-bottom: 7rem;
}

.system-msg-count {
	color: #ad1a1a;
	margin-left:.5rem;
}

.official-icon {
	display: inline-block;
	vertical-align: middle;
	width: 3rem;
	height: 1.7rem;
	margin: 0 1rem;
	border-radius: .2rem;
	line-height: 1.6rem;
	text-align: center;
	border: 1px solid #ad1a1a;
	font-size: 1.1rem!important;
	color: #ad1a1a!important;
}
</style>
