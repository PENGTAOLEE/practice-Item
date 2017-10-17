<template>
<div class="pay_container">
    <div class="pay_list">
        <a class="pay_item" href="/payreset">重置支付密码</a>
        <a class="pay_item" href="/payforget">忘记支付密码</a>
    </div>
    <div class="pay_list">
        <a class="pay_item" href="/payalter">修改身份信息</a>
    </div>
</div>
</template>
<script>

    

    

    module.exports = {
        
        mounted: function() {
        	this.$nextTick(function() {
        		this.addRouterLink()
        	})
        },
        beforeDestroy: function() {
        	$(".footer-bottom a").eq(3).removeClass("router-link-active")
        },
        methods: {
        	// footer样式
            addRouterLink: function() {
                $(".footer-bottom a").eq(3).addClass("router-link-active")
            }
        }

    }

</script>
<style>
.pay_container{
    overflow: hidden;
}
.pay_list{
    margin-top:1rem;
}
.pay_item{
    position: relative;
    padding:1.5rem;
    display: block;
    background-color: #fff;
    color: #333;
    font-size:1.6rem;
}
.pay_item:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ddd;
    color: #ddd;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.pay_item:last-child:after{
    border: 0;
}
</style>
