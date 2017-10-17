<template>
<div class="shops-news bottom-distance">
	<header class="shops-header-1 clearfix">
		<div class="fl header-l clearfix">
			<img :src="dataInfo.shop_info.user_thumb" class="fl">
			<div class="fl">
				<div class="shops-header-title fl">
					<p class="shops-name dibvam">{{ dataInfo.shop_info.user_name }}</p>
					<!-- <span class="spritesmap crown_icon dibvam" v-if="dataInfo.list.is_super_buyer"></span> -->
					<span class="spritesmap user-level" :class="'s'+dataInfo.list.experience_type"></span>	
				</div>
				<div class="shops-header-title">
					<p class="fans">
						<span class="shops-score">评分 {{ parseFloat(dataInfo.list.average_mark).toFixed(2) }} |</span>
						<span>粉丝: {{ dataInfo.fans_num }}</span>
					</p>	
				</div>
			</div>
		</div>
		<div class="fr header-r clearfix">
			<div class="fl qr-code" @click="showBigQr">
				<img src="../../assets/img/shops_qrcode.png" alt="" data-statistics="click_qrcode">
			</div>
			<div class="follow fl" v-if="!isMine">
				<div v-if="dataInfo.is_followed == '0' " class="follow-in" data-statistics="click_follow"><span>+</span>关注</div>
				<div v-if="dataInfo.is_followed == '1' " class="follow-in already-follow" data-statistics="click_unfollow"><span></span>已关注</div>
			</div>
			<div class="shop-setup fl" v-if="isMine">
				<router-link class="store_set shotsprites" to="/compete"></router-link>
			</div>
		</div>
	</header>
	
	<div class="shop-evaluate">
		<div class="shop-grade">
			<div class="shop-grade-item">
				店铺等级
				<span class="shop-grade-icon spritesmap user-level" :class="'s'+dataInfo.list.experience_type"></span>
				<span class="spritesmap unknown-icon" @click="displayRule()"></span>
			</div>
			<div class="shop-grade-item">
				经验 
				<span>{{ dataInfo.list.experience }}</span>
			</div>
		</div>
		<div class="shop-score">
			<div class="shop-score-item auction-score">
				拍品评分
				<span>{{ parseFloat(dataInfo.list.average_mark).toFixed(2) }}</span>
			</div>
			<div class="shop-score-item auction-score">
				争议比例
				<span>{{ dataInfo.list.dispute_ratio }}%</span>
			</div>
			<div class="shop-score-item auction-score">
				违约比例 
				<span>{{ dataInfo.list.breach_ratio }}%</span>
			</div>
		</div>
	</div>
	<div class="news-introduce">
		<div data-onOff="0" class="news-introduce-p">
			<p v-if="(!dataInfo.list.student_address)">
				<span>店铺认证</span>
				<span :class="{'apply-not':dataInfo.list.is_apply==0, 'personal':dataInfo.list.is_apply==1, 'compony':dataInfo.list.is_apply==2}"></span>
			</p>
		</div>
	</div>
	<div class="news-introduce">
		<div data-onOff="0" class="news-introduce-p">
			<p v-if="dataInfo.list.student_address" class="clearfix">
				<span style="display:inline-block; float:left;">学生认证</span>
				<!-- <span :class="{'apply-not':dataInfo.list.is_apply==0, 'personal':dataInfo.list.is_apply==1, 'compony':dataInfo.list.is_apply==2}"></span> -->
				<span style="display:inline-block; float:left;" class="student-desc">{{ dataInfo.list.student_address }} </span>
			</p>
		</div>
	</div>
	<div class="news-introduce">
		<div data-onOff="0" class="news-introduce-p news-introduce-p-desc">
			<span class="news-introduce-title">店铺介绍</span>
			<span class="news-introduce-desc" :class="{'news-introduce-desc-open':showShopDesc,' text-limit':!showShopDesc }" @touchend="shopDescEvent($event)">{{ shopDescIn }}</span>
		</div>
		<!-- 接口对接 -->
		<div data-onOff="0" class="news-introduce-p">
			<p><span>所在地区</span>{{ dataInfo.list.address }}</p>
		</div>
		<div data-onOff="0" class="news-introduce-p" v-if="isMine">
			<p><span>手机</span>{{ dataInfo.list.mobile }}</p>
		</div>
		
	</div>
	<div class="news-content">
		<div class="news-con-title clearfix" data-id="" >
			<p class="fl">店铺拍品</p>
			<router-link :to="'/shops/' + dataInfo.shop_info.userid +'?type=2'" class="fr" data-statistics="click_moreAuction">更多拍品<span class="fr shotsprites to-right"></span></router-link>
		</div>
		<ul class="news-list clearfix">
			<li class="fl divbg" v-for="(item,index) in imgArrLimit">
				<router-link :to="'/lotdetails/' + item.id">
					<!-- 图片 -->
					<img v-if="item.thumb.type == 'img' " :src="baseUrl + item.thumb.url + '?x-oss-process=style/erweima_mark'" alt="">
					<!-- 视频 -->
					<div v-if="item.thumb.type == 'video' " class="video-box">
						<video :src="baseUrlVideo + item.thumb.url" :poster="require('../../assets/img/video_ns_2.jpg')"  style="object-fit: fill;"></video>
						<span class="video-bg" data-type="video"></span>
					</div>
				</router-link>	
			</li>
		</ul>
	</div>
	
	<!-- 生成Qrcode弹窗 -->
	<qrcode  v-show="showQr" :dataInfo="dataInfo.shop_info" @closeBox="closeBigQr" :qrcode="qrcode"></qrcode>

	<!-- 等级规则弹窗 -->
	<modal-box v-show="showModalBox" :title="modalBoxTitle" :content="modalBoxContent" @closeBox="closeModalBox"></modal-box>	
	
	<!-- 微信分享 -->
	<wx-share :message="wxShareObj"></wx-share>
