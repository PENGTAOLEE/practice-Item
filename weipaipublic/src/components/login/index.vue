<template>
	<div class="login-index">
		<div class="login-content re" v-show="loginBox">
			<div id="aaa">
			</div>
			<!-- 输入手机号码 -->
			<div class="mobile-input-box" v-show="showPhoneBox">
				<div class="title">登录</div>
				<div class="iphone-input">
					<label for="phone" class="dibvam shotsprites_login login_phone_icon"></label>
					<input id="phone" type="number" class="dibvam fill-item-input" placeholder="请输入手机号码" v-model="mobile">
				</div>
				<div class="btn-grey" :class="{'logo-color':mobile.length==11}" @click="goNextStep(mobile)">下一步</div>	
			</div>
			<!-- 验证码 -->
			<div class="mobile-input-box" v-show="showVeriCode">
				<div class="place-top" style="height:5rem"></div>
				<div class="show-iphone">
					<div class="dibvam item-key">手机号码</div>
					<div class="dibvam item-value">{{ mobile }}</div>
				</div>
				<!-- 获取验证码 -->
				<div class="iphone-input" v-show="beenSend">
					<div class="dibvam item-key">验证码</div>
					<div class="dibvam veri-code" @click="getValidationCode">{{ sendText }}</div>
				</div>
				<!-- 输入验证码 -->
				<div class="iphone-input" v-show="!beenSend">
					<label for="ver-code" class="dibvam item-key">验证码</label>
					<div class="dibvam veri-code" style="border:none;width:auto;">
						<input id="ver-code" type="number" class="dibvam veri-code-input" placeholder="请输入验证码" v-model="verCode">
						<div class="count-down dibvam"><count-down ref="count" @childEvent="changeColor" :cd="clearTimer"></count-down></div>
					</div>
				</div>
				<p class="toggle-password" @click="usePassword">用密码登录</p>
				<div class="btn-grey veri-code-btn" :class="{'logo-color':verCode.length}" @click="loginWithVeriCode">登录</div>	
			</div>
			<!-- 设置登录密码 -->
			<div class="mobile-input-box" v-show="setPasswordBox">
				<div class="place-top" style="height:5rem">{{ tip }}</div>
				<div class="show-iphone" style="width:21rem;margin:0 auto;">
					<div class="dibvam item-key">手机号码</div>
					<div class="dibvam item-value" style="width:13rem;">{{mobile}}</div>
				</div>
				<div class="iphone-input" style="width:21rem;margin:0 auto;margin-top:2.5rem;">
					<div class="dibvam item-key">密码</div>
					<input id="password" type="password" class="dibvam fill-item-input" placeholder="请输入登录密码" style="width:13rem;" v-model="setpassword">
				</div>
				<div class="iphone-input" style="width:21rem;margin:0 auto;margin-top:2.5rem;">
					<div class="dibvam item-key">确认密码</div>
					<input id="password" type="password" class="dibvam fill-item-input" placeholder="请再次输入" style="width:13rem;" v-model="resetpassword">
				</div>	
				<p class="warnning-tip">密码必须至少8个字符，而且同时包含字母和数字.</p>
			</div>
			<!-- 密码登录 -->
			<div class="mobile-input-box" v-show="showPasswordBox">
				<div class="place-top" style="height:5rem"></div>
				<div class="show-iphone" style="width:21rem;margin:0 auto;">
					<div class="dibvam shotsprites_login login_phone_icon"></div>
					<div class="dibvam item-value" style="margin-left:3rem">{{mobile}}</div>
				</div>
				<div class="iphone-input" style="width:21rem;margin:0 auto;margin-top:2.5rem;">
					<label for="password_1" class="dibvam shotsprites_login login_lock_icon"></label>
					<input id="password_1" type="password" class="dibvam fill-item-input" placeholder="请输入密码" style="margin-left:3rem;width:15.7rem;" v-model="password">
				</div>
				<p class="clearfix mobile-input-box-bottom">
					<span class="fl" @click="useLandingCode(0)">用短信验证码登录</span>
					<span class="fr" @click="toGetVerCode">忘记密码</span>
				</p>
				<div class="btn-grey" style="margin-bottom:1.5rem;" :class="{'logo-color':password.length}" @click="loginWithMobile">登录</div>	
			</div>
			
			<div v-if="setPasswordBox">
				<div class="set-password-text" style="left:1.5rem;" @click="noLoginPassword">取消</div>
				<div class="set-password-text" style="right:1.5rem;" :class="{'complete-color':setpassword&&resetpassword}" @click="setLoginPassword">完成</div>	
			</div>
			<div v-if="!setPasswordBox">
				<div class="shotsprites_login login_back_icon" v-if="!showPhoneBox" @click="previousPage"></div>
				<div class="shotsprites_login login_close_icon" @click="closeLoginBox"></div>	
			</div>
		</div>
		<!-- 选择登录方式 -->
		<div class="select-mode" v-show="!loginBox">
			<p class="select-mode-text">您可以通过手机号+短信验证码登录</p>
			<div class="select-mode-btn" @click="forgotPassword()">短信验证码登录</div>
		</div>
		<show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>
	</div>
