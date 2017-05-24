<template>
<div class="popup-box" v-show="showPopupBox">
	<div class="express-box">
		<h3 class="express-box-title">快递选择</h3>
		<ul class="express-list clearfix">
			<li class="express-item fl" @click="selectItme($event)" v-for="(item,index) in expressArr">{{ item }}</li>
		</ul>
	</div>
</div>
</template>
<script>


    module.exports = {
        data:function(){
            return {  
                nameNow: this.expressName,
                showPopupBox: true,
                expressArr: [
                    "中通速递",
                    "宅急送",
                    "韵达快运",
                    "圆通速递",
                    "天天快递",
                    "顺丰",
                    "申通",
                    "FedEx(中)",
                    "汇通快运",
                    "国通快递",
                    "EMS快递",
                    "德邦物流"
                ]
            }
        },
        props: [
            'expressName'
        ],
        
        mounted: function(){
            
        },
        updated: function(){
        },
        methods: {
            selectItme: function(ev) {
                var $this = $(ev.target),
                    curTxt = $this.html();
                // 只为当前添加 currentStyle
                $('.express-item').removeClass('express-item-on');
                $this.addClass('express-item-on');
                // 赋值点击元素到跳转后页面
                this.nameNow = curTxt;

                // 触发事件
                this.$emit('trans',this.nameNow);
                this.$emit('closeBox');
                
                // 关闭窗口
                // this.showPopupBox = false;
            }
        }
    }

</script>
<style>
/*选择快递*/
.popup-box {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 19;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.5)
}
.express-box {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	min-height: 21rem;
	padding: 1rem;
	background-color: #fff; 
	font-family: PingFangSC;
	font-size: 1.4rem;
}
.express-box-title {
	width: 100%;
	height: 2.6rem;
	line-height: 2.6rem;
	color: #6979b8;
}
.express-list {
	margin-right: -1.5rem;
}
.express-item {
	width: 7.75rem;
	height: 3rem;
	margin-right: 1.5rem;
	margin-top: 1.5rem;
	line-height: 3rem;
	background: #fff;
	text-align: center;
	border: 1px solid #999;
	border-radius: .4rem;
}
.express-item-on {
	background-color: #35bc2c;
	color: #fff;
	border: 1px solid #35bc2c;
}
</style>
