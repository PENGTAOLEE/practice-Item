<template>
<div class="student_index">
    <!-- <div class="contest_rules">
        <a href="http://mp.weixin.qq.com/s/EbgPFY9wNKBDZoPyr8cHOQ" class="content">"大赛规则"</a>
    </div> -->
    <div class="enter_box">
        <a href="/authenstudent" class="enter">
            学生认证
        </a>
    </div>
    	<!-- 微信分享 -->
	<wx-share :message="wxShareObj"></wx-share>
</div>
 

</template>
<script>
    var config = window.config;
    import sharePage from '@/components/component/shareSub' 
    // var sharePage    = require("@/components/component/shareSub");
     export default {
        data:function(){
            return {
                wxShareObj: {},                                                     // 微信分享
            }
        },

        components: {
            'wx-share': sharePage,
        },
        created: function() {
            // 微信分享
            // console.log( this.wxShareObj )
            this.wxShareFun()
        },  
        mounted: function(){
            // document.title="学生报名";
        },
        methods: {
            // 微信分享
            wxShareFun: function() {
                // var imagesArr = JSON.parse( this.allData.goods_detail[0].images );
                this.wxShareObj.title = '校园专区-学生认证';
                this.wxShareObj.images = require('../../assets/img/share_logo.jpg'); 
                // this.wxShareObj.imgType = imagesArr[0].type;

                this.wxShareObj.url = location.origin + '/authenstudentindex';
                // this.wxShareObj.url = location.href; 
                this.wxShareObj.desc = '校园专区学生认证，作品优先推荐竞拍';
                // this.wxShareObj.type = true;
            }

        }
    }
</script>
<style>
  html,
  body,
  #app {
      /*position: relative;
      overflow: hidden;*/
      height: 100%!important;
      /*background: red;*/
  }
  
  .student_index{
      /*display: block;*/
      width: 100%;
      /*margin-bottom: 5rem;*/
      height: 100%;
      background: url(../../assets/img/student_index.png)  no-repeat;
      background-size: 100% 100%;
      position: relative;
  } 
  .contest_rules{
    position: absolute;
    top: 46%;
    left: 3.5rem;
    /* box-shadow: 1px 1px #36173F; */
  }
  .content{
      font-size: 1.4rem;
      color: #54A9FF;
      text-decoration: none;
      padding-bottom: .2rem;
      border-bottom: 2px solid #54A9FF;
      text-shadow: 1px 1px #36173F;
  }
  .enter_box{
      position: absolute;
      top: 57.6%;
      left: 10.15rem;
      width: 10.5rem;
      height: 3.5rem;
      border: 1px solid #CF0E0E;
      border-radius: 0.2rem;
	  text-align: center;
  }
  /*.enter{
      /* border: .1rem solid #FFF; */
     /* border-radius: 1.9rem;
      padding: 1rem 1.8rem;
      font-size: 1.4rem;*/
     /* color: #FFF;
       background-color: #54A9FF;
       box-shadow: 0 0.3rem 0 rgba(0,0,0,0.1),
                   0 -0.3rem 0 rgba(0,0,0,0.1);
  }*/
  .enter{
  	margin: 0.5rem;
  	display: block;
  	width: 9.5rem;
  	height: 2.5rem;
  	line-height: 2.5rem;
  	background-color: #A03C00;
  	border-radius: 0.2rem;
  	text-align: center;
  	color: #fff;
  	font-size: 1.4rem;
  }

</style>