<template>
<div class="apply-return">
	<header class="top-box">
		<div class="header-top clearfix">
			<!-- 改成跳转链接 -->
			<router-link :to="'/shops/'+info.shop_id+'?type=2'" class="shop-name">
				<i class="shop-icon"></i>
				<span class="main-color">{{info.shop_name}}</span>
				<i class="arrow-right"></i>
			</router-link>
			<!-- <div class="fr">
				<a class="phone-icon" :href="'tel:'+info.shop_mobile"></a>
				<div class="goods-status text-red">确认退款申请</div>
			</div> -->
		</div>
		<div class="goods-desc">
			<div class="goods-img fl">
				<img :src="url+JSON.parse(info.thumb).url" alt="">
			</div>
			<div class="fl">
				<h3 class="goods-name main-color">{{info.desc}}</h3>
				<div class="goods-text">
					成交金额：<span>￥{{info.price}}</span>
				</div>
				<!-- 申请退货 -->
				<div class="goods-text" >
					付款时间：<span>{{info.paytime}}</span>
				</div>
				<!-- /申请退货 -->
			</div>
		</div>
	</header>
	<div class="section_star clr">
			<div class="text_head fl">拍品评分</div>
			<div class="section_click_star fl">
				<ul class="star_box">
					<li v-for="n in 5" :data-index="n" @click="getCount(n)" class="spritesmap" :class="starArr[n-1]"></li>
				</ul>
			</div>
	</div>
	<div class="section_evaluate">
			<div class="section_star clr">
				<div class="text_head fl">评价</div>
				<div class="text_descri fr text_rt">
					<span>您的评价会严格匿名</span>
				</div>
			</div>
			<div class="section_input">
				<textarea class="input_content" placeholder="亲，写点什么吧！" v-model="content">

				</textarea>
			</div>
	</div>
	<div class="section_button">
		<a href="javascript:;" class="section_button_submit" @click="goEvaluate">提交</a>
	</div>
	<show-alert v-if="is_alert" @closeBox="closeAlertBox" :msg="alert_msg"></show-alert>
</div>

</template>
<script>
    var showAlert = require("@/components/component/showAlert")
    var ajax = require("ajax");
    var config = window.config;
	
	

    module.exports = {
		data: function() {
			return {
				info: '',
				url: '',//baseUrl         
				// 买家退款申请理由
				click_count: -1,
				content: "",
				is_alert: false,
				alert_msg: ''
        	}
    	},
		computed: {
			 starArr: function(){
				 var starArr=[];
					for(var i = 1; i <= 5;i++){
							i <= this.click_count?starArr.push("star_on"):starArr.push("star_off");
					}
					return starArr;
			 }
		},
		components: {
                  // 'my-footer': footer,
                  'show-alert': showAlert      
      	},
        created: function(){
                    this.getSendInfo();
                    this.url = window.config.img_url;
        },
        mounted: function(){
            var that = this;
                    $(".v_other_reason").blur(function(){
                      that.is_other_disable = true;
                      that.showBox = false;
                      that.returnReason = that.otherReason;  
                      console.log("失去焦点事件生效");  
                    });
        },
      	methods: {
            getSendInfo: function(){
                var that = this;
                var order_id = parseInt(that.$route.params.id);
                console.log(order_id);
                ajax.getOrderDetails(order_id,function(data){
                    if(data.status == 200){
                        that.info = data.data;
                    }else{
                        console.log(data.msg);
                    }
                });
            },
			getCount: function(n){
				this.click_count = n;
			},
			goEvaluate: function(){
				console.log("提交评价");
				var that = this;
				var order_id = parseInt(that.$route.params.id);
				var star = this.click_count;
				var content = this.content;
				if(star<0){
					this.alert_msg = "亲，给打个分吧！"
					this.is_alert = true;
				}else{
					ajax.goComment(order_id,star,content,function(data){
						if(data.status==200){
							that.$router.replace("/buyerorderdetails/"+that.info.id);
						}else{
							that.alert_msg = data.msg;
							that.is_alert = true;
						}
					})
				}
				
			},
			closeAlertBox:  function(){
				this.is_alert = false;
			}
      	}
	}

</script>
<style>

