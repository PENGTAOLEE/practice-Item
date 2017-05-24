<template>
<transition name="pages">
    <div class="">
        <div class="hd">
            <div class="store">
                <router-link :to="'/shopsnews/'+ sellerData.userInfo.userid">
                    <img :src="thumb" alt="" class="headPortrait vc">
                </router-link> 
                
                <div class="store_text vc">
                    <div class="store_name">{{userName}}</div>
                    <!--<span class="store_fans">粉丝：1312</span>-->
                </div>
                <router-link class="store_set icon-s_admin icon-set" to="/compete"></router-link>
            </div>

            <div class="classify">
                <div class="classify_title bdb">卖家中心</div>
                <div class="classify_cont">
                    <router-link class="classify_item" to="/sellerorder/2">
                        <i class="classify_icon icon-s_admin icon-arrearage re"> <b class="ab tip vc" v-show="no_pay_num!=0">{{no_pay_num}}</b></i>
                        <span class="classify_text">未付款</span>
                    </router-link>
                    <router-link class="classify_item" to="/sellerorder/3">
                        <i class="classify_icon icon-s_admin icon-sendGoods re"><b class="ab tip vc" v-show="wait_send_num!=0">{{wait_send_num}}</b></i>
                        <span class="classify_text">未发货</span>
                    </router-link>
                    <router-link class="classify_item" to="/sellerorder/4">
                        <i class="classify_icon icon-s_admin icon-notReceiving re"><b class="ab tip vc" v-show="wait_get_num!=0">{{wait_get_num}}</b></i>
                        <span class="classify_text">待收货</span>
                    </router-link>
                    <router-link class="classify_item" to="/sellercustomerservice">
                        <i class="classify_icon icon-s_admin icon-afterSale re"><b class="ab tip vc" v-show="after_sale_num!=0">{{after_sale_num}}</b></i>
                        <span class="classify_text">售后</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="bd">
            <a class="item bdb" href="/balance/1">
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon-s_content_seller icon-balance-buyer vc"></i><span class="item_title vc">余额</span></div>
                    <div class="fr item_text">￥ {{balance}}</div>
                </div>
            </a>
            <a class="item bdb" href="/auction/govern/1">
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon-s_content_seller icon-auction-buyer vc"></i><span class="item_title vc">拍品管理</span></div>
                    <div class="fr item_more"><span class="item_more_text">竞拍中 {{auctioning_number}} 单</span></div>
                </div>
            </a>
            <a class="item bdb" href="/fans">
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon-s_content_seller icon-attention-buyer vc"></i><span class="item_title vc">我的粉丝</span></div>
                    <div class="fr item_more"><span class="item_more_text">{{fanns_number}}</span></div>
                </div>
            </a>
            <router-link class="item bdb mt20" to="/buyercenter">
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon-s_content_seller icon-sellerCenter-seller vc"></i><span class="item_title vc">买家中心</span></div>
                    <div class="fr item_more"><span class="item_more_text"></span></div>
                </div>
            </router-link>
        </div>
        
        <!-- 微信分享 -->
        <wx-share :message="wxShareObj"></wx-share>
    </div>
