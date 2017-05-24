<template>
<div class="auction">
	<div class="wrap">
    	<div class="tabs">    	
    		<router-link to="/auction/govern/1" >竞拍中</router-link>
    		<router-link to="/auction/govern/3" >已结拍</router-link>
    		<router-link to="/auction/govern/4" >已流拍</router-link>
    		<router-link to="/auction/govern/5" >已失败</router-link>
    		<router-link to="/auction/govern/6" >草稿箱</router-link>                  		 
		</div>
		<router-view></router-view> 
		<!-- <my-footer></my-footer> -->
	</div>
</div>

</template>
<script>


    module.exports = {
		data: function() {
			return {
				keynum: 1
			}
		},
		
		components: {
            'my-footer': footer
	   	},     
       
		mounted: function() {
			document.title="拍品管理";
			this.$nextTick(function() {
				this.addRouterLink()
			})

		},
		watch: {
			'$route': ["addRouterLink"]
		},
		beforeDestroy: function() {
			$(".footer-bottom a").eq(3).removeClass("router-link-active");
		},
		methods: {
			// footer 样式
			addRouterLink: function() {
				$(".footer-bottom a").eq(3).addClass("router-link-active");
			}
		}
	}	

</script>
<style>
.tabs{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 11;
	height:4.2rem;
	background:#fff; 
	width: 100%; 
	border-bottom: 1px solid #c5c5c5; 
	margin-bottom: 1rem;
}
.tabs a {
	display:block;
	float:left;
	width:16%;
	margin:0 2%;
	color:#333;
	text-align:center;
	line-height:4.2rem;
	font-size:1.5rem;
	text-decoration:none; 
	cursor: pointer;
}
.tabs .router-link-active{
	color:#ad1a1a; 
	border-bottom: 0.1rem solid #AD1A1A;
}

.swiper-slide {
	width:100%;
	height: auto!important;
	float: left;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	background:none;
	color:#fff;
}
.content-slide p {
	text-indent:2em;
	line-height:1.9;
}
.swiper-container-auction {
	width: 100%;
	margin: 0 auto;
	margin-top: 5rem;
	margin-bottom: 10rem;
	position: relative;
	-webkit-backface-visibility:hidden;
	-moz-backface-visibility:hidden;
	-ms-backface-visibility:hidden;
	-o-backface-visibility:hidden;
	backface-visibility:hidden;
	
	/* Fix of Webkit flickering */	
	z-index:1;
	}
.swiper-wrapper {
	position:relative;width:100%;
	-webkit-transition-property:-webkit-transform, left, top;
	-webkit-transition-duration:0s;
	-webkit-transform:translate3d(0px,0,0);
	-webkit-transition-timing-function:ease;
	
	-moz-transition-property:-moz-transform, left, top;
	-moz-transition-duration:0s;
	-moz-transform:translate3d(0px,0,0);
	-moz-transition-timing-function:ease;
	
	-o-transition-property:-o-transform, left, top;
	-o-transition-duration:0s;
	-o-transform:translate3d(0px,0,0);
	-o-transition-timing-function:ease;
	-o-transform:translate(0px,0px);
	
	-ms-transition-property:-ms-transform, left, top;
	-ms-transition-duration:0s;
	-ms-transform:translate3d(0px,0,0);
	-ms-transition-timing-function:ease;
	
	transition-property:transform, left, top;
	transition-duration:0s;
	transform:translate3d(0px,0,0);
	transition-timing-function:ease;

	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
}
.swiper-free-mode > .swiper-wrapper {
	-webkit-transition-timing-function: ease-out;
	-moz-transition-timing-function: ease-out;
	-ms-transition-timing-function: ease-out;
	-o-transition-timing-function: ease-out;
	transition-timing-function: ease-out;
	margin: 0 auto;
}
.swiper-slide-btn{
	/*position: relative;*/
}
.content-slide-border{
	position: relative;
	background: #fff;
	/*height: 15.6rem;*/	   
    margin-bottom: 1rem;  
}

.content-slide-none{
	height: 9.5rem ;
	border-bottom: none;
}
.content-slide-auction{
	/*height: 9.5rem;*/
	padding: 1.2rem 1.4rem;
	border-bottom: .05rem solid #e5e5e5;
}
.content-dl dt{
	width: 7rem;
	height: 7rem;	
	float: left;
}
.content-dl dt img {
	width: 100%;
	height: 100%;
}
.content-dl dd{
	float: left;
	margin-left: 1.1rem;
}
.content-dl dd strong{
	display: inline-block;
	width: 20rem;
	margin-bottom: .5rem;
	font-weight: normal;
	font-size: 1.6rem;
	color: #333;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.content-dl dd span{
	display: block;
	min-height: 2rem;
	font-size: 1.4rem;
}
.content-slide-box{
	position: relative;
}
.content-Btn{
	display: block;
	padding: 0.8rem 1.6rem;
	border: .05rem solid #ad1a1a;
	font-size: 1.4rem;
	color: #ad1a1a;
	width: 6.8rem;
	border-radius:0.2rem;
}
.content-Btn {
	display: inline-block;
	margin: 1.1rem 0;
	text-align: center;
*/	font-weight: normal;	
}
.content-Btn-sj{
	margin-right: 1rem;
	/*right: 9rem;*/
}
.content-Btn-abolish{
	border: .05rem solid #666;
	color: #666;
	right: 1.4rem;
}
.swiper-wrapper{

	height: auto!important;
}

/* 按钮样式 */
.btn-box {
	width: 100%;
	max-height: 6rem;
	padding-right: 1.4rem;
	text-align: right;
	background-color: #fff;
}

</style>
