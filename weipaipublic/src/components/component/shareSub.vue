<template>
</template>
<script>

    var ajax = require("ajax");
    var config = window.config;
    var wx = require('weixin-js-sdk');
    var statistics = require('@/assets/js/Statistics');

    module.exports = {
        data: function(){
            return {
                base: 'http://',
                baseImgUrl : window.config.img_url,  // 图片服务器
                baseVideoUrl: "http://xfpvideoupload.oss-cn-beijing.aliyuncs.com/", // 视频未转码
                title: '',                        // 微信分享标题
                imagesUrl: '',
                images: '',                       // 微信分享预览图片
                url: '',                          // 微信分享链接
                desc: '',                         // 微信分享描述
            }
        },
        props: ['message'],
        components: {
        },
        created: function(){
            // 微信分享参数配置
            this.wxShareConfig();
        },
        watch :{
            '$route' : ["wxConfig","wxShareConfig","wxOnMenuShare"],
        },
        mounted: function(){
            this.wxOnMenuShare();
        },
        methods: {
            // 获取微信配置
            wxConfig: function(){
                // 设备检测
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {// iphone
                    var url = window.iosUrl;
                } else if (/(Android)/i.test(navigator.userAgent)) { //安卓
                    if (location.pathname == '/follow') {
                        var url = encodeURIComponent(this.message.url)
                    } else {
                        var url = encodeURIComponent(location.href.split('#')[0]);    
                    }
                } else {
                    // alert('暂不支持该浏览器功能,抱歉!')
                }; 

                ajax.getWechatParam(url,function(res){
                    if(res.status == 200){
                        wx.config({
                            // res.data.debug
                            debug: res.data.debug,
                            appId: res.data.appId,
                            timestamp: res.data.timestamp,
                            nonceStr: res.data.nonceStr,
                            signature: res.data.signature,
                            jsApiList: res.data.jsApiList,
                        });
                    }else{
                        alert(res.msg)
                    }
                })
            },

            // 微信分享配置
            wxShareConfig: function() {
                this.baseUrl = this.base + location.host;
                this.title  = this.message.title;
                if ( /^http/.test(this.message.images) ) {
                    this.message.wxThumb = true;
                };

                if (this.message.type) {// 上传图片地址
                    this.imagesUrl = this.baseImgUrl + this.message.images;
                } else if(this.message.wxThumb) { // 微信头像
                    this.imagesUrl = this.message.images;
                } else { // 域名baseUrl
                    this.imagesUrl = this.baseUrl + this.message.images;
                }
                
                // 如果未获取到到图片 使用logo代替
                if (!this.message.images) {
                    this.imagesUrl = this.baseUrl + require("../../assets/img/share_logo.jpg");
                };

                // 如果是视频文件, 使用默浓缩图展示
                if (this.message.imgType == 'video') {
                    this.imagesUrl = this.baseUrl + require('../../assets/img/video_ns_2.jpg')
                };
                
                this.url    = this.message.url;
                this.desc   = this.message.desc;
            },

            // 定义微信分享
            wxOnMenuShare: function() {
                var _this = this;
                // 初始化微信配置
                this.wxConfig();
                wx.ready(function(){
                    // 分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: _this.title,
                        link: _this.url,
                        imgUrl: _this.imagesUrl,
                        success: function () {
                            statistics.request('share_wechatFc');
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    // 分享给朋友
                    wx.onMenuShareAppMessage({
                        title: _this.title,
                        desc: _this.desc,
                        link: _this.url,
                        imgUrl: _this.imagesUrl,
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            statistics.request('share_wechatF');
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    // 分享到QQ
                    wx.onMenuShareQQ({
                        title: _this.title,
                        desc: _this.desc,
                        link: _this.url,
                        imgUrl: _this.imagesUrl,
                        success: function () {
                            statistics.request('share_qq');
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
            },
        }
    }
</script>
