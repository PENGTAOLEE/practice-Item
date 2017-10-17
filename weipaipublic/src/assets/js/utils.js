//微信接口引入
var ajax = require('@/assets/js/ajax');
var wx = require('weixin-js-sdk');
/**
 * 出价倒计时
 * @param {number}   startime     开始时间
 * @param {number}   endtime      结束时间
 * @param {function} countFunc    倒计时执行过程回调
 * @param {function}   endFunc    倒计时结束回调
 * @author  lpt
 */
var Alarm = function (startime, endtime, countFunc, endFunc) {
    this.time = Math.floor((endtime - startime)); //时间
    this.countFunc = countFunc; //计时函数
    this.endFunc = endFunc; //结束函数
    this.flag = 't' + Date.parse(new Date()); //
};
Alarm.prototype.start = function () {
    var self = this;

    self.flag = setInterval(function () {
        if (self.time <= 0) {
            clearInterval(self.flag);
            self.endFunc();
        } else {
            var minute, hour, day, second;
            day     = Math.floor(self.time / 60 / 60 / 24) < 10 ? '0' + Math.floor(self.time / 60 / 60 / 24) : Math.floor(self.time / 60 / 60 / 24);
            hour    = Math.floor(self.time / 60 / 60 ) < 10 ? '0' + Math.floor(self.time / 60 / 60) : Math.floor(self.time / 60 / 60);
            minute  = Math.floor(self.time / 60 % 60) < 10 ? '0' + Math.floor(self.time / 60 % 60) : Math.floor(self.time / 60 % 60);
            second  = Math.floor(self.time % 60) < 10 ? '0' + Math.floor(self.time % 60) : Math.floor(self.time % 60);
            //倒计时执行函数
            self.countFunc(second, minute, hour, day);
            self.time--;
        }
    }, 1000);
};
Alarm.prototype.toTwo = function(num) {
    if( num>9 ){
        return num;
    } else {
        return "0" + num;
    }
};

