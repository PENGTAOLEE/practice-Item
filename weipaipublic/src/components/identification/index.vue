<template>

	<div class="pages">
		<div class="section_header">
			<div class="header_box clr" v-if="data.is_apply==0">
				<div class="user_img_box fl" >
					<img :src="data.thumb" alt="" class="user_img">
				</div>
				<div class="user_text fl">
					<p class="user_name">{{data.name}}</p>
					<p class="user_descri" >实名认证可享受更多特权服务</p>
				</div>
                <div class="authen_complete fr clr">
					<div  class="authen_img_box">
						<p class="spritesmap unauth-user-large unauthen "></p>
                        <p class='authen-type-text'>未认证</p>
					</div>
				</div>
                
			</div>
            <router-link to='/authendetails' class="header_box clr" v-if='data.is_apply==1'>
				<div class="user_img_box fl" >
					<img :src="data.logo" alt="" class="user_img">
				</div>
				<div class="user_text fl">
					<p class="user_name">{{data.rel_name_meb}}</p>
                    <p class="user_descri" >认证有效期至<span class='user_deadline'>{{dateFormat()}}</span></p>
				</div>
                <div class="authen_complete fr clr" v-if="data.type==1">
					<div  class="authen_img_box fl">
						<p class="spritesmap auth-user-large personal-large "></p>
                        <p class='authen-type-text'>个人认证</p>
					</div>
                    <i class="spritesmap arrow fl"></i>
				</div>
                <div class="authen_complete fr clr" v-else-if="data.type==2">
					<div  class="authen_img_box fl">
						<p class="spritesmap auth-user-large shop-large "></p>
                        <p class='authen-type-text'>企业认证</p>
					</div>
                    <i class="spritesmap arrow fl"></i>
				</div>
			</router-link>
		</div>
		<div class="section_body" v-if="data.is_apply==0">
			<div class="text_head clr">
				<div class="text_title fl">
					申请认证
				</div>
				<!--<div class="text_descri">
	
				</div>-->
	
			</div>
			<div class="section_function clr">
				<div class="function_personal fl">
					<a href="javascript:;" class="spritesmap personal_img"></a>
					<p class="personal_text">个人实名认证</p>
					<router-link class="authentication_button" to="/authenticationflow">申请</router-link>
				</div>
				<div class="function_enterprise fl">
					<a href="javascript:;" class="spritesmap enterprise_img"></a>
					<p class="enterprise_text">企业实名认证</p>
					<router-link class="authentication_button" to="/authenticationenterpriseflow">申请</router-link>
				</div>
			</div>
		</div>
		<div class="section_body" v-if="data.is_apply!=0">
			<div class="text_head clr">
				<div class="text_title fl">
					店铺信息
				</div>
				<div class="text_descri fl">
					(LOGO和介绍每月可改一次)
				</div>
			</div>
			<router-link to='/authenshop' class="header_box clr">
				<router-link class="shop_img_box fl" to="/authenshop">
					<img :src="data.logo" alt="" class="user_img">
				</router-link>
				<div class="user_text fl">
					<p class="user_name">{{data.title}}</p>
					<p class="user_descri">{{data.desc}}</p>
				</div>
				<div class="authen_complete fr">
					<div  class="authen_img_box clr">
						<i class="spritesmap arrow fl"></i>
					</div>
				</div>
			</router-link>
		</div>
		<div class="section_footer">
			<div class="text_head clr">
				<div class="text_title fl">
					认证特权
				</div>
				<div class="text_descri fl">
					(权重影响分类排名出现概率)
				</div>
			</div>
			<table class="vip_show">
				<tr>
					<td>
						<a href="javascript:;" class="spritesmap vip_img vip_img1"></a>
						<p>专属认证标志</p>
					</td>
					<td>
						<a href="javascript:;" class="spritesmap vip_img	vip_img2"></a>
						<p>"热门"排名权重</p>
					</td>
					<td>
						<a href="javascript:;" class="spritesmap vip_img	vip_img3"></a>
						<p>"分类"排名权重</p>
					</td>
				</tr>
				<tr>
					<td>
						<a href="javascript:;" class="spritesmap vip_img	vip_img4"></a>
						<p>参加平台活动</p>
					</td>
					<td>
						<a href="javascript:;" class="spritesmap vip_img	vip_img5"></a>
						<p>优质店铺推荐</p>
					</td>
					<td>
						<a href="javascript:;" class="spritesmap vip_img	vip_img6"></a>
						<p>免费推广</p>
					</td>
				</tr>
			</table>
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
            this.getAuthenIndex();
            document.title = "实名认证";
        },
        methods: {
            getAuthenIndex: function(){
                var that = this;
                ajax.getAuthenIndex(function(data){
                    if(data.status==200){
                        that.data = data.data;
                    }else{
                        that.alert_msg = data.msg;
                        that.is_alert = true;
                    }
                })
            },
            dateFormat: function(){
                let date = new Date(this.data.end_time*1000);
                let year= date.getFullYear();
                let month = date.getMonth()+1;
                let day  = date.getDate();
                return year+'-'+month+'-'+day
            }
        }
    }
	
