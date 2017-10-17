<template>
  <div id="wrapper-content">
    <div class="cy-list-con clearfix">
      <h1 v-if="isCollegeId" class="college-title">“学院专区”是小福拍倾力打造的特色频道，汇集了全国各大美院学生的优秀原创作品，创作者和发布者均为经小福拍实名认证的在校学生及毕业生。很多作品具有较高的艺术潜力和增值空间。</h1>
      <div class="fl" v-for="(num,key) in cycontent">
        <!-- 跳转商品列表页 -->
        <router-link 
          class="fl list-con" 
          :to= "'/format/'+num.id+'?title=' + encodeURIComponent(num.title)"
          v-if="!isActivity && !isCollege"
          :key="key"
        >
          <div class="list-con-img divbg" :style="{backgroundImage:'url(' + num.thumb + ')'}">
          </div>
          <div class="list-con-name">
            <div>{{num.name}}</div>
            <!-- <div class="list-con-counts">[在拍:{{ num.counts }}]</div> -->
          </div>
          <!-- <div class="auction-lot-box clearfix">
            <span class="spritesmap auction-lot fl"></span>
            <span class="spritesmap lot-num fl">{{ num.counts }}</span>
            <span class="spritesmap lot-icon-bg fl"></span>
          </div> -->
        </router-link>
        <!-- 跳转商品列表页结束 -->

        <!-- 推荐商户 -->
        <router-link 
          class="fl list-con" 
          v-if="isActivity&&num.url"
          :to= "num.url.trim() + '&v=' + new Date().getTime().toString().slice(0,-4)"
          :key="key"
        >
          <div class="list-con-img divbg" :style="{backgroundImage:'url(' + num.thumb + ')'}">
          </div>
          <div class="list-con-name">
            <div>{{num.name}}</div>
            <!-- <div class="list-con-counts">[在拍:{{ num.counts }}]</div> -->
          </div>
        </router-link>
        <!-- 推荐商户 end -->

        <!-- 学院分类 -->
        <router-link 
          class="fl list-con" 
          v-if="isCollege && !num.url"
          :to= "'/format/'+num.id+'?title=' + encodeURIComponent(num.title) + '&type=college'"
          :key="key"
        >
          <div class="list-con-img divbg" :style="{backgroundImage:'url(' + num.thumb + ')'}">
          </div>
          <div class="list-con-name">
            <div>{{num.name}}</div>
            <!-- <div class="list-con-counts">[在拍:{{ num.counts }}]</div> -->
          </div>
        </router-link>
        <!-- 学院分类 end -->
      </div>
    </div>

    <!-- 微信分享 -->
    <wx-share :message="wxShareObj" v-if="repaint"></wx-share>
  </div>
</template>

