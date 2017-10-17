<template>
	<div class="collection-details">
		<!-- 轮播 -->
		<div class="swiper-container">
	    <div class="swiper-wrapper">
        <div class="swiper-slide fl" v-for="item in dataList.images">
        	<img :src="url+item.url" alt="">
        </div>
	    </div>
	    <!-- 如果需要分页器 -->
	    <div class="swiper-pagination"></div>   
		</div>

		<!-- 拍品描述 -->
		<p class="auction-desc">
			<span :class="{'text-overflows':isAllDesc}">{{dataList.desc}}</span>
			<span class="ab control-btn" :class="{'display-all-text': !isAllDesc}" v-if="dataList.desc.length >= 75 || /<br/.test(dataList.desc)" @click="toggleDesc"></span>
		</p>

		<!-- 买家 -->
		<div v-if="isBuyer">
			<div class="collection-info-list" >
				<p class="info-item clearfix">
					<span class="item-key fl">购买来源</span>
					<router-link :to='"/shopsnews/"+dataList.payee_id' style="position:relative;">
						<span class="item-value fl">{{ dataList.name }}</span>
						<span class="router-link-go arrow-left buyer"></span>	
					</router-link>
				</p>
				<p class="info-item clearfix">
					<span class="item-key fl">购买价格</span>
					<span class="item-value red-color fl">￥{{ dataList.price }}</span>
				</p>
				<p class="info-item clearfix">
					<span class="item-key fl">购买日期</span>
					<span class="item-value fl">{{ dataList.pay_time }}</span>
				</p>
				<p class="info-item clearfix">
					<span class="item-key fl">收货日期</span>
					<span class="item-value fl">{{ dataList.end_time }}</span>
					<a @click='goDetail' href='javascript:;' class="related-orders" style="width: 10rem;font-size: 1.3rem;color: #999;">
						<span class=" fl">查看相关订单</span>
						<span class="router-link-go arrow-left-orders"></span>	
					</a>
				</p>
			</div>
			<div class="info-items">
				<!-- 备注 -->
				<p class="info-item-alone clearfix">
					<span class="item-alone-key fl">备注</span>
					<textarea placeholder="点击添加备注" class="item-alone-value fl" style="resize:both" v-model='buyer_remark' @keyup='resizeTextarea' id='txtContent' ></textarea>
				</p>	
			</div>
			<div class="collection-footer clearfix">
				<div class="footer-comfirm fl" @click="saveRemarks">确定</div>
				<div class="footer-share fl" @click.stop="displayShare(dataList.order_id,dataList.images[0].url,dataList.name,dataList.desc,dataList.thumb)">
					<i class="share-icon shotsprites"></i>
					<span>分享</span>
				</div>
			</div>	
		</div>
		
		<!-- 卖家 -->
		<div v-if="isSeller">
			<div class="collection-info-list" >
				<p class="info-item clearfix">
					<span class="item-key fl">收藏人</span>
					<router-link :to="'/shops/'+dataList.user_id+'?type=0'" style="position:relative;">
						<span class="item-value text-overflow fl" style="width:12rem;">{{ dataList.name }}</span>
						<span class="router-link-go arrow-left buyer"></span>	
					</router-link>
				</p>
				<p class="info-item clearfix">
					<span class="item-key fl">出售价格</span>
					<span class="item-value red-color fl">￥{{ dataList.price }}</span>
				</p>
				<p class="info-item clearfix">
					<span class="item-key fl">出售日期</span>
					<span class="item-value fl">{{ dataList.pay_time }}</span>
					<a @click='goDetail' href='javascript:;' class="related-orders" style="width: 10rem;font-size: 1.3rem;color: #999;">
						<span class="text-overflow fl">查看相关订单</span>
						<span class="router-link-go arrow-left-orders"></span>	
					</a>
				</p>
			</div>
			<div class="collection-footer border-t clearfix" @click.stop="displayShare(dataList.order_id,dataList.images[0].url,dataList.name,dataList.desc,dataList.thumb)">
				<i class="share-icon shotsprites"></i>
				<span>分享</span>
			</div>	
		</div>
		<!-- 微信分享 -->
    <wx-share :message="wxShareObj" v-if="wxBoll"></wx-share>
    <!-- 分享组件 -->
		<popup-share v-show="showPopupShare" :storeObj="storeObj" @shareBubbleEvent="shareDataConfig" @childEvent="closePopupDetails"></popup-share>
		<show-alert :msg='alert_msg' @closeBox='closeAlert' v-show='is_alert'></show-alert>
	</div>
</template>

