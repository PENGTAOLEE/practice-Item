<template>
  <div class="popup-details">
    <div class="popup-details-content-layer" @click="cancleEvent"></div>
    <!-- 分享选项 -->
    <div class="popup-details-bottom">
      <div class="popup-details-bottom-title">分享到</div>
      <div class="popup-details-bottom-line clearfix">
        <div class="popup-details-bottom-line-left fl"></div>
        <div class="popup-details-bottom-line-dot fl"></div>
        <div class="popup-details-bottom-line-right fl"></div>
      </div>
      <div class="popup-details-bottom-list">
        <div v-if="!isCollection" class="popup-details-bottom-item" :class="{'btn':item.id==3}" v-for="(item,index) in shareOptions" @click="item.eventname" :data-clipboard-text="localUrl">
          <div class="popup-details-bottom-img">
            <div class="spritesmap" :class="item.classname"></div>
          </div>
          {{ item.text }}
        </div>
        <div v-if="isCollection" class="popup-details-bottom-item" :class="{'btn':item.id==3}" v-for="(item,index) in shareOptions" @click="item.eventname" :data-clipboard-text="collectUrl">
          <div class="popup-details-bottom-img">
            <div class="spritesmap" :class="item.classname"></div>
          </div>
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="popup-details-content" @click.self="partPopupOff" v-show="displayContent">
      <!-- 拍品详情页 -->
      <div class="popup-details-qrcode" v-if="!isCollection && displayQr">
        <div id="bigQr">
          <div class="popup-details-qrcode-top be-replaced">
            <div class="popup-details-qrcode-top-image">
              <!-- <img crossOrigin="anonymous" :src="'/api/img?url='+ baseUrl + storeObj.images[0].url + '?x-oss-process=style/erweima_mark'" alt=""> -->
            </div>
            <div class="popup-details-qrcode-top-info">
              <div class="avator"> 
                <!-- <img crossOrigin="anonymous" :src="'/api/img?url='+storeObj.usethumb" alt=""> -->
              </div>
              <div class="shop-name">
                <h4 v-if="storeObj.nick">{{ storeObj.nick }}</h4>
                <h4 v-if="storeObj.name">{{ storeObj.name }}</h4>
              </div>
              <div class="goods-desc">{{ storeObj.desc }}</div>
            </div>
          </div>
          <div class="popup-details-qrcode-bottom be-replaced clearfix">
            <img :src="storeObj.qrcode" class="popup-details-qrcode-bottom-qrcode fl" alt="">
            <span class="popup-details-qrcode-bottom-text fl">长按保存图片</span>
          </div>
          <div class="popup-details-close spritesmap" @click.self="partPopupOff"></div>
          <img src="" class="canvas2img-1" alt="">
        </div>
      </div> 
      <!-- 收藏详情 -->
      <div class="collection-qr-img" v-if="isCollection && displayQr">
        <div class="bigQr_2">
          <img :src="baseUrl+storeObj.images" class="goods-img" alt="">
          <div class="collection-qr-img-content clearfix">
            <div class="content-left fl">
              <img :src="storeObj.thumb" class="buyer-avator" alt="">
            </div>
            <div class="content-right fl">
              <div class="buyer-name">{{ storeObj.name }}</div>
              <div class="goods-desc text-overflows">东西不错，物有所值，很喜欢，很有收藏价值，会继续关注，希望品质一如既往的好</div>
              <div class="xiaofupai-qr">
                <img src="../../assets/img/xiaofupai_qrcode.jpg" alt="">
              </div>
              <div class="collection-qr-img-text">长按识别，关注小福拍</div>
            </div>
          </div>
          <div class="collection-qr-img-bottom">
            只有你想不到的,东西多的让你挑花眼!心动不如行动!
          </div>
        </div>
      </div>
      <div class="popup-details-share" v-show="displayWx">
        <img src="../../assets/img/share_to_wx.png" alt="">
      </div>
      <div class="popup-details-copy" v-show="displayLink">
        <div class="popup-details-copy-success">链接已复制</div>
      </div> 
      <div class="popup-details-copy-fuckiphone" v-show="displayFuckIphone">
        <p class="popup-details-fuckiphone-error"></p>
        <div class="popup-details-fuckiphone-title">请手动复制链接</div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';