</div>
</template>
<script>
	import modalBox from "@/components/component/modalBox"
	import qrcode from "@/components/component/storeQrcode";
	import sharePage from "@/components/component/shareSub";
	
	var footer = require("@/components/classify/classify-footer");
	var ajax = require('ajax');
	var config = window.config;
	

    export default {
		data:function(){
			return {
				shopDescIn: "",
				dataInfo: [],
				imgArrLimit: [],
				imgArr: [],
				isMine: true,       // 是否本人
				baseUrl: window.config.img_url,      // 图片服务器
				baseUrlVideo: 'http://xfpvideoupload.oss-cn-beijing.aliyuncs.com/', // 视频服务器
				qrcode: "",
				showQr: false,
				showModalBox: false,     // 等级规则说明
				modalBoxTitle: "",       // 规则说明标题
				modalBoxContent: "",     // 规则说明内容
				showShopDesc: false,
				wxShareObj: {},          // 微信分享
			}
		},
		
		created: function() {
			this.getShopInfo()

			this.getShopQrcode();

			// 转义特殊字符
			this.shopDescIn = this.strEscape(this.dataInfo.shop_info.desc)

			if(/&(lt|gt|nbsp|amp|rdquo);/ig.test(this.shopDescIn) ) {
				this.shopDescIn = this.strEscape(this.shopDescIn)

			}

			// 处理展示数据长度
			if (this.imgArr.length > 8) {
				this.imgArrLimit = this.imgArr.slice(0,8);
			} else {
				this.imgArrLimit = this.imgArr;
			}

			//判断当前 是否是本人
			var userid = this.dataInfo.shop_info.userid;
			var nowuid = this.dataInfo.current_userid;
			if (userid == nowuid) {
				this.isMine = true;
			} else {
				this.isMine = false;
			}

			// 规则说明
			this.modalBoxTitle = "经验值规则";
			this.modalBoxContent = `
					<div class="content-scroll">
						<p>1.每笔订单每满100元转化成1经验值，不足100元不累计经验值，每笔订单经验值上限为1000经验值。经验值于交易完成用户评价后自动转化。（当面交易不累计经验值）</p>
						<p>2.系统判定为卖家违约的每笔扣除10经验值</p>
						<p>3.用户购买后评价打分低于3分的订单不予累计经验值并扣除2经验值</p>
						<p>4.同一月内有效完成订单5单以上用户并评价均在4分以上，奖励2经验值，可累计经验值，当月此奖励经验值上线为100经验值</p>
						<div class="radius">
							<table border="1" class="shops-info">
								<tbody>
									<tr>
										<th colspan="3" class="empirical-title">店铺等级</th>
									</tr>
									<tr>
										<td><span class="spritesmap user-level s1"></span></td>
										<td>0-100</td>
										<td>只可开通基本商家功能</td>
									</tr>
									<tr>
										<td><span class="spritesmap user-level s2"></span></td>
										<td>101-1000</td>
										<td>增加参与平台活动报名渠道</td>
									</tr>
									<tr>
										<td><span class="spritesmap user-level s3"></span></td>
										<td>1001-10000</td>
										<td>可在在优质店铺推荐中展示</td>
									</tr>
									<tr>
										<td><span class="spritesmap user-level s4"></span></td>
										<td>10001-50000</td>
										<td>增加每月一篇订阅号文章推荐-优质店铺集合</td>
									</tr>
									<tr>
										<td><span class="spritesmap user-level s5"></span></td>
										<td>50001以上</td>
										<td>增加每月banner分时段推广功能，点击banner跳转到商户页面</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>	
			`;

			// 微信分享 
			var classifyName = this.dataInfo.type_one;
			if (classifyName == '书画篆刻' || classifyName == '书画专场') {
				this.wxShareObj.title = this.dataInfo.shop_info.user_name + '-艺术工作室';
				this.wxShareObj.desc = '我的线上艺术工作室，欢迎关注点赞。点我，立刻欣赏收藏作品！';
			} else {
				this.wxShareObj.title = '【' + this.dataInfo.shop_info.user_name + '】的店铺首页';
				this.wxShareObj.desc = '强烈推荐这家良心店铺，有宝贝能捡漏，来搜一下！';
			}
			this.wxShareObj.images = this.dataInfo.shop_info.user_thumb; 
			this.wxShareObj.url = location.href;
			
		},
		mounted:function(){
			var shopName = this.dataInfo.shop_info.user_name;
			document.title= shopName + "的店铺首页";
			var _this = this;
      //只能关注一次
      $(".follow .follow-in").click(function(){
      	var that = this;
      	var state = 0;
      	var objname = $(this).hasClass("already-follow");
          //objname  是true 说明是已关注   是false  说明没有关注
          objname?state=0:state=1; 
      	var userid = _this.dataInfo.shop_info.userid;
  			ajax.followState(state,userid,function(data){
      		if (data.status == 200) {
      			if (state == 1) {
      				$(that).addClass("already-follow").text("已关注");
      			} else {
      				$(that).removeClass("already-follow").text("关注");
      			}
      		} else {
      			alert(data.msg);
      		}
      	})
      });
            
		},
		components:{
			"my-footer": footer,
			"qrcode": qrcode,
			"modal-box": modalBox,
			"wx-share": sharePage,
		},
		methods: {
			// 店铺描述
			shopDescEvent(ev) {
				this.showShopDesc = !this.showShopDesc;
				// var $node = $(ev.target);
				// var $parent = $node.parents('.news-introduce-p-desc');
				// var onOff = $parent.attr('data-onOff');
    //   	if (onOff == '0') {
    //   		$node.removeClass('text-limit').addClass('news-introduce-desc-open');
    //   		$node.parents('.news-introduce-p-desc').attr('data-onOff','1');
    //   	} else {
    //   		$node.addClass('text-limit').removeClass('news-introduce-desc-open');
    //   		$parent.attr('data-onOff','0');
    //   	}
			},

			strEscape (str) {
				var arrEntities = {
					'lt':'<',
					'gt':'>',
					'nbsp':' ',
					'amp':'&',
					'rdquo':'"',
					'ldquo': '"',
				};

 				return str.replace(/&(lt|gt|nbsp|amp|rdquo|ldquo);/ig,function(all,t){
 					return arrEntities[t];
 				});
			},

			closeModalBox () {
				this.showModalBox = false;
				$('body').css("overflow","auto");
			},

			displayRule () {
				this.showModalBox = true;
				$('body').css("overflow","hidden");
			},

			// 二维码弹窗
			showBigQr: function() {
				var _this = this;
				this.showQr = true;
			},

			// 关闭弹窗
			closeBigQr: function() {
				$('#bigQr').show();
				this.showQr = false;
			},

			// 店铺二维码
			getShopQrcode: function() {
				var _this = this;
				var shopId = this.$route.params.id;
				ajax.getQrcode(shopId,function(data) {
					if (data.status == 200) {
						_this.qrcode = data.data.qrcode
					};
				})
			},

			// 获取该页数据
			getShopInfo: function() {
				var shopId = this.$route.params.id;
				var _this = this;
				ajax.getShopInfo(shopId,function(data) {
					if (data.status == 200) {
						_this.dataInfo = data.data;

						if (_this.dataInfo.imgs) {
							// 处理图片数据格式
							for (var i = 0; i < _this.dataInfo.imgs.length; i++) {
								if ( _this.dataInfo.imgs[i].thumb ) {
									_this.imgArr.push({
										id: _this.dataInfo.imgs[i].id,
										thumb: JSON.parse( _this.dataInfo.imgs[i].thumb )
									})
								};
							};
						};
						

					} else {
						alert(data.msg);
					}
				})
			}
		}
	}