</template>

<script>
	var ajax = require('ajax');
	var utils = require('utils');
	var countDown = require("@/components/smallcountdown");
	var showAlert = require("@/components/component/showAlert");
  module.exports = {
		data () {
			return {
				mobile: '',
				verCode: '',
				password: '',
				setpassword: '',
				resetpassword: '',
				loginBox: true,
				showPhoneBox: true,
				showVeriCode: false,
				beenSend: true,
				showPasswordBox: false,
				setPasswordBox: false,
				tip: '设置密码，后续可用手机号+登录密码登录',
				type: 0, // 0: 登录 1：找回密码
				sendText: '点击获取验证码',
				showAlertBoll: false,
				tipMsg: '',
				clearTimer: '',
			}
		},
		
		components: {
			'show-alert': showAlert,
      "count-down": countDown
    },
    
    created: function() {
    	if (utils.getRequest().from=='accountsecurity' && utils.getRequest().mobile) {
    		this.initDataDom();
    		this.forgotPassword();
    		this.mobile = utils.getRequest().mobile;
    	};
    },

		mounted: function() {
			// document.title = "输入手机号";
      // $('#footer-common').hide()
			
			this.$nextTick(function() {
				$('#app,html,body').css({
					// 'height':'100%'
				})
			})
		},
		watch: {
		},
		beforeDestroy: function() {
      $('#footer-common').show()
      $('#app,html,body').css({
				'height':'auto'
			})
		},
		methods: {
			// 清除倒计时
			clearTime() {
				clearInterval(this.clearTimer)
			},

			// 初始数据
			initDataDom() {
				this.loginBox = true;
				this.showPhoneBox = false;
				this.showVeriCode = false;
				this.beenSend = true;
				this.showPasswordBox = false;
				this.setPasswordBox = false;
			},

			// 下一步
			goNextStep(mobile) {
				if (mobile.length == 11) {
					this.initDataDom();
					this.usePassword();
					$('#phone').blur();
					$('#password_1').focus();
				};
			},

			// 忘记密码 验证码
			toGetVerCode() {
				this.loginBox = false;
				this.showPhoneBox = false;
			},

			// 短信验证码登录
			VeriCodeLogin() {
				this.initDataDom();
				this.loginBox = true;
				this.showVeriCode = true;
			},

			// 获取验证码
			getValidationCode() {
        var mobileNumber = this.mobile;
				ajax.getAuthCode(mobileNumber,(data) => {
      		if(data.status==200){
            this.$nextTick(() => {
              this.$refs.count.startcount(60000);
              this.beenSend = false;
            })
      			console.log("发送验证码成功！");
      		}else{
	        	this.showAlertTip(data.msg)
      		}
      	});
			},

      // 倒计时结束 
      changeColor: function(){
        this.sendText = '重新获取验证码';
        // this.verCode = '';
        this.beenSend = true;
      },

      // 手机号码 + 密码登录
      loginWithMobile() {
      	var mobile = this.mobile;
      	var password = this.password;
      	ajax.loginWithMobile(mobile,password,(res) => {
      		if (res.status == 200) {
      			// this.$router.push(window.loginJump)
      			this.showAlertTip(res.msg)
      			this.closeLoginBox();
      			window.location.reload()
      		} else {
      			this.showAlertTip(res.msg);
      		}
      	})
      },

      // 验证码登录操作
      loginWithVeriCode() {
      	var mobile = this.mobile;
      	var vcode = this.verCode;
      	var type = this.type;
      	ajax.loginWithVcode(mobile,vcode,type,(res) => {
      		if (res.status == 200) {
      			// 如果正常就直接跳转到响应的页面
      			if (type==1) {
      				this.goSetPassword()
      			} else {
      				// this.$router.push(window.loginJump)
      				this.showAlertTip(res.msg)	
      				this.closeLoginBox();
      				window.location.reload()
      			}
      		} else if(res.status == 202) {
      			this.goSetPassword()
      		} else {
      			this.showAlertTip(res.msg)
      		}
      	})
      },

      // 设置登录密码
      goSetPassword() {
        this.beenSend = true;
        this.showVeriCode = false;
        this.setPasswordBox = true;
      },

      // 完成【设置登录密码】
      setLoginPassword() {
      	var password = this.setpassword;
      	if (this.setpassword&&this.resetpassword) {
      		// 最少8个字符 必须有字母有数字
      		if(this.setpassword!==this.resetpassword) {
      			this.showAlertTip('两次输入的密码不一致')
      		} else if(password.length < 8) {
      			this.showAlertTip('请设置至少8位字符')
      		} else if(/^\d+$/.test(password)) {
      			this.showAlertTip('密码必须包含字母,强度:弱')
      		} else if(/^[a-z]+$/i.test(password)) {
      			this.showAlertTip('密码必须包含数字,强度:中')
      		} else if(!/^[A-Za-z0-9]+$/.test(password)) {
      			this.showAlertTip('密码必须包含数字和字母,强度:中')
      		} else {
      			var firstPassword = this.setpassword;
      			var secondPassword = this.resetpassword;
      			var mobile = this.mobile;
      			var vcode = this.verCode;
      			// 设置登录
      			ajax.setLoginPassword(firstPassword,secondPassword,mobile,vcode,(res) => {
      				if (res.status == 200) {
      					// this.showAlertTip(res.msg)
      					if (this.type == 1) {
      						this.initDataDom();
									this.usePassword();	
      					} else {
      						this.closeLoginBox();
      						window.location.reload()
      					}
      					
      					
      					// this.$router.push(window.loginJump)
      				} else {
      					this.showAlertTip(res.msg)
      				}
      			})
      		}
      	};
      },

      // 取消【不设置登录密码】
      noLoginPassword() {
      	this.closeLoginBox();
      	// this.$router.push(window.loginJump)
      },

			// 使用密码登录
			usePassword() {
				this.clearTimer && this.this.clearTime()
				this.showVeriCode = false;
				this.showPasswordBox = true;
			},

			// 使用验证码登录
			useLandingCode(type) {
				this.type = type;
				if (this.type == 1) {
					// document.title = '设置登录密码';
					this.tip = '如果您忘记密码，可以在本页面重置密码'; 
				} else {
					// document.title = '重置登录密码';
					this.tip = '设置密码，后续可用手机号+登录密码登录';
				}
				this.showPasswordBox = false;
				this.VeriCodeLogin()
			},

			// 忘记密码
			forgotPassword() {
				this.type = 1;
				this.useLandingCode(this.type);
			},

			// 关闭按钮
			closeLoginBox() {
				this.$emit('closeLogin')
				$('.login-index').hide();
				// this.$router.push(window.loginJump)
			},

			// 后退按钮
			previousPage() {
				this.clearTimer && this.clearTime()
				if (utils.getRequest().from=='accountsecurity' && utils.getRequest().mobile) {
					this.forgotPassword();
				} else {
					this.loginBox = true;
					this.showVeriCode = false;
					this.showPasswordBox = false;
					this.setPasswordBox = false;
					this.beenSend = true;
					this.showPhoneBox = true;
				}
				
			},

			// 弹窗提示
      showAlertTip: function(tip) {
        this.tipMsg = tip;
        this.showAlertBoll = true;
      },

			// 关闭alert
			closePopup: function() {
        this.showAlertBoll = false;
      }
		}
	}	
