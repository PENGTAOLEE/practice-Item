<template>
<footer class="shops-footer fixed clearfix">
	<router-link to="/index" class="fl">
		<span class="a-in abg shotsprites"></span>
		<span class="a-in">首页</span>
		<span class="fr line"></span>
	</router-link>
	<router-link to="/find" class="fl">
		<span class="a-in abg re shotsprites"><i class="ab state"></i></span>
		<span class="a-in">发现</span>
		<span class="fr line"></span>
	</router-link>
	<router-link to="/buyerCenter" class="fl">
		<span class="a-in abg shotsprites"></span>
		<span class="a-in">我的</span>
		<span class="fr line"></span>
	</router-link>
	<!-- <router-link :to="'/newschat/' + userid + '/' + goodsid" class="fl">
		<span class="a-in abg shotsprites"></span>
		<span class="a-in">联系客服</span>
	</router-link>  -->
	<div @click="goTo" class="fl link-a">
		<span class="a-in abg shotsprites"></span>
		<span class="a-in">联系商家</span>
	</div>
</footer>
</template>
<script>

    export default {		
		props: ["userid","goodsid"],
		methods: {
			goTo: function() {
				var userid = this.userid,
					goodsid = this.goodsid;
				if (userid && goodsid) {
					this.$router.push('/newschat/' + userid + '/1/' + goodsid)
				} else {
					this.$router.push('/newschat/' + userid + '/1')
				}
				
			}
		}
	}

</script>
<style>
.shops-footer{
	left: 0;
	bottom: 0;
	z-index: 19;
	width: 100%;
	border-top: 1px solid #bebebe;
	background-color: rgba(255,255,255,255);
}
.shops-footer a,
.shops-footer .link-a {
	width: 25%;
	height: 5rem;
	padding:1rem 0;
	text-align: center;
	line-height: 3rem;
	font-size: 0;
}
.shops-footer a .a-in ,
.shops-footer .link-a .a-in{
	display: inline-block;
	vertical-align:middle;
	font-size: 1.4rem;
	color: #333;
}
.shops-footer a .abg ,
.shops-footer .link-a .abg {
	width: 2.1rem;
	height: 2rem;
	margin-right: 0.4rem;
}
.shops-footer a .line,
.shops-footer .link-a .line {
	height: 3rem;
	border-right: 1px solid #e5e5e5;
}
.shops-footer .abg .state{
	width: 0.5rem;
	height:0.5rem;
	right: -0.25rem;
	top: -0.25rem;
	background-color: #ad1a1a;
	border-radius: 50%;
	display: none;
}
</style>
