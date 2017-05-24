<template>
<div class="lotdetails">
	<header class="lot-header" style="background-image:url(/res/img/shop_top.png)">
		<div class="header-title clearfix">
			<div class="title-img fl">
				<router-link :to="/shopsnews/  + allData.goods_detail[0].user_id">
					<img :src="allData.goods_detail[0].shop_thumb" alt="">
				</router-link>
			</div>
			<p class="fl title">{{ allData.goods_detail[0].shop_title }}</p>
		</div>
		<p class="summary">{{ allData.goods_detail[0].shop_desc }}</p>
	</header>
	<!-- 详情组件 -->
	<goods-details :details="goodsDetails" @childEvent="showBox" @countDown="bidSuccess"></goods-details>

	<div class="lot-shops">
		<h2 class="title">店铺拍品</h2>
		<div class="lot-list clearfix">
			<!-- 跳转本页 && 更新数据 -->
			<router-link :to="/lotdetails/ + item.id" class="fl list" v-for="(item,index) in otherGoods">
				
				<div class="list-img">
					<!-- 图片 -->
					<img v-if="item.thumb.type == 'img' " :src="baseUrl + item.thumb.url" alt="">
					<!-- 视频 -->
					<div v-if="item.thumb.type == 'video' " class="video-box">
						<video :src="baseUrlVideo + item.thumb.url" alt=""></video>
						<span class="video-bg" data-type="video"></span>
					</div>
				</div>

				<div class="clearfix img-mage">
					<span class="fl color">￥{{ item.current_price }}</span>
					<span class="fr img-browse">{{ item.views }}</span>
				</div>
			</router-link>
		</div>
	</div>

	<!-- 弹窗组件 -->
	<show-confirm 
		v-show="showConf" 
		:msg="tipMsg" 
		:data-id="allData.goods_detail[0].id" 
		:data-status="allData.goods_detail[0].status" 
		@closeBox="closeBox" 
		@childEvent="offShelf"
	></show-confirm>
	<!-- 自己看到自己的拍品不显示 -->
	<my-footer 
		:userid="allData.goods_detail[0].user_id" 
		:goodsid="allData.goods_detail[0].id"
		v-if="!isMine"
	></my-footer>

	<!-- 微信分享 -->
	<wx-share :message="wxShareObj"></wx-share>