</script>

<style scoped>
.login-index {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	margin-top: -5rem;
	z-index: 111;
	animation: toShow .5s linear;
}
@keyframes toShow {  
  0% { transform: translateY(-100%);}   
  100% { transform: translateY(0%);}  
}  

.select-mode {
	width: 25rem;
	height: 8.5rem;
	margin: 0 auto;
	margin-top: 13.8rem;
	padding: 1.5rem 0rem;
	text-align: center;
	border-radius: .5rem;
	border: 0.05rem solid #cacccc;
	background-color: #fff;
}

.select-mode-text {
	text-align: center;
	font-size: 1.1rem;
	color: #666;
}

.select-mode-btn {
	width: 17.5rem;
	height: 3rem;
	line-height: 3rem;
	margin: 0 auto;
	margin-top: 1.3rem;
	border-radius: .3rem;
	font-size: 1.4rem;
	color: #fff;
	background-color: #ae1a1a;
}

.login-content {
	min-width: 28.1rem;
	max-width: 31rem;
	min-height: 18.3rem;
	margin: 0 auto;
	margin-top: 14.5rem;
	padding: 1.5rem 1.5rem 0rem;
	border: 0.05rem solid #bfbfbf;
	border-radius: .5rem;
	background-color: #fff;
}

.mobile-input-box {
	/*text-align: center;*/
}

