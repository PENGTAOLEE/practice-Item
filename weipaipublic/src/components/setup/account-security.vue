<template>
	<div class='account-secirity'>
	   <div class="buyerList-group cc" @click='goSetMobile'>
            <label>手机号码</label>
            <em class="compete-row"></em>
            <p class="normal-list">{{mobile||'未设置'}}</p>
        </div>
        <div class="buyerList-group cc" @click='goSetPassword'>
            <label>登录密码</label>
            <em class="compete-row"></em>
            <p class="normal-list">{{is_password==1?'已设置':'未设置'}}</p>
        </div>
        <confirm-cancel :info='tip_info' @goConfirm='goConfirm' @goCancel='goCancel'
        v-show='is_tip_show'  ></confirm-cancel>
        <identify-code v-show='is_code_show' :msg='mobileInfo' @goAlert='goAlert' @closeBox='closeCodeBox'></identify-code>
        <show-alert v-show='is_alert_show' @closeBox='closeAlertBox' :msg='alert_msg'></show-alert>
        <set-password v-show='is_set_password' :msg='setPasswordInfo' @goAlert='goAlert' @goCancel='closeSetPasswordBox'></set-password>
        <enter-password v-show='is_enter_password' :msg = 'mobile' @goEnterPasswordSuccess='goEnterPasswordSuccess' @goCancel='closeEnterPasswordBox' @forgetPassword='forgetPassword' @goAlert='goAlert'></enter-password>
        <bind-mobile v-show='is_forget_password' :info='forget_info' @goConfirm='resolveForget' @goCancel='closeForgetBox'></bind-mobile>
        <identify-code-forget-password v-show='has_forget' @closeBox='closeForgetAuth' :info='forget_auth_info' ref='forgetComponent' @goAlert='goAlert' @checkSuccess='checkSuccess'></identify-code-forget-password>
	</div>