</script>
<style scoped>
.section_header{
	background-color: #FFF;
}
.header_box{
    display: block;
	width: 100%;
	height: 7.75rem;
	padding: 1.5rem;
}
.user_img_box{
	width: 4.5rem;
	height: 4.5rem;
	border-radius: 2.25rem;
	overflow: hidden;
}
.shop_img_box{
	width: 4.5rem;
	height: 4.5rem;
}
.user_img{
	display: block;
	width: 4.5rem;
	height: 4.5rem;
	border-style: none;
	background-color: #F00;
}
.user_text{
	width: 50%;
	margin-left: 1rem;
}
.user_name{
	font-size: 1.7rem;
	color: #333;
}
.user_descri{
	font-size: 1.3rem;
	color: #999;
}
.user_deadline{
    color: #AD1A1A;
}
.auth_img{
	width: 2.8rem;
	height: 1.6rem;
	margin-top: .5rem;
}

.authen_complete{
	height: 4.5rem;
}
.authen_img_box{
	display: inline-block;
	margin-top: 0.6rem;
}
.unauthen{
    display: inline-block;
    margin-left: 0.7rem;
}
.auth-user-large{
    margin-left: 1.2rem;
}
.authen-type-text{
    color: #999;
    font-size: 1.4rem;
}
.arrow{
	width: .75rem;
	height: 1.3rem;
	background-position: -14.5rem -16.7rem;
	margin-left: 1rem;
	margin-top: 1rem;
}
.section_body{
	margin-top: 1rem;
	background-color: #FFF;
	width: 100%;
}
.text_head{
	width: 100%;
	height: 3.5rem;
	line-height: 3.5rem;
	padding: 0 1.5rem;
	border-bottom: 1px solid #E5E5E5;
}
.text_title{
	width: 7rem;
	color: #333;
	font-size: 1.4rem;
}
.text_descri{
	font-size: 1.2rem;
	color: #999;
}
.section_function{
	width: 100%;
	padding: 0 1.5rem;
}
.function_personal,.function_enterprise{
	width: 50%;
	text-align: center;
	margin: 2rem auto;
}
.personal_img{
	display: block;
	width: 7.5rem;
	height: 7.5rem;
	background-position: -.2rem -17.1rem;
	margin: auto;
}
.enterprise_img{
	display: block;
	width: 7.5rem;
	height: 7.5rem;
	background-position: -.2rem -17.1rem;
	margin: auto;
}
.personal_text,.enterprise_text{
	font-size: 1.4rem;
	color: #333;
	margin-top: 1rem;
}
.authentication_button{
	margin-top: 2rem;
	display: inline-block;
	padding: 0.5rem 1.5rem;
	border: 1px solid #7ECEF4;
	border-radius: 1rem;
	color: #7ECEF4;
	font-size: 1.2rem;
	vertical-align: center;
}
.section_footer{
	width: 100%;
	background-color: #FFF;
	margin-top: 1rem;
}
.vip_show{
	width: 100%;

}
.vip_show>tr{
	width: 100%;
	text-align: center;
	font-size: 1.2rem;
	/*color: #999;*/
}
.vip_show td{
	padding: 2.25rem 2rem 1.5rem;
}
.vip_img{
	display: inline-block;
	width: 4.1rem;
	height: 3.9rem;
}
.vip_img1{
	background-position: -0.7rem -12.8rem;
}
.vip_img2{
	background-position: -4.8rem -12.9rem;
}
.vip_img4{
	background-position: -9rem -12.7rem;
}
.vip_img5{
	background-position: -13rem -12.7rem;
}
.vip_img6{
	background-position: -17.5rem -12.7rem;
}
.vip_img3{
	background-position: -21.5rem -12.7rem;
}
.vip_show>tr p{
	color: #999;
	margin-top: 1.5rem;
}
.vip_show td:nth-child(1),.vip_show td:nth-child(2){
	border-right: 1px solid #E5E5E5;
}
.vip_show tr:nth-child(1)>td{
	border-bottom: 1px solid #E5E5E5;
}
</style>
