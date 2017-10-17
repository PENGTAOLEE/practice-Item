<template>
<div class="identifyinfo">
    <div class="router_box clr">
        <!-- to="/authenticationenterpriseinfo/enterprise/1" -->
        <a @click="goto('/authenticationenterpriseinfo/enterprise/1',$event)" class="fl half">
            <div class="router_lf">
                <div class="content_box">
                    企业信息
                </div>  
            </div>
        </a>
        <!-- to="/authenticationenterpriseinfo/personal/2/2" -->
        <a @click="goto('/authenticationenterpriseinfo/personal/2/2',$event)" class="fl half">
            <div class="router_lf left_split">
                <div class="content_box split">
                    个人信息
                </div>  
            </div>
        </a>
        <!-- to="/authenticationenterpriseinfo/shop/2/3" -->
        <a @click="goto('/authenticationenterpriseinfo/shop/2/3',$event)" class="fl half" >
             <div class="router_lf left_split">
                 <div class="content_box split">
                    店铺信息
                 </div>
            </div>                  
        </a>

    </div>
    <router-view></router-view>
</div>
</template>
<script>
    import ajax  from 'ajax';
    export default {
        data: function(){
            return {
               step: 0,
            }
        },
        created () {
        },
        methods: {
            // 跳转
            goto (url,ev) {
                this.getAuthenStep();

                var stage = this.step.stage;
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
                    alert('请点击下一步填写下一步信息，谢谢！')
                }   
            },

            // 初始化a链接样式
            linkStyleInit () {
                this.getAuthenStep();
                var stage = this.step.stage; 
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
                      if(that.step.type=1){
                          that.step.stage = 0;
                      }

                    }else{
                       console.log("获取认证基本信息失败") 
                    }
                });
            }
        },
        mounted (){
            // 手动添加链接
            if (location.pathname == '/authenticationenterpriseinfo/personal/2/2') {
                $('.half').eq(1).addClass('router-link-active')
            } else if (location.pathname == '/authenticationenterpriseinfo/enterprise/1') {
                $('.half').eq(0).addClass('router-link-active')
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
    width: 33%;
}
a[disabled] {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
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
.left_split{
    border-left: 1px solid #ccc;
}
    /* routersection */





</style>