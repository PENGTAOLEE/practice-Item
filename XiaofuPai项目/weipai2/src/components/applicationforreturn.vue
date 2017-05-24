<template>
<div class="apply-return">
	<header class="top-box">
		<div class="header-top clearfix">
			<!-- 改成跳转链接 -->
			<router-link to="/" class="shop-name">
				<i class="shop-icon"></i>
				<span class="main-color">{{info.shop_name}}</span>
				<i class="arrow-right"></i>
			</router-link>
			<div class="fr">
				<a class="phone-icon" :href="'tel:'+info.shop_mobile"></a>
				<div class="goods-status text-red">未确认收货</div>
			</div>
		</div>
		<div class="goods-desc">
			<div class="goods-img fl">
				<img :src="info.thumb" alt="">
			</div>
			<div class="fl">
				<h3 class="goods-name main-color">{{info.title}}</h3>
				<div class="goods-text">
					成交金额：<span>￥{{info.price}}</span>
				</div>
				<div class="goods-text">
					成交时间：<span>{{info.paytime}}</span>
				</div>
			</div>
		</div>
	</header>
	<main>
		<div class="return-reason clearfix">
			<div class="return-reason-tip main-color">申请退货</div>
			<!-- 下拉菜单 -->
			<div class="select-box" @click="showReasonList">
				<div class="selected-el clearfix">
					<span class="">{{ returnReason }}</span>
					<span class="shotsprites arrow-down fr"></span>
				</div>
				<ul class="reason-list" v-show="showBox">
					<li 
						@click.stop = "closeReasonList"
						:data-index="index"
						v-for="(item,index) in reasonArr3"
					>
						{{ item }}
					</li>
					<!-- <li @click.stop="closeReasonList" data-index="1">未收到货</li>
					<li>收到商品破损</li>
					<li>收到商品与描述不符</li>
					<li>商品质量问题</li>
					<li>7天无理由退货</li>
					<li>其他</li> -->
				</ul>
			</div>
			<button class="apply-btn" @click="applicationReturns">申请退货</button>
		</div>
	</main>
	<my-footer></my-footer>
	<!-- 弹窗 -->
	<div class="popup-box" v-if="showPopup">
		<div class="popup-content">
			<div class="msg-box">
				<div class="popup-content-msg">您确定以“{{ returnReason }}”的理由，申请退货？</div>
				<!-- 如果用户已经评价 -->
				<div class="popup-content-msg">此订单您已评价，退货成功后将取消您的评价.</div>
			</div>
			<button class="apply-btn confirm-btn" @click="returnGoods()">确定</button>
			<button class="apply-btn cancel-btn  grey" @click="closeWindow">取消</button>
		</div>
	</div>
	<!-- 测试全局弹窗 -->
	<!-- <show-alert v-show="showAlert" :msg="tipInfo"></show-alert> -->
</div>

</template>
<script>


    module.exports = {
		data: function() {
			return {
                        info: '',
                        index: 1,
                tipInfo: "默认文字",
                        showAlert: false,
				showBox: false,
                        showPopup: false,
				returnReason: "未按约定时间发货",
                        // 买家退款申请理由
                        reasonArr1: [
                              "未按约定时间发货",
                              "其他"
                        ],
                        // 卖家拒绝退款申请理由
                        reasonArr2: [
                              "今日发货",
                              "其他"
                        ],
                        // 买家退货申请理由
                        reasonArr3: [
                              "未按约定时间发货",
                              "收到商品破损",
                              "收到商品与描述不符",
                              "商品质量问题",
                              "7天无理由退货",
                              "其他"
                        ],
                        // 卖家拒绝退货申请理由
                        reasonArr4: [
                              "理由不符",
                              "其他"
                        ],
                        // 买家申请售后理由
                        reasonArr5: [
                              "7天无理由退货",
                              "其他"
                        ]
			}
		},
		
		components: {
                  'my-footer': footer
      	},
        created: function(){
                    this.getOrderInfo();
        },
      	methods: {
            getOrderInfo: function(){
                var that = this;
                var order_id = parseInt(that.$route.params.id);
                console.log(order_id);
                ajax.getOrderDetails(order_id,function(data){
                    if(data.status == 200){
                        that.info = data.data;
                        console.log(data);
                    }else{
                        alert("您出错了");
                    }
                });
            },
      		showReasonList: function() {
      			// 展开列表
      			this.showBox = true;
      		},
      		closeReasonList: function(e) {
      			// 关闭列表并把当前选中的文案填入文字box
      			this.returnReason = $(e.target).html();
                this.index= parseInt($(e.target).attr("data-index"))+1;
                console.log(this.index);
      			this.showBox = false;
      		},
                  applicationReturns: function() {
                        // 处理申请 后端关联
                        this.showPopup = true;
                  },
                  closeWindow: function() {
                        this.showPopup = false;
                  },

                  // 路由跳转
                  goTo: function(url) {
                        this.$router.push(url)
                  },

                  // 处理退货申请
                  returnGoods: function() {
                        // 获取当前退货商品id 把当前退货理由传给后端
                      var that = this;
                      var order_id = parseInt(that.$route.params.id);
                      var index = that.index;
                      ajax.confirmRefund(order_id,index,function(data){
                          if(data.status == 200){
                              that.goTo("/buyerOrderDetails/"+that.info.id);
                          }else if(data.status ==501){
                              alert("参数错误");
                          }else if(data.status ==502){
                              alert("未登录");
                          }else if(data.staus == 503){
                          }else{
                              alert("您出错了");
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
	width: 100%;
	height: 3.9rem;
	margin-left: 1.4rem;
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

</style>
