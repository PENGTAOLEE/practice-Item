<template>
<div class="detailslist" v-if="detailsBoll">
	<div v-for="(item,index) in details" class="follow-item" :class="'goods-id' + item.id" :data-index="index" :data-id="item.id">
		<div class="follow-list">
		<div class="follow-author clearfix">
				<!-- 跳转店铺首页 -->
				<router-link :to="/shops/  + item.user_id + '?type=2' " class="clearfix fl">
					<img :src="item.usethumb" class="fl">
					<div class="author fl">
						<div class="name" v-if="item.name !== undefined">{{ item.name }}</div>
						<div class="name" v-if="item.nick !== undefined">{{ item.nick }}</div>
						<div class="time">
							<span class="fl shotsprites"></span>
							{{ item.created_at }}
						</div>
					</div>
				</router-link>
				<!-- 根据 item.status判断 -->
				<div v-if="item.status == 1 || item.status == 2" class="fr auction-status is-auction">正在拍卖</div>
				<div v-if="item.status == 3 || item.status == 4" class="fr auction-status is-auction end-auction">拍卖结束</div>
		</div>
		<p class="follow-copy re text-overflows">
			<router-link :to="'/lotdetails/'+item.id" style="color:#333;" class="text-overflows">
				{{ item.desc }}
			</router-link>
			<span class="ab copybtn" v-if="item.desc.length >= 75" @click="copybtn($event)">显示全部</span>
		</p>
		<!-- 商品图片数量 -->
		<ul class="list-img clearfix">
			<li class="fl" v-for="(itemImg,indexImg) in item.images">
				<img v-if="itemImg.type == 'img' " data-type="img" :src="baseUrl + itemImg.url + '?x-oss-process=style/erweima_mark'" alt="goods img">
				<!-- 处理视频文件 -->
				<div v-if="itemImg.type == 'video' " class="video-box">
					<!-- <video class="video-el" :src="baseUrlVideo + itemImg.url"></video> -->
					<img class="video-box-img" src="/res/img/video_ns_2.jpg" alt="">
					<video 
						:src="baseUrlVideo + itemImg.url"
						:data-src="itemImg.url"
						class="video-el" 
						poster="/res/img/video_ns_2.jpg"
						preload="load" 
					>
					   Your browser does not support the video tag.
					</video> 
					<span class="video-bg" @touchend="showBigImg" data-type="video"></span>
				</div>
			</li>
		</ul>
		<!-- 点赞人数 -->
		<ul class="list-people clearfix re peoplemore">
			<li  
				class="fl divbg people"
				v-for="itemLike in item.likeImg"
			>
				<router-link :to="'/shops/' + itemLike.id + '?type=2'">
					<img :src="itemLike.useimg" alt="">
				</router-link>	
			</li>
			<!-- 超过十人显示 -->
			<li class="ab morebtn shotsprites" v-if="item.likeImg.length >= 10" @click="morebtn($event)"></li>
		</ul>
		<div class="follow-state clearfix">
			<div class="fl free-shipping" v-if="item.is_mail">包邮</div>
			<div class="fl return" v-if="item.is_refund">包退</div>
			<!-- 下架功能 -->
			<div class="fl off-shelf" v-if="item.is_self && item.status==1" @click="showPopup">下架</div>
			<!-- 是否已经点赞 -->
			<div 
				class="fr imglike" 
				:data-goodsid="item.id" 
				:data-num="index" 
				:class="{ 'imglikecur': item.likestatus}" 
				:id="'goods-'+ item.id "
				@click="doLikes"
			>{{ item.likes }}</div>
			<div class="fr imgbrowse">{{ item.views }}</div>
		</div>
		<!-- 倒计时 -->
		<div v-if="item.status == 1 || item.status == 2" class="cutdown-box" :id="'time_down_'+ item.id">
			<div 
				class="follow-time keynum" 
				:data-startTime="item.inputtime" 
				:data-endTime="item.end_time"
				:data-id="index"
			>距离结束：<span>00</span>时<span>00</span>分<span>00</span>秒</div>
			<div 
				class="follow-offer startoffer" 
				:data-mobile="item.nowmobile" 
				:data-maxbid="item.current_price" 
				:data-step="item.increase_price" 
				:data-userid="item.user_id"
				:data-goodsid="item.id"
				:data-start="item.start_price"
				@click="validateBid($event)"
			>出价</div>
		</div>
		<div v-if="item.status == 3 || item.status == 4" class="follow-offer grey"> 拍卖结束</div>
		<div class="follow-offer grey end-offer-grey"> 拍卖结束</div>
		<div class="follow-bond clearfix">
			<p class="fl"><span>起</span>￥{{ item.start_price }}元</p>
			<p class="fl"><span>保</span>￥{{ item.deposit_price }}元</p>
			<p class="fl"><span>加</span>￥{{ item.increase_price }}元</p>
		</div>
		<div class="follow-price clearfix">
			<p class="fl" v-if="item.refer_price != 0">
				<span>参考价</span>￥{{ item.refer_price }}元
			</p>
			<p class="fl" v-if="item.once_price != 0">
				<span>一口价</span>￥{{ item.once_price }}元
			</p>
		</div>
		<!-- 出价人列表 -->
		<div class="list-offer">
			<ul class="list-offer-more">
				<div class="list-item" v-if="item.bid.data">
					<li v-for="(bidItem,bidIndex) in item.bid.data" :data-userid="bidItem.user_id">
						<div class="clearfix offer-in">
							<router-link :to="'/shops/' + bidItem.user_id + '?type=2'">
								<img :src="bidItem.usethumb" class="fl">
							</router-link>
							
							<div class="fl name">
								<span>{{ bidItem.name }}</span><br/>
								{{ bidItem.bid_time }}
							</div>
							<div class="fr state">
								¥{{ bidItem.bid_price }}
								<span v-if="bidIndex == 0" class="deal-one">领先</span>
								<span v-if="bidIndex != 0">出局</span>
							</div>
						</div>
					</li>
					<div class="offer-more-btn" v-if="item.bid.data.length >= 5" :data-id="item.id" :data-index="index" :data-total="item.bid.page_num"  @click="offermore($event)">更多</div>
				</div>
			</ul>
			
		</div>
	</div>
	<!-- Over -->
	<!-- 出价弹框 v-show="showOfferBox" -->
	<div class="offer-box fixed" @click="cancelOfferOuter($event)">
		<!-- 金额 -->
		<div class="fixed offerbg offer-money" v-show="showMoney">
			<div class="money re offerinput">
				<label class="ab label" for="money-in">出价</label>
				<input type="number" class="money-in input-select" id="money-in" v-model="offerInput">
			</div>
			<!-- 一口价 -->
			<div class="offer-btn-box" v-if="item.once_price != 0">
				<div class="price-fixed" @click.stop="setOncePrice" :data-onceprice="item.once_price">一口价 ￥{{ item.once_price }}</div>
				<div class="offerbtnbg offer-lpt" :data-goodsid="item.id" :data-onceprice="item.once_price" @click.stop="oncePrice">出价</div>
			</div>
			
			<!-- 未设置一口价 -->
			<div class="offerbtnbg offer-btn" v-if="item.once_price == 0" :data-goodsid="item.id" @click.stop="offerAmount">出价</div>
			
			<p class="offer-agreement">出价即表示同意
				<a href="https://mp.weixin.qq.com/s?__biz=MzI3OTU4Mjk0Mw==&mid=2247483667&idx=1&sn=cb644d552de5e1339718da1dd47d6238&chksm=eb44c0a3dc3349b5cb2140ce84210b1f2297165ccdf2065e8cb3555ac36c0b2b14a34483f42d#rd">	
					<span>《微拍竞拍服务协议》</span>
				</a>
			</p>
		</div>
		<!-- 单次加价幅度 -->
		<div class="ab offerbg offer-tip" v-show="showTip">
			<div class="offer-tip-text">每次加价幅度最少100元</div>
			<div class="offerbtnbg offer-btn tip" @click="">知道了</div>
		</div>
		<!-- 支付保证金 -->
		<div class="fixed offerbg offer-bond" v-show="showBond">
			<p class="explain">本商家已设置出价保护，您本次出价需要支付保证金。如违约保证金将扣除并支付给卖家</p>
			<div class="payment-bond offerbtnbg" @click="payBond">支付保证金</div>
			<div class="cancel-bond offerbtnbg"  @click="cancelOffer">取消</div>
		</div>
		<!-- 手机号 -->
		<div class="fixed offerbg mobile" v-show="showMobile">
			<input type="number" class="mobile-num offerinput input-select" v-model="mobileNum" placeholder="请输入手机号">
			<div v-if="mobileNum == false" class="offerbtnbg mobile-btn" style="background-color:#ddd;">下一步</div>
			<div v-if="mobileNum != false" class="offerbtnbg mobile-btn" @click="nextStep">下一步</div>
		</div>
		<!-- 验证码 -->
		<div class="fixed offerbg verification" v-show="showVerCode">
			<p class="vn-title">验证码已发送</p>
			<div class="vn-in clearfix">
				<input type="text" class="fl vn-left offerinput input-select sms-code" v-model="smsInput" placeholder="验证码">
				<div v-if="smsVerBoll == false" class="fr vn-right offerinput countdown-lpt" data-type="not">60s后重新获取</div>
				<div v-if="smsVerBoll == true" class="fr vn-right offerinput clickEle" @click="sendCode" data-type="ok">获取验证码</div>
			</div>
			<!-- 手机短信验证 -->
			<div class="offerbtnbg vn-btn" @click="sendToBackend">确认</div>
		</div>
	</div>
	</div>

	<!-- 图片/视频 弹窗 -->
	<div class="poupu-box" v-show="showBigImgBol">
		<div class="poupu-layer" @click="closeBigImg"></div>
		<!-- 展示视频 -->
		<div class="popup-video-box">
			<video 
				id="my-video" 
				:src="videoSrc" 
				autoplay 
			>
				您的浏览器不支持浏览该视频，请升级版本
			</video>
		</div>
	</div>

	<!-- 二维码弹窗 -->
	<div class="qrcode-wrap" @click="colseQrcodeWrap" v-if="qrcodeWrap">
		<div class="qrcode-content">
			<!-- 应急解决方案 -->
			<img src="/res/img/qrcode_weixin.png" alt="">
			<!-- <div class="qrcode">
				<img src="/res/img/qrcode_xiaofupai.png" alt="">
			</div>
			<div class="qrcode-desc">
				<div class="qrcode-desc-h2">长按识别图中二维码</div>
				<div class="qrcode-desc-p">
					关注我们，立即出价<br/>
					心仪的宝贝，怎么能拱手让人
				</div>
			</div> -->
		</div>
	</div>

	<!-- 通用弹窗 -->
	<my-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></my-alert>

	

