<template>
<div class="buyer-reture">
	<!-- 拍品信息 -->
	<div class="panel">
		<div class="panel-title">拍品信息</div> 
		<div class="auction-info clearfix">
			<img class="auction-avator fl" :src="url+JSON.parse(data.thumb).url" alt="">
			<div class="auction-msg fl">
				<h3 class="auction-name">{{data.desc}}</h3>
				<div class="about-text" >成交金额：￥{{data.price}}</div>
				<div class="about-text">同意时间：{{data.updatetime}}</div>
			</div>
		</div>
	</div>
	<!--  发货地址-->

	<!--<router-link to="/forms">-->
		<!--<div class="panel single " >-->
			<!--<span class="single-name">发货地址</span>-->
			<!--<i class="icon-right fr"></i>-->
		<!--</div>-->
	<!--</router-link>-->
	<!-- 发货地址-->
	<!-- 卖家退货地址 -->
	<div class="panel">
		<div class="panel-title">退货信息</div>
		<div class="seller-about">
			<!-- 收货人 -->
			<div class="seller-msg">
				<span class="seller-msg-key">收货人: </span>
				<span class="seller-msg-val">{{data.seller}}</span>
			</div>
			<!-- 联系方式 -->
			<div class="seller-msg">
				<span class="seller-msg-key">联系方式: </span>
				<span class="seller-msg-val">{{data.seller_mobile}}</span>
			</div>
			<!-- 收货地址 -->
			<div class="seller-msg">
				<span class="seller-msg-key">收货地址: </span>
				<span class="seller-msg-val">
					{{data.seller_address}}
				</span>
			</div>
		</div>
	</div>

	<!-- 单选按钮 -->
	<form action="" id="selected" class="clearfix" v-show="data.status==14">
		<div class="fr">
			<div class="analog-radio" @click="translate(1)" :class="{'on-select': is_received}">
				未收到货
			</div>
			<div class="analog-radio" @click="translate(2)" :class="{'on-select': is_refused}">
				拒收 
			</div>
		</div>
	</form>

	<!-- 快递公司 -->
	<div class="panel single no" @click="openPopupBox" v-show="(data.status==6||data.status==14)&&condition">
		<span class="single-name">快递公司</span>
		<span class="single-content">{{ expressNamePar }}</span>
		<i class="icon-right fr"></i>
	</div>

	<!-- 运单号 -->
	<div class="panel single waybill-num" v-show="(data.status==6||data.status==14)&&condition">
		<span class="single-name">运单号</span>
		<!-- <span class="single-content">122945789</span> -->
		<input class="single-content" type="text"  placeholder="手动输入或扫描运单号" v-model="trackingNumber"/>
		<i class="icon-scan" @click="getTrackingNum"></i>
		<!--<button style="font-size: 30px" @click="getTrackingNum">按钮</button>-->
	</div>

	<!-- 确认退货 -->
	<button class="confirm-btn" @click="gotosend">确认退货</button>
		
	<!-- 快递选择 -->
	<my-express v-show="showPopupBox" @trans="changeNamePar" @closeBox="closePopupBox" :nameNow="expressNamePar"></my-express>
	<div class="show-confirm" v-show="model">
		<div class="confirm">
			<div class="confirm-text">{{ msg }}</div>
			<div class="cancel-btn" @click="cancelFun">知道了</div>
		</div>
	</div>
