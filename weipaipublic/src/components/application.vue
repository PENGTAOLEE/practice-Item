<template>
<div class="apply-return">
	<header class="top-box">
		<div class="header-top clearfix">
			<!-- 改成跳转链接 -->
			<router-link :to="'/shops/'+info.shop_id+'?type=2'" class="shop-name">
				<i class="shop-icon"></i>
				<span class="main-color">{{info.shop_name}}</span>
				<i class="arrow-right"></i>
			</router-link>
			<!-- <div class="fr">
				<a class="phone-icon" :href="'tel:'+info.shop_mobile"></a>
				<div class="goods-status text-red">确认退款申请</div>
			</div> -->
		</div>
		<div class="goods-desc">
			<div class="goods-img fl">
				<img :src="url+JSON.parse(info.thumb).url" alt="">
			</div>
			<div class="fl">
				<h3 class="goods-name main-color">{{info.desc}}</h3>
				<div class="goods-text">
					成交金额：<span>￥{{info.price}}</span>
				</div>
				<!-- 申请退款 -->
				<div class="goods-text" v-show="$route.params.type==1">
					截拍时间：<span>{{info.close_action_time}}</span>
				</div>
				<!-- /申请退款 -->
				<!-- 申请退货 -->
				<div class="goods-text" v-show="$route.params.type==2">
					付款时间：<span>{{info.paytime}}</span>
				</div>
				<!-- /申请退货 -->
			</div>
		</div>
	</header>
	<main>
		<div class="return-reason clearfix">
			<div class="return-reason-tip desc-color" v-show="$route.params.type==1">申请退款理由</div>
			<div class="return-reason-tip desc-color" v-show="$route.params.type==2">申请退货理由</div>
			<!-- 下拉菜单 -->
			<div class="select-box" @click="showReasonList">
				<div class="selected-el clearfix">
					<!-- <span class="">{{ returnReason }}</span> -->
					<input class="v_reason" v-model = "returnReason" disabled="disabled" />
					<span class="shotsprites arrow-down fr"></span>

				</div>
				<ul class="reason-list" v-show="showBox">
					<li 
						@click.stop = "closeReasonList"
						:data-index="index"
						v-for="(item,index) in reasonArr"
                        :key='item'
					>
						{{ item }}
					</li>
					<li @click.stop='showOtherReasonBox'>&nbsp;其他</li>
					<li class="other_li" @click.stop="enterCause" v-show='is_other_reason_box' ><textarea class="v_other_reason" v-model="otherReason" :disabled="is_other_disable" placeholder="原因描述..."></textarea></li>
				</ul>
			</div>
			<button class="apply-btn" @click="applicationReturns" v-show="$route.params.type==1">申请退款</button>
			<button class="apply-btn" @click="applicationReturns" v-show="$route.params.type==2">申请退货</button>
		</div>
	</main>
	<!-- <my-footer></my-footer> -->
	<!-- 弹窗 -->
	<div class="popup-box" v-if="showPopup">
		<div class="popup-content">
			<div class="msg-box">
				<div class="popup-content-msg">您确定以{{ return_message}}为理由，{{$route.params.type==1?"申请退款":"申请退货"}}？</div>
				<!-- 如果用户已经评价 -->
				 <div class="popup-content-msg" v-if='info.co_status==1'>此订单您已评价，退货成功后将取消您的评价.</div> 
			</div>
			<button class="apply-btn confirm-btn" @click="returnGoods()">确定</button>
			<button class="apply-btn cancel-btn  grey" @click="closeWindow">取消</button>
		</div>
	</div>
	<!-- 测试全局弹窗 -->
	<show-alert v-show="tip" :msg="tip_message" @closeBox="close"></show-alert>
	<div class="space">
	</div>
</div>

