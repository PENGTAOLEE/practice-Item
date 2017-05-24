<template>
<div class="apply-return">
	<header class="top-box">
		<div class="header-top clearfix">
			<!-- 改成跳转链接 -->
			<router-link to="/" class="shop-name">
				<i class="shop-icon"></i>
				<span class="main-color">{{info.buyer}}</span>
				<i class="arrow-right"></i>
			</router-link>
			<!-- <div class="fr">
				<a class="phone-icon" :href="'tel:'+info.buyer_mobile"></a>
				<div class="goods-status text-red" v-show="$route.params.type==3">拒绝退款申请</div>
				<div class="goods-status text-red" v-show="$route.params.type==5">拒绝退货申请</div>
			</div> -->
		</div>
		<div class="goods-desc">
			<div class="goods-img fl">
				<img :src="JSON.parse(info.thumb).url" alt="">
			</div>
			<div class="fl">
				<h3 class="goods-name main-color">{{info.desc}}</h3>
				<div class="goods-text">
					成交金额：<span>￥{{info.price}}</span>
				</div>
				<div class="goods-text">
					成交时间：<span>{{info.pay_time}}</span>
				</div>
			</div>
		</div>
	</header>
	<main>
		<div class="return-reason clearfix">
			<div class="return-reason-tip desc-color" v-show="$route.params.type==3">拒绝退款原因</div>
			<div class="return-reason-tip desc-color" v-show="$route.params.type==5">拒绝退货原因</div>
			<!-- 下拉菜单 -->
			<div class="select-box" @click="showReasonList">
				<div class="selected-el clearfix">
					<input id="explain" v-model="returnReason" disabled="disabled"/>
					<span class="shotsprites arrow-down fr"></span>
				</div>
				<ul class="reason-list" v-show="showBox">
					<li 
						@click.stop = "closeReasonList"
						:data-index="index"
						v-for="(item,index) in reasonArr"
					>
						{{ item }}
					</li>
					<li>其他</li>
					<li class="other_li" @click.stop="enterCause"><textarea class="v_other_reason" v-model="otherReason" :disabled="is_other_disable" placeholder="原因描述..."></textarea></li>
					
				</ul>
			</div>
			<button class="apply-btn" @click="show" v-show="$route.params.type == 3">拒绝退款</button>
			<button class="apply-btn" @click="show" v-show="$route.params.type == 5">拒绝退货</button>
		</div>
	</main>
	<my-footer></my-footer>
	<!-- 弹窗 -->
	<!-- 测试全局弹窗 -->
	<show-alert v-show="tips" :msg="tipInfo" @closeBox="confirmtips"></show-alert>
	<!-- 弹窗 -->
	<show-confirm v-show="showPopup" :msg="tipReason" @childEvent="confirm" @closeBox="close"></show-confirm>	
</div>

</template>
<script>


    module.exports = {
    data: function() {
      return {
        info: '',
        refused_reason: 1,
        tipInfo: "默认文字",
        showAlert: false,
        showBox: false,
        showPopup: false,
        reasonArr: [],
        returnReason: '',
        otherReason: '',
        is_other_disable: true,
        tipReason: '',
        url: '',
        tips: false,
          
          // 卖家拒绝退款申请理由
          reasonArr1: [
          "今日发货"
          ],
          //卖家拒绝退货申请理由
          reasonArr2: [
          "理由不符"
          ]
      }
    },
    
    components: {
                  'my-footer': footer,
                  'show-alert': showAlert,
                  'show-confirm': showConfirm
        },
        created: function(){
            
            this.getOrderInfo();
            this.url = config.img_url;
        },
        mounted: function(){
             var that = this;
                    $(".v_other_reason").blur(function(){
                      that.is_other_disable = true;
                      that.showBox = false;
                      if(that.otherReason){
                        that.returnReason = that.otherReason;  
                      }else{
                        that.returnReason = that.reasonArr[0];
                        that.refused_reason = 1;
                      }
                       
                    });
        },
        methods: {
            getOrderInfo: function(){
                var that = this;
                var order_id = parseInt(that.$route.params.id);
                var type = that.$route.params.type;
                that.reasonArr=(type == 3)? that.reasonArr1: that.reasonArr2;
                that.returnReason = this.reasonArr[0];
                
                ajax.getSendInfo(order_id,function(data){
                    if(data.status == 200){
                        that.info = data.data;
                        console.log(data);
                    }else{
                        alert(data.msg);

                    }
                });
            },
          showReasonList: function() {
            // 展开列表
            this.showBox = true;
            if(!this.otherReason){
              this.returnReason = '';
            }
          },
          enterCause: function(){
                 this.is_other_disable = false;
                 $(".v_other_reason").focus();
          },
          closeReasonList: function(e) {
            // 关闭列表并把当前选中的文案填入文字box
                this.refused_reason= parseInt($(e.target).attr("data-index"))+1;
                this.returnReason = this.reasonArr[this.refused_reason-1];
                this.otherReason = "";
                this.showBox = false;
          },
           show: function(){
              if(!this.returnReason){
                this.tipInfo = "拒绝理由不能为空";
                this.tips = true;
              }else{
                var request_type  = this.$route.params.type;
                if(request_type==3){//拒绝退款
                    if(this.otherReason){
                      this.tipReason = "您确认以您输入的理由拒绝退款"
                    }else{
                      this.tipReason = '您确认以"'+this.returnReason+'"理由拒绝退款'
                    }
                }else if(request_type==5){//拒绝退货
                    if(this.otherReason){
                      this.tipReason = "您确认以您输入的理由拒绝退货"
                    }else{
                      this.tipReason = '您确认以"'+this.returnReason+'"理由拒绝退货'
                    }
                }
                this.showPopup = true;
              }
           },
          close: function() {
                this.showPopup = false;
          },

                  // 路由跳转
          goTo: function(url) {
                this.$router.push(url);
          },
          confirmtips: function(){
                this.tips = false;
          },
                  // 处理退货和退款申请
          confirm: function() {
                        // 获取当前退货商品id 把当前退货理由传给后端
             
              var that = this;
              var order_id = that.$route.params.id;
              var refused_reason;
              var request_type  = that.$route.params.type;
              var index = "";
              var otherReason;
              if(request_type == 5){
                (that.refused_reason==1)&& (refused_reason=2);
              }else if(request_type ==3){
                (that.refused_reason==1)&& (refused_reason=1);
              }
              if(that.otherReason){
                refused_reason = 3;
                otherReason = that.otherReason;
              }else{
                otherReason = "";
              }
              ajax.orderHandle(order_id,request_type,index,refused_reason,otherReason,function(data){
              if(data.status == 200){
                  that.close();
                  that.goTo("/sellerOrderDetails/"+order_id);
                  console.log("退款成功");
              }else{
                console.log(data.msg);
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
	background: url(/res/img/stopicon.png) no-repeat;
	background-position: -0.6rem -0.2rem;
	background-size: cover;
}
.arrow-right {
	width: .7rem;
	height: 1.5rem;
	background: url(/res/img/arrow.png) no-repeat;
	background-position: -0.1rem -0.1rem;
	background-size: cover;
}
.phone-icon {
	width: 3.9rem;
	height: 3.9rem;
	background: url(/res/img/phoneicon.png) no-repeat;
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
	height: 4.4rem;
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
input:disabled{
	background: #fff;
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
</style>