export default {
  /* created by lpt */ 
  data: function() {
    return {
      fuckIphone: false,
      timer: null,
      isReplace: false,
      baseUrl: window.config.img_url, 
      isCollection: false,
      // 拍品链接
      localUrl: location.origin + '/lotdetails/' + this.storeObj.id,
      // 拍品链接
      collectUrl: location.origin + '/collection/2/' + this.storeObj.id,
      // 展示部分
      displayContent: false,
      displayWx: false,
      displayQr: false,
      displayLink: false,
      displayFuckIphone: false,
      clipboard: null,
      timerCopy: null,
      // 分享选项
      shareOptions: [
        {
          id: 1,
          classname: 'popup-icon-wx',
          eventname: this.shareToWx,
          text: '微信'
        },
        {
          id: 2,
          classname: 'popup-icon-qr',
          eventname: this.Qrcode,
          text: '二维码'
        },
        {
          id: 3,
          classname: 'popup-icon-copy',
          eventname: this.copyLink,
          text: '复制链接'
        },
      ]
    }
  },
  props: ['storeObj'],
  created () {
    const pageId = this.$route.params.page;
    if (pageId) {
      this.isCollection = true;
    };
    this.collectUrl = location.origin + '/collection/'+ pageId +'/' + this.storeObj.id;
    this.localUrl = location.origin + '/lotdetails/' + this.storeObj.id;

    // console.log(this.storeObj)
  },
  mounted () {
  },
  methods: {
    syncLink: function() {
      this.collectUrl = location.origin + '/collection/'+ this.$route.params.page +'/' + this.storeObj.id;
      this.localUrl = location.origin + '/lotdetails/' + this.storeObj.id;
    },

    // 微信
    shareToWx: function(id) {
      this.initDisplay();
      this.displayWx = true;
      $('.share-button').attr('disabled',false)
      
      // 收藏详情页
      if (this.$route.params.page) {
        var options = {
          id: this.storeObj.id,
          url: location.origin + '/collection/'+this.$route.params.page+'/' + this.storeObj.id,
          images: this.storeObj.images, 
          type: 'img',
          classifyName: this.storeObj.typename
        }
        if (this.$route.params.page == '1') {
          options.desc = '这东西不错，物有所值，很喜欢';
          options.title = '我买了这个，大家观摩一下';
        } else {
          options.desc = '我的这幅作品被超级买家“'+this.storeObj.name+'”收藏了！';
          options.title = '好消息，我的作品被收藏了';
        }
      } else {
        // 拍品详情页
        var options = {
          id: this.storeObj.id,
          link: location.origin + '/lotdetails/' + this.storeObj.id,
          images: this.storeObj.images[0].url, 
          type: 'img',
          desc: this.storeObj.desc,
          classifyName: this.storeObj.typename 
        }  
      }
      // 传递数据
      this.$emit('shareBubbleEvent',options)
    },

    // 二维码
    Qrcode: function() {
      this.initDisplay();
      this.displayQr = true;
      // this.createImg()
    },

    // 复制链接
    copyLink: function() {
      // 实例化 clipboard
      this.$nextTick(() => {
        this.clipboard = new Clipboard('.btn');
        
        this.clipboard.on('success', (e) => {
          this.displayLink = true;
          clearTimeout(this.timerCopy)
          this.timerCopy = setTimeout( () => {
            this.displayLink = false;
            this.partPopupOff()
          },1500)
          this.clipboard.destroy();
        });
        this.clipboard.on('error', (e) => {
          this.displayFuckIphone = true;
          if (this.$route.params.page) {
            $('.popup-details-fuckiphone-error').text(this.collectUrl)
          } else {
            $('.popup-details-fuckiphone-error').text(this.localUrl)  
          }
          
          this.clipboard.destroy();
        });

      })
      this.initDisplay();
      this.collectUrl = location.origin + '/collection/'+ this.$route.params.page +'/' + this.storeObj.id;
      this.localUrl = location.origin + '/lotdetails/' + this.storeObj.id;
    },

    createEle: function(src) {
      // var newImg = document.createElement('img');
      var newImg = new Image()
      newImg.setAttribute('class','canvas2img')
      newImg.setAttribute('crossOrigin', '*');
      newImg.src = src;

      return newImg;
    },

    initCanvas: function() {
      if ($('.canvas2img')) {
        $('.canvas2img').remove()
      }
      if ($("#bigQr .canvas2img-1").attr('src')) {
        $("#bigQr .canvas2img-1").hide()  
      };
      
      $('.be-replaced').show()
    },

    createImg: function() {
      const that = this; 
      if (!this.timer) {
        this.timer = setTimeout( () => {
          $("#bigQr canvas").remove()
          this.initCanvas()
          var dataUrl;
          var dataUrl1;
          // 设备检测
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {// iphone
            html2canvas(document.getElementById('bigQr'), {
              onrendered: function (canvas) {
                // canvas is the final rendered <canvas> element
                // that.timer = null; 
                $('.be-replaced').hide()
                $("#bigQr").append(canvas)
                
                dataUrl = $('canvas')[0].toDataURL("image/png");

                $("#bigQr .canvas2img-1").show()

                $("#bigQr .canvas2img-1").attr("src",dataUrl);
                
                $("#bigQr canvas").remove()
                
                if (!this.fuckIphone) {
                  $("#bigQr .canvas2img-1").hide()
                  $('.be-replaced').show()
                  html2canvas(document.getElementById('bigQr'), {
                    onrendered: function (canvas1) {
                      // canvas is the final rendered <canvas> element
                      that.timer = null; 
                      $('.be-replaced').hide()
                      $("#bigQr").append(canvas1)
                      
                      dataUrl = $('canvas')[0].toDataURL("image/png");

                      $("#bigQr .canvas2img-1").show()

                      $("#bigQr .canvas2img-1").attr("src",dataUrl);
                      
                      $("#bigQr canvas").remove()
                      
                      $('.share-button').attr('disabled',false)                      
                    }
                  });
                  this.fuckIphone = true;
                } else { 
                  that.timer = null;
                  $('.share-button').attr('disabled',false) 
                  console.log('do nothing')
                }
              
              }
            });
            
          } else if (/(Android)/i.test(navigator.userAgent)) { //安卓
            html2canvas(document.getElementById('bigQr'), {
              onrendered: function (canvas) {
                // canvas is the final rendered <canvas> element
                that.timer = null; 
                $('.be-replaced').hide()
                $("#bigQr").append(canvas)
                
                dataUrl = $('canvas')[0].toDataURL("image/png");

                $("#bigQr .canvas2img-1").show()
                $("#bigQr .canvas2img-1").attr("src",dataUrl);
                $("#bigQr canvas").remove()
                if ($('.canvas2img').length) return;
                
                $('.share-button').attr('disabled',false)
              }
            });
          }
        },1000)  
      }
      
    },

    // 取消展示
    cancleEvent: function () {
      this.initDisplay()
      this.displayContent = false;
      $('.popup-details-bottom').css('zIndex',0)
      $('.share-button').attr('disabled',false)

      this.$emit('childEvent')
    },

    partPopupOff: function() {
      // if (this.timer != null) { 
      //   alert('正在生成拍品图片信息,请稍等...') 
      //   return; 
      // };
      this.displayContent = false;
      $('.popup-details-content-layer').css('zIndex',-1)
    },

    // 初始展示部分
    initDisplay: function() {
      this.displayWx = false;
      this.displayQr = false;
      this.displayLink = false;
      this.displayContent = true;

      $('.popup-details-bottom').css('zIndex',-1)
      $('.popup-details-content-layer').css('zIndex',0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .collection-qr-img {
    width: 35.5rem;
    height: 51rem;
    margin: 0 auto;
    margin-top: 2rem;
    border: 1px solid #fff;
    background: #fff;
  }
  
  .collection-qr-img-text {
    font-size: 1.3rem;
    padding-left: 2.5rem;
  }
  .goods-img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
  }

  .collection-qr-img-content {
    width: 100%;
    height: 27rem;
  }

  .content-left {
    width: 8.6rem;
    height: 100%;
  }
  
  .buyer-avator {
    width: 5.5rem;
    height: 5.5rem;
    margin: 1.5rem;
    border-radius: 50%;
  }

  .buyer-name {
    margin-top: .5rem;
    font-size: 1.4rem;
    color: #333;
    font-weight: bold;
    line-height: 4.4rem;
  }
  
  .goods-desc {
    min-height: 5.1rem;
    font-size: 1.4rem;
    color: #333;
  }

  .content-right {
    width: 26rem;
    height: 100%;
  }

  .xiaofupai-qr {
    width: 12rem;
    height: 12rem;
    margin-left: 3.1rem;
    /*margin-top: 2.5rem;*/
  }

  .xiaofupai-qr img {
    width: 100%;
    height: 100%;
  } 
  
  .collection-qr-img-bottom {
    margin: 0 1.8rem;
    padding-top: 1rem; 
    border-top: .05rem solid #999;
    font-size: 1.2rem;
    color: #999;
    text-align: center;
  }

  .popup-details {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  
  .popup-details div,
  .popup-details img {   
/*    -webkit-touch-callout:none;     
    -webkit-user-select:none;    
    -khtml-user-select:none;  
    -moz-user-select:none;  
    -ms-user-select:none;  
    user-select:none;*/   
  }  

  .popup-details-content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 2.5rem;
    left: 50%;
    padding-bottom: 11rem;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  
  .popup-details-content-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
  }

  .popup-details-close {
    position: absolute;
    bottom: -5.4rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 3rem;
    height: 3rem;
    background-position: -15.7rem -5.6rem;
  }

  .popup-details-qrcode {
    position: relative;
    width: 34.1rem;
    /*height: 48rem;*/
    margin: 0 auto;
  }
  
  .popup-details-copy-fuckiphone {
    width: 28rem;
    margin: 11rem auto;
    border-radius: .5rem;
    background: #fff;
  }

  .popup-details-fuckiphone-title {
    -webkit-touch-callout:none;     
    -webkit-user-select:none;    
    -khtml-user-select:none;  
    -moz-user-select:none;  
    -ms-user-select:none;  
    user-select:none;
    width: 24rem;
    height: 4.2rem;
    margin: 0 auto;
    border-top: 1px solid #e5e5e5;
    line-height: 4.2rem;
    text-align: center;
    color: #999;
    font-size: 1.4rem;
  } 

  .popup-details-fuckiphone-error {
    height: 9.9rem;
    padding: 3.5rem 2rem 0rem;
    word-wrap: break-word;
    text-align: center;
    font-size: 1.4rem;
    color: #333;
  }

  .popup-details-qrcode-top,
  .popup-details-qrcode-bottom {
    background: #fff;
    border-radius: .6rem;
  }

  .popup-details-qrcode-top {
    padding: 1rem;
    border-bottom: .05rem dashed #000;
  }
  
  .popup-details-qrcode-top-image {
    overflow: hidden;
    width: 32rem;
    height: 21.3rem;
    margin-bottom: 1.5rem;
    border-radius: .4rem;
    display: block;
    /*background: #ccc;*/
  }
  
  .popup-details-qrcode-top-image img {
    width: 100%;
    height: 100%;
  }

  .popup-details-qrcode-top-info {
    text-align: center;
  }
  
  .popup-details-qrcode-top-info .avator {
    overflow: hidden;
    display: inline-block;
    width: 3.9rem;
    height: 3.9rem;
    border-radius: 50%; 
  }
  
  .avator img {
    width: 100%;
    height: 100%;
  }

  .popup-details-qrcode-top-info .shop-name {
    font-size: 1.4rem;
    font-weight: 600;
    color: #333;
    line-height: 3.2rem;
  }
  
  .popup-details-qrcode-top-info .goods-desc {
    padding-bottom: .5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    overflow: hidden;
    text-align: left;
    font-size: 1.3rem;
    color: #666;
  }

  .popup-details-qrcode-bottom {
    padding-left: 6.5rem;
  }
  
  .popup-details-qrcode-bottom-qrcode {
    width: 12rem;
    height: 11rem;
  }

  .popup-details-qrcode-bottom-text {
    /*margin-top: 3.1rem;*/
    line-height: 11rem;
    font-size: 1.4rem;
    color: #666;
  }

  .popup-details-share {
    width: 28.25rem;
    height: 15.15rem;
    margin: 0 auto;
  }

  .popup-details-share img {
    width: 100%;
    height: 100%;
  }

  .popup-details-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20.35rem;
    text-align: center;
    background-color: #fff; 
  }

  .popup-details-bottom-title {
    height: 5.3rem;
    line-height: 5.3rem;
    font-size: 1.2rem;
    color: #aaa;
  }
  
  .popup-details-bottom-line {
    padding: 0 2.5rem;
  }
  
  .popup-details-bottom-line-dot {
    width: .1rem;
    height: .2rem;
    margin: 0 .3rem;
    background: #ccc;
  }

  .popup-details-bottom-line-left {
    width: 15.9rem;
    height: .05rem;
    text-align: center;
    line-height: 80px;
    margin-bottom: 10px;
    color: White;
    font-size: 20px;
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#e7e7e7',endColorStr='#cccccc',gradientType='1');
    background: -moz-linear-gradient(left, #e7e7e7, #cccccc);
    background: -o-linear-gradient(left,#e7e7e7, #cccccc);
    background: -webkit-gradient(linear, 0% 0%, 100% 0%, from(#e7e7e7), to(#cccccc));
  }
  
  .popup-details-bottom-line-right {
    width: 15.9rem;
    height: .05rem;
    text-align: center;
    line-height: 80px;
    margin-bottom: 10px;
    color: White;
    font-size: 20px;
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#cccccc',endColorStr='#e7e7e7',gradientType='1');
    background: -moz-linear-gradient(left, #cccccc, #e7e7e7);
    background: -o-linear-gradient(left,#cccccc, #e7e7e7);
    background: -webkit-gradient(linear, 0% 0%, 100% 0%, from(#cccccc), to(#e7e7e7));
  }

  .popup-details-bottom-list {
    display: flex;
    margin-top: 2rem;
  }
  
  .popup-details-bottom-item {
    flex: 1;
    font-size: 1.4rem;
    color: #333;
  }

  .popup-details-bottom-img {
    width: 5.2rem;
    height: 5.2rem;
    margin: 1.5rem auto;
    border-radius: 50%;
    border: 1px solid #ababab;
  }

  .popup-icon-wx {
    width: 3.15rem;
    height: 2.65rem;
    margin: 1.2rem auto;
    background-position: -17.3rem -27.25rem;
  }

  .popup-icon-qr {
    width: 2.6rem;
    height: 2.6rem;
    margin: 1.3rem auto;
    background-position: -21.7rem -27.25rem;
  }

  .popup-icon-copy {
    width: 2.4rem;
    height: 2.4rem;
    margin: 1.5rem auto;
    background-position: -25.65rem -27.45rem;
  }

  .popup-details-copy-success {
    width: 12rem;
    height: 3.9rem;
    margin: 11.9rem auto;
    line-height: 3.9rem;
    border-radius: 50% / 200%;
    background: rgba(0,0,0,.5);
    text-align: center;
    font-size: 1.4rem;
    color: #fff;
  }
/*  #bigQr img {
    position: relative;
    z-index: 10000;
    border: 10px solid red;
  }*/
</style>