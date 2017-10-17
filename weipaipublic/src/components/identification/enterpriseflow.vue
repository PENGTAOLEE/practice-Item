<template>
<div class="pages">
    <div class="section_head">
        <a href="javascript:;" class="text_head">企业实名认证流程</a>
    </div>
    <div class="section_body">
        <div class="body_box clr">
            <div class="body_index fl">
                <ul class="text_index">
                    <li>1</li>
                    <li>
                        <div class="index_split">

                        </div>
                    </li>
                    <li>2</li>
                    <li>    
                        <div class="index_split">
                        
                        </div>    
                    </li>
                    <li>3</li>
                    <li>    
                        <div class="index_split_small">
                        
                        </div>    
                    </li>
                    <li>4</li>
                </ul>
            </div>
            <div class="body_text fl">
                <ul class="text_paragraph">
                    <li>填写企业名称、法人姓名并上传企业营业执照清晰照片及法人身份证正面和反面清晰照。</li>
                    <li>填写联系人真实姓名、联系电话、身份证号并上传身份证正面、反面和手持身份证的清晰照。</li>
                    <li>设置店铺名称，店铺LOGO,及店铺介绍。</li>
                    <li>提交实名认证申请后，工作人员将在3个工作日内与您联系核对信息。</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="section_footer">
        <div class="footer_button">
            <router-link class="button_submit" to="/authenticationenterpriseinfo/enterprise/1">我要认证</router-link>
            <!--<p>点击即表示同意<router-link to="buyerset" class="link_protocol">《小福拍认证增值服务协议》</router-link></p>-->
        </div>
    </div>
</div>

</template>
<script>
</script>
<style>
html{
    height: 100%;
}
body{
    height: 100%;
}
#app{
    height: 100%;
    background-color: #FFF;
}
.section_head{
    width: 100%;
    padding: 1.5rem;
    text-align: center;
}
.text_head{
    display: inline-block;
    font-size: 1.9rem;
    height: 3.8rem;
    line-height: 3.8rem;
    color: #333;
}
.section_body{
    margin-top: 2.15rem;
}
.body_box{
    padding: 0 1.5rem;
}
.body_index{
    margin: 0 1.5rem;
}
.text_index>li:nth-child(odd){
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
    background-color: #6699FF;
    color: #FFF;
    text-align: center;
    line-height: 4rem;
    font-size: 1.4rem;
}
.text_index>li:nth-child(2){
    width: 100%;
    height: 5.2rem;
}
.text_index>li:nth-child(4){
    width: 100%;
    height: 5.2rem;
}
.text_index>li:nth-child(6){
    width: 100%;
    height: 2.5rem;
}
.index_split{
    width:1px;
    height: 5.2rem;
    margin: auto;
    border-left: .2rem solid #6699FF;
}
.index_split_small{
    width: 1px;
    height: 2.5rem;
    margin: auto;
    border-left: .2rem solid #6699FF;
}
.body_text{
    width: 78%;
}
.text_paragraph{
    font-size: 1.4rem;
    line-height: 2.6rem;
    color: #333;
}
.text_paragraph>li{
    font-size: 1.4rem;
    color: #333;
}
.text_paragraph>li:nth-child(n+2){
    margin-top: 2.3rem;
}
/*.text_paragraph>li:nth-child(3){
    margin-top: 2.3rem;
}
.text_paragraph>li:nth-child(4){
    margin-top: 2.3rem;
}*/
.section_footer{
    width: 100%;
    margin-top: 7.5rem;
    text-align: center;
}
.footer_button{
    margin: auto;
}
.button_submit{
    display: inline-block;
    width: 33.5rem;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.6rem;
    background-color: #15AF25;
    color: #FFF;
    border-radius: .2rem;
}
.footer_button>p{
    margin-top: 2.25rem;
    color: #333;
    font-size: 1.3rem;
}   
.link_protocol{
    color: #6699FF;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #6699FF;
}
</style>