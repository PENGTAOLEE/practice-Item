<template>
	<div id="indexcollege" data-indexcollege="true">

		<!-- <h1 style="font-size:2rem;" @click="chooseImg">上传图片</h1>
		<p class="upload-images">
			<img src="" alt="">
		</p>
		<input type="file" id="file" @change="selectImg"> -->
        <div class='announcement-list' v-if='annoucement_list.length>0'>
            <div class='announcement-container'>
                <router-link class='swiper-wrapper' to='tradingrecord'>
                    <div class='swiper-slide' v-for='item in annoucement_list' :key='item.inputtime'>
                        <span class='swiper-slide-tip'>【公告】</span> {{item.company+item.position+'\"'+item.username+'\"'+'购买了'+item.sellername+'的\"'+item.desc+'\"'}}
                    </div>
                </router-link>
            </div>
        </div>
		<div class="goods_list clearfix" v-if="datalist.length != '0'">
			<!-- 美院 item -->
			<div class="goods_item fl " v-for="item in datalist" :class="'goods_item_' + item.user_id">
				<div class="goods_item_top">
					<!-- 头像 -->
					<router-link :to="'/shops/'+item.user_id + '?type=2'" class="goods_item_avator">
						<img :src="item.userimg" alt="">
					</router-link>
					<div class="fl goods_item_top_box">
						<div class="goods_item_name">
							<span class="text-overflow">{{ item.rel_name }}</span>
						</div>
						<div class="goods_item_college">
							<i class="student_ident spritesmap dibvam"></i>
							<span>{{item.category_name}}</span>
						</div>
					</div>
					<div class="goods_item_follow shotsprites fl" @click="follow($event)" :id="'userid_'+item.user_id" :data-id="item.user_id" :class="{'already-follow':item.fowstate ==1,'author-follow':item.fowstate ==0}"></div>
				</div>
				<!-- 图片 -->
				<router-link :to="'/lotdetails/'+item.id" class="goods_item_img divbg" v-if="item.images[0].type == 'img'">
					<img 
              class="lazy js_picLazy" 
              src="../../assets/img/xiaofupai_hot.png"
              :data-original="baseUrl + item.images[0].url + '?x-oss-process=image/resize,w_800'"
              alt=""
          />
				</router-link>
				<!-- 视频 -->
				<router-link 
            v-if="item.images[0].type == 'video'"
            :to="'/lotdetails/'+item.id" 
            class="goods_item_img video-box"  
        >   
            <span class="video-play-rectangle">
                <i class="shotsprites video-play-rectangle-icon"></i>
            </span>
            <!-- baseUrlVideo -->
            <video src="" :poster="videoPost" style="object-fit: fill;"></video>
        </router-link>
				<div class="goods_item_bottom">
					<p class="goods_item_bottom_text">
						<span>当前</span>
						<!-- 已结束 -->
						<!-- off_line -->
						<strong :class="{'off_line':item.selstatus==2,'on_line': item.selstatus==1}">￥{{item.current_price}}</strong>
						<span class="fr" v-if="item.selstatus==1&&item.bidnum!=0">{{ item.bidnum }}人出价</span>
						<span class="fr" v-if="item.selstatus==2">已结束</span>
					</p>
				</div>
			</div>
		</div>

		<!-- 无关注商品 -->
    	<div class="no-data" v-if="datalist.length == '0'">
    		<div class="no-data-img">
    			<img src="../../assets/img/index_college_nodata.png" alt="">
    		</div>
    		<div class="no-data-text">大量优秀作品即将上拍，敬请期待</div>
    		<!-- <router-link to="/classify" class="no-data-link">逛逛其他商品</router-link> -->
    	</div>

    	<!-- 微信分享 -->
		<wx-share :message="wxShareObj"></wx-share>
 
    <!-- 弹窗组件 -->
    <show-confirm 
      v-show="showConf" 
      :msg="tipMsg" 
      :data-userid="goodsIdByfollow"  
      :data-followstate="0"
      @closeBox="closeBox" 
      @childEvent="cancelAttention"
    ></show-confirm>
	</div>

