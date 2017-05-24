<template>
<div class="release-picture">
	<!-- 上传图片 -->
	<div class="picture-content">
		<div class="lot-picture">
			<textarea class="picture-textarea" placeholder="我的拍品描述...">{{ fillData.name }}</textarea>
			<!-- 删除当前图片 -->
			<ul class="picture-list clearfix">

				<!-- 图片容器模板 -->
				<li class="fl re divbg img-box" :data-index="index" v-for="(item,index) in imgs">
					<img  v-if="item.type == 'img' " :src="baseUrl1+item.url+'?x-oss-process=image/resize,w_800'" :class="'img-'+item.url" alt="" data-type="img">
					<div class="video-box" v-if="item.type == 'video' " @click="showBigImg">
						<span class="video-play"></span>
						<video 
							class="my-video" 
							:src="baseUrl2+item.url" 
							:data-src="item.url" 
							data-type="video" 
							poster="/res/img/video_ns_2.jpg" 
						></video>
					</div>
					<div class="delete ab" @click="removePreviewImg">
						<p class="delete-in"><span></span></p>
					</div>
				</li>

				<div v-show="addImgBoll" class="fl video re copy-li">
					<div class="videobg shotsprites"></div>
					<p>添加视频</p>
					<input type="file" id="addvideo" class="ab addpicture">
				</div>
				<!-- 选中图片 展示 -->
				<div v-show="addImgBoll" class="fl re add copy-li" ref="uploadfile" data-index="0">
					<span class="ab transverse"></span>
					<span class="ab vertical"></span>
					<p>添加图片</p>
					<input type="file" id="uploadfile" class="ab addpicture">
				</div>
			</ul>
			<div class="picture-appraisal clearfix">
				<span class="fl">鉴定证书</span>
				<div ref="certificate" data-index="1" class="appraisal-box">
					<span class="fr appraisal shotsprites" id="certificate"></span>
				</div>
				<span class="fr" v-if="certificateImg">已上传</span>
			</div>
		</div>
		<div class="picture-bottom" id="aaaa">
			<div class="next">下一步</div>
			<p>
				下一步即表示同意
				<a href="https://mp.weixin.qq.com/s?__biz=MzI3OTU4Mjk0Mw==&mid=2247483667&idx=1&sn=cb644d552de5e1339718da1dd47d6238&chksm=eb44c0a3dc3349b5cb2140ce84210b1f2297165ccdf2065e8cb3555ac36c0b2b14a34483f42d#rd">	
					<span>《微拍竞拍服务协议》</span>
				</a>
			</p>
		</div>
	</div>
	<!-- 上传图片结束 -->
	<!-- 填写表单 -->
	<div class="fill-form" v-if="true">
		<div class="fill-form-con" @click="bytime">
			<div class="clearfix fill-border">
				<label class="fl label">截至时间</label>
				<div class="fl fill-money" id="bytime">{{ fillData.deadLine }}</div>
				<label class="fr fill-icon shotsprites"></label>
			</div>
		</div>
		<div class="fill-form-con" @click="fillbond('0')"><!-- @click="fillbond('0')" -->
			<div class="clearfix fill-border">
				<label class="fl label" for="starting-price">分类</label>
				<div class="fl fill-money" id="fillbond">{{ fillData.classification }}</div>
				<div class="fr fill-icon shotsprites"></div>
			</div>
		</div>
		<!--隐藏图库参数-->
		<input type="hidden" id="parent_id" :value="fillData.parentId" v-model="fillData.parentId">
		<input type="hidden" id="category_name" :value="fillData.categoryName" v-model="fillData.categoryName">
		<input type="hidden" id="imgs" :value="imgsJson">

		<div class="fill-form-con">
			<div class="clearfix fill-border">
				<label class="fl label" for="starting-price">起拍价</label>
				<input type="number" placeholder="0" class="input" id="starting-price" v-model="fillData.startPrice">
			</div>
		</div>
		<div class="fill-form-con clearfix ">
			<label class="fl label" for="section">加价幅度</label>
			<input type="number" placeholder="100" class="input" id="section" v-model="fillData.priceMarkup">
		</div>
		<p class="fill-title">可选</p>
		<div class="fill-form-con">
			<div class="clearfix fill-border">
				<label class="fl label">7天包退</label>
				<div class="fr fill-btn fillbtncur" status_code="1" id="is_refund">
					<div class="btn re">
						<div class="btn-in ab" style="left:1.8rem;"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="fill-form-con">
			<div class="clearfix fill-border">
				<label class="fl label">包邮</label>
				<div class="fr fill-btn fillbtncur" status_code="1" id="is_mail">
					<div class="btn re">
						<div class="btn-in ab" style="left:1.8rem;"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="fill-form-con clearfix" @click="fillbond('2')"><!-- @click="fillbond('2')" -->
			<label class="fl label">保证金</label>
			<div class="fl fill-money" id="key2">{{ fillData.bond }}</div>
			<div class="fr fill-icon shotsprites" ></div>
		</div>
		<p class="fill-title">更多设置</p>
		<div class="fill-form-con clearfix ">
			<label class="fl label" for="fill-price">一口价</label>
			<input type="number" placeholder="0" class="input" id="fill-price" v-model="fillData.fixedPrice">
		</div>
		<p class="fill-title-bottom">出价达到或超过此价格立即成交（无一口价请设0元）</p>
		<div class="fill-form-con clearfix ">
			<label class="fl label">参考价</label>
			<input type="number" placeholder="0" class="input" id="refer_price" v-model="fillData.referPrice">
		</div>
		<p class="fill-explain">提供此拍品的参考价格（无参考价请设0元）</p>
		<button @click="subdata" class="fill-release" id="submit-btn">发布</button>
		<div @click="fillstep" class="fill-step fill-release">上一步</div>
		
		<!-- 保证金弹框 -->
		<div class="fill-box fixed">
			<!-- 分类 一级-->
			<div class="fill-identical ab fill-none">
				<p class="none-title"><span>分类</span>请谨慎选择，切勿跨品类</p>
				<ul class="none-list">
					<li v-for="pt in parentType"  class="clearfix child_types" :id="pt.id">
						<span class="fl">{{ pt.name }}</span>
						<span class="fr shotsprites to-right"></span>
					</li>
				</ul>
			</div>
			<!-- 分类二级 -->
			<div class="fill-identical ab fill-two">
				<div class="two-title re">
					<div class="ab gravity" @click="gravity($event)">重选</div>
					<div class="ab complete">完成</div>
					<div class="title" id="title">玉翠珠宝</div>
				</div>
				<p class="list-title">请选择二级分类</p>
				<ul class="clearfix two-list">
					<li v-for="ct in childType"  class="fl">{{ ct.name }}</li>
				</ul>
			</div>
			<!-- 确定交保证金 -->
			<div class="fill-identical fill-bond ab ">
				<div class="fillbondbg shotsprites"></div>
				<p class="fill-bond-explain">买卖双方都缴纳保证金，如一方<br/>发生违约，将赔付给对方</p>
				<div class="fill-bond-agree fill-state" @click="agree($event)">同意</div>
				<div class="fill-bond-cancel fill-state" @click="cancel($event)">取消</div>
			</div>
			<!-- 保证金额度 -->
			<div class="fill-identical fill-amount ab ">
				<p class="amount-explain">保证金选择</p>
				<ul class="amount-list clearfix">
					<li class="fl" v-for="num in bondarr" @click="amountbond($event)">{{num.bond}}</li>
				</ul>
			</div>
		</div>
		<!-- 截至时间弹框 -->
		<div class="by-time fixed">
			<div class="ab by-time-con">
				<div class="time-today">
					<div class="time-title"><span>{{ date.today }}</span>(今天)</div>
					<ul class="clearfix">
						<li class="fl" v-for="num in datatime" @click="choicetime($event)" v-if="num.id>getHours" :data-num="num.id">{{num.time}}</li>
					</ul>
				</div>
				<div class="time-today">
					<div class="time-title"><span>{{ date.tomorrow }}</span>(明天)</div>
					<ul class="clearfix">
						<li class="fl" v-for="num in datatime" @click="choicetime($event)" :data-num="num.id">{{num.time}}</li>
					</ul>
				</div>
                <div class="time-today">
                    <div class="time-title"><span>{{ date.thirdday }}</span>(后天)</div>
                    <ul class="clearfix">
                        <li class="fl" v-for="num in datatime" @click="choicetime($event)" :data-num="num.id">{{num.time}}</li>
                    </ul>
                </div>
			</div>
		</div>
	</div>
	<!-- 填写表单结束 -->
	
	<!-- iphone播放视频 -->
	<div class="poupu-box" v-show="showBigImgBol">
		<div class="poupu-layer" @click="closeBigImg"></div>
		<!-- 展示视频 -->
		<div class="popup-video-box">
			<video 
				id="my-video" 
				:src="videoSrc" 
				preload="load" 
				controls="controls"
			>
				您的浏览器不支持浏览该视频，请升级版本
			</video>
		</div>
	</div>
	<!-- iphone播放视频结束 -->
	
	<!-- 上传loading -->
	<div id="upload-box">
		<div class="upload-msg">正在上传</div>
		<div id="upload-progress">0%</div>
		<div class="upload-img">
			<img src="/res/img/loading_data.gif" alt="">
		</div>
	</div>
	<!-- 上传loading结束 -->

	<!-- 短信验证码  有时间就做个组件 没时间就呵呵呵-->
	<div class="offer-box fixed" @click="cancelOfferOuter($event)">
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
	
	
	<!-- alert 组件 -->
	<show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>
