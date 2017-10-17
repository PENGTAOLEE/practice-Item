<template>
<div class="wrap">
    <!-- 订单部分 -->
    <div class="order-box" v-if="freezeData.typestatus == 2">
        <div class="hd">
            <div class="exhibition bdb">
                <!-- 收入 -->
                <div v-if="freezeData.dostatus == 0">
                    <div class="exhibition_title">收入金额</div>
                    <div class="exhibition_price">{{ freezeData.income_money }}</div>
                </div>
                <!-- 支出 -->
                <div v-if="freezeData.dostatus == 1">
                    <div class="exhibition_title">支出金额</div>
                    <div class="exhibition_price">{{ freezeData.income_money }}</div>
                </div>
            </div>
            <!-- 买家 | 卖家 -->
            <div class="more" @click="directedTo(freezeData.goods_order_id)">
                <span class="more_text">查看相关订单</span>
                <i class="more_icon icon-s_admin icon-more"></i>
            </div>
        </div>
        <div class="bd">
            <ul class="list">
                <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>交易金额</span> </div>
                        <div class="fr">
                            <div class="list_text">¥ {{ freezeData.money }}</div>
                        </div>
                    </div>
                </li>
                <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title list_title__height">手续费</div>
                        <div class="fr">
                            <div v-if="true">
                                <div class="list_text">{{ freezeData.fee }}</div>
                                <span class="list_info">{{ freezeData.fee_type }} - {{ freezeData.fee }}</span>
                            </div>
                            <div v-if="false">
                                <span>0</span>
                            </div>
                            
                        </div>
                    </div>
                </li>
                <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>交易号</span> </div>
                        <div class="fr">
                            <div class="list_text">{{ freezeData.ordernum }}</div>
                        </div>
                    </div>
                </li>
                <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>交易时间</span> </div>
                        <div class="fr">
                            <div class="list_text">{{ freezeData.inputtime }}</div>
                        </div>
                    </div>
                </li>
                <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>交易种类</span> </div>
                        <div class="fr">
                            <!-- 交易种类 paytype -->
                            <div class="list_text">{{ freezeData.note }}</div>
                        </div>
                    </div>
                </li>
                <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>支付方式</span> </div>
                        <div class="fr">
                            <div v-if="freezeData.paytype == 0" class="list_text">余额</div>
                            <div v-if="freezeData.paytype == 1" class="list_text">微信</div>
                            <div v-if="freezeData.paytype == 2" class="list_text">支付宝</div>
                        </div>
                    </div>
                </li>
                <!-- 收入 -->
                <li class="bdb list-item" v-if="freezeData.dostatus != 1 && freezeData.status == 1">
                    <div class="clr">
                        <div class="fl list_title list_title__height">状态</div>
                        <!-- statue :  -->
                        <div class="fr" v-if="freezeData.status == 1">
                            <div class="list_text" >冻结中</div>  
                            <span class="list_info">
                                7天无理由退货拍品，退货期内被冻结 
                            </span>
                        </div>
                        <div class="fr" v-if="freezeData.status != 1 && freezeData.status != 0">
                            <div class="list_text">{{ freezeData.status }}</div>  
                            <span class="list_info">
                                交易违反
                                <a href="https://mp.weixin.qq.com/s?__biz=MzI3OTU4Mjk0Mw==&mid=2247483667&idx=1&sn=cb644d552de5e1339718da1dd47d6238&chksm=eb44c0a3dc3349b5cb2140ce84210b1f2297165ccdf2065e8cb3555ac36c0b2b14a34483f42d#rd">《微拍竞拍服务协议》
                                </a>
                                被冻结
                            </span>
                        </div>
                    </div>
                </li>
                <li class="bdb list-item" v-if="freezeData.dostatus != 1 && freezeData.status == 1">
                    <div class="clr">
                        <div class="fl list_title"><span>解冻时间</span> </div>
                        <div class="fr">
                            <div class="list_text">{{ freezeData.release_time }}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <!-- 订单部分结束 -->
    <!-- 收入部分 -->
    <div class="income-box" v-if="freezeData.typestatus == 1">
        <div class="hd">
            <div class="exhibition bdb">
                <div class="exhibition_title">收入金额</div>
                <div class="exhibition_price">+ {{ freezeData.income_money }}</div>
            </div>
            <!-- 买家 | 卖家 -->
            <div class="more" @click="directedTo(freezeData.goods_order_id)">
                <span class="more_text">查看相关订单</span>
                <i class="more_icon icon-s_admin icon-more"></i>
            </div>
        </div>
        <div class="bd">
            <ul class="list">
                <!-- <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>交易号</span> </div>
                        <div class="fr">
                            <div class="list_text">{{ freezeData.ordernum }}</div>
                        </div>
                    </div>
                </li> -->
                <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>交易时间</span> </div>
                        <div class="fr">
                            <div class="list_text">{{ freezeData.inputtime }}</div>
                        </div>
                    </div>
                </li>
                <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>交易种类</span> </div>
                        <div class="fr">
                            <div class="list_text">{{ freezeData.note }}</div>
                            <!-- 详情描述 -->
                            <span class="list_info">
                                {{freezeData.detail}}
                            </span>
                        </div>
                    </div>
                </li>
                <!-- <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>支付方式</span> </div>
                        <div class="fr">
                            <div v-if="freezeData.extracttype == 1" class="list_text">微信</div>
                            <div v-if="freezeData.extracttype == 2" class="list_text">余额</div>
                        </div>
                    </div>
                </li> -->
            </ul>
        </div>
    </div>
    <!-- 收入部分结束 -->
    <!-- 支出部分 -->
    <div class="expend-box" v-if="freezeData.typestatus == '0'">
        <div class="hd">
            <div class="exhibition bdb">
                <div class="exhibition_title">支出金额</div>
                <div class="exhibition_price">- {{ freezeData.used_money }}</div>
            </div>
        </div>
        <div class="bd">
            <ul class="list">
                <!-- <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>交易号</span> </div>
                        <div class="fr">
                            <div class="list_text">{{ freezeData.ordernum }}</div>
                        </div>
                    </div>
                </li> -->
                <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>交易时间</span> </div>
                        <div class="fr">
                            <div class="list_text">{{ freezeData.inputtime }}</div>
                        </div>
                    </div>
                </li>
                <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>交易种类</span> </div>
                        <div class="fr">
                            <div class="list_text">{{ freezeData.note }}</div>
                            <!-- 描述 -->
                            <span class="list_info">
                                {{freezeData.detail}}
                            </span>
                        </div>
                    </div>
                </li>
                <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title"><span>提现到</span> </div>
                        <div class="fr">
                            <div class="list_text" v-if="freezeData.extracttype == 1">微信</div>
                            <div class="list_text" v-if="freezeData.extracttype == 2">银行卡</div>
                        </div>
                    </div>
                </li>
                <li class="bdb list-item">
                    <div class="clr">
                        <div class="fl list_title list_title__height">状态</div>
                        <div class="fr">
                            <div class="list_text" v-if="freezeData.dostatus == 1">处理中</div>
                            <div class="list_text" v-if="freezeData.dostatus == 2">完成</div>
                            <div class="list_text" v-if="freezeData.dostatus == 3">失败</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <!-- 支出部分结束 -->

    <!-- 弹窗 -->
    <show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>