</template>

<script>
	// var co = require('co');
	// import fs from 'fs';
	// const request = require('request');
	import sharePage from '@/components/component/shareSub'
  import showConfirm from '@/components/component/showConfirm'
	import ajax from 'ajax';
	import utils from 'utils';
	// var wx = require('weixin-js-sdk');
	import wx from "weixin-js-sdk"

	export default {
		data () {
			return {
				// 取消关注弹窗
				whetherFollow: true,
        showConf: false,
        tipMsg: '是否取消关注',
        goodsIdByfollow: '',
				wxShareObj: {},
				keynum: true,
				page:1,    // 分页
				baseUrl: window.config.img_url,
				datalist: [], // 数据集合
				lotImg: require('../../assets/img/banner.jpg'),
				videoPost: require("../../assets/img/video_ns_2.jpg"),
				annoucement_list: '' //公告列表
			}
		},
		components: {
      'wx-share': sharePage,
      'show-confirm': showConfirm
    },
		created () {
			this.getCollegeIndex();
			document.title = "小福拍";
			this.getAnnouncement();

			var indexCollegeList = window.localStorage.getItem('indexcollege_list');

		      this.whetherFollow = window.localStorage.getItem('whether_follow');
		      window.localStorage.removeItem('whether_follow');
		      
		      // 当前时间 
		      var nowTimeStamp = new Date().getTime();
		      var lastTimeStamp = window.localStorage.getItem('indexcollege_time_stamp');
		      var timeDiff = nowTimeStamp - lastTimeStamp;

		      if (indexCollegeList && this.whetherFollow != 'false' && timeDiff < 1000*60*5 ) {
		        this.datalist = JSON.parse( indexCollegeList );    
		        this.page = window.localStorage.getItem('indexcollege_page');
		        // 使用完删除
		        this.removeCookie()
		      };
      		 this.wxShareObj.title = "小福拍--校园作品竞拍专区";
             this.wxShareObj.desc = "学生作品(国、油、版、雕、设计类等泛艺术品)在线竞拍、变现平台。"
             this.wxShareObj.url = location.href;
		},
		mounted () {
			// 图片懒加载
			this.$nextTick(() =>{
				// 懒加载
                utils.picCenter(".js_picLazy",'data-original');

                // 滚动条    
                this.hotlist()
                var scroll_top = window.localStorage.getItem('indexcollege_scroll_top') || 0;
                    $(document).scrollTop(scroll_top);

                if (this.datalist.length == 0) {
                    $('.loading').hide();
                };
         
            });
             var mySwiper = new Swiper ('.announcement-container', {
                                        autoplay: 3000,
                    autoplayDisableOnInteraction: false,
                    setWrapperSize: true,
                    roundLengths: true,
                    loop: true,
                    observer: true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true,//修改swiper的父元素时，自动初始化swiper
                    direction: 'vertical'
              });
             
		},
		methods: {
			// 选择文件
			selectImg: function () {
				var files = document.getElementById("file").files;  
			},

			// 微信选择图片
			// npm 不能安装依赖 呵呵呵呵额呵呵呵 就特么差这一步了
			chooseImg: function() {
				
        var images = {
            localId: [],
            serverId: []
        };

        // 签名对象
        var oosParams = {
        	host: "",
					policyBase64: "",
					accessid: "",
					signature: "",
					expire: "",
					key: "",
	      }

	      // 申请签名
				const sendRequest = function() {
            ajax.getOssAuthorize("img", (res) => {
                if(res.status == 200){
		        	oosParams.host = res.data.host;
                    oosParams.policyBase64 = res.data.policy;
                    oosParams.accessid = res.data.accessid;
                    oosParams.signature = res.data.signature;
                    oosParams.expire = parseInt(res.data.expire);
                    oosParams.key = res.data.dir;	
                } else {
                    alert("oss authorize error");
                }
            });
        };

        // oos require accessKeyId, accessKeySecret
        setTimeout( () => {
        	const ossClient = new OSS.Wrapper({
					  accessKeyId: oosParams.accessid,
					  accessKeySecret: oosParams.signature,
					  bucket: 'your bucket name',
					  region: 'oss-cn-beijing',
					});	

		        	var files = document.getElementById("file").files;  
		        	console.log( files[0] )

		        	// const file = '111111';
		        	const storeAs = 'upload-file';
		        	// console.log( ossClient.multipartUpload(storeAs, files[0]) )

		        	// endpoint以杭州为例，其它region请按实际情况填写
					const endpoint = "http://oss-cn-beijing.aliyuncs.com";

					// ossClient.put('object-key', files[0]);
					// const wxReq = request(`http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=${accessToken }&media_id=${mediaId}`);

					// wxReq.on('response', (response) => {
					//   // request的响应结果response可以作为读取流传给ossClient
					//   co(function* () {
					//     const result = yield ossClient.putStream(destPath, response, {timeout: 30 * 60 * 1000});
					//     console.log('图片上传阿里云结果', result);
					//     // res.status(200).json(result);
					//   }).catch(err => {
					//     console.warn(err);
					//     //res.status(500).send('上传文件出错');
					//   });
					// });

					// 上传文件流
					// co(function* () {
					//   // use 'chunked encoding'
					//   var stream = fs.createReadStream('local-file');
					//   var result = yield client.putStream('object-key', stream);
					//   console.log(result);

					//   // don't use 'chunked encoding'
					//   var stream = fs.createReadStream('local-file');
					//   var size = fs.statSync('local-file').size;
					//   var result = yield client.putStream(
					//     'object-key', stream, {contentLength: size});
					//   console.log(result);
					// }).catch(function (err) {
					//   console.log(err);
					// });
					// ossClient.putObject("<yourBucketName>", "<yourKey>", inputStream);
					// // 关闭client
					// ossClient.shutdown();

		      //   	ossClient.multipartUpload('aaa.jpg', files[0]).then(function (result) {
				    //     console.log(result);
				    // })

				    // 上传
		   //      	var uploadFile = function (client) {
					//   var file = document.getElementById('file').files[0];
					//   var key = document.getElementById('object-key-file').value.trim() || 'object';
					//   console.log(file.name + ' => ' + key);

					//   return client.multipartUpload(key, file, {
					//     progress: progress
					//   }).then(function (res) {
					//     console.log('upload success: %j', res);
					//     return listFiles(client);
					//   });
					// };
		        })
		        
		        

		        //获取签名
		        const getSignature = function() {
		            //可以判断当前expire是否超过了当前时间
		            //如果超过了当前时间,就重新取一下
		            //3s做为缓冲
		            // if(this.expire < this.nowTime + 3){
		                sendRequest();
		            // }

		            return true;
		        };

		        getSignature()

				wx.chooseImage({
				    count: 9, // 默认9
				    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				    success: function (res) {
				        // var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				        images.localId = res.localIds;

				        // 页面展示选中的图片
				        // $('.upload-images img').attr('src',images.localId[0])

				        
				        var i = 0, length = images.localId.length;
				        images.serverId = [];
				        function upload () { // 把本地选中的图片链接 上传到微信服务器
				        	wx.uploadImage({
								localId: images.localId[i], // 需要上传的图片的本地ID，由chooseImage接口获得
								isShowProgressTips: 1, // 默认为1，显示进度提示
								success: function (res) {
									
									console.log('已上传：' + i + '/' + length);

									alert( images.localId[i] )
									// 页面展示选中的图片
				        			$('.upload-images img').attr('src',images.localId[i])

				        			i++;

									// var serverId = res.serverId; // 返回图片的服务器端ID
									images.serverId.push(res.serverId);
									console.log(images.serverId)
									
									// 调用自己搭建的服务端的api，传入serverId，做获取微信图片上传OSS的相关操作
									// 把存入的 images.serverId 转存如阿里云 oos服务器
									
									// 处理 oos 上传
									// const request = require('require');
									// const OSS = require('ali-oss').Wrapper;
									
									// 申请签名
									const sendRequest = function() {
							            ajax.getOssAuthorize("img", (res) => {
							                if(res.status == 200){
							                	console.log( res )
							                    // that.host = res.data.host;
							                    // that.policyBase64 = res.data.policy;
							                    // that.accessid = res.data.accessid;
							                    // that.signature = res.data.signature;
							                    // that.expire = parseInt(res.data.expire);
							                    // that.key = res.data.dir;
							                } else {
							                    alert("oss authorize error");
							                }
							            });
							        };

							        //获取签名
							        const getSignature = function() {
							            //可以判断当前expire是否超过了当前时间
							            //如果超过了当前时间,就重新取一下
							            //3s做为缓冲
							            if(this.expire < this.nowTime + 3){
							                this.sendRequest();
							            }

							            return true;
							        };

									//设置上传参数
							        // setUploadParam : function(){
							        //     //向服务器获取签名
							        //     aliOss.getSignature();

							        //     this.key = aliOss.key;

							        //     this.host = aliOss.host;

							        //     this.calculateObjectName();

							        //     this.multipartParams = {
							        //         'key' : this.fileName,
							        //         'policy': aliOss.policyBase64,
							        //         'OSSAccessKeyId': aliOss.accessid,
							        //         //让服务端返回200,不然，默认会返回204
							        //         'success_action_status' : '200',
							        //         'signature': aliOss.signature
							        //     };
							        // },

									// const ossClient = new OSS({
									//   accessKeyId: 'your access key',
									//   accessKeySecret: 'your access secret',
									//   bucket: 'your bucket name',
									//   region: 'oss-cn-hangzhou'
									// });

									const accessToken = 'access token';
									const mediaId = 'xxxxxxx'; // 微信多媒体文件id
									const destPath = `weixin/images/201702/${mediaId}.jpg`; // OSS文件路径
									// const wxReq = request(`http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=${accessToken }&media_id=${mediaId}`);

									// wxReq.on('response', (response) => {
									//   // request的响应结果response可以作为读取流传给ossClient
									//   co(function* () {
									//     const result = yield ossClient.putStream(destPath, response, {timeout: 30 * 60 * 1000});
									//     console.log('图片上传阿里云结果', result);
									//     // res.status(200).json(result);
									//   }).catch(err => {
									//     console.warn(err);
									//     //res.status(500).send('上传文件出错');
									//   });
									// });

									/*
									需求：
										1，选择本地图片 【完成】
										2，可以在本地预览 【完成】
										3，上传到微信服务器，留存三天【完成】
										4，获取到 serverId ，从微信服务器获取图片 【完成】
										5，上传到 oos 的文件命名
										6，上传到阿里云 oos 服务器  
										7，尽量使 阿里云前缀 保持不变 
									 */

									// const result = yield ossClient.putStream(destPath, response, {timeout: 30 * 60 * 1000});
						  	// 		// 获取上传后的网络地址，_accessToke是那个7200秒获取的token。
				     //                $.ajax({
				     //                    type: "GET",
				     //                    data: {url: val,userId: _userId,name:'themeImage.jpg',timestamp:_timestamp},//一些乱七八糟的值
				     //                    dataType: 'json',
				     //                    url: "upload",
				     //                    beforeSend: function (request) {
				     //                        request.setRequestHeader('X-CSRF-Token', _csrf);//微信ajax方法需要的token，post方法需要，这边也写着以便大家了解
				     //                    },
				     //                    success: function (result) {
				     //                        $('.cover-pic')
				     //                            .find('img')
				     //                            .attr('src', result.url);//展示一下上传到存储的图片
				     //                    }
				     //                });
				     //                
				     				// 上传服务器 判定条件
							        if (i < length) {
							        	upload()
							        };
								}
						    });
				        }

				        setTimeout(function () {
		                    upload();
		                }, 1000);

				        
				    },
				    fail: function(err) {
				    	alert(JSON.stringify(err))
				    }
				});
			},

			// 移除浏览数据
      removeCookie: function() {
          window.localStorage.removeItem('indexcollege_scroll_top');
          window.localStorage.removeItem('indexcollege_list');
          window.localStorage.removeItem('indexcollege_page');
          window.localStorage.removeItem('indexcollege_time_stamp');  
      },

			
	    cancelAttention: function(ev) {
        var _this  = this;
        var $confirm  = $('#show-confirm');
        var state = $confirm.attr('data-followstate');
        var userId = $confirm.attr('data-userid');
        var $node = $('#userid_'+userId);
        var isIcon = $node.text();
        ajax.followState(state,userId,(data) => {
            if(data.status=="502") {
                alert("未登录")
            } else if(data.status=="503"){
                alert("关注失败")
            } else if(data.status=="200"){
                if (isIcon) {
                  $node.text("+关注")
                };
                $node.removeClass("already-follow").addClass("author-follow");
                $('.goods_item_' + userId).find('.goods_item_follow').removeClass("already-follow").addClass("author-follow");
                utils.createAttentionEle(1)
            } else {
                alert(data.msg)
            }
        });
        },

        // 关闭弹窗
        closeBox: function() {
          this.showConf = false;
        },

        // 关注
        follow:function(event){
        	window.localStorage.setItem('whether_follow','false');
          utils.follow(event,(event) => {
            this.goodsIdByfollow = $(event.target).attr('data-id');
            this.showConf = true;
          });
        },

			// 美院数据
			getCollegeIndex: function() {
				var that = this;
				this.keynum = false;
				ajax.getCollegeIndex(that.page,(res) => {
					if (res.status == 200) {
						res.data.forEach((item,index) => {
							res.data[index].images = JSON.parse(item.images);

							this.datalist.push(res.data[index]);
						})
						
						this.page++;
						this.keynum=true;
					} else {
						$(".loading img").hide();
            $(".loading p").show();
					}
				})
			},
			//学院广告
			getAnnouncement: function(){
				let that = this;
				ajax.getAnnouncement(0,function(data){
					if(data.status==200){
						that.annoucement_list = data.data;
						console.log(that.annoucement_list);
					}
				});
			},

			// 下拉加载数据
            hotlist: function(){
                var that = this;
                $(window).unbind();
                $(window).scroll(function(){
                    if($("#indexcollege").attr("data-indexcollege")){
                        var hcon=$(document).height()-$(window).height()-200;
                        var hdiv=$(".swiper-container").height();
                        var scroll=$(this).scrollTop();
                        if(scroll>hcon&&that.keynum){
                            that.getCollegeIndex();
                            setTimeout(function(){
                                utils.picCenter(".js_picLazy",'data-original')
                            },500)
                        }
                        scroll>1?$(".backtop").show():$(".backtop").hide();
                        scroll>hdiv? $(".index-nav-in").addClass("index-nav-fixed"): $(".index-nav-in").removeClass("index-nav-fixed");
                    }
                });
            },
		},
		beforeDestroy: function() {
            var scrollHeight = $(document).scrollTop();
            var collegelistJson = JSON.stringify(this.datalist)
            // 记录滚动位置
            var timeStamp = new Date().getTime();
            window.localStorage.setItem('indexcollege_time_stamp',timeStamp);

            window.localStorage.setItem('indexcollege_scroll_top',scrollHeight);
            window.localStorage.setItem('indexcollege_list',collegelistJson );
            window.localStorage.setItem('indexcollege_page',this.page);
        },
	}
