<template>
<div class="shops-news bottom-distance">
	<header class="shops-header-1 clearfix">
		<div class="fl header-l clearfix">
			<img :src="dataInfo.shop_info.user_thumb" class="fl">
			<div class="fl">
				<p class="shops-name">{{ dataInfo.shop_info.user_name }}</p>
				<p class="fans">粉丝：{{ dataInfo.fans_num }}</p>
			</div>
		</div>
		<div class="fr header-r clearfix">
			<!-- 二维码 -->
			<!-- <div class="fl qr-code" @click="showBigQr" v-if="isShop">
				<img :src="qrcode" alt="">
			</div> -->
			<!-- 关注 -->
			<div class="follow fl" v-if="!isMine">
				<div v-if="dataInfo.is_followed == '0' " class="follow-in"><span>+</span>关注</div>
				<div v-if="dataInfo.is_followed == '1' " class="follow-in already-follow"><span></span>已关注</div>
			</div>
			<!-- 自己浏览自己的首页 -->
			<div class="follow fl" v-if="isMine">
				<router-link class="store_set shotsprites" to="/compete"></router-link>
			</div>
		</div>
	</header>
	<div class="news-introduce">
		<div data-onOff="0" class="news-introduce-p">
			<span class="news-introduce-title">店铺介绍</span>
			<span class="news-introduce-desc text-limit">{{ dataInfo.shop_info.desc }}</span>
		</div>
		<!-- <p><span>实名认证</span>个人认证/企业认证</p> -->
	</div>
	<div class="news-content">
		<div class="news-con-title clearfix" data-id="" >
			<p class="fl">店铺拍品</p>
			<router-link :to="/shops/ + dataInfo.shop_info.userid +'?type=2'" class="fr">更多拍品<span class="fr shotsprites to-right"></span></router-link>
		</div>
		<ul class="news-list clearfix">
			<li class="fl divbg" v-for="(item,index) in imgArrLimit">
				<router-link :to="/lotdetails/ + item.id">
					<!-- 图片 -->
					<img v-if="item.thumb.type == 'img' " :src="baseUrl + item.thumb.url" alt="">
					<!-- 视频 -->
					<div v-if="item.thumb.type == 'video' " class="video-box">
						<video :src="baseUrlVideo + item.thumb.url" poster="/res/img/video_ns_2.jpg"  style="object-fit: fill;"></video>
						<span class="video-bg" data-type="video"></span>
					</div>
				</router-link>
				
			</li>
		</ul>
	</div>
</div>
</template>
<script>


    module.exports = {
		data:function(){
			return {
				dataInfo: [],
				imgArrLimit: [],
				imgArr: [],
				isMine: true,       // 是否本人
				baseUrl: config.img_url,      // 图片服务器
				baseUrlVideo: 'http://xfpvideoupload.oss-cn-beijing.aliyuncs.com/' // 视频服务器
			}
		},
		
		created: function() {
			this.getShopInfo()

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

            // 店铺描述
            $('.news-introduce-desc').click(function(){
            	var onOff = $(this).parents('.news-introduce-p').attr('data-onOff');
            	if (onOff == 0) {
            		$(this).removeClass('text-limit').addClass('news-introduce-desc-open');
            		$(this).parents('.news-introduce-p').attr('data-onOff','1');
            	} else {
            		$(this).addClass('text-limit').removeClass('news-introduce-desc-open');
            		$(this).parents('.news-introduce-p').attr('data-onOff','0');
            	}
            })
            
		},
		components:{
			"my-footer":footer
		},
		methods: {
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
<style>
.shops-header-1{
	padding:1.6rem 0;
	border-bottom: 1px solid #c5c5c5;
	background-color: #fff;
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
	padding-top: 0.4rem;
	width: 18rem;
	white-space:nowrap; 
	overflow:hidden; 
	text-overflow:ellipsis;
}
.shops-header-1 .header-l .fans{
	font-size: 1.3rem;
	color: #999;
}
.shops-header-1 .header-r .qr-code{
	margin-top: 1rem;
	height: 2.5rem;
	width: 2.5rem;
	background-color: pink;
}
.shops-header-1 .header-r .follow{
	height: 4.5rem;
	width: 7rem;
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
	padding:0 1rem;
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
.news-introduce-p:first-child{
	border-bottom: 1px solid #e5e5e5;
}
.news-introduce-p span{
	color: #333;
	margin-right: 3rem;
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
	background: url(/res/img/videobg.png) no-repeat;
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