</script>
<style scoped>
.student-desc {
	width: 23rem;
	margin-top: 1.4rem;
	margin-bottom: 1rem;
	line-height: 1.8rem;
}

.user-level {
	display: inline-block;
	vertical-align: middle;
}

.unknown-icon {
	vertical-align: middle;
	margin-left: 1rem;
}

.shop-evaluate {
	width: 100%;
	padding-left: 1.5rem;
	background: #fff;
}
.shop-evaluate .shop-grade {
	display: flex;
	height: 4.4rem;
	padding: 1.35rem 0;
	line-height: 1.7rem;
	border-bottom: 1px solid #ccc;
	font-size: 1.3rem;
	color: #333;
}
.shop-grade-icon {
	display: inline-block;
	vertical-align: middle;
}
.shop-grade-item:first-child {
	text-indent: 1.85rem;
	border-right: 1px solid #ccc;
}
.shop-grade-item:nth-child(2) {
	text-align: center;
}
.shop-grade-item {
	flex: 1;
}
.shop-grade-item span {
	color: #999;
}
.shop-evaluate .shop-score {
	display: flex;
	height: 6rem;
	padding: 1rem 0;
	font-size: 1.3rem;
}
.shop-score-item {
	flex: 1;
	text-align: center;
}
.shop-score-item span {
	display: block;
	color: #999;
}
.shops-header-1 {
	padding: 1.6rem 0;
	/*border-bottom: 1px solid #c5c5c5;*/
	background-color: #fff;
}
.shops-header-title {
	width: 18rem;
	height: 2.8rem;
	line-height: 2rem;
}

