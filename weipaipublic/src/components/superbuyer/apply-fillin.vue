<template>
	<div class="apply-fillin">
		<div class="apply-fillin-wrap">
			<div class="fail-reminder" v-if="formData.isApply==2 && !id_error">审核失败，请修改后重新提交</div>
			<form action="" method="get">
			  <p class="form-fill-item clearfix">
			  	<label class="fl fill-item-label" for="realname">姓名</label> 
			  	<input id="realname" class="fl fill-item-input" type="text" placeholder="请输入真实姓名" name="realname" v-model="formData.name" />
			  </p>

			  <p class="form-fill-item clearfix">
			  	<label class="fl fill-item-label" for="company">工作单位</label> 
			  	<input id="company" class="fl fill-item-input" v-model="formData.company" type="text" placeholder="请输入工作单位" name="company" />
			  </p>

			  <p class="form-fill-item clearfix">
			  	<label class="fl fill-item-label" for="job">职位</label> 
			  	<input id="job" class="fl fill-item-input" type="text" placeholder="请输入职位" name="job" v-model="formData.job" />
			  </p>

			  <p class="form-fill-item clearfix" @click="goIdentify">
			  	<label class="fl fill-item-label" for="phone">联系电话</label> 
			  	<input id="phone" class="fl fill-item-input" type="text" disabled="true" :value="formData.phone" placeholder="请输入电话号码" name="phone" />
			  	<span class="fl" v-if="formData.phone">已验证</span>
			  </p>
				
				<div class="form-fill-item interest clearfix">
			  	<label class="fl fill-item-label" for="a">兴趣</label> 
			  	<!-- <input id="a" class="fl fill-item-input" type="text" placeholder="点击添加" name="realname" /> -->
			  	<div class="fl fill-item-interest clr" @click='addInterest'>点击添加<span class="router-link-go fr spritesmap"></span></div>
			  	
			  </div>
			  <!-- 兴趣 -->
			  <div class="form-fill-interest clearfix" v-if="formData.interest.length">
			  	<div class="fl items-left">&nbsp;</div>
			  	<ul class="fl items-right clearfix">
			  		<li class="form-fill-interest-item fl" v-for="(item,index) in formData.interest" v-if='item.is_interest'>{{ item.name }}</li>
			  	</ul>
			  </div>
			</form>
			<button class="form-fill-submit" :class="{'in-under-review':(formData.isApply==0)}" ref="submit" @click="submitAudit"></button>
		</div>
		<!-- 短信验证码 -->
    <identify-code v-if="is_identify_code" @closeBox="closeIdentify" :msg="identify_msg" @goAlert="goAlert"></identify-code>
    <show-alert v-if="is_alert" :msg="alert_msg" @closeBox="closeBox"></show-alert>
	</div>
</template>

<script>
  var identifyCode = require("@/components/component/identify-code");
  var showAlert = require("@/components/component/showAlert")
  var ajax = require('ajax');
  var utils = require('utils');

  export default {
		data () {
			return {
				id_error: false,
				is_identify_code: false,
				identify_msg: {},
				is_alert: false,
				alert_msg: '',
				// 表单
				formData: {
					name: '',
					company: '',
					job: '',
					phone: '',
					interest: [],
					isApply: 3
				},
			}
		},
		
		components: {
      'identify-code': identifyCode,
      'show-alert': showAlert
	  },

    created() {

    	this.getDataInfo((data) => {
    		this.formData = {
					name: data.rel_name,
					company: data.company,
					job: data.position,
					phone: data.mobile,
					isApply: data.is_apply
				}
    	});

    	if (utils.getRequest().audit == 'error') {
    		this.id_error = true;
    	};

    	this.getInterestList();
    	if(sessionStorage.getItem('super_name')){
      		this.formData.name = sessionStorage.getItem('super_name');
      		sessionStorage.removeItem('super_name');
      	}
      	if(sessionStorage.getItem('super_company')){
      		this.formData.company = sessionStorage.getItem('super_company');
      		sessionStorage.removeItem('super_company');
      	}
      	if(sessionStorage.getItem('super_job')){
      		this.formData.job = sessionStorage.getItem('super_job');
      		sessionStorage.removeItem('super_job');
      	}
      	if(sessionStorage.getItem('super_phone')){
      		this.formData.phone = sessionStorage.getItem('super_phone');
      		sessionStorage.removeItem('super_phone');
      	}
    },

		mounted: function() {
			if(this.formData.isApply==2||this.formData.isApply==3){
							document.title = "超级买家申请";
						}else{
							document.title = '认证信息';
						}

      $('#footer-common').hide()
			
			this.$nextTick(function() {
				$('#app,html,body').css({
					'height':'100%'
				})
			})
		},
		watch: {
		},
		beforeDestroy: function() {
      $('#footer-common').show()
		},
		methods: {
			closeIdentify (params) {
				this.is_identify_code = false;
        if(params){
          this.is_phone_ok = true;
          this.banner_text = "已验证"
          this.formData.phone = params;
        }
			},

		goIdentify () {
			if(this.formData.phone){
            	this.identify_msg.mobileNumber = this.formData.phone;
       		}
       		if(this.formData.isApply==2||this.formData.isApply==3){
       			this.identify_msg.sendType = 3;
        		this.identify_msg.verifyType = 2;
        		this.is_identify_code = true;	
       		}
        
		},

      goAlert (data) {
        this.alert_msg = data;
        this.is_alert = true;
      },

      closeBox() {
        this.is_alert = false;      	
      },

      // 获取数据
      getDataInfo(callback) {
      	ajax.getSuperBuyerInfo((res) => {
      		const data = res.data;
      		if (res.status == 200) {
      			this.formData.name = data.rel_name;
      			this.formData.company = data.company;
      			this.formData.job = data.position;
      			this.formData.phone = data.mobile;
      			this.formData.isApply = data.is_apply;
      		};
      	})
      },

      // 提交数据
			postDataInfo(options,callback) {
				ajax.postSuperBuyerInfo(options,(res) => {
					if (res.status == 200) {
						callback && callback()
					}else{
						this.alert_msg = res.msg;
						this.is_alert = true;
					}
				})
			},
	  getInterestList() {
	  	let that = this;
			ajax.getInterestList((res) => {
				const data = res.data;
				if (res.status == 200) {
					 this.formData.interest= data;
				};
			})
	  },

      // 提交审核
      submitAudit() {
				var formData = this.formData;
      	var chineseReg = /^[\u4E00-\u9FA5]+$/ig;
      	var emptyReg = /^\s*$/g;
      	// 给出测试状态
      	// isApply   0: 审核中   1： 通过   2： 拒绝  3，未申请
      	if (this.formData.isApply!=0) {
      		if (!chineseReg.test(formData.name)) {
	      		this.goAlert("请输入真实姓名")
	      	} else if(emptyReg.test(formData.company)) {
	      		this.goAlert('请输入工作单位')
	      	} else if(emptyReg.test(formData.job)) {
	      		this.goAlert('请输入您的职业')
	      	} else if(emptyReg.test(formData.phone)) {
	      		this.goAlert('请输入填写您的电话号码')
	      	} else if(!formData.interest.length) {
	      		this.goAlert('请选择您的兴趣')
	      	} else {
	      		console.log('准备提交');
	      		const option = {
	      			rel_name: formData.name,
	      			mobile: formData.phone,
	      			company: formData.company,
	      			position: formData.job
	      		}
	      		this.$refs.submit.classList.add('in-under-review');
	      		this.postDataInfo(option,() => {
	      			this.$router.push('/recomfollow')
	      		})

	      	}
      	};
      },
      addInterest(){
      	
      	if(this.formData.name){
      		sessionStorage.setItem('super_name',this.formData.name);
      	}
      	if(this.formData.company){
      		sessionStorage.setItem('super_company',this.formData.company);
      	}
      	if(this.formData.job){
      		sessionStorage.setItem('super_job',this.formData.job);
      	}
      	if(this.formData.phone){
      		sessionStorage.setItem('super_phone',this.formData.phone);
      	}
      	this.$router.push('/interestin');
      }
		}
	}	
