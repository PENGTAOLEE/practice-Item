<template>
<div class="personal">
	<div class="banner_title">
		企业认证<span>(请上传真实的企业信息，认证通过后将无法修改)</span>
	</div>
    <div class="banner_box clr">
        <i class="banner_descri fl">企业名称</i>
        <input type="text" placeholder="请输入企业(公司)名称" class="fl banner_input" v-model.trim="enterpriseName" @blur="checkEnterpriseName">
        <i class="spritesmap banner_error fr" v-if="is_enterprise_false"></i>
        <!--<a href="javascript:;" class="banner_button fr">验证</a>-->
    </div>
    <div class="banner_box clr">
        <i class="banner_descri fl">法人姓名</i>
        <input type="text" placeholder="请输入企业(公司)法人姓名" class="fl banner_input" v-model.trim="corporateName" @blur="checkCorporateName">
        <i class="spritesmap banner_error fr" v-if="is_corporateName_false"></i>
        <!--<a href="javascript:;" class="banner_button fr">验证</a>-->
    </div>
    <div class="banner_box clr">
        <i class="banner_descri fl">身份证号</i>
        <input type="text" placeholder="请输入企业(公司)法人身份证号" class="fl banner_input" v-model.trim.number="corporateCardId" @blur="checkCorporateCardId">
        <i class="spritesmap banner_error fr" v-if="is_corporateCardId_false"></i>
        <!--<a href="javascript:;" class="banner_button fr">已验证</a>-->
    </div>
    <div class="banner_picture">
        <!--<div class="banner_title clr">
		      <span class="fr">请填写有效电话，工作人员将会致电核实资料</span>
	      </div>-->
		<div class="upload_box clr">
            <i class="upload_descri fl">营业执照副本照片</i>
            <i class="fl upload_tip">(上传营业执照照片)</i>
            <i class="spritesmap banner_error fr" v-if="is_business_licence_false"></i>
        </div>
        <div class="section_upload">
            <div class="section_content">
                <div class="section_img section_img_front" data-index="0" :style="{backgroundImage:'url(' + images.businessLicence + ')'}">

                </div>
                <div class="section_button">
                    <a href="javascrtipt:;" class="upload_button" id="upload1">上传证件照</a>
                </div>
            </div>
            <div class="section_split">
            <!--  分割线-->
            </div>
        </div>
        <div class="upload_box clr">
            <i class="upload_descri fl">身份证正面照</i>
            <i class="fl upload_tip">为照片更好的显示请用手机横向拍摄</i>
            <i class="spritesmap banner_error fr" v-if="is_cardid_front_false"></i>
        </div>
        <div class="section_upload">
            <div class="section_content">
                <div class="section_img section_img_front" data-index="1" :style="{backgroundImage:'url(' + images.cardIdFront + ')'}">

                </div>
                <div class="section_button">
                    <a href="javascrtipt:;" class="upload_button" id="upload2">上传证件照</a>
                </div>
            </div>
            <div class="section_split">
            <!--  分割线-->
            </div>
        </div>
       
        <div class="banner_box clr">
            <i class="banner_descri fl">身份证反面照</i>
            <i class="fl banner_tip">为照片更好的显示请用手机横向拍摄</i>
            <i class="spritesmap banner_error fr" v-if="is_cardid_negative_false"></i>
        </div>
        <div class="section_upload">
            <div class="section_content">
                <div class="section_img section_img_negative" data-index="0" :style="{backgroundImage:'url(' + images.cardIdNegative + ')'}">

                </div>
                <div class="section_button">
                    <a href="javascrtipt:;" class="upload_button" id="upload3">上传证件照</a>
                </div>
            </div>
            <div class="section_split">
            <!--  分割线-->
            </div>
        </div>
        <!--<div class="banner_box clr">
            <i class="banner_descri fl">手持身份证照</i>
            <i class="fl banner_tip">拍照时请对焦在证件上</i>
            <i class="spritesmap banner_error fr"></i>
        </div>
        <div class="section_upload">
            <div class="section_content">
                <div class="section_img section_img_handheld">

                </div>
                <div class="section_button">
                    <a href="javascrtipt:;" class="upload_button">上传证件照</a>
                </div>
            </div>
            <div class="section_split"> -->
            <!--  分割线-->
            <!--</div>
        </div>-->
    </div>
    <div class="section_footer">
        <div class="footer_title">
            <i class="line_graduate line_graduate_lf"></i>
            <a href="javascript:;" class="footer_title">请确认以上信息准确无误</a>
            <i class="line_graduate line_graduate_rt"></i>
        </div>
        <div class="footer_button">
            <a href="javascript:;" class="footer_next_button" @click="goAuthenInfo">下一步</a>
        </div>
    </div>
    <div class="space">

    </div>
    <show-alert v-if="is_alert" :msg="alert_msg" @closeBox="closeBox"></show-alert>
