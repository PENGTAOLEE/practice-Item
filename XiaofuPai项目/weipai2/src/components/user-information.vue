<template>
<div class="user-information">
	<header class="shops-header clearfix">
		<router-link to="/shops/" class="fl header-l clearfix">
			<img src="/res/img/banner.jpg" class="fl">
			<div class="fl">
				<p class="shops-name">{{  }}</p>
				<!-- <p class="fans">粉丝：1312</p> -->
			</div>
		</router-link>
		<div class="fr header-r clearfix">
			<div class="follow fl">
				<div class="follow-in"><span>+</span>关注</div>
			</div>
		</div>
	</header>
	<div class="news-introduce">
		<p><span>手机</span>12345678901</p>
	</div>
	<div class="news-content">
		<div class="news-con-title clearfix">
			<p class="fl">TA关注的</p>
			<p class="fr">已关注12家店铺</p>
		</div>
		<div class="user-con clearfix">
			<router-link class="user-list fl" to="javascript:;">
				<div class="divbg" style="background-color:pink"></div>
				<p class="text-overflow">我是店铺名字</p>
			</router-link>
			<router-link class="user-list fl" to="javascript:;">
				<div class="divbg" style="background-color:pink"></div>
				<p class="text-overflow">我是店铺名字</p>
			</router-link>
			<router-link class="user-list fl" to="javascript:;">
				<div class="divbg" style="background-color:pink"></div>
				<p class="text-overflow">我是店铺名</p>
			</router-link>
			<router-link class="user-list fl" to="javascript:;">
				<div class="divbg" style="background-color:pink"></div>
				<p class="text-overflow">我是店铺名字</p>
			</router-link>
		</div>
	</div>
	<my-footer></my-footer>
</div>
</template>
<script>


    module.exports = {
		data:function(){
			return {
				dataObj: {}
			}
		},
		
		components:{
			"my-footer":footer
		},
		mounted: function() {
			this.getShopIndex()
		},
		methods: {
			// 数据获取
			getShopIndex: function() {
				var _this = this;
				var userId = this.$route.params.id;
				ajax.getShopIndex(userId,'','',function(data){
					if (data.status == 200) {
						dataObj =  data.data;
					};
				})
			}
			
		}
	}

</script>
<style>
.shops-header{
	padding:1.6rem 0;
	border-bottom: 1px solid #c5c5c5;
	background-color: #fff;
}
.shops-header .header-l{
	width: 18rem;
	height: 4.5rem;
	padding-left: 1.5rem;
}
.shops-header .header-l img{
	width: 4.5rem;
	height: 4.5rem;
	border-radius: 50%;
	margin-right: 1rem;
}
.shops-header .header-l .shops-name{
	font-size: 1.4rem;
	color: #333;
	padding-top: 0.4rem;
}
/* .shops-header .header-l .fans{
	font-size: 1.3rem;
	color: #999;
}
.shops-header .header-r .qr-code{
	margin-top: 1rem;
	height: 2.5rem;
	width: 2.5rem;
	background-color: pink;
} */
.shops-header .header-r .follow{
	height: 4.5rem;
	width: 7rem;
	padding:1rem 1rem 0 1rem;
}
.shops-header .header-r .follow .follow-in{
	width: 5rem;
	height: 2.5rem;
	line-height: 2.2rem;
	text-align: center;
	border:1px solid #fa693c;
	font-size: 1.3rem;
	color: #fa693c;
	border-radius: 0.5rem;
}
.shops-header .header-r .follow .already-follow{
	color: #ccc;
	border-color: #ccc;
}
.shops-header .header-r .follow span{
	font-size: 1.7rem;
}
.shops-header .header-r .curfollow .follow-in{
	border-color: #fa693c;
	color: #fa693c;
}
.news-introduce{
	margin:1rem 0;
	padding:0 1rem;
	background-color: #fff;
}
.news-introduce p{
	height: 4.5rem;
	line-height: 4.5rem;
	font-size: 1.4rem;
	color: #999;
}
.news-introduce p:first-child{
	border-bottom: 1px solid #e5e5e5;
}
.news-introduce p span{
	color: #333;
	margin-right: 3rem;
}
.news-content{
	padding-left: 1rem;
	background-color: #fff;
}
.news-content .news-con-title{
	border-bottom: 1px solid #e5e5e5;
	height: 4.5rem;
	line-height: 4.5rem;
	color: #333;
	font-size: 1.4rem
}
.news-content .news-con-title p:last-child{
	font-size: 1.3rem;
	color: #999;
	padding-right: 1rem;
}
.news-content .news-con-title a .to-right{
	width: 0.95rem;
    height: 1.5rem;
    margin-top: 1.55rem;
    margin-left: 0.5rem;
}
.news-content .user-con{
	margin-left: -1rem;
	padding:1.5rem 0 0.75rem;
}
.news-content .user-con .user-list{
	width: 7.5rem;
	margin:0 0.9rem;
}
.news-content .user-con .user-list div{
	width: 5.5rem;
	height: 5.5rem;
	border-radius: 50%;
	margin:0 auto;
}
.news-content .user-con .user-list p{
	font-size: 1.3rem;
	color: #333;
	text-align: center;
	line-height: 3rem;
}
</style>
