<template>
<div class="">
	<div class="withdrawOk_hd re">
		<div class="withdrawOk_title">余额充值</div>
		<div class="withdrawOk_cont">
			<i class="shotsprites icon-balanceRecharge"></i>
			<span class="withdrawOk_price withdrawOk_price__info">充值成功</span>
		</div>
	</div>
	<div class="withdrawOk_bd">
		<ul class="step">
			<li class="step_item">
				<div class="step_icon-area"><div class="step_icon__line"><i class="step_icon__circle"></i></div></div>
				<div class="step_text-area">充值金额 <span class="step_sub">{{ dataObj.money | formatMoney }}</span></div>
			</li>
			<li class="step_item active">
				<div class="step_icon-area"><div class="step_icon__line"><i class="step_icon__circle"></i></div></div>
				<div class="step_text-area">充值成功 <span class="step_sub">{{ dataObj.time }}</span></div>				
			</li>
		</ul>
	</div>
	<div class="btn_area">
		<!-- 买家 / 卖家 -->
		<a href="/balance/1" class="btn">完成</a>
	</div>
</div>
</template>
<script>

	
	var ajax = require('ajax');
	

    module.exports = {
		data:function(){
			return {
				isCheckbox_weui: false,
				dataObj: {},   				// 页面数据
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
			document.title="充值成功";

			// url传递订单id
			var paynum = this.$route.params.id;
			this.getRechargeData(paynum);
		},
		methods:{
			checkbox: function(){
				this.isCheckbox_weui = !this.isCheckbox_weui;
			},

			/**
			 * 获取充值数据
			 * @param  {string} paynum 订单id
			 * @return 无        
			 */
			getRechargeData: function(paynum) {
				var _this = this;
				ajax.rechargeSuccess(paynum,function(res){
					if (res.status == 200) {
						_this.dataObj = res.data;
					} else {
						alert(res.msg)
						// _this.$router.replace('/*');
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
.btn {
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
	color: #15af25;
}
</style>