</div>
</template>
<script>
   // var config = window.config;
    var ajax  = require("ajax");
    var utils = require("utils");
    var config = window.config;
    var Plupload1 = require("pluploadMore");
    var Plupload2 = require("pluploadMore1");
    var Plupload3 = require("pluploadMore2");
    var showAlert = require("@/components/component/showAlert")
    export default{
        data: function(){
            return {
                images: {                                           // 上传图片
                    cardIdFront: require('../../assets/img/id_card_front.png'),
                    cardIdNegative: require('../../assets/img/id_card_negative.png'),
                    businessLicence: require('../../assets/img/business_licence.png'),
                },
                index: 0,                                           // 当前触发上传组件下标
                uploadArr: [                                        // 上传图片触发元素
                    "upload1",
                    "upload2",
                    "upload3"
                ],
                imgs: [],                                           // 上传图片数组  未使用                                       
                imgsJson : '',                                      // 存库图片格式  未使用
                baseUrl : window.config.img_url,
                enterpriseName: '',                //企业名称model
                corporateName: '',                  //法人姓名model
                corporateCardId: '',                //法人身份证号
                is_enterprise_false: false,         //企业名称有问题
                is_corporateName_false: false,      //法人姓名有问题
                is_corporateCardId_false: false,    //法人身份证号有问题

                is_business_licence: false,         //判断是否长传了营业执照
                is_cardid_front: false,             //判断是否上传了身份证正面
                is_cardid_negative: false,           //判断是否上传了身份证反面

                is_alert: false,
                alert_msg: '',
                is_business_licence_false: false,         //营业执照为上传提醒图标
                is_cardid_front_false: false,             //身份证正面未上传提醒图标
                is_cardid_negative_false: false,          //身份证反面未上传提醒图标
            }
        },
        components: {
            "show-alert": showAlert
        },
        mounted: function(){
             // 初始化上传组件
            var _this = this;
            $('label').on('touchend',function() {
                _this.index = $(this).attr('data-index')
            })
            
            // 分别为不同按钮配置input [临时解决方案 by lpt]
            var plupload1 = new Plupload1();
            var plupload2 = new Plupload2();
            var plupload3 = new Plupload3();
            plupload1.init({
                browseButton: 'upload1',
                fileUploadEvent: function(up, file, info){
                    _this.images.businessLicence = _this.baseUrl + file;
                    _this.is_business_licence = true;
                    _this.is_business_licence_false = true;
                },
                fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
            })
            plupload2.init({
                browseButton: 'upload2',
                fileUploadEvent: function(up, file, info){
                    _this.images.cardIdFront  = _this.baseUrl + file;
                    _this.is_cardid_front = true;
                    _this.is_cardid_front_false = true;
                },
                fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
            })
            plupload3.init({
                browseButton: 'upload3',
                fileUploadEvent: function(up, file, info){
                    _this.images.cardIdNegative = _this.baseUrl + file;
                    _this.is_cardid_negative = true;
                    _this.is_cardid_negative_false = true;
                },
                fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
            })

            // 获取认证数据
            this.getAuthenDetailsInfo();
        },
        methods: {
            // 认证数据历史填写记录
            getAuthenDetailsInfo () {
                ajax.getAuthenDetailsInfo( (res) => {
                    if (res.status == 200) {
                        var obj = res.data;
                        this.enterpriseName = obj.company;
                        this.corporateName = obj.rel_name;
                        this.corporateCardId = obj.id_number;

                        this.images.cardIdFront = obj.id_number_pic_f || require('../../assets/img/id_card_front.png');
                        this.images.cardIdNegative = obj.id_number_pic_b || require('../../assets/img/id_card_negative.png');
                        this.images.businessLicence = obj.business_pic || require('../../assets/img/business_licence.png');    

                        if (obj.id_number_pic_f){
                            this.is_business_licence = true
                        
                        };
                        if (obj.id_number_pic_b){
                            this.is_cardid_front = true
                        
                        };   
                        if (obj.business_pic) {
                            this.is_cardid_negative = true
                        
                        };  
                    };
                })
            },
            /**
             * 图片上传初始化
             * @param  {string} self 图片上传绑定元素
             * @return 无
             */
            // 银行卡图片上传
            formatImgs : function(){
                this.imgsJson = JSON.stringify(this.imgs);
            },
            checkEnterpriseName: function(){
                console.log(111);
                if(this.enterpriseName==""){
                   this.is_enterprise_false = true; 
                }else{
                    this.is_enterprise_false = false;
                }
            },
            checkCorporateName: function(){
                var name = this.corporateName; 
                if ( !(/^[\u4e00-\u9fa5 ]{2,20}$/.test(name)) ) {
                     this.is_corporateName_false = true;
                }else{
                     this.is_corporateName_false = false;
                }
            },
            checkCorporateCardId: function(){
                var num = this.corporateCardId; 
                //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。 
                // if ( !(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) ) {
                // alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
                    this.is_corporateCardId_false = false;
                // }
            },
            goAuthenInfo: function(){
                var that = this;
                var info = {};
                info.key = 2;
                info.page = 1;
                info.company = this.enterpriseName;
                info.rel_name = this.corporateName;
                info.id_number = this.corporateCardId;
                info.business_pic = this.images.businessLicence;
                info.id_number_pic_f = this.images.cardIdFront;
                info.id_number_pic_b = this.images.cardIdNegative;
                // if((!that.is_enterprise_false&&(that.enterpriseName!=''))&&(!that.is_corporateName_false&&(that.corporateName!=''))&&
                // (!that.corporateCardId_false&&(that.corporateCardId!=''))&&that.is_business_licence&&that.is_cardid_front&&that.is_cardid_negative
                // ){
                    // console.log(info);
                if(that.is_enterprise_false||(that.enterpriseName=='')){
                    this.alert_msg = "您输入的企业名称有误,请重新输入";
                    this.is_alert = true;
                }else if(that.is_corporateName_false||(that.corporateName=='')){
                   this.alert_msg = "您输入的法人姓名有误,请重新输入";
                    this.is_alert = true;
                }else if(that.is_corporateCardId_false||(that.corporateCardId=='')){
                    this.alert_msg = "您输入的法人身份证号有误,请重新输入";
                    this.is_alert = true;
                }else if(!that.is_business_licence){
                    // alert(that.is_business_licence);
                    this.is_business_licence_false = true;
                    this.alert_msg = "您的营业执照尚未上传，请上传后提交";
                    this.is_alert = true;
                }else if(!that.is_cardid_front){
                    this.is_cardid_front_false = true
                    this.alert_msg = "您的身份证正面尚未上传，请上传后提交";
                    this.is_alert = true;
                }else if(!that.is_cardid_negative){
                    this.is_cardid_negative_false = true;
                    this.alert_msg = "您的身份证反面尚未上传，请上传后提交";
                    this.is_alert = true;
                }else{
                    // var infoJson = JSON.stringify(info);
                    // console.log(infoJson)
                    ajax.goAuthenInfo(info,(data) => {
                        // console.log(that.data);
                        if(data.status==200){
                            this.$router.push('/authenticationenterpriseinfo/personal/2/2');
                            $('.half').removeClass('router-link-active');
                            $('.half').eq(1).addClass('router-link-active');
                        }else{
                            this.alert_msg = data.msg;
                            this.is_alert = true;
                        }
                    })
                }
                // }else{
                //     this.alert_msg = "您上传的数据有误，请检查后再上传";
                //     this.is_alert = true;
                // }
            },
            closeBox: function(){
                this.is_alert = false;
            }
        }
    }
