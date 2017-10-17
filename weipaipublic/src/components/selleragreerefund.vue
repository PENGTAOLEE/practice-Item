<template>
<div class="seller-agree">
	<!-- 拍品信息 -->
	<div class="panel ">
		<div class="panel-title no">
			拍品信息
			<span class="text-right fr">买家：<span>{{data.buyer}}</span></span>
		</div> 
		<div class="auction-info clearfix">
			<div class="auction-avator fl re">
				<img  :src="url+JSON.parse(data.thumb).url" alt="">
				<span class="send" v-show="data.is_mail">包邮</span>
                <span class="quit" v-show="data.is_refund">包退</span>
			</div>
			
			<div class="auction-msg fl">
				<h3 class="auction-name">{{data.desc}}</h3>
				<div class="about-text">成交金额：￥{{data.price}}</div>
				<div class="about-text">截止时间：{{data.pay_time}}</div>
			</div>
		</div>
		<div class="panel-bottom"></div>
	</div>

	<!-- 申请退货理由 -->
	<div class="panel single" v-show="data.status==11">
		<span class="single-name">申请退款理由</span>
		<span class="text-right fr">{{return_reason}}</span>
	</div>
	<div class="panel single" v-show="data.status==7||(data.status==15&&data.refund_express!='')">
		<span class="single-name">申请退货理由</span>
		<span class="text-right fr">{{return_reason}}</span>
	</div>
	<!-- 退货地址 -->
	<div  class="panel" v-show="data.status==7||(data.status==15&&data.refund_express!='')">
		<div class="panel-title">退货地址</div>
		<div class="deliver-info clearfix">
			<div class="get-man-name">
				收货人：<span>{{data.seller}}</span>
			</div>
			<div class="get-man-phone">{{data.seller_mobile}}</div>
			<div class="get-man-addr">{{data.seller_address}}</div>
		</div>
	</div>


	<div class="panel single" v-show="data.status==7||(data.status==15&&data.refund_express!='')">
		<span class="single-name">发货方式</span>
		<span class="express-num text-right fr">{{data.refund_express}}(单号：{{data.refund_express_number}})</span>
	</div>

	<!-- 确认退款 -->
	<button class="confirm-btn" @click="sellerConfirm">确认退款</button>
	<show-confirm :msg="tipmsg" :tit_con="tit" v-show="confirm" @childEvent="gotoAgreeReturn" @closeBox="close"></show-confirm>
    <show-alert :msg="alert_msg" @closeBox= "closeAlert" v-if="is_alert"></show-alert>
</div>
</template>
<script>

	
	var ajax = require("ajax");
	var showConfirm = require("@/components/component/showConfirm");
	var config = window.config;
	var showAlert = require("@/components/component/showAlert");

    module.exports = {
		data: function(){
			return {
				data: "",
				tipmsg: "同意后，贷款将立即退还给买家" + '<br/>' + "请在收到买家退货后再退款给买家",
				tit: "确认退款",
				confirm: false,
				status:　"",
				url: "",
				buyerReturn: [
                    "未按约定时间发货",
                    "收到商品破损",
                    "收到商品与描述不符",
                    "商品质量问题",
                    "7天无理由退货",
                    "其他"
                    ],
                buyerRefund: [
                    "未按约定时间发货",
                    "其他"
                    ],
                buyer_after_sale: [
                          "7天无理由退货",
                          "其他"
                    ],
                return_reason: "",
                is_alert: false,
                alert_msg: '',

			}
		},
		
		components:　{
			"show-confirm": showConfirm,
            "show-alert": showAlert,
		},
		mounted: function(){
				
		},
		methods: {
			getInfo: function(){
				var that = this;
				var order_id = that.$route.params.id;
				ajax.getSendInfo(order_id,function(data){
					if(data.status == 200){
						that.data = data.data;
						that.status = data.data.status;
						if(that.data.other_return_reason!=""){
							that.return_reason = that.data.other_return_reason;
						}else{
							if(that.status==11){
								that.return_reason = that.buyerRefund[that.data.return_reason-1];
							}else if(that.status==15){
								that.return_reason = that.buyerReturn[that.data.return_reason-1];
							}else if(that.status==7){
								that.return_reason = that.buyer_after_sale[that.data.return_reason-1];
							}
						}
						
					}else{
                        that.alert_msg = "未获取到页面信息"
						that.is_alert = true;
					}
				});
			},
			gotoAgreeReturn: function(){
				var that = this;
				var order_id = that.$route.params.id;
				var status = that.status;
				var url = "/sellerorderdetails/"
				var request_type;
				if(status==11){
					request_type = 2;
				}else if(status==15){
					request_type = 10;
				}else if(status==7){
					request_type = 7;
				}
				ajax.orderHandle(order_id,request_type,'','','',function(data){
					if (data.status==200) {
						console.log("同意退款成功");
						that.$router.replace(url+order_id);
					}else{
						that.alert_msg = data.msg;
                        that.is_alert = true;
					}
				});

			},
			sellerConfirm: function(){
				if(this.status==11){
					this.tipmsg = "同意后，贷款将立即退还给买家"; 
				}
				this.confirm = true;
			},
			close: function(){
				this.confirm = false;
			},
            closeAlert: function(){
                this.is_alert = false;
            }

		},
		created: function(){
			this.getInfo();
			this.url = window.config.img_url;
		}
	}