</script>

<style scoped>
/* 公告轮播 */
.annoucement-list{
    width: 100%;
}
    .announcement-container{
        width: 100%;
        height: 4.3rem;
        overflow: hidden;
    }
    .swiper-wrapper{
        font-size: 1.3rem;
        width: 100%;
        height:　 4.3rem;
    }
    .swiper-slide{
        height: 4.3rem;
        font-size: 1.3rem;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        line-height: 1;
        overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
    }
    .swiper-slide-tip{
    	color: #333;
    }
/* 公告轮播 */
/*引导*/
.parent-item {
    margin-top: 1rem;
}
.no-data {
	text-align: center;
}

.no-data-img {
	width: 17.35rem;
	height: 12.5rem;
	margin: 0 auto;
	margin-top: 3rem;
}
.no-data-img img {
	width: 100%;
	height: 100%;
}

.no-data-text {
	margin-top: 4.5rem;
	font-family: PingFangSC;
	font-size: 1.4rem;
	color: #999;
}

.no-data-link {
	display: block;
	width: 17.1rem;
	height: 3.6rem;
	margin: 0 auto;
	margin-top: 2rem;
	line-height: 3.6rem;
	border-radius: .5rem;
	border: .05rem solid #999;
	font-size: 1.6rem;
	font-family: PingFangSC;
	color: #666;
}