</template>
<script>
    var showAlert = require("@/components/component/showAlert")
    var ajax = require("ajax");
    var config = window.config;
	
	

    module.exports = {
		data: function() {
			return {
        info: '',
        index: 1,
        tipInfo: "默认文字",
        tip: false,
        showBox: false,
        showPopup: false,
        returnReason: "",
        otherReason: '',
        type: "",//判断退款或者退货
        status: "",//该订单的状态
        is_mail_goods: 1,
        reasonArr: '', 
        is_other_disable: true, 
        is_other_reason_box: false,       //其他原因输入框
        return_message: '', 
        tip_message: '',
        url: '', //    baseUrl          
        // 买家退款申请理由
        buyer_refund: [
        "未按约定时间发货"
        ],
        // // 卖家拒绝退款申请理由
        // reasonArr2: [
        //       "今日发货",
        //       "其他"
        // ],
        // 买家退货申请理由
        buyer_return_isrefund: [
        "未收到货",
        "收到商品破损",
        "收到商品与描述不符",
        "商品质量问题",
        "7天无理由退货"
        ],
        buyer_return_unrefund: [
        "未收到货",
        "收到商品破损",
        "收到商品与描述不符",
        "商品质量问题"
        ],
        // // 卖家拒绝退货申请理由
        // reasonArr4: [
        //       "理由不符",
        //       "其他"
        // ],
        // 买家申请售后理由
        buyer_after_sale: [
              "7天无理由退货"
        ]
        }
    },
		
		components: {
                  // 'my-footer': footer,
                  'show-alert': showAlert      
      	},
        created: function(){
                    this.getOrderInfo();
                    this.url = window.config.img_url;
        },
        mounted: function(){
            var that = this;
                    $(".v_other_reason").blur(function(){
                      that.is_other_disable = true;
                      that.showBox = false;
                      that.returnReason = that.otherReason;  
                    //   console.log("失去焦点事件生效");  
                    });
        },
      	methods: {
            getOrderInfo: function(){
                var that = this;
                var order_id = parseInt(that.$route.params.id);
                // console.log(order_id);
                ajax.getOrderDetails(order_id,function(data){
                    if(data.status == 200){
                        that.info = data.data;
                        that.status = data.data.status;
                        that.is_mail_goods = data.data.is_mail_goods;
                    }else{
                        console.log(data.msg);
                    }
                });
                that.type = that.$route.params.type;
                if (that.type == 1) {//买家申请退款
                    that.reasonArr = that.buyer_refund;  //申请退款

                }else if(that.type == 2){//买家申请退货
                    if(that.status==3){
                        that.reasonArr = that.buyer_after_sale;//售后退货
                    }else if(that.status == 2){
                        if(that.is_mail_goods==1){
                         that.reasonArr = that.buyer_return_isrefund;  //48小时退货  订单包邮 
                        }else{
                         that.reasonArr = that.buyer_return_unrefund;   //48小时退货  订单不包邮
                        }
                    }
                
                }
                that.returnReason = that.reasonArr[0];
            },
      		showReasonList: function() {
      			// 展开列表
      			this.showBox = true;
                if(!this.otherReason){
                    this.returnReason = "";
                }else{
                    this.is_other_reason_box = true;
                    this.is_other_disable = false;
                    $(".v_other_reason").focus();
                }
      		},
      		closeReasonList: function(e) {
      			// 关闭列表并把当前选中的文案填入文字box
      			
                this.index= parseInt($(e.target).attr("data-index"))+1;
                
                // this.type==1&&(this.index==2)&&(this.index=6);
                // if (this.type==1&&(this.index==2)) {
                //     this.index = 6;
                // }
                // console.log(this.index);
                // if (this.index==this.reasonArr.length) {
                //     this.returnReason = ""
                //     $(".v_reason").attr("disabled",false).attr("placeholder","请输入具体原因").focus();
                // }else{
                //     this.returnReason = this.reasonArr[this.index-1];  
                // }
                this.returnReason = this.reasonArr[this.index-1]; 
                this.otherReason = ""; 
      			this.showBox = false;
                this.is_other_reason_box = false;
      		},
            showOtherReasonBox: function(){
                this.is_other_reason_box = !this.is_other_reason_box;
            },
            enterCause: function(){
                 this.is_other_disable = false;
                 $(".v_other_reason").focus();
             },
            applicationReturns: function() {
                        // 处理申请 后端关联
                        //   // 获取当前退货商品id 把当前退货理由传给后端
    
                  // if(this.index == this.reasonArr.length && (this.returnReason == '')){
                  //       this.tip = true;
                  // }else{
                  //       this.showPopup = true;
                  // }
                  if(!this.returnReason){
                    console.log("判断退货为空");
                    this.tip_message = "选择的理由或者输入的理由不能为空"
                    this.tip = true;
                  }else{
                     if(this.otherReason){
                        this.return_message = "您输入的内容";
                    }else{
                        this.return_message = '"'+this.returnReason+'"';
                    }
                    this.showPopup = true;
                  } 
                 
            },
            closeWindow: function() {
                this.showPopup = false;
            },
            close: function(){
                    this.tip = false;
            },

              // 处理退货申请
            returnGoods: function() {
                    // 获取当前退货商品id 把当前退货理由传给后端
                  var that = this;
                  var order_id = parseInt(that.$route.params.id);
                  var index = that.index;
                  var status = that.status;
                  var type = that.type; //1，是申请退款  ； 2 申请退货
                  var return_reason;
                  // if (index==this.reasonArr.length) {
                  //       return_reason = this.returnReason;
                  //       index = 6;
                  // }
                     if(that.otherReason!=''){
                        return_reason = that.otherReason;
                        index = 6;
                     }else{
                        return_reason = "";
                     }
                  ajax.confirmRefund(order_id,index,return_reason,function(data){
                    // console.log(index);
                      if(data.status == 200){
                          that.$router.replace("/buyerOrderDetails/"+that.info.id);
                      }else{
                          this.tip = true;
                          this.tip_message = data.msg;
                      }
                  });   
            }
      	}
	}

