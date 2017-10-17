<template>
<div class="recharge">
	<div class="cell-input">
		<div class="cell-input_hd">
			<label class="cell-input_label">金额</label>
		</div>
		<div class="cell-input_bd">
			<input class="cell-input_input" type="number" placeholder="请输入充值金额" v-model="num"  @input.stop="checkNum">
		</div>		
	</div>
	<div class="btn_area">
		<a href="javascript:;" class="btn" v-if="!num">下一步</a>
		<!-- 跳转到充值方式选择页面 -->
		<a href="javascript:;" class="btn" :class="{ btn__ok: num}" v-if="num" @click="goTo()">下一步</a>
		<!-- <a href="javascript:;" class="link" v-on:click="bankInfoQuota()">支持银行及限额说明</a> -->
	</div>
	<!-- 银行卡限额说明组件 -->
	<my-bank-info-quota :isBankInfoQuota="isBankInfoQuota"></my-bank-info-quota>
</div>
</template>
<script>

	
	var myBankInfoQuota = require("@/components/balance/bankInfoQuota")
	var ajax = require("ajax");
	var utils = require("utils");

	

    module.exports = {		
		
		
		data:function(){
			return {
				num: '',	//输入金额
				isBankInfoQuota: false//支持银行及限额说明弹窗
			}
		},				
	  	components: {
	    	'my-bank-info-quota': myBankInfoQuota
	  	},
		mounted:function(){
			document.title="余额充值";
			var _this = this;
			// 支持银行及限额说明 弹窗
			$(".mask, .bankCardInfoMask_ft").on("click",function(){
				if($('.bankCardInfoMask').css("display") == "block"){
					_this.isBankInfoQuota = !_this.isBankInfoQuota;
				}				
			});

			this.$nextTick(function(){
				// 添加footer active样式
				this.addRouterLink()

				// 为input 添加键盘弹出处理
				utils.getKeyboard($('.cell-input_input'),$('.footer-bottom'))
			})
		},
		beforeDestroy: function() {
			$(".footer-bottom a").eq(3).removeClass("router-link-active");
		},
		methods:{
			//弹窗切换
			bankInfoQuota: function() {
				this.isBankInfoQuota = !this.isBankInfoQuota;
			},
			// input:number only number
			checkNum: function(ev) {
				var input = ev.target;
				var val   = input.value;
			},

			// 跳转
			goTo: function() {
				// 写入存储
				sessionStorage.setItem('recharge_amount',this.num)
				this.$router.push('/payment/0?type=recharge&ordertype=2');
			},

			// footer 样式
			addRouterLink: function(){
				$(".footer-bottom a").eq(3).addClass("router-link-active");
			}
		}
	}

</script>
<style>
/* input 输入 */
.recharge {
    height: 100%;
}
.recharge .cell-input{
    margin-top: 1rem;
}
.cell-input{
    padding:1.5rem;
    display: -webkit-flex;
    display: flex;
    align-items:center;
    line-height: 1;
    font-size: 1.6rem;
    background-color: #fff;
}
.cell-input_label{
    display: block;
    width: 5rem;    
    color: #333; 
    word-wrap:break-word;
    word-break:break-all;   
}
.cell-input_bd{
    -webkit-flex: 1;
    flex:1;
}
.cell-input_input{
    width: 100%;
    line-height: 1;
    color: #999;
}
.cell-info{
    padding-right: 1.5rem;
    height: 3rem;
    line-height: 3rem;
    text-align: right;
    color: #6e7294;
    font-size: 1.2rem;
}
/* 按钮 */
.btn_area{
    margin: 3rem 2rem;
    text-align: center;
}
.btn{
    display: block;
    margin: 0 auto;
    padding:0 1rem;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    background-color: #ccc;

    color: #fff;
    font-size: 1.6rem;
    box-sizing: border-box;
    border-radius: 0.25rem;
}
.btn__ok{
    background-color: #15af25;
}
.btn_area .link{
    display: inline-block;
    color: #6699ff;
    font-size: 1.4rem;
    margin-top: 2rem;
}
.link{
    color: #6699ff;
    font-size: 1.4rem;
    text-decoration: underline;
}
/* 弹窗 手机验证码 */
.voiceAuth_cpm{
    position: absolute;
    bottom:0;
    left:0;
    width: 100%;
    background-color: #f7f8f7;
}
.voiceAuth_text-area{
    padding:1.5rem;
}
.voiceAuth_text{
    color: #333;
    font-size: 1.4rem;
    line-height: 1;
}
.voiceAuth_text__red{
    color: #ad1a1a;
}
.voiceAuth_input-area{
    padding:0 1.5rem;
}
.voiceAuth_input-input{
    padding:1rem;
    width: 13.75rem;
    height: 4.3rem;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    color: #999;
    font-size: 1.4rem;
}
.voiceAuth_input-btn{
    width: 19.7rem;
    height: 4.3rem;
    line-height: 4.3rem;
    background-color: #6699ff;
    color: #fff;
    text-align: center;
    font-size: 1.4rem;
    border-radius: 0.3rem;
}
.voiceAuth_input-btn:active{
    background-color: #8ab1fd;
}
.voiceAuth_info{
    padding:0.5rem 0;
    min-height: 4.5rem;
    color: #6e7294;
    font-size: 1.2rem;
    text-align: right;
}
.voiceAuth_cpm .btn_area{
    margin-top: 0;
    margin-bottom: 2rem;
}
.voiceAuth_cpm .btn:active{
    background-color: #41c74f;
}
/* 已发送至 */
.voiceAuth_hint{
    padding:0 1.5rem 1rem;
    color: #999;
    font-size: 1.2rem;
}
.voiceAuth_hint__red{
    color: #ff5454;
}
.voiceAuth_info-text{
    position: absolute;
    top:1rem;
    right:1.5rem;
}
.voiceAuth_info-box{
    margin:0 auto;
    width: 17rem;
    height: 3.5rem;
    line-height: 1.75rem;
    border: 1px dashed #ff0000;
    font-size: 0;
}
.voiceAuth_info-box p{
    text-align: center;
    font-size: 1.1rem;
}
.voiceAuth_info-box p:first-child, .voiceAuth_info-box p:first-child a{
    color: #ff0000;
}
.voiceAuth_info-box p:first-child a{
    text-decoration: underline;
}
.voiceAuth_info-box p:last-child a{
    color: #6699ff;
}

</style>
