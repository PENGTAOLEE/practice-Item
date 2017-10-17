<template>
<div class="pages">
    <div class="section">
        <div class="theme ">
            <div class="theme_box clr">
                <div class="theme_title fl">
                    认证信息
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    实名认证
                </div>
                <div class="bar_descri text_red fl" v-if="data.type==2&&data.is_apply_now==3">
                    通过企业认证
                </div>
                <div class="bar_descri text_red fl" v-else-if="data.type==1&&data.is_apply_now==3">
                    通过个人认证
                </div>
                <div class="bar_descri text_red fl" v-else-if="data.is_apply_now==2">
                    审核中
                </div>
                <div class="bar_descri text_red fl" v-else-if="data.is_apply_now==4">
                    认证失败
                </div>
                <div class="bar_descri text_red fl" v-else-if="data.is_apply_now==5">
                    认证过期
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    认证有效期
                </div>
                <div class="bar_descri fl">
                    {{data.end_time}}
                </div>
            </div>
        </div>
    </div>
    <div class="section" v-if="data.type==2">
        <div class="theme ">
            <div class="theme_box clr">
                <div class="theme_title fl">
                    企业信息
                </div>
            </div>

        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    企业名称
                </div>
                <div class="bar_descri fl">
                    {{data.company}}
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    法人姓名
                </div>
                <div class="bar_descri fl">
                    {{data.rel_name}}
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    身份证号
                </div>
                <div class="bar_descri fl">
                    {{data.id_number}}
                </div>
            </div>
        </div>
        <div class="img_box">
            <div class="bar">
                <div class="bar_box clr">
                    <div class="img_title fl">
                        营业执照副本照片、法人身份证照认证
                    </div>
                    <span class="shotsprites arrow_down fr">
                    </span>
                </div>
            </div>
            <div class="bar">
                <div class="img_inner">
                    <img :src="data.business_pic" alt="" class="img_business_licence">
                </div>
                <div class="split">

                </div>
                <div class="img_inner">
                    <img :src="data.id_number_pic_f" lt="" class="img_cardid">
                </div>
                <div class="split">

                </div>
                <div class="img_inner">
                    <img :src="data.id_number_pic_b" alt="" class="img_cardid">
                </div>
                <div class="space_small">

                </div>
            </div>
        </div>
    </div>
    <div class="section">
        <div class="theme ">
            <div class="theme_box clr">
                <div class="theme_title fl">
                    个人信息
                </div>
            </div>

        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    姓名
                </div>
                <div class="bar_descri fl">
                    {{data.rel_name_meb}}
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    联系电话
                </div>
                <div class="bar_descri fl">
                    {{data.mobile_meb}}
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    身份证号
                </div>
                <div class="bar_descri fl">
                    {{data.id_number_meb}}
                </div>
            </div>
        </div>
        <div class="img_box">
            <div class="bar">
                <div class="bar_box clr">
                    <div class="img_title fl">
                        身份证照认证
                    </div>
                    <span class="shotsprites arrow_down fr">
                    </span>
                </div>
            </div>
            <div class="bar">
                <div class="img_inner">
                    <img :src="data.id_number_pic_f_meb" lt="" class="img_cardid">
                </div>
                <div class="split">

                </div>
                <div class="img_inner">
                    <img :src="data.id_number_pic_b_meb" alt="" class="img_cardid">
                </div>
                <div class="split">

                </div>
                <div class="img_inner">
                    <img :src="data.id_number_pic_meb" alt="" class="img_cardid">
                </div>
                <div class="space_small">

                </div>
            </div>
        </div>
    </div>
    <div class="section">
        <div class="theme ">
            <div class="theme_box clr">
                <div class="theme_title fl">
                    店铺信息
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    店铺名称
                </div>
                <div class="bar_descri fl">
                    {{data.title}}
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box_shopintroduce clr">
                <div class="bar_title fl">
                    店铺介绍
                </div>
                <div class="bar_descri_shopintroduce fl">
                    {{data.desc}}
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box_shoplogo clr">
                <div class="bar_title_shoplogo fl ">
                    店铺LOGO
                </div>
                <div class="bar_descri_shoplogo fr">
                    <img :src="data.logo" alt="" class="bar_logo">
                </div>
            </div>
        </div>
    </div>
    <div class="section_footer">
        <router-link to="/reauthenticationindex" class="submit_button" >重新认证</router-link>
        <!--<router-link to="/authenticationenterpriseinfo/enterprise" class="submit_button" v-if="data.type==2">重新认证</router-link>-->
    </div>
    <div class="space">

    </div>
    <show-alert v-if="is_alert" :msg="alert_msg"></show-alert>