</script>
<style>
/* 申请退货 */
.text-red {
	color: #b73737;
}
.main-color	{
	font-family: PingFangSC;
	font-size: 1.6rem;
	color: #000;
}
.desc-color	{
	font-family: PingFangSC;
	font-size: 1.6rem;
	color: #666;
}
.apply-return {
	font-size: 1.6rem;
}
/* header */
.top-box {
	height: 14.5rem;
	margin: 1rem 0;
	background-color: #fff;
	font-family: PingFangSC;
}
.header-top {
	height: 3.9rem;
	padding: 0 1.4rem;
	line-height: 3.9rem;
}
.header-top div,
.top-box a ,
.top-box i {
	display: inline-block;
}
.shop-icon,
.arrow-right,
.phone-icon {
	vertical-align: middle;
}
.shop-icon {
	width: 2.2rem;
	height: 3.9rem;
	background: url(../assets/img/stopicon.png) no-repeat;
	background-position: -0.6rem -0.2rem;
	background-size: cover;
}
.arrow-right {
	width: .7rem;
	height: 1.5rem;
	background: url(../assets/img/arrow.png) no-repeat;
	background-position: -0.1rem -0.1rem;
	background-size: cover;
}
.phone-icon {
	width: 3.9rem;
	height: 3.9rem;
	background: url(../assets/img/phoneicon.png) no-repeat;
	background-position: 0.5rem -0.2rem;
	background-size: cover;
}
.goods-status {
	font-size: 1.4rem;
}
.goods-desc {
	height: 9rem;
	padding: 1rem 1.4rem;
	background-color: #f8f8f8;
}
.goods-img {
	width: 7rem;
	height: 7rem;
	margin-right: 1rem;
	border: 1px solid #d5d5d5;
	border-radius: .5rem;
}
.goods-img img {
	width: 100%;
	height: 100%;
}
.goods-name {
	margin-bottom: .2rem;
	line-height: 2.5rem;
	font-size: 1.6rem;

    /*一行显示*/
    width: 17rem;
    word-break: keep-all;/* 不换行 */
    white-space: nowrap;/* 强制在同一行内显示所有文本，直到文本结束或者遭遇 br 对象。不换行 */
    overflow: hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis;/* IE 专有属性，当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    /*一行显示*/
}
.goods-text {
	font-size: 1.4rem;
	color: #949494;
}
/* main */
.return-reason {
	position: relative;
	/*height: 4.4rem;*/
	line-height: 4.4rem;
	/*padding: 0 1.4rem;*/
	font-family: PingFangSC;
	background-color: #fff;
}
.return-reason-tip {
	position: absolute;
	top: 1px;
	left: 1.4rem;
	display: inline-block;
	font-size: 1.6rem;
}
.apply-btn {
	display: block;
	width: 30rem;
	height: 4.4rem;
	margin: 0 auto;
	margin-top: 4rem;
	border-radius: .3rem;
	line-height: 4.4rem;
	color: #fff;
	font-size: 1.6rem;
	font-family: PingFangSC;
	background-color: #15af25;
}
.selected-el {
	padding: 0 1.4rem;
	text-align: right;
}
.selected-el span {
	font-size: 1.4rem;
	color: #999;
}
.arrow-down {
	width: 2.7rem;
	height: 4.4rem;
}
.reason-list {
	width: 100%;
	background: #fff;
}
.reason-list li {
	/*width: 100%;*/
	height: 3.9rem;
	margin-left: 1.4rem;
	margin-right: 1.4rem;
	line-height: 3.9rem;
	border-top: 1px solid #e5e5e5;
	background: #fff;
	color: #000;
}

/* 弹窗 */
.popup-box {
	position: absolute;
    top: 0;
	left: 0;
	z-index: 13;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.4)
}
.popup-content {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	min-height: 19.7rem;
	padding-bottom: 2rem;
	text-align: center;
	font-family: PingFangSC;
	background-color: #fff;
}
.msg-box {
	margin: 2.5rem 0;
}
.popup-content-msg {
	font-size: 1.4rem;
	color: #2d2d2d;
}
.confirm-btn {
	margin-top: 0;
}
.cancel-btn {
	margin-top: 2rem;
}
input.v_reason, input.v_reason:disabled{
	background: #fff;
	text-align: right;
	color: #000;
}
textarea.v_other_reason, textarea.v_other_reason:disabled{
	background: #f6f6f6;
	width: 100%;
	height: 10.1rem;
	padding: 1rem;
	margin: auto;

}
textarea.v_other_reason{
	color: #999;
}
textarea.v_other_reason:disabled{
	color: #000;
}
.reason-list li.other_li{
	height: 12.1rem;
	padding-bottom: 0;
	font-size: 1.3rem;
}
.space{
	width: 100%;
	height: 6rem;
}
</style>