<script>
  import sharePage from '@/components/component/shareSub'
  import ajax from 'assets/js/ajax'
  import utils from 'assets/js/utils'
  var config = window.config

  export default {
    data:function(){
      return {
        repaint: false,
        isCollegeId: false,
        collegeId: window.config.college_id, // 校园新锐
        currentId: undefined,                // 当前分类id 
        cycontent:[],
        baseUrl: window.config.img_url,
        wxShareObj: {},
        isActivity: false,  // 是否运营活动
        isCollege: false,   // 是否学院
      }
    },
    mounted:function(){
      $(".cy-list-con").css({"min-height":$(window).height()});

      this.$nextTick(function() {
        this.addRouterLink()
      })

    },
    components: {
      'wx-share': sharePage
    },
    created:function(){// 组件创建完后获取数据，
      var key;
      this.contentlist()
      document.title = decodeURIComponent( utils.getRequest().title);

      this.classifyActivity();

      this.judgeCollege()
      
      for(var k in this.cycontent){ key=k; break; }

      // 微信分享
      this.wxShareObj.title = "全是你想要的，任性拍！";
      this.wxShareObj.images = this.cycontent[key].thumb; 
      this.wxShareObj.url = location.href;
      this.wxShareObj.desc = "小福拍【" + document.title + "】—珍品捡漏，秒光，快进来！";

    },
    watch :{//路由发生变化调用该函数
      '$route' : ["contentlist","addRouterLink","classifyActivity","judgeCollege"]
    },
    beforeDestroy: function() {
      $(".footer-bottom a").eq(1).removeClass("router-link-active")
    },
    methods:{
      // 当前分类是否为校园新锐分类 
      judgeCollege: function() {
        // 当前id
        this.currentId = this.$route.params.id;
        if (this.currentId == this.collegeId) {
          this.isCollegeId = true;
        } else {
          this.isCollegeId = false;
        }
      },

      /**
       * 分类数据增加title字段
       * @param  {array}  arr  数组
       * @param  {string} text 匹配字符串
       * @return {object}      新对象
       */
      createData: function(arr,text) {
        var title = utils.getRequest().title;
        var newObj = {};
        if (arr instanceof Array) {
          arr.forEach( (item,index) => {
            if (item.name == text) {
              item.title = title;
            } else {
              item.title = item.name;
            }
          })  
        } else {
          // 如果是个对象
          for(var i in arr) {
            if (arr[i].name == text) {
              arr[i].title = title;
            } else {
              arr[i].title = arr[i].name;
            }
          }
        }
        newObj = arr;
        return newObj;
      },

      // 数据
      contentlist:function(){
        var num=this.$route.params.id;
        var that=this;
        var key;
        ajax.classifYnav(num,function(data){
          if(data.status=="200"){
            that.cycontent = that.createData(data.data,'全部');
            window.localStorage.setItem('classify_nav_id',num);
            window.localStorage.setItem('classify_nav_title',utils.getRequest().title);

            document.title = decodeURIComponent( utils.getRequest().title);

            for(var k in that.cycontent){ key=k; break; }
            // 微信分享
            that.wxShareObj.title = "全是你想要的，任性拍！";
            that.wxShareObj.images = that.cycontent[key].thumb || require("../../assets/img/share_logo.jpg"); 
            that.wxShareObj.url = location.href;
            that.wxShareObj.desc = "小福拍【" + document.title + "】—珍品捡漏，秒光，快进来！";

            that.repaint = false;
            setTimeout( () => {
              that.repaint = true;
            },1000)
            
          }else{
            that.cycontent=[];
          }
        });
      },

      // footer样式
      addRouterLink: function() {
        $(".footer-bottom a").eq(1).addClass("router-link-active")
      },

      // 判断当前是否运营活动
      classifyActivity: function() {
        var _this = this;
        if (utils.getRequest().type == 'activity') {
          _this.isActivity = true;
        } else if (utils.getRequest().type == 'college') {
          _this.isCollege = true;
        } else {
          _this.isActivity = false;
          _this.isCollege = false;
        }
      },
        
    }
  }
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .college-title {
    padding: .4rem .4rem .4rem .6rem;
    margin-bottom: 1rem;
    font-weight: 500;
    font-size: 1.2rem;
    color: #999;
    margin-right: 1.5rem;
    background: #eee;
    border-radius: .5rem;
  }

  .list-con {
    position: relative;
  }
  
  .auction-lot-box {
    position: absolute;
    top: 0.75rem;
    left: -0.15rem;
    min-width: 5.2rem;
    height: 1.4rem;
  }

  .auction-lot {
    min-width: 2.2rem;
    height: 1.3rem;
    line-height: 1.3rem;
    text-indent: 1.2rem;
    background-position: -24.45rem -25.45rem;
  }

  .lot-num {
    position: relative;
    z-index: 5;
    margin-left: -1rem;
    line-height: 1.25rem;
    font-size: 1.1rem;
    color: #fff;
    background-position: -28.3rem -25.45rem; 
    background-color: #ff4545;
  }

  .lot-icon-bg {
    display: inline-block;
    margin-left: -.5rem;
    min-width: 3.2rem;
    height: 1.3rem;
    background-position: -28.3rem -25.6rem; 
  }

  .list-con-counts {
   /* margin: -1rem;*/
    text-align: center;
    font-size: 1rem;
    color: #999;
  }
</style>