<template>
<transition name="pages">
	<div class="find-index">
    <router-link to="/classify/content/81?title=%E6%8E%A8%E8%8D%90%E6%8B%8D%E5%93%81&type=activity" class="find-nav" style='display:none'>
			<span class="fl shotsprites"></span>
			推荐拍品
		</router-link>
		<router-link to="/curriculum" class="find-nav">
			<span class="fl shotsprites"></span>
			文玩学问
		</router-link>
		<router-link to="/excellentshop" class="find-nav" style="display:none;">
			<span class="fl shotsprites"></span>
			优店
		</router-link>
		<router-link to="/newslist" class="find-nav">
			<span class="fl shotsprites"></span>
			消息中心 
			<strong class="message-num" v-if="isUnRead">{{ unreadNum }}</strong>
		</router-link>
		<!-- 运营活动 -->
		<a href="https://hd.faisco.cn/13739609/18/load.html?style=2" class="find-nav" style="display:none;">
			<span class="fl shotsprites"></span>
			商户粉丝福利
		</a>
		<a href="/authenstudentindex" class="find-nav">
			<span class="fl shotsprites"></span>
			学生认证
			<!-- 后端配置 new icon -->
			<strong class="spritesmap new-icon-infind"></strong>
		</a>
	</div>
</transition>
</template>
<script>
	var ajax = require("ajax");
	
    module.exports = {
		data: function() {
			return {
				isUnRead: false,
				unreadNum: 0,
			}
		},
		beforeDestroy: function() {
      $(".footer-bottom a").eq(2).removeClass("router-link-active")
    },
		mounted:function(){
			document.title="发现";
			setTimeout(function() {
				$(".footer-bottom a").eq(2).addClass("router-link-active");	
			}, 100);

			this.ishaveUnRead();
		},
		methods: {
			// 消息通知
			ishaveUnRead: function() {
				var _this = this;
				this.isUnRead = false;
				ajax.messageNotify(function(data){
					if (data.status == 200) {
						_this.isUnRead = true;
						_this.unreadNum = data.data.count;
					} else if(data.stauts == 201) {
						_this.isUnRead = false;
					}
				})
			}
		}
	}

</script>
<style>
.find-index .find-nav{
	position: relative;
	margin-top: 1rem;
	height: 4.4rem;
	line-height: 4.4rem;
	display: block;
	background-color: #fff;
	font-size: 1.6rem;
	color: #333;
}
.find-nav:nth-child(1) {
	margin-top: 0;
	border-top: 1px solid #e5e5e5;
}

/* 隐藏推荐拍品 */
.find-nav:nth-child(2){
    margin-top: 0;
}
/* /隐藏推荐拍品 */

.find-index .find-nav span{
	width: 5rem;
	height: 4.4rem;
}
.message-num {
	display: inline-block;
    position: absolute;
    top: 50%;
    right: 1.5rem;
    margin-top: -0.9rem;
    padding: .2rem .3rem;
    min-width: 1.8rem;
    height: 1.8rem;
    margin-right: 1rem;
    background-color: #AD1A1A;
    color: #fff;
    border-radius: 50px / 50px;
    font-weight: normal;
    font-size: 1.2rem;
    text-align: center;
    line-height: 1.4rem;
}
.new-icon-infind {
	position: absolute;
	top: 50%;
	margin-top: -1rem;
	right: 1.5rem;
}
</style>
