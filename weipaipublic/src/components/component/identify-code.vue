<template>
<div class="identify_box" @click.self="close">
	<div class="identify_window" v-if="is_verify">
		<div class="identify_title"><span class="text_red">验证码</span>发送到<span class="text_red">{{input_mobile_number}}</span></div>
		<div class="identify_body clr">
            <input type="text" class="identify_body_input fl" v-model.trim="input_number" placeholder="请输入验证码">
            <a href="javascript:;" class="ideentify_body_button button_success fl" @click="goSend" v-show="is_send">{{send_text}}</a>

            <a href="javascript:;" class="ideentify_body_button button_wait fl" v-show="!is_send"><count-down ref="count" @childEvent="changeColor"></count-down>后重新获取</a>
            
        </div>
        <div class="identify_submit">
            <a href="javascript:;" class="submit_button" @click="confirm" :class="[{is_allow: isAllow}, {not_allow: !isAllow}]">确定</a>
        </div>
	</div>
    <div class="identify_window" v-if="!is_verify">
		<div class="identify_title">请输入您的电话号码</div>
		<div class="identify_body clr">
            <input type="number" class="identify_phone_input fl" v-model.trim="input_mobile_number" placeholder="请输入手机号">
        </div>
        <div class="identify_tip_box clr">
            <div class="tip fl" v-if="isNext==0">
                该号码已经验证通过，无须再验证
            </div>
            <div class="tip fr">
                验证通过后才能操作
            </div>
        </div>
        <div class="identify_submit">
            <a href="javascript:;" class="submit_button"  :class="[{is_allow: isNext==1}, {not_allow: isNext!=1}]" @click="goNext">下一步</a>
        </div>
	</div>
</div>
</template>
<script>
    var ajax = require("ajax");
    var countDown = require("@/components/smallcountdown");
    module.exports = {
		data: function() {
			return {
                send_text: "重新获取",
                is_send: false,
                input_number: '',
                identify_title: "验证码",
                input_mobile_number: '',
                is_verify: false,           //为false时输入手机号弹窗，为 true时为输入验证码弹窗
                // isAllow: false,
			}
		},
		props: ['msg'],
		components: {
            "count-down": countDown
        },
		mounted: function(){
            console.log(this.msg);
		},
		created: function(){
		},
		computed: {
            isAllow: function(){
                var is_ok;
                if(this.input_number!=''){
                    is_ok = true;
                }else{
                    is_ok = false;
                }
                return is_ok
            },
            isNext: function(){
                var is_next_ok;
                if(this.msg.mobileNumber==this.input_mobile_number){
                    is_next_ok = 0;
                }else if(/^1[34578]\d{9}$/.test(this.input_mobile_number)){
                    is_next_ok = 1;
                }else{
                    is_next_ok = 2;
                }
                return is_next_ok;
            }
		},
		methods: {
			goSend: function(){
                var that = this;
                // this.$nextTick( () => {
                //     this.$refs.count.startcount(60000);
                // })
                that.is_send = false;
                var type = that.msg.sendType;
                var mobile_number = that.input_mobile_number
                ajax.sendVerifiyCode(mobile_number,type,(data) => {
            		if(data.status==200){
                        this.is_verify = true;
                        this.$nextTick( () => {
                            this.$refs.count.startcount(60000);
                        })
            			console.log("发送验证码成功！");
                        // that.$emit("closeBox");
            		}else{
                        var params = data.msg;
            			that.$emit("goAlert",params);
            		}
            	});
            },
            confirm: function(){
                var that = this;
                var regexp = /^\d{4}$/;
                if(that.input_number==''){
                    var params = "您输入的验证码为空，请重新输入";
            		that.$emit("goAlert",params);   
                }else if(regexp.test(that.input_number)){
                    var type = that.msg.verifyType;
                    var mobile_number = that.input_mobile_number
                    ajax.smsVerifiy(mobile_number,that.input_number,type,function(data){
                        if(data.status==200){
                            var params = mobile_number;
                            that.$emit("closeBox",params);
                            that.input_mobile_number = '';
                            that.is_verify = false;
                        }else{
                            var params = data.msg;
            		        that.$emit("goAlert",params); 
                            that.is_verify = false;  
                        }
                    })
                }else{
                    var params = "您输入的验证码不是4位数字，请重新输入";
            		that.$emit("goAlert",params);    
                }
            },
            changeColor: function(){
                this.send_text = "重新发送";
                this.is_send = true;
            },
            goNext: function(){
                if(this.isNext==1){
                    
                    this.goSend();
                }
                
            },
            close: function(ev){
                this.input_mobile_number = '';
                this.is_verify = false;
                var params = '';
                this.$emit("closeBox",params);
            }
		}
	}


</script>
<style>
/* 公共弹窗 */
.identify_box {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 14;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
}
.identify_window {
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 1.5rem;
	width: 100%;
	min-height: 20rem;
	background-color: #fff;
}
.identify_title{
    width: 100%;
    font-size: 1.4rem;
    color: #666;
}
.text_red{
    color: #F00;
}
.identify_body{
    width: 100%;
    margin-top: 1.6rem;
}
.identify_body_input{
    width: 13.7rem;
    height: 4.4rem;
    color: #999;
    border: 1px solid #DDD;
    line-height: 4.4rem;
    padding-left: 1rem;
}
.identify_phone_input{
    width: 100%;
    height: 4.4rem;
    color: #666;
    border: 1px solid #DDD;
    line-height: 4.4rem;
    padding-left: 1rem;
    border-radius: .3rem;
}
.identify_tip_box{
    width: 100%;
    padding: 1rem 0;
}
.tip{
    font-size: 1.2rem;
    color: #999;
}
.identify_phone_input::placeholder{
    color: #999;
}
.ideentify_body_button{
    width: 19.7rem;
    height: 4.4rem;
    color: #FFF;
    line-height: 4.4rem;
    text-align:  center;
    border-radius: .3rem;
    margin-left: 1rem;
}
.button_success{
    background-color: #6699ff;
}
.button_wait{
    background-color: #DDD;
}
.identify_submit{
    margin: 2.25rem 0;
    text-align: center;
}
.submit_button{
    display: inline-block;
    width: 100%;
    height: 4.4rem;
    line-height: 4.4rem;
    color: #FFF;
    text-align: center;
    border-radius: .3rem;
}
.is_allow{
    background-color: #15AF25;
}
.not_allow{
    background-color: #DDD;
}


</style>