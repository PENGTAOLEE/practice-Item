<template>
<div class="bank-card-box">
	<!-- 输入密码 -->
	<div class="common-box" v-if="showBankInput">
		<div class="bankCardInfo_title">输入您的安全支付密码（6位数字）</div>
		<div class="cell-input">
			<div class="cell-input_hd">
				<label class="cell-input_label">支付密码</label>
			</div>
			<div class="cell-input_bd" @click="passwordInput">
				<input class="cell-input_input" type="password" placeholder="密码" v-model = "identityInfo.password">
			</div>
		</div>
		<div class="bankCardInfo_title">认真填写以下信息，用于找回支付密码</div>
		<div class="cell-input">
			<div class="cell-input_hd">
				<label class="cell-input_label">姓名</label>
			</div>
			<div class="cell-input_bd">
				<input class="cell-input_input" type="text" placeholder="填写真实姓名" v-model = "identityInfo.userName">
			</div>
		</div>
		<div class="cell-input">
			<div class="cell-input_hd">
				<label class="cell-input_label">身份证号</label>
			</div>
			<div class="cell-input_bd">
				<input class="cell-input_input" type="text" placeholder="填写身份证号" v-model = "identityInfo.IDNumber">
			</div>
		</div>
        <div class="bankCardInfo_title">此信息会严格保密，请放心填写</div>
		<div class="btn_area">
			<span class="btn" @click="verifyUserInfo">确定</span>
		</div>

	</div>
	<!-- 密码输入 -->
	<password v-if="showPassword" id="password-input" :title="title" @validate="verifyPassword"></password>

	<!-- 组件弹窗 -->
	<show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>
</div>
</template>
<script>

	
	var Password = require("@/components/balance/password")
    var showAlert = require("@/components/component/showAlert")
	var ajax = require("ajax");
    var utils = require("utils");
	

    module.exports = {
		
		data: function(){
			return {
				userName: '',
				identification: '',
				showBankInput: true,

				title: '请输入支付密码',
                verifyUser: true,
                showPassword: false,
                identityInfo: {
                	password: '',
                    userName: '',         
                    IDNumber: ''        
                },
                // signStr: '',   
                showAlertBoll: false,
                tipMsg: '',
                firstPassword: '',
                secondPassword: ''
			}
		},
		components: {
			'password': Password,
            'show-alert': showAlert
		},
		methods: {
			submit: function(){
				// var pwd = this.paymentPassword;
				// var uName = this.userName;
				// var card = this.identification;
				// ajax.referBankCard(pwd,uName,card);
			},

			// 密码输入
			passwordInput: function() {
				// 置空先前输入的密码
				this.firstPassword = '';
				this.secondPassword = '';

				this.showBankInput = false;
				this.showPassword = true;
			},
			// 密码输入并验证完成
			passwordComplete: function() {
                this.title = '请输入支付密码';
				this.showBankInput = true;
				this.showPassword = false;
			},

			// 验证用户输入
            verifyUserInfo: function() {
                var _this = this;
                var password = this.identityInfo.password;
                var userName = this.identityInfo.userName;
                var IDNumber = this.identityInfo.IDNumber;

                var nameRegexp = /^[\u4e00-\u9fa5]*$/;
                var idRegexp = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
                if (!password || !userName || !IDNumber) {
                	_this.tipMsg = '请完整填写您的信息';
                    _this.showAlertBoll = true;
                    return
                }

                if (!nameRegexp.test(userName)) {
                	_this.tipMsg = '请输入真实姓名';
                    _this.showAlertBoll = true;
                    return
                }
                if (!idRegexp.test(IDNumber)) {
                    _this.tipMsg = '请输入正确格式的身份证号';
                    _this.showAlertBoll = true;
                    return
                };
                if (password && userName && IDNumber) {

                    _this.setIdentity(userName,IDNumber,password)
                }
                
            },

            /**
             * 设置支付密码 姓名 身份证号
             * @param {string} userName 姓名
             * @param {number} IDNumber 身份证号
             * @param {string} password 密码
             */
            setIdentity: function(userName,IDNumber,password) {
                var _this = this;
                
                ajax.addIdentity(userName,IDNumber,password,function(data){
                    if (data.status == 200) {
                         // 银行卡列表 || 余额充值
                        if (utils.getRequest().from == 'payment') {
                            // 需要保证该步骤会刷新页面
                            _this.$router.go(-1);
                        } else if (utils.getRequest().from == 'paysecurity') {//安全支付
                            _this.$router.push('/pay');
                        } else if(utils.getRequest().from == 'bankcard') {// 管理银行卡
                            _this.$router.push('/bankcardadd/bankcard');
                        } else if(utils.getRequest().from == 'recharge') {// 充值
                            _this.$router.push('/recharge/0');
                        } else if(utils.getRequest().from == 'withdraw') {//提现
                            _this.$router.push('/withdraw')
                        } else {
                            _this.$router.push('/balance/0')
                        }
                    } else {
                        _this.tipMsg = data.msg;
                        _this.showAlertBoll = true;
                    }
                })
            },

            // 验证密码
            verifyPassword: function(value) {
                var _this = this;
                if (!this.firstPassword) {
                    this.firstPassword = value;
                    this.initInputBox();
                    this.title = "再次输入支付密码"
                } else {
                    this.secondPassword = value;
                    if (this.firstPassword === this.secondPassword) {
                    	this.identityInfo.password = this.firstPassword;
                    	this.passwordComplete()
                    } else {
                        this.tipMsg = "两次输入的密码不一致";
                    	this.showAlertBoll = true;
                    }
                    
                }

            },

            // 初始化输入框
            initInputBox: function() {
                // var tip = tip || this.title;
                $('.paySimulation').find("b").css({"display":"none"});

                $('.payInput').val('');

                $('.payInput').focus();

                // 移除当前active样式 并且为第一个i 添加active
                $('.paySimulation').find("i").removeClass('active');
                $('.paySimulation').find("i").eq(0).addClass('active');

            },

            // 关闭alert弹窗
            closePopup: function() {
                this.showAlertBoll = false;

                this.initInputBox()
            }
		}
	}

