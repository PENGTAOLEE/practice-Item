<template>
<div class="bankCardPassword">
    <div class="bankCardPassword_title">{{title}}</div>
    <div class="bankCardPassword_cont">
        <div class="payContainer">
            <input readonly minlength="6" UNSELECTABLE="on" maxlength="6" type="number" class="payInput" ref="pwd" v-model="inp_v">
            <div class="paySimulation" @click="getKeyboard">
                <i><b></b></i>
                <i><b></b></i>
                <i><b></b></i>
                <i><b></b></i>
                <i><b></b></i>
                <i><b></b></i>
            </div>
        </div>
    </div>

    <!-- 键盘 -->
    <key-board v-show="showKeyboard" @childEvent="inputNum" @deleteEvent="deleteInput"></key-board>
</div>
</template>
<script>

    
    var keyBoard = require("@/components/component/keyboard")
    var ajax = require("ajax");
    

    module.exports = {
        
        props:['title'],
        data: function(){
            return {
                showKeyboard: false,                      // 默认隐藏键盘
                inputArr: [],                             // 模拟键盘输入值
                inp_v: '',                                //输入值

            }
        }, 
        components: {
            'key-board': keyBoard
        },
        mounted: function(){

        },
        methods: {
            // 调出键盘
            getKeyboard: function() {
                this.showKeyboard = true;
                $('.paySimulation').find("i").eq(0).addClass('active')
            },

            // 输入
            inputNum: function(num) {
                this.inputArr.push(num);
                this.inp_v = this.inputArr.join('');

                this.createDots(this.inp_v)
                this.loseCursor(this.inp_v.length)
            },

            // 删除
            deleteInput: function() {
                var $obj = $('.paySimulation');
                this.inputArr.pop()
                this.inp_v = this.inputArr.join('');

                $obj.find("i").eq(this.inp_v.length).addClass('active').siblings('i').removeClass('active');
                $obj.find("i").eq(this.inp_v.length).prevAll("i").find("b").css({"display":"block"});
                $obj.find("i").eq(this.inp_v.length - 1).nextAll("i").find("b").css({"display":"none"});

                if (this.inp_v.length == 0) {
                    $obj.find("i").eq(0).find("b").css({"display":"none"});
                };


                // this.createDots(this.inp_v.length)
            },

            // 模拟显示的圆点
            createDots: function(str) {
                var _this = this;
                var len = str.length;
                var obj = $('.paySimulation');
                var timer = null;

                obj.find("i").eq(len).addClass('active').siblings('i').removeClass('active');
                obj.find("i").eq(len).prevAll("i").find("b").css({"display":"block"});
                obj.find("i").eq(len - 1).nextAll("i").find("b").css({"display":"none"});

                if(len == 0){
                    obj.find("b").css({"display":"none"});
                } else if (len == 6){
                    obj.find("b").css({"display":"block"});
                    var inputValue = this.inp_v;
                    // 触发自定义事件
                    timer = setTimeout(function(){
                        clearTimeout(timer)
                        // 限制此处只能执行一次
                        _this.$emit('validate',inputValue)
                    },500)
                }
            },

            // 模拟失去光标
            loseCursor: function(len) {
                var _this = this;
                var input = $('.payInput');
                var obj = $('.paySimulation');
                if (len == 6) {
                    this.closeKeyboard()
                    // obj.find("i").eq(len-1).addClass('active');
                    obj.find("i").eq(0).addClass('active');
                }
                /*obj.find("i").eq(inp_l).addClass('active');*/
                // input.on('blur',function() {
                //     obj.find("i").removeClass('active');
                //     _this.inputArr = [];
                //     _this.inp_v = '';
                // })
            },

            // 关闭键盘
            closeKeyboard: function() {
                var input = $('.payInput');
                var obj = $('.paySimulation');
                obj.find("i").removeClass('active');
                this.inputArr = [];
                this.inp_v = '';
                this.showKeyboard = false;
            }
        }

    }

</script>
<style>
.bankCardPassword{
    padding-top:9rem;
}
.bankCardPassword_title{
    height:4.5rem;
    line-height:1;
    color: #333;
    font-size:1.7rem;
    text-align:center;
}
/* 模拟支付密码输入 */
.payContainer{
    position: relative;
    margin:0 auto;
    width:34.5rem;
    height:5.7rem;
    background-color: #fff;
}
.payInput{
    position: absolute;
    left:0;
    z-index: 1;
    width:100%;
    height:100%;
    opacity: 0.2;
    font-size: 12px;
    color: #fff;
    text-indent: -999em; 
    margin-left: -100%;
}
.paySimulation{
    display: -webkit-flex;
    display: flex;
    width:100%;
    height:100%;
    border: 1px solid #ccc;
}
.paySimulation i{
    position: relative;
    -webkit-flex: 1;
    flex: 1;
    height: 100%;
    float: left;
    display: block;
}
.paySimulation i:after{
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid #CCCCCC;
    color: #CCCCCC;
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
}
.paySimulation i:after:first-child{
    border: 0;
}
.paySimulation i.active{
    background-image: url("data:image/gif;base64,R0lGODlhAwAaAJECAB4eHgAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk5QUExQUQyMEM1MTFFNUIwOUU5QUFCMkJCRDUyMDkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk5QUExQUUyMEM1MTFFNUIwOUU5QUFCMkJCRDUyMDkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5OTlBQTFBQjIwQzUxMUU1QjA5RTlBQUIyQkJENTIwOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5OTlBQTFBQzIwQzUxMUU1QjA5RTlBQUIyQkJENTIwOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAkrAAIALAAAAAADABoAAAIPlC9gsS38HJyyxkuxU8gUACH5BAUrAAIALAAAAAADABoAAAIHlI+py+0PCwA7");
    background-repeat: no-repeat;
    background-position: center center;
    background-size:2% 70%;
}
.paySimulation b{
    margin:1.5rem auto;
    display: block;
    display: none;
    width: 50%;
    height: 50%;
    background-color: #000;
    border-radius: 100%;
}
</style>
