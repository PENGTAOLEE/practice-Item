<template>
<div class="show-tip">
	<div class="alert-box">
		<div class="alert-content">
			{{ msg }}
		</div>
	</div>
</div>
</template>
<script>

	
	

    module.exports = {
		data: function() {
			return {
			}
		},
		props: ['msg'],
		
		mounted: function(){

		},
		methods: {
            startcount: function(during){
                    var that = this;
                    that.during = during;
                    this.timer = setInterval(function(){
                    if(that.during<1000){
                        window.clearInterval(this.timer);
                        that.$emit("childEvent");
                    }else{
                        that.during -= 1000;

                    }

                },1000);
            } 
		}
	}


</script>
<style>
/* 默认弹窗样式 */
.show-tip {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 39;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0);
}
.alert-box {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
            transform: translate3d(-50%,-50%,0);
    width: 14.2rem;
    height: 8.2rem;
    background: rgba(0,0,0,0.7);
    /*border-radius: .5rem;*/
    text-align: center;
    font-size: 1.4rem;
}
.alert-content {
    width: 100%;
    line-height: 8.2rem;
    /*padding: 3rem 1rem;*/
    /*border-bottom: 1px solid #e5e5e5;*/
    margin: auto;
    color: #fff;
    text-align: center;
}


</style>
