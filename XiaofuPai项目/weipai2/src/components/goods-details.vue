<template>
<div class="detailslist">
	<div>
		<!-- details -->
		<div class="follow-list">
			<div class="follow-author clearfix">
					<!-- 跳转店铺首页 -->
					<router-link :to="/shops/  + details.goods_detail[0].user_id " class="clearfix fl">
						<img :src="avatarUrl" class="fl">
						<div class="author fl">
							<div class="name">{{ details.goods_detail[0].title }}</div>
							<div class="time">
								<span class="fl shotsprites"></span>
								{{ details.goods_detail[0].updated_at }}
							</div>
						</div>
					</router-link>
					<div  v-if="statusBoll" class="fr auction-status is-auction">正在拍卖</div>
					<div  v-if="!statusBoll" class="fr auction-status is-auction end-auction">拍卖结束</div>
			</div>
			<p class="follow-copy re text-overflows">
				{{ details.goods_detail[0].desc }}
				<span class="ab copybtn" v-if="details.goods_detail[0].desc.length >= 75" @click="copybtn($event)">显示全部</span>
			</p>
			<!-- 商品图片数量 -->
			<ul class="list-img clearfix">
				<li class="fl" v-for="(itemImg,indexImg) in details.goods_detail[0].images">
					<img v-if="itemImg.type == 'img' " @click="showBigImg" data-type="img" :src="itemImg.url" alt="goods img">
					<div v-if="itemImg.type == 'v' " class="video-box">
						<video class="video-el" :src="itemImg.url"></video>
						<!-- <img :src="itemImg.url" alt=""> -->
						<span class="video-bg" @click="showBigImg" data-type="video"></span>
					</div>
				</li>
			</ul>
			<!-- 点赞人数 -->
			<ul class="list-people clearfix re peoplemore">
				<li  
					class="fl divbg people"
					v-for="itemLike in details.likes"
				>
					<img :src="itemLike.thumb" alt="">
				</li>
				<li class="ab morebtn shotsprites" v-if="details.likes.length >= 10" @click="morebtn($event)"></li>
			</ul>
			<div class="follow-state clearfix">
				<div class="fl free-shipping" v-if="details.goods_detail[0].is_mail">包邮</div>
				<div class="fl return" v-if="details.goods_detail[0].is_refund">包退</div>
				<!-- 如果是本人查看并且当前无人出价 可以下架 -->
				<div class="fl off-shelf" v-if="is_offShelf" @click="showPopup">下架</div>
				<div 
					class="fr imglike" 
					:data-goodsid="details.goods_detail[0].id" 
					data-num="0" 
					:class="{ 'imglikecur': details.goods_detail[0].is_like}"
					@click="thumbsUp" 
				>{{ details.goods_detail[0].likes }}</div>
				<div class="fr imgbrowse">{{ details.goods_detail[0].views }}</div>
			</div>
			<!-- 倒计时 -->
			<div v-if="true" class="cutdown-box">
				<div class="follow-time keynum" :data-time="details.goods_detail[0].end_time">距离结束：<span>0</span>时<span>0</span>分<span>0</span>秒</div>
				<div 
					class="follow-offer startoffer" 
					:data-mobile="details.goods_detail[0].nowmobile" 
					:data-maxbid="details.goods_detail[0].current_price" 
					:data-step="details.goods_detail[0].increase_price"
					:data-goodsid="details.goods_detail[0].id"
					@click="validateBid($event)"
				>出价</div>
			</div>
			<!-- {{ details.goods_detail[0].end_time }} -->
			<div class="follow-offer grey" v-show="false">拍卖结束</div>
			<div class="follow-bond clearfix">
				<p class="fl"><span>起</span>￥{{ details.goods_detail[0].start_price }}元</p>
				<p class="fl"><span>保</span>￥{{ details.goods_detail[0].deposit_price }}元</p>
				<p class="fl"><span>加</span>￥{{ details.goods_detail[0].increase_price }}元</p>
			</div>
			<div class="follow-price clearfix">
				<p class="fl" v-if="details.goods_detail[0].refer_price != 0">
					<span>参考价</span>￥{{ details.goods_detail[0].refer_price }}元
				</p>
				<p class="fl" v-if="details.goods_detail[0].once_price != 0">
					<span>一口价</span>￥{{ details.goods_detail[0].once_price }}元
				</p>
			</div>
			<!-- 出价人 列表 -->
			<div class="list-offer">
				<ul class="list-offer-more">
					<li v-for="(bidItem,bidIndex) in details.bidList.data" :data-id="bidItem.user_id">
						<div class="clearfix offer-in">
							<img src="/res/img/list.jpg" class="fl">
							<div class="fl name">
								<span>大米</span><br/>
								{{ bidItem.updated_at }}
							</div>
							<div class="fr state">
								¥{{ bidItem.bid_price }}
								<span>领先</span>
							</div>
						</div>
					</li>
				</ul>
				<div class="offer-more-btn" v-if="details.bidList.length >= 5" @click="offermore($event)">更多</div>
			</div>
		</div>
		<!-- Over -->
		<!-- 出价弹框 Begin -->
		<div class="offer-box fixed" v-show="showOfferBox" @click="cancelOfferOuter($event)">
			<!-- 金额 -->
			<div class="ab offerbg offer-money" v-show="showMoney">
				<div class="money re offerinput">
					<label class="ab label" for="money-in">出价</label>
					<input type="number" class="money-in" id="money-in" v-model="offerInut">
				</div>
				<!-- 一口价 -->
				<div class="offer-btn-box" v-show="false">
					<div class="price-fixed">一口价 ￥1000</div>
					<div class="offerbtnbg offer-lpt" :data-goodsid="details.goods_detail[0].id" @click.stop="offerAmount">出价</div>
				</div>
				
				<!-- 当前价格出价 -->
				<div class="offerbtnbg offer-btn" v-show="true" :data-goodsid="details.goods_detail[0].id" @click.stop="offerAmount">出价</div>
				
				<p class="offer-agreement">出价即表示同意<span>《微拍竞拍服务协议》</span></p>
			</div>
			<!-- 单次加价幅度 -->
			<div class="ab offerbg offer-tip" v-show="showTip">
				<div class="offer-tip-text">每次加价幅度最少100元</div>
				<div class="offerbtnbg offer-btn tip" @click="">知道了</div>
			</div>
			<!-- 支付保证金 -->
			<div class="ab offerbg offer-bond" v-show="showBond">
				<p class="explain">本商家已设置出价保护，您本次出价需要支付保证金。如违约保证金将扣除并支付给卖家</p>
				<div class="payment-bond offerbtnbg" @click="payBond">支付保证金</div>
				<div class="cancel-bond offerbtnbg"  @click="cancelOffer">取消</div>
			</div>
			<!-- 手机号 -->
			<div class="ab offerbg mobile" v-show="showMobile">
				<input type="number" class="mobile-num offerinput" v-model="mobileNum" placeholder="请输入手机号">
				<div v-if="mobileNum == false" class="offerbtnbg mobile-btn" style="background-color:#ddd;">下一步</div>
				<!-- 事件绑定在这儿 -->
				<div v-if="mobileNum != false" class="offerbtnbg mobile-btn" @click="nextStep">下一步</div>
			</div>
			<!-- 验证码 -->
			<div class="ab offerbg verification" v-show="showVerCode">
				<p class="vn-title">验证码已发送</p>
				<div class="vn-in clearfix">
					<input type="text" class="fl vn-left offerinput sms-code" v-model="smsInput" placeholder="验证码">
					<div v-if="smsVerBoll == false" class="fr vn-right offerinput countdown-lpt" data-type="not">20s后重新获取</div>
					<div v-if="smsVerBoll == true" class="fr vn-right offerinput clickEle" @click="smsVerification" data-type="ok">获取验证码</div>
				</div>
				<!-- 手机短信验证 -->
				<div class="offerbtnbg vn-btn" @click="sendToBackend">确认</div>
			</div>
		</div>
		<!-- 出价弹窗 Over -->
		<!-- 图片/视频 弹窗 -->
		<div class="poupu-box" v-show="showBigImgBol">
			<div class="poupu-layer" @click="closeBigImg"></div>
			<!-- 展示图片 -->
			<div class="popup-img-box" v-if="isImages" @click="closeBigImg">
				<!-- 弹出层 并且改变img标签的src属性 -->
				<img :src="imgSrc" alt="big img">
			</div>
			<!-- 展示视频 -->
			<div class="popup-video-box" v-if="!isImages">
				<!-- 为视频赋值src -->
				<!-- 
					如果需要兼容  引入下面h5兼容文件
					<script src="http://html5media.googlecode.com/svn/trunk/src/html5media.min.js"></script>

					测试视频
					src="http://www.zhangxinxu.com/study/media/cat.mp4" 
				 -->
				<video 
					id="my-video" 
					:src="videoSrc" 
					autoplay 
				>
					您的浏览器不支持浏览该视频，请升级版本
				</video>
			</div>
		</div>
	</div>

	<!-- 通用弹窗 -->
	<my-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></my-alert>
