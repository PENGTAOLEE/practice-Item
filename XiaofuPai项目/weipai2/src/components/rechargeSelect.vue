<template>
<div class="">
	<div class="withdrawOk_hd re">
		<div class="withdrawOk_title">余额充值</div>
		<div class="withdrawOk_cont re">
			<i class="withdrawOk_icon icon-s_admin icon-balanceRecharge"></i>
			<span class="withdrawOk_price">{{ $route.params.id | formatMoney }}</span>
		</div>
	</div>
	<div class="withdrawOk_bd">
		<div class="withdrawOk_title">需要支付:<span class="withdrawOk_price"> {{ $route.params.id | formatMoney }}</span></div>
		<div class="withdrawOk_cont withdrawOk_cont__padding01">
			<div class="withdrawOk-item" v-on:click="paymentMethod=1">
				<i class="icon-s_admin icon-checkbox" v-bind:class="{'icon-checkbox_active':paymentMethod==1}"></i>
				<div class="withdrawOk-item_inner clr">
					<i class="withdrawOk-item_icon icon-s_admin icon-weui fl"></i>
					<div class="withdrawOk-item_text fl">
						<div class="withdrawOk-item_title">微信支付</div>
						<p class="withdrawOk-item_des">单笔最高5,000-50,000元</p>
					</div>
				</div>
			</div>
			<div class="withdrawOk-item" v-on:click="paymentMethod=2">
				<i class="icon-s_admin icon-checkbox" v-bind:class="{'icon-checkbox_active':paymentMethod==2}"></i>
				<div class="withdrawOk-item_inner clr">
					<i class="withdrawOk-item_icon icon-s_admin icon-bankCard fl"></i>
					<div class="withdrawOk-item_text fl">
						<div class="withdrawOk-item_title">
							银行卡支付<span class="withdrawOk-item_title__grey">&nbsp;支持储蓄卡、信用卡</span>
						</div>
						<p class="withdrawOk-item_des">单笔最高5,000-100,000元</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="btn_area">
		<router-link :to="'/rechargeOk/'+ $route.params.id" class="btn btn__ok">安全支付</router-link>
	</div>
</div>
</template>
<script>


    module.exports = {
		data:function(){
			return {
				paymentMethod: 1, 	//支付方式
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
		template: require("module/rechargeSelect/rechargeSelect.html")
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
/* 列表 */
.withdrawOk_cont__padding01{
	padding: 0 1rem;
}
.withdrawOk-item{
	position: relative;
	padding:1rem 0;
}
.withdrawOk-item:after{
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
.withdrawOk-item_inner{
	padding-left:3.75rem;
}
.icon-checkbox{
	position: absolute;
	top:2.4rem;
}
.withdrawOk-item_icon{
	margin-right: 1rem;
	display: block;
}
.withdrawOk-item_title{
	line-height: 1;
	padding:.6rem 0 1rem;
	font-size: 1.4rem;
	color: #333;
}
.withdrawOk-item_des{
	line-height: 1;
	color: #999;
	font-size: 1.3rem;
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
    color: #fff;
    font-size: 1.6rem;
    box-sizing: border-box;
    border-radius: 0.25rem;
	background-color: #ccc;
}
.btn__ok{
	background-color: #15af25;
}
.withdrawOk-item_title__grey{
	font-size: 1.2rem;
	color: #999;
}


</style>
