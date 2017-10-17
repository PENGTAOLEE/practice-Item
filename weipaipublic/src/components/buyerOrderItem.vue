<template>
<div class="" >
    <!-- 未付款 -->
    <!--<template v-for = 'order in msg'>-->


        <div class="list-item"  v-for = "order in msg">
            <div class="list-item_hd clr">
                <router-link class="fl" :to="'/shops/'+order.payee_id+'?type=2'">
                    <i class="list-item_icon-userName icon-s_order icon-username vc"></i>
                    <span class="list-item_userName vc">{{order.shop_name}}</span>
                    <i class="list-item_icon-triangle icon-s_admin icon-more vc"></i>
                </router-link>
                <div class="fr">
                    <a class="list-item_icon-phone icon-s_order icon-phone vc" :href="'tel:'+order.shop_mobile" ></a>
                    <span class="list-item_status vc" v-show="order.status==0">未付款</span>
                    <span class="list-item_status vc" v-show="order.status==1||order.status==10">待发货</span>
                    <span class="list-item_status vc" v-show="order.status==2">未确认收货</span>
                    <span class="list-item_status vc" v-show="order.status==3||order.status==17||(order.is_refund==2&&order.status!=8)">交易完成</span>
                    <span class="list-item_status vc" v-show="order.status==13">申请退货</span>
                    <span class="list-item_status vc" v-show="order.status==11">申请退款</span>
                    <span class="list-item_status vc" v-show="order.status==5&&order.is_refund!=2">等待卖家同意退货</span>
                    <span class="list-item_status vc" v-show="(order.status==6&&order.is_refund!=2)||order.status==14">同意退货</span>
                    <span class="list-item_status vc" v-show="order.status==7">等待卖家确认</span>
                    <span class="list-item_status vc" v-show="order.status==15">等待卖家确认</span>
                    <span class="list-item_status vc" v-show="order.status==4||order.status==8||order.status==9||order.status==12||order.status==16">交易失败</span>
                </div>
            </div>
            <router-link :to="'/buyerorderdetails/'+order.id">
                <div class="list-item_bd clr"  >
                    <div class="fl re">
                        <img :src="url+JSON.parse(order.thumb).url +'?x-oss-process=image/resize,w_800'" class="list-item_pic" alt="">
                        <span class="send" v-show="order.is_mail_goods">包邮</span>
                        <span class="quit" v-show="order.is_refund_goods">包退</span>
                    </div>
                    <div class="fl list-item_area">
                        <div class="list-item_title">{{order.desc}}</div>
                        <div class="list-item_price-status" v-show="(!(order.status==8&&order.is_refund==2))&&(order.status!=12)&&(order.status!=4)&&order.status!=9&&order.status!=16">成交金额：￥{{order.price}}</div>
                        <div class="list-item_price-status" v-show="order.status==8">失败原因: 买家退货</div>
                        <div class="list-item_price-status" v-show="order.status==16">失败原因: 买家退货</div>
                        <div class="list-item_price-status" v-show="order.status==9">失败原因: 买家拒绝收货</div>
                        <div class="list-item_price-status" v-show="order.status==12">失败原因: 买家申请退款</div>
                        <div class="list-item_price-status" v-show="order.status==4">失败原因: 买家未付款</div>
                        <div class="list-item_stopTime" v-show="order.status==0">付款截止：<count-down-hour :endtime="order.pay_end_time" :starttime="order.current_time"></count-down-hour></div>
                        <div class="list-item_stopTime" v-show="order.status==1||order.status==10||order.status==11||order.status==13">付款时间：{{order.paytime}}</div>
                        <div class="list-item_stopTime" v-show="order.status==3||order.status==17||(order.is_refund==2&&order.status!=8)||order.is_ftf_pay==5">成交时间：{{order.updatetime}}</div>
                        <div class="list-item_stopTime" v-show="order.status==5&&order.is_refund!=2">申请时间：{{order.updatetime}}</div>
                         <div class="list-item_stopTime" v-show="order.status==14||(order.status==6&&order.is_refund!=2)">同意时间：{{order.updatetime}}</div>
                          <div class="list-item_stopTime" v-show="order.status==15||(order.status==7&&order.is_refund!=2)">退货时间：{{order.updatetime}}</div>
                         <div class="list-item_stopTime" v-show="order.is_ftf_pay==1||order.status==2">确认截止：<count-down-day :starttime="order.current_time" :endtime="order.confirm_end_time"></count-down-day></div>
                         <div class="list-item_stopTime" v-show="order.status==8||order.status==12||order.status==4||order.status==9">失败时间：{{order.updatetime}}</div>
                    </div>
                </div>
            </router-link>
            <div class="list-item_ft">
                <div class="list_item_price bdb" v-show="order.status==0">应付：￥{{order.price}}</div>
                <div class="list-item_btn-area" v-show = "order.status!=1">
                    <a href="javascript:;" class="list-item_btn list-item_btn__red" 
                        v-show="order.status==0&&order.is_delay_pay==0" @click="deliver(order.id,5)">
                      延迟付款
                    </a>
                    <!-- 立即付款 -->
                    <!-- :to="'/payment/0?type=order&orderid=' + order.id + '&ordertype=3'" -->
                    <div 
                        @click="goTo('/payment/0?type=order&orderid=' + order.id + '&ordertype=3')"
                        class="list-item_btn list-item_btn__red" 
                        v-show="order.status==0"
                    >
                        立即付款
                    </div>
                    
                    <!--<router-link :to="'/application/'+order.id+'/1'" class="list-item_btn list-item_btn__red" v-show="order.status==10">申请退款</router-link>
                    <router-link :to="'/application/'+order.id+'/2'" class="list-item_btn list-item_btn__red" v-show="order.is_application_returns&&order.is_ftf_pay!=1">申请退货</router-link>
                     <router-link :to="'/application/'+order.id+'/2'" class="list-item_btn list-item_btn__red" v-show="order.status==3&&order.is_refund_goods==1&&order.is_refund!=2">申请退货</router-link>-->
                    <a href="javascript:;" class="list-item_btn" v-show="order.is_ftf_pay==1" @click="deliver(order.id,1)">拒绝当面交易</a>
                    <a href="javascript:;" class="list-item_btn"v-show="order.status==2&&order.is_ftf_pay!=1&&order.is_delay!=1" @click="deliver(order.id,2)">延迟收货</a>
                    
                    <a href="javascript:;" class="list-item_btn" v-show="order.is_ftf_pay==1" @click="deliver(order.id,4)">拒绝收货</a>
                    
                    <a href="javascript:;" class="list-item_btn" v-show="order.status==11" @click="deliver(order.id,6)">取消申请</a>                    
                    <router-link :to="'/buyernowreturn/'+order.id" class="list-item_btn" v-show="(order.status==6&&order.is_refund!=2)||order.status==14">立即退货</router-link>
                    <a href="javascript:;" class="list-item_btn list-item_btn__red" v-show="order.status==2||(order.status==5&&order.is_refund!=2)||(order.status==6&&order.is_refund!=2)||order.status==13||order.status==14||order.status==15" @click="translate(order.id,3,order.is_refund_goods,order.is_refunded,order.status,order.is_ftf_pay)">确认收货</a>
                    <!--@click="showConf=!showConf"-->
                    <router-link :to="'/buyerorderevaluate/'+order.id" class="list-item_btn list-item_btn__red" v-if="$route.params.id==5">立即评价</router-link>
                </div>
            </div>
        </div>
    <show-confirm v-show="showConf" :msg="tipMsg" @childEvent="goReceived" @closeBox="close"></show-confirm>
    <show-confirm v-show="handle" :msg="tipMsg" :tit_con="tit1" @childEvent="goExecute" @closeBox="cancel"></show-confirm>
    <div class="contentNull" v-show="msg==''">
        亲，还没有相关订单
    </div>

