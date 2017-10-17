<template>
<div class="shops-index bottom-distance">
	<!-- 店铺头 -->
	<header class="shops-header clearfix" v-if="isShop || isShopIndex">
		<router-link :to="'/shopsnews/' + dataHeadShopInfo.userid " class="fl header-l clearfix">
			<img :src="dataHeadShopInfo.user_thumb" class="fl">
			<div class="fl">
				<div class="shops-header-title fl">
					<span class="spritesmap user-level" :class="'s'+dataHeadShopInfo.rank" ></span>
					<p class="shops-name">{{ dataHeadShopInfo.user_name }}</p>
					<!-- <span class="spritesmap crown_icon dibvam" v-if="dataHeadShopInfo.is_super_buyer"></span> -->
				</div>
				<div class="icon-auth-list clearfix">
					<span>
						<span class="dibvam spritesmap score_icon"></span>
						<span class="icon-list-text">{{ parseFloat(dataHeadShopInfo.average_mark).toFixed(2) }}分</span>
					</span>
					<span v-if="dataHeadShopInfo.student">
						<span class="dibvam spritesmap" :class="{'student_ident':dataHeadShopInfo.student==1}"></span>
						<span class="icon-list-text">{{dataHeadShopInfo.category_name}}</span>
					</span>
        	<span>
        		<span class="spritesmap auth-user" v-if="dataHeadShopInfo.is_apply" :class="{'personal': dataHeadShopInfo.is_apply==1,'shop': dataHeadShopInfo.is_apply==2}"></span>
        		<span class="icon-list-text" v-if="dataHeadShopInfo.is_apply" :class="{'personal': dataHeadShopInfo.is_apply==1,'shop': dataHeadShopInfo.is_apply==2}"></span>
        	</span>
        </div>
			</div>
		</router-link>
		<div class="fr header-r clearfix">
			<div class="fl qr-code" @click="showBigQr" v-if="isShop">
				<img src="../../assets/img/shops_qrcode.png" alt="" data-statistics="click_qrcode">
			</div>
			<div class="follow fl" v-if="!isMine">
				<div v-if="!dataHead.is_followed" class="follow-in" data-statistics="click_follow"><span>+</span>关注</div>
				<div v-if="dataHead.is_followed" class="follow-in already-follow" data-statistics="click_unfollow"><span></span>已关注</div>
			</div>
			<div class="shop-setup fl" v-if="isMine">
				<router-link class="store_set shotsprites" to="/compete"></router-link>
			</div>
		</div>
	</header>
	<!-- 店铺头结束 -->

	<!-- 店铺拍品列表 -->
	<div class="shop-box" v-if="isShop">
		<nav class="shops-nav">
			<div class="nav-in clearfix">
				<div class="fl current nav" data-type="hot">热度</div>
				<div class="fl nav re" data-num="1">
					价格
					<span class="ab up"></span>
					<span class="ab dow"></span>
				</div>
				<div class="fl nav" data-type="soon">即将截拍</div>
			</div>
		</nav>
		<my-list id="my-list" :formatlist="formatlist" @childEvent="doLike"></my-list>
	</div>
	<!-- 店铺拍品列表结束 -->

	<!-- 买家信息头 -->
	<header class="shops-header buyer clearfix" v-if="isPersonal">
		<div class="fl header-l clearfix">
			<img :src="dataHeadShopInfo.user_thumb" class="fl">
			<div class="fl">
				<p class="shops-name">{{ dataHeadShopInfo.user_name }}<i class="shotsprites superbuyer-icon dibvam" style="margin-left:.6rem;" v-if='buyerData.is_super_buyer'></i></p>
				<!-- <span class="spritesmap crown_icon dibvam" v-if="buyerData.is_super_buyer"></span> -->
				<p class="shops-locat">所在地区：<span>{{ buyerData.address }}</span></p>
			</div>
		</div>
		<div class="fr header-r clearfix">
			<!-- <div class="fl qr-code" @click="showBigQr">
				<img src="../../assets/img/shops_qrcode.png" alt="">
			</div> -->
			<!-- 他人浏览我的首页 -->
			<div class="follow fl" v-if="!isMine">
				<div v-if="!dataHead.is_followed" class="follow-in"><span>+</span>关注</div>
				<div v-if="dataHead.is_followed" class="follow-in already-follow"><span></span>已关注</div>
			</div>
			<!-- 自己浏览自己的首页 -->
			<div class="shop-setup fl" v-if="isMine">
				<router-link class="store_set shotsprites" to="/buyerset"></router-link>
			</div>
		</div>
	</header>
	<!-- 买家信息头结束 -->

	<!-- 个人关注店铺 -->
	<div class="info-box" v-if="isPersonal">
		<div class="buyer-data">
			<div class="buyer-data-item">
				<p>买家等级 <span>LV{{ buyerData.experience_type }}</span><span class="spritesmap unknown-icon" @click="displayRule()"></span></p>
				<p><i class="special-word">经验 </i><span class="special-number">&nbsp;{{ buyerData.experience }}</span></p>
			</div>
			<div class="buyer-data-item">
				<p>退货比例 <span>{{ buyerData.refund_ratio }}%</span></p>
				<p>违约比例 <span>{{ buyerData.breach_ratio }}%</span></p>
			</div>
		</div>
		<div class="news-introduce">
			<p v-if="isMine"><span>手机</span>{{ buyerData.mobile }}</p>
		</div>
		<div class="news-introduce" v-if='buyerData.is_super_buyer'>
			<p><span>超级买家</span><i class="shotsprites superbuyer-icon dibvam"></i>已认证超级买家</p>
		</div>
    <div class='news-introduce' v-if='buyerData.chengjiao==1'>
        <!-- v-if='buyerData.chengjiao==1' -->
       <p class='cls'><span class='introduce-title fl'>联系买家</span><span class='introduce-mobile fl'>{{ buyerData.mobile }}</span><a :href='"tel:"+buyerData.mobile' class='shotsprites introduce-call fr'></a><a :href='"/newschat/"+dataHeadShopInfo.userid+"/0"' class='shotsprites introduce-chat fr'></a></p> 
    </div> 
		<div class="news-content" v-if='buyerData.num>0'>
			<div class="news-con-title clearfix">
				<p class="fl">TA关注的</p>
				<p class="fr">
					<!-- 不可与外人见者 -->
					<router-link to="/items/govern/2" v-if="isMine">
						已关注{{ buyerData.num }}家店铺
					</router-link>
					<span v-if="!isMine">
						已关注{{ buyerData.num }}家店铺
					</span>
				</p>
			</div>
			<div class="user-con clearfix">
				<!-- 不可与为人见者 -->
				<router-link 
					class="user-list fl" 
					:to="'/shops/' + item.id + '?type=2'" 
					v-for="(item,key) in buyerData.shop_info"
					:key="key"
					v-if="isMine"
				>
					<div class="divbg" :style="{backgroundImage:'url(' + item.thumb + ')'}"></div>
					<p class="text-overflow">{{ item.name }}</p>
				</router-link>
				<div 
					class="user-list fl" 
					v-for="(item,key) in buyerData.shop_info"
					:key="key"
					v-if="!isMine"
				>
					<div class="divbg" :style="{backgroundImage:'url(' + item.thumb + ')'}"></div>
					<p class="text-overflow">{{ item.name }}</p>
				</div>
			</div>
		</div>
	</div>
	<!-- 个人关注店铺结束 -->

	<!-- 等级规则弹窗 -->
	<modal-box v-show="showModalBox" :title="modalBoxTitle" :content="modalBoxContent" @closeBox="closeModalBox"></modal-box>

	<!-- 生成Qrcode弹窗 -->
	<qrcode  v-show="showQr" :dataInfo="dataHeadShopInfo" @closeBox="closeBigQr" :qrcode="qrcode"></qrcode>		
	
	<!-- 底部栏 -->
	<my-footer :userid="dataHeadShopInfo.userid" v-if="!isMine"></my-footer>

	<!-- 微信分享 -->
	<wx-share :message="wxShareObj"></wx-share>
