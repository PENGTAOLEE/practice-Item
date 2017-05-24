<template>
<div class="pay-alter-box">
	<!-- 验证用户组件 -->
	<ver-identity v-if="verifyUser" @confirmBtn="verifyUserInfo" :info="identityInfo"></ver-identity>

	<compt_Password v-if="showPassword" id="password-input" :title="title" @validate="verifyPassword"></compt_Password>

	<!-- 弹窗 修改身份信息 -->
	<div class="cpmBox" v-if="isAlterMask">
		<div class="mask" v-on:click="alterMask"></div>
		<div class="cpm" >
			<div class="cpm_inner">
				<div class="cpm_text-area">
					<i class="shotsprites warning"></i>
					<p class="cpm_text">修改身份信息前请先手动解绑所有银行卡！</p>
				</div>
				<div class="cpm_btn-area">
					<a class="cpm_btn_ok" href="/bankCardAdd/bankcard">去解绑</a>
					<a class="cpm_btn_close" href="javascript:;"  v-on:click="alterMask" >取消</a>
				</div>
			</div>
		</div>
	</div>
	

	<!-- 组件弹窗 -->
	<show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>
</div>
</template>
<script>


    module.exports = {
        
        data: function(){
            return {
                title:'请输入支付密码',
                verifyUser: true,
                showPassword: false,
                // 输入信息
                identityInfo: {
                    userName: '',         // 真实姓名
                    IDNumber: '',         // 身份证号
                },
                signStr: '',              // 验证成功返回值
                // 弹窗
                showAlertBoll: false,
                tipMsg: '',
                // 两次输入密码
                firstPassword: '',

                isAlterMask: false        //确定解绑弹窗
                
            }
        },
        components:{
            'ver-identity': VerIdentity,
            'compt_Password': comptPassword,
            'show-alert': showAlert
        },
        mounted: function() {
            // 获取当前用户数据
            var data = this.showUserInfo();
            this.identityInfo.userName = data.name;
            this.identityInfo.IDNumber = data.idnumber;
        },
        methods: {
            // 获取原用户信息
            showUserInfo: function(){
                var _this = this;
                var respondObj = {}
                ajax.showUserInfo(function(res) {
                    if (res.status == 200) {
                        respondObj = res.data;                                     
                    };
                })
                return respondObj;

            },
            // 验证用户信息
            verifyUserInfo: function() {
                var _this = this;
                var regExp = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;

                // 获取到用户输入的信息 进行身份验证
                var userName = this.identityInfo.userName;
                var IDNumber = this.identityInfo.IDNumber;
                if (!userName || !IDNumber) {
                    _this.tipMsg = '请完整填写您的信息';
                    _this.showAlertBoll = true;
                    return
                } 
                if (!/^[\u4e00-\u9fa5]*$/.test(userName)) {
                    _this.tipMsg = '请输入真实姓名';
                    _this.showAlertBoll = true;
                    return
                };
                if (!regExp.test(IDNumber)) {
                    _this.tipMsg = '请输入正确格式的身份证号';
                    _this.showAlertBoll = true;
                    return
                };
                if (userName && IDNumber) {
                    ajax.checkCardBind(userName,IDNumber,function(data) {
                        if (data.status == 200) {
                            // 验证身份信息 成功后跳转
                            _this.verifyUser = false;
                            _this.showPassword = true;
                        } else if (data.status == 201) {
                            // 不成功 弹出弹窗 并跳转到银行卡解绑页面
                            _this.tipMsg = data.msg;
                            _this.showAlertBoll = true;
                        } else if(data.status == 202) {
                            _this.isAlterMask = true;
                        }
                    })
                    
                }
                
            },

            // 验证输入密码
            verifyPassword: function(value) {
                var _this = this; 
                ajax.editIdentity(this.identityInfo.userName,this.identityInfo.IDNumber,value,function(data) {
                    if (data.status == 200) {
                        _this.tipMsg = '您已经成功修改了您的信息！';
                        _this.showAlertBoll = true;
                        _this.$router.push('/pay');
                    } else {
                        _this.tipMsg = data.msg;
                        _this.showAlertBoll = true;
                    }
                })
                
            },

            // 初始化输入框
            initInputBox: function() {
                // var tip = tip || this.title;
                 // 置空输入框
                $('.paySimulation').find("b").css({"display":"none"});

                // 当前input的长度置为零
                $('.payInput').val('');

                // 当前输入框聚焦
                $('.payInput').focus();

                // 第一个元素获得模拟光标
                $('.paySimulation').find("i").removeClass('active');
                $('.paySimulation').find("i").eq(0).addClass('active');

            },
            // 弹窗
            alterMask:function(){
                this.isAlterMask = !this.isAlterMask;
            },

            // 弹窗关闭
            closePopup: function() {
                this.showAlertBoll = false;

                this.initInputBox()
            }

        }
    }

</script>
<style>
/* 弹窗 修改身份信息 */
.cpmBox {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
    width: 100%;
    height: 100%;
}
.cpm{
    position: absolute;
    bottom:0;
    left:0;
    width: 100%;
    background-color: #f7f8f7;
    overflow: hidden;
}
.cpm_icon{
    width: 5rem;
    height: 5rem;
    margin: 1.25rem auto .8rem;
    display: block;
    background-position: 0 -1014px;
    background-size: 1rem auto;
}
.cpm_text-area, .cpm_btn-area {
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
.warning {
    display: block;
    width: 5.2rem;
    height: 5.2rem;
    margin: 0 auto;
    margin-top: .7rem;
    background-position: -24.2rem -15.7rem;
}
</style>
