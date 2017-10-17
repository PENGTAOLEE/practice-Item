<template>
	<div class="my-collection">
		<div class="auction-list">

			<div class="auction-item clearfix" v-for="(item,index) in dataList" @click="goDetails(item.id)">
				<div class="auction-image fl">
					<img :src="baseUrl+JSON.parse(item.thumb).url" alt="">				
				</div>
				<div class="auction-details fl">
					<p class="auction-details-desc text-limit">{{item.desc}}</p>
					<span class="auction-details-price">￥{{item.price}}</span>
					<div class="footer clearfix">
						<img :src="item.thumbs" alt="" class="dibvam avator">
						<span class="dibvam text-overflow"  style="max-width:9rem;">{{item.name}}</span>
						<span class="dibvam">|</span>
						<span class="dibvam">{{item.updatetime}}</span>
						<span class="dibvam fr" @click.stop="sharePageBtn(item.id,JSON.parse(item.thumb).url,index,item.name,item.desc,item.thumbs)" :class="'share-button-'+item.id">
							<i class="shotsprites share-icon dibvam"></i>
							<span>分享</span>
						</span>
					</div>
				</div>
			</div>

		</div>
		<!-- 微信分享 -->
    <wx-share :message="wxShareObj" v-if="wxBoll"></wx-share>
    <!-- 分享组件 -->
		<popup-share v-show="showPopupShare" :storeObj="storeObj" @shareBubbleEvent="shareDataConfig" @childEvent="closePopupDetails"></popup-share>
	</div>
</template>

<script>
	import sharePage from '@/components/component/shareSub';
	import popupShare from '@/components/component/popup-share';
	const ajax = require('ajax');
	let config = window.config;
  export default {
		data () {
			return {
				wxBoll: false,
				// 渲染对象
				dataList: [],
				isBuyer: false,
				isSeller: false,
				wxShareObj: {},
				showPopupShare: false,
				storeObj: {},
				page: 1,
				page_num: 1,
				baseUrl: config.img_url
			}
		},
		
		components: {
      'wx-share': sharePage,
      'popup-share': popupShare
	  },     
    
    created() {
    	const pageId = this.$route.params.page;
    	if (pageId == '1') {// 买家
    		this.isBuyer = true;
    	} else {
    		this.isSeller = true;
    	}

    	this.getData();
    },

		mounted: function() {
			const pageId = this.$route.params.page;
	    	if (pageId == '1') {// 买家
	    		document.title = '作品珍藏';
	    	} else {
	    		document.title = '被珍藏的作品';
	    	}
      $('#footer-common').hide()
			
			this.$nextTick(function() {
				$('#app,html,body').css({
					'height':'100%',
					'background': '#fff'
				})
			})
		},
		watch: {
		},
		beforeDestroy: function() {
			$('#footer-common').show()
		},
		methods: {
			// 进详情页
			goDetails(id) {
				if (this.isBuyer) {
					this.$router.push('/collection/1/'+id)					
				} else {
					this.$router.push('/collection/2/'+id)
				}
			},

			// 获取数据
			getData() {
				var that = this;
				if (this.isBuyer) {
					ajax.getMybuylist((res) => {
						var data = res.data;
						if (res.status == 200) {
							that.dataList = that.dataList.concat(data.orderInfo);
							that.page_num = data.page_num;
						};
					})
				} else {
					ajax.getMysellerlist((res) => {
						var data = res.data;
						if (res.status == 200) {
							that.dataList = that.dataList.concat(data.orderInfo);
							that.page_num = data.page_num;
						};
					})
				}
			},
			getAllList: function(){
	      this.page = 1;
	      this.page_num= '';
	      this.dataList = [];
	      this.getData();
	      var that = this;
	      utils.dropLoading(function(){
          if(that.page<that.page_num){
            that.page++;
            that.getData();
          }else{
            // console.log("已经到底了，没有更多数据了");
          }
	      });
      },

			// 分享页
			sharePageBtn(id,imgUrl,index,name,desc,thumb) {
				this.noScroll()
				// 配置分享数据
				this.storeObj = {
					thumb: thumb,
					name: name,
					desc: desc,
					id: id,
					images: imgUrl,
					imgType: 'img',
					type: true
				};
				// this.wxShareObj = this.storeObj;
				this.showPopupShare = true;
			},

			// 禁止滚动
	    noScroll: function() {
	    	$('body').css('overflow','hidden');
	    },

	    // 允许滚动
	    allowScroll: function() {
	    	$('body').css('overflow','auto');
	    },

	    // 配置分享
			shareDataConfig: function(options) {
				// 收集分享数据
				this.wxShareObj = options;
				this.$emit('WxShareConfig',options)
				this.wxBoll = true;
			},

			// 关闭分享弹窗
			closePopupDetails: function() {
				this.allowScroll()
				this.showPopupShare = false;
				this.wxBoll = false;
			},

		}
	}	
</script>

<style scoped>
	.text-limit {
		overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
	}

	.auction-list {
		width: 100%;
		height: 100%;
		padding-bottom: 5rem;
		font-family: PingFangSC;
		background-color: #fff;
	}

	.auction-item {
		display: inline-block;
		width: 100%;
		padding: 1.8rem 0 0 1.5rem;
	}

	.auction-image {
		overflow: hidden;
		width: 10.3rem;
		height: 10.3rem;
		border-radius: .5rem;
	}

	.auction-image img {
		width: 100%;
		height: 100%;
	}

	.auction-details {
		width: 25.2rem;
		border-bottom: 1px solid #ddd; 
		margin: .5rem 0 0rem .5rem;
	}

	.auction-details-desc {
		height: 3.45rem;
		padding-left: .5rem;
		padding-right: 1.5rem;
		line-height: 1.7rem;
		font-weight: 600;
		font-size: 1.4rem;
		color: #333;
	}

	.auction-details-price {
		display: block;
		padding-left: .5rem;
		margin-top: 1.5rem;
		font-size: 1.6rem;
		font-weight: 600;
		color: #ad1a1a;
	}
	
	.footer {
		padding-left: .5rem;
		padding-right: 1rem;
		padding-bottom: 2rem;
		font-size: 1.3rem;
	}

	.avator {
		width: 1.7rem;
		height: 1.7rem;
		border-radius: 50%;
	}

	.auction-item:last-of-type .auction-details {
		border: none;
	}

	.share-icon {
		width: 1.4rem;
		height: 1.4rem;
		background-position: -28rem -25.5rem;
	}
</style>