</template>
<script>
    import ajax from 'assets/js/ajax';
    import utils from 'assets/js/utils';
    import confirmCancel from '@/components/component/confirm-cancel';
    import identifyCode from '@/components/component/identify-code';
    import showAlert from '@/components/component/showAlert';
    import setPassword from '@/components/component/set-password';
    import enterPassword from '@/components/component/enter-password';
    import bindMobile from '@/components/component/bind-mobile';
    import identifyCodeForgetPassword from '@/components/component/identify-code-forget-password';
    var config = window.config;
    export default{
        components: {
            'confirm-cancel': confirmCancel,
            'identify-code': identifyCode,
            'show-alert': showAlert,
            'set-password': setPassword,
            'enter-password': enterPassword,
            'bind-mobile': bindMobile,
            'identify-code-forget-password': identifyCodeForgetPassword
        },
        data: function(){
            return {
                mobile: '', // 数据对象
                is_password: 0,  //是否已经设置密码  0为未设置， 1为已设置
                is_tip_show: false,
                
                mobileInfo: {},            //发送手机弹窗需要传的值
                is_code_show: false,     //手机弹窗判断变量
                is_alert_show: false,        //弹窗
                alert_msg: '',
                tip_info: {           //确认和取消弹窗参数设置
                    tip_title: '',
                    tip_content: '',
                    confirmtext: '确定',
                    canceltext: '取消',
                    params: ''          //确认和取消弹窗参数设置

                },
                is_set_password: false,
                oldPassword: '',
                setPasswordInfo: {
                    oldPassword: '',
                    mobile: '',
                    vcode: ''
                },
                is_enter_password: false,
                forget_info: {
                    tip_title: '',
                    tip_content: ''
                },
                is_forget_password: false,
                has_forget: false,
                forget_auth_info: {
                    mobile: this.mobile,
                    vcode:  '',
                    type: 1
                },
                vcode: ''

            }
        },
        created: function(){
        	this.getAccountSecurity();
        },
        mounted: function(){
            document.title='账户安全';
        },
        methods: {
        	getAccountSecurity: function(){
                let that = this;
                ajax.getAccountSecurity(function(res){
                    if(res.status==200){
                        that.mobile = res.data.mobile;
                        that.is_password = res.data.is_password;
                    }else{
                        that.mobile = '';
                    }
                })
            },
            goSetPassword: function(){
                if(!this.mobile){
                    this.tip_info.tip_title = '设置密码之前需要绑定手机号';
                    this.tip_info.confirmtext = '去绑定';
                    this.tip_info.params = 1;
                    this.is_tip_show = true;
                }else{
                    if(this.is_password==0){
                        this.setPasswordInfo.mobile = this.mobile;
                        this.setPasswordInfo.oldPassword = this.oldPassword;
                        this.is_set_password = true; 
                    }else{
                        this.is_enter_password = true;  
                    }
                    
                }
            },
            goSetMobile: function(){
                    this.mobileInfo.sendType = 3;   //3为发送验证码的type参数值
                    this.mobileInfo.verifyType = 2;  //2为验证验证码的type参数值
                    this.mobileInfo.mobileNumber = this.mobile;
                    this.is_code_show = true;
            },
            goConfirm: function(params){
                if(params==1){     //1为提示绑定手机号弹窗
                    this.is_tip_show = false;

                    this.mobileInfo.verifyType = 2;
                    this.mobileInfo.mobileNumber = '';
                    this.is_code_show = true;
                }else if(params==2){     //2 为提示发送验证码弹窗
                        this.is_tip_show = false;
                        this.setPassword();
                }
                
            },
            goPassword: function(){
                this.setPasswordInfo.oldPassword = this.oldPassword;
                this.setPasswordInfo.mobile = this.mobile;
                this.is_set_password = true;
            },
            goCancel: function(){
                console.log('取消');
                this.is_tip_show = false;
            },
            goAlert: function(params){
                // console.log(弹出框);
                console.log(params);
                this.alert_msg = params;
                this.is_alert_show = true;
            },
            closeCodeBox: function(params){
                this.is_code_show = false;
                if(params){
                    this.mobile = params;
                }
            },
            closeAlertBox: function(){
                this.is_alert_show = false;
            },
            closeSetPasswordBox: function(){
                this.is_set_password = false;
                this.is_password = true;
            },
            goEnterPasswordSuccess: function(params){
                this.is_enter_password = false;
                this.oldPassword = params;
                this.setPasswordInfo.mobile = this.mobile;
                this.setPasswordInfo.oldPassword = this.oldPassword;
                this.is_set_password = true;
            },
            closeEnterPasswordBox: function(){
                this.is_enter_password = false;
            },
            forgetPassword: function(){
                this.is_enter_password = false;
                this.forget_info.tip_title = '我们将通过验证手机号重置密码即将发送验证码到',
                this.forget_info.tip_content = this.mobile;
                this.is_forget_password = true;
            },
            resolveForget: function(){
                this.is_forget_password = false;
                this.goSendCode();
            },
            closeForgetBox: function(){
                this.is_forget_password = false;
            },
            goSendCode: function(){
                console.log(1111);
                let that = this;
                let mobile = this.mobile;
                ajax.getAuthCode(mobile,function(res){
                    if(res.status==200||res.status==202){
                        that.forget_auth_info.mobile = that.mobile;
                        that.forget_auth_info.type = 1;
                        that.has_forget = true;
                        that.$refs.forgetComponent.startcount(60000);
                    }else{
                       that.alert_msg = res.msg;
                       that.is_alert_show = true; 
                    }
                })
            },
            closeForgetAuth: function(){
                this.has_forget = false;
            },
            checkSuccess: function(params){
                this.has_forget = false;
                this.vcode = params;
                this.setPasswordInfo.mobile = this.mobile;
                this.setPasswordInfo.vcode = this.vcode;
                this.is_set_password = true;
            }
        }
    }

</script>
<style scoped>
	.account-secirity{
		font-size: 1.4rem;
        background-color: #fff;
	}
    /*信息列表*/

.buyerList-group{
    display: block;
    padding: 1.25rem 1.5rem;
    font-size: 1.6rem;
    border-bottom: .05rem solid #ddd;
}
.buyerList-group label{
    float: left;
    width:9.5rem;
    float: left;
}

.buyerList-group input{
    float: left;
    width: 24rem;
    color: #999;
}
.normal-list{
    float: right;
    font-size: 1.4rem;
    color: #999;
    margin-right: 1rem;
}
.compete-row{
    width: .75rem;
    height: 1.3rem;
    background:url(../../assets/img/arrow.png) no-repeat;
    background-size: 100%;
    float: right;
    margin-top: .5rem;
}

</style>

