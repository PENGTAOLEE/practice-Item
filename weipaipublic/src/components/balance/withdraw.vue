<template>
<div class="recharge">
	<div class="cell-input">
		<div class="cell-input_hd">
			<label class="cell-input_label">金额</label>
		</div>
		<div class="cell-input_bd">
			<input class="cell-input_input" type="number" placeholder="请输入提现金额" v-model="num">
		</div>		
	</div>
	<!-- 用户提现限制 -->
	<div class="cell-info">本次提现最大金额：{{ maxiMum | formatMoney }} ，今日余：{{time}}次</div>
	<div class="btn_area">
		<a href="javascript:;" class="btn" id="js_btn" v-bind:class="{btn__ok:num}" @click="saveData">下一步 <!--v-on:click="authMask()"--></a>
		<!-- <a href="javascript:;" class="link" v-on:click="bankInfoQuota()">支持银行及限额说明</a> -->
	</div>
	<my-bank-info-quota :isBankInfoQuota="isBankInfoQuota"></my-bank-info-quota>
	<!-- 弹窗 验证码  -->
	<div class="mask" v-show="isVoiceAuthMask" @click="authMask"></div>
	<div class="voiceAuth_cpm" v-show="isVoiceAuthMask">
		<div class="voiceAuth_text-area">
			<a class="voiceAuth_text voiceAuth_text__red" href="javascript:;">验证码&nbsp;</a>
			<span class="voiceAuth_text voiceAuth_text__grey">将发送至</span>
			<a  class="voiceAuth_text voiceAuth_text__red" href="javascript:;">{{ clientPhone }} </a>
		</div>
		<!-- <div class="voiceAuth_hint" v-show="isVoiceAuth">请留意号码为&nbsp;<a class="voiceAuth_hint__red" href="javascript:;">{{ clientPhone }}</a>&nbsp;的来电</div> -->
		<div class="voiceAuth_input-area clr">
			<input type="text" class="voiceAuth_input-input fl" placeholder="验证码" v-model="inputVoiceAuth" disabled>
			<input v-show="!verifyCode" type="button" value="发送验证码" class="voiceAuth_input-btn fr" @click="sendCode">
			<input v-show="verifyCode" type="button" class="voiceAuth_input-btn grey-btn fr">
		</div>
		<div class="voiceAuth_info re">
			<!-- <span class="voiceAuth_info-text">待删除</span> -->
			<!-- <div class="voiceAuth_info-box" v-show="isVoiceAuth">
				<p>点击<a href="javascript:;">收不到验证码？</a>文案变为</p>
				<p>请拨 <a href="javascript:;">010-xxxx</a>  进行人工验证！</p> 
			</div> -->
		</div>
		<div class="btn_area">
			<a  class="btn" v-bind:class="{btn__ok:inputVoiceAuth}" @click.prevent="validateInput">确定</a>
		</div>
	</div>
	<!-- end 弹窗 验证码  -->

	<!-- 弹窗 -->
	<show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>