</div>
</template>
<script>
    var ajax = require('ajax');
    var showAlert = require('@/components/component/showAlert');
    var config = window.config;
    module.exports = {
        data: function(){
            return {
               data: '',
               is_alert: false,
               alert_msg: '',
               base_url: window.config.img_url
            }
        },
        components: {
            "show-alert": showAlert
        },
        created: function(){
            this.getAuthenDetailsInfo();
            document.title = "认证信息";
        },
        methods: {
            getAuthenDetailsInfo: function(){
                var that = this;
                ajax.getAuthenDetailsInfo(function(data){
                    if(data.status==200){
                        that.data = data.data;
                    }else{
                        that.alert_msg = data.msg;
                        that.is_alert = true;
                    }
                })
            }
        }
    }

</script>
<style scoped>
.theme{
    margin-top: 1rem;
    width: 100%;
    height: 4.45rem;
    border-bottom: 1px solid #EAEAEA;
    background-color: #FFF;
}
.theme_box{
    padding-left: 1.6rem;
    height: 4.45rem;
}
.theme_title{
    color: #333;
    font-weight: bold;
    font-size: 1.6rem;
    width: 9.2rem;
    height: 4.45rem;
    line-height: 4.45rem;
}
.bar{
    width:100%;
    background-color: #FFF;
    padding: 0 1.6rem;
}
.bar_box{
    width: 100%;
    height: 4.45rem;
    border-bottom: 1px solid #EAEAEA;
}

/*   店铺介绍  */
.bar_box_shopintroduce{
    width: 100%;
    border-bottom: 1px solid #EAEAEA;
    height: 6.8rem;
}
.bar_descri_shopintroduce{
    color: #666;
    font-size: 1.4rem;
    width: 24rem;
    line-height: 2.5rem;
}
/*   /店铺介绍  */

/*    店铺LOGO   */
.bar_box_shoplogo{
    width: 100%;
    /*border-bottom: 1px solid #EAEAEA;*/
    height: 8.1rem;
}
.bar_title_shoplogo{
    color: #333;
    font-size: 1.4rem;
    width: 9.2rem;
    height: 8.1rem;
    line-height: 8.1rem;
}
.bar_descri_shoplogo{
   width: 5rem;
   height: 5rem;
   margin-top: 1.5rem;
   margin-right: 0;
}
.bar_logo{
    width: 5rem;
    height: 5rem;
}
/*    /店铺LOGO   */
.bar_title{
    color: #333;
    font-size: 1.4rem;
    width: 9.2rem;
    height: 4.45rem;
    line-height: 4.45rem;
}
.img_title{
    color: #333;
    font-size: 1.4rem;
    height: 4.45rem;
    line-height: 4.45rem;
}
.bar_descri{
    color: #666;
    font-size: 1.4rem;
    height: 4.45rem;
    line-height: 4.45rem;
    width: 24rem;
}
.text_red{
    color: #AD1A1A;
}
.arrow_down{
    width: 2.25rem;
    height: .7rem;
    background-position: -6.4rem -22rem;
    margin-top: 2.2rem;
}
.img_inner{
    width: 100%;
    border-top: 1px solid transparent;
    text-align: center;
    background-color: #F6F6F6;
    padding-bottom: 1.5rem;
    /*margin-bootm: 1rem;*/
}
.img_business_licence{
    display: block;
    width: 15rem;
    height: 21.35rem;
    margin: 1.5rem auto 0;
}
.img_cardid{
    display: block;
    width: 25rem;
    height: 15.7rem;
    margin: 1.5rem auto 0;
}
.space{
    width: 100%;
    height: 5rem;
    background-color: #FFF;
}
.space_small{
    width: 100%;
    height: 1rem;
}
.split{
    width: 100%;
    height: 0;
    border-bottom: 1px solid #EAEAEA;
    margin: 1rem auto;
}
.section_footer{
    width: 100%;
    height: 12.4rem;
    text-align: center;
}
.submit_button{
    display: inline-block;
    width: 80%;
    height: 4.4rem;
    line-height: 4.4rem;
    margin-top: 4rem;
    text-align: center;
    background-color: #15AF25;
    color: #FFF;
    font-size: 1.6rem;
}


</style>