</div>
</template>
<script>


    module.exports = {
      data:function(){
        return {
            allData: [],                                    // 全部数据
            goodsDetails: [],                               // 详情数据
            otherGoods: [],                                 // 拍品列表
            timeCountDownId: [],                            // 倒计时数组
            timer: null,                                    // 倒计时id
            avatarUrl: '',
            showConf: false,                                // 下架弹窗
            tipMsg: '您确定要下架该商品吗?',                // 弹窗提示语
            baseUrl: config.img_url,                        // 图片
            baseUrlVideo: "http://xfpvideoupload.oss-cn-beijing.aliyuncs.com/", // 视频
            isMine: false,                                                      // 是否是个人
            wxShareObj: {},                                                     // 微信分享
        }
      },
      
      components: {
          'goods-details': goodsDetails,
          'show-confirm': showConfirm,
          'my-footer': footer,
          'wx-share': sharePage,
      },
      created: function() {
          // 初始化数据
          this.getDetailsData()

          // 拍品列表
          this.formatGoods()

          this.initWebsocket();

          // 判断当前是否个人
          var nowuid = this.allData.goods_detail[0].nowuid;
          var userId = this.allData.goods_detail[0].user_id;
          if (nowuid == userId) {
              this.isMine = true; 
          }
          
          // 微信分享
          this.wxShareFun()

          // 浏览量
          this.addShopView(userId);
          
      },  
      mounted: function(){
          document.title="拍品详情";
      },
      watch: {
          '$route': ["getDetailsData","formatGoods","initWebsocket","wxShareFun"]
      },
      methods: {
          // 浏览量添加
          addShopView: function(shopId) {
            ajax.addShopView(shopId,function(res){
              if (res.status == 200) {
                // 添加浏览量成功
              };
            })
          },

          // 微信分享
          wxShareFun: function() {
              var imagesArr = JSON.parse( this.allData.goods_detail[0].images );
              this.wxShareObj.title = "【赞】这件商品不错，好像是你想要的！";
              this.wxShareObj.images = imagesArr[0].url; 
              this.wxShareObj.imgType = imagesArr[0].type;

              this.wxShareObj.url = location.origin + '/lotdetails/' + this.allData.goods_detail[0].id;
              // this.wxShareObj.url = location.href; 
              this.wxShareObj.desc = this.allData.goods_detail[0].shop_desc;
              this.wxShareObj.type = true;
          },

          // 出价成功回调
          bidSuccess: function(param) {
              // 接收后端传过来的数据
              this.timeCountDownId.push({
                  id:        param.id,
                  startTime: param.starttime,
                  endTime:   param.endtime
              })
              this.createCoundown()
          },
          // 创建倒计时
          createCoundown: function() {
              var _this = this;
              setTimeout(function(){
                  // 为每个item添加倒计时
                  if(_this.timeCountDownId) {
                      $.each(_this.timeCountDownId, function(index,item){
                          // 触发倒计时
                          var alarm;
                          clearInterval(_this.timer)
                          alarm = _this.emitCountDown($("#time_down_"+this.id),this.startTime,this.endTime); 
                          _this.timer =  alarm.flag;

                          delete _this.timeCountDownId[index];
                      });
                  }
              },50)
              
          },
          // 倒计时触发
          emitCountDown: function(obj,startTime,endTime) {
              alarm = new utils.Alarm(startTime, endTime, function (second, minute, hour, day) { //计时钟
                      if (hour > 24) {
                          // obj.find('.follow-time').html('距离结束：<span>'+day+'</span>天<span>'+ hour +'</span>时<span>'+minute+'</span>分<span>' + second + '</span>秒' ); 
                          obj.find('.follow-time').html('距离结束：<span>'+hour+'</span>时<span>'+minute+'</span>分<span>'+second+'</span>秒' );
                      } else {
                          obj.find('.follow-time').html('距离结束：<span>'+hour+'</span>时<span>'+minute+'</span>分<span>'+second+'</span>秒' );
                      }
                      // 正常状态
                      obj.find('.follow-time').parent(".cutdown-box").show();
                      obj.find('.follow-time').parent(".cutdown-box").siblings(".grey").hide();
                      obj.find('.follow-time').parents('.follow-list').find('.end-auction').removeClass('end-auction').addClass('is-auction')
                  }, function () {
                      
                      // 倒计时结束状态
                      obj.find('.follow-time').parent(".cutdown-box").hide();
                      obj.find('.follow-time').parent(".cutdown-box").siblings(".grey").show();

                      obj.find('.follow-time').parents('.follow-list').find('.is-auction').removeClass('is-auction').addClass('end-auction')
                      // window.location.reload();
              });
              alarm.start();  
              return alarm;
          },

          // 数据获取 
          getDetailsData: function () {
              var _this = this;
              var goodsId = this.$route.params.id;
              ajax.getGoodsDetails(goodsId, function(data) {
                  if (data.status == 200) {
                      _this.timeCountDownId = [];
                      _this.allData = data.data;
                      
                      _this.goodsDetails = data.data.goods_detail;
                      _this.timeCountDownId.push({
                          id:        _this.goodsDetails[0].id,
                          /** modifier LL 这里应该用nowTime,即服务器返回的当前时间 **/
                          startTime: _this.goodsDetails[0].nowTime,
                          /** modify end **/
                          endTime:   _this.goodsDetails[0].end_time
                      })
                      _this.$nextTick(function(){
                          _this.createCoundown();
                      })
                  } else { 
                      alert(data.msg); 
                      //_this.$router.replace('/*');
                  }
              })
          },

          // 处理更多拍品
          formatGoods: function() {
              var _this = this;
              var shopGoods = this.allData.other_goods;
              this.otherGoods = [];

              shopGoods.forEach(function(item,index){
                  var obj;
                  item.thumb ? obj = JSON.parse( item.thumb ) : obj='';
                  _this.otherGoods.push({
                      current_price: item.current_price,
                      views: item.views,
                      id: item.id,
                      thumb: obj
                  })
              })
          },

          // 公共弹窗
          showBox: function() {
              this.showConf = true;
          },
          
          // 关闭弹窗
          closeBox: function() {
              this.showConf = false;
          },

          /**
           * 当前拍品下架
           */
          offShelf: function(ev) {
              var _this  = this;
              var $node  = $('#show-confirm');
              var goodId = $node.attr('data-id');
              var status = $node.attr('data-status');
              ajax.offShelf(goodId,status,function(data) {
                  if (data.status == 200) {
                      _this.$router.replace('/auction/govern/6');
                  } else {
                      alert(data.msg)
                  }
              })
          },

          /**
           * 初始化websocket连接
           * @author LL
           **/
          initWebsocket : function(){
              var that = this;

              websocket.setUrlParams("auctionid="+this.$route.params.id+"&handler=bidpush");

              websocket.open();

              websocket.setOnMessage(function(data){
                  //如果返回状态是200且不是当前用户出的价，则更新出价信息和倒计时信息
                  if(data.status == 200 && data.data.auctionData.id != that.goodsDetails[0].nowuid) {
                      //更新出价人列表
                      that.goodsDetails[0].bid.data.unshift(data.data.auctionData);

                      //更新出价倒计时
                      that.bidSuccess({
                          id : data.data.bidTime.id,
                          starttime : data.data.bidTime.nowTime,
                          endtime : data.data.bidTime.lastTime
                      });
                  }
              });
          }
          
      }
    }