</div>
</template>
<script>

	var modalBox = require("@/components/component/modalBox");
	var qrcode = require("@/components/component/storeQrcode");
	var list = require("@/components/classify/classify-list");
	var footer = require("@/components/classify/classify-footer");
	var sharePage = require("@/components/component/shareSub");
	var ajax = require('ajax');
	var utils = require('utils');
	

    export default {
		data: function() {
			return {
				// 该js文件中 shopId 皆作为 userId 处理
				dataHead: [],			// 头部信息
				dataHeadShopInfo: {},   // 头部店铺信息
				formatlist: [],         // 拍品列表
				buyerData: [],          // 买家信息页  
				sellerData: {},         // 卖家首页
				pageType: '',           // 买家信息页：0 | 卖家信息页：1 | 店铺首页：2      
				qrcode: '',
				page: 1,
				type: 1,                // 当前分类 
				showQr: false,          // 二维码弹窗
				isShop: true,           // 店铺信息页
				isShopIndex: false,     // 店铺首页
				isPersonal: false,      // 买家信息页
				isMine: false,          // 当前登录用户是否自己   
				// 微信分享
				wxShareObj: {},
				showModalBox: false,     // 等级规则说明
				modalBoxTitle: "",      // 规则说明标题
				modalBoxContent: "",    // 规则说明内容

			}
		},
		
		created: function() {
			// 初始数据
			this.initData()
		},
		mounted: function(){
			this.bindClickEvent();	

			setTimeout( () => {
				$( 'body' ).animate({scrollTop:0}, 0 );
			},100)
			
		},
		watch: {
			'$route': ["bindClickEvent","initData"]
		},
		components:{
			"my-list": list,
			"my-footer": footer,
			"wx-share": sharePage,
			"qrcode": qrcode,
			"modal-box": modalBox
		},
		methods: {
			// 初始化数据
			initData: function() {
				// 置空 初始化会无数据
				this.formatlist = [];
				this.page = 1;
				this.type = 1;
				var _this = this;
				var shopId = this.$route.params.id;
				// 店铺头
				this.getHeadData()

				// 店铺二维码
				this.getShopQrcode()
				
				// 点赞 / 关注 / 出价 ==> 参数 type=2
				// 买家信息页         ==> 参数 type=0
				// 卖价信息页         ==> 参数 type=1
				this.judgePage();

				// 获取拍品列表
				this.getShopInfoData(shopId,_this.type,_this.page)

				// 下拉加载
				utils.dropLoading(function() {
					_this.getShopInfoData(shopId,_this.type,_this.page)
				})

				// 添加浏览量
				this.addShopView(shopId)

				// 等级规则说明
				this.modalBoxTitle = "经验值规则";
				this.modalBoxContent = `
								<p class="empirical-point">拍品成交价/10 = 交易买家经验值 <span>(取整,单笔交易最少积1经验值)</span></p>
								<p>1.每笔订单经验值上限为1000经验。经验值于交易完成用户评价后自动转化。</p>
								<p>2.违约订单扣除应得经验值的双倍。</p>
								<p>3.当面交易没有经验值。</p>
								<div class="radius">
									<table border="1" class="buyer-info">
										<tbody>
											<tr>
												<th colspan="2" class="empirical-title">用户等级</th>
											</tr>
											<tr>
												<td><span class="spritesmap buyer-level s1"></span></td>
												<td class="">0-200</td>
											</tr>
											<tr>
												<td><span class="spritesmap buyer-level s2"></span></td>
												<td>201-2000</td>
											</tr>
											<tr>
												<td><span class="spritesmap buyer-level s3"></span></td>
												<td>2001-5000</td>
											</tr>
											<tr>
												<td><span class="spritesmap buyer-level s4"></span></td>
												<td>5001-20000</td>
											</tr>
											<tr>
												<td><span class="spritesmap buyer-level s5"></span></td>
												<td>20001以上</td>
											</tr>
										</tbody>
									</table>
								</div>
								`
			},

			// 重新绑定点击事件
			bindClickEvent: function() {
				this.$nextTick(() => {
					var shopId = this.$route.params.id;
					var _this = this;
					// 页面逻辑
					$(".shops-nav .nav").on('click', function() {
						_this.formatlist = [];
						_this.page = 1;
						$(this).addClass("current").siblings().removeClass("current");
						if( $(this).attr("data-num")=="1" ){
							// 价格排序 向上 升序
							$(this).children(".up").addClass("upcur");
							$(this).children(".dow").removeClass("dowcur");
							$(this).attr("data-num","2");
							// 升序
							_this.type = 2;
							_this.getShopInfoData(shopId,2,_this.page)
						} else if ( $(this).attr("data-num")=="2" ){
							// 价格排序 降序
							$(this).children(".dow").addClass("dowcur");
							$(this).children(".up").removeClass("upcur");
							$(this).attr("data-num","1");
							// 降序
							_this.type = 3;
							_this.getShopInfoData(shopId,3,_this.page)
						} else {
							// 处理热度 && 即将截拍 情况
							$(".shops-nav .nav").eq(1).attr("data-num","1");
							$(".shops-nav .nav .dow").removeClass("dowcur");
							$(".shops-nav .nav .up").removeClass("upcur");
							if ( $(this).attr("data-type")=="hot" ) {
								// 热度排序
								_this.type = 1;
								_this.getShopInfoData(shopId,1,_this.page)
							} else if ( $(this).attr("data-type")=="soon" ) {
								// 即将截拍
								_this.type = 4;
								_this.getShopInfoData(shopId,4,_this.page)
							}
						}
					});

		            //只能关注一次
		            $(".follow .follow-in").click(function(){
		            	var that = this;
		            	var state = 0;
		            	var objname = $(this).hasClass("already-follow");
		                //objname  是true 说明是已关注   是false  说明没有关注
		                objname?state=0:state=1; 
		            	var userid = _this.dataHead.shop_info.userid;
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
				})
			},

			// 闭合说明规则
			closeModalBox: function() {
				this.showModalBox = false;
			},

			// 等级介绍
			displayRule: function() {
				this.showModalBox = true;
			},

			// 浏览量添加
            addShopView: function(shopId) {
	            ajax.addShopView(shopId,function(res){
					if (res.status == 200) {
						// 添加浏览量成功
					};
	            })
            },

            // 重新设置title
            getTitleName: function() {
            	//this.dataHeadShopInfo.user_name = 
            },

			//商铺头部
			getHeadData: function() {
				var _this = this;
				var shopId = this.$route.params.id;
				var type = utils.getRequest().type;
				ajax.getShopHead(shopId,function(data) {
					if (data.status == 200) {
						_this.dataHead = data.data;
						_this.dataHeadShopInfo = data.data.shop_info;
						//判断当前 是否是本人
						if(type!=0){
							var userid = _this.dataHeadShopInfo.userid;  // 当前查看店铺的userid
							var nowuid = _this.dataHead.current_userid;    // 当前登录者 userid
							if (userid == nowuid) {
								_this.isMine = true;
							} else {
								_this.isMine = false;
							}
						}else{
							_this.isMine = true;
						}
						

					} else {
						alert(data.msg);
						// _this.$router.replace('/*');
					}
				})
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

			// 判定页面
			judgePage: function() {
				var userId = this.$route.params.id;
				var type = utils.getRequest().type;
				if (type == 2 || type == 0) {
					this.buyerInfo();
				};
			},

			// 商铺商品页面
			getShopInfoData: function(shopId,type,page) {
				var _this = this;
				/**
				 *  shop_id	是	id	店铺名称
					type	是	int	排序方式 1 热度 2 价格增 3 价格减 4 即将结束
					page	是	int	请求页码
				 */
				ajax.getShopIndex(shopId,type,page,function(data) {
					if (data.status == 200) {
						_this.page++
						for (var i = 0; i < data.data.goodsInfo.length; i++) {
							// 格式图片格式
							if ( data.data.goodsInfo[i].thumb) {
								data.data.goodsInfo[i].thumb = JSON.parse( data.data.goodsInfo[i].thumb )
							};
							_this.formatlist.push(data.data.goodsInfo[i])
						};
					} else {
						alert(data.msg)
						// _this.$router.push('/*');
					}
				})
			},

			// 买家信息页
			buyerInfo: function() {
				var _this = this;
				var shopId = this.$route.params.id;
				var type = utils.getRequest().type;
				ajax.avatorClick(shopId,type,function(data){
					if (data.status == 200) {
						// 判断msg: msg=1[买家信息] | msg=2[卖家信息] | msg=3[卖家首页]
						switch (data.msg) {
							case '3':
								_this.isShop = true;
								_this.isShopIndex = false;
								_this.isPersonal = false;

								// 店铺首页数据
								_this.getShopInfoData(shopId,_this.type,_this.page);

								// 卖家首页分享
								var classifyName = _this.dataHead.type_one;
								if (classifyName == '书画篆刻' || classifyName == '书画专场') {
									_this.wxShareObj.title = _this.dataHeadShopInfo.user_name + '-艺术工作室';
									_this.wxShareObj.desc = '我的线上艺术工作室，欢迎关注点赞。点我，立刻欣赏收藏作品！';
								} else {
									_this.wxShareObj.title = '【' + _this.dataHeadShopInfo.user_name + '】店铺-小福拍';
									_this.wxShareObj.desc = '强烈推荐这家良心店铺，有宝贝能捡漏，来搜一下！';
								}	

								_this.wxShareObj.images = _this.dataHeadShopInfo.user_thumb; 
								_this.wxShareObj.url = location.href;

								document.title= _this.dataHeadShopInfo.user_name + "的小福拍"


								// _this.buyerData.length = 8;
								break;
							case '1':
								_this.isShop = false;
								_this.isShopIndex = false;
								_this.isPersonal = true;

								// 买家信息页数据
								_this.buyerData = data.data;
								// 处理展示数据长度
								if (data.data.shop_info.length > 8) {
									_this.buyerData.shop_info = data.data.shop_info.slice(0,8);
								}

								// 买家首页分享
								_this.wxShareObj.title = '【' + _this.dataHeadShopInfo.user_name + '】小福拍个人信息';
								_this.wxShareObj.images = _this.dataHeadShopInfo.user_thumb; 
								_this.wxShareObj.url = location.href;
								_this.wxShareObj.desc = '【' + _this.dataHeadShopInfo.user_name + '】小福拍个人信息';

								document.title= _this.dataHeadShopInfo.user_name + "的个人信息"
								_this.buyerData.length = 8;
								break;
							default:
								throw new Error("该页面不存在")
								alert(data.msg)
								// _this.$router.replace('/*');
						}
					} 
				})
			},

			// 格式图片文件
			formatThumb: function(jsondata) {
				var _this = this;

				this.formatlist.forEach(function(item,index){
					_this.formatlist[index].thumb = JSON.parse( item.thumb )
				})
			},

			//点赞模块
			doLike: function(ev,id) {
				var $node = $(ev.target);
				if (!$node.hasClass('imglikecur')) {
					//一个用户只能点一次
	                var num=parseInt($node.text())+1;
	                ajax.userLike(id,function(res) {
	                	if (res.status == 200) {
	                		$node.addClass("imglikecur").text(num);
	                	};
	                })
	                //浏览量加一
	                // var key=parseInt($(this).siblings(".imgbrowse").text())+1
	                // $(this).siblings(".imgbrowse").text(key);
				};
			},

			// 二维码弹窗
			showBigQr: function() {
				var _this = this;
				this.showQr = true;
			},

			// 生成图片
			createImg: function() {
				if ( $('#bigQr') ) {
					html2canvas(document.getElementById('bigQr'), {
				        onrendered: function(canvas) {
				        	// 使用canvas替换掉原dom样式 如果已经存在就不再添加
				        	if( $("#bigImg canvas").length == 0 ) {
				        		$("#bigImg").append(canvas)
				        	}
				        	$('#bigQr').hide();
				        }
				    });
				};
				
			},

			// 关闭弹窗
			closeBigQr: function() {
				$('#bigQr').show();
				this.showQr = false;
			}
		}
	}

</script>
<style scoped>
.student_ident {
	margin: 0;
}

.shops-header {
	position: fixed;
	top: 0;
	z-index: 1;
	width: 100%;
	padding: 1.6rem 0;
	border-bottom: 1px solid #c5c5c5;
	background-color: #fff;
}

.shops-header.buyer {
	border-bottom: none;
}

.icon-list-text.personal:after {
	content: '个人认证';
}

.icon-list-text.shop:after {
	content: '企业认证';
}

.shops-header-title {
	width: 20rem;
	height: 2.8rem;
	line-height: 2rem;
}
.shops-header .header-l{
	width: 28rem;
	height: 4.5rem;
	padding-left: 1.5rem;
}
.shops-header .header-l img{
	width: 4.5rem;
	height: 4.5rem;
	border-radius: 50%;
	margin-right: 1rem;
}
.shops-header .header-l .shops-name{
	font-size: 1.4rem;
	color: #333;
	display: inline-block;
	vertical-align: middle;
	max-width: 14rem;
	white-space:nowrap; 
	overflow:hidden; 
	text-overflow:ellipsis;
}

.shops-locat {
	font-size: 1.4rem;
	color: #999;
}

.user-level,
.auth-user{
	display: inline-block;
	vertical-align: middle;
	margin-left: 0;
	margin-right: 1rem;
}

.icon-auth-list {
	margin-left: -1rem;
}
.auth-user {
	display: inline-block;
	margin-left: 1rem; 
	margin-right: .2rem;
}

.shops-header .header-l .fans {
	font-size: 1.3rem;
	color: #999;
}
.shops-header .header-r .qr-code{
	margin-top: 1.2rem;
	height: 2rem;
	width: 2rem;
}
.shops-header .qr-code img {
	width: 100%;
	height: 100%;
}
.shops-header .header-r .follow{
	height: 4.5rem;
	width: 7rem;
	padding:1rem 1rem 0 1rem;
}
.shop-setup {
	height: 4.5rem;
	width: 4rem;
	padding:1rem 1rem 0 1rem;
}
.shops-header .header-r .follow .follow-in{
	width: 5rem;
	height: 2.5rem;
	line-height: 2.2rem;
	text-align: center;
	border:1px solid #fa693c;
	font-size: 1.3rem;
	color: #fa693c;
	border-radius: 0.5rem;
}
.shops-header .header-r .follow .already-follow{
	color: #ccc;
	border-color: #ccc;
}
.shops-header .header-r .follow span{
	font-size: 1.7rem;
}
.shops-header .header-r .curfollow .follow-in{
	border-color: #fa693c;
	color: #fa693c;
}
.shops-nav {
	position: fixed;
	top: 7.6rem;
	z-index: 1;
	width: 100%;
	height: 4.5rem;
	border-top: 1px solid #ccc;
}
.shops-nav .nav-in{
	height: 4.5rem;
	/*border-bottom: 1px solid #c5c5c5;*/
	background-color: #fff;
}
.shops-nav .nav-in .nav{
	width: 33.333%;
	height: 4.45rem;
	line-height: 4.45rem;
	text-align: center;
	border-bottom:0.25rem solid #fff;
	font-size: 1.4rem;
	color: #333;
}
.shops-nav .nav-in .nav span{
	left: 50%;
	top: 50%;
	width: 0;
	height: 0;
	margin-left: 2rem;
	border-left: 0.4rem solid transparent;
    border-right: 0.4rem solid transparent;
}
.shops-nav .nav-in .nav .up{
	margin-top: -0.3rem;
    border-bottom: 0.4rem solid #999;
}
.shops-nav .nav-in .nav .upcur{
	border-bottom-color: #ad1a1a;
}
.shops-nav .nav-in .nav .dow{
	margin-top: 0.3rem;
    border-top: 0.4rem solid #999;
}
.shops-nav .nav-in .nav .dowcur{
	border-top-color: #ad1a1a;
}
.shops-nav .nav-in .current{
	color: #ad1a1a;
	border-bottom-color: #ad1a1a;
}
.shops-index .cyformat{
	padding: 1rem 0 0 1rem;
	padding-bottom: 5rem;
}
.shop-box {
	margin-top: 12rem
}
.shop-info-box {
	margin-top: 9rem;
}
/*个人信息首页*/
.news-introduce{
	margin:1rem 0;
	padding:0 1rem;
	background-color: #fff;
}
.news-introduce p{
	min-height: 4.5rem;
	line-height: 4.5rem;
	font-size: 1.4rem;
	color: #999;
}
.news-introduce p:first-child{
	border-bottom: 1px solid #e5e5e5;
}
.news-introduce p:last-child{
	border-bottom: none;
}
.news-introduce p span{
	color: #333;
	margin-right: 3rem;
}
.news-introduce>p>span.introdece-title{
    color: #333;
    margin-right: 3rem;
}
.news-introduce p .introduce-mobile{
    color: #999;
}
.introduce-call{
    width: 1.85rem;
    height: 1.85rem;
    margin-top: 1.3rem;
    /* background-position: -17.2rem -25.25rem; */
     background-position: -20.15rem -25.25rem;
}
.introduce-chat{
    width:  1.9rem;
    height: 1.9rem;
    margin-top: 1.3rem;
    margin-right: 1.5rem;
   background-position: -17.1rem -25.2rem
}
.news-content{
	padding-left: 1rem;
	background-color: #fff;
}
.news-content .news-con-title{
	border-bottom: 1px solid #e5e5e5;
	height: 4.5rem;
	line-height: 4.5rem;
	color: #333;
	font-size: 1.4rem
}
.news-content .news-con-title p:last-child{
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
.news-content .user-con{
	margin-left: -1rem;
	padding:1.5rem 0 0.75rem;
}
.news-content .user-con .user-list{
	width: 7.5rem;
	height: 8.5rem;
	margin:0 0.9rem;
}
.news-content .user-con .user-list div{
	width: 5.5rem;
	height: 5.5rem;
	border-radius: 50%;
	margin:0 auto;
}
.news-content .user-con .user-list p{
	font-size: 1.3rem;
	color: #333;
	text-align: center;
	line-height: 3rem;
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
.info-box {
	margin-top: 8.7rem;
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

.video-box {
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

.buyer-data {
	display: flex;
	width: 100%;
	margin-top: -1rem;
	background-color: #fff;
}
.buyer-data-item {
	flex: 1;
	height: 4.5rem;
	line-height: 2rem;
	margin: 1.8rem 0;
	/*text-align: center;*/
	text-indent: 4rem;
	font-size: 1.3rem;
	color: #333;
}

.buyer-data-item:first-child {
	border-right: 1px solid #999;
}

.buyer-data-item p {
	position: relative;
}

.unknown-icon {
	position: absolute;
	top: .2rem;
	right: 2rem;
}

.special-word {
	display: inline-block;
	text-indent: 0rem;
	width: 5rem;
	font-style: normal;
}

.special-word:first-letter {
	letter-spacing: 2.4rem;
}
.buyer-data-item span {
	padding-left: 1.5rem;
	color: #999;
}

/*二维码*/
.propup-qr div {   
    -webkit-touch-callout:none;  /*系统默认菜单被禁用*/   
    -webkit-user-select:none; /*webkit浏览器*/   
    -khtml-user-select:none; /*早期浏览器*/   
    -moz-user-select:none;/*火狐*/   
    -ms-user-select:none; /*IE10*/   
    user-select:none;   
}  
.propup-qr {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.4);
}
#bigImg ,
.bigQr {
	position: absolute;
	left: 50%;
	top: 5rem;
	width: 34.8rem;
	height: 51.3rem;
	-webkit-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		 -o-transform: translateX(-50%);
			transform: translateX(-50%);
	border-radius: 1.3rem;
	background-color: #fff;
}
.bigQr-inner {
	margin: 1.3rem;
	width: 32rem;
	height: 47.5rem;
	padding: 1.9rem 1.4rem;
	background: url(../../assets/img/qrcode_bg.png) no-repeat;
	background-size: 100% 100%;
}
.bigQr-logo {
	width: 7.9rem;
	height: 2.4rem;
	background: url(../../assets/img/qr_logo.png) no-repeat;
	background-size: 100% 100%;
}
.bigQr-head {
	width: 100%;
	height: 12.6rem;
	margin-top: -0.6rem;
	text-align: center;
}

.bigQr-avator {
	display: inline-block;
	width: 9rem;
	height: 9rem;
	overflow: hidden;
	border-radius: 50%;
}
.bigQr-avator img {
	width: 100%;
	height: 100%;
}
.bigQr-name {
	margin-top: 0.6rem;
	font-family: PingFangSC;
	font-size: 1.6rem;
	color: #333;
}
.bigQr-recommend {
	width: 29rem;
	height: 2.7rem;
	margin-top: 1rem;
	line-height: 2.7rem;
	background-color: #ad1a1a;
	text-align: center;
	font-family: PingFangSC;
	font-size: 1.4rem;
	color: #fff;
}
.bigQr-codebox {
	position: relative;
	text-align: center;
}
.bigQr-code {
	display: inline-block;
	width: 25.7rem;
	height: 25.7rem;
}
.bigQr-code img {
	display: inline-block;
	width: 100%;
	height: 100%;
}
.bigQr-tip {
	position: absolute;
	bottom: 3rem;
	width: 100%;
	text-align: center;
	font-family: PingFangSC;
	font-size: 1.4rem;
	color: #000;
}

</style>
