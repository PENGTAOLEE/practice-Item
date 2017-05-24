<template>
<div class="buyer-reture">
	<!-- 拍品信息 -->
	<div class="panel">
		<div class="panel-title">拍品信息</div> 
		<div class="auction-info clearfix">
			<img class="auction-avator fl" :src="url + JSON.parse(data.thumb).url" alt="">
			<div class="auction-msg fl">
				<h3 class="auction-name">{{data.desc}}</h3>
				<div class="about-text" v-show="data.is_mail">运费：卖家包邮</div>
				<div class="about-text" v-show="!data.is_mail">运费：买家自理</div>
				<div class="about-text">付款时间：{{data.pay_time}}</div>
			</div>
		</div>
	</div>
	<!--  发货地址-->

	<router-link :to="'/location?from=sellersendgood&id='+$route.params.id">
		<div class="panel single">
			<span class="single-name fl">发货地址</span>
			<div class="about-text single-address fl">
				{{(seller_name+seller_mobile)||""}}<br>
				{{seller_address||""}}
			</div>
			<i class="icon-right fr"></i>
		</div>
	</router-link>
	<!-- 发货地址-->
	<!-- 卖家退货地址 -->
	<div class="panel">
		<div class="panel-title">收货信息</div>
		<div class="seller-about">
			<!-- 收货人 -->
			<div class="seller-msg">
				<span class="seller-msg-key">收货人: </span>
				<span class="seller-msg-val">{{data.buyer}}</span>
			</div>
			<!-- 联系方式 -->
			<div class="seller-msg">
				<span class="seller-msg-key">联系方式: </span>
				<span class="seller-msg-val">{{data.buyer_mobile}}</span>
			</div>
			<!-- 收货地址 -->
			<div class="seller-msg">
				<span class="seller-msg-key">收货地址: </span>
				<span class="seller-msg-val">
					{{data.buyer_address}}
				</span>
			</div>
		</div>
	</div>

	<!-- 单选按钮 -->
	<form action="" id="selected" class="clearfix">
		<div class="fr">
			<div class="analog-radio" :class="{'on-select': dtd}" @click="translate">
				送货上门
			</div>

		</div>
	</form>

	<!-- 快递公司 -->
	<div class="panel single no" @click="openPopupBox" v-show="!dtd">
		<span class="single-name">快递公司</span>
		<span class="single-content">{{ expressNamePar }}</span>
		<i class="icon-right fr"></i>
	</div>

	<!-- 运单号 -->
	<div class="panel single waybill-num" v-show="!dtd">
		<span class="single-name">运单号</span>
		<!-- <span class="single-content">122945789</span> -->
		<input class="single-content" type="text"  placeholder="手动输入或扫描运单号" v-model="trackingNumber"/>
		<i class="icon-scan" @click="getTrackingNum"></i>
		<!--<button style="font-size: 30px" @click="getTrackingNum">按钮</button>-->
	</div>

	<!-- 确认退货 -->
	<button class="confirm-btn" @click="gotosend">确认发货</button>

	<!-- 快递选择 -->
	<my-express v-show="showPopupBox" @trans="changeNamePar" @closeBox="closePopupBox" :nameNow="expressNamePar"></my-express>

	<!-- 测试组件 -->
	<!-- 
		父组件内使用该组件  
			父组件内定义 title / images / xxx ...
	-->
	<!-- <share-sub :message = "wxshare"></share-sub> -->
	<div class="show-confirm" v-show="model">
		<div class="confirm">
			<div class="confirm-text">{{ msg }}</div>
			<div class="cancel-btn" @click="cancelFun">知道了</div>
		</div>
	</div>
	<div class="space">
	</div>
