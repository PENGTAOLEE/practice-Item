<template>
<div id="show-confirm">
	<div id="confirm">
		<div class="confirm-text" v-html="msg"></div>
		<div class="confirm-btn" @click="confirmFun" >{{confirm}}</div>
		<div class="cancel-btn" @click="cancelFun">{{cancel}}</div>
	</div>
</div>
</template>
<script>


    module.exports = {
		data: function() {
			return {
					confirm: "确定",
				    cancel: "取消"
			}
		},
		props: ['msg','tit_con','tit_can'],
		
		mounted: function(){
		},
		created: function(){
		},
		computed: {
			confirm: function(){
				return this.tit_con?(this.confirm = this.tit_con):"确定";
			},
			cancel: function(){
				return this.tit_can?(this.confirm = this.tit_can):"取消";
			}
		},
		methods: {
			closeConfirm: function() {
				this.$emit('closeBox');
			},
			// 确定
			confirmFun: function() {
				try {
					this.$emit('childEvent');
				} catch (e) {
					this.$emit('delEvent');
				}
				
				this.closeConfirm();
			},

			// 取消
			cancelFun: function() {
				this.closeConfirm();
			}
		}
	}


</script>
<style>
/* 公共弹窗 */
#show-confirm {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
}
#confirm {
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 2.5rem 2rem 2rem 2rem;
	width: 100%;
	min-height: 20rem;
	background-color: #fff;
}
.confirm-btn,
.cancel-btn {
	width: 30rem;
	height: 4.4rem;
	margin: 0 auto;
	line-height: 4.4rem;
	border-radius: .5rem;
	font-size: 1.6rem;
	font-family: PingFangSC;
	text-align: center;
	color: #fff;
}
.confirm-text {
	min-height: 2rem;
	line-height: 1.2;
	font-family: PingFangSC;
	font-size: 1.4rem;
	color: #000;
	text-align: center;
}
.confirm-btn {
	margin-top: 2.5rem;
	background-color: #15af25;
}
.cancel-btn {
	margin-top: 2rem;
	background-color: #808593;
}
</style>
