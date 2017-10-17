<template>
  <div>
    <footer class="footer-bottom fixed clearfix" id="footer-common" :data-islogin="isLogin">
      <a href="javascript:;" class="fl" @touchend="emitIndex">
        <div class="footer-icon shotsprites"></div>
        <p>首页</p>
      </a>
      <!-- 分类 -->
      <a href="javascript:;" class="fl" v-if="!isMine" @touchend="emitClassify">
        <div class="footer-icon shotsprites"></div>
        <p>分类</p>
      </a>
      <!-- 发布 -->
      <router-link to="/picture" id="footer-relase" class="fl" v-if="isMine">
        <div class="footer-icon shotsprites"></div>
        <p>发布</p>
      </router-link>
      <a href="javascript:;" class="fl" @touchend="emitFind">
        <div class="footer-icon re shotsprites">
          <div class="ab new-message"></div>
        </div>
        <p>发现</p>
        <!-- 未读消息小红点 -->
        <div class="red_dot" v-if="isUnRead"></div>
      </a>

      <a href="javascript:;" class="fl" @touchend="emitMine">
        <div class="footer-icon shotsprites"></div>
        <p>我的</p>
      </a>
    </footer>
    <login v-show="isLogin" @closeLogin="closeLogin"></login>   
  </div>
  
</template>

<script>
import ajax from 'assets/js/ajax';
import login from '@/components/login/index';

export default {
  data: function() {
    return {
      isMine: false,       // 是否个人中心
      isUnRead: false,     // 是否有未读消息
      isLogin: false,
    }
  },
  props:["classNmae"],
  created: function() {
    var mine = window.localStorage.getItem('footer_is_mine');
    if (mine == true) {
      this.isMine = true;
    } else {
      this.isMine = false;
    }
    
  },
  components: {
    'login': login,
  },
  mounted: function() {  
    // 是否有未读消息
    var timer = null;
    var _this = this;
    this.ishaveUnRead();
    clearInterval(timer);
    timer = setInterval(function(){
      _this.ishaveUnRead();
    },60000)
  },
  methods: {
    // 关闭登陆弹窗
    closeLogin() {
      this.isLogin = window.islogin = false;
    },

    // 点击首页
    emitIndex: function() {
      this.$router.push('/index');
      this.isMine = false;
      this.getActive(0);
      window.localStorage.setItem('footer_is_mine',false);
    },

    // 点击发现
    emitFind: function(){
      this.$router.push('/find');
      this.isMine = false;
      this.getActive(2);
      window.localStorage.setItem('footer_is_mine',false)
    },

    // 点击分类
    emitClassify: function(){
      this.$router.push('/classify/content/126?title=学院专区&type=college');
      // that.$router.replace("/classify/content/15");
      this.isMine = false;
      this.getActive(1);
      window.localStorage.setItem('footer_is_mine',false)
    },

    // 点击我的
    emitMine: function() {
      this.$router.push('/center');
      this.isMine = true;
      this.getActive(3);
      window.localStorage.setItem('footer_is_mine',true)
    },

    /**
     * 给当前点击的footer元素添加 active样式
     * @param  number index footer下标元素
     * @return 无    
     */
    getActive: function(index){
      $('.footer-bottom a').removeClass('router-link-active');
      $(".footer-bottom a").eq(index).addClass("router-link-active");

      // 清空分类商品缓存
      window.localStorage.removeItem('classify_nav_id');
      window.localStorage.removeItem('classify_nav_title');
    },

    // 是否有未读消息
    ishaveUnRead: function() {
      var _this = this;
      this.isUnRead = false;
      ajax.messageNotify(function(data){
        if (data.status == 200) {
          _this.isUnRead = true;
        } else if(data.stauts == 201) {
          _this.isUnRead = false;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>