</div>
</template>
<script>

    
    var showAlert = require("@/components/component/showAlert")
    var ajax = require("ajax");
    var utils = require("utils");

    

    module.exports = {
    	data: function() {
    		return {
                showAlertBoll: false,
                tipMsg: '',
                freezeData: {}
    		}
    	},
        components: {
            'show-alert': showAlert
        },
        
        mounted: function() {
        	this.getBalanceDetail()
        },
        methods: {
        	// 获取数据
        	getBalanceDetail: function() {
                var _this = this;
        		var id = this.$route.params.id;
        		ajax.getBalanceDetails(id,function(data) {
        			if (data.status == 200) {
        				_this.freezeData = data.data;
        			} else {
                        _this.tipMsg = data.msg;
                        _this.showAlertBoll = true;
                    }
        		})
        	},

            // 卖家 | 买家
            directedTo: function(orderid) {
                var type = utils.getRequest().type;
                switch(type) {
                    case '0':
                        // 买家
                        this.$router.push("/buyerorderdetails/" + orderid);
                        break;
                    case '1':
                        // 卖家
                        this.$router.push("/sellerorderdetails/" + orderid);
                        break;
                    default:
                         throw new Error("Not found"); 
                }
            },

            // 关闭弹窗
            closePopup: function() {
                this.showAlertBoll = false;
            }
        	
        }
    }

</script>
<style scoped>
.hd{
    background-color: #fff;
}
.exhibition{
    position: relative;
    padding:1.5rem 1.5rem 1rem;
    height:7.8rem;
}
.exhibition_title{
    line-height:1;
    font-size:1.4rem;
    color: #333;
}
.exhibition_price{
    position: absolute;
    right:1.5rem;
    bottom:1rem;
    line-height:1;
    color: #ad1a1a;
    font-size:2.2rem;
}
.more{
    padding:1.5rem;
    display: block;
    text-align: right;
    color: #999;
    font-size:1.4rem;
}
.more_icon{
    display: inline-block;
}
.more_text{
    margin-right:0.4rem;
}
/* 列表 */
.bd{
    margin-top:1rem;
    background-color: #fff;
}
.list{
    padding:0 1.5rem;
}
.list-item{
    padding:1.5rem 0;
    vertical-align: middle;
}
.list_title{
    color: #999;
    font-size:1.4rem;
}
.list_title__height{
    line-height:3rem;
}
.list .fr{
    text-align: right;
}
.list_text{
    line-height:1;
    color: #333;
    font-size:1.4rem;
}
.list_info{
    margin-top:0.8rem;
    display: block;
    line-height:1;
    color: #999;
    font-size:1.1rem;
}
</style>