</div>
</template>
<script>

	
	var myBankInfoQuota = require("@/components/balance/bankInfoQuota")
	var showAlert = require("@/components/component/showAlert")
	var ajax = require("ajax");
	var utils = require("utils");
	

    module.exports = {		
		
		// 补充接口：获取最大提现金额 + 提现次数 + 客户电话
		data:function(){
			return {
				isBankInfoQuota: false,      // 支持银行及限额说明 弹窗
				num: "", 				     // 输入金额
				verifyCode: false,
				time: 0,	   				 // 提现次数
				maxiMum: '',                 // 最大提现金额 
				inputVoiceAuth:	"",			 // 输入的验证码
				isVoiceAuth: false,			 // 状态 输入验证码后
				isVoiceAuthMask: false ,  	 // 验证码弹窗
				clientPhone: '',	         // 测试手机号
				tipMsg: '',
				showAlertBoll: false,
				timer: null,                 // 倒计时
			}
		},
		filters: {
			// 格式化人民币相关
	    	formatMoney: function (value) {
			    if (!value) return ''
			    value = value.toString()
			    return '￥' + value
		    }
		},
		watch: {
			'$route': ["addRouterLink"]
		},
		created: function() {
			this.getExtractData()
		},
		mounted: function(){
			document.title="余额提现";
			var _this = this;
			//支持银行及限额说明 弹窗
			$(".mask, .bankCardInfoMask_ft").on("click",function(){
				if($('.bankCardInfoMask').css("display") == "block"){
					_this.isBankInfoQuota = !_this.isBankInfoQuota;
				}				
			});

			// 点击下一步
			$('#js_btn').on("click",function(){
				var balanceMum = parseFloat(_this.num)
				if(balanceMum > 0){
					if (balanceMum > _this.maxiMum && _this.time > 0) {
						_this.tipMsg = "提现金额超出您的账户余额";
                        _this.showAlertBoll = true;
					} else if (balanceMum <= _this.maxiMum && _this.time <= 0) {
						_this.tipMsg = "今天提现已超出1次，请明天再试";
                        _this.showAlertBoll = true;
					} else if (balanceMum > _this.maxiMum) {
						_this.tipMsg = "提现金额超出您的账户余额";
                        _this.showAlertBoll = true;
					} else {
						// 注释掉发送验证码 因为产品一定会改啊啊啊啊
						/*
						if (_this.timer) {
							clearInterval(_this.timer)
						};
						_this.isVoiceAuthMask = !_this.isVoiceAuthMask;
					
						_this.sendCode()
						*/
					
						window.location.href = '/payment/'+ _this.num +'?type=cash';
					}
					
				}
			});

			// footer + 键盘
			this.$nextTick(function(){
				this.addRouterLink()

				utils.getKeyboard($('.cell-input_input'),$('.footer-bottom'),$('.recharge'))
				utils.getKeyboard($('.voiceAuth_input-input'),$('.footer-bottom'),$('.recharge'))
			})
		},
		beforeDestroy: function() {
			$(".footer-bottom a").eq(3).removeClass("router-link-active");
		},
		methods:{
			//支持银行及限额说明 弹窗
			bankInfoQuota: function(){
				this.isBankInfoQuota = !this.isBankInfoQuota;
			},

			authMask: function(){
				this.isVoiceAuthMask = !this.isVoiceAuthMask;
			},

			sendCode: function() {
				var _this = this;
				this.isVoiceAuth = true;
				this.verifyCode = true;
				var mobile = this.clientPhone;

				// type=1 表示提现发送验证啊接口
				var type = 1;
				ajax.sendVerifiyCode(mobile,type,function(data){
					if (data.status == 200) {
						//发送验证码
						_this.voiceAuth();
					} else {
						_this.tipMsg = data.msg;
                        _this.showAlertBoll = true;					}
				})
			},

			// 已经发送验证码
			voiceAuth: function(){
				var _this = this;

				$('.voiceAuth_text__grey').text("已发送至");
				$('.voiceAuth_input-input').attr('disabled',false);
				//短信验证码倒计时
				var c = 60;
				this.timer = setInterval(funtimer,1000);
				function funtimer(){
					if(c==0){
						clearInterval(_this.timer);
						this.inputVoiceAuth = '';
						$('.voiceAuth_input-input').attr('disabled','disabled');
						_this.verifyCode = false;
						$('.voiceAuth_text__grey').text("将发送至");
					}
					$('.grey-btn').val(c+"s后重新获取");
					c--;
				}
				funtimer();
			},

			// 验证当前输入的验证码
			validateInput: function() {
				var _this = this;
				// 验证成功后跳支付
				var inputNum = this.inputVoiceAuth;
				var mobile   = this.clientPhone;
				// type=1 标识当前 可重复验证
				var type = 1;
				ajax.smsVerifiy(mobile,inputNum,type,function(data) {
                    if (data.status == 200) {
                    	_this.$router.push('/payment/'+ _this.num +'?type=cash')
                    } else {
                        _this.tipMsg = data.msg;
                        _this.showAlertBoll = true;
                    }
                })
			},

			// 获取页面数据
			getExtractData: function() {
				var _this = this;
				ajax.getExtractPage(function(res){
					if (res.status == 200) {
						if ( (1 - res.data.num) <= 0 ) {
							_this.time = 0
						} else {
							_this.time = 1 - res.data.num;
						}
						_this.maxiMum = res.data.balance;
						_this.clientPhone = res.data.mobile;
					} else if(res.status == 201){
						_this.time = 0;
						_this.maxiMum = res.data.balance;
						_this.clientPhone = res.data.mobile;
					} else {
						_this.tipMsg = res.msg;
                        _this.showAlertBoll = true;
					}
				})
			},

			// 关闭alert
			closePopup: function(){
				this.showAlertBoll = false;
			},

			// 支付跳转
			saveData: function() {
				sessionStorage.setItem('cash_amount',this.num)
			},

			// footer样式
			addRouterLink: function() {
				$(".footer-bottom a").eq(3).addClass("router-link-active");
			}
		},				
	  	components: {
	    	'my-bank-info-quota': myBankInfoQuota,
	    	'show-alert': showAlert
	  	}
	}

</script>
<style>
/* input 输入 */
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
    position: fixed;
    bottom:0;
    left:0;
    z-index: 19;
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
.grey-btn {
    background-color: #ddd;
}
.voiceAuth_input-btn:active{
    background-color: #8ab1fd;
}
.voiceAuth_info{
    padding:0.5rem 0;
    /*min-height: 4.5rem;*/
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
