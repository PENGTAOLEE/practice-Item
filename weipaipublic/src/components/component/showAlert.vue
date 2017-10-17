<template>
<div class="show-alert" @click.self='close'>
	<div id="alert-box">
		<div id="alert-content">
			{{ msg }}
		</div>
		<div id="alert-footer">
			<div id="alert-confirm" v-on:click="close">确定</div>
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
<style scoped>
/* 默认弹窗样式 */
.show-alert {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 39;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
}
#alert-box {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
            transform: translate3d(-50%,-50%,0);
    width: 24rem;
    min-height: 12.2rem;
    background: #fff;
    border-radius: .5rem;
    text-align: center;
    font-size: 1.4rem;
}
#alert-content {
    width: 100%;
    min-height: 8.2rem;
    padding: 3rem 1rem;
    border-bottom: 1px solid #e5e5e5;
    color: #333;
}
#alert-footer {
    width: 100%;
    height: 3.9rem;
    line-height: 3.9rem; 
}
#alert-confirm {
    color: #6699ff;
}

</style>
