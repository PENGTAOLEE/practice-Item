<template>
	<div class="propup-qr" @click="close">
		<div id="bigImg" @click="">
		</div>
		<div class="bigQr" id="bigQr">
			<div class="bigQr-inner">
				<div class="bigQr-logo"></div>
				<div class="bigQr-head">
					<div class="bigQr-avator">
						<img :src="dataInfo.user_thumb" alt="">
					</div>
					<div class="bigQr-name">{{ dataInfo.user_name }}</div>
				</div> 
				<div class="bigQr-recommend">给你推荐一个好店铺，有好货！快来看看~</div>
				<div class="bigQr-codebox">
					<div class="bigQr-code">
						<img :src="qrcode" alt="">
					</div>
					<div class="bigQr-tip">长按查看详情</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {

			}
		},

		props: ['dataInfo','qrcode'],

		methods: {
			close: function() {
				this.$emit('closeBox')
			}
		}

	}
</script>

<style scoped>
.propup-qr div {   
    -webkit-touch-callout:none;  /*系统默认菜单被禁用*/   
    -webkit-user-select:none; /*webkit浏览器*/   
    -khtml-user-select:none; /*早期浏览器*/   
    -moz-user-select:none;/*火狐*/   
    -ms-user-select:none; /*IE10*/   
    user-select:none;   
}  
.propup-qr {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.4);
}
#bigImg ,
.bigQr {
	position: absolute;
	left: 50%;
	top: 5rem;
	width: 34.8rem;
	height: 51.3rem;
	-webkit-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		 -o-transform: translateX(-50%);
			transform: translateX(-50%);
	border-radius: 1.3rem;
	background-color: #fff;
}
.bigQr-inner {
	margin: 1.3rem;
	width: 32rem;
	height: 47.5rem;
	padding: 1.9rem 1.4rem;
	background: url(../../assets/img/qrcode_bg.png) no-repeat;
	background-size: 100% 100%;
}
.bigQr-logo {
	width: 7.9rem;
	height: 2.4rem;
	background: url(../../assets/img/qr_logo.png) no-repeat;
	background-size: 100% 100%;
}
.bigQr-head {
	width: 100%;
	height: 12.6rem;
	margin-top: -0.6rem;
	text-align: center;
}

.bigQr-avator {
	display: inline-block;
	width: 9rem;
	height: 9rem;
	overflow: hidden;
	border-radius: 50%;
}
.bigQr-avator img {
	width: 100%;
	height: 100%;
}
.bigQr-name {
	margin-top: 0.6rem;
	font-family: PingFangSC;
	font-size: 1.6rem;
	color: #333;
}
.bigQr-recommend {
	width: 29rem;
	height: 2.7rem;
	margin-top: 1rem;
	line-height: 2.7rem;
	background-color: #ad1a1a;
	text-align: center;
	font-family: PingFangSC;
	font-size: 1.4rem;
	color: #fff;
}
.bigQr-codebox {
	position: relative;
	text-align: center;
}
.bigQr-code {
	display: inline-block;
	width: 25.7rem;
	height: 25.7rem;
}
.bigQr-code img {
	display: inline-block;
	width: 100%;
	height: 100%;
}
.bigQr-tip {
	position: absolute;
	bottom: 2rem;
	width: 100%;
	text-align: center;
	font-family: PingFangSC;
	font-size: 1.4rem;
	color: #000;
}	
</style>