</div>



   


</template>
<script>

    
    var showConfirm = require("@/components/component/showConfirm")
    var ajax = require("ajax");
    var countDownHour = require("@/components/countdownhour")
    var countDownDay = require("@/components/countdownday")
    var config = window.config;
    

    module.exports = {
        
        props: ["msg"],
        mounted: function () {
            //console.log(this.msg)
        },
        data: function () {
            return {
                showConf: false,//确认收货按钮的弹框
                handle: false, //拒绝当面交易的弹框和延迟收货的弹框
                is_refund: 0,
                tipMsg: "",     //弹出框的提示信息
                order_id: "",   //将被操作的订单id
                type:"",
                tit1 : "",             //弹出框确认栏文本
                status: "",
                is_refunded: "",
                is_ftf_pay: "",
                url: ""
            }
        },
        components: {
            "show-confirm": showConfirm,
            "count-down-hour": countDownHour,
            "count-down-day": countDownDay,
        },
        created: function(){
            this.url = window.config.img_url;
        },
        methods: {
            
            translate: function (id,type,is_refund_goods,is_refunded,status,is_ftf_pay) {
                this.order_id = id;
                this.showConf = true;
                this.status = status;
                this.is_refunded = is_refunded;
                this.is_ftf_pay = is_ftf_pay;
                if(type==3){//确认收货
                    if(status==14||status==15||status==5||status==6){
                        this.tipMsg= "您确认取消退货申请，确认退货？<br> 本次收货后将无法再次申请退货";
                    }else{
                        if (is_refund_goods == 1) {
                            this.tipMsg = "该拍品7天包退，确认后可在7天内申请退货";
                        }else if (is_refund_goods == 0) {
                            this.tipMsg = "确认后将无法再退货，货款将支付给卖家，<br>请确认货品完好无误";
                        }
                    }
                }
            },
            deliver: function(id,type){
                this.order_id = id;
                this.handle = true;
                this.type = type;
                if(type==1){
                    this.tipMsg = "您确认要拒绝当面交易并去支付货款吗？";
                    this.tit1 = "拒绝当面交易并付款";
                }else if(type==2){
                    this.tipMsg = "您确认延迟收货吗？";
                    this.tit1 = "延迟收货";
                }else if(type==4){
                    this.tipMsg = "您确认拒绝收货吗？";
                    this.tit1 = "拒绝收货";
                }else if(type==5){
                    this.tipMsg = "您确认延迟付款吗？";
                    this.tit1 = "延迟付款";
                }else if(type==6){
                    this.tipMsg = "您确认取消申请退款吗？";
                    this.tit1 = "取消申请退款";
                }
                

            },
            
            //<---确认收货发送的ajax函数
            goReceived: function () {
                var that = this;
                var order_id = that.order_id;
                var status = that.status;
                var is_ftf_pay = that.is_ftf_pay;
                if(status == 13||status == 14|| status==15 || status ==5 ||status ==6){
                        ajax.cancelRefund(order_id,function(data){
                            if(data.status == 200){
                                console.log("确认收货和取消申请退货成功");
                                that.showConf = false;
                                that.$router.push("/buyerorderdetails/"+order_id);
                            }else{
                                console.log("确认收货和取消申请退货失败原因为： "+data.msg);
                            }
                        });
                }else{
                    ajax.goConfirm(order_id,'','','',function (data) {
                        if (data.status == 200) {
                            console.log("收货成功");
                            that.$router.push("/buyerorderdetails/"+order_id);
                        } else {
                            console.log(data.msg);
                    }
                });
                }
                
            },
            //确认收货发送的ajax函数-->
            //延迟收货发送的ajax函数
            goExecute: function () {
                var that = this;
                var order_id = that.order_id;
                var type = that.type;
                if(type==1){//拒绝当面交易
                    var key = 1;
                    ajax.goRefuse(order_id,key,function (data) {
                        if (data.status == 200) {
                            console.log("拒绝当面交易成功");
                        that.$router.push("/buyerorderdetails/"+order_id);
                        }else{
                            console.log(data.msg)
                        }
                    });
                }else if(type ==2){//延迟收货的提交  ||延迟付款
                    ajax.goDelay(order_id, function (data) {
                        if (data.status == 200) {
                            console.log("延迟收货成功");
                            that.$router.push("/buyerorderdetails/"+order_id);
                     
                         } else {
                             console.log(data.msg)
                         }
                    });
                }else if(type==4){//拒绝收货成功
                    var key = 2;
                    ajax.goRefuse(order_id,key,function (data) {
                        if (data.status == 200) {
                            console.log("拒绝收货成功");
                            that.$router.push("/buyerorderdetails/"+order_id);
                     
                        }else{
                            console.log(data.msg)
                        }
                    });
                }else if(type==5){//延迟付款成功
                    ajax.goDelay(order_id, function (data) {
                        if (data.status == 200) {
                            console.log("延迟付款成功");
                            that.$router.push("/buyerorderdetails/"+order_id);
                       
                         } else {
                             console.log(data.msg)
                         }
                    });
                }else if(type==6){//取消申请退款成功
                    ajax.cancelRefund(order_id, function (data) {
                        if (data.status == 200) {
                            console.log("取消申请退款成功");
                            that.$router.push("/buyerorderdetails/"+order_id);
                    
                         } else {
                             console.log(data.msg)
                         }
                    });
                }
            
            },
            //延迟收货发送的ajax函数
            //确认收货关闭弹窗
            close: function () {
                this.showConf = false;
            },
            //确认收货关闭弹窗
            //延迟收货关闭弹窗以及拒绝当面交易的弹窗
            cancel: function(){
                this.handle = false;
            },
            //延迟收货关闭弹窗以及拒绝当面交易的弹窗

            // 跳转
            goTo: function(url){
                window.location.href = url + '&round=' + new Date().getTime()
            }
        }
    }

