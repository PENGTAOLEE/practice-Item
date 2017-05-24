<template>
<div class="newschat re" id="newschat">
	<div class="chat-title fixed">
		<a class="chat-back ab" @click="backrouter">
			<span class="shotsprites"></span>
		</a>
		<p class="name">{{otherName}}</p>
	</div>
	<!-- 聊天列表 -->
	<div class="chat-list">
		<!-- loading -->
		<div class="chat-list-loading">
			<img v-show="loaded"  src="/res/img/loading.gif" alt="Loading">
		</div>
		<div class="chat-con clearfix re" v-for="raw in news" :class="raw.objclass">
			<!-- 跳转店铺首页 -->
			<template v-if="raw.objclass == 'chat-other'">
				<!-- 用户的user_id  :to="/shops/  + item.user_id + '?type=2' " -->
				<router-link :to="/shops/  + otherId + '?type=2' " class="other-img">
					<span class="other-img" :style="{background : 'url('+otherThumb+') center/contain no-repeat'}"></span>
				</router-link>
			</template>
			<!-- 跳转自己的店铺首页 -->
			<template v-if="raw.objclass == 'chat-own'">
				<router-link :to="/shops/  + userId + '?type=2' " class="other-img">
					<span class="other-img" :style="{background : 'url('+userThumb+') center/contain no-repeat'}"></span>
				</router-link>
			</template>

			<template v-if="raw.type == 0">
				<div class="other-con" v-html="raw.html"></div>
			</template>
			<template v-if="raw.type == 1">
				<div class="other-con">
					<div class="divbg works-picture re" >
						<img :src="raw.html.thumb" alt="">
					</div>
				</div>
			</template>
			<template v-if="raw.type == 2">
				<router-link class="other-con" :to="'/lotdetails/'+raw.html.id">
					<div class="divbg works-picture re">
						<img :src="raw.html.thumb.url" alt="">
						<div class="ab works-copy">{{raw.objclass == "chat-other" ? "Ta在查看..." : "正在查看"}}</div>
					</div>
					<div class="clearfix">
						<p class="works-link fl">{{raw.html.title}}</p>
						<span class="fr"></span>
					</div>
				</router-link>
			</template>
			<template v-if="raw.type == 3">
				<div class="other-con" @click="goTo('/lotdetails/'+raw.html.id)">
					<div class="divbg works-picture re">
						<img :src="raw.html.thumb.url" alt="">
						<div class="ab works-copy">正在查看...</div>
					</div>
					<div class="clearfix">
						<p class="works-link fl works-ellipsis">{{raw.html.title}}</p>
						<span class="fr worksbtn" @click.stop="pushGoods($event, raw.html.id, raw.html.title, raw.html.thumb)">发送拍品</span>
					</div>
				</div>
			</template>

			<div class="other-bg ab shotsprites"></div>
		</div>
	</div>
	<!-- 底部输入栏 -->
	<div class="chat-bottom fixed">
		<div class="add-con">
			<textarea class="add-con-in" id="txtContent" rows="1" cols="50" @keyup="resizeTextarea()" contenteditable="true" v-model="message"> </textarea>
		</div>
		<div class="ab add-btn" @click="addbtn($event)">发送</div>
		<a class="ab add-img" id="uploadfile">+</a>
	</div>
