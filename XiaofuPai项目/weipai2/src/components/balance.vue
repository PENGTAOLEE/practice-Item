<template>
<div>
	<div class="balanceIndex_header re">		
		<!-- <a class="balanceIndex_info" href="/billhistory/0"></a> -->
		<div class="balanceIndex_info" @click="directedTo">余额明细</div>
		<div class="balanceIndex_showNum">{{ balanceData.balance }}</div>
		<div class="balanceIndex_frozenProvision">冻结款项：{{ balanceData.freeze }}</div>
		<div class="balanceIndex_list">
			<div class="balanceIndex_listItem">
				<span class="balanceIndex_listItem-label">待付款</span><br>
				<span class="balanceIndex_listItem-cont">{{ balanceData.nopay }}</span>
			</div>
			<div class="balanceIndex_listItem">
				<span v-if="type == 1" class="balanceIndex_listItem-label">待发货</span><br>
				<span v-if="type == 0" class="balanceIndex_listItem-label">未发货</span><br>
				<span class="balanceIndex_listItem-cont">{{ balanceData.waitsend}}</span>
			</div>
			<div class="balanceIndex_listItem">
				<span v-if="type == 1" class="balanceIndex_listItem-label">待收款</span><br>
				<span v-if="type == 0" class="balanceIndex_listItem-label">待收货</span><br>
				<span class="balanceIndex_listItem-cont">{{ balanceData.sendprice }}</span>
			</div>
		</div>
	</div>
	<div class="balanceIndex_body">
		<div class="cell-more" @click="setGoTo('recharge')">
			<i class="item_icon balance-index-icon icon-balance-balance vc icon-right"></i>
			<div class="cell-more_hd">
				<p>充值</p>
			</div>
			<div class="cell-more_ft"></div>
        </div>
		<div class="cell-more" @click="setGoTo('withdraw')">
			<i class="item_icon balance-index-icon icon-auction-balance vc icon-right"></i>
			<div class="cell-more_hd">
				<p>提现</p>
			</div>
			<div class="cell-more_ft"></div>
        </div>
		<!-- 管理银行卡 -->
		<div class="cell-more" @click="setGoTo('bankcard')">
			<i class="item_icon balance-index-icon icon-attention-balance vc icon-right"></i>
			<div class="cell-more_hd">
				<p>管理银行卡</p>
			</div>
			<div class="cell-more_ft"></div>
		</div>
		<div class="cell-more" @click="setGoTo('paysecurity')">
			<i class="item_icon balance-index-icon icon-sellerCenter-balance vc icon-right"></i>
			<div class="cell-more_hd">
				<p>支付安全</p>
			</div>
			<div class="cell-more_ft"></div>
		</div>
	</div>
</div>

</template>
<script>


    module.exports = {
        data: function(){
            return {
                balanceData: {},
                // 当前是买家还是卖家
                type: '',
                status: '',        // 当前是否设置了支付密码  status=0[未设置] status=1[设置过]
            }
        },
        
        
        created: function() {
            this.getBalanceIndex()
        },
        mounted: function() {
            document.title="我的余额";
            this.$nextTick(function(){
                this.addRouterLink()
            })

            // 禁用微信分享
            utils.disableSharing();
        },
        watch: {
            '$route': ["addRouterLink"]
        },
        beforeDestroy: function() {
            $(".footer-bottom a").eq(3).removeClass("router-link-active");
        },
        methods: {
            getBalanceIndex: function(){
                var that = this;
                var type = this.$route.params.type;
                // 本地判断当前是买家还是卖家
                this.type = type;
               
                ajax.balanceList(type,function(data){
                    if( data.status == 200 ){
                        that.balanceData = data.data;
                    } else if( data.status == 201){
                        that.balanceData = data.data;
                    } else {
                        alert(data.msg)
                        // that.$router.go(-1);
                    }
                    that.status = data.data.passwordstatus;
                });
            },

            // 用户是否设置了支付密码
            goTo: function() {
                if (this.status == 1) {
                    this.$router.push('/bankcardadd/bankcard')
                } else {
                    this.$router.push('/bankcard')
                }
            },

            // 判断当前用户是否设置了支付密码
            setGoTo: function(from) {
                if (this.status == 1 && from == 'paysecurity') {//支付安全
                    this.$router.push('/pay')
                } else if(this.status == 0 && from == 'paysecurity'){
                    this.$router.push('/bankcard?from=paysecurity');
                } else if(this.status == 1 && from == 'bankcard') {//管理银行卡
                    this.$router.push('/bankcardadd/bankcard');
                } else if(this.status == 0 && from == 'bankcard') {
                    this.$router.push('/bankcard');
                } else if(this.status == 1 && from == 'recharge') {// 充值
                    this.$router.push('/recharge/0');
                } else if(this.status == 0 && from == 'recharge') {
                    this.$router.push('/bankcard?from=recharge');
                } else if(this.status == 1 && from == 'withdraw') {// 提现
                    this.$router.push('/withdraw');
                } else if(this.status == 0 && from == 'withdraw') {
                    this.$router.push('/bankcard?from=withdraw')
                } else {
                    console.log("默认一个跳转链接 或者错误处理")
                }

            },
            
            // 根据买家|买家重定向页面
            directedTo: function() {
                var type = this.$route.params.type;
                switch(type) {
                    case '0':
                        // 买家
                        this.$router.push('/billhistory/1?type=0')
                        break;
                    case '1':
                        // 卖家
                        this.$router.push('/billhistory/1?type=1')
                        break;
                    default:
                        throw new Error("不存在的类型")
                }
            },

            // footer样式
            addRouterLink: function() {
                $(".footer-bottom a").eq(3).addClass("router-link-active");
            }
        }
    }