module.exports = {

    /**
     * 获取一个指定范围的随机数
     * @param  {number} start 起始数字
     * @param  {number} end   右区间范围[不包含]
     * @return {number}     指定范围的随机数
     */
    getRandomNum: function(start,end) {
        return Math.floor(Math.random() * (end - start) + start);
    },

    /**
     * 格式化时间
     * @param  {number} start_time 开始时间
     * @param  {number} end_time   结束时间
     * @return {object}            格式化后时间对象
     */
    formatData: function (start_time,end_time) {
        var time = Math.floor((end_time - start_time)); //时间
        var minute, hour, day, second;
        day     = Math.floor(time / 60 / 60 / 24) < 10 ? '0' + Math.floor(time / 60 / 60 / 24) : Math.floor(time / 60 / 60 / 24);
        hour    = Math.floor(time / 60 / 60 ) < 10 ? '0' + Math.floor(time / 60 / 60) : Math.floor(time / 60 / 60);
        minute  = Math.floor(time / 60 % 60) < 10 ? '0' + Math.floor(time / 60 % 60) : Math.floor(time / 60 % 60);
        second  = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);

        return {
           day: day,
           hour: hour,
           minute: minute,
           second: second 
        }
    },

    /**
     * 获取url中的参数
     * @return {Object} 返回url中的参数对象
     * @author lpt
     */
    getRequest: function () {
        var url = decodeURIComponent(location.search);
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },

    /**
     * 下拉加载更多
     * @param  {Function} callback  数据操作 回调
     * @return 无
     * @author  lpt
     */
    dropLoading: function(callback) {
        var wHeight,
            dHeight,
            scrollTop,
            _this = this;
        $(window).unbind();
        $(window).scroll(function(){
            wHeight   = $(window).height();
            dHeight   = $(document).height();
            scrollTop = $(this).scrollTop();
            if (wHeight + scrollTop >= dHeight && scrollTop > 10) {
                callback && callback()
            }
        })
    },

    // 定时器构建对象
    Alarm: Alarm,

    /**
     * 移动端 input调出键盘 footer不被键盘顶起
     * @param  {object} $obj     触发调出键盘的input元素
     * @param  {object} $footer  处理被键盘顶起的元素
     * @param  {object} $window  页面内需要改变高度的元素
     * @return 无
     */
    getKeyboard: function($obj,$footer,$window){
        var $app = $window || $('#app');
        $obj.bind('focus',function(){
            $app.height($(window).height()+'px');
            $footer.css('position','static');
        }).bind('blur',function(){
            $app.height('auto');
            $footer.css({'position':'fixed','bottom':'0'});

        });
    },

    /**
     * 格式化当前时间
     * @param  {object}  now  当前时间
     * @return string         格式化后时间
     */
    formatDate: function (now) {
        var year   = now.getFullYear();
        var month  = now.getMonth()+1;
        var date   = now.getDate();
        var hour   = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return "20"+year+"/"+month+"/"+date+" "+hour+":"+minute+":"+second;
    },

    /**
     * 微信预览图片
     * @param  object   $emitNode  图片预览触发元素
     * @param  string   $parentEle 父级元素的className
     * @return 无
     */
    wxPreviewImage: function($emitNode,$parentEle) {
        $emitNode.off('click.amark')
        $emitNode.on('click.amark',function() {
            var imgArray = [];
            var curImageSrc = $(this).attr('src') || $(this).attr('data-src');
            var $oParent = $(this).parents($parentEle);
            if (curImageSrc) {
                $oParent.find('img').each(function(index, el) {
                    var itemSrc = $(this).attr('src');
                    imgArray.push(itemSrc);
                });

                wx.previewImage({
                    current: curImageSrc,
                    urls: imgArray
                });
            }
        })
    },

    /**
     * 设置背景图居中显示 & 延时加载
     * @param  {object} obj 占位img对象
     * @param  {string} src 图片资源位置
     * @return 无
     */
    picCenter: function(obj,src) {
        if(!obj){
            obj = '.js_picLazy';
        }
        if(!src){
            src = 'src';
        }

        // 处理无拍品状态
        if(obj.length<=0) return;
        
        //图片居中 
        $(obj).each(function(i){
            var _this = $(this);
            var img = new Image();
            img.src = _this.attr(src);

            img.onload = function(){
                _this.hide();
                _this.parent().css('background','url('+ _this.attr(src) +') center center/cover no-repeat');
            }

        });
    },

    // 禁用微信分享
    disableSharing: function() {

        function onBridgeReady(){
            WeixinJSBridge.call('hideOptionMenu');
        }

        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }else{
            onBridgeReady();
        }
    },

    // 关注提醒框
    createAttentionEle: function(num) {
      let timer = null;  
      const attentionEle = document.createElement('div');
      attentionEle.setAttribute('class','attention-tips');

      if (num == 1) {
        $(attentionEle).addClass('not');        
      };

      // 为元素绑定定时删除事件
      clearTimeout(timer)
      $('.attention-tips').remove()
      timer = setTimeout( () => {
        $(attentionEle).remove()
      },1500)

      $('#app').append($(attentionEle) )  
    }, 

    // 关注店铺
    follow (event,callback) {
        const that = this;
        let state = 0;
        let userid = $(event.target).attr("data-id");
        let objname = $(event.target).hasClass("already-follow");
        let isIcon = $(event.target).text();

        objname ? state = 0 : state = 1;
        if(state=="1"){               
          ajax.followState(state,userid,function(data){
              if(data.status=="502"){
                  alert("未登录")
              }else if(data.status=="503"){
                  alert("关注失败")
              }else if(data.status=="200"){
                if (isIcon) {
                   $(event.target).text("已关注") 
                }
                $(event.target).addClass("already-follow").removeClass("author-follow");
                $('.goods_item_' + userid).find('.goods_item_follow').addClass("already-follow").removeClass("author-follow");
                that.createAttentionEle(0)
              } else {
                alert(data.msg)
              }
          });
        } else {
          callback && callback(event)
        }
    },

    // 是否微信浏览器
    isWeixin() {
      var ua = navigator.userAgent.toLowerCase();
      return ua.match(/MicroMessenger/i) == "micromessenger" ? true : false;
    },

    // 视频全屏
    fullScreen(ev,playVideo) {
      var playVideo = playVideo;
      if (playVideo[0].requestFullscreen) {
        playVideo[0].requestFullscreen();
      } else if (playVideo[0].mozRequestFullScreen) {
        playVideo[0].mozRequestFullScreen();
      } else if (playVideo[0].webkitRequestFullscreen) {
        playVideo[0].webkitRequestFullscreen();
      } else if (playVideo[0].msRequestFullscreen) {
        playVideo[0].msRequestFullscreen();
      }
      // $(ev.target).addClass('cancleScreen');
      return false; 
    },

    // 转义特殊字符
    strEscape(str) {
      var arrEntities = {
        'lt':'<',
        'gt':'>',
        'nbsp':' ',
        'amp':'&',
        'rdquo':'"',
        'ldquo': '"',
        'quot': '"',
      };

      return str.replace(/&(lt|gt|nbsp|amp|rdquo|ldquo|quot);/ig,function(all,t){
        return arrEntities[t];
      });
    },

// end
}