</script>
<style scoped>
.list-item{
    margin-top:1rem;
    background-color: #fff;
}
.list-item_hd{
    padding:0.9rem 1.5rem;
    font-size:0;
}
.list-item_userName{
    margin:0 .8rem;
    color: #333;
    font-size:1.6rem;
}
.list-item_status{
    padding-left:1rem;
    color: #ad1a1a;
    font-size:1.5rem;
}
.list-item_bd{
    padding:1rem 1.5rem;
    display: block;
    background-color: #f8f8f8;
}
.list-item_pic{
    display: block;
    width:7rem;
    height:7rem;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: .3rem;
}
.list-item_area{
    margin-left:1rem;
}
.list-item_title{
    margin:0.5rem 0 1.2rem;
    line-height:1;
    color: #333;
    font-size:1.6rem;

    /*一行显示*/
    width: 17rem;
    word-break: keep-all;/* 不换行 */
    white-space: nowrap;/* 强制在同一行内显示所有文本，直到文本结束或者遭遇 br 对象。不换行 */
    overflow: hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis;/* IE 专有属性，当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    /*一行显示*/
}
.list-item_price-status, .list-item_stopTime{
    line-height:1.8rem;
    color: #999;
    font-size:1.4rem;
}
.list_item_price{
    padding:1rem 1.5rem;
    line-height:1;
    text-align: right;
    color: #333;
    font-size:1.6rem;
}
.list-item_btn-area{
    padding:0.8rem 1.5rem;
    text-align: right;
}
.list-item_btn{
    margin-left:1.3rem;
    padding:0 .6rem;
    display: inline-block;
    height:2.6rem;
    line-height:2.6rem;
    color: #666;
    font-size:1.4rem;
    border: 1px solid #666;
    border-radius: 0.15rem;
}
.list-item_btn__red{
    color: #ad1a1a;
    border: 1px solid #ad1a1a;
}

.send,.quit{
    position: absolute;
    bottom:.3rem;
    display: inline-block;
    width:2.7rem;
    height:1.4rem;
    line-height:1.4rem;
    text-align: center;
    font-size:1.1rem;
    color: #fff;
    border-radius: .3rem;
}
.send{
    left:.6rem;
    background-color: #fa693c;
}
.quit{
    right:.6rem;
    background-color: #6699ff;
}
.contentNull{
    width: 100%;
    height: 100%;
    font-size: 1.6rem !important;
    text-align: center;
    vertical-align: middle;
    color: #999;
}
</style>