.shops-level {
	height: 1.6rem;
	line-height: 1.5rem;
	font-size: 1.2rem;
	margin-top: .4rem;
	display: inline-block;
	vertical-align: middle;
	margin-left: .5rem;
	padding: 0 .4rem;
	border-radius: .3rem;
	font-size: 1.1rem;
	color: #fff;
}
.shops-level.s1 {
	background-color: #f5b700;
}

.shops-header-1 .header-l{
	width: 25rem;
	height: 4.5rem;
	padding-left: 1.5rem;
}
.shops-header-1 .header-l img{
	width: 4.5rem;
	height: 4.5rem;
	border-radius: 50%;
	margin-right: 1rem;
}
.shops-header-1 .header-l .shops-name{
	font-size: 1.4rem;
	color: #333;
	max-width: 12rem;
	white-space:nowrap; 
	overflow:hidden; 
	text-overflow:ellipsis;
}
.shops-header-1 .header-l .fans{
	font-size: 1.3rem;
	color: #999;
}
.shops-header-1 .header-r .qr-code{
	margin-top: 1.2rem;
	height: 2rem;
	width: 2rem;
}
.qr-code img {
	width: 100%;
	height: 100%;
}
.shops-header-1 .header-r .follow{
	height: 4.5rem;
	width: 7rem;
	padding:1rem 1rem 0 1rem;
}
.shop-setup {
	height: 4.5rem;
	width: 4rem;
	padding:1rem 1rem 0 1rem;
}
.shops-header-1 .header-r .follow .follow-in{
	width: 5rem;
	height: 2.5rem;
	line-height: 2.2rem;
	text-align: center;
	border:1px solid #fa693c;
	font-size: 1.3rem;
	color: #fa693c;
	border-radius: 0.5rem;
}
.shops-header-1 .header-r .follow .already-follow{
	color: #ccc;
	border-color: #ccc;
}
.shops-header-1 .header-r .follow span{
	font-size: 1.7rem;
}
.shops-header-1 .header-r .curfollow .follow-in{
	border-color: #fa693c;
	color: #fa693c;
}
.news-introduce{
	margin:1rem 0;
	padding:0 0 0 1.5rem;
	background-color: #fff;
}
.news-introduce-p {
	/*height: 4.5rem;*/
	height: auto;
	line-height: 4.5rem;
	font-size: 1.4rem;
	color: #999;
	/*white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;*/
}
.news-introduce-p:nth-child(2){
	border-bottom: 1px solid #e5e5e5;
}
.news-introduce-p span{
	color: #333;
	margin-right: 3rem;
}
.news-introduce-p .apply-not:after {
	content: "未通过实名认证";
}
.news-introduce-p .personal:after {
	content: "已个人认证";
}
.news-introduce-p .compony:after {
	content: "已企业认证";
}