<script>
  import Swiper from 'swiper';
  import sharePage from '@/components/component/shareSub';
	import popupShare from '@/components/component/popup-share';
	import showAlert from '@/components/component/showAlert'
	var ajax = require('ajax');
	let  config = window.config;

  export default {
		data () {
			return {
				wxBoll: false,
				dataList: {},
				isBuyer: false,
				isSeller: false,
				isAllDesc: true,
				wxShareObj: {},
				showPopupShare: false,
				storeObj: {},
				buyer_remark: '',
				is_alert: false,//是否启动弹窗
				alert_msg: '',
				url: config.img_url
			}
		},
		
		components: {
      'wx-share': sharePage,
      'popup-share': popupShare,
      'show-alert': showAlert
	  },     
    
    created() {
    	const pageId = this.$route.params.page;
    	if (pageId == 1) {// 买家
    		this.isBuyer = true;
    	} else {
    		this.isSeller = true;
    	}

    	this.dataList = this.getDetails();
    	this.buyer_remark = this.dataList.content;
    	this.dataList.images = 	JSON.parse(this.dataList.images);
    },

		mounted: function() {
			// document.title = "被收藏的拍品";
			if(this.isBuyer){
				document.title = '作品珍藏';
			}else if(this.isSeller){
				document.title = '被珍藏的作品';
			}
      $('#footer-common').hide()
				
			setTimeout( () => {
				$('#app,html,body').css({
					'height':'auto',
					'background-color':'#f6f6f6'
				})

				// 初始化 
				var mySwiper = new Swiper ('.swiper-container', {
			    loop: true,
			    autoplay: 1500,
			    // 如果需要分页器
	        pagination: '.swiper-pagination',
	        paginationType: 'fraction'
			    
			  })

			},1000)
		},
		watch: {
		},
		beforeDestroy: function() {
      $('#footer-common').show()
		},
		methods: {
			// 拍品描述
			toggleDesc () {
				this.isAllDesc = !this.isAllDesc;
			},

			// 保存备注
			saveRemarks() {
				if(this.buyer_remark){
					this.pushRemark();
				}else{
					that.showAlertTip('您输入的备注为空')
				}
			},

			// 添加备注
			pushRemark(){
				let order_id = this.dataList.order_id;
				let content = this.buyer_remark;
				let that = this;
				ajax.pushRemark(order_id,content,function(data){
					if(data.status == 200){
						that.showAlertTip('添加成功')
					}else{
						that.showAlertTip(data.msg)
					}
				});
			},
			closeAlert(){
				this.is_alert = false;
			},


			// 分享页 page=1[买家] page=2[卖家]
			displayShare(id,imgUrl,name,desc,thumb) {
				this.noScroll()
				this.storeObj = {
					thumb: thumb,
					name: name,
					desc: desc,
					id: id,
					images: imgUrl,
					imgType: 'img',
					type: true
				};
				this.showPopupShare = true;
			},

			// 禁止滚动
	    noScroll() {
	    	$('body').css('overflow','hidden');
	    },

	    // 允许滚动
	    allowScroll() {
	    	$('body').css('overflow','auto');
	    },

			shareDataConfig(options) {
				this.wxShareObj = options;

				// 收集分享数据
				this.$emit('WxShareConfig',options)
				this.wxBoll = true;
			},

			// 关闭分享弹窗
			closePopupDetails() {
				this.allowScroll()
				this.showPopupShare = false;
			},

			// 详情页
			getDetails() {
				const orderId = this.$route.params.id;
				var result;
				if (this.isBuyer) {
					ajax.getMybuydetail(orderId,(res) => {
						const data = res.data;
						if (res.status == 200) {
							result = data;
						};
					})
				} else {
					ajax.getMySellerdetail(orderId,(res) => {
						const data = res.data;
						if (res.status == 200) {
							result = data;
						};
					})
				}

				return result;
			},
			goDetail(){
				const pageId = this.$route.params.page;
				const order_id = this.$route.params.id;
    			if (pageId == '1') {// 买家
    				this.$router.push('/buyerorderdetails/'+order_id);
    			}else{
    				this.$router.push('/sellerorderdetails/'+order_id);
    			}
			},
			// 自适应输入框
			resizeTextarea: function() {
				// 最小高度
				var minRows = 3;

				// 最大高度，超过则出现滚动条
				var maxRows = 6;
				var obj = document.getElementById('txtContent');
				if (obj.scrollTop == 0) obj.scrollTop = 1;
				while (obj.scrollTop == 0) {
					if (obj.rows > minRows){
						obj.rows--;
					} else {
						break;
					}

					obj.scrollTop = 1;

					if (obj.rows < maxRows) {
						obj.style.overflowY = "hidden";
					}
					if (obj.scrollTop > 0) {
						obj.rows++;
						break;
					}
				}

				while (obj.scrollTop > 0) {
					if (obj.rows < maxRows) {
						obj.rows++;
						if (obj.scrollTop == 0) obj.scrollTop = 1;
					} else {
						obj.style.overflowY = "auto";
						break;
					}
				}
			},

			// 提示信息
			showAlertTip(msg) {
				this.is_alert = true;
				this.alert_msg = msg;
			}

		}
	}	
