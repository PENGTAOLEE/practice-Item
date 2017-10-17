<template>
<div class="show-alert" @click.self='close'>
	<div class="tip-box">
        <div class="tip-msg" >
            <p class="tip-title">
                {{info.tip_title}}
            </p>
            <p class="tip-content" v-if='info.tip_content'>
                {{info.tip_content}}
            </p>
        </div>
		<div class="tip-footer">
            <div class="tip-confirm" @click="goCancel">{{info.canceltext||'取消'}}</div>
			<div class="tip-confirm" @click="goConfirm">{{info.confirmtext||'确定'}}</div>
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
		props: ['info'],
		
		mounted: function(){

		},
		methods: {
			close: function() {
				this.$emit('goCancel');
			},
			goConfirm: function(){
				this.$emit('goConfirm',this.info.params);
			},
            goCancel: function(){
                this.$emit('goCancel');
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
.tip-box {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
            transform: translate3d(-50%,-50%,0);
    width: 25.1rem;
    max-height: 10.7rem;
    /*bottom: 0;
    left: 0;
    width: 100%;*/
    /*min-height: 20rem;*/
    height: auto;
    background: #F7F8F7;
    /*border-radius: .5rem;*/
    text-align: center;
    font-size: 1.4rem;
    background-color: #fff;
}
.tip-msg {
    width: 100%;
    /*min-height: 9.5rem;*/
    padding: 1rem 0rem 2rem;
    /*border-bottom: 1px solid #e5e5e5;*/
    color: #000;
    font-size: 1.3rem;
    text-align: center;
}
.tip-title{
    padding: 0rem 3.5rem;
}
.tip-content {
    /*width: 100%*/
    /*min-height: 9.5rem;*/
    padding: 0rem 9rem;
    /*border-bottom: 1px solid #e5e5e5;*/
}
.tip-footer {
    width: 100%;
    height: 3rem;
    /*padding-bottom: 3rem;*/
}
.tip-confirm {
    display: inline-block;
    height: 3rem;
    line-height: 3rem;
    width: 49%;
    font-size: 1.4rem;
    color: #333;
    background-color: #fff;
}

</style>
