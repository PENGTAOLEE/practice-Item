<template>
	<div id="keyboard-box">
		<ul class="keyboard clearfix">
			<li class="fl" v-for="item in numArr" @touchend="selectNum">{{ item }}</li>
			<li class="fl delete" @touchend="deleteNum">
				<span class="shotsprites"></span>
			</li>
		</ul>
	</div>
</template>
<script>
    module.exports = {
        data: function() {
            return {
                numArr: [
                    '1','2','3','4','5','6','7','8','9','','0'
                ]
            }
        },
        mounted: function() {
            $('#keyboard-box').bind('contextmenu', function(e) {
                e.preventDefault();
            })
        },
        methods: {
            // 选中当前输入的值
            selectNum: function(ev) {
                var num = '';
                if (ev.target.tagName.toUpperCase() == 'LI' ) {
                    num = $(ev.target).text();
                };
                // 触发父组件事件 
                this.$emit('childEvent',num)
            },

            // 删除当前输入
            deleteNum: function(val) {
                this.$emit('deleteEvent');
            },

            // 当前点击样式
            addTouchStyle: function(ev) {
                this.removeTouchStyle()
                $(ev.target).addClass('touch-bg')
            },

            // 移除所有样式
            removeTouchStyle: function() {
                $('.keyboard li').removeClass('touch-bg')
            }
        }
    }

</script>
<style>
#keyboard-box {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 29;
	width: 100%;
}
.keyboard{
	background-color: #fff;
}
.keyboard li {
	width: 33.333%;
	height: 5.5rem;
	line-height: 5.5rem;
	text-align: center;
	font-family: Adobe Heiti Std;
	font-size: 2rem;
	color: #333;
	border-right: 1px solid #8c8c8c;
	border-bottom: 1px solid #8c8c8c;
	-webkit-touch-callout:none;
	  -webkit-user-select:none;
	   -khtml-user-select:none;
		 -moz-user-select:none;
		  -ms-user-select:none;
			  user-select:none;
}
.keyboard li:nth-child(3n){
	border-right: none;
}
.keyboard .delete{
	font-size: 0;
}
.keyboard .delete span{
	width: 2.3rem;
	height: 1.7rem;
	display: inline-block;
	background-position: -25.3rem -8.2rem;
	vertical-align: middle;
}
/*.input{
	height: 4.5rem;
	line-height: 4.5rem;
	margin:2rem 1.5rem;
	border:1px solid #ddd;
	border-radius: 0.3rem;
	outline: none;
	padding-left: 1rem;
	font-size: 1.5rem;
}*/
/*.input .copy{
	margin-right: 0.5rem;
}
.input .num{
	max-width: 24rem;
	overflow: hidden;
}
.input .sign{
	width:0;
	height: 2.8rem;
	border-left: 2px solid red;
	margin-top: 0.8rem;
	margin-left: 0.5rem;
}
.input .empty{
	width: 4.4rem;
	height: 4.4rem;
	background:url(cancel.png) no-repeat center center;
	background-size: 2.1rem 2.1rem;
}*/
.touch-bg {
	background: #999;
}
</style>
