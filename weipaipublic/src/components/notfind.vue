<template>
<div class="pages">
	
	<header class="notfind">
		<div>
			
		</div>
	</header> 
	<div id="main">
		<b>
		 出错啦
		</b>
	</div>
	<div class="space">
	</div>
	<div class="footer clr">
			<router-link class="fl" to="/index">
				<i><img src="../assets/img/404_2.png" alt=""></i><span>回首页</span>
			</router-link>	
			<a class="fr" @click.prevent="returnPage">
			     <i><img src="../assets/img/404_3.png" alt=""></i><span>返回</span>
			</a>
	</div>
</div>

</template>
<script>
	
	
	

    module.exports = {
		data : function(){
			return {
				abc: 123
			}
		    },
		
		methods: {
			returnPage: function(){
				this.$router.go(-1);
			} 
		}
	}

</script>
<style scoped>
.pages{
	background: #f6f6f6;
	margin: 0rem 5rem;
}
header.notfind{
	padding-top: 9.6rem;
	padding-bottom: 4.6rem;
}
header.notfind>div{
	width: 100%;
	height: 15rem;
	background: url(../assets/img/404_1.png) no-repeat;
	background-size: 100% 100%;
}
#main{
	width: 100%;
	height: 2.8rem;
	text-align: center;
}
#main>b{
	font-size: 2.8rem;
	font-weight: bold;
	line-height: 100%;
	color: #5c666f;
}
.space{
	width: 80%;
	background-color:  #5c666f;
	margin: 1.85rem auto;
	height: 1px;
}
div.footer{
	width: 100%;
	color: #333;
	padding: 1.85rem 2.8rem;
}
div.footer>a{
	color: #333;
	display: inline-block;
	height: 1.5rem;
}
div.footer>a>i{
	width: 2rem;
	height: 1.5rem;
	display: inline-block;
	margin-right: 1rem;
}
div.footer>a>i>img{
	width: 100%;
	height: 100%;
}
div.footer>a>span{
	color: #333;
	font-size: 1.5rem;
}

</style>