</div>

</template>
<script>


    module.exports = {
        data: function() {
            return {
                // 渲染数据
                // dataList: [],
                // dom数据
                showBigImgBol: false,
                showOfferBox: false,
                showMoney: false,
                showTip: false,
                showBond: false,
                showMobile: false,
                showVerCode: false,
                // 出价相关
                mobileNum: '',
                smsVerBoll: false,
                timer: null,
                smsInput: '',
                offerInut: '',
                maxbid: '',
                increasePrice: '',
                goodsIdNow: '',
                myMobile: '',
                // 图片链接
                imgSrc: '',
                // 视频链接
                videoSrc: '',
                isImages: true,
                // 弹窗
                showAlertBoll: false,
                tipMsg: '',
                // 拍卖状态
                statusBoll: true,
                // 头像
                avatarUrl: "",
                baseUrl : "http://yiping-images.oss-cn-beijing.aliyuncs.com/",
            }
        },
		props: ['details'],
        components: {
            'my-alert': myAlert
        },
		
        created: function() {
            // this.getFollowData() 

            // 格式化头像
            this.formatAvator()

            // 拍品数据格式化
            this.formatImg()
        },
        mounted: function(){
            // console.log( JSON.parse(JSON.stringify(this.dataList)))

            // 初始化倒计时
            var $node = $('.keynum');
            var endTime = parseFloat($node.attr('time'));
            // 提供测试环境
            var endTime = 400;
            this.countDown( $node,endTime);
        },
        computed: {
            is_offShelf: function(){
                // 我是我   +    无人出价
                var myId = this.details.current_id;
                var userId = this.details.goods_detail[0].user_id;
                return myId != userId
            }
        },
		methods: {

            // 公共弹窗
            showPopup: function() {
                this.$emit('childEvent');
            },

            // 格式化头像数据
            formatAvator: function() {
                var avatar = this.details.goods_detail[0].thumb && JSON.parse( this.details.goods_detail[0].thumb );
                this.avatarUrl = avatar.url
            },

            // 处理拍品图片/视频数据格式
            formatImg: function() {
                var imgArr = this.details.goods_detail[0].images
                this.details.goods_detail[0].images = JSON.parse (imgArr)
            },

            // 点赞
            thumbsUp: function(ev) {
                var _this = this;
                // 当前元素
                var $node = $(ev.target);
                var num = parseInt($node.text())+1;
                var key = parseInt($node.siblings(".imgbrowse").text())+1;
                // 添加喜欢的商品的id
                var goodsid = $node.get(0).dataset.goodsid;
                // 用户头像
                var userAva = _this.details.current_thumb;
                var liked = $node.hasClass("imglikecur");
                if (!liked) {
                    ajax.userLike(goodsid,function(data) {
                        if (data.status == 201) {
                            // 改变点赞样式
                            $node.addClass("imglikecur").text(num);
                            //浏览量加一
                            $node.siblings(".imgbrowse").text(key);
                            // 拿到当前点赞用户的信息 把当前信息添加到点赞列表中
                            _this.details.likes.push({
                                // 当前点赞者头像
                                thumb: userAva
                            }) 
                            
                            // console.log( $(this).parents('.follow-state').prev('.list-people') )
                        } else if (data.status == 201) {
                            console.log('点赞失败')
                        } else if (data.status == 502) {
                            console.log("点赞成功，添加关注失败")
                        }
                    })
                };
            },
            
            // 视频、图片部分处理
            showBigImg: function(ev) {
                var type = ev.target.dataset.type;
                var imgSrc = $(ev.target).attr('src');
                var videoSrc = $(ev.target).prev().attr('src');
                if (type == 'img') {
                    this.isImages = true;
                    this.imgSrc = imgSrc;
                } else if (type == 'video') {
                    this.isImages = false;
                    this.videoSrc = videoSrc;
                }
                this.showBigImgBol = true;
            },
            closeBigImg: function() {
                this.showBigImgBol = false;
            },

            // 出价人数控制
            offermore: function(event) {
                $(event.target).siblings("ul").toggleClass("list-offer-more");
                if(!$(event.target).siblings("ul").hasClass("list-offer-more")){
                    $(event.target).text("收起");
                }else{
                    $(event.target).text("更多");
                }
            },
            
            // 文案控制
			copybtn: function(event) {
                $(event.target).parent().toggleClass("text-overflows");
                if($(event.target).parent().hasClass("text-overflows")){
                    $(event.target).parent().removeClass("copy-stop");
                    $(event.target).html("显示全部");
                }else{
                    $(event.target).parent().addClass("copy-stop");
                    $(event.target).html("收起");
                }
            },

            // 点赞人数控制
            morebtn: function(event) {
                $(event.target).parent().toggleClass("peoplemore");
                if($(event.target).parent().hasClass("peoplemore")){
                    $(event.target).addClass("ab")
                }else{
                    $(event.target).removeClass("ab")
                }
            },

            // ============================倒计时==================================
            toTwo: function(num) {
                if( num > 9 ){
                    return num;
                }else{
                    return "0"+num;
                }
            },
            countDown: function(obj,timeDiff) {
                var _this = this;
                var time = setInterval(startFun,1000);
                function startFun(){
                    timeDiff--;
                    var h=parseInt(timeDiff/3600);//小时
                    var m=parseInt((timeDiff-h*3600)/60);//分钟
                    var s=parseInt(timeDiff-h*3600-m*60);//秒
                    if(h > 24) {
                        // 大于24小时显示 天时分 
                        var day = parseInt(timeDiff/86400);
                        h = parseInt((timeDiff-day*86400)/3600);
                        m = parseInt((timeDiff-day*86400-h*3600)/60);
                        $(obj).html('距离结束：<span>'+day+'</span>天<span>'+_this.toTwo(h)+'</span>时<span>'+_this.toTwo(m)+'</span>分');
                        return;
                    }
                    if(s>=0){   
                         $(obj).html('距离结束：<span>'+_this.toTwo(h)+'</span>时<span>'+_this.toTwo(m)+'</span>分<span>'+_this.toTwo(s)+'</span>秒');
                    }else{
                        clearInterval(time);
                        // 隐藏倒计时 显示结束标识
                        $(obj).parent(".cutdown-box").hide();
                        $(obj).parent(".cutdown-box").siblings(".grey").show();

                        // 正在拍卖 变成 拍卖结束
                        // $(obj).parents('.follow-list').find('.is-auction').removeClass('is-auction').addClass('end-auction')
                        _this.statusBoll = false;
                    }
                };
            },
            // 验证是否当前最高出价
            validateBid: function(ev) {
                var $maxBidder,
                    myId,
                    maxBidderId;
                
                $maxBidder = $(ev.target).parents('.follow-list').find('.list-offer-more').children(":first");

                // 当前拍品id
                this.goodsIdNow = $(ev.target).attr("data-goodsid");
                // 取到当前最高出价
                this.maxbid = $(ev.target).attr("data-maxbid");
                // 当前商品阶梯价
                this.increasePrice = $(ev.target).attr("data-step");
                // 获取当前用户的手机号
                this.myMobile = $(ev.target).attr("data-mobile");

                // 当前登录用户id
                myId = this.details.current_id;
                if ( $maxBidder.length != 0 ) {
                    // 最高出价人id
                    maxBidderId = $maxBidder.get(0).dataset.id; 
                } 
                // 验证当前是否最高出价人
                if ( myId == maxBidderId) {
                    this.tipMsg = "当前出价已是最高，无需出价."
                    this.showAlertBoll = true;
                } else if ( !this.myMobile ) { //=====================提供测试环境 上线改为 !this.myMobile============================
                    // 验证当前用户是否绑定了手机号
                    this.showOfferBox = true;
                    this.showMobile = true;
                } else {
                    // 开始出价
                    this.startoffer()
                }
            },

            startoffer: function(event){//开始出价按钮
                this.showOfferBox = true;
                this.showMoney = true
            },
            // 出价  验证是否低于最小起拍价
            offerAmount: function(ev) {
                var _this = this;
                // 拿到 出价金额 + 当前商品 id
                var goodsId = this.goodsIdNow;
                var price = Number( this.offerInut );
                // 当前商品是否设置保证金
                var isBond = false;

                if (isBond && price) {
                    // 需要支付保证金
                    this.showMoney = false;
                    this.showBond = true;
                } else if (price) {
                    // 拿到当前最高出价 对比当前输入价格 如果小于阶梯价  弹出一个提示框
                    if (this.offerInut - this.maxbid <= this.increasePrice) {
                        _this.tipMsg = "最小出价金额不能小于" + this.increasePrice + "元";
                        _this.showAlertBoll = true;
                    } else {
                        // 如果用户没有设置保证金 || 已经支付了保证金
                        ajax.getBidPort(goodsId,price,function(data) {
                            if (data.status == 200) {
                                _this.tipMsg = data.msg;
                                _this.showAlertBoll = true;
                                setTimeout(function(){
                                    _this.cancelOffer()
                                },1)
                            } else if (data.status == 202) {
                                // 需要支付保证金
                                _this.showMoney = false;
                                _this.showBond = true;
                            } else if (data.status == 203) {
                                // 违约保证金
                                _this.showMoney = false;
                                _this.showBond = true;
                            } else {
                                _this.tipMsg = data.msg;
                                _this.showAlertBoll = true; 
                            }

                            // 输入金额置空
                            _this.offerInut = '';
                        })
                    }
                   
                }

                // 置空价格输入框
                $(ev.target).parents('.offer-money').find('#money-in').val('')

                
            },
            //取消 
            cancelOffer: function() {
                this.showOfferBox = false;
                this.showBond = false;
            },
            cancelOfferOuter: function(ev) {
                if ( $(ev.target).hasClass('offer-box') ) {
                    this.showOfferBox = false;

                    this.smsInput = '';
                    this.offerInut = '';
                };
            }, 
            // 支付保证金
            payBond: function() {
                // 跳转支付页面
                this.$router.replace('/payment/' + this.goodsIdNow )

                // 支付完成 跳回支付页面

                // this.showBond = false;
                // this.showMobile = true;
            },
            // 输入手机号码后 点击下一步
            nextStep: function() {
                var _this = this;
                // 验证手机号 
                var regExp = /^1(3|4|5|7|8)\d{9}$/;

                if ( !regExp.test(this.mobileNum) ) {
                    this.tipMsg = "请输入正确格式的手机号."
                    this.showAlertBoll = true;
                } else {
                    var mobile = this.mobileNum;
                    // ajax.sendVerifiyCode(mobile,function(data){
                        // 暂时给出测试状态
                        if (true) {
                            // 如果发送成功，操作短信验证码dom
                            this.showBond = false;
                            this.showVerCode = true;
                            _this.smsVerification()
                        } else {
                            this.tipMsg = data.msg;
                            this.showAlertBoll = true;
                        }
                    // })
                }

            },
            // 验证短信
            smsVerification: function() {
                var _this = this;
                //短信验证码倒计时
                var c = 6;
                if (!this.timer) {
                    this.timer = setInterval(funtimer,1000);
                };
               
                function funtimer(){
                    if( c==0 ){
                        clearInterval(_this.timer);
                        _this.timer = null;
                        // _this.verifyCode = false;
                        $('.vn-title').text("请点击下面的按钮获取短信验证码");
                        _this.smsVerBoll = true;
                    } else {
                        _this.smsVerBoll = false;
                        $('.vn-title').text("验证码已发送");
                        $('.countdown-lpt').html( c + "s后重新获取");
                        c--
                    }   
                }
                funtimer();

                // this.showOfferBox = false;
                // this.showVerCode = false;
                // this.showMobile = false;
                // window.location.reload();
                //刷新页面
            },

            // 确认验证码
            sendToBackend: function() {
                var _this = this;
                // 比较当前输入框内容与后端的输入作对比
                var iuputNum = this.smsInput;
                // var mobile = this.myMobile;
                var mobile = 15210256910;
                var $type = $('.vn-right').attr('data-type');
                
                if ($type == 'not' && iuputNum ) {
                    // 正式验证
                    ajax.smsVerifiy(mobile,iuputNum,function(data) {
                        _this.smsInput = '';
                        if (data.status != 200) {
                            // 通过验证
                            _this.showVerCode = false;
                            _this.showMobile = false;

                            // 允许用户出价
                            _this.startoffer()
                            _this.tipMsg = "验证成功."
                            _this.showAlertBoll = true;
                        } else {
                            _this.tipMsg = data.msg;
                            _this.showAlertBoll = true;
                        }
                    })
                } else if ( $type == 'not' && !iuputNum ) {
                    this.tipMsg = "请输入验证码."
                    this.showAlertBoll = true;
                } else if ( $type == 'ok' ) {
                    this.tipMsg = "请重新发送验证码."
                    this.showAlertBoll = true;
                }
            }, 

            // 关闭弹窗
            closePopup: function() {
                this.showAlertBoll = false;
            }
		}
	}

</script>
<style>
.grey {
	background: #ccc;
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
	padding-top: 0.5rem;
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
	width: 100%;
	height: 100%;
}
.video-box .video-el {
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
.follow-list li img {
	width: 100%;
	height: 100%;
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
	padding:0.3rem;
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
	max-height:27.3rem;
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
	background-color: rgba(0,0,0,0.2);
	width: 100%;
	height: 100%;
	z-index: 12;
	/*display: none;*/
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
.offer-box  .offerbtnbg{
	height: 4.4rem;
	line-height: 4.4rem;
	background-color: #15af25;
	color: #fff;
	font-size: 1.6rem;
	text-align: center;
	border-radius: 0.3rem;
}
.offer-btn-box {
	display: flex;
}
.offer-btn-box  div {
	display: inline-block;
	font-size: 1.6rem;
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

/* 弹窗样式 */
.poupu-box {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 19;
	width: 100%;
	height: 100%;
}
.poupu-layer {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.6);
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
/*视频*/
#my-video {
	width: 100%;
	height: 100%;
}
/*下架*/
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

</style>
