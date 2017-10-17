<template>
	<!-- 设置登陆密码 -->
	<!-- @params oldPassword   string:  可以为空
		 @params mobile        number:  不能为空

	 -->
	<div class="set-password">
		
		<div class="mobile-input-box">
			<!-- <div class='set-password-title clr'>
				<span class="title-button fl" @click='goCancel'>取消</span>
				<span class="title-button fr" @click='goNextStep'>完成</span>
			</div> -->
			<div class="set-title">设置登录密码，后续可通过手机号+登录密码登录小福拍</div>
			<div class="form-box">
				<div class='form-group clr'>
					<div class="item-key fl">手机号码</div>
					<div class="item-content fl" >{{msg.mobile}}</div>
				</div>
				<div class="form-group clr">
					<div class=" item-key fl">密码</div>
					<input  type="password" class="item-content item-input fl" placeholder="请输入登录密码"  v-model="setpassword">
				</div>
				<div class="form-group clr">
					<div class="item-key fl">确认密码</div>
					<input  type="password" class="item-content item-input fl" placeholder="请再次输入"  v-model="resetpassword">
				</div>	
			</div>
			<p class="form-tip">密码必须至少8个字符，而且同时包含字母和数字.</p>
			<div class="btn-box">
				<a class="btn-save" href='javascript:;' @click='goNextStep'>保存</a>
			</div>
		</div>
	</div>

</template>
<script>
	var ajax = require('ajax');
    module.exports = {
		data () {
			return {
				setpassword: '',
				resetpassword: '',
			}
		},
		props: ['msg'],
		components: {
    	},
       
		mounted: function() {
			// document.title = "设置原始密码";
		},
		watch: {
		},
		methods: {
			// 下一步
			goNextStep() {
				let params;
				if(this.setpassword&&this.resetpassword){
					if(this.setpassword!=this.resetpassword){
						params = '您两次输入的密码不一致'
						this.$emit('goAlert',params);
					}else if(this.setpassword.length < 8) {
      					params =  '请设置至少8位字符';
      					this.$emit('goAlert',params);
      				} else if(/^\d+$/.test(this.setpassword)) {
      					params = '密码必须包含字母,强度:弱';
      					this.$emit('goAlert',params);
      				} else if(/^[a-z]+$/i.test(this.setpassword)) {
      					params = '密码必须包含数字,强度:中';
      					this.$emit('goAlert',params);
      				} else if(!/^[A-Za-z0-9]+$/.test(this.setpassword)) {
      					params = '密码必须包含数字和字母,强度:中'
      					this.$emit('goAlert',params);
      				}else{
      					let that = this;
      					let oldPassword = this.msg.oldPassword;
      					let new_password = this.setpassword;
      					let mobile = this.msg.mobile;
      					let vcode = this.msg.vcode;
      					if(vcode){
      						ajax.setLoginPassword(that.setpassword,that.resetpassword,mobile,vcode,function(res){
      							if(res.status==200){
      								params = '您的密码已重置完毕';
	      							that.$emit('goCancel');
	      							that.$emit('goAlert',params);
	      							that.setpassword =  '';
	      							that.resetpassword = '';
      							}else{
      								params = res.msg;
	      							that.$emit('goAlert',params);
	      							that.setpassword =  '';
	      							that.resetpassword = '';
      							}
      						})
      					}else{
      						ajax.resetPassword(oldPassword,new_password,mobile,function(res){
	      						if(res.status==200){
	      							params = '您的密码已设置完毕';
	      							that.$emit('goCancel');
	      							that.$emit('goAlert',params);
	      							that.setpassword =  '';
	      							that.resetpassword = '';
	      						}else{
	      							params = res.msg;
	      							that.$emit('goAlert',params);
	      							that.setpassword =  '';
	      							that.resetpassword = '';
	      						}
      						});
      					}
      					
      				} 
				}else{
					let params = '您输入的密码为空'
					this.$emit('goAlert',params);
					this.setpassword =  '';
      				this.resetpassword = '';
				}	
			},
			goCancel(){
				this.$emit('goCancel')
				this.setpassword =  '';
      			this.resetpassword = '';
			}

			

      

      

      

		}
	}	
</script>
<style scoped>
.set-password{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #F0F2F2;
	z-index: 20;

}
.mobile-input-box {
/*text-align: center;*/
	margin: 3rem 3.8rem;
	background-color: #F0F2F2;
	border: 1px solid transparent;

}
.set-password-title{
	margin: 1.5rem  1.5rem 0;
}
.set-title {
	height: 4rem;
	/*padding-top: 2.5rem;*/
	line-height: 4rem;
	text-align: center;
	font-size: 1.1rem;
	color: #807e7e;
}
.form-box{
	margin: auto;
}
.form-group{
	margin: 1.8rem auto 0;
	width: 23rem;
	font-size: 1.4rem;
	border-bottom: 1px solid #999;
	padding-bottom: 0.65rem;

}
.form-group:first-child{
	margin-top: 0rem;

}
.item-key{
	color: #666;
	width: 7.2rem;
	border-right: 1px solid #7e7e7e;
	height: 2rem;
	line-height: 2rem;
}
.item-content{
	color: #333;
	margin-left: 3rem;
	width: 11.8rem;
	height: 2rem;
	line-height: 2rem;
	background-color: #F0F2F2;
}
.item-content:placeholder{
	color:  #999;
}
.form-tip{
	font-size: 1.1rem;
	margin: 1rem 1.5rem 2.5rem;
	text-align: center;
}
.btn-box{
	width: 100%;
	margin-top: 5rem;
	
}
.btn-save{
	display: block;
	background-color: #AD1A1A;
	/*width: 80%;*/
	border-radius: 0.5rem;
	margin: 0 2.45rem;
	height: 3.3rem;
	line-height: 3.3rem;
	font-size: 1.4rem;
	color: #fff;
	text-align: center;
}
</style>