</div>
</template>
<script>
module.exports =  {
    
    
    require("/res/lib/wechat/jweixin-1.0.0.js");
    // 测试组件
    var shareSub = require("shareSub")
    var config = require("config.json");

    //微信接口引入
    // var wx = require("http://res.wx.qq.com/open/js/jweixin-1.0.0.js");
    var Express = require("express")
    var ajax = require('ajax');
    return {
        data:function(){
            return {  
                showPopupBox: false,
                expressNamePar: '中通速递', //默认的快递公司
                // 微信分享数据
                wxshare: {
                    wxTitle: "这是一个分享页面",
                    wxImage: "这就是个url,不相关"
                },
                dtd: false,          //是否送货上门
                trackingNumber: '',//运单号
                data: "",
                msg: '请填写"快递公司"和"运单号"',//模态框的上方信息
                model: false,     //模态框判断的条件
                seller_name: "",
                seller_mobile: "",
                seller_address: "",
                url: ""
                  
            }
        },
        components: {
            "my-express": Express,
            "share-sub": shareSub
        },
        
        mounted: function(){
            // 美化单选框
            // var that = this;
            // $('.analog-radio').on('click',function(){
            //     $(this).toggleClass("on-select");
            //     that.dtd = !that.dtd;
            //     console.log(that.dtd);
            // })
        },
        created: function(){
            this.getInfo();
            this.wxConfig();//配置参数
            this.url = config.img_url;
        },
        computed: {
            // showPopupBox: function() {
            //     return false
            // }
        },
        updated: function(){
        },
        methods: {
            getInfo: function(){
                var that = this;
                var order_id = that.$route.params.id;
                ajax.getSendInfo(order_id,function(data){
                    if(data.status==200){
                        that.data = data.data;
                        that.seller_name = data.data.seller;
                        that.seller_mobile = data.data.seller_mobile;
                        that.seller_address = data.data.seller_address;
                        var index = window.sessionStorage.getItem("index");
                        var seller = window.sessionStorage.getItem("seller");
                        var seller_mobile = window.sessionStorage.getItem("seller_mobile");
                        var seller_address = window.sessionStorage.getItem("seller_address");
                        if(index){
                            that.index = index;
                            that.seller_mobile = seller_mobile;
                            that.seller_address = seller_address;
                            that.seller_name = seller;
                            console.log("成功");
                            console.log(index);
                            window.sessionStorage.removeItem("index");
                            window.sessionStorage.removeItem("seller");
                            window.sessionStorage.removeItem("seller_mobile");
                            window.sessionStorage.removeItem("seller_address");
                        }
                    }else{
                        console.log(data.msg);
                    }
                });

            },
            wxConfig : function(){ //配置微信参数
                //获取当前页面地址
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
                        console.log(res.msg);
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
                var express = that.expressNamePar;
                var express_number = that.trackingNumber;
                var is_deliver_home = (that.dtd ==false? 0:1);
                var seller = that.seller_name;
                var seller_mobile = that.seller_mobile;
                var seller_address = that.seller_address;
                if(!seller){
                    this.msg="请填写发货地址！";
                    this.model = true;
                }else{
                    if(is_deliver_home){
                        express = "";
                        express_number = "";
                        that.commonSend(order_id,express,express_number,is_deliver_home,seller,seller_mobile,seller_address);
                    }else{
                        if(express_number){
                            that.commonSend(order_id,express,express_number,is_deliver_home,seller,seller_mobile,seller_address);
                        }else{
                            that.msg = '请填写"快递公司"和"运单号"';
                            that.model = true;
                        }
                    }
                }
                
                
            },
            commonSend: function(order_id,express,express_number,is_deliver_home,seller,seller_mobile,seller_address){
                var that = this;
                ajax.sendgood(order_id,express,express_number,is_deliver_home,seller,seller_mobile,seller_address,function(data){
                        if(data.status==200){
                            console.log("发货成功");
                            that.$router.replace("/sellerorderdetails/"+order_id);
                        }else{
                            console.log(data.msg);
                        }
                    });
            },
            cancelFun: function() {
                this.model = false;
            },
            translate: function(){
                this.dtd = !this.dtd;
                console.log(1111111);
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
	display: flex;
}
.single-name {
	display: inline-block;
	width: 10.1rem;
	font-size: 1.6rem;
	color: #000;
}
.single-address{
	width: 21.5rem;
	line-height: 2.2rem;
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
.space{
	width: 100%;
	height: 6rem;
}
</style>