</script>
<style>
.balanceIndex_header{
	text-align: center;
	margin-bottom: 1rem;
	background-color: #fff;
}
.balanceIndex_info{
	position: absolute;
	right:1rem;
	top:1rem;	
	line-height: 1;
	font-size: 1.3rem;
	color: #6699ff;
}
.balanceIndex_showNum{
	margin: 0 auto;
	padding:3rem 0 0.75rem;
	line-height: 1;
	font-size: 3rem;
	color: #ad1a1a;
}
.balanceIndex_frozenProvision{
	padding:0.75rem 0 3rem;
	line-height: 1;
	color: #798191;
	font-size: 1.4rem;
}
/* 款项列表 */
.balanceIndex_list{
	position: relative;
	display: -webkit-flex;
	display: flex;
	width: 100%;
}
.balanceIndex_list:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5; 
    transform-origin: 0 100%;
    transform: scaleY(0.5);
}
.balanceIndex_listItem{
	position: relative;
	padding:1.7rem; 
	-webkit-flex: 1;
	-moz-flex: 1;
	-ms-flex: 1;
	-o-flex: 1;
	flex: 1;
	color: #333;
	font-size: 0;
}
.balanceIndex_listItem:after{
	content:" ";
	position: absolute;
	right:0;
	top:0;
	bottom: 0;
	width: 1px;
	border-right: 1px solid #e5e5e5;
	color:#e5e5e5; 
	transform-origin:100% 50%;
	transform:scaleY(0.5);
}
.balanceIndex_listItem:last-child:after{
	display: none;
}
.balanceIndex_listItem-label, .balanceIndex_listItem-cont{
	font-size: 1.4rem;
}
.balanceIndex_listItem-cont{
	color: #ad1a1a;
}
/* 输入框列表 */
.balanceIndex_body{
	background-color: #fff;
}
.balanceIndex_body .cell-more{
	padding:1.5rem 1rem 1.5rem 2.5rem;
}
.icon-right {
	margin-right: 1rem;
}
/* input 更多 */
.cell-more{
	position: relative;
	display: -webkit-flex;
	display: flex;
	padding:1.5rem 1rem;
	align-items: center;	
}
.cell-more:active{
	background-color: #ececec;
}
.cell-more:before{
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
.cell-more:first-child:before{
	display: none;
}
.cell-more_hd{
	-webkit-flex: 1;
	-moz-flex: 1;
	-ms-flex: 1;
	-o-flex: 1;
	flex:1;
	line-height: 1;
	font-size: 1.4rem;
	color: #333;
}
.cell-more_ft{
	position: relative;
	color:red;
	text-align: right;
}
.cell-more_ft:after{
	content: " ";
    display: inline-block;
    height: 0.8rem;
    width: 0.8rem;
    border-width: 0.15rem 0.15rem 0 0;
    border-color: #999;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    -ms-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    -o-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -0.1rem;
    position: absolute;
    top: 50%;
    margin-top: -0.4rem;
    right: 0.1rem;
}
</style>
