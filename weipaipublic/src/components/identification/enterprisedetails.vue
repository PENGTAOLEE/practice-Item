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
                <div class="bar_descri fl">
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
            </div>
        </div>
        

    </div>
</div>
</template>
<script>
    var ajax = require('ajax');
    module.exports = {
        data: function(){
            return {
               content: 'yangtongjie'
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
}
.arrow_down{
    width: 2.25rem;
    height: .7rem;
    background-position: -6.4rem -22rem;
    margin-top: 2.2rem;
}
.img_inner{
    width: 100%;
    height: 24.4rem;
    text-align: center;
    background-color: #F6F6F6;
}
.img_business_licence{
    display: block;
    width: 15rem;
    height: 21.35rem;
    margin: 1.5rem auto;
}




</style>