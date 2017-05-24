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
	<div class="shop-item" v-for="data in contactArr">
		<router-link :to="'/newschat/'+ data.toid" class="news-list-con user-list">
			<div class="clearfix newslist-bottom">
				<!-- style="background-image:url(/res/img/list.jpg)" -->
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


    module.exports = {
		data : function(){
			return {
				loading: false,
				contactArr : [],
				// totalPage: 0,
				page: 0,
				systemMsgCount : 0
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
					}
				});
			}
		},
		
		components : {
			"my-footer":footer
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
.newslist .news-list-con .newslist-bottom{
	padding:1rem 1rem 1rem 0;
	border-bottom: 1px solid #e5e5e5;
}
.newslist .news-list-con:first-child .newslist-bottom {
	border-bottom: none;
	margin-bottom: 1rem;
}
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
</style>