</div>
</template>
<script>
module.exports =  {
    
    
    require("/res/lib/wechat/jweixin-1.0.0.js");

    //微信接口引入
    // var wx = require("http://res.wx.qq.com/open/js/jweixin-1.0.0.js");
    var Express = require("express")
    var ajax = require('ajax');
    var config = require('config.json');
    return {
        data:function(){
            return {  
                showPopupBox: false,
                expressNamePar: '中通速递', //默认的快递公司   
                trackingNumber: '',//运单号
                data: "",
                msg: '请填写"快递公司"和"运单号"',//模态框的上方信息
                model: false,     //模态框判断的条件
                status: '',
                is_refused: false,
                is_received: false,
                condition: true,
                url: ""
            }
        },
        components: {
            "my-express": Express,
        },
        
        mounted: function(){
            // 美化单选框
           //  var that = this;
           // $('.analog-radio').on('click',function(){
           //      $(this).addClass("on-select").siblings().removeClass("on-select");
           //      console.log($(this)[0].dataset.state);
           //      $(this)[0].dataset.state==1&&(that.refund_type = 1);
           //      $(this)[0].dataset.state==2&&(that.refund_type = 2);
           //  });
        },
        created: function(){
            this.getInfo();
            this.wxConfig();
            this.url = config.img_url;
        },
        computed: {
            condition: function() {
                 return !(this.is_received||this.is_refused);
             },
             refund_type: function(){
                var type;
                if(this.is_received){
                    type = 1;
                }else if(this.is_refused){
                    type = 2;
                }else if(this.trackingNumber){
                    type = 0;
                }
                //拒收还是未收到货还是立即退货     0物流退货 1未收到货 2拒收退货 
                return type;
             }
        },
        methods: {
            getInfo: function(){
                var that = this;
                var order_id = that.$route.params.id;
                ajax.getOrderDetails(order_id,function(data){
                    if(data.status==200){
                        that.data = data.data;
                        that.status = data.data.status;
                        console.log(that.data);
                    }else{
                        console.log(data.msg);
                    }
                });

            },
            wxConfig : function(){ //配置微信参数
                var url = encodeURIComponent(location.href.split('#')[0]);
                ajax.getWechatParam(url,function(res){
                    if(res.status == 200){
                        wx.config({
                            debug: res.data.debug,
                            appId: res.data.appId,
                            timestamp: res.data.timestamp,
                            nonceStr: res.data.nonceStr,
                            signature: res.data.signature,
                            jsApiList: res.data.jsApiList,
                        });
                    }else{
                        console.log(res.msg)
                    }
                })
            },
            // 显示组件
            openPopupBox: function() {
                this.showPopupBox = true;
            },

            // 关闭组件
            closePopupBox: function() {
                this.showPopupBox = false;
            },

            // 通信
            changeNamePar: function(arg) {
                this.expressNamePar = arg;
            },

            //扫描订单号
            getTrackingNum : function(){
                var vue = this;
                console.log('what')
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var aa = res.resultStr.split(',');
                        var num = aa[1];
                        vue.trackingNumber = num;
                    }
                });
            },
            gotosend: function(){
               var that = this;
                var order_id = that.$route.params.id;
                var status = that.status;
                var refund_type = that.refund_type;
                if(status==14){
                    if(refund_type===0||refund_type){
                        var express = that.expressNamePar;
                        var express_number = that.trackingNumber; 
                        ajax.goConfirm(order_id,express,express_number,refund_type,function(data){
                            if(data.status==200){
                                that.$router.push('/buyerorderdetails/'+order_id);
                            }else{
                                console.log(data.msg);
                            }
                        });
                        
                    }else{
                        that.msg="退货方式不能为空";
                        that.model = true;
                    }
                }else if(status==6){
                  var express = that.expressNamePar;
                    var express_number = that.trackingNumber; 
                    var refund_type = 0;
                    if(express_number){
                        ajax.goConfirm(order_id,express,express_number,refund_type,function(data){

                            if(data.status==200){
                                console.log("立即退货");
                                that.$router.push('/buyerorderdetails/'+order_id);
                            }else{
                                console.log(data.msg);
                            }
                        });
                        console.log("判断接口")
                    }else{
                        that.model = true;
                    }

                }

            },
            cancelFun: function() {
                this.model = false;
            },
            translate: function(type){
                if(type==1){
                    this.is_received=!this.is_received;
                    this.is_received&&(this.is_refused = false);
                }else if(type==2){
                    this.is_refused = !this.is_refused;
                    this.is_refused&&(this.is_received = false);
                }
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
	padding-left: 1.15rem;
	background-color: #fff;
}
.no {
	margin-top: 0;
}
.panel-title {
	width: 100%;
	height: 4.4rem;
	line-height: 4.4rem;
	font-size: 1.6rem;
	font-family: PingFangSC; 
	color: #000;
	border-bottom: 1px solid #cdcdcd;
}
.auction-info {
	padding: 1.4rem 0;
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

/*卖家地址*/
.seller-about {
	padding: .4rem 0;
	padding-right: 2rem;
}
.seller-msg {
	min-height: 1.9rem;
	margin: .6rem 0;
	line-height: 1.9rem;
	font-size: 1.4rem;
	font-family: PingFangSC;
}
.seller-msg-key {
	display: inline-block;
	width: 6.8rem;
	color: #000;
}
.seller-msg-val {
	color: #666;
}

/*选中按钮*/
#selected {
	width: 100%;
	height: 4.5rem;
	padding-right: 1.1rem;
	line-height: 4.5rem;
}
#selected .analog-radio {
	line-height: 4.5rem;
	font-size: 1.6rem;
	font-family: PingFangSC;
}
#selected .analog-radio:first-of-type {
	margin-right: 1.2rem;
}
/*选中组件*/
.analog-radio {
	display: inline-block;
	padding-right: 3rem;
	background: url(/res/img/radio_off.png) no-repeat right center;
	background-size: 2rem auto;
}
.on-select {
	background: url(/res/img/radio_on.png) no-repeat right center;
}

.single-content ,
.single-content {
	width: 57%;
	/*text-indent: 4rem;*/
	font-size: 1.4rem;
	color: #6f89c1;
}
.single-content::-webkit-input-placeholder {
	font-size: 1.4rem;
	color: #6f89c1;
}
.single-content:-moz-placeholder {
	font-size: 1.4rem;
	color: #6f89c1;
}
.single-content:-ms-input-placeholder {
	font-size: 1.4rem;
	color: #6f89c1;
}
.single {
	margin-bottom: 1rem;
	line-height: 4.4rem;
	font-family: PingFangSC; 
}
.single-name {
	display: inline-block;
	width: 10.1rem;
	font-size: 1.6rem;
	color: #000;
}
.icon-right,
.icon-scan {
	position: absolute;
	top: .2rem;
	right: 0.8rem;
	display: inline-block;
	width: 1.8rem;
	height: 4.4rem;
}
.icon-right {
	background: url(/res/img/arrow.png) no-repeat center center;
	background-size: 1rem auto;
}
.icon-scan {
	background: url(/res/img/scan.png) no-repeat center center;
	background-size: 100% auto; 
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


/*立即发货弹窗*/
/* 公共弹窗 */
.show-confirm {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
}
.confirm {
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 2.5rem 2rem 2rem 2rem;
	width: 100%;
	min-height: 12.75rem;
	background-color: #fff;
}

.cancel-btn {
	width: 30rem;
	height: 4.4rem;
	margin: 0 auto;
	line-height: 4.4rem;
	border-radius: .5rem;
	font-size: 1.6rem;
	font-family: PingFangSC;
	text-align: center;
	color: #000;
	border:0.1rem solid #ccc;
}
.confirm-text {
	min-height: 2rem;
	line-height: 1.2;
	font-family: PingFangSC;
	font-size: 1.4rem;
	color: #000;
	text-align: center;
}
.cancel-btn {
	margin-top: 2rem;
	background-color: #F7F8F7;
}
/*立即发货弹窗*/
</style>
