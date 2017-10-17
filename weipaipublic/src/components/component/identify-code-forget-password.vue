<template>
    <div class="identify-code-forget-password" @click.self='close'>
        <div class="dialog-box">
            <div class="tip-box" v-show='is_send'>
                短信密码已经发送，请填写验证码
            </div>
        
            <div class="operate-box">
                <div class="form-group clr">
                    <span class="fl item-key">手机号码</span>
                    <span class="fr item-value">{{info.mobile}}</span>
                </div>
                <div class="code-group clr">
                    <span class="fl  code-key">验证码</span>
                    <div class="fr code-value" >
                        <input type="text" placeholder="请输入验证码"  v-model='code' class='input-btn'>
                        <a href="javascript:;" class='more-send' v-if='!is_time_out'><count-down ref="count" @childEvent="changeColor"></count-down></a>
                        <a href="javascript:;" class='more-text' v-if='is_time_out' @click='getAuthCode'>重新发送</a>
                    </div>
                </div>
                <div class="footer-box">
                    <a href="javascript:;" class='confirm-btn' :class='{"is-allow": hasCode}' @click='goAuthCode'>确定</a>
                </div>
            </div> 

        </div>
    </div>
</template>
<style scoped>
    .identify-code-forget-password{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #F0F2F2;
        z-index: 12;
    }
    .dialog-box{
        margin: 0;
        width: 100%;
        background-color: #fff;
    }
    .tip-box{
        width: 100%;
        height: 3rem;
        background-color: #F0F2F2;
        font-size: 1.3rem;
        line-height: 3rem;
        color: #808080;
        text-align: center;
    }
    .dialog-box{
        width: 100%;
    }
    .operate-box{
        width: 66.7%;
        margin: 0 auto;
    }
    .form-group{
        width: 100%;
        height: 3.9rem;
        line-height: 1;
    }
    .code-group{
        width: 100%;
        line-height: 2rem;
        margin-top: 2.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #ccc;
    }
    .item-key,.item-value{
        font-size: 1.4rem;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }
    .code-key,{
        font-size: 1.4rem;
        height: 2rem;
        line-height: 2rem;
    }
    .code-value{
        font-size: 1.1rem;
        height: 2rem;
        line-height: 2rem;
    }
    .more-send{
        font-size: 1.1rem;
        height: 2rem;
        line-height: 2rem;
    }
    .key-code{
        color: #666;
        width: 6.75rem;
    }
    .item-key{
        color: #808080;
        width: 6.75rem;
    }
    .item-value{
        width: 17.8rem;
    }
    .code-value{
        width: 17.8rem;
    }
    .input-btn{
        display: inline-block;
        width: 10.8rem;
        /*padding-left: 1rem;*/
        /*padding-right: 1rem;*/
        text-align: left;
    }
    .footer-box{
        width: 100%;
        margin-top: 3rem;
        /*margin-bottom: 3rem;*/
        height: auto;
        border-bottom: 1px solid transparent;
    }
    .confirm-btn{
        display: block;
        width: 100%;
        height: 3.3rem;
        line-height: 3.3rem;
        font-size: 1.4rem;
        background-color: #E6E6E6;
        color: #BFBFBF;
        border-radius: 0.2rem;
        text-align: center;
        margin-bottom: 3rem;
    }
    .is-allow{
        background-color: #AD1A1A;
        color: #fff;
    }
    .more-send,.more-text{
        display: inline-block;
        font-size: 1.1rem;
        /*line-height: 2rem;*/
        padding-left: 1rem;
        padding-right: 1rem;
        color: #AD1A1A;
        border: 1px solid #AD1A1A;
        border-radius: 1rem;
    }
</style>
<script>
    import countDown from "@/components/smallcountdown";
    import ajax from 'assets/js/ajax';
    export default{
        components: {
            'count-down': countDown
        },
        data: function(){
            return {
                is_send: true,
                is_time_out: false,
                code: '',
                is_allow: false
            }
        },
        computed: {
            hasCode: function(){
                if(this.code){
                    return true
                }else{
                    return false
                }
            }
        },
        props: ['info'],
        created: function(){

        },
        monuted: function(){

        },
        methods: {
            getAuthCode: function(){
                let that = this;
                let mobile = this.info.mobile;
                 ajax.getAuthCode(mobile,function(res){
                    if(res.status==200){
                        that.is_send = true;
                        that.is_time_out = false;
                        that.startcount(60000);
                    }else{
                        let params = res.msg;
                        that.$emit('goAlert',params);
                    }
                })

            },
            goAuthCode: function(){
                let that = this;
                let mobile = this.info.mobile;
                let vcode = this.code;
                let type  = 1;
                if(this.hasCode){
                    ajax.loginWithVcode(mobile,vcode,type,function(res){
                        if(res.status==200){
                            let params = vcode;
                            that.$emit('checkSuccess',params);
                        }else{
                            let params = res.msg;
                            that.$emit('goAlert',params);
                        }
                    })
                }else{
                    let params = '验证码不能为空';
                    this.$emit('goAlert',params);
                }
            },
            close: function(){
                this.$emit('closeBox');
            },
            changeColor: function(){
                this.is_time_out = true;
            },
            startcount: function(param){
                this.$nextTick( () => {
                            this.$refs.count.startcount(param);
                 });
            } 
        }
    }
</script>