<template>
<div class="">
	<div class="withdrawOk_hd re">
		<div class="withdrawOk_title">{{ title }}</div>
		<div class="withdrawOk_cont">
			<i class="shotsprites icon-balanceRecharge"></i>
			<span class="withdrawOk_price withdrawOk_price__info">{{ successTip }}</span>
		</div>
	</div>
	<div class="withdrawOk_bd">
		<ul class="step" v-if="isType == 0">
			<li class="step_item">
				<div class="step_icon-area"><div class="step_icon__line"><i class="step_icon__circle"></i></div></div>
				<div class="step_text-area">充值金额 <span class="step_sub">{{ $route.params.id | formatMoney }}</span></div>
			</li>
			<li class="step_item active">
				<div class="step_icon-area"><div class="step_icon__line"><i class="step_icon__circle"></i></div></div>
				<div class="step_text-area">充值成功 <span class="step_sub">01月04日 16:15</span></div>				
			</li>
		</ul>
		<ul class="step" v-if="isType == 1">
			<li class="step_item">
				<div class="step_icon-area"><div class="step_icon__line"><i class="step_icon__circle"></i></div></div>
				<div class="step_text-area">提现金额 <span class="step_sub">{{dataObj.extract_money | formatMoney}}</span></div>
			</li>
			<li class="step_item active">
				<div class="step_icon-area"><div class="step_icon__line"><i class="step_icon__circle"></i></div></div>
				<div class="step_text-area">提现申请提交成功 <span class="step_sub">{{ dataObj.updatetime }}</span></div>				
			</li>
			<li class="step_item">
				<div class="step_icon-area"><div class="step_icon__line"><i class="step_icon__circle"></i></div></div>
				<div class="step_text-area">提现成功</div>				
			</li>
		</ul>
	</div>
	<div class="btn_area">
		<a href="/sellercenter" class="btn">完成</a>
	</div>
</div>
</template>
<script>

	// 改页面提现成功页面
	
	var ajax = require('ajax');
	var utils = require('utils');
	

    module.exports = {
		data:function(){
			return {
				isCheckbox_weui:false,	//提取到选择

				dataObj: {},            // 提现成功数据 

				title: '余额充值',      // 余额充值 || 余额提现
				successTip: '充值成功', // 充值成功 || 提交成功
				isType: 1,              // 0: 充值  || 1：提现
			}
		},
		filters: {
			// 格式化人民币相关
	    	formatMoney: function (value) {
			    if (!value) return ''
			    value = value.toString()
			    return '￥' + value
		    }
		},
		mounted: function() {
			document.title="支付成功";
			this.chekoutStatus();
		},
		methods:{
			checkbox: function(){
				this.isCheckbox_weui = !this.isCheckbox_weui;
			},

			// 状态管理
			chekoutStatus: function() {
				var type = this.$route.params.id;
				switch (type) {
					case 'recharge':
						// 充值
						this.isType = 0;
						break;
					case 'cash':
						// 提现
						this.title = '余额提现';
						this.successTip = '提交成功';
						this.isType = 1;
						// 获取后端数据
						this.getExtractData()
						break;
					default:
						// 默认
						throw new Error("您访问的页面不存在");
						this.$router.replace('/*');

				}			
			},

			// 提现成功数据
			getExtractData: function() {
				var _this = this;
				var id = utils.getRequest().id;
				ajax.extractSuccess(id,function(res){
					if (res.status == 200) {
						_this.dataObj = res.data;
					} else {
						alert(res.msg)
						// _this.$router.push('/*');
					}
				})
			}


		}
	}

</script>
<style>
.withdrawOk_hd, .withdrawOk_bd{
	margin-top: 1rem;
	background-color: #fff;
}
.withdrawOk_title{
	position: relative;
	padding:1rem 1.5rem;
	font-size: 1.6rem;
	color:333;
}
.withdrawOk_title:after{
	content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #CCCCCC;
    color: #CCCCCC;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.withdrawOk_cont{
	padding:1.5rem; 
}
.withdrawOk_icon{
	display: block;
}
.withdrawOk_price{
	font-size: 1.7rem;
	color: #ad1a1a;
}
.withdrawOk_hd .withdrawOk_price{
	position: absolute;
	bottom: 1.5rem;
	right:1.5rem;
	line-height: 1;
}
/* 步骤路径 */
.step{
	color: #000;
	font-size: 1.6rem;
}
.step_item{
	height: 5rem;
	line-height: 5rem;
}
.step_sub{
	color: #999;
	font-size: 1.4rem;
}
.step_icon-area{
	position: relative;
	top:0;
	left:0;
	display: inline-block;
	width: 4.5rem;
	height: 100%;
}
.step_icon__line{
	position: absolute;
	top:0;
	left:50%;
	width: 0;
	height: 100%;
	display: inline-block;
	border: 1px solid #ccc;
}
.step_icon__circle{
	position: absolute;
	top:50%;
	left:50%;
	background-color: #fff;
	margin-top: -0.75rem;
	margin-left: -0.75rem;
	width: 1.5rem;
	height: 1.5rem;
	display: inline-block;
	border-radius: 50%;
	border: 1px solid #ccc;
}
.step_item.active .step_icon__circle{
	background-color: #a5ef78;
}
.step_text-area{
	position: relative;
	top:-2rem;
	left:0;
	display: inline-block;	
}
/* 按钮 */
.btn_area{
    margin: 3rem 2rem;
    text-align: center;
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
.withdrawOk_price__info{
	font-size: 1.7rem;
	color:#15af25;
}
</style>
