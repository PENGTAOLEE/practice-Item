<template>
<div class="">
	<div class="withdrawOk_hd re">
		<div class="withdrawOk_title">支付</div>
		<div class="withdrawOk_cont">
			<i class="shotsprites icon-balanceRecharge"></i>
			<span class="withdrawOk_price withdrawOk_price__info">支付成功</span>
		</div>
	</div>
	<div class="withdrawOk_bd">
		<ul class="step">
			<li class="step_item">
				<div class="step_icon-area"><div class="step_icon__line"><i class="step_icon__circle"></i></div></div>
				<div class="step_text-area">支付金额 <span class="step_sub">{{ options.total_amount | formatMoney }}</span></div>
			</li>
			<li class="step_item active">
				<div class="step_icon-area"><div class="step_icon__line"><i class="step_icon__circle"></i></div></div>
				<div class="step_text-area">支付成功 <span class="step_sub">{{ options.timestamp }}</span></div>				
			</li>
		</ul>
	</div>
	<div class="btn_area">
		<!-- 买家 / 卖家 -->
		<button class="btn" @click="paymentSuccess">完成</button>
	</div>
</div>
</template>
<script>

	
	var ajax = require('ajax');
	var utils = require('utils');
  module.exports = {
		data:function(){
			return {
				isCheckbox_weui: false,
				options: {},
			}			
		},

		created() {
			this.options =  utils.getRequest();
			console.log(this.options)
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
		},
		methods: {
			// 跳到指定页面
			paymentSuccess: function() {
				var option = this.options;
        var orderType = parseInt(option.ordertype);    //  支付类型     
        var goodsid   = option.goods_id;     //  拍品id
        var paynum    = option.paynum;       //  订单id
        var url       = option.formurl;      //  判断 关注页[详情页面]
        var orderid   = option.orderid;      //  订单id
        console.log(orderType)
        switch (orderType) {
            case 1: // 支付商品押金  [判断详情页 || 关注列表页] isOK
                if (url == 'details') {
                    top.location.href = '/lotdetails/' + goodsid + '?from=complete&goodsid=' + goodsid;
                } else if (url = 'follow') {
                    top.location.href = '/follow?from=complete&goodsid=' + goodsid;
                }
                break;
            case 2: // 余额首页
                top.location.href = '/balance/0';
                break;
            case 3: // 订单支付 订单详情页
                top.location.href = '/buyerOrderDetails/' + orderid;
                break;
            case 4: // 支付诚信押金  [判断详情页 || 关注列表页]
                if (url == 'details') {
                    top.location.href = '/lotdetails/' + goodsid + '?from=complete&goodsid=' + goodsid;
                } else if (url = 'follow') {
                    top.location.href = '/follow?from=complete&goodsid=' + goodsid;
                }
                break;
            case 5: // 支付卖家保证金 跳到详情页 isOK
                top.location.href = '/lotdetails/' + goodsid;
                break;
            case 6: // 支付认证费用
                top.location.href = '/compete';
                break;
            default: 
                throw new Error("不存在的支付类型");
                top.location.href = '/';
				}
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
	padding: 1rem 1.5rem;
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
    width: 32rem;
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