</script>
<style>
.lotdetails{
	padding-bottom: 6rem;
}
.lot-header{
	background-position: top center;
	background-size: 100% 8rem;
	background-repeat: no-repeat;
	height: 15rem;
	padding: 4.7rem 0 0 1.5rem;
	background-color: #fff;
	margin-bottom: 1.5rem;
}
.lot-header .title-img{
	width: 5.2rem;
	height: 5.2rem;
	border:0.25rem solid #fff;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	margin-right: 1rem;
}
.lot-header .title-img img {
	width: 100%;
	height: 100%;
}
.lot-header .title{
	font-size: 1.6rem;
	color: #fff;
	line-height: 2.75rem;
}
.lot-header .summary{
	font-size: 1.4rem;
	color: #999;
	/*超出限制*/
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.lot-shops{
	background-color: #fff;
}
.lot-shops .title{
	height: 4.4rem;
	line-height: 4.2rem;
	font-size: 1.6rem;
	color: #333;
	text-align: center;
	border-bottom: 1px solid #e5e5e5;
	margin:0 0.5rem;
}
.lot-shops .lot-list{
	padding:1.5rem 0 0 1rem;
}
.lot-shops .lot-list .list{
	width: 11.1rem;
	margin:0 1rem 1rem 0;
}
.lot-shops .lot-list .list .list-img{
	height: 11.25rem;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}
.lot-shops .list-img img {
	width: 100%;
	height: 100%;
}
.lot-shops .lot-list .list .img-mage{
	height: 3.2rem;
	line-height: 3.2rem;
	background-color: #f6f6f6;
	font-size: 1.4rem;
	padding-right: 0.25rem;
}
.lot-shops .lot-list .list .img-browse{
	font-size: 1.2rem;
    color: #666;
    height: 3.15rem;
    line-height: 3.15rem;
    padding-left: 1.7rem;
    background: url(/res//img/browse.png) no-repeat left;
    background-size: 1.4rem 1rem;
}
.index-follow{
	padding-bottom: 6rem;
}
.details-list{
	background-color: #fff;
	padding-top: 1rem;
	margin-bottom: 1rem;
	border-bottom: 1px solid #dadadc;
}
.details-list .section-left{
	margin-left: 1rem;
}
.details-list .section-left .section-left-img{
	width: 4.4rem;
	height: 4.4rem;
	border-radius: 50%;
}
.details-list .section-right{
	width: 30rem;
	margin:0 1.1rem 0 1rem;
}
.details-list .right-title{
	font-size: 1.6rem;
	margin-bottom: 0.4rem;
}
.details-list .right-summary p{
	color: #333;
	font-size: 1.4rem;
	line-height: 2rem;
}
.details-list .right-summary .pmore{
	height: 6.3rem;
	overflow: hidden;
}
.details-list .right-summary .pmax{
	max-height: 100rem;
}
.details-list .right-summary .summary-more{
	width: 7.25rem;
	height: 2rem;
	line-height: 2rem;
	text-align: right;
	font-size: 1.2rem;
	color: #ff4545;
	bottom: 0.2rem;
	right: 0;
}
.details-list .right-summary .summary-up{
	display: inline-block;
	width: 6rem;
	font-size: 1.2rem;
	color: #ff4545;
	height: 2.25rem;
	line-height: 2.25rem;
	display: none;
}
.details-list .right-summary .summary-up span{
	float: left;
    width: 1.1rem;
    height: 0.65rem;
    margin:0.8rem 0.5rem 0 0;
}
.details-list .follow-img li{
	width: 9.5rem;
	height: 9.5rem;
	margin:0.5rem 0.5rem 0 0;
}
.details-list .img-explain .free-shipping,.details-list .img-explain .return{
	font-size: 1.2rem;
	color: #fff;
	background-color: #fa693c;
	height: 1.9rem;
	line-height: 1.9rem;
	padding:0 0.75rem;
	border-radius: 0.3rem;
	margin:0.5rem 0.5rem 0 0;
}
.details-list .img-explain .return{
	background-color: #6699ff;
}
.details-list .img-explain .time{
	margin-top: 0.4rem;
	font-size: 1.4rem;
	color: #999;
}
.details-list .img-explain .imgbrowse,.details-list .img-explain .imglike{
    height: 3.15rem;
    line-height: 3rem;
}
.details-list .img-explain .imglike{
    padding-left: 2.6rem;
    padding-right: 0.5rem;
}
.details-list .likes{
	margin-right: 0.5rem;
	padding-top: 0.6rem;
}
.details-list .likes .arrow{
	top: 0rem;
	right: 2rem;
	width: 0;
	height: 0;
	border-bottom: 0.6rem solid #f3f3f5;
    border-left: 0.6rem solid transparent;
    border-right: 0.6rem solid transparent;
}
.details-list .likes .likes-list{
	padding:0.75rem 0 0 0.6rem;
	background-color: #f3f3f5;
}
.details-list .likes .likes-people{
	height: 4.4rem;
	overflow: hidden;
}
.details-list .likes .likes-list .people{
	margin:0 0.3rem 0.75rem 0.3rem;
	width: 2.9rem;
	height: 2.9rem;
	border-radius: 50%;
}
.details-list .likes .likes-list .likesmore{
	height: 4rem;
	width: 4.5rem;
	margin:-0.5rem 0 0 -0.4rem;
	background-color:#f3f3f5; 
}
.details-list .likes .likes-people .likesmore{
	margin: 0;
	right: 0;
	top: 0.2rem;
}
.details-list .follow-state .state{
	color: #fff;
	font-size: 1.4rem;
	height: 3rem;
	line-height: 3rem;
	padding:0 2rem;
	background-color: #ad1a1a;
	border-radius: 1.5rem;
	margin-top: 1rem;
	box-shadow: 0 0 0.75rem rgba(173,26,26,0.6);
}
.details-list .follow-state .time{
	line-height: 5rem;
	font-size: 1.4rem;
	color: #999;
	padding-right: 1rem;
}
.details-list .follow-state .time span{
	color: #333;
	font-size: 1.6rem;
}
.details-list .follow-offer{
	height: 3.5rem;
	line-height: 3.5rem;
	margin-right: 0.5rem;
	color: #fff;
	text-align: center;
	font-size: 1.6rem;
	background-color: #15af25;
	border-radius: 0.5rem;
}
.details-list .follow-price{
	padding-right: 0.5rem;
	font-size: 1.4rem;
	color: #999;
}
.details-list .follow-price .price p{
	text-align: center;
	height: 2rem;
	line-height: 2rem;
}
.details-list .follow-price .price p span{
	display: inline-block;
	height: 2rem;
	border:1px solid #dddedf;
	padding:0 0.3rem;
	border-radius: 2px;
	line-height: 1.8rem;
}
.details-list .follow-price .price-up{
	border-bottom: 1px solid #dddedf;
	padding-top: 1rem;
	padding-bottom: 0.5rem;
}
.details-list .follow-price .price-up p{
	width: 33.3333%;
}
.details-list .follow-price .price-dows{
	padding:0.5rem 0 1rem 0;
}
.details-list .follow-price .price-dows p{
	width: 50%;
}
.details-list .follow-offer-list{
	margin-right: 0.5rem;
	background-color: #f3f3f5;
	margin-bottom: 1.5rem;
}
.details-list .offer-list-hidden{
	max-height: 37.6rem;
	overflow: hidden;
}
.details-list .follow-offer-list li{
	margin-left:0.5rem;
	padding:0.5rem 0.5rem 0.5rem 0;
	border-top: 1px solid #dadadc;	
}
.details-list .follow-offer-list li:first-child{
	border-top: none;
}
.details-list .follow-offer-list .list-left{
	height: 3.5rem;
	width: 3.5rem;
	border-radius: 50%;s
	margin:0.3rem 1rem 1rem 0;
}
.details-list .follow-offer-list .list-center .name{
	font-size: 1.4rem;
	color: #333;
}
.details-list .follow-offer-list .list-center .time{
	font-size: 1.2rem;
	color: #999;
}
.details-list .follow-offer-list .list-right{
	height: 2rem;
	line-height: 2rem;
	font-size: 1.6rem;
}
.details-list .follow-offer-list .list-right span{
	float: right;
	font-size: 1.2rem;
	color: #fff;
	background-color: #ccc;
	height: 2rem;
	line-height: 2rem;
	padding:0 0.5rem;
	border-radius: 0.3rem;
	margin-left: 1rem;
}
.details-list .follow-offer-list .color span{
	background-color: #ad1a1a;
}
.details-list .follow-offer-list .offermore{
	margin: 0;
	padding:0;
	height: 3rem;
	line-height: 3rem;
	text-align: center;
	font-size: 1.4rem;
	color: #999;
}
/*bg*/
.video-box {
	position: relative;
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
	background: url(/res/img/videobg.png) no-repeat;
	background-size: 100% 100%;
}
</style>
