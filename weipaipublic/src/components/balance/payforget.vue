<template>
    <div class="pay-forget-box">
        <!-- 验证用户组件 -->
        <ver-identity v-if="verifyUser" @confirmBtn="verifyUserInfo" :info="identityInfo"></ver-identity>

        <compt_Password v-if="showPassword" id="password-input" :title="title" @validate="verifyPassword"></compt_Password>

        <!-- 组件弹窗 -->
        <show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>
    </div>
</template>

<script>
    var VerIdentity = require("@/components/balance/bankCardAuth");
    var comptPassword = require("@/components/balance/password");
    var showAlert = require("@/components/component/showAlert");
    var ajax = require('ajax');
    export default {
        data: function(){
            return {
                title:'请输入新的交易密码',/*在输入一遍，确认您的交易密码*/
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
                secondPassword: ''
                
            }
        },
        components:{
            'ver-identity': VerIdentity,
            'compt_Password': comptPassword,
            'show-alert': showAlert
        },
        mounted: function() {
        },
        methods: {
            // 验证用户信息
            verifyUserInfo: function() {
                var _this = this;
                // 获取到用户输入的信息 进行身份验证
                var userName = this.identityInfo.userName;
                var IDNumber = this.identityInfo.IDNumber;
                // if (!/^\d{17}(\d|x)$/i.test(IDNumber)) {
                //     _this.tipMsg = '请输入正确的身份证号';
                //     _this.showAlertBoll = true;
                //     return
                // };
                if (userName && IDNumber) {
                    ajax.verifyIdentity(userName,IDNumber,function(data) {
                        if (data.status == 200) {
                            // 操作页面逻辑
                            _this.verifyUser = false;
                            _this.showPassword = true;
                            _this.signStr = data.data[0];
                        } else {
                            _this.tipMsg = data.msg;
                            _this.showAlertBoll = true;
                        }
                    })
                };
                
            },

            // 验证输入密码
            verifyPassword: function(value) {
                var _this = this;
                // firstPassword
                // secondPassword
                if (!this.firstPassword) {
                    this.firstPassword = value;
                    // 初始化输入框
                    this.initInputBox();
                    this.title = "再输一遍，确认您的交易密码"
                } else {
                    this.secondPassword = value;
                    if (this.firstPassword === this.secondPassword) {
                        ajax.paypwdChange(_this.secondPassword,_this.signStr,function(data) {
                            if (data.status == 200) {
                                // 跳转回去
                                _this.$router.push('/pay');
                            } else {
                                _this.tipMsg = data.msg;
                                _this.showAlertBoll = true;
                            }
                        })
                    } else {
                        _this.tipMsg = "两次输入不一致";
                        _this.showAlertBoll = true;
                    }
                    
                } 

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

            // 弹窗关闭
            closePopup: function() {
                this.showAlertBoll = false;

                this.initInputBox()
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>