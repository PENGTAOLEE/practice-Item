<template>
<div class="personal">
	<!--<div class="banner_title">
		实名认证<span>(请上传真实的个人信息，认证通过后将无法修改)</span>
	</div>-->
    <div class="banner_container">
        <div class="banner_authen_error" v-if='status==3'>
            审核失败，请修改后重新提交
        </div>
        <div class="banner_box clr">
            <i class="banner_descri fl">姓名</i>
            <input type="text" placeholder="请输入真实姓名" class="fl banner_input" v-model="student_name" @blur="checkName" :disabled='status==1||status==2'>
            <i class="spritesmap banner_error fr" v-if="student_name_false"></i>
            <!--<a href="javascript:;" class="banner_button fr">验证</a>-->
        </div>
        <div class="banner_box clr">
            <i class="banner_descri fl">院校</i>
            <!--<input type="text" placeholder="请选择院校" class="fl banner_input" v-model="academy_id" @blur="checkAcademy">-->
            <!--<select v-model="student_academy"  class="fl banner_input" @change='checkAcademy'>
                <option value="" selected disabled class='banner_option'>请选择院校</option>
                <option v-for='(list,index) in academyData' :key='list.id' :value='list.id'  class='banner_option'>{{list.name}}</option>
            </select>-->
            <div  class="fl banner_input banner_input_academy re">
                <a href="javascript:;" class="select_head clr" @click='showAcademyList'><span class='fl' :class='{success_color: student_academy_ok}'>{{student_academy||"请选择院校"}}</span> 
                    <i class="spritesmap banner_error fr" v-if="student_academy_false"></i> 
                    <i class='arrow_down fr'></i>
                </a>
                <!--<ul class="banner_select" v-if='is_academy_list'>
                    <li class="banner_option" v-for='(list,index) in academyData' :key='list.id' :value='list.id' @click='gainData(list.id,list.name)'>{{list.name}}</li>
                </ul>-->
               
            </div>
            <!--<i class="spritesmap banner_error fr" v-if="student_academy_false"></i>-->
            <!--<a href="javascript:;" class="banner_button fr">验证</a>-->
        </div>
        <div class="banner_box clr" v-show='is_other_academy'>
            <!--<i class="banner_descri fl">院校</i>-->
            <input type="text" placeholder="请输入院校名称" class="fl banner_input banner_input_other" v-model="other_academy" @blur='checkAcademy' :disabled='status==1||status==2'>
            <i class="spritesmap banner_error fr" v-if="other_academy_false"></i>
            <!--<a href="javascript:;" class="banner_button fr">验证</a>-->
        </div>
        <div class="banner_box clr">
            <i class="banner_descri fl">年级</i>
            <input type="text" placeholder="请输入年级，如：2015级" class="fl banner_input" :disabled='status==1||status==2' @blur='checkGrade' v-model='student_grade'>
            <i class="spritesmap banner_error fr" v-show="student_grade_false"></i>
            <!--<a href="javascript:;" class="banner_button fr">验证</a>-->
        </div>
        <div class="banner_box clr">
            <i class="banner_descri fl">系别</i>
            <input type="text" placeholder="请输入系别" class="fl banner_input" v-model="student_department" @blur="checkDepartment" :disabled='status==1||status==2'>    
            <i class="spritesmap banner_error fr" v-if="student_department_false"></i>
            <!--<a href="javascript:;" class="banner_button fr">验证</a>-->
        </div>
        <div class="banner_box clr">
            <i class="banner_descri fl">班级</i>
            <input type="text" placeholder="请输入班级" class="fl banner_input" v-model="student_class" @blur="checkClass" :disabled='status==1||status==2'>
            <i class="spritesmap banner_error fr" v-if="student_class_false"></i>
            <!--<a href="javascript:;" class="banner_button fr">验证</a>-->
        </div>
        <div class="banner_box clr">
            <i class="banner_descri fl">联系电话</i>
            <div class="fl banner_input" @click="goIdentify" :class='{banner_input_mobile_placeholder: !student_mobile_ok,banner_input_mobile: student_mobile_ok}'> {{student_mobile||"请输入联系电话"}}</div>
            <i class="spritesmap banner_error fr" v-if="student_mobile_false"></i>
            <a href="javascript:;" class="banner_button fr" @click="goIdentify" v-if="student_mobile_ok">{{banner_text}}</a> 
        </div>
    </div>
    <div class="banner_picture">
        <div class="banner_title clr">
		    <span class="fr">请填写有效电话，工作人员将会致电核实资料</span>
	    </div>
        <div class="banner_container">
            <div class="banner_box banner_box_img clr">
                <div class="banner_box_left fl">
                    <i class="banner_descri_img">手持学生证照</i>
                    <i class=" banner_tip_img">(已毕业的学生请上传毕业证书，拍照时请对焦在证件上)</i>
                </div>
                
                <i class="spritesmap banner_error fr" v-if="student_handheld_false"></i>
                <!--<i class="spritesmap banner_error banner_error_img fr" ></i>-->
            </div>
        </div>
        <div class="section_upload">
            <div class="section_content">
                <!-- <div class="section_img section_img_handheld" data-index="0" :style="{backgroundImage:'url(' +baseUrl+ student_handheld + ')'}" v-if='student_handheld_ok'> -->
                <div class="section_img" data-index="0" :style="{backgroundImage:'url(' +baseUrl+ student_handheld + ')'}" v-if='student_handheld'>
                </div>
                <div class="section_img section_img_handheld" v-else-if='!student_handheld'></div>
                <!-- <div class="section_button" v-if='status==0||status==3' :class="{is_section_button: !student_handheld_ok}"> -->
                <div class="section_button" v-if='status==0||status==3'>
                    <a href="javascript:;" class="upload_button" id="upload1">上传证件照</a>
                </div>
            </div>
            <div class="section_split">
            <!--  分割线-->
            </div>
        </div>
    </div>
    <div class="section_footer">
        <!-- <div class="footer_title" v-if='status==0||status==3'>
            <i class="line_graduate line_graduate_lf"></i>
            <a href="javascript:;" class="footer_title">提交审核即视为同意遵守大赛规则</a>
            <i class="line_graduate line_graduate_rt"></i>
        </div> -->
        <div class="footer_button">
            <a href='javascript:;' class="footer_next_button" @click="goNextStep" v-if='status==0||status==3'>提交审核</a>
            <a href='javascript:;' class="footer_next_button"  v-else-if='status==1'>审核中</a>
            <a href='javascript:;' class="footer_next_button"  v-else-if='status==2'>审核成功</a>
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
    <select-item @closeBox='closeSelect' @goAcademy='getSelected' v-if='is_selected'></select-item>
