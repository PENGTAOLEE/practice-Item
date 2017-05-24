<template>
<transition name="pages">
	<div class="find-index">
		<router-link to="/curriculum" class="find-nav">
			<span class="fl shotsprites"></span>
			课程
		</router-link>
		<router-link to="/newslist" class="find-nav">
			<span class="fl shotsprites"></span>
			消息中心
			<strong class="message-num" v-if="isUnRead">{{ unreadNum }}</strong>
		</router-link>
		<!-- <my-footer></my-footer> -->
	</div>
</transition>
</template>
<script>


    module.exports = {
		data: function() {
			return {
				isUnRead: false,
				unreadNum: 0,
			}
		},
		
		components:{
			"my-footer":footer
		},
		mounted:function(){
			document.title="发现";
			$(".footer-bottom a").eq(2).addClass("current");

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
    border-radius: 30%;
    font-weight: normal;
    font-size: 1.2rem;
    text-align: center;
    line-height: 1.4rem;
}
</style>