</div>

</template>
<script>
module.exports = {
	
    var myAlert = require("showAlert")
    var wx = require("http://res.wx.qq.com/open/js/jweixin-1.0.0.js");
    var ajax = require('ajax');
    var utils = require("utils");
    var config = require("config.json");
	return {
        data: function() {
            return {
                detailsBoll: true,                  // 页面容器 
                // 渲染数据
                // dataList: [],
                // dom数据
                showBigImgBol: false,               // 点击图片显示大图
                
                showMoney: false,                   // 出价输入框               
                showTip: false,                     // 原设计提示弹窗 
                showBond: false,                    // 保证金
                showMobile: false,                  // 手机号
                showVerCode: false,                 // 验证码
                // 出价相关
                mobileNum: '',                      // 用户输入的手机号
                smsVerBoll: false,                  // 短信验证码弹窗
                timer: null,                        // 验证码定时器
                smsInput: '',                       // 短信验证码输入
                offerInput: '',                     // 出价金额输入
                maxbid: '',                         // 最高出价
                increasePrice: '',                  // 加价
                startPrice: '',                     // 起拍价
                uniformPrice: '',                   // 用户设置一口价金额
                goodsIdNow: '',                     // 拍品ID
                myMobile: '',                       // 当前用户手机号
                bidPage: 1,                         // 出价列表页数
                totalBidPage: '',                   // 总页数
                isMore: true,                       // 是否可以加载更多
                imgSrc: '',                         // 图片链接    
                videoSrc: '',                       // 视频链接
                userName: '',                       // 当前用户名
                userAvator: '',                     // 当前用户头像
                nowuId: '',                         // 当前用户id

                paymentUrl: '',                     // 诚信保证金 商品保证金 区分
                baseUrl: config.img_url,            // 图片
                baseUrlVideo: "http://xfpvideoupload.oss-cn-beijing.aliyuncs.com/", // 视频未转码
                baseUrlVideoTrans : "http://xfpvideo.oss-cn-beijing.aliyuncs.com/",       // 视频转码
                       
                // 弹窗
                showAlertBoll: false,
                tipMsg: '',
                timeCountDownId: [],

                // 二维码
                qrcodeWrap: false,                  // 二维码弹窗


            }
        },
		props: ['details'],
        components: {
            'my-alert': myAlert
        },
		
        created: function() {
        },
        mounted: function(){
            // 格式化图片
            this.formatImgs();

            // 判定是否是通过支付完保证金跳进来的
            this.$nextTick(function(){
                var from = utils.getRequest().from;
                var goodsid = this.$route.params.id || utils.getRequest().goodsid;
                try {
                    if (from == 'complete') {
                        $(document).scrollTop(window.localStorage.getItem('scroll_top') )
                        var $offerNode = $('.goods-id'+goodsid).find('.startoffer');
                        $('.goods-id'+goodsid).find('.offer-box').show();
                        
                        // 获取需要的参数
                        this.maxbid         = $offerNode.attr("data-maxbid");
                        this.goodsIdNow     = $offerNode.attr("data-goodsid");
                        this.startPrice     = $offerNode.attr("data-start")
                        this.increasePrice  = $offerNode.attr("data-step");
                        
                        this.startoffer()
                    };
                } catch (e) {
                    console.log(e)
                }

            })


            // 微信预览图片
            this.$nextTick(function() {
                utils.wxPreviewImage($('.follow-item .list-img img'),'.list-img');
            })

        },
        computed: {
        },
        watch: {
            '$route' : ["formatImgs","winReload"]
        },
		methods: {
            // 关闭二维码弹窗
            colseQrcodeWrap: function() {
                $("body").css('overflow','auto');
                this.qrcodeWrap = false;
            },

            // 点赞
            doLikes: function(ev) {
                var _this   = this,
                    id      = $(ev.target).attr('data-goodsid'),
                    $node   = $('#goods-'+ id),
                    num     = parseInt($node.text()) + 1,
                    userAva = _this.details[0].nowImg,
                    userId  = _this.details[0].nowuid,
                    liked   = $node.hasClass("imglikecur"),
                    key     = parseInt($node.siblings(".imgbrowse").text())+1;
                if (!liked) {
                    ajax.userLike(id,function(data) {
                        if (data.status == 200) {
                            $node.addClass("imglikecur").text(num);
                            $node.siblings(".imgbrowse").text(key);
                            
                            var _index = $node.get(0).dataset.num;

                            _this.details[_index].likeImg.push({
                                id: data.data.userid,
                                useimg: data.data.userimg
                            })
                        } else if (data.status == 201 || data.status == 502) {
                            _this.showAlertTip(data.msg)
                        }
                    })
                };
            },

            /*
             * 点击店铺拍品 刷新页面
             * @return 无
             */
            winReload: function() {
                if (this.$route.params.id) {
                    this.detailsBoll = false;
                    this.detailsBoll = true;
                };
            },

            // 格式化图片
            formatImgs: function() {
                if (this.details) {
                    this.details.forEach(function(item,index){
                        if (typeof item.images == 'string') {
                            item.images && (item.images = JSON.parse(  item.images  ) )
                        };
                        
                    })
                };
            },

            // 播放视频
            showBigImg: function(ev) {
                var _this = this;
                var $event = $(ev.target);
                var $node = $(ev.target).prev('video');   // 视频标签节点
                var videoSrc = $node.attr('src');         // 视频整体地址
                var relativeSrc = $node.attr('data-src'); // 视频相对地址
                $node.css('top','0');
                // 转码视频
                this.videoSrc = this.baseUrlVideoTrans + relativeSrc;
                
                // 设备检测
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {// iphone
                    // iphone因为调用了safari的播放空间 需要把播放遮罩层移除
                    this.$nextTick(function(){
                        var video = $node;
                        $event.remove();
                        if(video[0].networkState == 3){
                            // 使用未转码视频
                            _this.videoSrc = _this.baseUrlVideo + relativeSrc;
                            
                            $node.attr('src',_this.videoSrc)
                            video[0].controls = false;
                            video[0].load();
                            _this.$nextTick(function(){
                                video[0].play();
                            });
                        } else {
                            video[0].controls = false;
                            video[0].load();
                            video[0].play();
                        }

                    });
                    
                } else if (/(Android)/i.test(navigator.userAgent)) { //安卓
                    this.$nextTick(function(){
                        var video = $node;
                        if(video[0].networkState == 3){
                            // 使用未转码视频
                            _this.videoSrc = _this.baseUrlVideo + relativeSrc;
                            
                            $node.attr('src',_this.videoSrc)
                            video[0].load();
                            _this.$nextTick(function(){
                                video[0].play();
                            });
                        } else {
                            video[0].load();
                            video[0].play();
                        }
                    });
                } else {
                    alert('请不要在pc端浏览该网页，谢谢')
                }; 
                
            },

            // video标签层级解决方案
            videoBug: function() {
                $('.list-img').find('.video-el').css('top','-9999999rem')
            },

            // 关闭视频
            closeBigImg: function() {
                this.showBigImgBol = false;
            },

            // 出价人数控制
            offermore: function(event) {
                // 出价人分页
                var _this = this;
                var index = $(event.target).attr('data-index');
                _this.totalBidPage = $(event.target).attr('data-total');
                $(event.target).siblings("ul").removeClass("list-offer-more");
                var goodsId = $(event.target).attr('data-id');
                var hasClassBoll = $(event.target).siblings("ul").hasClass("list-offer-more");

                if ($(event.target).text() == '收起') {
                    $(event.target).siblings("ul").addClass("list-offer-more")
                    $(event.target).text('更多')
                    try {
                        var deleteLen  = _this.details[index].bid.data.length - 5;
                        _this.details[index].bid.data.splice(5,deleteLen);
                    } catch (e) {
                        var deleteLen  = _this.details[index].bid.length - 5;
                        _this.details[index].bid.splice(5,deleteLen);
                    }
                    return
                };

                // 关注页 || 详情页
                if(!hasClassBoll){
                    _this.bidPage++
                    ajax.getBidList(goodsId, _this.bidPage, function(data) {
                        if (data.status == 200) {
                            var len = data.data.data.length;
                            if (len == 0) {
                                $(event.target).text("收起");
                                _this.bidPage = 1;
                            } else {
                                // 遍历进数组
                                for (var i = 0; i < len; i++) {
                                    _this.details[index].bid.data.push(data.data.data[i])
                                };
                            }
                        } else {
                            _this.showAlertTip(data.msg)
                        }
                    })
                }

            },

            // 文案控制
			copybtn: function(event) {
                var $node = $(event.target);
                $node.parent().toggleClass("text-overflows");
                if($node.parent().hasClass("text-overflows")){
                    $node.parent().removeClass("copy-stop");
                    $node.parent().find('a').addClass('text-overflows');
                    $node.html("显示全部");
                }else{
                    $node.parent().find('a').removeClass('text-overflows');
                    $node.parent().addClass("copy-stop");
                    $node.html("收起");
                }
            },

            // 点赞人数控制
            morebtn: function(event) {
                var $node = $(event.target);
                $node.parent().toggleClass("peoplemore");
                if($node.parent().hasClass("peoplemore")){
                    $node.addClass("ab")
                }else{
                    $node.removeClass("ab")
                }
            },
            // 关注列表 出价按钮点击
            validateBid: function(ev) {
                /*解决视频遮挡出价框的bug*/
                this.videoBug()
                /*end*/ 

                // 显示对应的出价dom
                var id = $(ev.target).attr('data-goodsid');
                var userid = $(ev.target).attr('data-userid');
                $('.goods-id'+id).find('.offer-box').show();

                    // 最大出价人dom元素
                var $maxBidder      = $('.goods-id'+id).find('.list-offer-more .list-item').children(":first"),
                    // 当前登录用户id
                    myId            = this.details[0].nowuid,
                    // 最大出价人id
                    maxBidderId;

                this.goodsIdNow     = $(ev.target).attr("data-goodsid");
                this.maxbid         = $(ev.target).attr("data-maxbid");
                this.startPrice     = $(ev.target).attr("data-start")
                this.increasePrice  = $(ev.target).attr("data-step");
                this.myMobile       = this.myMobile || $(ev.target).attr("data-mobile");

                if ( $maxBidder.length != 0 ) {
                    // 最高出价人
                    maxBidderId = $maxBidder.get(0).dataset.userid;
                }

                if ( myId == userid) {// 不能给你自出价
                    this.showAlertTip("请分享给朋友！不能给自己出价哦.")
                    $('.goods-id'+id).find('.offer-box').hide();
                } else if ( myId == maxBidderId) {// 当前登录人 与最高出价人id 进行对比
                    this.showAlertTip("当前出价已是最高，无需出价.")
                    $('.goods-id'+id).find('.offer-box').hide();
                } else if ( !this.myMobile ) {
                    // 验证手机号码
                    this.showMobile = true;
                    this.$nextTick(function(){
                        $('.mobile-num').focus()
                    })
                } else {
                    this.startoffer()
                }
            },

            //开始出价按钮
            //auther LL
            startoffer: function(){
                //如果当前价等于起拍价，则为无人出价
                if(this.maxbid == 0){
                    //如果是第一次出价
                    //没有起拍价
                    if(this.startPrice == 0){
                        //出价金额为加价金额
                        this.offerInput = this.increasePrice;
                    } else {
                        //如果有起拍价，则为起拍价
                        this.offerInput = this.startPrice;
                    }
                } else {
                    //如果不是第一次出价
                    //出价为最高价+加价金额
                    //将类型转化为浮点型，不然计算会出错误
                    this.offerInput = parseFloat(this.maxbid) + parseFloat(this.increasePrice);
                }

                this.showMoney = true;
                this.$nextTick(function(){
                    $('.money-in').focus()
                })
                
            },

            // 设置一口价金额
            setOncePrice: function(ev) {
                this.offerInput = parseFloat( $(ev.target).attr('data-onceprice') )
                // 获取焦点
                this.$nextTick(function(){
                    $('.offer-box').find('.money-in').focus()
                })
                
            },

            // 一口价出价按钮点击
            oncePrice: function(ev) {
                var _this   = this;
                var goodsId = this.goodsIdNow;
                var price   = Number( this.offerInput );

                this.uniformPrice = $(ev.target).attr('data-onceprice');

                if (price) {
                    if (price < this.startPrice) {
                        _this.showAlertTip("输入金额不能小于起拍价")
                    } else if(price < this.maxbid) {
                        _this.showAlertTip("出价金额不能小于最高出价")
                    } else if (price - this.maxbid < this.increasePrice && price <= this.maxbid) {
                        _this.showAlertTip("单次加价金额不能小于" + this.increasePrice + "元")
                    } else {
                        sessionStorage.setItem('offer_price',this.offerInput)
                        // 设置[type=1]表示一口价
                        _this.startBid(goodsId,price,1)
                    }
                } else {
                    _this.showAlertTip('请输入您的出价金额')
                }

                // 置空价格输入框
                $(ev.target).parents('.offer-money').find('#money-in').val('')
            },

            // 点击确认出价
            offerAmount: function(ev) {
                var _this   = this;
                var goodsId = this.goodsIdNow;
                var price   = Number( this.offerInput );

                if (price) {
                    if (price < this.startPrice) {
                        _this.showAlertTip("输入金额不能小于起拍价")
                    } else if(price < this.maxbid) {
                        _this.showAlertTip("出价金额不能小于最高出价")
                    } else if (price - this.maxbid < this.increasePrice && price <= this.maxbid) {
                        _this.showAlertTip("单次加价金额不能小于" + this.increasePrice + "元")
                    } else {
                        sessionStorage.setItem('offer_price',this.offerInput)
                        // 设置[type=0]标识正常出价
                        _this.startBid(goodsId,price,0)
                    }
                } else {
                    _this.showAlertTip('请输入您的出价金额')
                }

                // 置空价格输入框
                $(ev.target).parents('.offer-money').find('#money-in').val('')
            },

            /**
             * 与后端对接 => 出价
             * @param  {string} goodsId 拍品id
             * @param  {number} price   出价金额
             * @param  {number} type    出价类型 type=0[无一口价] type=1[一口价出价]
             * @return 无
             */
            startBid: function(goodsId,price,type) {
                var _this = this;
                // var oncePrice = 111;  // 一口价金额
                ajax.getBidPort(goodsId,price,function(data) {
                    if (data.status == 200) {

                        $('.goods-id'+goodsId).find('.offer-box').hide();

                        setTimeout(function(){
                            _this.cancelOffer()
                            // 获取当前用户信息
                            var index = $('.goods-id' + goodsId).attr('data-index');
                            var bid_price = price.toFixed(2);
                            // 同步最高出价
                            _this.maxbid = price;

                            // 成功返回值 赋值该对象
                            var param = {
                                id: data.data.goods_id,
                                starttime: data.data.bidtimestr,
                                endtime: data.data.last_time
                            };
                            // 区分一口价 && 正常出价
                            switch(type) {
                                case 0: // 正常出价
                                    _this.details[index].bid.data.unshift({
                                        user_id: data.data.userid,
                                        bid_price: bid_price,
                                        bid_time: data.data.bidtime,
                                        name: data.data.username,
                                        usethumb: data.data.thumb
                                    })

                                    // 清空当前倒计时 重新开启一个倒计时
                                    _this.$emit('countDown',param)
                                    break;
                                case 1:  // 一口价出价
                                    _this.details[index].bid.data.unshift({
                                        user_id: data.data.userid,
                                        bid_price: bid_price,
                                        bid_time: data.data.bidtime,
                                        name: data.data.username,
                                        usethumb: data.data.thumb
                                    })
                                    // 只有当前出价金额大于等于 一口价的时候 拍品结束

                                    if (price >= _this.uniformPrice) {
                                        _this.oncepriceOk(goodsId);
                                    } else {
                                        // 清空当前倒计时 重新开启一个倒计时
                                        _this.$emit('countDown',param)
                                    }
                                    
                                    break;
                                default:
                                    throw new Error("出错")
                            }

                        },1)
                    } else if (data.status == 202) {
                        // 需要支付商品保证金
                        if (_this.$route.params.id) { // 表示详情页
                            _this.paymentUrl = '/payment/' + _this.goodsIdNow + '?type=deposit&ordertype=1&from=details&round=' + new Date().getTime()
                        } else { // 关注
                            _this.paymentUrl = '/payment/' + _this.goodsIdNow + '?type=deposit&ordertype=1&from=follow&round=' + new Date().getTime()
                        }
                        
                        _this.showMoney = false;
                        _this.showBond = true;

                    } else if (data.status == 203) {
                        // 需要支付诚信保证金
                        if (_this.$route.params.id) { // 表示详情页
                            _this.paymentUrl = '/payment/' + _this.goodsIdNow + '?type=deposit&ordertype=4&from=details&round=' + new Date().getTime()
                        } else { // 关注
                            _this.paymentUrl = '/payment/' + _this.goodsIdNow + '?type=deposit&ordertype=4&from=follow&round=' + new Date().getTime()
                        }

                        _this.showMoney = false;
                        _this.showBond = true;
                    } else if (data.status == 205) {
                        $("body").css('overflow','hidden');
                        // 出价框闭合
                        _this.setZeroOfferBox();
                        _this.showBond = false;
                        _this.qrcodeWrap = true;
                    } else {
                        _this.showAlertTip(data.msg)
                    }

                    // 输入金额置空
                    _this.offerInput = '';
                })
            },

            // 一口价成交
            oncepriceOk: function(goodsId) {
                $('.goods-id'+goodsId).find('.deal-one').text('成交');
                $('.goods-id'+goodsId).find('.cutdown-box .follow-time').remove();
                $('.goods-id'+goodsId).find('.startoffer').remove()
                $('.goods-id'+goodsId).find('.end-offer-grey').show();
                $('.goods-id'+goodsId).find('.is-auction').removeClass('.is-auction').addClass('end-auction').html('拍卖结束'); 
                this.$nextTick(function(){
                    $('.goods-id'+goodsId).find('.deal-one').html('成交');
                })
            },


            // 点击取消 
            cancelOffer: function() {
                this.showBond = false;
                this.setZeroOfferBox()
            },

            // 点击蒙层关闭出价窗
            cancelOfferOuter: function(ev) {
                if ( $(ev.target).hasClass('offer-box') ) {
                    this.setZeroOfferBox();
                };

                /** modifier LL 点击蒙层将保证金关闭 **/
                this.showBond = false;
                /** modify end **/
            }, 

            // 置空出价框
            setZeroOfferBox: function(){
                $('.offer-box').hide();
                this.smsInput = '';
                this.offerInput = '';
                this.mobileNum = '';
            },

            // 支付保证金
            payBond: function() {
                var _this = this;
                var scrollHeight = $(document).scrollTop();
                window.localStorage.setItem('scroll_top',scrollHeight);
                setTimeout(function(){
                    window.location.href = _this.paymentUrl;
                },5)
                
            },

            // 输入手机号码后 点击下一步
            nextStep: function() {
                var _this = this;
                var regExp = /^1(3|4|5|7|8)\d{9}$/;

                if ( !regExp.test(this.mobileNum) ) {
                    this.showAlertTip('请输入正确格式的手机号')
                } else {
                    this.sendCode()
                }
            },

            // 发送验证码 后端接口
            sendCode: function() {
                var _this = this;
                var mobile = this.mobileNum;
                // type=0 表示当前为出价验证手机号
                var type = 0;
                ajax.sendVerifiyCode(mobile,type,function(data){
                    if (data.status == 200) {
                        _this.showBond = false;
                        _this.showVerCode = true;
                        _this.smsVerification()
                    } else {
                        _this.showAlertTip(data.msg)
                    }
                })
            },
            // 执行短信验证码倒计时
            smsVerification: function() {
                var _this = this;
                var c = 60;
                if (!this.timer) {
                    this.timer = setInterval(funtimer,1000);
                };
               
                function funtimer(){
                    if( c==0 ){
                        clearInterval(_this.timer);
                        _this.timer = null;
                        // _this.verifyCode = false;
                        $('.vn-title').text("请点击下面的按钮获取短信验证码");
                        $('.sms-code').attr("disabled","disabled")
                        _this.smsVerBoll = true;
                        $('.countdown-lpt').html("获取验证码")
                    } else {
                        _this.smsVerBoll = false;
                        $('.vn-title').text("验证码已发送");
                        $('.sms-code').removeAttr("disabled")
                        $('.countdown-lpt').html( c + "s后重新获取");
                        c--
                    }   
                }
                funtimer();
            },

            // 点击 确认验证码
            sendToBackend: function() {
                var _this = this;
                var iuputNum = this.smsInput;
                var mobile = this.myMobile || this.mobileNum;
		console.log(mobile)
                var $type = $('.vn-right').attr('data-type');
                
                if ($type == 'not' && iuputNum ) {
                    this.verifiySms(mobile,iuputNum);
                } else if ( $type == 'not' && !iuputNum ) {
                    this.showAlertTip('请输入验证码')
                } else if ( $type == 'ok' ) {
                    this.showAlertTip('请重新发送验证码')
                }
            },

            // 确认验证码数据接口 
            verifiySms: function(mobile,sms) {
                var _this = this;
                /** modifier LL 将type改为1 **/
                var type = 1;
                /** modify end **/
                ajax.smsVerifiy(mobile,sms,type,function(data) {
                    _this.smsInput = '';
                    if (data.status == 200) { 
                        // 通过验证
                        _this.showVerCode = false;
                        _this.showMobile  = false;

                        // 设置当前用户手机号码
                        _this.myMobile = true;

                        // 允许用户出价
                        _this.startoffer()
                    } else {
                        _this.showAlertTip(data.msg)
                    }
                })
            },

            // 弹窗提示
            showAlertTip: function(tip) {
                // 禁止滚动
                $('body').css('overflow','hidden');

                this.tipMsg = tip;
                this.showAlertBoll = true;
            },

            // 公共弹窗
            showPopup: function() {
                this.$emit('childEvent');
            },

            // 关闭弹窗
            closePopup: function() {
                // 解除禁止滚动
                $('body').css('overflow','auto');

                this.showAlertBoll = false;
            }
		}
	}

</script>
<style>
.end-offer-grey {
	display: none;
}
.grey {
	background: #ddd;
}
.follow-list{
	background-color: #fff;
	margin-bottom: 1.25rem;
}
.follow-list .follow-author a{
	padding-left: 1.4rem;
	padding-top: 1rem;
}
.follow-list .follow-author img{
	height: 4.5rem;
	width: 4.5rem;
	border-radius: 50%;
	margin-right: 1rem;
}
.follow-list .follow-author .name{
	font-size: 1.6rem;
	color: #000;
	margin-bottom: 0.4rem;
	width: 18rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.follow-list .follow-author .time{	
	line-height: 1.7rem;
	font-size: 1.4rem;
	color: #999;
}
.follow-list .follow-author .time span{
	width: 1.7rem;
	height: 1.7rem;
	margin-right: 0.5rem;
}
.follow-list .follow-author .auction-status{
	width: 9.5rem;
	height: 3rem;
	line-height: 3rem;
	text-align: center;
	color: #fff;
	font-size: 1.4rem;
	margin-top: 1.25rem;
	border-bottom-left-radius: 1.4rem;
	border-top-left-radius: 1.4rem;
}
.follow-list .follow-author .is-auction{
	box-shadow: 0.25rem 0.25rem 0.9rem rgba(173,26,26,0.5);
	background-color: #ad1a1a;
}
.follow-list .follow-author .end-auction{
	box-shadow: 0.25rem 0.25rem 0.9rem rgba(204,204,204,0.5);
	background-color: #ccc;
}
.follow-list .follow-copy{
	font-size: 1.4rem;
	color: #333;
	padding:0.5rem 1.4rem;
	line-height: 2rem;
	max-height: 100rem;
}
.follow-list .text-overflows .copybtn{
	background:url(/res/img/morebg.png) no-repeat;
	background-size: 7.25rem 2rem;
}
.follow-list .follow-copy .copybtn{
	font-size: 1.2rem;
	color: #ff4545;
	padding-left: 2.25rem;
	height: 2rem;
	line-height: 2rem;
	width: 7.25rem;
	bottom: 0.5rem;
	right: 2.2rem;
}
.follow-list .copy-stop{
	padding-bottom: 1.75rem;
}
.follow-list .copy-stop .copybtn{
	left: 1.4rem;
	bottom: 0;
	padding-left: 1.6rem;
	width: 9rem;
	background: url(/res/img/stop.png) no-repeat left center;
	background-size: 1.1rem 0.65rem;
}
.follow-list .list-img{
	padding-left: 1.4rem;
	/*padding-top: 0.5rem;*/
}
.follow-list .list-img li{
	position: relative;
	width: 11.25rem;
	height: 11.25rem;
	margin-right: 0.5rem;
	margin-bottom: 0.5rem;
}
/*change by lpt*/
.video-box {
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.video-el {
	width: 100%;
	height: 100%;
	position: absolute;
	top: -999999rem;
}
.video-bg {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 5;
	width: 100%;
	height: 100%;
	background: url(/res/img/videobg.png) no-repeat;
	background-size: 100% 100%;
}
.follow-list li img {
	width: 100%;
	height: 100%;
}
.video-box-img {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	width: 100%!important;
	height: auto!important;
}
.follow-list .list-people{
	padding-left: 0.9rem;
	padding-top: 0.5rem;
}
.follow-list .list-people .people{
	overflow: hidden;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	margin-left: 0.55rem;
	margin-bottom: 0.5rem;
}
.follow-list .list-people .morebtn{
	width: 4.5rem;
	height: 4rem;
	float: left;
	background-color: #fff;
	margin-top: -0.5rem;
}
.follow-list .peoplemore{
	height: 4rem;
	overflow: hidden;
}
.follow-list .peoplemore .morebtn{
	right: 0.15rem;
	top:0;
	margin-top: 0;
}
.follow-list .follow-state{
	padding-left: 1.4rem;
	margin-bottom: 0.5rem;
}
.follow-list .follow-state .free-shipping,.follow-list .follow-state .return{
	height: 2rem;
	line-height: 1.8rem;
	text-align: center;
	font-size: 1.2rem;
	color: #fff;
	padding:0 0.5rem;
	border-radius: 0.4rem;
	margin-top: 0.5rem;
}
.follow-list .follow-state .free-shipping{
	background-color: #fa693c;
	margin-right: 0.5rem;
}
.follow-list .follow-state .return{
	background-color: #6699ff;
}
.follow-list .follow-time{
	font-size: 1.4rem;
	padding-left: 1.4rem;
	/* padding-top: 0.5rem; */
	padding-bottom: 1rem;
}
.follow-list .follow-time span{
	color: #ad1a1a;
}
.follow-list .follow-offer{
	margin:0 1.4rem 1rem;
	height: 3.5rem;
	line-height: 3.5rem;
	text-align: center;
	border-radius: 0.5rem;
	font-size: 1.6rem;
	color: #fff;
}
.follow-list .startoffer{
	background-color: #15af25;
	font-family: Sans-serif;
}
.follow-list .endoffer{
	background-color: #ccc;
}
.follow-list .follow-bond p,.follow-list .follow-price p{
	width: 33.333%;
	text-align: center;
	font-size: 1.2rem;
	color: #999;
}
.follow-list .follow-bond p span,.follow-list .follow-price p span{
	border:1px solid #999;
	padding:0 0.3rem;
	border-radius: 0.2rem;
	display: inline-block;
}
.follow-list .follow-price{
	padding:1rem 1.4rem;
}
.follow-list .follow-price p{
	width: 50%;
}
.follow-list .list-offer{
	padding: 1.25rem 1.4rem 1rem;
	border-top:1px solid #e5e5e5;
	border-bottom:1px solid #e5e5e5;
}
.follow-list .list-offer .list-offer-more{
	/*max-height:27.3rem;*/
	overflow: hidden;
}
.follow-list .list-offer ul li{
	background-color: #f3f3f5;
	padding:0.75rem 1rem 0;
}
.follow-list .list-offer ul li .offer-in{
	border-bottom: 1px solid #dadadc;
	padding-bottom: 0.75rem;
}
.follow-list .list-offer ul li .offer-in img{
	width: 3.5rem;
	height: 3.5rem;
	border-radius: 50%;
	margin-right: 0.75rem;
}
.follow-list .list-offer ul li .offer-in .name{
	font-size: 1.2rem;
	color: #999;
}
.follow-list .list-offer ul li .offer-in .name span{
	font-size: 1.4rem;
	color: #333;
}
.follow-list .list-offer ul li:first-child .offer-in .state{
	color: #ad1a1a;
	font-size: 1.7rem;
}
.follow-list .list-offer ul li:first-child .offer-in .state span{
	background-color: #ad1a1a;
	font-size: 1.4rem; 
}
.follow-list .list-offer ul li .offer-in .state{
	color: #666;
	font-size: 1.6rem;
	height: 2.5rem;
	line-height: 2.5rem;
	margin-top: 0.5rem;
}
.follow-list .list-offer ul li .offer-in .state span{
	display: inline-block;
	height: 2.5rem;
	padding: 0 0.4rem;
	border-radius: 0.2rem;
	color: #fff;
	margin:0 1.25rem 0 1rem;
}
.follow-list .list-offer ul li .offer-in .state span{
	background-color: #ccc;
	font-size: 1.2rem;
}
.follow-list .list-offer .offer-more-btn{
	background-color: #f3f3f5;
	height: 3.25rem;
	line-height: 3.25rem;
	text-align: center;
	font-size: 1.4rem;
}
/* 出价弹框 */
.offer-box{
	left: 0;
	top: 0;
	background-color: rgba(0,0,0,0.4);
	width: 100%;
	height: 100%;
	z-index: 29;
	display: none;
}
.offer-box .offerbg{
	width: 100%;
	left:0;
	bottom: 0;
	background-color: #f7f8f7;
	padding: 2.5rem 1.5rem 2rem 1.5rem;
	/*display: none;*/
}
.offer-box .offerinput{
	width: 100%;
	height: 4.5rem;
	border:1px solid #ddd;
	font-size: 1.6rem;
	color: #333;
	background-color: #fff;
	margin-bottom: 2.3rem;
}
.offer-box  .offerbtnbg {
	height: 4.4rem;
	line-height: 4.4rem;
	background-color: #15af25;
	color: #fff;
	font-size: 1.6rem;
	text-align: center;
	border-radius: 0.3rem;
}
.offer-btn-box {
	display: -webkit-flex;
	display: flex;
}
.offer-btn-box  div {
	display: inline-block;
	font-size: 1.4rem;
	color: #fff;
}
.offer-lpt {
	width: 21.5rem;
}
.price-fixed {
	width: 11.5rem;
	height: 4.4rem;
	text-align: center;	
	line-height: 4.4rem;
	background-color: #fa693c;
	border-radius: .3rem;
	margin-right: 1.5rem;
	/*flex: 1;*/
}	
/* 出价金额 */
.offer-money .money{
	padding-left: 5.5rem;
	overflow: hidden;
} 
.offer-money .money .label{
	height: 4.4rem;
	line-height: 4.4rem;
	width: 4.75rem;
	left: 1rem;
	top: 0.05rem;
}
.offer-money .money .money-in{
	width: 100%;
	height: 4.45rem;
}
.offer-money .offer-agreement{
	font-size: 1.4rem;
	color: #999;
	text-align: center;
	padding: 0.5rem 0;
}
.offer-money .offer-agreement span{
	color: #3366ff;
}
/* 单次提价提醒 */
.offer-tip {
	height: 14rem;
}
.offer-tip-text {
	line-height: 3.5rem;
	margin-bottom: 1.6rem;
	text-align: center;
	font-size: 1.4rem;
	color: #000;
}
.offer-tip .tip {
	width: 30rem;
	margin: 0 auto;
	height: 4.3rem;
	color: #000;
	border: 1px solid #ccc;
	background: #fff;
}
.offer-tip-text {
	
}
/* 保证金 */
.offer-bond .explain{
	font-size: 1.4rem;
	color: #000;
	text-align: center;
	line-height: 2.5rem;
}
.offer-bond .payment-bond{
	margin:2rem 0;
}
.offer-bond .cancel-bond{
	background-color: #808593;
	border:1px solid #ccc;
}
/* 手机号 */
.offer-box .mobile-num{
	padding-left: 1rem;
}
.offer-box .mobile-btn,.offer-box .vn-btn{
	margin-bottom: 0.5rem;
}
/* 验证码 */
.offer-box .verification{
	padding-top: 0;
}
.offer-box .verification .vn-title{
	height: 4.5rem;
	line-height: 4.5rem;
	font-size: 1.4rem;
	color: #333;
}
.offer-box .verification .vn-left{
	width: 13.75rem;
	line-height: 4.5rem;
	font-size: 1.4rem;
	border-radius: 0.3rem;
	padding-left: 0.75rem;
}
.offer-box .verification .vn-right{
	width: 19.75rem;
	line-height: 4.5rem;
	background-color: #ddd;
	color: #fff;
	font-size: 1.4rem;
	text-align: center;
	border-radius: 0.3rem;
}
#layer {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 28;
	background-color: rgba(0,0,0,.4)
}
/* 弹窗样式 */
.poupu-box {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 29;
	width: 100%;
	height: 100%;
}
.poupu-layer {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.9);
}
/*图片*/
.popup-img-box,
.popup-video-box {
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);  
        -ms-transform: translate(-50%,-50%);  
          	transform: translate(-50%,-50%);  
	width: 100%;
	height: auto;
}
.popup-img-box img {
	width: 100%;
	height: 100%;
} 
/* 视频 */
#my-video {
	width: 100%;
	height: 100%;
}

.off-shelf {
	font-family: PingFangSC;
	font-size: 1.6rem;
	color: #6699ff;
	margin-left: 1rem;
}

/* 按钮样式 */
.btn_ok {
	background-color: #15af25;
}
/* 点击倒计时按钮 */
.clickEle {
	background-color: #6699ff!important;
}

/* 二维码弹窗 */
.qrcode-wrap {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 25;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.8);
	overflow: hidden;
}
.qrcode-content {
	/*position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;*/
	width: 30rem;
	height: 40rem;
	margin: 0 auto;
	margin-top: 10rem;
	border-radius: .5rem;
	background-color: #fff;
}
.qrcode-content img {
	width: 100%;
	height: 100%;
}
.qrcode-content .qrcode {
	width: 100%;
	height: 26.5rem;
	padding: 6.8rem 7.5rem 4.8rem 7.5rem;
}
.qrcode img {
	width: 100%;
	height: 100%;
}
.qrcode-desc-h2 {
	font-weight: bold;
	font-size: 1.7rem;
	color: #333;
	line-height: 4rem;
	text-align: center;
}
.qrcode-desc-p {
	font-size: 1.4rem;
	color: #666;
	text-align: center;
}
</style>
