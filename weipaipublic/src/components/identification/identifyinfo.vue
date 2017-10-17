<template>
<div class="identifyinfo">
            <div class="router_box clr">
                
                <a @click="goto('/authenticationinfo/personal/1/2',$event)" class="fl half">
                    <div class="router_lf">
                        <div class="content_box">
                            个人信息
                        </div>  
                    </div>
                </a>
                <a @click="goto('/authenticationinfo/shop/1/3',$event)" class="fl half" >
                     <div class="router_rt">
                         <div class="content_box split">
                            店铺信息
                         </div>
                    </div>                  
                </a>

            </div>
            <router-view></router-view>
            <show-alert v-if="is_alert" :msg='alert_msg' @closeBox='closeAlert'></show-alert>
</div>
</template>
<script>
    import ajax  from 'ajax';
    import showAlert from '@/components/component/showAlert'
    export default {
        data: function(){
            return {
               step: 0,
               is_alert: false,
               alert_msg: ''
            }
        },
        components: {
            "show-alert": showAlert
        },
        created () {
        },
        methods: {
            // 跳转
            goto (url,ev) {
                this.getAuthenStep();

                var stage = this.step.stage -1;
                var arr = [];
                for (var i = 0; i < stage; i++) {
                    arr.push( i )
                };

                var isPass = this.isJump($(ev.target),arr);
                if (isPass) {
                    this.$router.push(url); 

                    $('.half').removeClass('router-link-active');

                    if ($(ev.target).parents('.half') ) {
                        $(ev.target).parents('.half').addClass('router-link-active');
                    };
                   
                    if ( $(ev.target).hasClass('half') ) {
                        $(ev.target).addClass('router-link-active');
                    };
                } else {
                    // alert('请点击下一步填写下一步信息，谢谢！')
                    this.alert_msg = '请点击下一步填写下一步信息，谢谢！'
                    this.is_alert = true;
                }   
            },

            // 初始化a链接样式
            linkStyleInit () {
                this.getAuthenStep();
                var stage = this.step.stage - 1; 
                var arr = [];
                for (var i = 0; i < stage; i++) {
                    arr.push( $('.half').eq(i) )
                };
                $('.half').attr('disabled',true);
                for (var i = 0; i < arr.length; i++) {
                    arr[i].attr('disabled',false);
                };
                if (!arr.length) {
                    $('.half').eq(0).attr('disabled',false);
                };
                
                
            },
            
            /**
             * 当前点击元素是否可以跳转
             * @param  {object}  ev  当前点击的元素
             * @param  {array}   arr 可以跳转元素下标的数组
             * @return {Boolean}     当前元素是否可以跳转
             */
            isJump ($obj,arr) {
                var isJumpBoll = false;
                if ($obj.parents('.half').hasClass('half') || $obj.hasClass('half')) {
                    if ($obj.parents('.half').hasClass('half')) {
                        var $node = $obj.parents('.half');
                    };
                    if ($obj.hasClass('half')) {
                        var $node = $obj;
                    };
                    var emitIndex = $('.half').index( $node );
                    var index = arr.indexOf(emitIndex);
                    if(index >= 0){
                        isJumpBoll = true;
                    }
                };

                return isJumpBoll;
            },

            getAuthenStep: function(){
               var that = this; 
                ajax.getAuthenStep(function(data){
                    if(data.status==200){
                      that.step = data.data;
                    }else{
                       console.log("获取认证基本信息失败") 
                    }
                });
            },
            closeAlert: function(){
                this.is_alert = false;
            }

            
        },
        mounted (){
            // 手动添加链接
            if (location.pathname == '/authenticationinfo/personal/1/2') {
                $('.half').eq(0).addClass('router-link-active')
            } else if (location.pathname == '/authenticationinfo/shop/1/3') {
                $('.half').eq(1).addClass('router-link-active')
            }

            // 禁止点击的a连接样式
            this.linkStyleInit();
        },
    }

</script>
<style scoped>
.identifyinfo {
    background-color: #F6F6F6;
}
    /* routersection */
.router_box{
    width: 100%;
    font-size: 1.6rem;
    border-bottom: 1px solid #ccc;
}
.half{
    width: 50%;
}
.router-link-active:after{
    content: "";
    display: block;
    width: 60%;
    height: .2rem;
    margin: 0 auto;
    border-bottom: .2rem solid red;
}
.router_lf{
    width: 100%;
}
.content_box{
    margin: 1.6rem auto;
    text-align: center;
}
.router_rt{
    width: 100%;
    border-left: 1px solid #ccc;
}
    /* routersection */
a[disabled] {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
}




</style>