.news-introduce-title {
	display: inline-block;
	vertical-align: middle;
}
.news-introduce-desc {
	display: inline-block;
	vertical-align: middle;
    width: 23rem;
}
.text-limit {
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.news-introduce-desc-open {
	line-height: 2rem;
}
.news-content{
	padding-left: 1rem;
	margin-bottom: 8rem;
	background-color: #fff;
}
.news-content .news-con-title{
	border-bottom: 1px solid #e5e5e5;
	height: 4.5rem;
	line-height: 4.5rem;
	color: #333;
	font-size: 1.4rem
}
.news-content .news-con-title a{
	font-size: 1.3rem;
	color: #999;
	padding-right: 1rem;
}
.news-content .news-con-title a .to-right{
	width: 0.95rem;
    height: 1.5rem;
    margin-top: 1.55rem;
    margin-left: 0.5rem;
}
.news-content .news-list{
	padding: 1.5rem 0 0.5rem 0;
}
.news-content .news-list li{
	position: relative;
	width: 8.1rem;
	height: 8.1rem;
	margin:0 1rem 1rem 0;
}
.news-list li img {
	width: 100%;
	height: 100%;
}

.video-box,
.video-box video {
	width: 100%;
	height: 100%;
}
.video-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: url(../../assets/img/videobg.png) no-repeat;
	background-size: 100% 100%;
}
.store_set{
    position: absolute;
    top: 2.75rem;
    right: 1rem;
    width: 2.2rem;
    height: 2.2rem;
    display: block;
    background-position: -22.1rem -8rem; 
    /*width:2.2rem;
    height:2.2rem;
    background: url(../../../img/icon/set.png) 0 0/100% no-repeat;*/
}
</style>