</div>
 

</template>
<script>
    // var config = window.config;
    var ajax  = require("ajax");
    var utils = require("utils");
    var config = window.config;
    var Plupload1 = require("pluploadMore");
    var identifyCode = require("@/components/component/identify-code");
    var showAlert = require("@/components/component/showAlert");
     var selectItem = require("@/components/component/select-item");
    export default {
        data: function(){
            return {
                images: {                                           // 上传图片
                    cardIdHandheld: require('../../assets/img/handheld.png'),
                },
                index: 0,                                           // 当前触发上传组件下标
                uploadArr: [                                        // 上传图片触发元素
                    "upload1",
                ],
                imgs: [],                                           // 上传图片数组  未使用                                       
                imgsJson : '',                                      // 存库图片格式  未使用
                baseUrl : window.config.img_url,
                is_alert: false,
                alert_msg: '',
                is_identify_code: false,
                identify_msg: {},
                // 本页面
                academyData: '',      ///学院数据
                student_name: '',     //学生姓名
                student_academy:   '',     //学校名称
                other_academy: '',         // 其他学校时的学校名称
                student_grade: '',         //学生年纪
                student_department: '',    //学生系别
                student_class: '',         //学生班级
                student_mobile: '',        //学生电话
                student_handheld: '',      //学生手持照片
                is_academy_list: false,
                is_other_academy: false,
                banner_text: '未验证',
                parent_id: '',
                student_academy_id: '',
                is_academy_last: false,
                status: '',
                is_selected: false,

                
                //各个数据是否验证通过的变量
                student_name_ok: false,
                student_academy_ok:   false,
                other_academy_ok: false,
                student_grade_ok: false,
                student_department_ok: false,
                student_class_ok:  false,
                student_mobile_ok: false,
                student_handheld_ok: false,
                //各个数据是否验证通过的变量


                //图标是否显示的变量
                student_name_false: false,
                student_academy_false:   false,
                other_academy_false: false,
                student_grade_false: false,
                student_department_false: false,
                student_class_false: false,
                student_mobile_false: false,
                student_handheld_false: false,
                //图标是否显示的变量
                // 本页面
            }
        },
        components: {
            "identify-code": identifyCode,
            "show-alert"   : showAlert,
            'select-item'  : selectItem,
        },
        created: function () {
            // this.getAcadeClass();
            this.getAuthenStudent();
        },
        // computed: {
        //     is_academy_last: function(){
        //         if(this.student_academy_id==this.academyData[this.academyData.length-1].id){
        //             return true;
        //         }else{
        //             return false;
        //         }
        //     }
        // },
        mounted: function(){
            // this.getAuthenStudent();
            // this.getAcadeClass();
            document.title="学生";
            // 初始化上传组件
            if(this.status==0||this.status==3){
                var _this = this;
                $('label').on('touchend',function() {
                    _this.index = $(this).attr('data-index')
                })
    
                // 分别为不同按钮配置input [临时解决方案 by lpt]
                 var plupload1 = new Plupload1();
    
                 plupload1.init({
                    browseButton: 'upload1',
                    fileUploadEvent: function(up, file, info){
                    // _this.images.cardIdHandheld = _this.baseUrl + file;
                    _this.student_handheld_ok = true;
                    _this.student_handheld_false = false;
                    _this.student_handheld = file;
                    },
                    fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
                });
            }
           
        },
        methods: {
            // 获取认证历史填写数据
            getAuthenStudent: function(){
                ajax.getAuthenStudent((data) => {
                    if(data.status==200){
                        if(data.data){
                            this.student_name = data.data.rel_name;
                            this.student_academy_id   = data.data.type;
                            this.student_class = data.data.class;
                            this.student_grade = data.data.grade;
                            this.student_mobile = data.data.mobile;
                            this.student_department  = data.data.department;
                            this.student_handheld  = data.data.student_id_card_pic;
                            this.other_academy = data.data.author_type;
                            this.student_name_ok = true;
                            this.student_academy_ok = true;
                            this.other_academy_ok = true;
                            this.student_grade_ok = true;
                            this.student_class_ok = true;
                            this.student_mobile_ok = true;
                            this.student_department_ok = true;
                            this.student_handheld_ok = true;
                            this.status = data.data.status;
                            this.banner_text = '已验证'
                            this.student_academy= data.data.category_name;
                            this.parent_id = data.data.parent_id;
                            console.log("院校名称"+this.student_academy);
                        // console.log(that.$route.params.id);
                            if(this.other_academy){
                                this.is_other_academy = true;
                                this.is_academy_last = true;
                            }
                        }
                    }else if(data.status==201){
                        this.status == 0;
                    }
                });
            },
            // getAcadeClass: function(){
            //     console.log(111);
            //     var that = this;
            //     ajax.getType(0,function(res){
            //         if(res.status==200){
            //             let items = res.data;
            //             for( let item of items){
            //                 if(item.name=='校园新锐'){
            //                     that.parent_id = item.id;
            //                     ajax.getType(item.id,function(data){
            //                         if(data.status==200){
            //                             that.academyData = data.data;
            //                         }
            //                     }); 
            //                     return                               
            //                 }
            //             }
            //         }
            //     });
            // },
            formatImgs : function(){
                this.imgsJson = JSON.stringify(this.imgs);
            },
            closeAlert: function(){
                this.is_alert = false;
            },
            closeIdentify: function(params){
                this.is_identify_code = false;
                if(params){
                    this.student_mobile_ok = true;
                    this.banner_text = "已验证"
                    this.student_mobile = params;
                }
                
            },
            goAlert: function(data){
                this.alert_msg = data;
                this.is_alert = true;
            },
            goIdentify: function(){
                if(this.status==0||this.status==3){
                     if(this.student_mobile){
                        this.identify_msg.mobileNumber = this.student_mobile;
                    }
                    this.identify_msg.sendType = 3;
                    this.identify_msg.verifyType = 2;
                    this.is_identify_code = true;
                }
                   
                // }
                
            },
            checkName: function(){
                var name = this.student_name; 
                if ( !(/^[\u4e00-\u9fa5]{2,20}$/.test(name)) ) {
                     this.student_name_false = true;
                }else{
                     this.student_name_ok = true;
                     this.student_name_false = false;
                }
            },
            showAcademyList: function(){
                // if(this.status==0||this.status==3){
                //     this.is_academy_list = true;
                // }
                if(this.status==0||this.status==3){
                    this.is_selected = true;
                }
            },
            closeSelect: function(){
                this.is_selected = false;
            },
            getSelected: function(parent_id,id,name,is_other){
                this.is_selected = false;
                this.parent_id  = parent_id;
                this.student_academy_id  = id;
                this.student_academy = name;
                this.is_other_academy= is_other;
                this.student_academy_ok = true;
                if(this.is_other_academy){
                    this.is_academy_last = true;
                }else{
                    this.is_academy_last = false;
                }
                console.log(parent_id);
                console.log(id);
                console.log(name);
                console.log(is_other);
            },
            // gainData: function(id,name){
            //     this.student_academy_id = id;
            //     this.student_academy = name;
            //     this.is_academy_list = false;
            //     this.student_academy_ok = true;
            //     if(id == this.academyData[this.academyData.length-1].id){
            //         this.is_other_academy = true;
            //         // this.is_academy_last = true;
            //     }else{
            //         this.is_other_academy = false;
            //         // this.is_academy_last = false;
            //     }
            // },
            checkAcademy: function(){
                let other_academy = this.other_academy; 
                if ( !(/^[\u4e00-\u9fa5]{2,20}$/.test(other_academy)) ) {
                     this.other_academy_false = true;
                }else{
                     this.other_academy_ok = true;
                     this.other_academy_false = false;
                }
            },
            checkGrade: function(){
                // console.log(1111);
                let grade = this.student_grade;
                if(grade){
                    this.student_grade_ok = true;
                    this.student_grade_false = false;
                }else{
                    this.student_grade_ok = false;
                    this.student_grade_false = true;
                }
                // console.log(this.student_grade_ok);
                // console.log(this.student_grade_false);
            },
            checkDepartment: function(){
                let department = this.student_department;
                if(department){
                    this.student_department_ok = true;
                    this.student_department_false = false;
                }else{
                    this.student_department_ok = false;
                    this.student_department_false = true;
                }
            },
            checkClass: function(){
                let student_class = this.student_class;
                if(student_class){
                    this.student_class_ok = true;
                    this.student_class_false = false;
                }else{
                    this.student_class_ok = false;
                    this.student_class_false = true;
                }
                // console.log(student_class);
            },
            goNextStep: function(){
                var that = this;
                if(!this.student_name_ok){
                    this.alert_msg = "您输入的个人姓名为空或者有误，请重新输入";
                    this.is_alert = true; 
                    this.student_name_false = true;  
                }else if(!this.is_academy_last&&!this.student_academy_ok){
                    this.alert_msg = "您输入的学院信息有误，请重新输入";
                    this.is_alert = true; 
                    this.student_academy_false = true; 
                }else if(this.is_academy_last&&!this.other_academy_ok){
                    this.alert_msg = "您输入的学院信息有误，请重新输入";
                    this.is_alert = true; 
                    this.other_academy_false = true;
                }else if(!this.student_grade_ok){
                    this.alert_msg = "您的年级信息输入有误，请重新输入";
                    this.is_alert = true; 
                    this.student_grade_false = true;
                }else if(!this.student_department_ok){
                    this.alert_msg = "您的系别输入有误，请重新输入";
                    this.is_alert = true; 
                    this.student_department_false = true;
                }else if(!this.student_class_ok){
                    this.alert_msg = "您的班级输入有误，请重新输入";
                    this.is_alert = true; 
                    this.student_class_false = true;
                }else if(!this.student_mobile_ok){
                    this.alert_msg = "您的联系电话尚未验证，请验证";
                    this.is_alert = true; 
                    this.student_mobile_false = true;
                }else if(!this.student_handheld_ok){
                    this.alert_msg = "您的手持身份证照尚未上传，请上传";
                    this.is_alert = true; 
                    this.student_handheld_ok = true;
                }else{
                     let student_name = this.student_name;
                     if(this.is_academy_last){
                         var academy_id = this.student_academy_id;
                         var student_academy = this.student_academy;
                         var other_academy = this.other_academy;
                     }else{
                         var academy_id = this.student_academy_id;
                         var student_academy = this.student_academy;
                         var other_academy = '';
                     }
                     var that = this;
                    ajax.goAuthenStudent(that.student_name,that.parent_id,that.student_academy,that.other_academy,that.student_grade,that.student_department,that.student_class,that.student_mobile,that.student_handheld,function(data){
                       if(data.status==200){
                            that.status=1;
                       }else{
                           that.alert_msg = data.msg;
                           that.is_alert = true;
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
		padding: 1rem 1.5rem 1.6rem;
        color: #666;
   }
   .banner_title>span{
		font-size: 1.2rem;
        color: #999;
   }
    .banner_container{
        width: 100%;
        background-color: #FFF;
    }
    .banner_authen_error{
        width: 100%;
        height: 3.3rem;
        line-height: 3.3rem;
        font-size: 1.2rem;
        color: #FFF;
        background-color: #E18787;
        text-align: center;
    }
    /* 输入框 */
	.banner_box{
		background-color: #fff;
        font-size: 1.4rem;
        /*width: 100%;*/
        color: #333;
        vertical-align: middle;
        margin-left: 1.5rem;
        padding-right: 1.5rem;
        border-bottom: 1px solid #E5E5E5;
	}
    .banner_box_img{
        padding-top: 1.75rem;
        padding-bottom: 1rem;
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
        color: #333;
    }
    .banner_input_academy{
        width: 25.5rem;
        margin-right: 0;
    }
    .banner_input_other{
        margin-left: 8.5rem;
    }
    input:disabled,input[disabled]{
        background-color: #FFF;
        color: #333;
        opacity: 1;
        -webkit-text-fill-color: rgba(0,0,0,1);
    }
    .banner_input_mobile{
        color: #333;
    }
    .banner_input_mobile_placeholder{
        color: #999;
    }
    .select_head{
        width: 100%;
        font-size: 1.4rem;
        color: #999;
        line-height: 4.3rem;
    }
    .arrow_down{
        display: block;
        /*width: 1.3rem;
        height: .75rem;*/
        width: .75rem;
        height: 1.3rem;
        float: right;
        background: url(../../assets/img/shotsprites.png);
        background-size: 30rem 30rem;
        /*background-position:  -6.4rem -22rem;*/
        background-position: -22.8rem -.05rem;
        margin-top: 1.5rem;
    }
    .banner_select{
        position: absolute;
        background-color: #FFF;
        width: 100%;
        border: 1px solid #ccc;
        /*border-top: 1px solid transparent;*/
        padding: 0 1rem;
    }
    .banner_option{
        /*position: absolute;*/
        /*background-color: #FFF;*/
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.4rem;
        color: #333;
        text-align: left;
        border-bottom: 1px solid #EEE;
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
        width: 7rem;
        /*height: 4.3rem; */
        /*border: 1px solid #6699FF;*/
        border-radius: 1rem;
        /*line-height: 4.3rem;*/
        font-size: 1.2rem;
        color: #999;
        /*font-weight: bold;*/
        text-align: center;
        padding: 0.6rem 1.4rem;
        margin-right: 1.5rem;
        margin-top: .6rem;

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
        /*height: auto;*/
        border: 1px solid #DDD;
        height: 23.4rem;
    }
    
    .section_img{
        width: 25rem;
        height: 15.7rem;
        margin: 1.6rem auto;
        /*background: url(../../assets/img/id_card_front.png) center center no-repeat;*/
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .section_img_handheld{
        background-image: url(../../assets/img/stuhandheld.png); 
         background-size: contain; 
    }
    .section_button{
        text-align: center;
        margin: auto;
        margin-bottom: 1.5rem;
    }
    .is_section_button{
        text-align: center;
        margin: auto;
        margin-top: 10.2rem;
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
        background-color: #15AF25;
        border-radius: .35rem;
        font-size: 1.6rem;
        color: #FFF;
    }
    .space{
        width: 100%;
        height: 6rem;
        background-color: #FFF;
    }
    /*  手持身份证样式*/
    .banner_box_left{
        width: 90%;
        height: auto;
    }
    .banner_descri_img{
        /*display: inline-block;
        width: 8.5rem;*/
        /*height: 4.3rem;
        line-height: 4.3rem;*/
        font-style: normal;
    }
    .banner_tip_img{
        /*display: inline-block;
        width: 23rem;        */
        /*height: 4.3rem;
        line-height: 4.3rem;*/
        color: #999;
        font-size: 1.2rem;
        padding-left: 1rem;
        font-style: normal;
    }
    .banner_error.banner_error_img{
        margin-right: 1.5rem;
        line-height: 1.55rem;
        margin-top: .3rem;
    }

    /*   手持身份证样式设置*/
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
.success_color {
    color: #333;
}




/*   手机验证 */

/*    手机验证*/


</style>