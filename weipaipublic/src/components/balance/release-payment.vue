<template>
<div class="payment-box">
	<div class="sellerbond" v-if="!showPassword">
	<!-- 头部 -->
		<!-- 订单信息 -->
		<header  class="buyer-header" v-if="isOrder">
			<div @click="goToAddr">
				<div class="buyer-header-msg">
					<span class="buyer-header-name">收货人: {{ goodsInfo.address.name }}</span>
					<span class="buyer-header-phone">{{ goodsInfo.address.mobile }}</span>
				</div>
				<div class="buyer-header-address">
					<span class="buyer-address-info">{{ goodsInfo.address.area }} {{ goodsInfo.address.address }}</span>
				</div>
			</div>
		</header>

		<!-- 认证费用支付 -->
		<header  class="sell-header authentic" v-if="isAuthentic">
			<div class="sell-header-title authentic" v-if="isIdentity == 'personal'">个人实名认证</div>
			<div class="sell-header-title authentic" v-if="isIdentity == 'company'">商家实名认证</div>
			<div class="header-lot clearfix">
				<div class="lot-img fl divbg authentic">
					<div class="spritesmap lot-img-box" :class="isIdentity"></div>
				</div>
				<div class="lot-explain fl re">
					<span class="ab lot-price font-color">{{ paymentAmount | formatMoney }}</span>
				</div>
			</div>
		</header>

		<!-- 支付保证金 || 违约金 -->
		<header  class="sell-header" v-if="isDeposit || isSellerDeposit">
			<div class="header-lot clearfix">
				<div class="lot-img fl divbg">
					<div v-if="thumb.type == 'img'" class="lot-img-box">
						<img :src="baseUrl + thumb.url" alt="">
					</div>
				</div>
				<div class="lot-explain fl re">
					<!-- 保证金 -->
					<span class="lot-name" v-if="isDeposit || isSellerDeposit">{{ goodsInfo.desc }}</span>
					<!-- <span class="ab lot-price" v-if="isDeposit">本次出价：{{ goodsInfo.deposit_price | formatMoney }}</span> -->
					<span class="ab lot-price" v-if="isSellerDeposit">截止时间：{{ goodsInfo.end_time }}</span>
					<span class="ab lot-price" v-if="isDeposit">截止时间：{{ goodsInfo.last }}</span>
				</div>
			</div>
			<p class="sell-detailed" v-if="isDeposit || isSellerDeposit">
				<span>起拍价：{{ goodsInfo.start_price }}元&nbsp;&nbsp;&nbsp;</span>
				<span>加价：{{ goodsInfo.increase_price }}元/次</span>
			</p>
		</header>

		<!-- 订单支付 -->
		<header  class="sell-header" v-if="isOrder">
			<div class="header-lot clearfix">
				<div class="lot-img fl divbg">
					<div v-if="thumb.type == 'img'" class="lot-img-box" >
						<img :src="baseUrl + thumb.url" alt="">
					</div>
				</div>
				<div class="lot-explain fl re">
					<span class="lot-name" v-if="isOrder">{{ goodsInfo.good.desc }}</span>
					<!-- <div
						v-if="isOrder"
						class="ab lot-price cutdown-box" 
						:data-startTime="goodsInfo.good.starttime"
						:data-endTime="goodsInfo.good.starttime"
						:data-id="1"
					>距离结束： -->
                    <div class='ab lot-price1'>距离结束
						<!-- <span class="cutdown-timebox"><span>00</span>时<span>00</span>分<span>00</span>秒</span> -->
                        <count-down-hour :starttime='goodsInfo.good.starttime' :endtime='goodsInfo.good.endtime'></count-down-hour>
					</div>
				</div>
			</div>
			<p class="sell-detailed" v-if="isOrder">
				<span>运费：{{ goodsInfo.start_price || '卖家包邮' }}&nbsp;&nbsp;&nbsp;</span>
				<span>保证金：{{ goodsInfo.good.deposit_price | formatMoney }} </span>
				<span>金额：{{ goodsInfo.good.bid_price | formatMoney }} </span>
			</p>
		</header>

		<!-- 余额充值 -->
		<header  class="sell-header-box" v-if="isRecharge">
			<div class="sell-header-title">余额充值</div>
			<div class="sell-header-cont re">
				<i class="shotsprites icon-balanceRecharge"></i>
				<span class="sell-header-price">{{ rechargeAmount | formatMoney }}</span>
			</div>
		</header>

		<!-- 余额提现 -->
		<header  class="sell-header-box" v-if="isCash">
			<div class="sell-header-title">余额提现</div>
			<div class="sell-header-cont re">
				<i class="shotsprites icon-balanceRecharge"></i>
				<span class="sell-header-price">{{ paymentAmount | formatMoney }}</span>
			</div>
		</header>
	<!-- 头部结束 -->

	<!-- 支付方式列表 -->
		<!-- 保证金相关 -->
		<div class="sell-content" v-if="isDeposit || isSellerDeposit || isOrder || isAuthentic">
			<!-- 支付保证金 || 违约金 -->
			<p class="sell-con-title" v-if="isDeposit || isSellerDeposit">
				保证金：<span class="color">{{ goodsInfo.deposit_price | formatMoney }} </span>
				<span class="con-explain" v-if="isDeposit">(“拍卖失败”或“付款”后退还)</span>
				<span class="con-explain" v-if="isSellerDeposit">("流拍"或"确认收货"后退还)</span>
			</p>
			<!-- 订单支付 -->
			<p class="sell-con-title" v-if="isOrder">
				付款金额：<span class="color"> {{ goodsInfo.good.bid_price | formatMoney }} </span>
			</p>
			
			<!-- 认证费用 -->
			<p class="sell-con-title" v-if="isAuthentic">
				需要支付: <span class="color"> {{ paymentAmount | formatMoney }}</span>
			</p>

			<!-- 是否开通余额支付 -->
			<!-- 已开通余额支付 -->
			<div class="con-list clearfix" data-type="2" v-if="goodsInfo.passwordstatus == '1'" @click="selectItem">
				<div class="fl sellbg shotsprites"></div>
				<div class="fl sellicon-1 shotsprites"></div>
				<!-- 余额不足 -->
				<div class="fl list-explain" v-if="goodsInfo.passwordstatus == '1' && goodsInfo.balstatus == '0'">
					<p class="list-title"><span class="set-up">请及时充值</span></p>
					<p class="list-amount">可用余额：￥{{ goodsInfo.balprice }}元</p>
				</div>
				<!-- 余额支付 -->
				<div class="fl list-explain" v-if="goodsInfo.passwordstatus == '1' && goodsInfo.balstatus == '1'">
					<p class="list-title"><span class="set-up">余额可用</span></p>
					<p class="list-amount">可用余额：￥{{ goodsInfo.balprice }}元</p>
				</div>
				<!-- 充值 -->
				<div v-if="goodsInfo.passwordstatus == '1'" @click="judgeGoTo('/recharge/0')" class="fr list-right">充值<span class="shotsprites to-right" ></span></div>
			</div>
			<!-- 未开通余额支付 -->
			<router-link 
				to="/bankcard?from=payment"
				class="con-list clearfix link-a" 
				data-type="2" 
				v-if="goodsInfo.passwordstatus != 1"
			>
				<div class="fl sellbg shotsprites"></div>
				<div class="fl sellicon-1 shotsprites"></div>
				<!-- 支付密码未设置 --> 
				<div class="fl list-explain">
					<p class="list-title"><span class="set-up">支付密码未设置</span></p>
					<p class="list-amount">可用余额：￥{{ goodsInfo.balprice }}元</p>
				</div>
				<!-- 开通  -->
				<div v-if="goodsInfo.passwordstatus != 1" @click="judgeGoTo('/bankcard?from=payment')" class="fr list-right">开通<span class="shotsprites to-right" ></span></div>
			</router-link>
			<!-- 余额支付结束 -->
			<!-- 微信支付 -->
			<div class="con-list clearfix" data-type="1" @click="selectItem" v-if="isWeixin">
				<div class="fl sellbg current shotsprites"></div>
				<div class="fl sellicon-2 shotsprites"></div>
				<div class="fl list-explain">
					<p class="list-title">微信支付</p>
					<p class="list-amount">单笔最高5,000-50,000元</p>
				</div>
			</div>
			<!-- 支付宝支付 -->
			<div class="con-list clearfix" data-type="3" @click="selectItem" v-if="!isWeixin">
				<div class="fl sellbg shotsprites"></div>
				<div class="fl alipay_icon"></div>
				<div class="fl list-explain">
					<p class="list-title">支付宝支付</p>
					<p class="list-amount">单笔最高5,000-50,000元</p>
				</div>
			</div>
			<!-- <div class="con-list clearfix" data-type="2">
				<div class="fl current sellbg shotsprites"></div>
				<div class="fl sellicon-3 shotsprites"></div>
				<div class="fl list-explain">
					<p class="list-title">银行卡支付 <span>支持储蓄卡、信用卡</span></p>
					<p class="list-amount">单笔最高5,000-50,000元</p>
				</div>
			</div>	 -->	
		</div>

		<!-- 余额相关 充值 + 提现 -->
		<div class="sell-content" v-if="isRecharge || isCash">
			<!-- 充值 & 认证费用 -->
			<div v-if="isRecharge">
				<p class="sell-con-title">
					需要支付: <span class="color"> {{ rechargeAmount | formatMoney }}</span>
				</p>
				<!-- 微信支付 -->
				<div class="con-list clearfix" data-type="1" @click="selectItem" v-if="isWeixin">
					<div class="fl sellbg current shotsprites"></div>
					<div class="fl sellicon-2 shotsprites"></div>
					<div class="fl list-explain">
						<p class="list-title">微信支付</p>
						<p class="list-amount">单笔最高5,000-50,000元</p>
					</div>
				</div>
				<!-- 支付宝支付 -->
				<div class="con-list clearfix" data-type="3" @click="selectItem" v-if="!isWeixin">
					<div class="fl sellbg shotsprites"></div>
					<div class="fl alipay_icon"></div>
					<div class="fl list-explain">
						<p class="list-title">支付宝支付</p>
						<p class="list-amount">单笔最高5,000-50,000元</p>
					</div>
				</div>
			</div>
			<!-- 充值结束 -->
			<!-- 提现 -->
			<div v-if="isCash">
				<p class="sell-con-title" >
					提现金额: <span class="color"> {{ paymentAmount | formatMoney }}</span>
				</p>
				<div class="con-list clearfix" data-type="1" @click="selectItem">
					<div class="fl sellbg current shotsprites"></div>
					<div class="fl sellicon-2 shotsprites"></div>
					<div class="fl list-explain">
						<p class="list-title">微信</p>
						<p class="list-amount">单笔最高5,000-50,000元</p>
					</div>
				</div>
				<!-- 选择银行卡 -->
				<div class="con-list clearfix" data-type="2"  @click="selectItem">
					<div class="fl sellbg shotsprites"></div>
					<div class="fl sellicon-3 shotsprites"></div>
					<div class="fl list-explain" v-if="!sessionBank">
						<p class="list-title">银行卡 <span>支持储蓄卡、信用卡</span></p>
						<p class="list-amount">单笔最高5,000-50,000元</p>
					</div>
					<div class="fl list-explain" v-if="sessionBank">
						<p class="list-title">{{ sessionBank }} </p>
						<p class="list-amount"><span>支持储蓄卡、信用卡</span></p>
					</div>
					<div class="fr list-right blue">
						<a href="javascript:;" @click="selectBank">
							选择<span class="shotsprites blue-right"></span>
						</a>
					</div>
				</div>	
				<!-- 选择银行卡结束 -->
			</div>	
			<!-- 提现结束 -->
		</div>
	<!-- 支付方式列表结束 -->
		<!-- 保证金 -->
		<button v-if="isDeposit || isSellerDeposit || isRecharge || isOrder || isAuthentic" class="sellpayment pay-password" @click="confirmPayment">安全支付</button>
		<!-- 充值提现-->
		<button v-if="isCash"  class="sellpayment pay-password" @click="confirmWithdraw">确认提现</button>
	</div>
	<!-- 密码输入框 -->
	<compt_Password v-if="showPassword" :title="title" @validate="verifyPassword"></compt_Password>

	<!-- 组件弹窗 -->
	<show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>
	
