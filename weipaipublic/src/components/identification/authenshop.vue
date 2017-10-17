<template>
<div name="pages">
    <div class="section_body">
       <div class="section_shop_name ">
            <div class="name_box clr">
                <a class="text_head fl text_name" href="javascript:;">店铺名称</a>
                <div class="text_tip fr">{{shopName}}</div>
            </div>
        </div>
        <div class="section_logo" id="img_button">
            <div class="section_content_box clr" >
                <a class="text_head fl text_logo" href="javascript:;">店铺LOGO</a>
                <div class="img_button fr" >
                    <img class="logo_img" :src="shopLogoImg" alt="">
                </div>
            </div>
            <div class="text_box">
                <i class="text_rt">（推荐尺寸512×512）</i>
            </div>
        </div>
        <div class="section_shop ">
            <div class="section_shop_tit">
                <a class="text_head" href="javascript:;">
                店铺介绍
                </a>
            </div>

            <textarea class="section_shop_descri" placeholder="请填写店铺介绍" v-model="shopIntr">

            </textarea>
        </div>
        <div class="text_rt">
           <!--  介绍长度不超过140个字 -->
        </div>
        <div class="text_msg">
            <div class="msg_box">
               <div class="line_left fl"></div>
                <div class="text_center fl">LOGO和介绍每月可改一次</div>
                <div class="line_right fr"></div>
            </div>
       </div>
        <div class="section_submit" @click="goAuthenShop">
            <a href="javascript:;" class="submit submit_success">确认修改</a>
            <!-- <router-link :to="'/payment/0?type=authentic&ordertype=6&identity=personal&authid='+data.id"  class=" submit submit_success" v-if="$route.params.id==1">支付认证费用并提交审核</router-link>
            <router-link :to="'/payment/0?type=authentic&ordertype=6&identity=company&authid='+data.id"   class=" submit submit_success" v-if="$route.params.id==2">支付认证费用并提交审核</router-link> -->
           
        </div>
    </div>
    <div class="space"></div>
    <show-alert v-if="is_alert" @closeBox="closeAlert" :msg="alert_msg"></show-alert>