</script>

<style scoped>
	.border-t {
		border-top: 0.05rem solid #ccc;
	}

	.collection-details {
		width: 100%;
		height: 100%;
		margin-bottom: 6rem;
		font-family: PingFangSC;
		background-color: #fff;
	}
	
	.swiper-wrapper {
		position: relative;
	}

	.swiper-slide {
		width: 100%;
		height: 25rem;
	}

	.swiper-slide img {
		width: 100%;
		height: 100%;
		-o-object-fit: cover;
		object-fit: cover;
	}

	.swiper-pagination {
		position: absolute;
		bottom: .6rem;
		left: 32.5rem;
		width: 3.9rem;
		height: 1.9rem;
		border-radius: 19px;
		line-height: 1.82rem;
		text-align: center;
		font-size: 1.3rem;
		color: #fff;
		background-color: rgba(0,0,0,.4)
	}

	.auction-desc {
		position: relative;
		margin-left: 1rem;
		padding: 1rem 1rem 1rem 0rem;
		background-color: #fff;
		border-bottom: 1px solid #eee;
		font-size: 1.4rem;
		color: #333;
	}

	.control-btn {
		bottom: .8rem;
		right: 1rem;
		display: inline-block;
		padding-left: 2rem;
		background: url('../../assets/img/morebg.png') no-repeat;
		background-size: 7.25rem 2rem;
		color: #ff4545;
	}
	.control-btn:after {
		content: '显示全部';
	}

	.display-all-text:after {
		content: '收起';	
	}
	
	.collection-info-list {
		padding-left: 1rem;
		font-size: 1.4rem;
	}
	
	.info-item {
		position: relative;
		border-bottom: 1px solid #eee;
		height: 4.4rem;
		line-height: 4.4rem;
	}

	.info-item:last-of-type {
		border-bottom: none;
	}

	.item-key {
		width: 8rem;
		color: #999;
	}
	
	.router-link-go {
		position: relative;
		display: inline-block;
		text-align: right;
	}

	.router-link-go:after {
    content: " ";
    display: inline-block;
    height: 0.8rem;
    width: 0.8rem;
    border-width: 0.15rem 0.15rem 0 0;
    border-color: #999;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 50%;
    margin-top: -1rem;
	}
	.arrow-left.buyer {
		display: inline-block;
		position: absolute;
		top: 60%;
		-webkit-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
		right: 1.5rem;
	}
	.arrow-left:after {
    /*left: 22rem;		*/
	}
	
	.info-item a {
		display: inline-block;
		width: 27.5rem;
		color: #333;
	}
	
	.related-orders {
		position: absolute;
		right: 0.6rem;
	}

	.red-color {
		color: #ad1a1a;
	}

	.arrow-left-orders:after {
		left: .4rem;
	}
	
	.info-items {
		background-color: #f6f6f6;
		border-top: 1px solid #f6f6f6;
		border-bottom: 1px solid #f6f6f6;
	}

	.info-item-alone {
		background-color: #fff;
		margin: 1rem 0;
		padding: 1rem;
		font-size: 1.4rem;
		height: auto;
	}

	.item-alone-key {
		width: 8rem;
		color: #999;
	}

	.item-alone-value {
		width: 27.5rem;
		/*width: 27.5rem;*/
		height: auto;
		min-height: 5rem;
		max-height: 10rem;
		/*overflow: hidden;*/
	}

	.margin-b-10 {
		margin-bottom: .5rem;
	}

	.collection-footer {
		position: fixed;
		bottom: 0rem;
		width: 100%;
		height: 4.9rem;
		background-color: #fff;
		line-height: 4.9rem;
		text-align: center;
		font-size: 1.5rem;
	}
	
	.footer-comfirm {
		width: 25.5rem;
		background-color: #ff5454;
		color: #fff;
	}
	
	.footer-share {
		width: 12rem;
		color: #333;
	}

	.share-icon {
		display: inline-block;
		vertical-align: middle;
		width: 1.6rem;
		height: 1.6rem;
		background-position: -28rem -27.2rem;
	}
</style>