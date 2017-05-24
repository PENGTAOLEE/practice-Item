<template>
<div class="items">
	<div class="wrap">
	    <div class="tabs">
	        <router-link to="/items/govern/0" hidefocus="true" class="active">参拍拍品</router-link>
	        <router-link to="/items/govern/1" hidefocus="true" class="active">关注拍品</router-link>
	        <router-link to="/items/govern/2" hidefocus="true" class="active">关注店铺</router-link>
	    </div> 
	    <transition name="pages">
            <router-view></router-view>
        </transition> 
	</div>
</div>

</template>
<script>


    module.exports = {
		data: function() {
			return {
			}
		},
		
		components: {
            'my-footer': footer
       	},
       
       	mounted: function(){
                  document.title="参拍拍品";
       		this.$nextTick(function(){
       			this.addRouterLink()
       		})
                  // 禁用微信分享
                  utils.disableSharing();
       	},
       	watch: {
       		'$route': ["addRouterLink"]
       	},
       	beforeDestroy: function() {
       		$(".footer-bottom a").eq(3).removeClass("router-link-active")
       	},
       	methods: {
       		// footer 样式
       		addRouterLink: function() {
       			$(".footer-bottom a").eq(3).addClass("router-link-active")
       		}
       	}
       
	}

</script>
<style>
.items {
	margin-bottom: 10rem;
}
.tabs{
	height:4.2rem;
	background:#fff; 
	width: 100%; 
	border-bottom: 1px solid #c5c5c5; 
	margin-bottom: 1rem;
	}
.tabs a {
	display:block;
	float:left;
	width:33.333%;
	color:#333;
	text-align:center;
	line-height:4.2rem;
	font-size:1.5rem;
	text-decoration:none; 
	cursor: pointer;
	}
.tabs .router-link-active{
	color:#ad1a1a; 
	border-bottom:0.1rem solid #AD1A1A;
}


</style>
