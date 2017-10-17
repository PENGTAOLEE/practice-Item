<template>
<div name="pages">
    <div class="section_body">
        <div class="section_logo">
            <div class="section_content_box clr">
                <a class="text_head fl text_logo" href="javascript:;">店铺LOGO</a>
                <div class="img_button fr" id="img_button">
                    <img class="logo_img" :src="shopLogoImg" alt="">
                </div>
            </div>
            <div class="text_box">
                <i class="text_rt">（推荐尺寸512×512）</i>
            </div>
        </div>
        <div class="section_shop_name clr">
            <a class="text_head fl text_name" href="javascript:;">店铺名称</a>
            <input type="text" class="text_tip fr" placeholder="请输入您的店铺名称" v-model="shopName">
        </div>
        <div class="section_title">
            店铺名称不允许重名，不能使用他人注册商标
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
            介绍长度不超过140个字
        </div>
        <div class="section_submit" @click="setGoAuthenInfo">
            <a href="javascript:;" class="submit submit_success" v-if='data.is_apply_now==3||data.is_apply_now==2||data.is_apply_now==4'>提交审核</a>
            <a href="javascript:;" class="submit submit_success"v-else-if='data.is_apply_now==1||data.is_apply_now==5'>支付认证费用并提交审核</a>
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
            shopLogoImg: require("../../assets/img/share_logo.jpg"),  // 店铺logo
            shopName: "",
            shopIntr: "",
            authid: '',
            alert_msg: '',
            is_alert: false,
		}
	},
	props: ['state'],
    created () {
        this.getAuthenDetailsInfo();
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
        getAuthenDetailsInfo: function(){
            ajax.getAuthenDetailsInfo((data) => {
                if(data.status==200){
                    var obj = data.data;
                    this.shopLogoImg = obj.logo || obj.logos;
                    this.shopName = obj.title;
                    this.shopIntr = obj.desc;
                    this.authid = obj.id;
                    this.data = data.data;
                    // console.log(that.$route.params.id);
                }else{
                    this.alert_msg = "页面获取失败";
                    this.is_alert = true;
                }
            })
        },

        // 第三步验证
        setGoAuthenInfo () {
            var dataObj = {};
            dataObj.key = '3';
            // logo 
            dataObj.logo = this.shopLogoImg;
            // 店铺名
            dataObj.title = this.shopName;
            // 店铺介绍
            dataObj.desc = this.shopIntr;
            console.log( dataObj )

            if (!dataObj.logo) {
                this.alert_msg = "请上传店铺logo";
                this.is_alert = true;
                return;
            } else if (!dataObj.title) {
                this.alert_msg ="请输入店铺名称";
                this.is_alert = true;
                return;
            } else if (!dataObj.desc) {
                this.alert_msg ="请输入店铺描述";
                this.is_alert = true;
                return;
            } else if (dataObj.desc.length >= 140) {
                this.alert_msg = "店铺介绍长度请限制在140字之内";
                this.is_alert = true;
                return;
            } else {
                // var dataJson = JSON.stringify(dataObj);
                var that = this;
                ajax.goAuthenInfo( dataObj,function(res){
                    if (res.status == 200 || res.status ==201) {
                        // 跳转
                        if(that.data.pay_status==1){
                            that.$router.push('/authendetails');
                        }else if(that.data.pay_status==0){
                            if(that.$route.params.id==1){
                                that.$router.push('/payment/0?type=authentic&ordertype=6&identity=personal&authid='+that.authid);
                            }else if(that.$route.params.id==2){
                                that.$router.push('/payment/0?type=authentic&ordertype=6&identity=company&authid='+that.authid);
                            }
                        }
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
       margin-top: 1rem;
       background-color: #FFF;
    }
    .section_content_box{
        width: 100%;
        padding: 1rem 1.5rem;
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
        font-size: 1.25rem;
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
         background-color: #158725;
         color: #FFF;
    }
    /* /店铺LOGO */
    .space {
        width: 100%;
        height: 5rem;
    }



</style>