<template>
<div class="show-alert" @click.self='close'>
	<div class="tip-box">
        <div class="tip-msg" >
            <p class="tip-title">
                为了您的帐户安全，请先输入原始密码
            </p>
            <p class="tip-content" >
                <input class="enter-password" type="password" v-model='initialPassword' placeholder="请输入原始密码">
            </p>
            <p class="tip_content clr">
            	<span @click='forgetPassword' class="forget-password fr" type='password'>忘记密码?</span>
            </p>
        </div>
		<div class="tip-footer clr">
            <div class="tip-confirm fl footer-left" @click="goCancel">取消</div>
			<div class="tip-confirm fl" @click="goConfirm">确定</div>
		</div>
	</div>
</div>
</template>
<script>

	
	
    import ajax from 'assets/js/ajax';
	
    export default{
		data: function() {
			return {
				initialPassword: ''
			}
		},
		props: ['info'],
		
		mounted: function(){

		},
		methods: {
			close: function() {
				this.$emit('goCancel');
			},
			goConfirm: function(){
				// this.$emit('goEnterPasswordSuccess');
				if(!/^[A-Za-z0-9]{8,18}$/.test(this.setpassword)){
					let params = '您输入的密码格式不对';
					this.$emit('goAlert',params);
				}else{
					let that = this;
					let password = this.initialPassword;
					ajax.checkPassword(password,function(res){
						if(res.status==200){
							let params = password;
							that.$emit('goEnterPasswordSuccess',params);
                            that.initialPassword = '';
						}else{
                            that.goCancel();
							let  params = res.msg;
							that.$emit('goAlert',params);
                            that.initialPassword = '';
						}
					})
				}
			},
            goCancel: function(){
                this.$emit('goCancel');
            },
            forgetPassword: function(){
            	this.$emit('forgetPassword');
            }
		}
	}


</script>
<style scoped>
/* 默认弹窗样式 */
.show-alert {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 39;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0);
}
.tip-box {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
            transform: translate3d(-50%,-50%,0);
    width: 25.1rem;
    max-height: 10.7rem;
    /*bottom: 0;
    left: 0;
    width: 100%;*/
    /*min-height: 20rem;*/
    height: auto;
    background: #F7F8F7;
    /*border-radius: .5rem;*/
    text-align: center;
    font-size: 1.4rem;
    background-color: #fff;
}
.tip-msg {
    width: 100%;
    /*min-height: 9.5rem;*/
   /* padding: 1rem 0rem 2rem;*/
    /*border-bottom: 1px solid #e5e5e5;*/
    color: #000;
    font-size: 1.3rem;
    text-align: center;
}
.tip-title{
    /*padding: 0rem 3.5rem;*/
    font-size: 1.3rem;
    height: 3.2rem;
    line-height: 3.2rem;
}
.enter-password{
	width: 15rem;
	height: 3rem;
	line-height: 3rem;
	color: #999;
	font-size: 1.1rem;
	border: 2px solid #ccc;
	border-radius: 0.2rem ;
    /*text-align: center;*/
    padding-left: 1rem;
    padding-right: 1rem;
    caret-color: #ad1a1a;
}
.enter-password:placeholder{   
	text-align: center;
}
.enter-password::-webkit-input-placeholder{
	text-align: center;
}
.forget-password{
	font-size: 1.1rem;
	color: #AD1A1A;
	margin-right: 4.75rem;
	height: 3.15rem;
	line-height: 3.15rem;
}
.tip-content {
    /*width: 100%*/
    /*min-height: 9.5rem;*/
    /*padding: 0rem 9rem;*/
    /*border-bottom: 1px solid #e5e5e5;*/

}
.tip-footer {
    width: 100%;
    height: 3rem;
    /*padding-bottom: 3rem;*/
    background-color: #fff;
    border-top: 1px solid #ccc;
}
.tip-confirm {
    /*display: inline-block;*/
    height: 3rem;
    line-height: 3rem;
    width: 49.5%;
    font-size: 1.4rem;
    color: #333;
    background-color: #fff;
}
.footer-left{
	border-right: 1px solid #ccc;
}

</style>
