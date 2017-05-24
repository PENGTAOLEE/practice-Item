<template>
<div class="" >
    <!-- 未付款 -->
    <!--<template v-for = 'order in msg'>-->
    <div class="list-item"  v-for = "order in msg">
        <div class="list-item_hd clr">
            <router-link class="fl" :to="'/information/'+order.user_id">
                <i class="list-item_icon-userName icon-s_order icon-username vc"></i>
                <span class="list-item_userName vc">{{order.name}}</span>
                <i class="list-item_icon-triangle icon-s_admin icon-more vc"></i>
            </router-link>
            <div class="fr">
                <a class="list-item_icon-phone icon-s_order icon-phone vc" :href="'tel:'+order.buyer_mobile"></a>
                <span class="list-item_status vc" v-show="order.status==0">未付款</span>
                <span class="list-item_status vc" v-show="order.status==1||order.status==10">待发货</span>
                <span class="list-item_status vc" v-show="order.status==2">待收货</span>
                <span class="list-item_status vc" v-show="order.status==3||order.status==17||(order.is_refund_order==2&&order.status!==8)">交易完成</span>
                <span class="list-item_status vc" v-show="order.status==4||order.status==8||order.status==9||order.status==12||order.status==16">交易失败</span>
                <span class="list-item_status vc" v-show="(order.status==5&&order.is_refund_order!=2)||order.status==13">确认退货申请</span>
                <span class="list-item_status vc" v-show="(order.status==6&&order.is_refund_order!=2)||order.status==14">同意退货</span>
                <span class="list-item_status vc" v-show="(order.status==7&&order.is_refund_order!=2)||order.status==15">买家退货已发</span>
                <span class="list-item_status vc" v-show="order.status==11">确认退款申请</span>
            </div>
        </div>
        <router-link :to="'/sellerorderdetails/'+order.id">
            <div class="list-item_bd clr"  >
                <div class="fl re">
                    <img :src="url+ JSON.parse(order.thumb).url" class="list-item_pic" alt="">
                    <span class="send" v-show="order.is_mail">包邮</span>
                    <span class="quit" v-show="order.is_refund">包退</span>
                </div>
                <div class="fl list-item_area">
                    <div class="list-item_title">{{order.desc}}</div>
                    <div class="list-item_price-status" v-show="(order.status!=8&&order.is_refunded!=2)&&(order.status!=12)&&(order.status!=4)&&order.status!=9&&order.status!=16">成交金额：￥{{order.price}}</div>
                    <div class="list-item_price-status" v-show="order.status==8&&order.is_refund!=2">失败原因： 买家退货</div>
                        <div class="list-item_price-status" v-show="order.status==16">失败原因： 买家退货</div>
                        <div class="list-item_price-status" v-show="order.status==9">失败原因： 买家拒绝收货</div>
                        <div class="list-item_price-status" v-show="order.status==12">失败原因： 买家申请退款</div>
                        <div class="list-item_price-status" v-show="order.status==4">失败原因： 买家未付款</div>
                    <div class="list-item_stopTime" v-show="order.status==0">付款截止：{{order.pay_deadline}}</div>
                    <div class="list-item_stopTime" v-show="order.status==1||order.status==10">发货期限：{{order.deadline}}</div>
                    <div class="list-item_stopTime" v-show="order.status==11">付款时间：{{order.pay_time}}</div>
                    <div class="list-item_stopTime" v-show="order.status==13||(order.status==5&&order.is_refund_order!=2)">确认截止：{{order.end_time}}</div>
                    <div class="list-item_stopTime" v-show="order.status==12||order.status==4||order.status==9||order.status==8||order.status==16">失败时间：{{order.updatetime}}</div>
                    <div class="list-item_stopTime" v-show="order.status==2">成交时间：{{order.last_time}}</div>
                    <div class="list-item_stopTime" v-show="(order.status==6&&order.is_refund_order!=2)||order.status==14">同意时间：{{order.updatetime}}</div>
                    <div class="list-item_stopTime" v-show="order.status==15||(order.status==7&&order.is_refund_order!=2)">确认截止：<count-down-day :starttime="order.current_time" :endtime="order.future_time"></count-down-day ></div>
                    <div class="list-item_stopTime" v-show="order.status==3||(order.is_refund_order==2&&order.status!=8)||order.status==17">成交时间：{{order.last_time}}</div>
                </div>
            </div>
        </router-link>
        <div class="list-item_ft">
            <div class="list_item_price bdb" v-show="order.status==0">应付：￥{{order.price}}</div>
            <div class="list-item_btn-area" v-show = "order.status!=1||order.status!=10">
                <a href="javascript:;" class="list-item_btn list-item_btn__red" v-show="order.status==0&&(order.is_ftf_pay==0)&&(order.deposit_price==0)&&(order.is_refund==0)&&(order.is_ftf_pay!=3)" @click="deliver(order.id,1)">当面交易</a>
                <!--  <a @click.prevent="goSendGood(order.id)" class="list-item_btn list-item_btn__red" v-show="order.status==1||order.status==10">立即发货</a> -->
                 <router-link :to="'/sellersendgood/'+order.id" class="list-item_btn list-item_btn__red" v-show="order.status==1||order.status==10">立即发货</router-link> 
 
                
                <router-link :to="'/selleragreereturn/'+order.id" class="list-item_btn list-item_btn__red" v-show="(order.status==5&&order.is_refund_order!=2)||order.status==13">同意退货</router-link>
                 <router-link :to="'/sellerrefuse/'+order.id+'/3'" class="list-item_btn list-item_btn__red" v-show="order.status==11">拒绝退款</router-link>
                 <router-link :to="'/sellerrefuse/'+order.id+'/5'" class="list-item_btn list-item_btn__red" v-show="order.status==13">拒绝退货</router-link>
                <router-link :to="'/selleragreerefund/'+order.id" class="list-item_btn list-item_btn__red" v-show="order.status==11">同意退款</router-link>
                <router-link :to="'/selleragreerefund/'+order.id" class="list-item_btn list-item_btn__red" v-show="(order.status==7&&order.is_refund_order!=2)||order.status==15">确认退款</router-link>
            </div>
        </div>
    </div>
    <show-confirm :msg="tipmsg" :tit_con="tit" v-show="model_window" @childEvent ="gotoHandle" @closeBox = "close"></show-confirm>
    <div class="space">
    </div>
    <div class="contentNull" v-show="msg==''">
        亲，还没有相关订单！
    </div>