</script>
<style>
/* 通用 */
.buyer-reture {
	width: 100%;
	height: auto;
}

/*模板*/
.panel {
	position: relative;
	width: 100%;
	min-height: 4.4rem;
	margin-top: 1rem;
	background-color: #fff;
}
.panel-title {
	width: 100%;
	height: 4.4rem;
	padding-left: 1.4rem;
	line-height: 4.4rem;
	font-size: 1.6rem;
	font-family: PingFangSC; 
	color: #000;
	border-bottom: 1px solid #cdcdcd;
}
.no {
	margin-top: 0;
	border-bottom: 0;
}
.text-right {
	margin-right: 1.4rem;
	font-size: 1.4rem;
	color: #999;
}
.auction-info {
	padding: 1.4rem 0;
	padding-left: 1.4rem;
	background-color: #f8f8f8;
}
.panel-bottom {
	width: 100%;
	height: 1.5rem;
	background-color: #fff;
}
.auction-avator {
	width: 7rem;
	height: 7rem;
	margin-right: 2rem;
	border-radius: .5rem;
}
.auction-avator img{
	width: 100%;
	height: 100%;
}
.auction-msg {
	height: 7rem;
	font-family: PingFangSC;
}
.auction-name {
	line-height: 2.5rem;
	font-size: 1.6rem;
	color: #000;
	margin-bottom: .2rem;

	/*一行显示*/
    width: 17rem;
    word-break: keep-all;/* 不换行 */
    white-space: nowrap;/* 强制在同一行内显示所有文本，直到文本结束或者遭遇 br 对象。不换行 */
    overflow: hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis;/* IE 专有属性，当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    /*一行显示*/
}
.about-text {
	font-size: 1.4rem;
	color: #999;
}
.single {
	margin-bottom: 1rem;
	line-height: 4.4rem;
	font-family: PingFangSC; 
}
.single-name {
	width: 10.1rem;
	padding-left: 1.4rem;
	font-size: 1.6rem;
	color: #000;
}
.icon-right {
	position: absolute;
	top: .2rem;
	right: 0.8rem;
	display: inline-block;
	width: 1.8rem;
	height: 4.4rem;
}
.icon-right {
	background: url(../assets/img/arrow.png) no-repeat center center;
	background-size: 1rem auto;
}

.confirm-btn {
	display: block;
	width: 30rem;
	height: 4.4rem;
	margin: 0 auto;
	margin-top: 4rem;
	border-radius: .5rem;
	line-height: 4.4rem;
	font-size: 1.6rem;
	font-family: PingFangSC;
	text-align: center;
	color: #fff;
	background-color: #15af25;
}

/* 发货信息 */
.deliver-info {
	padding: .5rem 1.5rem;
	font-size: 1.6rem;
	color: #666;
	/*background: url(../assets/img/arrow.png) no-repeat 35.3rem center;*/
	background-size: 1rem auto;
	background-color: #fff;

}
.get-man-phone {
	padding-left: 3rem;
	font-size: 1.4rem;
}
.get-man-addr {
	font-size: 1.4rem;
	color: #999;
}

.getgoods-mode {
	height: 3.9rem;
	margin-left: 1.5rem;
	padding-right: 1.4rem;
	border-top: 1px solid #e5e5e5;
	line-height: 3.9rem;
	font-size: 1.6rem;
}
.getgoods-mode span {
	font-size: 1.4rem;
}
.get-man-name,
.get-man-addr {
	padding-left: 2.2rem;
	line-height: 2.4rem;
}
.get-man-name {
	background: url(../assets/img/addIocn.png) no-repeat 0 0.3rem;
	background-size: 1.4rem auto;
}
.get-man-name,
.get-man-phone {
	display: inline-block;
}
.dispute {
	height: 3.9rem;
	padding: 0 1.5rem;
	line-height: 3.9rem;
	font-size: 1.4rem;
	color: #666;
}
.express-num {
	font-size: 1.4rem;
	color: #666;
}

.send,.quit{
    position: absolute;
    bottom:.3rem;
    display: inline-block;
    width:2.7rem;
    height:1.4rem;
    line-height:1.4rem;
    text-align: center;
    font-size:1.1rem;
    color: #fff;
    border-radius: .3rem;
}
.send{
    left:.6rem;
    background-color: #fa693c;
}
.quit{
    right:.6rem;
    background-color: #6699ff;
}
</style>
