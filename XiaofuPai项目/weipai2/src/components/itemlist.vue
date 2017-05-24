<template>
<div class="swiper-container clearfix">
    <div class="swiper-wrapper">
		<!-- 参拍拍品 -->
        <div class="swiper-slide " v-if="isAuction || isFollow" v-for="item in dataList">
        	
           	<div class="content-slide content-slide-border">
           		<div class="items-ul clearfix">
                  <router-link :to="'/lotdetails/'+item.id" class="item-a">
	           				<div class="items-list-1">
	           					<img :src="baseUrl + item.thumb.url" />
	           					<p>{{ item.desc }}</p>
	           				</div>	
	           				<strong class="items-str">￥{{ item.current_price }}</strong>
	           				<dl class="items-dl">
	           					<dt></dt>
	           					<dd>{{ item.views }}</dd>
	           				</dl>
	           			</router-link>
           			</div>
          	</div>
          	
        </div>
		    <!-- 关注拍品 -->
        
        <!-- 关注店铺 -->
        <div class="swiper-slide-shop " v-if="isShop">
           	<div class="content-slide content-slide-border content-slide-none">
           		<div class="iteml-ul-attention cc"> 
           			<router-link :to="'/shops/'+item.user_id+'?type=2'" class="iteml-name" v-for="item in dataList">
           				<dl class="iteml-name-dl">
           					<dt>
           						<img :src="item.thumb" />
           					</dt>
           					<dd>{{ item.title }}</dd>
           				</dl>
           			</router-link>
           		</div>
          	</div>     
        </div>

  	</div>
</div>
</template>
<script>


    module.exports = {
		data: function() {
			return {
				loading: false,
				dataList: [],
				page: 1,
				baseUrl: config.img_url
			}
		},
		mounted: function() {
			if (location.pathname == '/items/govern/2') {
				document.title="我的关注"
			};
			
			var _this = this;
			this.getAuctionList(this.page)

			utils.dropLoading(function() {
				_this.getAuctionList()
			})

		},
		computed: {
			// 参拍
			isAuction: function() {
				return this.$route.params.id == 0;
			},
			// 关注
			isFollow: function() {
				return this.$route.params.id == 1;
			},
			// 店铺
			isShop: function() {
				return this.$route.params.id == 2;
			}

		},
		watch :{//路由发生变化调用该函数
			'$route': ["initData"]
		},
		
		methods: {
			// 初始化
			initData: function() {
				this.dataList = [];
				this.page = 1;
				this.getAuctionList()
			},
			// 处理头像数据
			formatThumb: function() {
				var _data = this.dataList;
				for (var i = 0; i < _data.length; i++) {
					this.dataList[i].thumb = _data[i].thumb ?  _data[i].thumb : '';
				};
			},
			
			// 获取拍品数据
	       	getAuctionList: function() {
	       		var _this = this;
	       		var type = this.$route.params.id;
	       		ajax.getBuyerAuction(_this.page,type,function(data){
	       			if (data.status == 200) {
	       				_this.page++
	       				for (var i = 0; i < data.data.list.length; i++) {
	       					_this.dataList.push(data.data.list[i])
	       				};
	       			}
	       		})
	       	}
		}
	}
 

</script>
<style>
.content-slide p{
	text-indent:2em;
	/*line-height:1.9;*/
	margin-bottom: .5rem;
}
.swiper-container {
	width:100%;
	margin:0 auto;
	position:relative;
	
	/* Fix of Webkit flickering */	
	z-index:1;
	}
.swiper-wrapper {
	position:relative;
	width:100%;
	box-sizing: border-box;
}
.swiper-free-mode > .swiper-wrapper {
	margin: 0 auto;
}
.swiper-slide {
	width:50%;
	height: auto!important;
	/*margin-right: -2%;*/
	background:none;
	color:#fff;
	float: left;
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
}
.swiper-slide-btn{
	/*position: relative;*/
}
.content-slide-border{
	/*background: #fff;*/
}

.content-slide-none{
	height:9.5rem ;
	border-bottom: none;
}

.swiper-wrapper{

	height: auto!important;
}

.items-ul{
	width: 98%;
	margin-left: 2%;
}
.items-ul .item-a{
	width:98%;
	height: 24.6rem;
	margin:0 2% 2% 0;
	/*padding-bottom: 50%;*/
	background: #fff;
	float: left;
	display: block;
}
.items-list-1 img{
	width:100%;
	height: 18rem;
}
.content-slide p{
	text-indent: initial;
}
.items-list-1 p{
	display:-webkit-box !important;
	overflow:hidden;
	height: 4rem;
	padding: 0 .5rem;
	text-overflow:ellipsis;
	word-break:break-all;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
	font-size: 1.4rem;
}

.items-str{
	float: left;
	font-size: 1.4rem;
	color: #ad1a1a;
	font-weight: normal;
}
.items-dl{
	float: right;
	font-size: 1.2rem;
	color:#666;
	margin-right: 1rem;
}
.items-dl dt{
	float: left;
	width: 1.4rem;
	height: 1rem;
	background:url(/res/img/icon.png) no-repeat;;
	background-size: 100%;
	margin:0.4rem 0.5rem 0 0;
}
.items-dl dd{
	float: left;
}


/*关注店铺*/
.swiper-slide-shop {
	width: 100%;
}
.iteml-ul-attention{
	width: 98%;
	margin-left: 2%;
}
.iteml-name{
	width: 31.333%;
	float: left;
	display: block;
	background: #FFF;
	margin-right: 2%;
	margin-bottom: 2%;
}
.iteml-name .iteml-name-dl{
	padding: 1rem;
}
.iteml-name .iteml-name-dl dt{
	width: 6rem;
	height: 6rem;
	border-radius: 50%;
	overflow: hidden;
	margin:0 1.6rem 2.25rem 1.6rem;
}
.iteml-name .iteml-name-dl dt img{
	width: 100%;
	height: 100%;
	vertical-align: top;
}
.iteml-name .iteml-name-dl dd{
	font-size: 1.4rem;
	text-align: center;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	width: 9.25rem;
}
</style>