</transition>
</template>
<script>


    module.exports = {
        
        components: {
            "my-footer": footer,
            "wx-share": sharePage
        },
        data: function(){
            return {
                sellerData: {},  // 卖家首页
                userName: '',//用户名称
                thumb: "",//用户图像地址
                balance: 0,//用户余额
                is_seller:  1,   //该页面是买家还是卖家
                //如果是买家中心
                fanns_number : 29,           //用户在卖家状态下的粉丝数量
                auctioning_number:16,        //竞拍中的商品数量
                after_sale_num: 0,
                no_pay_num: 0,
                wait_get_num: 0,
                wait_send_num: 0,
                wxShareObj: {},
            }
        },
        methods: {
            getsellerData: function(){
                var that = this;
                ajax.getCenterData(that.is_seller,function(data){

                    if(data.status == 200){
                        that.sellerData = data.data;
                        that.userName  = data.data.userInfo.name;
                        that.thumb = data.data.userInfo.thumb;
                        that.balance = data.data.userInfo.balance;
                        that.fanns_number = data.data.fanns_number;
                        that.auctioning_number = data.data.auctioning_number;
                        that.after_sale_num = data.data.after_sale_num;
                        that.no_pay_num = data.data.no_pay_num;
                        that.wait_get_num = data.data.wait_get_num;
                        that.wait_send_num = data.data.wait_send_num;
                    }
                })
            },
            // translate: function(){
            //     this.$router.push("/buyerCenter")
            // },

            // footer样式
            addRouterLink: function() {
                $(".footer-bottom a").eq(3).addClass("router-link-active")
            }
        },
        watch: {
            '$route': ["addRouterLink"]
        },
        created: function(){
            this.getsellerData();
            // 微信分享
            this.wxShareObj.title = "小福拍--移动竞拍领航者";
            // this.wxShareObj.images = '/res/img/share_logo.jpg'; 
            // this.wxShareObj.url = 'http://' + location.host;
            this.wxShareObj.wxThumb = false;
            this.wxShareObj.images = this.thumb; 
            this.wxShareObj.url    = 'http://' + location.host + '/shops/' + this.sellerData.userInfo.userid + '?type=2';
            this.wxShareObj.desc = "手边的珍宝库，全品类艺术品，随时随地竞拍！";
        },
        mounted: function() {
            document.title="卖家中心";
            this.$nextTick(function(){
                this.addRouterLink()
            })
        },
        beforeDestroy: function() {
            $(".footer-bottom a").eq(3).removeClass("router-link-active")
        }

    }

</script>
<style>
/* 商家 */
.store{
    position: relative;
    padding:1.5rem;
    background-color: #ad1a1a;
}
.headPortrait{
    display: inline-block;
    width:4.5rem;
    height:4.5rem;
    border-radius: 100%;
}
.store_text{
    padding-left:1rem;
    display: inline-block;
}
.store_name{
    line-height:1;
    font-size:1.7rem;
    color: #fff;
    margin-bottom:.8rem;
}
.store_fans{
    line-height:1;
    font-size:1.3rem;
    color: #fff;
}
.store_set{
    position: absolute;
    top:2.75rem;
    right:1rem;
    display: block;
    /*width:2.2rem;
    height:2.2rem;
    background: url(../../../img/icon/set.png) 0 0/100% no-repeat;*/
}
/* 分类-买家中心 */
.classify{
    background-color: #fff;
}
.classify_title{
    padding:1.5rem 1rem;
    color: #333;
    font-size:1.7rem;
}
.classify_cont{
    display: -webkit-flex;
    display: flex;
}
.classify_item{
    padding:1rem 0;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
    display: inline-block;
    text-align: center;
}
.classify_icon{
    margin:0 auto 1rem;
    display: block;
}
.classify_text{
    line-height:1;
    font-size:1.4rem;
    color: #333;
}
/* 列表 */
.bd{
    margin-top:1rem;
}
.item{
    padding:0 1.5rem;
    display: block;
    background-color: #fff;
}
.item_inner{
    padding:1rem 0;
}
.item_title{
    margin-left:1.5rem;
    line-height:1;
    font-size:1.5rem;
    color: #333;
}
.item_text{
    line-height:1;
    font-size:1.6rem;
    color: #6e7294;
}
/*.item_more{
    margin:1rem 0;
}*/

.item_more_text{
    position: relative;
    padding-right:1rem;
    line-height:1;
    color: #999;
    font-size:1.6rem;
}
.item_more_text:after {
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
.mt20{
    margin-top:1rem;
}
.tip{
    min-width: 1.3rem;
    height: 1.3rem;
    line-height: 1.3rem;
    background-color: #AD1A1A;
    right: 0;
    top: -0.65rem;
    color: #ECD6D6;
    font-size: .9rem;
    border-radius: 1.3rem;
    font-style: normal;
    transform: translateX(50%);
    -webkit-transform: translateX(50%);
}
</style>
