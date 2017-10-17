<template>
<div class="swiper-container-auction">
    <div class="swiper-wrapper clearfix">
        <div class="swiper-slide">
    		<!-- 遍历元素 -->
            <div class="content-slide content-slide-border"  v-for="(item,index) in dataList">
            	<!-- 跳转拍品详情 router-link to="/lotdetails/1"-->
           		<div class="content-slide-box content-slide-auction cc clearfix">
					<router-link :to="/lotdetails/ + item.id">
		              	<dl class="content-dl cc">
			              	<dt>
			              		<img v-if="item.thumb.type == 'img' " :src="baseUrl + item.thumb.url  + '?x-oss-process=image/resize,w_800'" alt="">

			              		<div class="video-box" v-if="item.thumb.type == 'video' " >
									<span class="video-play"></span>
									<video class="my-video" :src="baseUrl + item.thumb.url"></video>
								</div>
			              	</dt>
			              	<dd>
			              		<strong>{{ item.desc }}</strong>
			              		<!-- 竞拍中 1  2 8 -->
			              		<span v-if="item.auction_type == 1 && (item.status == 1 || item.status == 2)">当前价格：￥{{ item.current_price }}</span>
			              		<span v-if="item.auction_type == 1 && (item.status == 1 || item.status == 2)">出价次数：{{ item.bid_num }}次</span>
			              		<!-- 预展中 -->
			              		<span v-if="item.auction_type == 1 && item.status == 8">状态：预展中</span>
			              		<span v-if="item.auction_type == 1 && item.status == 8">开拍时间：{{ item.begin_time }}</span>
			              		<!-- 已节拍 -->
			              		<span v-if="item.auction_type == 3">当前价格：￥{{ item.current_price }}</span>
			              		<span v-if="item.auction_type == 3">成交日期：{{ item.last_time }}</span>
			              		<!-- 已流拍 -->
			              		<span v-if="item.auction_type == 4"></span>
			              		<span v-if="item.auction_type == 4">流拍时间：{{ item.last_time }}</span>
			              		<!-- 已失败 -->
			              		<span v-if="item.auction_type == 5">失败原因：双方未达成协议</span>
			              		<span v-if="item.auction_type == 5">失败时间：{{ item.last_time }}</span>
			              		<!-- 草稿箱 -->
			              		<span v-if="item.auction_type == 6 || item.auction_type == 0"></span>
			              		<span v-if="item.auction_type == 6 || item.auction_type == 0">创建时间：{{ item.inputtime }}</span>
			              	</dd>
		              	</dl>
	              	</router-link>
              	</div>
              	<!-- 按钮 -->
              	<div class="btn-box clearfix">
	              	<!-- 只有竞拍中有下架按钮 item.auction_type == 2 不可下架" -->
			       	<div v-if="item.status == 1" class="content-Btn" :data-id="item.id" :data-status="item.status"  @click="openConfirm($event)">下架</div>

					<!-- 草稿箱 已流拍 已失败 -->
			        <strong v-if="item.auction_type == 6 || item.auction_type == 5 || item.auction_type == 4" class="content-Btn content-Btn-sj" :data-id="item.id" :data-status="item.status" @click="shelves">上架</strong>
		            <strong v-if="item.auction_type == 6 || item.auction_type == 5 || item.auction_type == 4" class="content-Btn content-Btn-abolish" :data-id="item.id" :data-index="index" @click="confirmDel">删除</strong>
              	</div>
              	
          	</div>

        </div>
   	</div>
	
	<!-- 微信分享 -->
	<wx-share :message="wxShareObj"></wx-share>

	<!-- loading -->
	<div class="loading">
		<img src="../assets/img/loading.gif" alt="" v-if="loading">
		<span v-if="!loading">没有更多了</span>
	</div>

   	<!-- 弹窗组件 -->
   	<!-- @childEvent="offShelf"
		@delEvent="doCancel" -->
	<show-confirm 
		v-show="showConf" 
		:msg="tipMsg"  
		@closeBox="closeBox" 
		@childEvent="distribute"
	></show-confirm>

	<!-- 全局弹窗组件 -->
	<show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>