</div>

</template>
<script>
	var comptPassword = require("@/components/balance/password")
	var showAlert = require("@/components/component/showAlert")

	// 倒计时
	var countDownHour = require("@/components/countdownhour")

	var ajax = require('ajax');
	var utils = require('utils');
	var config = window.config;
	// 测试
	// var Pay = require('/res/lib/wechat/wxPay');
	

    module.exports = {
		data:function(){
			return {
				isWeixin: false,
				goodsInfo : {},
				thumb : '',
				// 测试字段
				price: '1000',

				sessionBank: '',        // 银行卡名字
				
				offerPrice: '',         // 出价金额
				rechargeAmount: '',     // 充值金额
				withdrawalAmount: '',   // 提现金额
				paymentAmount: '',      // 支付金额

				isOrder: false,         // 订单支付
				isSellerDeposit: false, // 卖家保证金
				isDamage: false,        // 违约保证金
				isDeposit: false,       // 商品保证金
				isRecharge: false,      // 充值
				isCash: false,          // 提现
				isAuthentic: false,     // 认证

				// 区分个人认证 & 企业认证
				isIdentity: 1,          

				cashLow: false,         // 余额不足
				notOpen: true,          // 未开通余额
				accessTo: false,        // 可以使用余额

				payType: '1',           // 支付方式 默认使用微信支付

				optionData: {},         // 余额支付成功后数据对象

				baseUrl : window.config.img_url,
				showPassword: false,    // 是否显示密码输入框
				title:'请输入支付密码', // 输入框title
				// 弹窗
                showAlertBoll: false,
                tipMsg: '',

                requireParams: {},        // 余额支付请求数据
			}
		},
		components: {
			'show-alert': showAlert,
			'count-down-hour': countDownHour,
			'compt_Password': comptPassword
		},
		filters: {
			// 格式化人民币相关
	    	formatMoney: function (value) {
			    if (!value) return ''
			    value = value.toString()
			    return '￥' + value
		    }
		}, 
		
		created: function() {
			// 拿到本次出价金额
			var type = utils.getRequest().type;
			if (type == 'deposit') {
				// 商品保证金
				this.isDeposit = true;
				this.offerPrice = sessionStorage.getItem('offer_price');
				this.getBuyerPay();
				this.paymentAmount = this.goodsInfo.deposit_price;
			} else if(type == 'seller') { // 添加一个字段 区分是否设置开拍时间
				// 卖家保证金
				this.isSellerDeposit = true;
				this.getDepositPay();
				this.paymentAmount = this.goodsInfo.deposit_price;
			} else if (type == 'recharge') {
				// 充值
				this.isRecharge = true;
				this.rechargeAmount = sessionStorage.getItem('recharge_amount');
				this.paymentAmount = this.rechargeAmount;
			} else if (type == 'cash') {
				// 提现
				this.isCash = true;
				this.withdrawalAmount = sessionStorage.getItem('cash_amount') || this.$route.params.id;
				this.getCashPay()
				// 提现金额 取自缓存
				this.paymentAmount = this.withdrawalAmount;
				this.payType = '2';
			} else if (type == 'order') {
				// 订单支付
				this.isOrder = true;
				this.getOrderPay();
				if (window.sessionStorage.getItem("location_id")) {
					var addressId = window.sessionStorage.getItem("location_id");	
				};
				
				// 选择订单
				if (addressId) {
          // 把 addressID 同步到数据库选中地址字段
          this.goodsInfo.address={};
					this.goodsInfo.address.name = window.sessionStorage.getItem("location_name");
					this.goodsInfo.address.mobile = window.sessionStorage.getItem("location_mobile");
          this.goodsInfo.address.area = window.sessionStorage.getItem("location_area");
          this.goodsInfo.address.address = window.sessionStorage.getItem('location_address');
                    
				};
				this.paymentAmount = this.goodsInfo.good.bid_price;
			} else if (type == 'authentic') {
				// 认证支付  /payment/0?type=authentic&ordertype=6&identity=personal&authid=21
				this.isAuthentic = true;
				this.isIdentity = utils.getRequest().identity;
				
				// 调取数据
				this.getAuthView();
				// 计算支付金额
				this.paymentAmount = this.goodsInfo.money;
			}

			// 是否微信浏览器
			this.isWeixin = utils.isWeixin();
		},
		mounted: function(){
			var _this = this;
			// 银行卡名字
			this.getSessionBank()

			//重新刷新当前页面
			if (!window.sessionStorage.getItem('isReload')) {
				window.sessionStorage.setItem('isReload',true);
				window.location.reload();
			};

			// 创建倒计时
			// this.emitCountDown($(".cutdown-box"),_this.goodsInfo.good.starttime,_this.goodsInfo.good.endtime);

			// 余额提现 默认使用银行卡
			this.$nextTick(function() {
				if (this.payType == 2) {
					$('.con-list').find('.sellbg').removeClass('current');
					$('.con-list').eq(1).find('.sellbg').addClass('current');
				};	
			})
			
		},
		beforeDestroy: function() {
      window.sessionStorage.removeItem('isReload');
      //清除缓存
      window.sessionStorage.removeItem('location_id'); 
      window.sessionStorage.removeItem('location_name');
      window.sessionStorage.removeItem('location_mobile');
      window.sessionStorage.removeItem('location_area');
      window.sessionStorage.removeItem('location_address');Item
      window.sessionStorage.removeItem('location_details');
		}, 
		methods: {
			// // 倒计时触发
			// emitCountDown: function(obj,startTime,endTime) {
			// 	var that = this;
			// 	var alarm = new utils.Alarm(startTime, endTime, function (second, minute, hour, day) {
			// 	    obj.find('.cutdown-timebox').html('<span>'+hour+'</span>时<span>'+minute+'</span>分<span>'+second+'</span>秒' );
			// 	}, function () {
			// 		$('.sellpayment').attr('disabled',true)
			// 		// that.showAlertTip('您错过了支付时间')
			// 	});
			// 	alarm.start();  
			// 	return alarm;
			// },
			// 选择支付方式
			selectItem: function(ev) {
				var $node = $(ev.target).parents('.con-list');
				this.payType = $node.attr('data-type');
				
				$node.find(".sellbg").addClass("current");
				$node.siblings(".con-list").find(".sellbg").removeClass("current");
			},

			// 选择银行卡
			selectBank: function() {
				// 写入缓存
				var url = location.href;
				window.sessionStorage.setItem("payment_url_bank",url)
				this.$router.push('/bankcardadd/selectpage');
			},


			// 选择地址跳转
			goToAddr: function() {
				// 写入缓存
				var url = location.href;
				window.sessionStorage.setItem("payment_url_order",url)
				this.$router.push('/location?from=payment');
			},

			// 获取银行卡名字
			getSessionBank: function() {
				if (sessionStorage.getItem('bank_name')) {
					this.sessionBank = sessionStorage.getItem('bank_name');
					//sessionStorage.removeItem('bank_name');
				};

			},

			// 获取卖家保證金支付数据
			getDepositPay: function(){
				var goodsId = this.$route.params.id;
				var vue = this;
				// 定義goodsId為零時，調用其他接口
				ajax.getDepositPay(goodsId,function(res){
					if(res.status == '200'){
						vue.goodsInfo = res.data;
						vue.formatThumb(res.data.thumb);
					}else{
						vue.showAlertTip(res.msg);
						// vue.$router.push('/*');
					}
				});
			},

			// 获取商品保证金支付数据
			getBuyerPay: function() {
				var goodsId = this.$route.params.id;
				var vue = this;
				ajax.getBuyerPay(goodsId,function(res) {
					if (res.status == 200) {
						vue.goodsInfo = res.data;
						vue.formatThumb(res.data.thumb)
					} else {
						vue.showAlertTip(res.msg)
						// vue.$router.push('/*');
					}
				})
			},
			
			// 訂單支付數據
			getOrderPay: function() {
				// 訂單id
				var _this = this;
				var orderId = Number( utils.getRequest().orderid );
				ajax.orderPayment(orderId,function(data) {
					if (data.status == 200) {
						_this.goodsInfo = data.data;
						_this.formatThumb(data.data.good.thumb)
					} else {
						_this.showAlertTip(data.msg)
						// _this.$router.push('/*');
					}
				})
			},

			// 认证费用数据
			getAuthView: function () {
				var authid = utils.getRequest().authid;
				ajax.getAuthview(authid, (data) => {
					if (data.status == 200) {
						this.goodsInfo = data.data;
						console.log( this.goodsInfo )
					} else {
						this.showAlertTip(data.msg)
					}
				})
			},

			// 拍品图片处理
			formatThumb: function(thumb) {
				thumb && (this.thumb = JSON.parse(thumb))
			}, 

			// 提现金额
			getCashPay: function() {
				var _this = this;
				var money = Number(this.$route.params.id);
				// var money = Number(this.withdrawalAmount);
				ajax.withdrawCash(money,function(data) {
					if(data.status == 200) {
						_this.goodsInfo = data.data;
					} else if(data.status == 201) {
						return;
					} else {
						_this.showAlertTip(data.msg)
					}
				})
			},

			// 点击支付按钮
			confirmPayment: function() {

				// 按钮变成不可点击
				$('.sellpayment').css('backgroundColor','#999');
				$('.sellpayment').attr('disabled',true);

				var _this = this; 

                // 支付方式 1:微信 2:余额
				var payType = this.payType;
				// 1 保证金 2 充值 3 商品 6 认证费用
				var ordertype = utils.getRequest().ordertype;
				// money 支付金额  保证金 | 订单 | 充值
				var money = this.paymentAmount;
				// 认证费支付id
				var authid = utils.getRequest().authid;
				// 订单编号
				var paynum;
				var address = [];
				// 商品id
				var goodid = this.$route.params.id;
				// 订单id
				var orderid = utils.getRequest().orderid;

				// 判断跳转url 关注页 || 详情页
				var fromUrl = utils.getRequest().from;

				// 卖家保证金增加一个开拍时间字段 默认为0
				var begintime = 0;

				// 订单支付单独处理
				var type = utils.getRequest().type;
				if (type == 'order') {
					// 获取order
					paynum = this.goodsInfo.good.ordernum;
					address = this.goodsInfo.address;
					// goodsid
					goodid = this.goodsInfo.good.id;
				} 

				// 如果是卖家保证金支付 增减一个字段【开拍时间】
				if (ordertype == 5) {
					begintime = this.goodsInfo.begin_time;
				};

				var params = {
					paytype: payType,
					ordertype: ordertype,
					money: money,
					paynum: paynum,
					goodid: goodid,
					formurl: fromUrl,
					address: address,
					orderid: orderid,
					authid: authid,
					begintime: begintime,
				}

				// 余额支付赋值全局对象
				this.requireParams = params;

				if (payType == 1 || payType == 3) { // 微信支付 || 支付宝支付
					var Pay = require('../../assets/js/wechat/wxPay');
					// 实例化微信支付
					var wxPay = new Pay.wxPay();
					wxPay.makeOrder(params)
				} else if (payType == 2) { // 余额支付
					this.showInput() 
				}
				//  else if(payType == 3) { // 支付宝支付
				// 	console.log('支付宝支付')
				// }
				
			},

			// 处理密码输入完成后的状态
            verifyPassword: function(value){
                var _this = this;
                var prv_v =  value;
                ajax.VerifyPassword(prv_v,function(data){
                    if (data.status == 200) {
                        // _this.signStr = data.data[0];

                        // 初始化输入框
                        _this.initInputBox();
                        // 关闭密码输入框
                        _this.showInput();

                        // 成功验证密码并且对接后端接口
                        if (utils.getRequest().type == 'cash') {
                        	_this.withdrawSuccess();
                        } else {
                        	_this.balancePay(_this.requireParams)	
                        }
                        

                        // 默认支付方式改为 1 [微信] 
                        _this.payType = 1;

                    } else {
                        _this.showAlertTip(data.msg)

                        // 按钮可以重新点击
                        setTimeout(function(){
	                        $('.sellpayment').css('backgroundColor','#15af25');
	                        $('.sellpayment').attr('disabled',false);
	                    },100)
                    }
                })

            },

            // 余额支付后端验证
            balancePay: function(option) {
            	var _this = this;
            	// 输入密码结束 进行余额支付
				ajax.pay(option, function(data){
	                if(data.status == 200) {
	                	// 余额支付成功
	                    // var configInfo = data.data.info;
	                    var orderInfo  = data.data.orderdata;

	                    // 赋值全局对象
	                    _this.optionData = orderInfo;

	                    // 直接使用数据返回值 处理页面跳转回调
                		_this.paymentSuccess(_this.optionData);
						
	                } else {
	                   _this.showAlertTip(data.msg);
	                }  
	            });
            },

            // 初始化输入框
            initInputBox: function() {
                $('.paySimulation').find("b").css({"display":"none"});

                $('.payInput').val('');

                $('.payInput').focus();

                // 移除当前i标签的active 为第一个添加active
                $('.paySimulation').find("i").removeClass('active');
                $('.paySimulation').find("i").eq(0).addClass('active');

            },

			/**
			 * 余额支付处理页面跳转
			 * @param  {object} option 余额支付成功返回数据
			 * @return 无       
			 */
			paymentSuccess: function(option) {
                var orderType = option.ordertype;    //  支付类型     
                var goodsid   = option.goods_id;     //  拍品id
                var paynum    = option.paynum;       //  订单id
                var url       = option.formurl;      //  判断 关注页[详情页面]
                var orderid   = option.orderid;      //  订单id
                switch (orderType) {
                    case 1: // 支付商品押金  [判断详情页 || 关注列表页] isOK
                        if (url == 'details') {
                            top.location.href = '/lotdetails/' + goodsid + '?from=complete&goodsid=' + goodsid;
                        } else if (url = 'follow') {
                            top.location.href = '/follow?from=complete&goodsid=' + goodsid;
                        }
                        break;
                    case 2: // 余额充值 跳到充值成功页面 需要传递 paynum
                        top.location.href = '/rechargeok/' + paynum;
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

			},

			// 确认提现按钮点击事件
			confirmWithdraw: function() {
				// $('.sellpayment').css('backgroundColor','#999');
				// $('.sellpayment').attr('disabled',true);
				var _this = this;
				
				var type = this.payType;
				
				if ( type == 1 || this.sessionBank) {
					// if (type == 1) {
					// 	// 暂时不支持微信支付 
					// 	this.tipMsg = "暂不支持提现到微信";
     				//  this.showAlertBoll = true;
					// } else if( this.sessionBank ) {
					// 	// 输入密码
					// 	_this.showInput() 
					// }
					
					// 提现到微信&银行卡均需要验证密码
					_this.showInput()
				} else {
					this.showAlertTip('请选择银行卡');
					setTimeout(function(){
                        $('.sellpayment').css('backgroundColor','#15af25');
                        $('.sellpayment').attr('disabled',false);
                    },100)
				}
				
			},

			// 微信提现 & 银行卡提现共用接口
			withdrawSuccess: function() {
				var _this = this;
				// 提现类型
				var type = this.payType;
				// 银行卡id
				if (this.goodsInfo.bank) {
					var bankid = this.goodsInfo.bank.id;
				} else {
					var bankid = 0;
				}
				// 提现金额
				var money = this.paymentAmount || this.goodsInfo.money;
				
				ajax.confirmWithdraw(type,bankid,money,function(res){
					if (res.status == 200) {
						// cash 表示跳转提现页面 
						_this.$router.push('/withdrawok/cash?id='+res.data.id)
					} else {
						_this.showAlertTip(res.msg);
						setTimeout(function(){
	                        $('.sellpayment').css('backgroundColor','#15af25');
	                        $('.sellpayment').attr('disabled',false);
	                    },100)
					}
				})
			},

			// 开通 || 充值
			judgeGoTo: function(url) {
				this.$router.push(url);
			},

			// 根据当前路由跳转不同的成功页
			judgment: function() {
				var type = utils.getRequest().type;
				if (type == 'cash') {
					this.$router.push('/withdrawok/cash')
				} else if (type == 'recharge') {
					this.$router.push('/withdrawok/recharge')
				}
			}, 

			// 选择支付方式
			selectPayMethod: function() {

			}, 

            // 弹窗提示
            showAlertTip: function(tip) {
                this.tipMsg = tip;
                this.showAlertBoll = true;
            },

            // 密码输入框
            showInput: function() {
            	this.showPassword = !this.showPassword;
            },

            // 弹窗关闭
            closePopup: function() {
                this.showAlertBoll = false;

                this.initInputBox()
            }

		}
	}

</script>
<style>
.sellerbond{
	background-color: #f6f6f6;
	padding-top: 1rem;
}
.sellerbond .sell-header{
	background-color: #fff;
	padding-left: 1rem;
	padding-top: 1.5rem;
}

.sell-header.authentic {
	margin-bottom: 1rem;
	padding-top: 0;
	padding-left: 0;
}

.sell-header-box {
	background-color: #fff;
	padding-left: 1rem;
	margin-bottom: 1rem;
}
.sell-header .header-lot .lot-img {
	width: 8rem;
	height: 8rem;
}
.lot-img.authentic {
	margin-top: 1.2rem;
	padding-left: 1.4rem;
}
.lot-img-box {
	width: 100%;
	height: 100%;
}

.lot-img-box.personal {
	width: 7rem;
	height: 7rem;
	background-position: -7.9rem -5.4rem;
}

.lot-img-box.company {
	width: 7rem;
	height: 7rem;
	background-position: 0rem -5.4rem;
}

.lot-img-box img {
	width: 100%;
	height: 100%;
}
.sell-header .header-lot .lot-explain{
	font-size: 1.6rem;
	width: 28.5rem;
	height: 8rem;
	padding-left: 1.25rem;
	color: #333;
}
.lot-name {
	width: 100%;
	height: auto;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.sell-header .header-lot .lot-explain .lot-price{
	color: #999;
	bottom: 0;
	right: 1.5rem;
}
.lot-price.font-color {
	font-family: PingFangSC;
	font-size: 1.8rem;
	font-weight: 600;
	color: #ad1a1a!important;
}
.lot-price1{
    color: #999;
    bottom: 0;
    left: 1.25rem;
}
.sell-header .sell-detailed {
	font-size: 1.3rem;
	color: #999;
	height: 3.75rem;
	line-height: 3.7rem;
	border-top: 1px solid #ccc;
	margin: 1.5rem 0;
	display: -webkit-flex;
	display: flex;
}
.sell-detailed span {
	text-align: center;
	-webkit-flex: 1;
	flex: 1;
}
.sellerbond .sell-content{
	background-color: #fff;
	padding-left: 1rem;
}
.sell-content .sell-con-title{
	font-size: 1.6rem;
	color: #333;
	height: 4.5rem;
	line-height: 4.5rem;
}
.sell-content .sell-con-title .con-explain{
	font-size: 1.3rem;
	color: #999;
}
.sell-content .con-list{
	border-top:1px solid #ccc;
}
.sell-content .con-list .sellbg{
	width: 2.4rem;
	height: 2.4rem;
	margin:2.8rem 0;
}
.sell-content .con-list .sellicon-1,
.sell-content .con-list .sellicon-2,
.sell-content .con-list .sellicon-3 {
	width: 5.1rem;
	height: 5.1rem;
	margin:1.4rem 0.5rem 1.4rem 1.3rem;
}
.sell-content .con-list .list-explain{
	padding-top: 1.4rem;
}
.sell-content .con-list .list-title{
	padding: 0.3rem 0 0.5rem 0;
	font-size: 1.4rem;
	color: #333;
}
.sell-content .con-list .list-title span{
	font-size: 1.2rem;
	color: #999;
}
.sell-content .con-list .list-title .set-up{
	color: #cdcdcd;
}
.sell-content .con-list .list-amount{
	font-size: 1.3rem;
	color: #999;
}
.sell-content .con-list .list-right{
	padding-right: 1rem;
	font-size: 1.4rem;
	line-height: 8rem;
}
.sell-content .con-list .list-right span{
	float: right;
    width: 0.95rem;
    height: 1.5rem;
    margin: 3.35rem 0 0 0.7rem;
}
.sellerbond .sellpayment{
	display: block;
    width: 30rem;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    font-size: 1.5rem;
    color: #fff;
    border-radius: 0.4rem;
    background-color: #15af25;
    margin: 3.5rem auto;
}
/* 余额 */
.sell-header-title{
	position: relative;
	line-height: 3.5rem;
	font-size: 1.6rem;
	font-family: PingFangSC;
	color:333;
}
.sell-header-title:after{
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
.sell-header-title.authentic {	
	height: 3.5rem;
	padding-left: 1.5rem;
	line-height: 3.5rem;
	font-size: 1.6rem;
	color: #333;
}
.sell-header-cont{
	padding: 1.5rem;
}
.sell-header-icon{
	display: block;
}
.sell-header-price{
	font-size: 1.7rem;
	color: #ad1a1a;
}
.sell-header-price{
	position: absolute;
	bottom: 1.5rem;
	right:1.5rem;
	line-height: 1;
}
.link-a {
	display: block;
}

/* 添加地址信息 */
.buyer-header {
	width: 100%;
	height: 6.4rem;
	margin: 1rem 0;
	padding: .7rem 1.4rem;
	background: url(../../assets/img/arrow.png) no-repeat 35.4rem center;
	background-color: #fff;
}
.buyer-header-msg {
	padding-left: 2.2rem;
	background: url(../../assets/img/addIocn.png) no-repeat 0rem center;
	background-size: 1.3rem auto;
	color: #333;
}
.buyer-header-name {
	margin-right: 5rem;
	font-size: 1.6rem;
}
.buyer-header-phone {
	font-size: 1.4rem;
}
.buyer-header-address {
	width: 30rem;
}
.buyer-address-info {
	display: block;
	width: 100%;
	padding-left: 2.2rem;
	line-height: 2.6rem;
	font-size: 1.4rem;
	color: #999;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap
}
.blue a {
	color: #6699ff;
}
.blue .blue-right {
	/*width: .6rem;
	height: 100%;*/
	background-position: -15.65rem -21.9rem;
}
.space{
	width:100%;
	height: 6rem;
	background-color: #fff;
}
</style>