</script>
<style>
/* input 输入 */
.bank-card-box {
    font-family: PingFangSC;
}
.cell-input{
    position: relative;
    padding: 1.5rem;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    line-height: 1;
    font-size: 1.6rem;
    background-color: #fff;
}
.cell-input:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9; 
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.cell-input_label{
    display: block;
    width: 10rem;    
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
/* input 更多 */
.cell-more{
    position: relative;
    display: -webkit-flex;
    display: flex;
    padding:1.5rem;
    align-items: center; 
    background-color: #fff;   
}
.cell-more:active{
    background-color: #ececec;
}
.cell-more:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9; 
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.cell-more_hd{
    -webkit-flex: 1;
    flex:1;
    line-height: 1;
    font-size: 1.4rem;
    color: #333;
}
.cell-more_ft{
    position: relative;
    color:red;
    text-align: right;
}
.cell-more_ft:after{
    content: " ";
    display: inline-block;
    height: 0.8rem;
    width: 0.8rem;
    border-width: 0.15rem 0.15rem 0 0;
    border-color: #999;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -0.1rem;
    position: absolute;
    top: 50%;
    margin-top: -0.4rem;
    right: 0.1rem;
}
/* 标题 */
.bankCardInfo_title{
    padding: 0 1.5rem;
    height: 4.5rem;
    line-height: 4.5rem;
    color: #666;
    font-size: 1.6rem;
}
/* 按钮 */
.btn_area{
    margin: 4rem 3.75rem;
}
.btn{
    display: block;
    margin: 0 auto;
    padding:0 1rem;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    background-color: #15af25;
    color: #fff;
    font-size: 1.6rem;
    box-sizing: border-box;
    border-radius: 0.25rem;
}
.btn:active{
    background-color: #64d86c;
}
/* 修改身份信息 */
.mask{
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background: rgba(0,0,0,0.4);
}
/* 弹窗 修改身份信息 */
.cpm{
    position: absolute;
    bottom:0;
    left:0;
    width: 100%;
    background-color: #f7f8f7;
    overflow: hidden;
}
.cpm_icon{
    margin:1.25rem auto .8rem;
    display: block;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    /*background: #15af25 url(../../../..../assets/img/icon/exclamationPoint.png) center center/.6rem 3.5rem no-repeat;*/
}
.cpm_text-area, .cpm_btn-area{
    padding:0 3.5rem; 
}
.cpm_text{  
    line-height: 2.8rem;
    font-size: 1.6rem;
    color: #000;
    text-align: center;   
}
.cpm_btn_ok, .cpm_btn_close{
    margin: 1.9rem 0;
    display: block;
    width: 30rem;
    height: 4.3rem;
    line-height: 4.3rem;
    color: #333;
    font-size: 1.6rem;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: .3rem;
}
.cpm_btn_close{
    background-color: #808593;
    color: #fff;
}
.cpm_btn_ok:active{
    background: rgba(0,0,0,.1);
}
.cpm_btn_close:active{
    background: rgba(0,0,0,.5);
}
</style>
