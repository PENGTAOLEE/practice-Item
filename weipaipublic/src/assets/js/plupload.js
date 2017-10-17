/**
 * plupload组件
 * 对第三方上传插件plupload的二次封装
 * 提供业务级的上传服务
 * @author LL
 * 只暴露一个方法init()
 * plupload.init({
					browseButton : "uploadfile",
					fileType : [],
					fileUploadEvent : function(up, file, info){
						console.log(file);
					},
					fileUploadBeginEvent : function(){
					},
					errorEvent : function(){
					}
				});
 * browseButton : 绑定的上传按钮的id
 * fileType : 数组，允许上传的文件类型
 * fileUploadEvent : 上传成功的回调，up是uploader对象，file是文件名，info是信息
 * fileUploadBeginEvent : 上传开始前的回调
 * errorEvent : 错误时的回调
 */
    //plupload插件对象
    var plupload = require("plupload");
    var ajax     = require("ajax");
    var config = window.config;

    //阿里云授权
    var aliOss = {
        //阿里云url
        host : "",
        //阿里云id
        accessid : "",
        //base64转码后的值
        policyBase64 : "",
        //MD5值
        signature : "",
        //上传路径
        key : "",
        //超时时间
        expire : 0,
        //当前时间
        nowTime : 0,
        //初始化
        init : function(){
            this.nowTime = Date.parse(new Date()) / 1000;
        },
        //向服务器申请签名
        sendRequest : function(){
            var that = this;

            ajax.getOssAuthorize("img", function(res){
                if(res.status == 200){
                    that.host = res.data.host;
                    that.policyBase64 = res.data.policy;
                    that.accessid = res.data.accessid;
                    that.signature = res.data.signature;
                    that.expire = parseInt(res.data.expire);
                    that.key = res.data.dir;
                } else {
                    alert("oss authorize error");
                }
            });
        },
        //获取签名
        getSignature : function(){
            //可以判断当前expire是否超过了当前时间
            //如果超过了当前时间,就重新取一下
            //3s做为缓冲
            if(this.expire < this.nowTime + 3){
                this.sendRequest();
            }

            return true;
        }
    };

    aliOss.init();

    var Aplupload = {
        //plupload对象
        upload : {},
        browseButton : "",
        //文件命名规则
        //randomName为随机命名
        //localName使用原名
        fileNameType : "randomName",
        //文件名
        fileName : "",
        multipartParams : {},
        //上传目录
        key : "",
        //上传服务器地址
        url : window.config.img_url,
        //自定义开始上传时的事件
        fileUploadBeginEvent : function(){console.log("fileuploadbeginevent")},
        //自定义上传完成后的事件
        fileUploadEvent : function(up, file, info){console.log("fileUploadEvent")},
        //自定义error操作
        errorEvent : function(){console.log("error")},
        //允许上传的文件类型
        fileType : [],
        //初始化
        init : function(o){
            if(o.fileUploadBeginEvent){
                this.fileUploadBeginEvent = o.fileUploadBeginEvent;
            }
            if(o.errorEvent){
                this.errorEvent = o.errorEvent;
            }

            this.fileUploadEvent = o.fileUploadEvent;
            this.browseButton = o.browseButton;
            this.fileType = o.fileType;
        },
        //初始化上传
        initUpload : function(){
            var that = this;

            this.upload = new plupload.Uploader({
                runtimes : 'html5,flash,silverlight,html4',
                //触发选择文件的ID
                browse_button : this.browseButton,
                // multi_selection: true,
                //container: document.getElementById('container'),
                flash_swf_url : 'cusplupload/Moxie.swf',
                silverlight_xap_url : 'cusplupload/Moxie.xap',
                //上传服务器地址
                url : this.url,
                //过滤规则
                filters : {
                    //只允许上传图片
                    //mime_types : [
                    //    {title : "Image files", extensions : "jpg,jpeg,png"},
                    //],
                    //最大只能上传10mb的文件
                    max_file_size : '10mb',
                    //不允许选取重复文件
                    prevent_duplicates : true
                },
                init : {
                    //选择文件后的回调
                    FilesAdded : function(up, files) {
                        //执行用户自定义事件
                        that.fileUploadBeginEvent();

                        plupload.each(files, function(file) {
                            //判断文件类型是否正确
                            if(!that.filters(file.type)) {
                                up.removeFile(file);
                                alert("文件类型错误");
                                return false;
                            }

                            that.toUpload(up, file.name);
                        });
                    },
                    //上传成功后的回调
                    FileUploaded : this.fileUploaded,
                    //错误处理
                    Error : function(up, err) {
                        that.errorEvent();

                        if (err.code == -600) {
                            alert("\n选择的文件太大了");
                        }
                        else if (err.code == -601) {
                            alert("\n选择的文件类型错误");
                        }
                        else if (err.code == -602) {
                            alert("\n这个文件已经上传过一遍了");
                        }
                        else {
                            alert("\nError xml:" + err.response);
                        }
                    }
                }
            });

            this.upload.init();
        },
        //文件类型的过滤
        filters : function(type){
            for(var i=0;i<this.fileType.length;i++){
                if(type == this.fileType[i] || !type){
                    return true;
                }
            }

            return false;
        },
        //文件上传成功后的回调
        fileUploaded : function(up, file, info){
            fileName = Aplupload.getUploadedFileName(file.name);

            Aplupload.fileUploadEvent(up, fileName, info);
        },
        //上传
        toUpload : function(up, fileName){
            this.fileName = fileName;
            //设置上传参数
            this.setUploadParam();
            up.setOption({
                'url': this.url,
                'multipart_params': this.multipartParams
            });
            up.start();
        },
        //设置上传参数
        setUploadParam : function(){
            //向服务器获取签名
            aliOss.getSignature();

            this.key = aliOss.key;

            this.host = aliOss.host;

            this.calculateObjectName();

            this.multipartParams = {
                'key' : this.fileName,
                'policy': aliOss.policyBase64,
                'OSSAccessKeyId': aliOss.accessid,
                //让服务端返回200,不然，默认会返回204
                'success_action_status' : '200',
                'signature': aliOss.signature
            };
        },
        //根据文件名的命名规则修改文件名
        calculateObjectName : function(){
            if(this.fileNameType == "localName"){
                this.fileName += "${filename}";
            } else if(this.fileNameType == "randomName"){
                suffix = this.getSuffix(this.fileName);
                this.fileName = this.key + this.randomString(10) + suffix
            }
        },
        //获取文件名中的后缀名
        getSuffix : function(fileName){
            pos = fileName.lastIndexOf('.');
            suffix = '';
            if (pos != -1) {
                suffix = fileName.substring(pos)
            }
            return suffix;
        },
        //获取一个随机字符串
        randomString : function(len){
            len = len || 32;
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = chars.length;
            var pwd = '';
            for (i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return Date.parse(new Date())/1000 + pwd;
        },
        //获取上传后的文件名
        getUploadedFileName : function(fileName){
            if(this.fileNameType == 'localName'){
                return this.fileName.replace("${filename}", filename);
            }
            else if(this.fileNameType == 'randomName'){
                return this.fileName;
            }
        }
    };

module.exports = {
    init : function(o){
        Aplupload.init(o);
        Aplupload.initUpload();
    }
}