</div>




</template>
<script>


    module.exports = {
        
        props: ["msg"],
        data: function(){
            return{
                model_window: false,
                order_id: "",
                tipmsg: "",
                tit: "",
                type: "",
                url: ""
            }
        },
        components: {
            "show-confirm": showConfirm,
            "count-down-day": countDownDay
        },
        mounted: function() {
        },
        created: function(){
            this.url = config.img_url; 
        },
        methods: {
           deliver: function(id,type){
                this.order_id = id;
                this.model_window = true;
               this.type = type;
               if(type ==1){
                    this.tipmsg = "自行完成收货和发货，交易完成提醒买家确认收货和评价";
                    this.tit = "当面交易";
               }
           },
            gotoHandle: function(){
                var that = this;
                var id = this.order_id;
                var request_type = this.type;
                var url = "/sellerorderdetails/"
                console.log(that.order_id);
                if( request_type==1){
                    ajax.orderHandle(id,request_type,'','',function(data){
                        if(data.status == 200){

                            console.log("当面交易申请成功");
                            that.$router.push(url+id);
                        }else{
                            alert(data.msg);
                        }
                    });
                }
                
            },
            close: function(){
                this.model_window = false;
            }
            // goSendGood: function(id){
            //     var order_id = id;
            //     this.$router.push("/sellersendgood/"+order_id);
            // }
        }
    }

</script>
<style>
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
.space{
    background-color: rgb(248, 248, 248);
    width: 100%;
    height: 6rem;
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