/* 申请退货 */
.text-red {
	color: #b73737;
}
.main-color	{
	font-family: PingFangSC;
	font-size: 1.6rem;
	color: #000;
}
.desc-color	{
	font-family: PingFangSC;
	font-size: 1.6rem;
	color: #666;
}
.apply-return {
	font-size: 1.6rem;
}
/* header */
.top-box {
	height: auto;
	margin-top: 1rem;
	background-color: #fff;
	font-family: PingFangSC;
}
.header-top {
	height: 3.9rem;
	padding: 0 1.4rem;
	line-height: 3.9rem;
}
.header-top div,
.top-box a ,
.top-box i {
	display: inline-block;
}
.shop-icon,
.arrow-right,
.phone-icon {
	vertical-align: middle;
}
.shop-icon {
	width: 2.2rem;
	height: 3.9rem;
	background: url(../../assets/img/stopicon.png) no-repeat;
	background-position: -0.6rem -0.2rem;
	background-size: cover;
}
.arrow-right {
	width: .7rem;
	height: 1.5rem;
	background: url(../../assets/img/arrow.png) no-repeat;
	background-position: -0.1rem -0.1rem;
	background-size: cover;
}
.phone-icon {
	width: 3.9rem;
	height: 3.9rem;
	background: url(../../assets/img/phoneicon.png) no-repeat;
	background-position: 0.5rem -0.2rem;
	background-size: cover;
}
.goods-status {
	font-size: 1.4rem;
}
.goods-desc {
	height: 9rem;
	padding: 1rem 1.4rem;
	background-color: #f8f8f8;
}
.goods-img {
	width: 7rem;
	height: 7rem;
	margin-right: 1rem;
	border: 1px solid #d5d5d5;
	border-radius: .5rem;
}
.goods-img img {
	width: 100%;
	height: 100%;
}
.goods-name {
	margin-bottom: .2rem;
	line-height: 2.5rem;
	font-size: 1.6rem;

    /*一行显示*/
    width: 17rem;
    word-break: keep-all;/* 不换行 */
    white-space: nowrap;/* 强制在同一行内显示所有文本，直到文本结束或者遭遇 br 对象。不换行 */
    overflow: hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis;/* IE 专有属性，当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    /*一行显示*/
}
.goods-text {
	font-size: 1.4rem;
	color: #949494;
}
.section_star{
	width: 100%;
	padding: 0 1rem;
	background-color: #FFF;
}
.text_head{
	width: 7rem;
	color: #333;
	font-size: 1.4rem;
	line-height: 5.2rem;
}
.section_click_star{
	width: 22rem;
	height: 5.2rem;
}
.star_box{
	/*display: inline-block;*/
	/*display: block;*/
	width: 100%;
	height: 2.2rem;
	margin-top: 1.5rem;
}
.star_box>li{
	display: inline-block;
	width: 2.3rem;
	height: 2.2rem;
	margin: 0 1rem;
	/*font-size: 1rem;*/
	/*vertical-align: middle;*/
}
.star_on{
	background-position: -19.1rem -2.45rem;
}
.star_off {
	background-position: -22rem -2.45rem;
}
.section_evaluate{
	width: 100%;
	margin-top: 1rem;
}
.text_descri>span{
	font-size: 1.4rem;
	line-height: 5.2rem;
	color: #999;
}
.text_rt{
	text-align: right;
}
.section_input{
	width:100%;
	height: 12.5rem;
	padding: 0 1rem;
	background-color: #FFF;
}
.input_content{
	width: 100%;
	height: 12.5rem;
	border: 1px solid #EEE;
	border-radius: .1rem;
	padding: .95rem;
}
.input_content::placeholder{
	color: #999;
	font-size: 1.2rem;
}
.section_button{
	width: 100%;
	background-color: #FFF; 
	text-align: center;
	padding-bottom: 50rem;
}
.section_button_submit{
	display: inline-block;
	margin: 7rem auto 0;
	width: 20rem;
	height:3.9rem;
	border-radius: .3rem;
	background-color: #158725;
	text-align: center;
	line-height: 3.9rem;
	color: #FFF;
}
body{
	height: 100%;
	overflow: hidden;
}
#app{
	height: 100%;
	/*overflow: hidden;*/
}
.apply-return{
	height: 100%;
	margin-bottom: -50rem;
}

</style>
