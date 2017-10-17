<template>
<div class="personal">
	<div class="banner_title">
		实名认证<span>(请上传真实的个人信息，认证通过后将无法修改)</span>
	</div>
    <div class="banner_box clr">
        <i class="banner_descri fl">姓名</i>
        <input type="text" placeholder="请输入真实姓名" class="fl banner_input" v-model="personal_name" @blur="checkName">
        <i class="spritesmap banner_error fr" v-if="is_name_false"></i>
        <!--<a href="javascript:;" class="banner_button fr">验证</a>-->
    </div>
    <div class="banner_box clr">
        <i class="banner_descri fl">身份证</i>
        <input type="text" placeholder="请输入身份证号" class="fl banner_input" v-model="personal_cardId" @blur="checkCardId">
        <i class="spritesmap banner_error fr" v-if="is_cardid_false"></i>
        <!--<a href="javascript:;" class="banner_button fr">验证</a>-->
    </div>
    <div class="banner_box clr">
        <i class="banner_descri fl">联系电话</i>
        <div class="fl banner_input" @click="goIdentify"> {{personal_phone||"请输入联系电话"}}</div>
        <i class="spritesmap banner_error fr" v-if="is_phone_false"></i>
        <a href="javascript:;" class="banner_button fr" @click="goIdentify" v-if="is_phone_ok">{{banner_text}}</a> 
    </div>
    <div class="banner_picture">
        <div class="banner_title clr">
		    <span class="fr">请填写有效电话，工作人员将会致电核实资料</span>
	    </div>
        <div class="banner_box clr">
            <i class="banner_descri fl">身份证正面照</i>
            <i class="fl banner_tip">请用手机横向拍摄以保证图片能正常显示</i>
            <i class="spritesmap banner_error fr" v-if="personal_card_front_false"></i>
        </div>
        <div class="section_upload">
            <div class="section_content">
                <div class="section_img section_img_front" data-index="0" :style="{backgroundImage:'url(' + images.cardIdFront + ')'}">

                </div>
                <div class="section_button">
                    <a href="javascript:;" class="upload_button" id="upload4">上传证件照</a>
                </div>
            </div>
            <div class="section_split">
            <!--  分割线-->
            </div>
        </div>
       
        <div class="banner_box clr">
            <i class="banner_descri fl">身份证反面照</i>
            <i class="fl banner_tip">请用手机横向拍摄以保证图片能正常显示</i>
            <i class="spritesmap banner_error fr" v-if="personal_card_negative_false"></i>
        </div>
        <div class="section_upload">
            <div class="section_content">
                <div class="section_img section_img_negative" data-index="1" :style="{backgroundImage:'url(' + images.cardIdNegative + ')'}">

                </div>
                <div class="section_button">
                    <a href="javascript:;" class="upload_button" id="upload5">上传证件照</a>
                </div>
            </div>
            <div class="section_split">
            <!--  分割线-->
            </div>
        </div>
        <div class="banner_box clr">
            <i class="banner_descri fl">手持身份证照</i>
            <i class="fl banner_tip">拍照时请对焦在证件上</i>
            <i class="spritesmap banner_error fr" v-if="personal_card_handheld_false"></i>
        </div>
        <div class="section_upload">
            <div class="section_content">
                <div class="section_img section_img_handheld" data-index="2" :style="{backgroundImage:'url(' + images.cardIdHandheld + ')'}">

                </div>
                <div class="section_button">
                    <a href="javascript:;" class="upload_button" id="upload6">上传证件照</a>
                </div>
            </div>
            <div class="section_split">
            <!--  分割线-->
            </div>
        </div>
    </div>
    <div class="section_footer">
        <div class="footer_title">
            <i class="line_graduate line_graduate_lf"></i>
            <a href="javascript:;" class="footer_title">请确认以上信息准确无误</a>
            <i class="line_graduate line_graduate_rt"></i>
        </div>
        <div class="footer_button">
            <button class="footer_next_button" @click="goNextStep">下一步</button>
        </div>
    </div>
     <!-- 上传loading -->
    <div id="upload-box">
        <div class="upload-msg">正在上传</div>
        <div id="upload-progress">0%</div>
        <div class="upload-img">
            <img src="../../assets/img/loading_data.gif" alt="">
        </div>
    </div>
     <!--v-show="identifyBox"-->
    
    <!-- /上传loading -->
    <div class="space">

    </div>
    <show-alert v-if="is_alert" @closeBox="closeAlert" :msg='alert_msg'></show-alert>
    <identify-code v-if="is_identify_code" @closeBox="closeIdentify" :msg="identify_msg" @goAlert="goAlert"></identify-code>

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
    var Plupload4 = require("pluploadMore3");
    var identifyCode = require("@/components/component/identify-code")
    var showAlert = require("@/components/component/showAlert")
    export default{
        data: function(){
            return {
                images: {                                           // 上传图片
                    cardIdFront: require('../../assets/img/id_card_front.png'),
                    cardIdNegative: require('../../assets/img/id_card_negative.png'),
                    cardIdHandheld: require('../../assets/img/handheld.png'),
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
                personalName: '',       //个人信息
                is_alert: false,
                alert_msg: '',
                is_identify_code: false,
                identify_msg: {},
                personal_name: '',         //个人姓名
                personal_cardId: '',       //个人身份证号
                personal_phone: '',        //个人电话
                is_name_false: false,
                is_cardid_false: false,
                is_phone_false: false,
                banner_text: '未验证',
                is_phone_ok: false,
                personal_card_front: false,        //身份证正面
                personal_card_negative: false,     //身份证反面
                personal_card_handheld: false,     //手持身份证照
                personal_card_front_false: false,    
                personal_card_negative_false: false,
                personal_card_handheld_false: false,
            }
        },
        components: {
            "identify-code": identifyCode,
            "show-alert"   : showAlert
        },
        mounted: function(){
            this.getAuthenDetailsInfo();

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
                browseButton: 'upload4',
                fileUploadEvent: function(up, file, info){
                    console.log(file);
                    _this.images.cardIdFront = _this.baseUrl + file;
                    _this.personal_card_front = true;
                },
                fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
            })
            plupload2.init({
                browseButton: 'upload5',
                fileUploadEvent: function(up, file, info){
                    _this.images.cardIdNegative  = _this.baseUrl + file;
                    _this.personal_card_negative = true;
                },
                fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
            })
            plupload3.init({
                browseButton: 'upload6',
                fileUploadEvent: function(up, file, info){
                    _this.images.cardIdHandheld = _this.baseUrl + file;
                    _this.personal_card_handheld = true;
                },
                fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
            })
        },
        methods: {
            // 获取认证历史填写数据
            getAuthenDetailsInfo: function(){
                ajax.getAuthenDetailsInfo((data) => {
                    if(data.status==200){
                        var obj = data.data;
                        this.personal_name = obj.rel_name_meb;
                        this.personal_cardId = obj.id_number_meb;
                        this.personal_phone = obj.mobile_meb;
                        this.images.cardIdFront = obj.id_number_pic_f_meb || require('../../assets/img/id_card_front.png');
                        this.images.cardIdNegative = obj.id_number_pic_b_meb || require('../../assets/img/id_card_negative.png');
                        this.images.cardIdHandheld = obj.id_number_pic_meb || require('../../assets/img/handheld.png');
                        if(obj.rel_name_meb){
                            // this.is_phone_ok = true;
                            this.personal_card_front = true;
                            this.personal_card_negative = true;
                            this.personal_card_handheld = true;
                            this.banner_text = "已验证"
                            this.is_phone_ok = true;
                        }
                        
                        // console.log(that.$route.params.id);
                    }else{
                        console.log("页面获取失败")
                    }
                })
            },

            
            formatImgs : function(){
                this.imgsJson = JSON.stringify(this.imgs);
            },
            closeAlert: function(){
                this.is_alert = false;
            },
            closeIdentify: function(params){
                this.is_identify_code = false;
                if(params){
                    this.is_phone_ok = true;
                    this.banner_text = "已验证"
                    this.personal_phone = params;
                }
                
            },
            goAlert: function(data){
                this.alert_msg = data;
                this.is_alert = true;
            },
            goIdentify: function(){
                // this.checkPhoneNumber();
                // if(this.is_phone_ok){
                //     this.alert_msg = "您的手机号已验证不需要重新验证";
                //     this.is_alert = true;   
                // }else if(this.is_phone_false){
                //     this.is_alert = true; 
                // }else{
                //     this.identify_msg = this.personal_phone;
                    if(this.personal_phone){
                        this.identify_msg.mobileNumber = this.personal_phone;
                    }
                    this.identify_msg.sendType = 3;
                    this.identify_msg.verifyType = 2;
                    this.is_identify_code = true;
                // }
                
            },
            checkName: function(){
                var name = this.personal_name; 
                if ( !(/^[\u4e00-\u9fa5]{2,20}$/.test(name)) ) {
                     this.is_name_false = true;
                }else{
                     this.is_name_false = false;
                }
            },
            checkCardId: function(){
                   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
                if(!(reg.test(this.personal_cardId))){  
                   this.is_cardid_false = true;
                }else{
                    this.is_cardid_false = false;
                }  
            },
            checkPhoneNumber: function(){
                if(this.personal_phone==''){
                    this.alert_msg = "您填写的手机号为空";
                    this.is_alert = true;
                    this.is_phone_false = true;
                }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.personal_phone))){
                    this.alert_msg = "您的手机号格式有问题，请重新输入";
                    this.is_alert = true;
                    this.is_phone_false = true;
                }else{
                    // this.is_phone_ok = true;
                    this.is_phone_false = false;
                }
            },
            goNextStep: function(){
                var that = this;
                this.checkPhoneNumber();
                if(this.personal_name==''||this.is_name_false){
                    this.alert_msg = "您输入的个人姓名为空或者有误，请重新输入";
                    this.is_alert = true;   
                }else if(this.personal_cardId==''||this.is_cardid_false){
                    this.alert_msg = "您输入的身份证号为空或者有误，请重新输入";
                    this.is_alert = true;  
                }else if(!this.is_phone_ok){
                    this.alert_msg = "您的手机后尚未验证成功，请验证";
                    this.is_alert = true; 
                }else if(!this.personal_card_front){
                    this.personal_card_front_false = true;
                    this.alert_msg = "您的身份证正面尚未上传，请上传";
                    this.is_alert = true; 
                }else if(!this.personal_card_negative){
                    this.personal_card_negative_false = true;
                    this.alert_msg = "您的身份证反面尚未上传,请上传";
                    this.is_alert = true; 
                }else if(!this.personal_card_handheld){
                    this.personal_card_handheld_false = true;
                    this.alert_msg = "您的手持身份证照尚未上传，请上传";
                    this.is_alert = true; 
                }else{
                    var dataInfo={};
                    if(this.$route.params.id==1){
                        dataInfo.key=1;
                    }else if(this.$route.params.id==2){
                        dataInfo.key=2;
                        dataInfo.page=2;
                    }
                    dataInfo.rel_name_meb = that.personal_name;
                    dataInfo.id_number_meb = that.personal_cardId;
                    dataInfo.mobile_meb = that.personal_phone;
                    dataInfo.id_number_pic_f_meb = that.images.cardIdFront;
                    dataInfo.id_number_pic_b_meb = that.images.cardIdNegative;
                    dataInfo.id_number_pic_meb = that.images.cardIdHandheld;
                    console.log( dataInfo )
                    
                    ajax.goAuthenInfo(dataInfo,function(data){
                        if(data.status==200){
                            if(that.$route.params.id==1){
                                that.$router.push("/authenticationinfo/shop/1/3");
                                $('.half').removeClass('router-link-active');
                                $('.half').eq(1).addClass('router-link-active');
                            }else if(that.$route.params.id==2){
                                that.$router.push("/authenticationenterpriseinfo/shop/2/3");
                                $('.half').removeClass('router-link-active');
                                $('.half').eq(2).addClass('router-link-active');
                            }
                        }else{
                             this.alert_msg = data.msg;
                             this.is_alert = true; 
                        }
                    })
                    
                }
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
        width: 17rem;        
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
    .banner_button{
        display: block;
        width: 6rem;
        height: 4.3rem; 
        /*border: 1px solid #6699FF;*/
        /*border-radius: 1rem;*/
        line-height: 4.3rem;
        font-size: 1.2rem;
        color: #999;
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

/* 正在上传*/
/* 正在上传 */
#upload-box {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 19;
    -webkit-transform: translate3D(-50%,-50%,0);
    transform: translate3D(-50%,-50%,0);
    width: 24rem;
    height: 14rem;
    background-color: rgba(0,0,0,.5);
    border-radius: .5rem;
    font-size: 1.6rem;
    text-align: center;
    display: none;
}
#upload-box div {
    color: #f0f0f0;
}
.upload-msg {
    margin-top: 2rem;
}
#upload-progress {
    margin: 1rem 0;
}
.upload-img {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    margin-top: 0rem;
}
.upload-img img {
    width: 100%;
    height: 100%;
}
/* / 正在上传*/





/*   手机验证 */

/*    手机验证*/


</style>