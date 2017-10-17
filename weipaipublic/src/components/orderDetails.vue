<template>
<div class="order-details">
	<!-- 退货申请 -->
	<div class="page-items">
		<div class="page-item">
			<h3 class="page-item-title">退货申请</h3>
			<div class="page-item-time">
				申请时间：<span>2017年02月24日 11:05</span>
			</div>
		</div>
	</div>

	<!-- 进度流程 -->
	<div class="page-items">
		<div class="page-item">
			<h3 class="page-item-title">已发货</h3>
			<div class="page-item-time">
				发货时间：<span>2017年02月24日 11:05</span>
			</div>
		</div>
		<div class="page-item">
			<h3 class="page-item-title">已付款</h3>
			<div class="page-item-time">
				付款时间：<span>2017年02月24日 11:05</span>
			</div>
		</div>
		<div class="page-item">
			<h3 class="page-item-title">竞拍成功</h3>
			<div class="page-item-time">
				成功时间：<span>2017年02月24日 11:05</span>
			</div>
		</div>
		<div class="page-item">
			<h3 class="page-item-title">开始竞拍</h3>
			<div class="page-item-time">
				开始时间：<span>2017年02月24日 11:05</span>
			</div>
		</div>
	</div>

	<!-- 店铺信息 -->
	<div class="page-items shop">
		<div class="shop-top clearfix">
			<div class="shop-icon"></div>
			<div class="shop-name">妥妥的</div>
			<div class="arrow-right"></div>
			<div class="fr">
				<div class="phone-icon"></div>
				<div class="goods-status">申请退货</div>
			</div>
		</div>
		<div class="goods-box clearfix">
			<div class="goods-img fl">
				<img src="/" alt="goods-img"/>
			</div>
			<div class="goods-desc fl">
				<div class="goods-name">商品名称</div>
				<div class="goods-price">
					成交金额: ￥1000.00
				</div>
			</div>
		</div>
		<div class="shop-bottom">
			<button class="fr">确认收货</button>
		</div>
	</div>

	<!-- 订单信息 -->
	<div class="page-items">
		<div class="order-item-title">订单信息</div>
		<div class="order-item-box">
			<div class="order-item-text">
				商家电话: <span>15212521256</span>
			</div>
			<div class="order-item-text">
				拍品编号: <span>15555669sdsad56asdas..</span>
			</div>
			<div class="order-item-text">
				贷款交易号：<span>122954188122912291229</span>
			</div>
		</div>
	</div>

	<!-- 发货信息 -->
	<div class="page-items">
		<div class="order-item-title">发货信息</div>
		<div class="deliver-info clearfix">
			<div class="get-man-name">
				收件人：<span>刘璐</span>
				<div class="get-man-phone fr">15210256911</div>
			</div>
			<div class="get-man-addr">北京市丽江区</div>
		</div>
		<div class="getgoods-mode clearfix">
			发货方式
			<span class="fr">中通快递(单号: 122912291229)</span>
		</div>
	</div>

	<!-- 争议信息 -->
	<div class="page-items">
		<div class="order-item-title">争议信息</div>
		<div class="dispute clearfix">
			<span>买家-7天无理由退货</span>
			<span class="fr">02月24日 18:53</span>
		</div>
	</div>
</div>
</template>
<script>

	

	

    module.exports = {
		data: function() {
			return {

			}
		},
		
		methods: {

		}
	}

</script>
<style>
/* 订单详情 */
.order-details {
	padding-bottom: 1.5rem;
}

.page-items {
	width: 100%;
	height: auto;
	margin-bottom: 1rem;
	background: #fff;
	/*border-bottom: 1px solid #ddd;*/
}

.page-item {
	width: 100%;
	height: 6.7rem;
	padding: 0 1.5rem;
	padding-top: .6rem;
	border-bottom: 1px solid #ddd;
}
.page-item:last-of-type {
	border-bottom: none;
}

.page-item-title,
.page-item-time {
	font-size: 1.35rem;
	line-height: 2.6rem;
}
.page-item-title {
	font-size: 1.5rem;
	color: #333;
}

.page-item-time {
	color: #999;
}

.shop-top {
	width: 100%;
	height: 3.9rem;
	padding: 0 1.5rem 0 .8rem;
	background-color: #fff;
}
.shop-icon,
.shop-name,
.arrow-right,
.phone-icon,
.goods-status {
	line-height: 3.9rem;
	float: left;
} 

.shop-icon {
	width: 3rem;
	height: 3.9rem;
	background: url(../assets/img/stopicon.png) no-repeat;
	background-size: cover;
}
.arrow-right {
	width: 2rem;
	height: 3.9rem;
	background: url(../assets/img/arrow.png) no-repeat 0 1.4rem;
	background-size: .8rem auto;
}
.phone-icon {
	width: 3.5rem;
	height: 3.9rem;
	background: url(../assets/img/phoneicon.png) no-repeat;
	background-size: cover;
}
.shop-name {
	padding: 0 .5rem;
	font-size: 1.6rem;
}
.goods-status {
	font-size: 1.4rem;
	color: #ad1a1a;
}

.goods-box {
	width: 100%;
	height: 9rem;
	padding: 1rem 1.5rem;
	background-color: #f8f8f8;
}

.goods-img {
	width: 6.9rem;
	height: 6.9rem;
	margin-right: 1rem;
	border: 1px solid #ddd;
}
.goods-desc {
	height: 6.9rem;
}
.goods-name {
	margin-bottom: 2.2rem;
	font-size: 1.6rem;
	color: #333;
}
.goods-price {
	font-size: 1.4rem;
	color: #999;
}

.shop-bottom {
	position: relative;
	width: 100%;
	height: 5.2rem;
	background: #fff;
}
.shop-bottom button {
	position: absolute;
	right: 1.4rem;
	top: 1.2rem;
	height: 2.7rem;
	padding: 0 .5rem;
	background-color: #fff;
	border-radius: .5rem;
	border: 1px solid #ad1a1a;
	text-align: center;
	font-size: 1.4rem;
	color: #ad1a1a;
}

.order-item-title {
	width: 100%;
	height: 4.4rem;
	line-height: 4.4rem;
	text-indent: 1.5rem;
	font-size: 1.6rem;
	border-bottom: 1px solid #ddd;
	background-color: #fff;
	color: #333;
}
.order-item-box {
	padding: .6rem 1.5rem;
}
.order-item-text {
	line-height: 2.4rem;
	font-size: 1.4rem;
	color: #666;
}

/* 发货信息 */
.deliver-info {
	padding: .5rem 1.5rem;
	font-size: 1.6rem;
	color: #666;
	background-color: #fff;
}
.get-man-phone {
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
	padding-left: 1.9rem;
	line-height: 2.4rem;
}
.get-man-name {
	background: url(../assets/img/addIocn.png) no-repeat 0 0.3rem;
	background-size: 1.4rem auto;
}
.dispute {
	height: 3.9rem;
	padding: 0 1.5rem;
	line-height: 3.9rem;
	font-size: 1.4rem;
	color: #666;
}
</style>
