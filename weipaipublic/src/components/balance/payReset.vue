<template>
    <div class="pay-reset-box">
        <compt_Password :title="title" @validate="verifyPassword"></compt_Password>

        <!-- 组件弹窗 -->
        <show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>
    </div>
</template>

<script>
    var comptPassword = require("@/components/balance/password");
    var showAlert = require("@/components/component/showAlert");
    var ajax = require('ajax');
    export default {
        data:function(){
            return {
                // 数字键盘
                // 弹窗
                showAlertBoll: false,
                tipMsg: '',
                // 密码输入
                title:'请输入交易密码，以验证身份',
                signStr: '',  // 验证成功返回的随机数
                initialPassword: '',
                firstInput: '',
                secondInput: '',
                isOk: false, // 是否驗證了密碼
                isOnce: false,     // 是否已经输入了第一次密码
                isTwo: false,      // 是否已经输入第二次密码

            }
        },
        components: {
            'compt_Password': comptPassword,
            'show-alert': showAlert
        },
        mounted: function() {
        },
        methods: {
            // 处理密码输入完成后的状态
            verifyPassword: function(value){
                var _this = this;
                var prv_v =  value;
                // 验证当前用户的输入密码 只有这里验证成功才能执行输入
                if (!_this.initialPassword) {
                    ajax.VerifyPassword(prv_v,function(data){
                        if (data.status == 200) {
                            _this.initialPassword =  prv_v;
                            _this.isOk = true;
                            _this.signStr = data.data[0];

                        } else {
                            _this.showAlertTip(data.msg)
                        }
                    })
                };
                

                // 初始密碼驗證通過
                if ( this.initialPassword && !this.firstInput && this.isOk && this.isOnce) {
                    this.firstInput = prv_v;
                    this.title = "再输一遍，确认您的交易密码";
                    // 初始化输入框
                    this.initInputBox()
                } else if (this.initialPassword && this.firstInput && this.isOk && this.isOnce) {
                    this.secondInput = prv_v; 
                } else if ( this.initialPassword && this.isOk) {
                    // this.initialPassword =  prv_v;
                    this.title = "请输入新的交易密码";
                    this.initInputBox()
                    // 已经输入了第一次密码
                    this.isOnce = true;
                }

                // 比较两次输入密码
                if ( this.firstInput && this.secondInput && this.firstInput === this.secondInput) {
                    // 把两次输入的密码存入后端
                    this.payPasswordChange(this.firstInput,this.signStr)
                } else if(this.firstInput && this.secondInput && this.firstInput != this.secondInput) {
                    this.showAlertTip('两次输入不一致')
                }
                

            },

            // 重新设置密码
            payPasswordChange: function(first,signstr) {
                /**
                 * 如果两次输入的密码相同 把当前密码存入数据库
                 */
                var _this = this; 
                ajax.paypwdChange(first,signstr,function(data) {
                    if (data.status == 200) {
                        // 跳转回余额首页 买家 || 卖家
                        _this.$router.push('/balance/1')
                    } else {
                        _this.showAlertTip(data.msg);
                    }
                })
            },

            // 初始化输入框
            initInputBox: function() {
                $('.paySimulation').find("b").css({"display":"none"});

                $('.payInput').val('');

                $('.payInput').focus();

                // 移除当前i标签的active 为第一个添加active
                $('.paySimulation').find("i").removeClass('active');
                $('.paySimulation').find("i").eq(0).addClass('active');

            },
            // 弹窗提示
            showAlertTip: function(tip) {
                this.tipMsg = tip;
                this.showAlertBoll = true;
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