</div>
</template>
<script>


    module.exports = {
		data:function(){
			return {
				showForm: false,
				isUploaded: true,
				addImgBoll: true,
				parentType : '',
				childType : '',
				maxheight:0,
				datatime:[
					{
						time:"10:00",
						id:"10"
					},
					{
						time:"12:00",
						id:"12"
					},
					{
						time:"16:00",
						id:"16"
					},
					{
						time:"17:00",
						id:"17"
					},
					{
						time:"19:00",
						id:"19"
					},
					{
						time:"20:00",
						id:"20"
					},
					{
						time:"21:00",
						id:"21"
					},
					{
						time:"22:00",
						id:"22"
					},
					{
						time:"23:00",
						id:"23"
					}
				],
				bondarr:[
					{bond:"0"},
					{bond:"10"},   // 测试卖家保证金  完成改为10
					{bond:"20"},
					{bond:"30"},
					{bond:"50"},
					{bond:"100"},
					{bond:"200"},
					{bond:"500"},
					{bond:"1000"}
				],
				// 上传数据
				fillData: {
					name: '',                     // 拍品描述
					deadLine: '选择时间',         // 截止时间
					classification: '请选择分类', // 商品分类
					parentId: '',                 // 上传商品id
					categoryName: '',			  // 上传商品名字
					startPrice: '',               // 起拍价
					priceMarkup: '100',              // 加价幅度
					bond: 0,                      // 保证金
					fixedPrice: '',     		  // 一口价
					referPrice: '',     		  // 参考价	

				},
				getHours: 0,     
				date : [],     					  // 时间
				uploadArr: [					  // 上传组件触发元素
					'uploadfile',
					'certificate'
				],          
				index: 0,                         // 当前使用上传组件下标
				imgs: [],      					  // 上传图片
				certificateImg: '',     		  // 鉴定证书
				imgsJson : '', /*图片路径转为字符串*/
				baseUrl1 : config.img_url,  // 图片服务器
				baseUrl2 : "http://xfpvideoupload.oss-cn-beijing.aliyuncs.com/", // 视频未转码
				baseUrl3 : "http://xfpvideo.oss-cn-beijing.aliyuncs.com/",       // 视频转码
				//上传后的视频链接的相对地址
				videoBaseSrc : "",
				// alert组件
				showAlertBoll: false,
				// 提示信息
				tipMsg: '这是提示信息',
				// 模态框
				showBigImgBol: false,
				// 图片链接
                imgSrc: '',
                // 视频链接
                videoSrc: '',
                isImages: true,

                // 重新上架数据
                shelfData: {},

                // 短信验证码相关
                showMobile: false,      // 手机号码输入弹窗
                showVerCode: false,		// 验证码
				mobileNum: '',          // 输入手机号
				smsInput: '',           // 输入验证码
				smsVerBoll: false,      // 是否可以点击获取验证码

				// plupload 初始化对象
				pluploadObj: {},  

			}
		},
		components: {
            'show-alert': showAlert
        },
		
        beforeDestroy: function() {
        	$(".footer-bottom a").eq(0).removeClass("router-link-active");
        },
		created: function() {
			// 上架查询
			var goodsId = utils.getRequest().goodsid;
			this.getShelfQuery(goodsId)

			// 数据赋值
			if (utils.getRequest().goodsid) {
				this.fillData = this.toUpdateValue();
			};
		},
		mounted: function(){
			document.title = "发布拍品"
			var _this = this;

			this.$nextTick(function(){
				// this.addRouterLink()

				// textarea 输入框
				utils.getKeyboard($('.picture-textarea'),$('.footer-bottom'),$('.release-picture'))

				// 价格输入
				utils.getKeyboard($('.input'),$('.footer-bottom'),$('.release-picture'))

				setTimeout(function(){
					var shimLen = $(".add .moxie-shim");
		        	for (var i = 0; i < shimLen.length - 1; i++) {
		        		$(shimLen[i]).remove();
		        	};
				},1000)

				/* iphone返回 缓存数据 引起发布按钮不能点击的bug */
				$('#submit-btn').attr("disabled",false);
				/* end */

			})

	        // 图片上传
			$(this.$refs.uploadfile).on('touchend',function() {
                _this.index = $(this).attr('data-index')
            })
            $(this.$refs.certificate).on('touchend',function() {
                _this.index = $(this).attr('data-index')
            })

            // 上传图片注册
            this.pluploadInit('uploadfile');

            // 绑定鉴定证书按钮
            Plupload.init({
                browseButton: 'certificate',
                fileUploadEvent: function(up, file, info){ 
                    var emitId = this.browseButton[_this.index];
                    _this.certificateImg = file;
                },
                fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
            });

            // 重新上架绑定微信预览
			if ($('.picture-list img')) {
				utils.wxPreviewImage($('.picture-list img'),'.picture-list')
			};
			
			// 视频上传
			pluploadVideo.init({ 
				browseButton : "addvideo",
				fileUploadEvent : function(up, file, info){
					_this.checkFileNum();

					_this.imgs.push({
						type : 'video',
						url : file
					});

					//转码后的视频地址
					var transcoding = "http://xfpvideo.oss-cn-beijing.aliyuncs.com/"+ file;

					//保存视频的相对地址
					_this.videoBaseSrc = file;

					_this.formatImgs();
				},
				fileType : ["video/mp4","video/avi","video/flv","video/wmv","video/3gp"]
			});

			this.getHours = new Date().getHours();
			this.maxheight=$(window).height()/2-$(".fill-none .none-list").height();
			$(".fill-none .none-list").css("max-height",this.maxheight);//加最大高度内容过多出现滚动条
			$(".fill-box,.by-time").click(function(){//点击黑层消失
				$(this).hide();
				$(this).children().hide();
				$("html,body").removeClass("ovferyhtml");
			});
			$(".fill-identical,.by-time-con").click(function(event){
				event.stopPropagation();
			});
			$(".picture-bottom .next").click(function(){//图层切换
				// 判定只有输入了描述并且上传了图片  才能下一步
				var desc = _this.emoji2Str( $('.picture-textarea').val() ).replace(/\s/g,"");
				var len = _this.imgs.length;
				if (desc && len) {
					// _this.showForm = true;
					_this.$nextTick(function(){
						$(".picture-content").hide();
						$(".fill-form").show();
					})
					
				} else if (desc && !len) {
					_this.tipMsg = "请上传图片!";
					_this.showPopup()
				} else if( !desc && len) {
					_this.tipMsg = "请填写拍品描述(禁止输入表情)!";
					_this.showPopup()
				} else {
					_this.tipMsg = "请填写拍品描述(禁止输入表情)!";
					_this.showPopup()
				}
				
			});

			$(".gravity").click(function(){//重选
				$(this).parents(".fill-box").children().eq(0).show().siblings().hide();
			});
			$(".complete").click(function(){//完成
				var html=$(this).siblings(".title").text() +$(".two-list .current").text();
				$("#fillbond").text(html);
				$(this).parents(".fill-box").hide();
				$("html,body").removeClass("ovferyhtml");
			});
			$(".fill-btn").click(function(){//状态
				$(this).toggleClass("fillbtncur");
				$(this).attr('status_code') == 0 ? $(this).attr('status_code',1) : $(this).attr('status_code',0);
				if($(this).hasClass("fillbtncur")){
					$(this).find(".btn-in").stop().animate({left:"1.8rem"},300);
				}else{
					$(this).find(".btn-in").stop().animate({left:0},300);
				}
			});
		},
		methods:{
			/**
             * 图片上传初始化
             * @param  {string} self 图片上传绑定元素
             * @return 无
             */
            pluploadInit: function(self) {
                var _this = this;
                var plupload = new PluploadMore();
                plupload.init({
                    browseButton: self,
                    fileUploadEvent: function(up, file, info){ 
                        var emitId = this.browseButton[_this.index];
                        if (emitId == 'uploadfile') {
                            _this.checkFileNum();
                            if (_this.imgs.length <= 9) {
                            	_this.imgs.push({
									type: 'img',
									url: file,
								});
                            };
							
							_this.formatImgs();//json化图片数据
                        } else if (emitId == 'certificate') {
                            _this.certificateImg = file;
                        } 
                    },
                    fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
                });
            },

			// 点击拍品显示大图
            showBigImg: function(ev) {

       			var _this = this;
                var $node = $(ev.target);                        // 视频标签节点
                var videoSrc = $(ev.target).attr('src');         // 视频整体地址
                var relativeSrc = $(ev.target).attr('data-src'); // 视频相对地址
                 
                // 转码视频
                this.videoSrc = this.baseUrl3 + relativeSrc;
                // 设备检测
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {// iphone
                    this.showBigImgBol = true;
                    // 判断网路状态
                    this.$nextTick(function(){
                        setTimeout(function(){
                            var video = $("#my-video");
                            // var video = $node;
                            if(video[0].networkState == 3){
                                // 使用未转码视频
                                _this.videoSrc = _this.baseUrl2 + relativeSrc;
                                _this.$nextTick(function(){
                                    video[0].play();
                                });
                            } else {
                                video[0].play();
                            }
                        }, 200);
                    });
                    
                } else if (/(Android)/i.test(navigator.userAgent)) { //安卓
                    this.$nextTick(function(){
                        setTimeout(function(){
                            var video = $node;
                            
                            if(video[0].networkState == 3){
                                // 使用未转码视频
                                _this.videoSrc = _this.baseUrl2 + relativeSrc;
                                $node.attr('src',_this.videoSrc)
                                _this.$nextTick(function(){
                                    video[0].play();
                                });
                            } else {
                                // 赋值src
                                $node.attr('src',_this.videoSrc)
                                video[0].play();
                            }
                        }, 200);
                    });
                }
                
            },

            // 关闭大图展示
            closeBigImg: function() {
            	this.baseUrl2 = "http://xfpvideoupload.oss-cn-beijing.aliyuncs.com/";
                this.showBigImgBol = false;
            },

			// 移除当前选中图片
			removePreviewImg: function(ev) {
				var len = $(".picture-list li").length;
				if (len == 9) {
					this.addImgBoll = true;
				};
				if (ev.target.nodeName.toUpperCase() == 'SPAN' || ev.target.nodeName.toUpperCase() == 'P') {
					var _index = $(ev.target).parents('.img-box').get(0).dataset.index;
					this.imgs.splice(_index,1)
				};
				this.formatImgs();
			},

			formatImgs : function(){ //增减图片后修改入库数据格式
				//转换为json数据
				this.imgsJson = JSON.stringify(this.imgs);
			},

			// 转掉表情
			emoji2Str: function(str) {
				return unescape(escape(str).replace(/\%uD.{3}/gi, ''))
			},

			fillbond: function(num) {//封装点击弹框
				//var that=this;
				if(num == 0){ //请求父类分类数据
					var vue = this;
					ajax.getType(0,function(res){
						if(res.status == 200){
							vue.parentType = res.data;
							vue.$nextTick(function(){
								$('.child_types').click(function(){  //一级分类点击事件
									var parent_id = $(this).attr('id');
									$('#parent_id').val(parent_id); //隐藏一级分类对应的id zyw
									vue.fillData.parentId = parent_id;
									$("#title").text($(this).text());
									$(this).parents(".fill-identical").next().show().siblings().hide();
									$(".fill-two .two-list").css("max-height",vue.maxheight-$(".fill-two .list-title").height());//加最大高度内容过多出现滚动条
									ajax.getType(parent_id,function(res){
										if(res.status == 200){
											vue.childType = res.data;
											vue.$nextTick(function(){ //二级分类的点击事件
												$('.two-list li').click(function(){
													$('#category_name').val($(this).html())//隐藏二级分类对应的id zyw
													vue.fillData.categoryName = $(this).html();
													$(this).addClass("current").siblings().removeClass("current");
												})
											})
										}else{
											alert(res.msg)
										}
									});
								})
							})
						}else{
							alert(res.msg)
						}
					});
				}
				$(".fill-box").show().children().eq(num).show().siblings().hide();
				$("html,body").addClass("ovferyhtml");
			},
			agree:function(event){//保证金同意
				$(event.target).parent().next().show().siblings().hide();
			},
			cancel:function(event){//取消保证金
				$(".fill-box").hide();
				$("html,body").removeClass("ovferyhtml");
			},
			bytime: function(){//时间弹框
				var vue = this;
				ajax.getDate(function(res){
					vue.date = res;
				});
				$(".by-time").show();
				$(".by-time-con").show();
				$("html,body").addClass("ovferyhtml");
			},
			choicetime: function(event){//点击时间点
				var curtime= new Date().getHours();
				var time=$(event.target).attr("data-num");
				if(time){
					var html=$(event.target).parent().siblings().children("span").text() + ' ' + $(event.target).text();
					$("#bytime").text(html);
					$(event.target).parents(".by-time").hide();
					$("html,body").removeClass("ovferyhtml");
				}
			},
			fillstep:function(){//上一部
				$(".fill-form").hide();
				$(".picture-content").show();
			},
			amountbond:function(even){//点击保证金额
				$("#key2").text($(event.target).text());
				$(".fill-box").hide();
				$("html,body").removeClass("ovferyhtml");
			},
			checkFileNum: function(){
				var len = $(".picture-list li").length;
				if (len < 9) {
					if (len == 8) {
						// 移除上传视频按钮 + 上传图片按钮
						this.addImgBoll = false;
					};
				}
			},

			// alert弹窗显示
			showPopup: function() {
				this.showAlertBoll = true;
			},

			// alert弹窗关闭
			closePopup: function() {
				this.showAlertBoll = false;
			},

			// 路由改变
			addRouterLink: function() {
				$(".footer-bottom a").eq(0).addClass("router-link-active");
			},
			/**
			 * 根据id查询当前上架拍品
			 * @param  {string} goodsId 拍品id
			 * @return 无
			 */
			getShelfQuery: function(goodsId) {
				var _this = this;
				ajax.shelfQuery(goodsId,function(data){
					if (data.status == 200) {
						_this.shelfData = data.data;
					};
				})
			},

			/**
			 * 重新上架商品赋值
			 * @return {object} 查询到的拍品数据对象
			 */
			toUpdateValue: function() {
				var fillDataObj = {
					name: 			this.shelfData.desc,
					deadLine: 		'选择时间',
					classification: this.shelfData.type,
					parentId: 	  	this.shelfData.parent_id,       // 分类id
					categoryName: 	this.shelfData.category_name,   // 商品名字
					startPrice:   	this.shelfData.start_price,
					priceMarkup:  	this.shelfData.increase_price,
					bond: 		  	this.shelfData.deposit_price,
					fixedPrice:   	this.shelfData.once_price,
					referPrice:   	this.shelfData.refer_price,
					certificate:    this.baseUrl1 + this.shelfData.certificate,
				}



				// 遍历images
				this.imgs = this.shelfData.images;

				this.certificateImg = this.baseUrl1 + this.shelfData.certificate;
				// 传递后端图片数据
				this.formatImgs();

				return fillDataObj;
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
                // 获取输入的手机号
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
                var type = 1;
                ajax.smsVerifiy(mobile,sms,type,function(data) {
                    _this.smsInput = '';
                    if (data.status == 200) { 
                        // 通过验证
                        _this.showVerCode = false;
                        _this.showMobile = false;
                        $('.offer-box').hide();
                        
                        _this.showAlertTip("修改成功")
                    } else {
                        _this.showAlertTip(data.msg)
                    }
                })
            },

            // 关闭弹窗
            cancelOfferOuter: function(ev) {
                if ( $(ev.target).hasClass('offer-box') ) {
                	clearInterval(this.timer);
                    this.setZeroOfferBox();
                };
            }, 

            // 置空出价框
            setZeroOfferBox: function(){
                $('.offer-box').hide();
                this.smsInput = '';
                this.mobileNum = '';
                // 清空倒计时
            },
            // alert弹窗
            showAlertTip: function(tip) {
            	this.tipMsg = tip;
				this.showPopup();
            },


			subdata : function(){
				var imgs = $('#imgs').val();
				var parent_id = $('#parent_id').val();
				// var parent_id = this.parentId;
				var category_name = $('#category_name').val(); //以上两项为type表对应的一级id和二级名称
				var end_time = $('#bytime').text();
				var start_price = Number( $('#starting-price').val() );
				var increase_price = Number( $('#section').val() );
				var is_refund = $('#is_refund').attr('status_code');
				var is_mail = $('#is_mail').attr('status_code');
				var deposit_price = Number( $('#key2').text() );
				var once_price = Number( $('#fill-price').val() || 0 );
				var refer_price = Number( $('#refer_price').val() || 0 );
				var desc = this.emoji2Str( $('.picture-textarea').val() );
				var goods_id = utils.getRequest().goodsid || 0; //该数据不为0视为用户修改数据重新发布 0 添加  1 修改

				//取全部数据
				all_data = {
					'images': imgs,
					'end_time':end_time,
					'parent_id':parent_id,
					'category_name':category_name,
					'start_price':start_price,
					'increase_price':increase_price,
					'is_refund':is_refund,
					'is_mail':is_mail, 
					'deposit_price':deposit_price,
					'once_price':once_price,
					'refer_price':refer_price,
					'desc': desc,
					'goods_id': goods_id,
					'certificate': this.certificateImg
				};
				var vue = this;
				var numReg = /^[\d]+\.?\d*$/;
				// 本地数据验证
				if ( all_data.desc.length == 0 ) { // 拍品描述不要为空
					vue.tipMsg = "请输入拍品描述";
					vue.showPopup()
				} else if ( all_data.images.length == 0 ) {// 上传图片或者视频
					vue.tipMsg = "请上传图片";
					vue.showPopup()
				} else if (all_data.end_time == '选择时间') { //选择时间
					vue.tipMsg = "请选择截至时间";
					vue.showPopup()
				} else if (all_data.parent_id.length == 0 && all_data.category_name.length == 0) { //选择分类
					vue.tipMsg = "请选择分类";
					vue.showPopup()
				} else if (all_data.increase_price == 0) { //加价幅度
					vue.tipMsg = "加价幅度不能为0";
					vue.showPopup()	
				} else if (!numReg.test(all_data.start_price) ) { //起拍价 
					vue.tipMsg = "起拍价请输入数字";
					vue.showPopup()
				} else if (!numReg.test(all_data.increase_price)) {//加价幅度
					vue.tipMsg = "加价请输入数字";
					vue.showPopup()
				/** modifier LL 判断一口价和起拍价，一口价和加价幅度 **/
				} else if ((all_data.once_price != "" || all_data.once_price != 0) && all_data.once_price < all_data.start_price){
					vue.tipMsg = "一口价必须大于起拍价";
					vue.showPopup();
				} else if ((all_data.once_price != "" || all_data.once_price != 0) && all_data.increase_price > all_data.once_price){
					vue.tipMsg = "加价幅度不能大于一口价";
					vue.showPopup();
				/** modify end **/
				} else {
					$('#submit-btn').attr("disabled",true);

					ajax.postPublish(all_data,function(res){
						if(res.status == '200'){
							var goods_id = res.data.goods_id;
							if(all_data.deposit_price != 0 || res.data.status == 6){  //用户保证金设置为0 或者 未交纳保证金 跳转支付页面
								/* iphone返回 缓存数据 引起发布按钮不能点击的bug */
								$('#submit-btn').attr("disabled",false);
								/* end */
								window.location.href = '/payment/'+ goods_id + '?type=seller&ordertype=5&round=' + new Date().getTime();
							}else{  //设置保证金为 0 或者已经交纳过保证金 跳转到商品详情页
								vue.$router.push('/lotdetails/'+ goods_id);
							}

						} else if (res.status == '202') {
							$('#submit-btn').attr("disabled",false);
							$('.offer-box').show()
							vue.showMobile = true;
						} else {
							$('#submit-btn').attr("disabled",false);
							vue.tipMsg = res.msg;
							vue.showPopup()
						}
					});
					
				}
			}
		}
	}

