<template>
<div id="show-tip" @click.self='close'>
	<div id="alert-box">
		<div id="alert-content">
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
			close: function() {
				this.$emit('closeBox')
			}
		}
	}


</script>
<style>
/* 默认弹窗样式 */
#show-tip {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 39;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0);
}
#alert-box {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
            transform: translate3d(-50%,-50%,0);
    width: 14.2rem;
    min-height: 8.2rem;
    background: rgba(0,0,0,0.7);
    /*border-radius: .5rem;*/
    text-align: center;
    font-size: 1.4rem;
}
#alert-content {
    width: 100%;
    min-height: 8.2rem;
    /*padding: 3rem 1rem;*/
    /*border-bottom: 1px solid #e5e5e5;*/
    margin: auto;
    color: #fff;
}


</style>