.goods_list {
	-webkit-overflow-scrolling: touch;
	display: block;
	padding-top: .5rem;
}

.goods_item {
	width: 18.5rem;
	min-height: 25.4rem;
	margin-bottom: .5rem;
}

.goods_item:nth-child(2n+1) {
	margin-right: .5rem;
}

.goods_item_top,
.goods_item_bottom {
	text-align: center;
	background-color: #fff;
}

.goods_item_top {
	position: relative;
	height: 5rem;
	/*line-height: 5rem;*/
}

.goods_item_avator {
	position: absolute;
	top: .1rem;
	left: .1rem;
	z-index: 2;
	width: 4.7rem;
	height: 4.7rem;
	border-radius: 50%;
/*	background-image: -webkit-radial-gradient(circle at top, #fefefe,rgba(0,0,0,0.05) ); 
	background-image: radial-gradient(circle at top, #fefefe,rgba(0,0,0,0.05) );*/
}

.goods_item_avator img {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	border: .15rem solid #fff;
}

.student_ident {
	vertical-align: middle;
	margin-left: 0rem;
}

.goods_item_name,
.goods_item_follow {
	display: inline-block;
	vertical-align: middle;
}

.goods_item_follow {
	margin: 1.4rem .5rem;
}

.author-follow,
.already-follow {
	margin-right: .3rem;
}

.goods_item_top_box {
	margin-left: 4.8rem;
	padding-right: 1rem;
}

.goods_item_name,
.goods_item_college {
	width: 9.8rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 1.4rem;
	text-align: left;
	/*margin-left: 5.6rem;*/	
}

.goods_item_college {
	font-size: 1.2rem;
	color: #999;
}

.goods_item_college span {
	vertical-align: middle;
}

.goods_item_name span {
	display: inline-block;
	vertical-align: middle;
	width: 8.5rem;
	text-align: left;
}

.goods_item_img {
	position: relative;
	display: block;
	height: 18.5rem;
	background-color: #eee;
}

.goods_item_bottom {
	height: 3.4rem;
	line-height: 3.4rem;
}

.goods_item_bottom_text {
	padding: 0 .9rem;
	text-align: left;
}

.goods_item_bottom_text span {
	font-family: PingFangSC;
	font-size: 1.2rem;
	text-align: left;
	color: #999;
}

.goods_item_bottom_text strong {
	font-family: PingFangSC;
	font-weight: 400;
	font-size: 1.7rem;
}

.on_line {
	color: #ad1a1a;
}
.off_line {
	color: #ad1a1a;
}

</style>
