<template>
<div class="seller-agree">
	<!-- 拍品信息 -->
	<div class="panel ">
		<div class="panel-title no">
			拍品信息
			<span class="text-right fr">买家：<span>{{data.name}}</span></span>
		</div> 
		<div class="auction-info clearfix">
			<img class="auction-avator fl" :src="url+data.thumb.url" alt="">
			<div class="auction-msg fl">
				<h3 class="auction-name">{{data.desc}}</h3>
				<div class="about-text">成交金额：￥{{data.price}}</div>
				<div class="about-text">截拍时间：{{time.sucpaiTime}}</div>
			</div>
		</div>
		<div class="panel-bottom"></div>
	</div>

	<!-- 申请退货理由 -->
	<div class="panel single">
		<span class="single-name">申请退货理由</span>
		<span class="text-right fr">{{return_reason}}</span>
		<span></span>
	</div>
	<!-- 退货地址 -->
	<router-link :to="'/location?from=selleragreereturn&id='+$route.params.id" class="panel">
		<div class="panel-title">退货地址</div>
		<div class="deliver-info clearfix">
			<div class="get-man-name">
				收货人：<span>{{data.seller}}</span>
			</div>
			<div class="get-man-phone">{{data.seller_mobile}}</div>
			<div class="get-man-addr">{{data.seller_address}}</div>
		</div>
	</router-link>

	<!-- 发货方式 -->
	<!-- <div class="panel single">
		<span class="single-name">发货方式</span>
		<span class="express-num text-right fr">{{data.express}}(单号：{{data.express_number}})</span>
	</div> -->

	<!-- 确认退款 -->
	<button class="confirm-btn" @click="confirm=!confirm">同意退货</button>
	<show-confirm :msg="tipmsg" :tit_con="tit" v-show="confirm" @childEvent="gotoAgreeReturn" @closeBox="close"></show-confirm>
