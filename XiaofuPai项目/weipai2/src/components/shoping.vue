<template>
<div class="shoping">
	
	<div class="shopName">
		<dl class="shopDl cc">
			<dt class="shopDt">店铺介绍</dt>
			<dd class="shopDd">
				<textarea class="shopText" required>微拍店铺介绍微拍店铺介绍微拍店铺介绍微拍店铺介绍微拍店铺介绍微拍店铺介绍微拍店铺介绍微拍店铺介绍</textarea>
			</dd>
		</dl>
		<button class="formSave">完成</button>
	</div>
	<my-footer></my-footer>
</div>

</template>
<script>


    module.exports = {
		
		components: {
            'my-footer':footer
      }  
	}

</script>
<style>
.shopDl{
	padding:1.4rem 2.7rem 0 1.4rem;
	background: #fff;
}
.shopDt{
	float: left;
	width: 6.5rem;
	font-size: 1.6rem;
	color: #333;
}
.shopDd{
	width: 25.5rem;
	float: right;
	font-size: 1.4rem;
	color: #999;
}
.shopDd .shopText{
	font-size: 1.4rem;
	color: #999;
	line-height: 2.8rem;
	resize:none;
	width: 25.5rem;
	overflow-y: hidden;
}

.formSave{
	background:#15af25;
	color:#fff;
	text-align:center;
	border:0;
	border-radius:1rem;
	padding:3%;
	font-size:1.6rem;
	width: 90%;
	margin:4rem 5% 4rem;
}


</style>
