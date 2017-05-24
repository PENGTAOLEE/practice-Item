<template>
<div class="">
	<div class="cell-input">
		<div class="cell-input_hd">
			<label class="cell-input_label">姓名</label>
		</div>
		<div class="cell-input_bd">
			<input class="cell-input_input" type="text" placeholder="填写真实姓名" v-model="info.userName">
		</div>
	</div>
	<div class="cell-input">
		<div class="cell-input_hd">
			<label class="cell-input_label">身份证号</label>
		</div>
		<div class="cell-input_bd">
			<input class="cell-input_input" type="text" placeholder="填写身份证号" v-model="info.IDNumber">
		</div>
	</div>
	<div class="btn_area">
		<a href="javascript:(0);" @click="childEvent" id="confirm-btn" class="btn">确定</a>
	</div>

	<!-- 公共弹窗组件 -->
	<show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>
</div>
</template>
<script>


    module.exports = {
		data:function(){
			return {
				isAlterMask: false,
				showAlertBoll: false,
				tipMsg: ''
			}
		},
		props: ['info'],
		components: {
			'show-alert': showAlert
		},
		methods:{
			alterMask: function() {
				this.isAlterMask = !this.isAlterMask;
			},

			// 触发父组件事件
			childEvent: function() {
				this.$emit('confirmBtn');
			},
			
			// 关闭公共组件
			closePopup: function() {
				this.showAlertBoll = false;
			}
		},
		
		mounted: function() {
			var _this = this;
			// 判断是哪个页面跳进来的
			var from = utils.getRequest().from;
			if (from == 'modify_user') {
				$('#confirm-btn').on('click',function(){
					// 跳转输入密码
	            	_this.$router.push('/bankCardPassword')
				})
			};
			
		}
	}

</script>
<style>
/* input 输入 */
.cell-input{
    position: relative;
    padding:1.5rem;
    display: -webkit-flex;
    display: flex;
    align-items:center;
    line-height: 1;
    font-size: 1.6rem;
    background-color: #fff;
}
.cell-input:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9; 
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.cell-input_label{
    display: block;
    width: 10rem;    
    color: #333; 
    word-wrap:break-word;
    word-break:break-all;   
}
.cell-input_bd{
    -webkit-flex: 1;
    flex:1;
}
.cell-input_input{
    width: 100%;
    line-height: 1;
    color: #999;
}
/* 按钮 */
.btn_area{
    margin: 4rem 3.75rem;
}
.btn{
    display: block;
    margin: 0 auto;
    padding:0 1rem;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    background-color: #15af25;
    color: #fff;
    font-size: 1.6rem;
    box-sizing: border-box;
    border-radius: 0.25rem;
}
.btn:active{
    background-color: #64d86c;
}
/* 修改身份信息 */
.mask{
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background: rgba(0,0,0,0.4);
}

</style>