</div>
</template>
<script>

	var showConfirm = require("@/components/component/showConfirm")
	var showAlert = require("@/components/component/showAlert")
	var sharePage = require("@/components/component/shareSub")
	var ajax = require('ajax');
	var utils = require('utils');
	var config = window.config;
	

    export default {
		data: function() {
			return {
				loading: true,
				dataList: [],
				totalPage: 1,
				page: 1,
				baseUrl : window.config.img_url,
				goodsId : '',             // 当前选中拍品id
				index: '',                // 当前选中拍品index
				// 全局弹窗组件
				showAlertBoll: false,
				tipMsg: '',
				showConf: false,
				tipMsg: '您确认要下架该商品吗?',
				wxShareObj: {},
			}
		},
		
		created: function(){
			this.getActionInfo()
			// 微信分享
            this.wxShareObj.title = "小福拍--移动竞拍领航者";
            this.wxShareObj.images = '../assets/img/share_logo.jpg';
            if (this.dataList.length !== 0) {
            	this.wxShareObj.url  = 'http://' + location.host + '/shops/' + this.dataList[0].user_id + '?type=2';
            };
            // this.wxShareObj.url = location.href;
            this.wxShareObj.desc = "手边的珍宝库，全品类艺术品，随时随地竞拍！";
		},
		mounted: function() {
			var _this = this;
			
			// 调用下拉加载
			utils.dropLoading(function(){
				_this.getActionInfo();
			})
			
		},
		watch :{//路由发生变化调用该函数
			'$route' : ["setZero","getActionInfo"]
		},
		components: {
			"show-confirm": showConfirm,
			"show-alert": showAlert,
			"wx-share": sharePage
		},
		methods: {
			// 置空数据
			setZero: function() {
				this.dataList = [];
				this.totalPage = 1;
				this.page = 1;
			},

			// 获取数据
			getActionInfo: function() {
				var _this = this;
				// var page = this.page;
				var type = this.$route.params.id;

				if (this.totalPage >= this.page || !this.totalPage) {
					this.loading = true;
					ajax.getAuctionManage(_this.page,type,function(data){
						if(data.status == 200){
							_this.page++
							_this.totalPage = data.data.page_num;
							for (var i = 0; i < data.data.goods_info.length; i++) {
								if (data.data.goods_info[i].thumb) {
									data.data.goods_info[i].thumb = JSON.parse( data.data.goods_info[i].thumb )
								};
								_this.dataList.push( data.data.goods_info[i] ) 
							};
							setTimeout(function(){
								_this.loading = false;
							},1)
							
						}else{
							_this.tipMsg = data.msg;
							_this.showAlertBoll = true;
						}
					})
				}
				
			},

			// 分配是下架还是删除
			distribute: function() {
				if (this.goodsId) {
					this.doCancel()
				} else {
					this.offShelf()
				}
			},

			// 提示框
			openConfirm: function(ev) {
				if (ev.target.dataset.id || ev.target.dataset.status) {
					window.goodsIdByLpt = ev.target.dataset.id;
					window.statusByLpt = ev.target.dataset.status;
				};
				
				// 层级问题处理
				if ($('.swiper-container-auction').css('zIndex') == 1 ) {
					$('.swiper-container-auction').css('zIndex','12');
					this.showConf = true;
				};
			},
			closeBox: function() {
				// 若未弹alert 不复
				if (!this.showAlertBoll) {
					$('.swiper-container-auction').css('zIndex','1');
				};
				this.showConf = false;
			},

			// 下架功能
			offShelf: function() {
				var goodId,
					status,
					_this = this;
				goodId = window.goodsIdByLpt;
				status = window.statusByLpt;
				ajax.offShelf(goodId,status,function(data) {
					console.log(_this.goodsId)
                  	if (data.status == 200) {
                      	// 跳转到草稿箱
                      	_this.$router.push( '/auction/govern/6' )
                  	} else {
                  		_this.showAlertTip(data.msg);
                  	}

              	})
			},

			// 上架按钮
			shelves: function(ev) {
				// 跳转到发布流程页面 并重新选择时间
				var goodsId = $(ev.target).attr('data-id');
				this.$router.push('/picture?goodsid=' + goodsId);
			},

			// 删除按钮
			confirmDel: function(ev){
				this.goodsId = $(ev.target).attr('data-id');
				this.index = $(ev.target).attr('data-index');
				if ($('.swiper-container-auction').css('zIndex') == 1 ) {
					$('.swiper-container-auction').css('zIndex','12');
					this.tipMsg = '您确定删除该拍品？'
					this.showConf = true;
				};
			},

			// 删除该商品
			doCancel: function(ev) {
				var _this = this;
				ajax.deleteGoods(_this.goodsId,function(data) {
					if (data.status == 200) {
						_this.showAlertTip("您已经成功删除该拍品!");

						// 删除dom中的该条数据
						_this.dataList.splice(_this.index,1)
					} else {
						_this.showAlertTip(data.msg);
					}
				})
			},

			// alert弹窗提示
			showAlertTip: function(tip) {
				$('.swiper-container-auction').css('zIndex','13');
				this.tipMsg = tip;
				this.showAlertBoll = true;
			},

			// 关闭全局弹窗
			closePopup: function() {
				$('.swiper-container-auction').css('zIndex','1');
				this.showAlertBoll = false;
			}

		}
		
  	}	

</script>
<style>
.tabs {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 11;
}
video {
	width: 100%;
	height: 100%;
}
.swiper-container-auction {
	margin-top: 4.4rem;
}
</style>
