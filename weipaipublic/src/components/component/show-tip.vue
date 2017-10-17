<template>
<div id="show-alert" @click.self='close'>
	<div id="tip-box">
		<div id="tip-content">
			{{ msg }}
		</div>
		<div id="tip-footer">
			<div id="tip-confirm" v-on:click="goConfirm">{{confirmtip}}</div>
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
		props: ['msg','confirmtip'],
		
		mounted: function(){

		},
		methods: {
			close: function() {
				this.$emit('closebox')
			},
			goConfirm: function(){
				this.$emit('goconfirm')
			}
		}
	}


</script>
<style scoped>
/* 默认弹窗样式 */
#show-alert {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 39;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
}
#tip-box {
    position: absolute;
    /*top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
            transform: translate3d(-50%,-50%,0);
    width: 24rem;*/
    bottom: 0;
    left: 0;
    width: 100%;
    /*min-height: 20rem;*/
    min-height: 17rem;
    background: #F7F8F7;
    /*border-radius: .5rem;*/
    text-align: center;
    font-size: 1.4rem;
}
#tip-content {
    width: 100%;
    min-height: 9.5rem;
    padding: 4rem 1rem;
    /*border-bottom: 1px solid #e5e5e5;*/
    color: #000;
}
#tip-footer {
    width: 100%;
    height: 7.5rem;
    padding-bottom: 3rem;
}
#tip-confirm {
    height: 4.5rem;
    line-height: 4.5rem;
    width: 80%;
    margin: auto;
    border: 2px solid #ccc;
    border-radius: 0.3rem;
    color: #333;
    background-color: #fff;
}

</style>