</script>
<style>
.release-picture {
	margin-bottom: 10rem;
}
.lot-picture{
	padding-left: 1.5rem;
	background-color: #fff;
}
.picture-textarea{
	display: block;
	width: 100%;
	height: 12.8rem;
	padding:0.75rem 1.3rem 0.75rem 0;
	resize: none;
	font-size: 1.4rem;
}
.picture-list{
	position: relative;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid #b2b2b2;
}
.picture-list li,
.copy-li {
	height: 7.85rem;
	width: 7.85rem;
	margin:0 1rem 1rem 0;
}
.copy-li .moxie-shim {
	width: 7.8rem!important;
	height: 7.8rem!important;
}
.picture-list li img,
.picture-list li .my-video {
	width: 100%;
	height: 100%;
}
.picture-list li .delete{
	position: absolute;
	width: 2rem;
	height: 2rem;
	padding:0.15rem;
	left: -0.4rem;
	top: -0.4rem;
	z-index: 19;
}
.picture-list li .delete .delete-in{
	height: 1.7rem;
	line-height: 1.5rem;
	border-radius: 50%;
	background-color: #787878;
	text-align: center;
}
.picture-list li .delete .delete-in span{
	display: inline-block;
	vertical-align:middle;
	width: 1rem;
	height: 0.2rem;
	background-color: #fff;
}
.picture-list .video,.picture-list .add{
	background-color: #f8f8f8;
}
.picture-list .video .videobg{
	width: 4.65rem;
	height: 3.75rem;
	margin:1rem auto 0;
}
.picture-list .video p{
	padding-top: 0.5rem;
	text-align: center;
	font-size: 1.2rem;
	color: #999;
}
.picture-list .add .transverse{
	width: 3.5rem;
	height: 0.2rem;
	background-color: #999;
	left: 0;
	right: 0;
	top: 2.8rem;
	margin:auto;
}
.picture-list .add .vertical{
	width: 0.2rem;
	height: 3.5rem;
	background-color: #999;
	left: 0;
	right: 0;
	top: 1.15rem;
	margin:auto;
}
.picture-list .add p{
	font-size: 1.2rem;
	color: #999;
	text-align: center;
	padding-top: 5.25rem;
}
.picture-list .addpicture{
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.picture-appraisal{
	height: 4.5rem;
	line-height: 4.5rem;
	font-size: 1.6rem;
	color: #333;
}
.picture-appraisal span:nth-child(3){
	font-size: 1.4rem;
	color: #999;
}
.picture-appraisal .appraisal-box {
	width: 6rem;
	height: 100%;
	position: relative;
	float: right;
}
.picture-appraisal .appraisal{
	width: 3.15rem;
	height: 2.4rem;
	margin:1.1rem 1.4rem 0;
}
.picture-appraisal .moxie-shim {
	width: 4rem!important;
	height: 100%!important;
}
.picture-bottom{
	padding-top: 2rem;
}
.picture-bottom .next{
	width: 30rem;
	height: 4.5rem;
	line-height: 4.5rem;
	text-align: center;
	font-size: 1.5rem;
	color: #fff;
	border-radius: 0.4rem;
	background-color: #15af25;
	margin:0 auto;
}
.picture-bottom p{
	font-size: 1.4rem;
	color: #999;
	text-align: center;
	line-height: 3.5rem;
}
.picture-bottom p span{
	color: #3366ff;
}
/* 填写表单 */
.fill-form{
	display: none;
	font-size: 1.4rem;
	color: #999;
}
.fill-form-con{
	background-color: #fff;
	padding-left: 1rem;
}
.fill-border{
	border-bottom: 1px solid #ccc;
}
.fill-form-con .label{
	width: 7.75rem;
	height: 4.4rem;
	line-height: 4.4rem;
	color: #333;
}
.fill-form-con .fill-icon{
	height: 4.4rem;
	width: 4rem;
}
.fill-form-con .input{
	height: 4.4rem;
	line-height: 4.4rem;
	width: 28.5rem;
	color: #6e7294;
}
.fill-form-con .fill-money{
	height: 4.4rem;
	line-height: 4.4rem;
	width: 24rem;
	color: #999;
}
.fill-title{
	height: 4.4rem;
	padding-left: 1rem;
	padding-top: 1.6rem;
	color: #999;
}
.fill-title-bottom {
	height: 4.4rem;
	padding-left: 1rem;
	padding-top: .6rem;
	color: #999;
	font-family: pingfangsc-regular; 
}
.fill-form-con .fill-btn{
	height: 4.4rem;
	width: 7.3rem;
}
.fill-form-con .fill-btn .btn{
	width: 4.4rem;
	height: 2.5rem;
	margin:0.95rem auto 0;
	border:3px solid #ccc;
	border-radius: 1.25rem;
}
.fill-form-con .fill-btn .btn .btn-in{
	left: 0;
	top: -0.0.5rem;
	height: 2.3rem;
	width: 2.3rem;
	border-radius: 50%;
	border:1px solid #ccc;
	box-shadow: 0 0.1rem 0.2rem rgba(0,0,0,0.2);
	background-color: #fff;
}
.fill-form-con .fillbtncur .btn{
	background-color: #44db5e;
}
.fill-form-con .fill-btn .btncur .btn-in{
	float: right;
}
.fill-explain{
	padding-left: 1rem;
	font-size: 1.2rem;
	line-height: 3rem;
	margin-bottom: 3.5rem;
	color: #999;
	font-family: pingfangsc-regular; 

}
.fill-release{
	display: block;
    width: 30rem;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    font-size: 1.5rem;
    color: #fff;
    border-radius: 0.4rem;
    background-color: #15af25;
   	margin:0 auto 2rem;
}
.fill-step{
	background-color: #808593;
}

/* 弹框 */
.fill-box{
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 12;
	background-color: rgba(0,0,0,0.4);
	display: none;
}
.fill-identical{
	width: 100%;
	left: 0;
	bottom: 0;
	background-color: #f7f8f7;
	display: none;
}
/* 分类一级 */
.fill-none .none-title{
	font-size: 1.3rem;
	color: #999;
	height: 5rem;
	line-height: 5rem;
}
.fill-none .none-title span{
	font-size: 1.6rem;
	padding:0 1rem 0 1.25rem;
}
.fill-none .none-list{
	background-color: #fff;
	height: 100%;
	overflow: auto;
}
.fill-none .none-list li{
	padding:0 1rem 0 1.25rem;
	border-bottom: 1px solid #e5e5e5;
	height: 4.5rem;
	line-height: 4.4rem;
	font-size: 1.4rem;
	color: #333;
}
.fill-none .none-list li:last-child{
	border-bottom: none;
}
.fill-none .none-list li span:last-child{
	width: 1rem;
	height: 1.5rem;
	margin-top:1.5rem; 
}
/* 分类二级 */
.fill-two .two-title{
	height: 5rem;
	line-height: 5rem;
	font-size: 1.4rem;
	color: #999;
}
.fill-two .two-title .gravity,.fill-two .two-title .complete{
	top: 0;
	width: 6rem;
	height:5rem;
}
.fill-two .two-title .gravity{
	left: 0;
	padding-left: 1.5rem;
}
.fill-two .two-title .complete{
	right: 0;
	text-align: right;
	padding-right: 1.5rem;
	color: #15af25;
}
.fill-two .two-title .title{
	text-align: center;
	font-size: 1.6rem;
	color: #333;
}
.fill-two .two-list,.fill-two .list-title{
	background-color: #fff;
	padding-left: 1.5rem;
}
.fill-two .list-title{
	font-size: 1.4rem;
	color: #999;
	line-height: 4.5rem;
}
.fill-two .two-list{
	padding-bottom: 6rem;
	overflow: auto;
}
.fill-two .two-list li{
	height: 3rem;
	line-height: 2.8rem;
	font-size: 1.4rem;
	color: #333;
	width: 7.5rem;
	text-align: center;
	border:1px solid #ccc;
	margin-right: 1.5rem;
	border-radius: 0.4rem;
	margin-bottom: 1rem;
}
.fill-two .two-list li.current{
	color: #ad1a1a;
	border-color: #9f0917;
}
/* 确定交保证金 */
.fill-bond .fillbondbg{
	margin:1.25rem auto 1rem;
	width: 5.2rem;
	height: 5.2rem;
}
.fill-bond .fill-bond-explain{
	font-size: 1.6rem;
	color: #000;
	text-align: center;
	padding-bottom: 1.5rem;
}
.fill-bond .fill-state{
	width: 30rem;
	height: 4.4rem;
	line-height: 4.2rem;
	text-align: center;
	font-size: 1.6rem;
	color: #333;
	border-radius: 0.4rem;
	border:1px solid #ccc;
	margin:0 auto 1.9rem;
	background-color: #fff;
}
.fill-bond .fill-bond-cancel{
	background-color: #808593;
	color: #fff;
}
/* 保证金额度 */
.fill-amount .amount-explain{
	font-size: 1.6rem;
	padding-left: 1rem;
	height: 4.5rem;
	line-height: 4.5rem;
}
.fill-amount .amount-list{
	padding:1rem 2.25rem 0;
}
.fill-amount .amount-list li{
	width: 5rem;
	height: 2.25rem;
	line-height: 2.1rem;
	text-align: center;
	border:1px solid #6e7294;
	font-size: 1.2rem;
	color: #999;
	margin:0 3rem 2rem;
	border-radius: .2rem;
}
/* 截至时间弹框 */
.by-time{
	left: 0;
	top: 0;
	z-index: 12;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.4);
	display: none;
}
.by-time .by-time-con{
	left: 0;
	bottom: 0;
	width: 100%;
	padding:0.5rem 0 0 1.5rem;
	background-color: #fff;
	max-height: 40rem;
    overflow: scroll;
}
.by-time .time-title{
	font-size: 1.6rem;
	color: #6e7294;
	height: 4.5rem;
	line-height: 4.5rem;
}
.by-time li{
	font-size: 1.4rem;
	color: #333;
	height: 3.5rem;
	line-height: 3.4rem;
	width: 10.5rem;
	text-align: center;
	border:1px solid #ccc;
	border-radius: 0.4rem;
	margin-right: 1.5rem;
	margin-bottom: 1rem;
}

/* 进度条 */
#progress-bar {
	position: relative;
	display: none;
}

#lanren{
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 100%; 
	height: 2rem; 
	margin:0 auto;
}
#bar{ 
	display: block;
	background: #2BB7E4; 
	float: left; 
	height: 100%;
	text-align: center;
	line-height: 2rem;
	color: #FFF;
}

/* 模态框 */
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

/* 正在上传 */
#upload-box {
	position: fixed;
	top: 50%;
	left: 50%;
	-webkit-transform: translate3D(-50%,-50%,0);
	transform: translate3D(-50%,-50%,0);
	width: 24rem;
	height: 14rem;
	background-color: rgba(0,0,0,.5);
	border-radius: .5rem;
	font-size: 1.6rem;
	text-align: center;
	display: none;
}
#upload-box div {
	color: #f0f0f0;
}
.upload-msg {
	margin-top: 2rem;
}
#upload-progress {
	margin: 1rem 0;
}
.upload-img {
	display: inline-block;
	width: 3rem;
	height: 3rem;
	margin-top: 0rem;
}
.upload-img img {
	width: 100%;
	height: 100%;
}


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
</style>