</script>

<style>
	.apply-fillin {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	
	.fail-reminder {
		width: 100%;
		height: 3.3rem;
		background-color: #ff8787;
		line-height: 3.3rem;
		text-align: center;
		font-size: 1.4rem;
		color: #fff;
		animation: slide-down .3s linear;
	}

	@keyframes slide-down {
		0% { transform: translateY(-3.3rem); }
	  50% {transform: translateY(-1.5rem);}
	  100% {transform: translateY(0rem);}
	}

	.form-fill-item {
		position: relative;
		/*width: 100%;*/
		margin-bottom: 1px;
		border-bottom: 0.05rem solid #e5e5e5;
		padding-left: 1.5rem;
		line-height: 4.4rem;
		font-size: 1.3rem;
		color: #333;
	}
	
	.form-fill-item.interest {
    margin-left: 1.5rem;
    padding-left: 0;
	}

	.router-link-go {
		/*position: relative;*/
		/*display: inline-block;*/
		/*text-align: right;*/
		width: 0.7rem;
		height: 1.3rem;
		background-position: -14.5rem -16.75rem;
		margin-top: 1.55rem;
	}

	/*.router-link-go:after {
    content: " ";
    display: inline-block;
    height: 0.8rem;
    width: 0.8rem;
    border-width: 0.15rem 0.15rem 0 0;
    border-color: #999;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 50%;
    margin-top: -1rem;
    right: -4rem;
}*/

	.fill-item-label {
		width: 8.5rem;
		height: 4.4rem;
	}

	.fill-item-input {
		width: 21.5rem;
		height: 4.4rem;
		color: #333;
	}
	.fill-item-interest {
		width: 26rem;
		height: 4.4rem;
		color: #333;
	}

	input[type="text"]:disabled {
		background-color: #fff;
	}
	
	.form-fill-interest {
		overflow: hidden;
		/*min-height: 8.9rem;*/
		padding-top: 1rem; 
		border-bottom: 1px solid #e5e5e5;
	}

	.items-left {
		width: 8.5rem;
		min-height: 7.4rem;
		color: #fff;
	}
	
	.items-right {
		width: 28rem;
	}

	.items-right,
	.items-left {
		padding-bottom: 2000px;
		margin-bottom: -2000px;
	}

	.form-fill-interest-item {
		margin-right: 1rem;
		margin-bottom: 1rem; 
		padding: 0 .8rem;
		line-height: 2.4rem;
		font-size: 1.4rem;
		color: #333;
		border: 1px solid #ccc;
		border-radius: 100px / 100px;
	}

	.form-fill-submit {
		display: block;
		width: 24rem;
		height: 4.4rem;
		margin: 0 auto;
		margin-top: 15rem;
		background-color: #15af25;
		border-radius: 100px;
		font-size: 1.6rem;
		color: #fff;
	}

	.form-fill-submit.in-under-review {
		background-color: #ccc;
	}
	
	.form-fill-submit:after {
		content: '提交审核';
	}

	.form-fill-submit.in-under-review:after {
		content: '审核中';
	}

	.identify_box {
		font-size: 1.4rem;
	}
</style>