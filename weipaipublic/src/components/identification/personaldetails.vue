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
                <div class="bar_descri text_red fl">
                    通过企业认证
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    认证有效期
                </div>
                <div class="bar_descri fl">
                    2017-03-09
                </div>
            </div>
        </div>
    </div>
    <div class="section">
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
                    全时服务
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    法人姓名
                </div>
                <div class="bar_descri fl">
                    全时服务
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    身份证号
                </div>
                <div class="bar_descri fl">
                    610895457658790
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
                    <img src="../../assets/img/business_licence.png" alt="" class="img_business_licence">
                </div>
                <div class="split">

                </div>
                <div class="img_inner">
                    <img src="../../assets/img/id_card_front.png" lt="" class="img_cardid">
                </div>
                <div class="split">

                </div>
                <div class="img_inner">
                    <img src="../../assets/img/id_card_negative.png" alt="" class="img_cardid">
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
                    杨彤杰
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    联系电话
                </div>
                <div class="bar_descri fl">
                    15877651169
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box clr">
                <div class="bar_title fl">
                    身份证号
                </div>
                <div class="bar_descri fl">
                    610895457658790
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
                    <img src="../../assets/img/id_card_front.png" lt="" class="img_cardid">
                </div>
                <div class="split">

                </div>
                <div class="img_inner">
                    <img src="../../assets/img/id_card_negative.png" alt="" class="img_cardid">
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
                    全时服务
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box_shopintroduce clr">
                <div class="bar_title fl">
                    店铺介绍
                </div>
                <div class="bar_descri_shopintroduce fl">
                    店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍店铺介绍
                </div>
            </div>
        </div>
        <div class="bar">
            <div class="bar_box_shoplogo clr">
                <div class="bar_title_shoplogo fl ">
                    店铺LOGO
                </div>
                <div class="bar_descri_shoplogo fr">
                    <img src="" alt="" class="bar_logo">
                </div>
            </div>
        </div>
    </div>
    <div class="section_footer">
        <router-link to="buyerCenter" class="submit_button">重新认证</router-link>
    </div>
    <div class="space">

    </div>
</div>
</template>
<script>
var ajax = require("ajax");
    module.exports = {
		data: function() {
			return {
                data: ''
			}
		},
		props: ['state'],
        created: function(){
            this.getAuthenDetailsInfo();
        },
        methods: {
            getAuthenDetailsInfo: function(){
                var that = this;
                ajax.getAuthenDetailsInfo(function(data){
                    if(data.status==200){
                        that.data = data.data;
                        console.log(that.$route.params.id);
                    }else{
                        console.log("页面获取失败")
                    }
                })
            }
        }
		
		
	}

</script>
<style>
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
.bar_descri.text_red{
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