</div>
</template>
<script>


    module.exports = {
		data : function(){
			return {
				//聊天记录
				news : [],
				//聊天日志的页数
				page : 1,
				//发送的消息
				message : "",
				//用户头像
				userThumb : "/res/img/fans1.png",
				//用户id
				userId : "",
				//对方id
				otherId : "",
				//对方头像
				otherThumb : "/res/img/fans1.png",
				//对方名字
				otherName : "机器人",
				// loading
				loaded: false,
				//ajax锁
				ajaxLock : true,
				//聊天日志的时间
				msgTime : 0
			}
		},
		
		created : function(){
			//初始化时获取聊天日志
			this.init();
		},
		watch : {
			//路由发生变化时获取聊天日志
			'$route' : 	'init'
		},
		mounted : function(){
			var _this = this;
			//调整页面显示位置
			this.locationIn();

			this.initImageUpload();

			// 绑定上拉加载
			this.pullUpLoading();

			$('.footer-bottom').hide()

			// utils.getKeyboard($('#txtContent'),$('.footer-bottom'))
			$('#txtContent').focus(function(){
				$(".chat-list").scrollTop($(".chat-list")[0].scrollHeight);
			})

			this.$nextTick(function(){
				// 微信预览
				utils.wxPreviewImage($('.works-picture img'),'.works-picture');
			})

		},
		beforeRouteLeave : function(to, from, next){
			$('.footer-bottom').show()
			websocket.close();
			next();
		},
		methods : {
			//初始化操作
			init : function(){
				//获取聊天双方用户信息
				this.getContactsInfo();
				//创建websocket连接
				this.openChat();
				//获取聊天日志
				this.getLog();
				//记录进入页面的时间
				nowTime = new Date();
				//判断是否默认发送拍品
				this.defaultSendGoods();
			},
			//获取聊天双发的用户信息
			getContactsInfo : function(){
				var that = this;

				ajax.getContactsInfo(this.$route.params.id, function(res){
					if(res.status == 200){
						that.userThumb = res.data.userInfo.thumb;
						that.otherThumb = res.data.otherInfo.thumb;
						that.otherName = res.data.otherInfo.name;
						that.userId = res.data.userInfo.id;
						that.otherId = res.data.otherInfo.id;
					}
					
				});
			},
			//发送聊天文本
			addbtn : function(){
				if(this.message != ""){
					this.timeTag();

					//更新聊天数据
					this.news.push({
						objclass : "chat-own",
						html : this.message,
						type : 0
					});

					//调整页面显示位置
					this.$nextTick(function(){
						$(".chat-list").scrollTop($(".chat-list")[0].scrollHeight);
					});

					//通过websocket发送数据
					var data = {
						handler : "chatonline",
						data : {
							toid : this.$route.params.id,
							msg : this.message,
							type : 0
						}
					};

					this.message = "";
					$('#txtContent').attr('rows',1)
					$('#txtContent').focus()
					websocket.sendMsg(data);
				}
			},

			// 定位在当前聊天位置
			locationIn: function() {
				var $height = $(window).height();
				$("#newschat").css("height",$height);
				$(".chat-list").scrollTop($(".chat-list")[0].scrollHeight);
			},

			//获取聊天日志
			getLog : function(){
				var id = this.$route.params.id;
				var that = this;

				//如果处于锁状态，则无法再次获取数据
				//当取得一次空数据后，则不会再发送请求获取日志
				if(that.ajaxLock == false){
					return;
				}

				//获取聊天历史记录
				ajax.getLog(id, that.page, function(res){
					if(res.status == 200){
						
						var data = res.data;

						//输出聊天日志的时间
						for(var i=0;i<data.length;i++){
							//如果两条聊天记录之间的时间差超过600秒，则插入一条时间
							if ((that.msgTime - data[i].inputtime) >= 600) {
								that.news.unshift({
									objclass: "chat-time",
									html: that.timeToDate(data[i].inputtime * 1000),
									type : 0
								});
							}

							//记录该条聊天记录的时间
							that.msgTime = data[i].inputtime;

							//如果消息格式不为文本，则转化为json
							if(data[i].type == 2 || data[i].type == 1){
								data[i].msg = JSON.parse(data[i].msg);
							}

							//如果为图片，则替换路径
							if(data[i].type == 1){
								data[i].msg.thumb = config.img_url + data[i].msg.thumb;
							}

							//如果为拍品，则替换图片路径
							//if(data[i].type == 2){
							//	data[i].msg.thumb.url = config.img_url + data[i].msg.thumb.url;
							//}

							//输出聊天内容
							if(data[i].sendid == id){
								//对方的消息
								that.news.unshift({
									objclass : "chat-other",
									html : data[i].msg,
									type : data[i].type
								});
							} else {
								//自己的消息
								that.news.unshift({
									objclass : "chat-own",
									html : data[i].msg,
									type : data[i].type
								});
							}
						}

						//如果获取到的聊天记录数量少于50
						//则证明这次获取到的是最后一次聊天记录
						//所以在最后输出一个时间
						if(data.length < 50){
							that.news.unshift({
								objclass: "chat-time",
								html: that.timeToDate(that.msgTime * 1000),
								type: 0
							});
						}

						that.page++;
					} else {
						that.ajaxLock = false;
					}
				});
			},
			//打开websocket连接
			openChat : function(){
				var that = this;

				//设置websocket连接参数
				websocket.setUrlParams("toid=" + this.$route.params.id + "&handler=chatonline");

				//创建websocket连接
				websocket.open();

				//设置接受消息时的回调
				websocket.setOnMessage(function(data){
					//判断是否需要插入时间戳
					that.timeTag();

					//接受的消息类型如果为图片，则替换路径
					if(data.type == 1 || data.type == 2){
						data.msg.thumb = config.img_url + data.msg.thumb;
					}

					that.news.push({
						objclass : "chat-other",
						html : data.msg,
						type : data.type
					});

					//调整窗口位置
					that.$nextTick(function(){
						$(".chat-list").scrollTop($(".chat-list")[0].scrollHeight);
					});
				});
			},
			//图片上传
			initImageUpload : function(){
				var that = this;

				var imageIndex;

				plupload.init({
					browseButton : "uploadfile",
					fileType : ["image/jpeg", "image/jpg", "image/png", "image/gif"],
					fileUploadBeginEvent : function(){
						//判断是否需要插入时间
						that.timeTag();

						imageIndex = that.news.push({
							objclass: "chat-own",
							html: {
								thumb: "/res/img/pleasemakeitagain.png",
							},
							type: 1
						}); 
						// 为当前loading 添加background-size : 3rem auto;
						// 上传完成再 移除该属性

						//调整窗口位置
						that.$nextTick(function(){
							$(".chat-list").scrollTop($(".chat-list")[0].scrollHeight);
						});

						imageIndex -= 1;
					},
					fileUploadEvent : function(up, file, info){
						if(info.status == 200){
							//更新消息到消息窗口
							that.news.splice(imageIndex, 1, {
								objclass : "chat-own",
								html : {
									thumb : config.img_url + file,
								},
								type : 1
							});

							//发送到websocket
							var data = {
								handler : "chatonline",
								data : {
									toid : that.$route.params.id,
									msg : {
										thumb : file
									},
									type : 1
								}
							};
							websocket.sendMsg(data);
						}
					}
				});
			},
			//判断新消息是否需要在页面上插入时间
			timeTag : function(){
				var nowTime = Date.parse(new Date());
				//如果新发送的消息和上次发送消息时间间隔超过600秒，则先插入一个时间
				if((nowTime - intoTime) >= 600 * 1000){
					this.news.push({
						objclass : "chat-time",
						html : this.timeToDate(nowTime),
						type : 0
					});
				}

				//记录本次发送消息的时间
				intoTime = nowTime;
			},
			//将时间戳转化为时间格式
			timeToDate : function(timestamp){
				var date = new Date(timestamp);

				var y = date.getFullYear();
				var m = (m = date.getMonth() + 1) < 10 ? "0"+m : m;
				var d = (d = date.getDate()) < 10 ? "0"+d : d;
				var h = (h = date.getHours()) < 10 ? "0"+h : h;
				var i = (i = date.getMinutes()) < 10 ? "0"+i : i;
				var s = (s = date.getSeconds()) < 10 ? "0"+s : s;

				//获取当天00:00:00的时间
				var dd = new Date();
				dd.setHours(0);
				dd.setMinutes(0);
				dd.setSeconds(0);

				//如果时间大于当天00:00:00的时间，则返回小时，分钟，秒数
				//如果时间小于当天00:00:00的时间，则返回年，月，日，小时，分钟，秒数
				if(date >= dd){
					return h+":"+i+":"+s;
				} else {
					return y+"/"+m+"/"+d+" "+h+":"+i+":"+s;
				}
			},
			//进入页面时，是否发送商品信息
			defaultSendGoods : function(){
				var that = this;

				//如果路由中存在auction这个参数，在需要获取拍品信息
				if (this.$route.params.auction) {
					ajax.getBasicGoods(this.$route.params.auction, function (res) {
						if (res.status == 200) {
							that.timeTag();

							res.data.thumb = JSON.parse(res.data.thumb);

							//将拍品信息更新到消息中
							that.news.push({
								objclass: "chat-own",
								html: {
									title: res.data.title,
									thumb: {
										url : config.img_url + res.data.thumb.url
									},
									id: res.data.id
								},
								type: 3
							});
						}
					});
				}
			},
			//点击商品的发送时，向服务器发送商品信息
			pushGoods : function(event, id, title, thumb){
				var dom = $(event.target);

				dom.prev().removeClass("works-ellipsis");

				dom.remove();

				var data = {
					handler : "chatonline",
					data : {
						toid : this.$route.params.id,
						msg : {
							id : id,
							title : title,
							thumb : thumb
						},
						type : 2
					}
				};

				websocket.sendMsg(data);
			},
			// 设置跳转方法 阻止点击发送按钮直接跳转路由
			goTo : function(url) {
				this.$router.push(url)
			},

			// 上拉加载更多
			pullUpLoading: function(){
				var _this = this;
				var timer = null;
				var before = $('.chat-list').scrollTop();
				var beforeHeigth = $(".chat-list")[0].scrollHeight;

				clearTimeout(timer);
				$('.chat-list').on('scroll', function() {
					var after = $('.chat-list').scrollTop();
					// console.log(before + '/' + after)
					// 判断滚动条滚到底部 执行事件
					if (before > after) {
						if ( $('.chat-list').scrollTop() <= 0) {
				      		_this.loaded = true;
				      		// 模拟获取数据 完成之后取消loading
				      		timer = setTimeout(function() {
				      			// 在这里把前面的聊天记录push进渲染数据
								_this.getLog();
				      			_this.loaded = false;

				      			_this.$nextTick(function(){
									//高度计算放到DOM更新后的回调中进行
									var afterHeight = $(".chat-list")[0].scrollHeight;
									// 滚动条滚动距离
									var distance = afterHeight - beforeHeigth;
									beforeHeigth = afterHeight;
				      				// 设置加载数据之后滚动条保留之前位置
									$(".chat-list").scrollTop( distance );
								});
				      		},1000)
				        }
					}
			    });
            },
            // 自适应输入框
			resizeTextarea: function() {
				// 最小高度
				var minRows = 1;

				// 最大高度，超过则出现滚动条
				var maxRows = 4;
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
			//后退路由
			backrouter : function(){
				this.$router.go(-1);
			}
		}
	}

</script>
<style>
.newschat{
	height: 100%;
	width: 100%;
	padding-top: 4.5rem;
	padding-bottom: 5rem;
}
.chat-title{
	width: 100%;
	height: 4.5rem;
	background-color: #fff;
	border-bottom: 1px solid #c5c5c5;
	left: 0;
	top: 0;
	z-index: 29;
}
.chat-title .chat-back{
	width: 4rem;
	height: 4.4rem;
}
.chat-title .chat-back span{
	width:0.7rem;
	height: 1.25rem;
	display: block;
	margin: 1.57rem 0 0 1.5rem;
}
.chat-title .name{
	line-height: 4.4rem;
	text-align: center;
	font-size: 1.6rem;
	color: #333;
}
.chat-list{
	-webkit-overflow-scrolling: touch;
	height: 100%;
	line-height: 3rem;
	font-size: 1.5rem;
	overflow: auto;
	padding:1.5rem;
}
.chat-list .chat-con{
	margin-bottom: 1.5rem;
}
.chat-list .chat-con .other-img{
	width: 4.5rem;
	height: 4.5rem;
	border-radius: 50%;
	background-color: pink;
}
.chat-list .chat-con .other-con{
	max-width: 21rem;
	font-size: 1.4rem;
	color: #333;
	background-color: #fff;
	padding:0.5rem;
	line-height: 2.5rem;
	max-height: 300rem;
	border:1px solid #ccc;
	border-radius: 1rem;
	margin:0.75rem 0.75rem 0;
	word-break:break-all;
}
.chat-list .chat-con .other-bg{
	width: 2.2rem;
	height: 1.2rem;
	/* background:url(otherbg.png) no-repeat;
	background-size: 2.2rem 1.2rem; */
	top: 0.7rem;
}
.chat-list .chat-other .other-bg{
	left: 4.15rem;
}
.chat-list .chat-other .other-img{
	float: left;
}
.chat-list .chat-other .other-con{
	float: left;
}
.chat-list .chat-own .other-con{
	background-color: #a5ef78;
}
.chat-list .chat-own .other-bg{
	/* background-image: url(ownbg.png); */
	right: 4.1rem;
}
.chat-list .chat-own .other-img{
	float: right;
}
.chat-list .chat-own .other-con{
	float: right;
}
/* 发送时间 开始*/
.chat-list .chat-time{
	margin-bottom: 0;
}
.chat-list .chat-time .other-img{
	display: none;
}
.chat-list .chat-time .other-bg{
	display: none;
}
.chat-list .chat-time .other-con{
	border:none;
	background-color: #f6f6f6;
	margin:0;
	max-width: 100%;
	text-align: center;
	padding:0;
	color: #999;
}
/* 发送时间 结束*/
/* 我发送作品 开始*/
.chat-list .works-picture {
	/*width: 19.25rem;*/
	/*height: 10rem;*/
	height: auto;
	width: 14rem;
	margin: 0.25rem;
	z-index: 5;
}
.works-picture img {
	width: 100%;
	height: auto;
}
.bg-size {
	background-size: 3rem auto;
}
.chat-list .works-copy{
	width: 100%;
	height: 1.8rem;
	line-height: 1.8rem;
	padding-left: 0.5rem;
	background-color: rgba(0,0,0,0.4);
	left: 0;
	bottom: 0;
	font-size: 1.1rem;
	color: #fff;
}
.chat-list .works-link{
	font-size: 1.1rem;
	color: #448aca;
	margin:0.25rem;
	line-height: 1.75rem;
}
.chat-list .worksbtn{
	font-size: 1.4rem;
	color: #fff;
	margin-top: -0.1rem;
}
.chat-list .works-ellipsis{
	line-height: 1.5rem;
	/*border-bottom: 1px solid #448aca;*/
	max-width: 13.25rem;
	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/* 我发送作品 结束*/
.chat-bottom {
	min-height: 5rem;
	width: 100%;
	padding:0.75rem 0;
	left: 0;
	bottom: 0;
	z-index: 29;
	border-top: 1px solid #c5c5c5;
	padding-left: 5.5rem;
	background-color: #f6f6f6;

}
.chat-bottom .add-img{
	width: 3.5rem;
	height: 3.5rem;
	border-radius: 50%;
	border:1px solid #4c4c4c;
	font-size: 3rem;
	line-height: 3.2rem;
	text-align: center;
	left: 1rem;
	bottom: 0.75rem;
}
.chat-bottom .add-con{
	max-height: 9rem;
	width: 25rem;
	border:1px solid #ccc;
	background-color: #fff;
	border-radius: 0.5rem;
	font-size: 1.4rem;
	overflow: auto;
}
.chat-bottom .add-con .add-con-in{
	width: 100%;
	min-height: 3.5rem;
	line-height: 2rem;
	/*padding: 0.7rem 0 0.7rem 0.5rem;*/
	outline: none;
}
.chat-bottom .add-btn{
	width: 5rem;
	height: 3.5rem;
	border-radius: 0.5rem;
	line-height: 3.5rem;
	text-align: center;
	background-color: #8dda5e;
	font-size: 1.4rem;
	color: #333;
	bottom: 0.75rem;
	right: 1rem;
}
/* 聊天 */
.chat-list-loading {
	width: 100%;
	height: auto;
	margin: 0 auto;
	text-align: center;
}
.chat-list-loading img {
	display: inline-block;
	width: 2.5rem;
	height: 2.5rem;
}
textarea {
	overflow: hidden;
	resize: none;
	padding-top: .7rem;
	padding-left: 1rem;
	padding-right: 1rem;
}

</style>
