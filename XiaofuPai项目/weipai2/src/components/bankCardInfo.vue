<template>
<div class="bankCardInfo" v-show="isBankCandInfo">
	<div class="bankCardInfo_title">银行卡信息（必填）</div>
	<div class="cell-input">
		<div class="cell-input_hd">
			<label class="cell-input_label">开户名</label>
		</div>
		<div class="cell-input_bd">
			<input class="cell-input_input" type="text" placeholder="填写真实姓名">
		</div>
	</div>
	<div class="cell-input">
		<div class="cell-input_hd">
			<label class="cell-input_label">身份证号</label>
		</div>
		<div class="cell-input_bd">
			<input class="cell-input_input" type="text" placeholder="填写身份证号">
		</div>
	</div>
	<div class="cell-input">
		<div class="cell-input_hd">
			<label class="cell-input_label">银行卡号</label>
		</div>
		<div class="cell-input_bd">
			<input class="cell-input_input" type="text" placeholder="支持信用卡、借记卡">
		</div>
	</div>
	<div class="cell-input">
		<div class="cell-input_hd">
			<label class="cell-input_label">卡类型</label>
		</div>
		<div class="cell-input_bd">
			农行卡
		</div>
	</div>
	<div class="btn_area">
		<a href="javascript:;" class="btn">保存</a>
	</div>
</div>
</template>
<script>


    module.exports = {
		props:['isBankCandInfo'],
		template:require("module/bankCardInfo/bankCardInfo.html")
	}

</script>
<style>
/* input 输入 */
.cell-input{
    position: relative;
    padding:1.5rem;
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
    flex:1;
}
.cell-input_input{
    width: 100%;
    line-height: 1;
    color: #999;
}
/* 标题 */
.bankCardInfo_title{
    padding: 0 1.5rem;
    height: 4.5rem;
    line-height: 4.5rem;
    color: #666;
    font-size: 1.6rem;
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
