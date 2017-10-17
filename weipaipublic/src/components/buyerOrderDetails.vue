<template>
<div>
    
    <div class="hint">
        <div class="hint_item bdb" v-if="data.co_status==1&&((data.is_refund==2&&data.status!=8)||(data.status==17)||(data.status==3&&data.is_refund!=2))">
            <div class="hint_title">已评价 </div>
            <span class="hint_des">评价时间：{{data.co_inputtime}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.is_refund==2&&data.status!=8">
            <div class="hint_title">已确认收货，交易完成 </div>
            <span class="hint_des">收货时间：{{time.receiveTime}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==8">
            <div class="hint_title">交易失败 </div>
            <span class="hint_des" >失败原因： 买家退货</span><br>
            <span class="hint_des">确认时间：{{time.returnSucTime}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==7&&data.is_refund!=2">
            <div class="hint_title">退货已发出，等待卖家确认 </div>
            <span class="hint_des">发出时间：{{time.receiveTime}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==6&&data.is_refund!=2">
            <div class="hint_title">卖家同意退货 </div>
            <span class="hint_des">同意时间：{{time.agreeReturnTime}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==5&&data.is_refund!=2">
            <div class="hint_title">退货申请 </div>
            <span class="hint_des">申请时间：{{time.appReturnTime}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==3&&data.is_refund!=2">
            <div class="hint_title">已确认收货，交易完成 </div>
            <span class="hint_des">收货时间：{{time.receiveTime}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==17">
            <div class="hint_title">已确认收货，交易完成 </div>
            <span class="hint_des">收货时间：{{time.sellerAgreeReturn48}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==16">
            <div class="hint_title">确认退款 </div>
            <span class="hint_des">确认时间：{{time.appAgree48}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==15">
            <div class="hint_title">退货已发出，等待卖家确认 </div>
            <span class="hint_des">退货时间：{{time.appNowReturn48}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==14">
            <div class="hint_title">卖家同意退货 </div>
            <span class="hint_des">同意时间：{{time.appAgreeReturn48}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==13">
            <div class="hint_title">退货申请 </div>
            <span class="hint_des">申请时间：{{time.appReturn48}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==9">
            <div class="hint_title">交易失败</div>
            <span class="hint_des" >失败原因： 买家拒绝收货</span><br>
            <span class="hint_des">结束时间：{{time.failTime}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.is_ftf_pay==4||data.is_ftf_pay==5">
            <div class="hint_title">已发货</div>
            <span class="hint_des">发货时间：{{time.ftfSendTime}}</span>
        </div>
        <div class="hint_item bdb" v-if="(data.status>=3&&(data.status<=8&&data.status!=4)&&(data.status!=4)&&(data.is_ftf_pay!=5))||(data.status>=13)">
            <div class="hint_title">已发货</div>
            <span class="hint_des">发货时间：{{time.sendTime}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==2">
            <div class="hint_title">已发货,等待确认</div>
            <span class="hint_des">发货时间：{{time.sendTime||time.ftfSendTime}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==12">
            <div class="hint_title">交易失败</div>
            <span class="hint_des" >失败原因： 卖家未发货</span><br>
            <span class="hint_des">结束时间：{{time.timeoutappsuc}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==11">
            <div class="hint_title">申请退款，等待卖家确认</div>
            <span class="hint_des">付款时间：{{time.timeout}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status!=4&&data.status!=0&&data.is_ftf_pay!=1&&data.is_ftf_pay!=4&&data.is_ftf_pay!=5&&data.status!=1&&data.status!=10" >
            <div class="hint_title">已付款</div>
            <span class="hint_des">付款时间：{{time.payTime}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==1||data.status==10">
            <div class="hint_title">买家已付款，等待卖家发货</div>
            <span class="hint_des">付款时间：{{time.payTime}}</span>
        </div>
        <div class="hint_item bdb" v-if="data.status==4">
            <div class="hint_title">交易失败</div>
            <span class="hint_des">失败原因： 买家未按时付款</span><br>
            <span class="hint_des">结束时间：{{time.failTime}}</span>
        </div>
        <div class="hint_item bdb" >
            <div class="hint_title">竞拍成功{{data.status==0?"，立即付款":""}}</div>
            <span class="hint_des">截止时间：{{time.sucpaiTime}}</span>
            <router-link  :to="'/payment/0?type=order&orderid=' + $route.params.id + '&ordertype=3'" class="nowpay" v-show="data.status==0">
                    <span class="hint_des">付款&nbsp;&nbsp;</span><i class="icon-s_admin icon-more"></i>
            </router-link>
        </div>
        <div class="hint_item bdb" >
            <div class="hint_title">开始竞拍</div>
            <span class="hint_des">开始时间：{{time.kaipaiTime}}</span>
        </div>
    </div>

    <!-- 订单基本信息-->
         <div class="list-item">
            <div class="list-item_hd clr">
                <router-link class="fl" :to="'/shops/'+data.payee_id+'?type=2'">
                    <i class="list-item_icon-userName icon-s_order icon-username vc"></i>
                    <span class="list-item_userName vc">{{data.shop_name}}</span>
                    <i class="list-item_icon-triangle icon-s_admin icon-more vc"></i>
                </router-link>
                <div class="fr">
                    <a class="list-item_icon-phone icon-s_order icon-phone vc" :href="'tel:'+data.shop_mobile" ></a>
                    <span class="list-item_status vc" v-show="data.status==0">未付款</span>
                    <span class="list-item_status vc" v-show="data.status==1||data.status==10">待发货</span>
                    <span class="list-item_status vc" v-show="data.status==2">未确认收货</span>
                    <span class="list-item_status vc" v-show="data.status==3||(data.status==17)||(data.is_refund==2&&data.status!=8)">交易完成</span>
                    <span class="list-item_status vc" v-show="data.status==13">申请退货</span>
                    <span class="list-item_status vc" v-show="data.status==11">申请退款</span>
                    <span class="list-item_status vc" v-show="data.status==5&&data.is_refund!=2">等待卖家同意退货</span>
                    <span class="list-item_status vc" v-show="(data.status==6&&data.is_refund!=2)||data.status==14">同意退货</span>
                    <span class="list-item_status vc" v-show="data.status==7">等待卖家确认</span>
                    <span class="list-item_status vc" v-show="data.status==15">等待卖家确认</span>
                    <span class="list-item_status vc" v-show="data.status==4||data.status==8||data.status==9||data.status==12||data.status==16">交易失败</span>
                </div>
            </div>
            <router-link :to="'/lotdetails/'+data.goods_id">
                <div class="list-item_bd clr"  >
                    <div class="fl re">
                        <img v-if="data.thumb" :src="url+JSON.parse(data.thumb).url+'?x-oss-process=image/resize,w_800'" class="list-item_pic" alt="">
                        <span class="send" v-show="data.is_mail_goods">包邮</span>
                        <span class="quit" v-show="data.is_refund_goods">包退</span>
                    </div>
                    <div class="fl list-item_area">
                        <div class="list-item_title">{{data.desc}}</div>
                        <div class="list-item_price-status" v-show="(data.status!=8)&&(data.status!=12)&&(data.status!=4)&&data.status!=9&&data.status!=16">成交金额：￥{{data.price}}</div>
                        <div class="list-item_price-status" v-show="data.status==8">失败原因: 买家退货</div>
                        <div class="list-item_price-status" v-show="data.status==16">失败原因: 买家退货</div>
                        <div class="list-item_price-status" v-show="data.status==9">失败原因: 买家拒绝收货</div>
                        <div class="list-item_price-status" v-show="data.status==12">失败原因: 买家申请退款</div>
                        <div class="list-item_price-status" v-show="data.status==4">失败原因: 买家未付款</div>
                        <div class="list-item_stopTime" v-show="data.status==0">付款截止：<count-down-hour :endtime="data.pay_end_time" :starttime="data.current_time"></count-down-hour></div>
                        <div class="list-item_stopTime" v-show="data.status==1||data.status==10||data.status==11||data.status==13">付款时间：{{data.paytime}}</div>
                        <div class="list-item_stopTime" v-show="data.status==3||data.status==17||(data.is_refund==2&&data.status!=8)||data.is_ftf_pay==5">成交时间：{{data.updatetime}}</div>
                        <div class="list-item_stopTime" v-show="data.status==5&&data.is_refund!=2">申请时间：{{data.updatetime}}</div>
                         <div class="list-item_stopTime" v-show="data.status==14||(data.status==6&&data.is_refund!=2)">同意时间：{{data.updatetime}}</div>
                          <div class="list-item_stopTime" v-show="data.status==15||(data.status==7&&data.is_refund!=2)">退货时间：{{data.updatetime}}</div>
                         <div class="list-item_stopTime" v-show="data.is_ftf_pay==1||data.status==2">确认截止：<count-down-day :starttime="data.current_time" :endtime="data.confirm_end_time"></count-down-day></div>
                         <div class="list-item_stopTime" v-show="data.status==8||data.status==12||data.status==4||data.status==9">失败时间：{{data.updatetime}}</div>
                    </div>
                </div>
            </router-link>
            <div class="list-item_ft">
                <div class="list_item_price bdb" v-show="data.status==0">应付：￥{{data.price}}</div>
                <div class="list-item_btn-area" v-show = "data.status!=1">
                    <a href="javascript:;" class="list-item_btn list-item_btn__red" 
                        v-show="data.status==0&&data.is_delay_pay==0" @click="deliver(5)">
                      延迟付款
                    </a>
                    <!-- 立即付款 -->
                    <!-- :to="'/payment/0?type=order&orderid=' + data.id + '&ordertype=3'" -->
                    <div 
                        @click="goTo('/payment/0?type=order&orderid=' + data.id + '&ordertype=3')"
                        class="list-item_btn list-item_btn__red" 
                        v-show="data.status==0"
                    >
                        立即付款
                    </div>
                    
                    <!--<router-link :to="'/application/'+data.id+'/1'" class="list-item_btn list-item_btn__red" v-show="data.status==10">申请退款</router-link>
                    <router-link :to="'/application/'+data.id+'/2'" class="list-item_btn list-item_btn__red" v-show="data.is_application_returns&&data.is_ftf_pay!=1">申请退货</router-link>
                     <router-link :to="'/application/'+data.id+'/2'" class="list-item_btn list-item_btn__red" v-show="data.status==3&&data.is_refund_goods==1&&data.is_refund!=2">申请退货</router-link>-->
                    <a href="javascript:;" class="list-item_btn" v-show="data.is_ftf_pay==1" @click="deliver(1)">拒绝当面交易</a>
                    <a href="javascript:;" class="list-item_btn"v-show="data.status==2&&data.is_ftf_pay!=1&&data.is_delay!=1" @click="deliver(2)">延迟收货</a>
                    
                    <a href="javascript:;" class="list-item_btn" v-show="data.is_ftf_pay==1" @click="deliver(4)">拒绝收货</a>
                    
                    <a href="javascript:;" class="list-item_btn" v-show="data.status==11" @click="deliver(6)">取消申请</a>                    
                    <router-link :to="'/buyernowreturn/'+data.id" class="list-item_btn" v-show="(data.status==6&&data.is_refund!=2)||data.status==14">立即退货</router-link>
                    <a href="javascript:;" class="list-item_btn list-item_btn__red" v-show="data.status==2||(data.status==5&&data.is_refund!=2)||(data.status==6&&data.is_refund!=2)||data.status==13||data.status==14||data.status==15" @click="translate(3)">确认收货</a>
                    <!--@click="showConf=!showConf"-->
                    <router-link :to="'/buyerorderevaluate/'+data.id" class="list-item_btn list-item_btn__red" v-show="(data.status==3||(data.status==5&&data.is_refund==2)||(data.status==6&&data.is_refund==2)||data.status==17)&&data.co_status!=1">立即评价</router-link>
                </div>
            </div>
        </div>
    <show-confirm v-show="showConf" :msg="tipMsg" @childEvent="goReceived" @closeBox="close"></show-confirm>
    <show-confirm v-show="handle" :msg="tipMsg" :tit_con="tit1" @childEvent="goExecute" @closeBox="cancel"></show-confirm>
     <!--  订单基本信息-->
   <!--   <order-list :msg="info" ></order-list> -->
    <!-- / 订单基本信息-->
       <div class="panel">
        <div class="panel_title bdb">订单信息</div>
        <div class="panel_cont">
            <div class="panel_item">商家电话：{{data.shop_mobile}}</div>
            <div class="panel_item">拍品编号：{{data.order_number}}</div>
            <div class="panel_item" v-show="data.status!=0&&data.is_ftf_pay!=1&&data.is_ftf_pay!=4&&data.is_ftf_pay!=5&&data.status!=4">货款交易号：{{data.pay_number}}</div>

            <div class="panel_item clr panel_item__service" v-show="((data.is_refunded==1)&&(data.status==5||data.status==6||data.status==13||data.status==14||data.status==10||data.status==11))||data.status==7||data.status==15">
                <div class="fl  panel_btn" @click="deliver(8)" v-show="data.is_interpose==0">
                    <i class="service vc"></i>
                    <span class="vc panel_btn-text">小二介入</span>
                </div>
                <div class="fr list-item_btn list-item_btn__red" v-show="data.is_interpose==1" @click="deliver(9)">取消介入</div>
            </div>
        </div>
        <div class="list-item_btn-area" >
             <router-link :to="'/application/'+data.id+'/1'" class="list-item_btn list-item_btn__red" v-show="data.status==10">申请退款</router-link>
             <router-link :to="'/application/'+data.id+'/2'" class="list-item_btn list-item_btn__red" v-show="data.is_application_returns&&data.is_ftf_pay!=1">申请退货</router-link>
             <router-link :to="'/application/'+data.id+'/2'" class="list-item_btn list-item_btn__red" v-show="data.status==3&&data.is_refund_goods==1&&data.is_refund!=2">申请退货</router-link>
        </div>
    </div>


    <div class="panel" v-show="data.status!=0">
        <div class="panel_title bdb">发货信息</div>
        <div class="panel_cont">
            <div v-show="data.is_ftf_pay==1||(data.is_ftf_pay==4)||(data.is_ftf_pay==5)">
                <div class="panel_item clr">发货方式  <span class="fr">当面交易</span></div>
            </div>
            <div class="panel_item__userName" v-show="(data.is_ftf_pay!=1||data.is_ftf_pay!=4||data.is_ftf_pay!=5)&&data.status!=0">
                <div class="bdb">
                    <div class="panel_item clr">
                        <div class="fl fz0">
                            <i class="icon-s_admin icon-address vc"></i>
                            <span class="panel_userName vc">收货人：{{data.buyer}}</span>
                        </div>
                        <span class="fr">{{data.buyer_mobile}}</span>
                    </div>
                    <div class="panel_item panel_item__address clr">{{data.buyer_address}}</div>
                </div>
                <div class="clr deliveryMethod" v-show="data.express!=''">
                    <div class="fl">发货方式</div>
                    <div class="fr" v-if='data.is_deliver_home==0'>{{data.express}}(单号：{{data.express_number}})</div>
                    <div class="fr" v-else-if='data.is_deliver_home==1'>送货上门</div>
                </div> 

            </div>
        </div>
    </div>
    <div class="panel" v-show="(data.status>=5&&data.status<=8)||data.status>=11||data.is_refunded==1">
        <div class="panel_title bdb">争议信息</div>
        <div class="panel_cont">
            <div v-show="data.status!=11&&data.is_refunded==1">
                <div class="panel_item clr">卖家-{{data.other_refuse_reason||sellerRefuse[data.refuse_return-1]}}  <span class="fr">{{time.sellerRefuseReturn48||time.refuseTimeout}}</span></div>
            </div>
            <div v-show="data.status==11||data.status==12||(data.status==10&&data.is_refunded==1)">
                <div class="panel_item clr">买家-{{data.other_return_reason||buyerRefund[data.return_reason-1]}}  <span class="fr">{{time.timeout}}</span></div>
            </div>
            <div v-show="data.status>=13">
                <div class="panel_item clr">买家-{{data.other_return_reason||buyerReturn[data.return_reason-1]}}  <span class="fr">{{time.appReturn48}}</span></div>
            </div>
            <div v-show="data.status>=5&&(data.status<=8)">
                <div class="panel_item clr">买家-{{data.other_return_reason||buyer_after_sale[data.return_reason-1]}}  <span class="fr">{{time.appReturnTime}}</span></div>
            </div>
        </div>
    </div>
    <div class="panel" v-show="data.status==6||data.status==7||data.status==8">
        <div class="panel_title bdb">退货信息</div>
        <div class="panel_cont">
            <div class="panel_item__userName">
                <div class="bdb">
                    <div class="panel_item clr">
                        <div class="fl fz0">
                            <i class="icon-s_admin icon-address vc"></i>
                            <span class="panel_userName vc">收货人：{{data.seller}}</span>
                        </div>
                        <span class="fr">{{data.seller_mobile}}</span>
                    </div>
                    <div class="panel_item panel_item__address clr">{{data.seller_address}}</div>
                </div>
                <div class="clr deliveryMethod" v-show="data.refund_express!=''">
                    <div class="fl">发货方式</div>
                    <div class="fr">{{data.refund_express}}(单号：{{data.refund_express_number}})</div>
                </div> 

            </div>
        </div>
    </div>
     <div class="panel" v-if="data.co_status==1">
        <div class="panel_box clr">
            <div class="text_head fl">
                评价/评分
            </div>
            <div class="section_click_star fr">
				<ul class="star_box">
					<li v-for="n in 5" :data-index="n" class="spritesmap" :class="starArr[n-1]"></li>
				</ul>
			</div>
        </div>
        <div class="panel_comment_box" v-if="data.co_content!=''">
            <div class="panel_comment_content">
                {{data.co_content}}
            </div>
        </div>
        <div class="panel_uncomment_box clr" v-if="data.co_content==''">
            <div class="panel_uncomment_content fr">
                 无评价内容
            </div>
        </div>
        
    </div>
    <!-- <show-confirm :msg="tipmsg" :tit_con="tit" v-show="is_service" @childEvent ="gotoService" @closeBox = "close"></show-confirm> -->
    <div class="space">
    </div>
</div>
</template>
<script>

    
    // var orderList = require("@/components/buyerOrderItem")
    var showConfirm = require("@/components/component/showConfirm")
    var ajax = require("ajax");
    var countDownHour = require("@/components/countdownhour")
    var countDownDay = require("@/components/countdownday")
    var config = window.config;
    

    module.exports = {
        
        data: function(){
                return {
                    data: '',
                    timeList: [],
                    /*列表页的变量*/
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
                    is_refund_goods: "",
                    url: "",
                    /*列表页的变量*/
                    // 买家退款申请理由
                    buyerRefund: [
                    "未按约定时间发货",
                    "其他"
                    ],
                    // 买家退货申请理由(48小时)
                    buyerReturn: [
                    "未按约定时间发货",
                    "收到商品破损",
                    "收到商品与描述不符",
                    "商品质量问题",
                    "7天无理由退货",
                    "其他"
                    ],
                    // 卖家拒绝退货或者拒绝退款理由
                    sellerRefuse: [
                          "理由不符",
                          "今日发货",
                          "其他"
                    ],
                    // 买家申请售后理由
                    buyer_after_sale: [
                          "7天无理由退货",
                          "其他"
                    ]

                }
        },
        computed: {
            time: function(){
                var that = this;
                var timeDetails = {};
                var list = that.timeList;
                var type;
                for(var i=0;i<list.length;i++){
                     type = parseInt(list[i].log_type);
                     
                    switch (type)
                    {
                        //1订单中的拍品开始竞拍的时间
                        case 1:
                            timeDetails["kaipaiTime"] = list[i].log_inputtime;
                            break;

                        //2订单中的拍品竞拍成功的时间
                        case 2:
                            timeDetails["sucpaiTime"] = list[i].log_inputtime;
                            break;


                        //    3订单付款时间
                        case 3:
                            timeDetails["payTime"] = list[i].log_inputtime;
                            break;
            


                        //    4发货时间
                        case 4:
                            timeDetails["sendTime"] = list[i].log_inputtime;
                            break;
                       


                        //    5确认收货，交易成功，订单结束时间
                        case 5:
                            timeDetails["receiveTime"] = list[i].log_inputtime;
                            break;
                        


                        //    6当面交易，发货时间
                        case 6:
                            timeDetails["ftfSendTime"] = list[i].log_inputtime;
                            break;


                        //    7退货申请时间
                        case 7:
                            timeDetails["appReturnTime"] = list[i].log_inputtime;
                            break;

                        //    8同意退货时间
                        case 8:
                            timeDetails["agreeReturnTime"] = list[i].log_inputtime;
                            break;


                        //    9退货发出时间
                        case 9:
                            timeDetails["returnSendTime"] = list[i].log_inputtime;
                            break;

                        //    10退货成功时间
                        case 10:
                            timeDetails["returnSucTime"] = list[i].log_inputtime;
                            break;


                        //    11订单失败
                        case 11:
                            timeDetails["failTime"] = list[i].log_inputtime;
                            break;


                        //    12超时未发货买家申请退款
                        case 12:
                            timeDetails["timeout"] = list[i].log_inputtime;
                            break;



                        //    13超时未发货买家申请退款成功
                        case 13:
                            timeDetails["timeoutappsuc"] =  list[i].log_inputtime;
                            break;


                        //    14四十八小时后买家申请退货
                        case 14:
                            timeDetails["appReturn48"] =  list[i].log_inputtime;
                            break;


                        //    15四十八小时后卖家同意退货
                        case 15:
                            timeDetails["appAgreeReturn48"] =  list[i].log_inputtime;
                            break;

                        //    16四十八小时后买家立即退货//售后买家立即退货时间
                        case 16:
                            timeDetails["appNowReturn48"] =  list[i].log_inputtime;
                            break;

                        //    17四十八小时后卖家同意退款，订单结束时间
                        case 17:
                            timeDetails["appAgree48"] =  list[i].log_inputtime;
                            break;

                        //    18四十八小时后买家确认收货，订单结束时间
                        case 18:
                            timeDetails["sellerAgreeReturn48"] =  list[i].log_inputtime;
                            break;

                         //    19四十八小时后卖家拒绝退货，订单结束时间
                        case 19:
                            timeDetails["sellerRefuseReturn48"] =  list[i].log_inputtime;
                            break;

                        //    20超时未发货，买家取消申请退款或者卖家拒绝退款时间，订单结束时间
                        case 20:
                            timeDetails["refuseTimeout"] =  list[i].log_inputtime;
                            break;
                    }

                }
                return timeDetails
            },
            starArr: function(){
				 var starArr=[];
					for(var i = 1; i <= 5;i++){
							i <= this.data.co_star?starArr.push("star_on"):starArr.push("star_off");
					}
					return starArr;
			 }
        },
        created :function(){
            this.getOrderDetails();
            this.url = window.config.img_url;
        },
        mounted: function(){
            // console.log(this.time);
            // window.onscroll = null;
            document.title = '订单详情页';
        },
        components: {
            "show-confirm": showConfirm,
            "count-down-hour": countDownHour,
            "count-down-day": countDownDay,
        },
        methods: {
            /*    详情页原来的方法    */
            getOrderDetails: function(){
                var that = this;
                var id = parseInt(that.$route.params.id);
                ajax.getOrderDetails(id,function(data){
                    if(data.status==200){
                        that.data = data.data;
                        that.order_id = that.$route.params.id;
                        that.is_ftf_pay = data.data.is_ftf_pay;
                        that.is_refunded = data.data.is_refunded;
                        that.is_refund_goods = data.data.is_refund_goods;
                        that.status = data.data.status;
                        that.timeList =  data.data.order_log;
                    }else{
                        alert(data.msg);
                    }
                });
            },
            /*   详情页的方法*/

            /*列表页的方法*/
            translate: function (type) {
                var that = this;
                var is_refunded = that.is_refunded;
                var status = that.status;
                var is_refund_goods = that.is_refund_goods;
                if(type==3){//确认收货
                    if(status==14||status==15||status==5||status==6){
                        this.tipMsg= "您确认取消退货申请，确认退货？<br> 本次收货后将无法再次申请退货";
                    }else{
                        if (is_refund_goods == 1) {
                            this.tipMsg = "该拍品7天包退，确认后可在7天内申请退货";
                        }else if (is_refund_goods == 0) {
                            this.tipMsg = "确认后将无法再退货，贷款将支付给卖家，请确认货品完好无误";
                        }
                    }
                }
                this.showConf = true;
            },
            deliver: function(type){
                
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
                }else if(type==8){
                    this.tipMsg = "您确认要申请小二介入";
                    this.tit1 = '申请（将致电'+config.service_phone+'）';
                }else if(type==9){
                    this.tipMsg = "您确认要撤销小二介入";
                    this.tit1 = "确认";
                }
                this.handle = true;

            },
            
            //<---确认收货发送的ajax函数
            goReceived: function () {
                var that = this;
                var order_id = that.$route.params.id;
                var status = that.status;
                var is_ftf_pay = that.is_ftf_pay;
                if(status == 13||status == 14|| status==15 || status ==5 ||status ==6){
                        ajax.cancelRefund(order_id,function(data){
                            if(data.status == 200){
                                that.showConf = false;
                                that.$router.go(0);
                            }else{
                                alert("确认收货和取消申请退货失败原因为： "+data.msg);
                            }
                        });
                }else{
                    ajax.goConfirm(order_id,'','','',function (data) {
                        if (data.status == 200) {
                            console.log("收货成功");
                            that.$router.go(0);
                        } else {
                            alert(data.msg);
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
                        that.$router.go(0);
                        }else{
                            console.log(data.msg)
                        }
                    });
                }else if(type ==2){//延迟收货的提交  ||延迟付款
                    ajax.goDelay(order_id, function (data) {
                        if (data.status == 200) {
                            console.log("延迟收货成功");
                            that.$router.go(0);
                     
                         } else {
                             console.log(data.msg)
                         }
                    });
                }else if(type==4){//拒绝收货成功
                    var key = 2;
                    ajax.goRefuse(order_id,key,function (data) {
                        if (data.status == 200) {
                            console.log("拒绝收货成功");
                            that.$router.go(0);
                     
                        }else{
                            console.log(data.msg)
                        }
                    });
                }else if(type==5){//延迟付款成功
                    ajax.goDelay(order_id, function (data) {
                        if (data.status == 200) {
                            console.log("延迟付款成功");
                            that.$router.go(0);
                       
                         } else {
                             console.log(data.msg)
                         }
                    });
                }else if(type==6){//取消申请退款成功
                    ajax.cancelRefund(order_id, function (data) {
                        if (data.status == 200) {
                            console.log("取消申请退款成功");
                            that.$router.go(0);
                    
                         } else {
                             console.log(data.msg)
                         }
                    });
                }else if(type== 8){
                    ajax.orderHandle(order_id,type,'','','',function(data){
                        if(data.status==200){
                            window.location.href="tel:"+config.service_phone;
                            // that.$router.go(0);
                            that.data.is_interpose= 1;
                            that.cancel();
                        }else{
                            console.log(data.msg);
                        }
                    });
                }else if(type == 9){
                     ajax.orderHandle(order_id,type,'','','',function(data){
                        if(data.status==200){
                            // that.$router.go(0)
                            that.data.is_interpose = 0;
                            that.cancel();
                        }else{
                            console.log(data.msg);
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
            /*列表页的方法*/

            goTo: function(url){
                window.location.href = url + '&round=' + new Date().getTime()
            }
        }
    }

</script>
<style scoped>
/* 信息条 */
.hint{
    margin-bottom:1rem;
    background-color: #fff;
}
.hint_item{
    padding:1.25rem 1.5rem;
}
.hint_item:last-child.bdb:after{
    display: none;
}
.hint_title{
    margin-bottom:1.3rem;
    line-height:1;
    color: #333;
    font-size:1.6rem;
}
.hint_des{
    line-height:1;
    color: #999;
    font-size:1.4rem;
}
/* 面板 */
.panel{
    margin-top:1rem;

    background-color: #fff;
}
.panel_box{
    padding: 0 1.5em;
    border-bottom: 1px solid #DDD;
}
.panel_comment_box{
    padding:  1.5rem;
    width: 100%;
}
.panel_comment_content{
    width: 100%;
    height: 9.1rem;
    padding: 1rem;
    border: 1px solid #EEE;
    color: #666;
    background-color: #FAFAFA;
    font-size: 1.4rem;
}
.panel_title{
    padding:1.4rem 1.5rem;
    line-height:1;
    color: #333;
    font-size:1.6rem;
}
.panel_cont{
    padding:.5rem 1.5rem;
}
.panel_item{
    line-height:2.5rem;
    color: #666;
    font-size:1.4rem;
}
.panel_item__service{
    margin:0.7rem 0;
}
.panel_item__service .list-item_btn{
    height:2.8rem;
    line-height:2.8rem;
}
.panel_btn{
    padding:.2rem .6rem;
    display: inline-block;
    line-height:2.6rem;
    color: #666;
    font-size:0;
    border: 1px solid #666;
    border-radius: 0.15rem;
}
.panel_btn-text{
    margin-left:1rem;
    font-size:1.4rem;
}
.panel_item__address{
    color: #999;
}
.panel_userName{
    margin-left:1rem;
    font-size:1.6rem;
}
.panel_item__userName .panel_item__address{
    margin-left:2rem;
}
.deliveryMethod{
    padding:1rem 0;
    line-height:1;
    font-size:1.6rem;
    color: #666;
}
.nowpay{
    position: absolute;
    right: 1.5rem;
    bottom: 2.4rem;
}

/*订单基本信息样式*/
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
/* /订单基本信息样式*/
.space{
    width: 100%;
    height: 6rem;
    background-color: rgb(248, 248, 248);
}
.service{
    width: 2.75rem;
    height: 2.3rem;
    display: inline-block;
    background:url(../assets/img/service.png) no-repeat;
    background-size: 2.75rem 2.3rem;
    line-height: 2.6rem;
}
/*  星星样式  */
.text_head{
	width: 7rem;
	color: #333;
	font-size: 1.4rem;
	line-height: 4.5rem;
}
.section_click_star{
	width: 22rem;
	height: 4.5rem;
}
.star_box{
	/*display: inline-block;*/
	/*display: block;*/
	width: 100%;
	height: 2.2rem;
	margin-top: 1.5rem;
}
.star_box>li{
	display: inline-block;
	width: 2.3rem;
	height: 2.2rem;
	margin: 0 1rem;
	/*font-size: 1rem;*/
	/*vertical-align: middle;*/
}
.star_on{
	background-position: -19.1rem -2.45rem;
}
.star_off {
	background-position: -22rem -2.45rem;
}
/*  星星样式  */
/*    无内容评价样式*/
.panel_uncomment_box{
    width: 100%;
    padding: 0 1.5rem;
}
.panel_uncomment_content{
    width: 30%;
    height: 2.2rem;
    line-height: 2.2rem;
    color: #666;
    font-size: 1.2rem;
    text-align: right;
}
/*    无内容评价样式*/
</style>