</div>
</template>
<script>
var Plupload = require("cusplupload");
var ajax = require("ajax");
var config = window.config;
var showAlert = require("@/components/component/showAlert")
export default {
	data: function() {
		return {
            data: '',

            // 图片上传
            baseUrl: window.config.img_url,
            // shopLogoImgJson: "", // 上传服务器
            shopLogoImg: '',  // 店铺logo
            shopName: "",
            shopIntr: "",
            alert_msg: '',
            is_alert: false,
		}
	},
	props: ['state'],
    created () {
        this.getAuthenShop();
        document.title="店铺信息修改";
    },
    components: {
        "show-alert": showAlert
    },
    mounted () {
        var _this = this;

        // 店铺Logo 上传
        Plupload.init({
            browseButton: 'img_button',
            fileUploadEvent: function(up, file, info){ 
                _this.shopLogoImg = _this.baseUrl + file;
                // _this.shopLogoImgJson = file;
            },
            fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
        });

    },
    methods: {
        // 获取认证历史填写数据
        getAuthenShop: function(){
            ajax.getAuthenShop((data) => {
                if(data.status==200){
                    var obj = data.data;
                    this.shopLogoImg = obj.logo;
                    this.shopName = obj.title;
                    this.shopIntr = obj.desc;
                }else{
                    this.alert_msg = "页面获取失败";
                    this.is_alert = true;
                }
            })
        },

        // 第三步验证
        goAuthenShop () {
            // logo 
            var logo = this.shopLogoImg;
            // 店铺名
            // 店铺介绍
            var shop_desc = this.shopIntr;
             if (!shop_desc) {
                this.alert_msg ="请输入店铺描述";
                this.is_alert = true;
                return; 
            /* @lpt 09-15 改变此处需求  不限制商铺介绍字数 */ 
            // } else if (shop_desc.length >= 140) {
            //     this.alert_msg = "店铺介绍长度请限制在140字之内";
            //     this.is_alert = true;
            //     return;
            } else {
                // var dataJson = JSON.stringify(dataObj);
                var that = this;
                ajax.goAuthenShop( logo,shop_desc,function(res){
                    if (res.status == 200 ||res.status==201)  {
                        // 跳转
                        that.$router.go(-1);
                    }else{
                        that.alert_msg = res.msg;
                        that.is_alert = true;
                    }
                } )
            }
            
        },
        closeAlert: function(){
            this.is_alert = false;
        }
    }
	
	
}
</script>
<style scoped>
    /* 店铺LOGO */
    .section_body{
       background-color: #F6F6F6;
    }
    .section_logo{
       background-color: #FFF;
    }
    .section_content_box{
        width: 100%;
        padding: 1rem 1.5rem;
    }
    .name_box{
       width:100%;
       border-bottom: 1px solid #CCC;
    }
    .text_head{
        color: #333;
        font-size: 1.4rem;
    }
    .text_logo{
        line-height: 4.4rem;
    }
    .img_button{
        display: inline-block;
        width: 7rem;
        height: 4.4rem;
        background: url(../../assets/img/arrow.png) right no-repeat;
        background-size: .75rem 1.3rem;
    }
    .logo_img{
        display: inline-block;
        width: 4.4rem;
        height: 4.4rem;
        background-color: #EEE;
    }
    .text_box{
        text-align: right;
    }
    .text_rt{
        color: #999;
        font-size: 1.2rem;
        font-style: normal;
    }
    .section_shop_name{
        width: 100%;
        margin-top: 1rem;
        background-color: #FFF;
        padding: 0 1.5rem;
        height: 4.4rem;
        line-height: 4.4rem;
    }
    .text_name{
        width: 30%;
    }
    .text_tip{
        width: 60%;
        line-height: 4.4rem;
        font-size: 1.25rem;
        text-align: right;
    }
    .section_title{
        padding: 0 1.5rem;
        width: 100%;
        height: 3.7rem;
        line-height: 3.7rem;
        font-size: 1.25rem;
        text-align: right;
    }
    .section_shop{
        margin-top: 1rem;
        padding: 0 1.5rem;
        background-color: #FFF;
    }
    .section_shop_tit{
        height: 3.8rem;
        line-height: 3.8rem;
        border-bottom: 1px solid #E5E5E5;
    }
    .section_shop_descri{
        width: 100%;
        padding: 1rem 0;
        height: 15rem;
        font-size: 1.4rem;
        color: #999;
    }
    .text_rt{
        text-align: right;
        padding: 1rem 1.5rem;
    }
    .section_submit{
        margin-top: 3rem; 
        text-align: center;
    }
    .submit{
        display: inline-block;
        width: 80%;
        height: 4.5rem;
        line-height: 4.5rem;
        font-size: 1.6rem;
        border-radius: .35rem;
    }
    .submit_success{
         background-color: #15AF25;
         color: #FFF;
    }
    /* /店铺LOGO */
    .space {
        width: 100%;
        height: 5rem;
    }
    .text_msg{
        height: 2rem;
        width: 100%;
        line-height: 2rem;
        text-align: center;
    
    }
    .msg_box{
        width: 85%;
        margin: auto;
    }
    .text_center{
        text-align: center;
        font-size: 1.4rem;
        color: #666;
         width: 17rem;
        margin-left: 1rem;
    }
    .line_left,.line_right{
        width: 6.25rem;
        height: 1px;
        margin-top: 1rem;
 
    }
    .line_left{
        margin-left: 0;
        background: linear-gradient(to right,#FFF,#ccc)
    }
    .line_right{
        margin-right: 0;
        background: linear-gradient(to left,#FFF,#ccc)
    }


</style>