</script>
<style scoped>
   .personal{
	   font-size: 1.5rem;
	   width: 100%;
	   /*border-top: 1px solid #ccc;*/
   }    
   .banner_picture{
        width: 100%;
        height: auto;
    }
   .banner_title{
		width: 100%;
		padding: 1.6rem 1.5rem 1.1rem;
        color: #666;
   }
   .banner_title>span{
		font-size: 1.2rem;
        color: #999;
   }
    /* 输入框 */
	.banner_box{
		background-color: #fff;
        font-size: 1.4rem;
        width: 100%;
        color: #333;
        vertical-align: middle;
        padding: 0 1.5rem;
	}
    .banner_box>i{
        font-style: normal;
    }
    .banner_descri{
        display: inline-block;
        width: 8.5rem;
        height: 4.3rem;
        line-height: 4.3rem;
    }
    .banner_input{
        display: inline-block;
        width: 20rem;        
        height: 4.3rem;
        line-height: 4.3rem;
    }
    .banner_tip{
        display: inline-block;
        width: 23rem;        
        height: 4.3rem;
        line-height: 4.3rem;
        color: #999;
        font-size: 1.2rem;
        padding-left: 1rem;
    }
	/*  企业 信息验证 上传照片描述框 */
	.upload_box{
		background-color: #fff;
        font-size: 1.4rem;
        width: 100%;
        color: #333;
        vertical-align: middle;
        padding: 0 1.5rem;
	}
    .upload_box>i{
        font-style: normal;
    }
    .upload_descri{
        display: inline-block;
        width: 11.5rem;
        height: 4.3rem;
        line-height: 4.3rem;
    }
	
    /*.upload_input{
        display: inline-block;
        width: 17rem;        
        height: 4.3rem;
        line-height: 4.3rem;
    }*/
    .upload_tip{
        display: inline-block;
        width: 21rem;       
        height: 4.3rem;
        line-height: 4.3rem;
        color: #999;
        font-size: 1.2rem;
        /*padding-left: 1rem;*/
    }	
	/*  企业 信息验证 上传照片描述框 */
    .banner_button{
        display: block;
        width: 6rem;
        height: 2.4rem; 
        border: 1px solid #6699FF;
        border-radius: 1rem;
        margin-right: 1rem;
        margin-top: .95rem;
        text-align: center;
    }
    .banner_error{
        display: block;
        width: 1.55rem;
        height: 1.55rem;
        background-position: -28rem -0.9rem;
        line-height: 4.3rem;
        margin-top: 1.4rem;
    }
    .text_rt{
        text-align: right;
    }
    /*  上传照片部分*/
    .section_upload{
        width: 100%;
        background-color: #FFF;
        /*border-bottom: 1px solid #E5E5E5;*/
    }
    .section_content{
        margin: 0 1.5rem;
        margin-right: 1.5rem;
        background-color: #F6F6F6;
        height: auto;
        border: 1px solid #DDD;
    }
    .section_img_front{
        background: url(../../assets/img/id_card_front.png) center center no-repeat;
    }
    .section_img_negative{
        background: url(../../assets/img/id_card_negative.png) center center no-repeat;
    }
    .section_img_handheld{
        background: url(../../assets/img/handheld.png) center center no-repeat;
    }
    .section_img{
        width: 25rem;
        height: 15.7rem;
        margin: 1.6rem auto;
        /*background: url(../../assets/img/id_card_front.png) center center no-repeat;*/
        background-size: cover;
    }
    .section_button{
        text-align: center;
        margin: auto;
        margin-bottom: 1.5rem;
    }
    .upload_button{
        display: inline-block;
        width: 11rem;
        height: 3rem;
        line-height: 3rem;
        background-color: #6699FF;
        border-radius: .5rem;
        color: #FFF
    }
    .section_split{
        /*width: 100%;
        height: 1px;*/
        border-top: 1px solid #E5E5E5;
        margin-top: 1.5rem;
    }
    .section_footer{
        width: 100%;
        height: 13.5rem;
        text-align: center;
        background-color: #F6F6F6;
    }
    .line_graduate{
        display: inline-block;
        width: 7rem;
        height: 1px;
        vertical-align: middle;
    }
    .line_graduate_lf{
        background: linear-gradient(to right,#FFF,#D2D2D2);
    }
    .line_graduate_rt{
        background: linear-gradient(to left,#FFF,#D2D2D2);
    }
    .footer_title{
        font-size: 1.4rem;
        height: 2.8rem;
        line-height: 2.8rem;
        margin: 1rem auto .7rem;
        color: #666;
    }
    .footer_button{
        margin: 1.6rem auto 3rem;
    }
    .footer_next_button{
        display: inline-block;
        width: 80%;
        height: 4.5rem;
        line-height: 4.5rem;
        background-color: #158725;
        border-radius: .35rem;
        font-size: 1.6rem;
        color: #FFF;
    }
    .space{
        width: 100%;
        height: 6rem;
        background-color: #FFF;
    }
    
    /* 输入框 */





</style>