</div>
</template>
<script>

	
	var ajax = require("ajax");
	var showConfirm = require("@/components/component/showConfirm")
    var config = window.config
	

    export default {
		data: function(){
			return {
				data: "",
				timeList: "",
				confirm: false,
				tipmsg: "同意后，请等待买家退货,<br>请在收到买家退货后再确认退款",
				tit: "同意退货",
                status: "",
                index: '',
                url: '',
                buyerReturn: [
                              "未按约定时间发货",
                              "收到商品破损",
                              "收到商品与描述不符",
                              "商品质量问题",
                              "7天无理由退货",
                              "其他"
                        ],
                buyer_after_sale: [
                          "7天无理由退货",
                          "其他"
                    ],
                return_reason: '',
                reasonArr: ''
			}
		},
		
		components: {
			"showConfirm": showConfirm
		},
		mounted: function(){

		},
		created :function(){
            this.getDetails();
            this.url = window.config.img_url; 
        },
        computed: {
            time: function(){
                var that = this;
                var timeDetails = {};
                var list = that.timeList;
                var type;
                for(var i = 0;i<list.length;i++){
                     type = list[i].type;
                    switch (type)
                    {
                        //1订单中的拍品开始竞拍的时间
                        case 1:
                            timeDetails["kaipaiTime"] = list[i].inputtime1;
                            break;


                        //2订单中的拍品竞拍成功的时间
                        case 2:
                            timeDetails["sucpaiTime"] = list[i].inputtime1;
                            break;


                        //    3订单付款时间
                        case 3:
                            timeDetails["payTime"] = list[i].inputtime1;
                            break;


                        //    4发货时间
                        case 4:
                            timeDetails["sendTime"] = list[i].inputtime1;
                            break;


                        //    5确认收货，交易成功，订单结束时间
                        case 5:
                            timeDetails["receiveTime"] = list[i].inputtime1;
                            break;


                        //    6当面交易，发货时间
                        case 6:
                            timeDetails["ftfSendTime"] = list[i].inputtime1;
                            break;


                        //    7退货申请时间
                        case 7:
                            timeDetails["appReturnTime"] = list[i].inputtime1;
                            break;

                        //    8同意退货时间
                        case 8:
                            timeDetails["agreeReturnTime"] = list[i].inputtime1;
                            break;


                        //    9退货发出时间
                        case 9:
                            timeDetails["returnSendTime"] = list[i].inputtime1;
                            break;

                        //    10退货成功时间
                        case 10:
                            timeDetails["returnSucTime"] = list[i].inputtime1;
                            break;


                        //    11订单失败
                        case 11:
                            timeDetails["failTime"] = list[i].inputtime1;
                            break;


                        //    12超时未发货买家申请退款
                        case 12:
                            timeDetails["timeout"] = list[i].inputtime1;
                            break;



                        //    13超时未发货买家申请退款成功
                        case 13:
                            timeDetails["timeoutapppsuc"] =  list[i].inputtime1;
                            break;


                        //    14四十八小时后买家申请退货
                        case 14:
                            timeDetails["appReturn48"] =  list[i].inputtime1;
                            break;


                        //    15四十八小时后卖家同意退货
                        case 15:
                            timeDetails["appAgreeReturn48"] =  list[i].log_inputtime1;
                            break;

                        //    16四十八小时后买家立即退货//售后买家立即退货时间
                        case 16:
                            timeDetails["appNowReturn48"] =  list[i].log_inputtime1;
                            break;

                        //    16四十八小时后卖家同意退款，订单结束时间
                        case 17:
                            timeDetails["appAgree48"] =  list[i].log_inputtime1;
                            break;

                        //    16四十八小时后买家确认收货，订单结束时间
                        case 18:
                            timeDetails["sellerAgreeReturn48"] =  list[i].log_inputtime1;
                            break;

                        //    19四十八小时后卖家拒绝退货，订单结束时间
                        case 19:
                            timeDetails["sellerRefuseReturn48"] =  list[i].log_inputtime1;
                            break;

                        //    20超时未发货，买家取消申请退款或者卖家拒绝退款时间，订单结束时间
                        case 20:
                            timeDetails["refuseTimeout"] =  list[i].log_inputtime1;
                            break;
                    }
                }
                console.log(timeDetails);
                return timeDetails;
            }
        },
        methods: {
            getDetails: function(){
                var that = this;
                var id = parseInt( that.$route.params.id );

                console.log("订单id为："+id);
                ajax.getDetails(id,function(data){
                    if(data.status==200){
                        that.data = data.data.order_info;
                        that.timeList = data.data.order_log;
                        that.status = data.data.order_info.status;
                        that.timeList = data.data.order_log;
                        if(that.data.other_return_reason!=""){
                            that.return_reason = that.data.other_return_reason;
                           
                        }else{
                            if(that.status==13){
                                that.reasonArr = that.buyerReturn;
                                
                             }else if(that.status == 5){
                        
                                that.reasonArr = that.buyer_after_sale;
                            }
                            that.return_reason = that.reasonArr[that.data.return_reason-1];
                            
                        }

                        var index = window.sessionStorage.getItem("location_id");
                        var seller = window.sessionStorage.getItem("location_name");
                        var seller_mobile = window.sessionStorage.getItem("location_mobile");
                        var seller_address = window.sessionStorage.getItem("location_details");
                        if(index){
                            that.index = index;
                            that.data.seller_mobile = seller_mobile;
                            that.data.seller_address = seller_address;
                            that.data.seller = seller;
                            console.log("成功");
                            console.log(index);
                            window.sessionStorage.removeItem("location_id");
                            window.sessionStorage.removeItem("location_name");
                            window.sessionStorage.removeItem("location_mobile");
                            window.sessionStorage.removeItem("location_area");
                            window.sessionStorage.removeItem("location_address");
                            window.sessionStorage.removeItem("location_details");
                        }
                    }else{
                        console.log(data.msg);
                    }
                    if(that.status==13){
                    that.reasonArr = that.buyerReturn;
                    }else if(that.status == 5){
                    that.reasonArr = that.buyer_after_sale;
                    }
                });
            },
            gotoAgreeReturn: function(){
            	var that = this;
                var id = parseInt( that.$route.params.id );
                var index = that.index;
                var type;
                var status = that.status;
                if(status==13){
                    type = 4;
                }else if(status == 5){
                    type = 6;
                }
              ajax.orderHandle(id,type,index,'','',function(data){
                console.log(123);
                        if(data.status==200){
                            that.$router.replace("/sellerorderdetails/"+id);
                        }else{
                        	console.log(data.msg);
                        }
              });
            },
            close: function(){
            	this.confirm = false;
            }
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
	width: 12.1rem;
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
	background: url(../assets/img/arrow.png) no-repeat 35.3rem center;
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
</style>
