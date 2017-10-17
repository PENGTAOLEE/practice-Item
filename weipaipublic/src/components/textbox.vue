<template>
<div id="show">
	<!-- <div class="recharge"> -->
	<div class="cell-input">
		<div class="cell-input_bd">
			<input class="cell-input_input" type="text" placeholder="请输入联系人..." v-model="contact_name" >
		</div>		
	</div>
	<div class="btn_area">
		<a href="javascript:;" :class="classObject" @click="gotoSave">保存</a>
	</div>

	
	<!-- </div> -->
</div>
</template>
<script>

	
	

    module.exports = {
		data: function() {
			return {
				contact_name: '',
				is_ok: false
			}
		},
		props: ['msg'],
		
		mounted: function(){

		},

		methods: {
			gotoSave: function() {
				var contact_name = this.contact_name;
				if(contact_name){
					this.$emit("saveBox",contact_name);
					this.$emit("close");
				}

				
			}

		},
		computed: {
			classObject: function(){
				return {
					btn: true,
					btn__ok: this.contact_name!=0
				}
			}
		}
	}


</script>
<style>
/* 默认弹窗样式 */
#show {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 39;
    width: 100%;
    height: 100%;
   /* background: rgba(0,0,0,.4);*/
   /*background: #fff;*/
    background: #f6f6f6;
}
/* input 输入 */
/* .recharge {
    height: 100%;
   background: #f6f6f6;
}*/
/*.recharge */.cell-input{
    margin-top: 1rem;
}
.cell-input{
    padding:1.5rem;
    display: flex;
    align-items:center;
    line-height: 1;
    font-size: 1.6rem;
    background-color: #fff;
}

.cell-input_bd{
    flex:1;
}
.cell-input_input{
    width: 100%;
    line-height: 1;
    color: #999;
}

/*按钮*/
div.btn_area{
    margin: 3rem 2rem;
    text-align: center;
}
.btn{
    display: block;
    margin: 0 auto;
    padding:0 1rem;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    background-color: #ccc;

    color: #fff;
    font-size: 1.6rem;
    box-sizing: border-box;
    border-radius: 0.25rem;
    width: 80%;
}
.btn__ok{
    background-color: #15af25;
}
.btn_area .link{
    display: inline-block;
    color: #6699ff;
    font-size: 1.4rem;
    margin-top: 2rem;
}

</style>