.title {
	margin-bottom: 2.5rem;
	font-size: 1.7rem;
	text-align: center;
	color: #8c8c8c;
}

.iphone-input {
	height: 3rem;
	border-bottom: 0.05rem solid #e6e6e6;
}

#phone {
	margin-left: 6.5rem;
}

.fill-item-input {
	width: 17rem;
	height: 2.8rem;
	font-size: 1.4rem;
	caret-color: #ad1a1a; 
	color: #333;
}

.btn-grey {
	width: 25rem;
	height: 3.4rem;
	line-height: 3.4rem;
	margin: 0 auto;
	margin-top: 3rem;
	background-color: #e6e6e6;
	border-radius: .4rem;
	text-align: center;
	font-size: 1.4rem;
	color: #bfbfbf;
}

.set-password-text {
	position: absolute;
	top: 1.5rem;
	font-size: 1.4rem;
	color: #808080;
}

.login_close_icon {
	position: absolute;
	top: 1.5rem;
	right: 1.5rem;
	font-size: 1.4rem;
	color: #808080;
}

.login_back_icon {
	position: absolute;
	top: 1.5rem;
	left: 1.5rem;	
	font-size: 1.4rem;
	color: #808080;
}

.logo-color {
	background-color: #ad1a1a;
	color: #fff;
}

.show-iphone {
	margin-bottom: 2rem;
}

.item-key {
	width: 7.7rem;
	text-align: left;
	font-size: 1.4rem;
	color: #808080;
}

.item-value {
	width: 16.4rem;
	font-size: 1.4rem;
	color: #808080; 
}

.veri-code-input {
	width: 12.9rem;
	height: 2.8rem;
	font-size: 1.4rem;
	caret-color: #ad1a1a; 
	color: #333;
}

.veri-code {
	width: 16.4rem;
	height: 2rem;
	line-height: 2rem;
	border: 0.05rem solid #ad1a1a;
	border-radius: .5rem;
	font-size: 1.1rem;
	text-align: center;
	color: #ad1a1a;	
}

.toggle-password {
	line-height: 2.8rem;
	font-size: 1.2rem;
	color: #808080;
}

.veri-code-btn {
	margin-top: 2.1rem;
	margin-bottom: 3rem;
}

.count-down {
	width: 3.9rem;
	height: 2rem;
	line-height: 2rem;
	border: 0.05rem solid #ad1a1a;
	border-radius: .5rem;
}

.place-top {
	padding-top: 2.5rem;
	text-align: center;
	font-size: 1.4rem;
	color: #807e7e;
}

.warnning-tip {
	margin-bottom: 1.5rem;
	line-height: 3rem;
	text-align: center;
	font-size: 1.2rem;
	color: #666;
}

.complete-color {
	color: #56a204;
}

.mobile-input-box-bottom {
	width: 21rem;
	margin: 0 auto;
	margin-top: .6rem;
	font-size: 1.2rem;
	color: #808080;
}

</style>