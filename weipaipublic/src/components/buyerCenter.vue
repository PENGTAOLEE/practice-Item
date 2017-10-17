<template>
<transition name="pages">
    <div class="">
        <div class="hd">
            <div class="store">
                <router-link :to="'/shops/'+dataInfo.userid+'?type=0'">
                    <img :src="thumb" alt="" class="headPortrait vc" >
                </router-link>
                <div class="store_text vc">
                    <div class="store_name">
                        <i class="name_text">{{userName}}</i>
                        <i class="spritesmap buyer-level  name_level" :class="'s'+buyerData.experience_type"></i>
                    </div>  
                    <span class="store_fans">经验值：{{buyerData.experience}}</span>
                </div>
                <router-link class="store_set icon-s_admin icon-set" to="/buyerset"></router-link>
            </div>
            <!-- 签到模块-->
            <div class="sign_in">
                <div class="sign_content clr">
                    <div class="sign_in_left fl">
                        <i class="spritesmap spritesmap_left fl"></i>
                        <div class="text_rt fl">
                            <p class="text_tit">已连续签到{{buyerData.continuoussignin}}天</p>
                            <p class="text_descri">连续签到3天可获得1次抽奖机会</p>
                            <p class="text_tip">(抽奖有机会获得现金和积分哦)</p>
                        </div>
                    </div>
                    <div class="sign_in_right fr">
                        <div class="sign_right_content clr" v-if="buyerData.lastsignintime==2" @click="goSignIn" data-statistics="click_sign">
                            <i class="spritesmap spritesmap_right fl"></i>
                            <span class="fl">签到</span>                                                                              
                        </div>
                        <div class="sign_right_content_complete text_center" v-if="buyerData.lastsignintime==1">
                            <span >已签到</span>                                                                     
                        </div>
                    </div>
                </div>

            </div>
            <!-- /签到模块 -->
            <div class="classify">
                <router-link class="classify_title bdb" to="/buyerorder/0">买家中心
                    <div class="fr item_more">
                        <span class="item_more_text"></span>
                    </div>
                </router-link>
                <div class="classify_cont">
                    <router-link class="classify_item" to="/buyerorder/1">
                        <i class="classify_icon icon_center_classify icon_arrearage re"><b class="ab tip vc" v-if="no_pay_num!=0">{{no_pay_num}}</b></i>
                        <span class="classify_text">未付款</span>
                    </router-link>
                    <router-link class="classify_item" to="/buyerorder/2">
                        <i class="classify_icon icon_center_classify icon_sendGoods re"><b class="ab tip vc" v-if="wait_send_num!=0">{{wait_send_num}}</b></i>
                        <span class="classify_text">待发货</span>
                    </router-link>
                    <router-link class="classify_item" to="/buyerorder/3">
                        <i class="classify_icon icon_center_classify icon_notReceiving re"><b class="ab tip vc" v-if="wait_get_num!=0">{{wait_get_num}}</b></i>
                        <span class="classify_text">未收货</span>
                    </router-link>
                    <router-link class="classify_item" to="/buyerorder/5">
                        <i class="classify_icon icon_center_classify icon_unevaluate re"><b class="ab tip vc" v-if="buyerData.no_comment_num!=0">{{buyerData.no_comment_num}}</b></i>
                        <span class="classify_text">未评价</span>
                    </router-link>
                    <router-link class="classify_item" to="/customerservice">
                        <i class="classify_icon icon_center_classify icon_aftersale re"><b class="ab tip vc" v-if="after_sale_num!=0">{{after_sale_num}}</b></i>
                        <span class="classify_text">售后</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="bd">
            <a class="item bdb" href="/balance/0">
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon-s_content icon-balance vc"></i><span class="item_title vc">余额</span></div>
                    <div class="fr item_more"><span class="item_more_text">￥{{balance}}</span></div>
                </div>
            </a>
            <a class="item bdb" href="/integral">
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon_center_classify icon_buyer_integrate vc"></i><span class="item_title vc">积分</span></div>
                    <div class="fr item_more"><span class="item_more_text">{{buyerData.score}}</span></div>
                </div>
            </a>
            <a class="item bdb" href="/items/govern/0?title=参拍拍品">
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon-s_content icon-auction vc"></i><span class="item_title vc">参拍拍品</span></div>
                    <div class="fr item_more"><span class="item_more_text">{{my_auction}}</span></div>
                </div>
            </a>
            <a class="item bdb" href="/items/govern/2?title=关注店铺">
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon-s_content icon-attention vc"></i><span class="item_title vc">我的关注</span></div>
                    <div class="fr item_more"><span class="item_more_text">{{my_attention}}</span></div>
                </div>
            </a>
            <div class="item bdb" @click="goCollection('/mycollection/1')" v-if='dataInfo.is_super_buyer==1'>
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon-s_content icon-collection vc"></i><span class="item_title vc">作品珍藏</span></div>
                    <div class="fr item_more"><span class="item_more_text">{{my_collection_num}}</span></div>
                </div>
            </div>
            <router-link class="item bdb mt20" to="/sellercenter">
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon-s_content icon-sellerCenter vc"></i><span class="item_title vc">卖家中心</span></div>
                    <div class="fr item_more"><span class="item_more_text"></span></div>
                </div>
            </router-link>
        </div>
        <div class="space">
        </div>    
        <!-- 微信分享 -->
        <wx-share :message="wxShareObj"></wx-share>
        <lottery v-if="is_lottery" @closeBox="closeLotteryBox" @pushEvent="UpdateData"></lottery> 
        <center-tip msg="暂无收藏拍品" v-show="displayCenterTip"></center-tip>
    </div>
</transition>
</template>
<script>
    var ajax = require("ajax");
    // var footer = require("@/components/footer")
    var sharePage = require("@/components/component/shareSub");
    var lottery = require("@/components/mine/lottery");
    var centerTip = require("@/components/component/center-tip");

    module.exports = {
        components: {
            "wx-share": sharePage,
            "lottery": lottery,
            "center-tip": centerTip
        },
        data: function(){
            return {
                displayCenterTip: false,
                dataInfo: {}, // 数据对象
                userName: '',//用户名称
                thumb: "",//用户图像地址
                balance: 0,//用户余额
                is_seller:  0,   //该页面是买家还是卖家
                //如果是买家中心
                my_auction: 0,      //用户在买家状态参拍的拍品数量
                my_attention:  0,       //用户在买家状态关注的店铺和点赞的商品数量
                 after_sale_num: 0,
                no_pay_num: 0,
                wait_get_num: 0,
                wait_send_num: 0,
                wxShareObj: {},
                buyerData: '',
                is_lottery: false,
                my_collection_num: 0,
            }
        },
        methods: {
            // 更新数据
            UpdateData (value) {
                var type = JSON.parse(value).type;
                var prize = JSON.parse(value).name;
                if (type == 1) {
                    this.buyerData.score = parseFloat(this.buyerData.score) + parseInt(prize);
                } else if (type == 2) {
                    this.balance = (parseFloat(this.balance) + parseInt(prize)).toFixed(2);
                } else {
                    console.log(JSON.parse(value).name )
                }
                
            },

            getBuyerData: function(){
                    var that = this;
                ajax.getCenterData(that.is_seller,function(data){

                    if(data.status == 200){
                        that.dataInfo = data.data.userInfo;
                        that.userName  = data.data.userInfo.name;
                        that.thumb = data.data.userInfo.thumb;
                        that.balance = data.data.userInfo.balance;
                        that.my_auction = data.data.my_auctions.data;
                        that.my_attention = data.data.my_attention.data;
                        that.after_sale_num = data.data.after_sale_num;
                        that.no_pay_num = data.data.no_pay_num;
                        that.wait_get_num = data.data.wait_get_num;
                        that.wait_send_num = data.data.wait_send_num;
                        that.my_collection_num = data.data.super_buyer_num;
                        that.buyerData = data.data;
                    }
                })
            },
            // translate: function(){
            //     this.$router.push("sellerCenter")
            // },

            // footer样式
            addRouterLink: function() {
                $(".footer-bottom a").eq(3).addClass("router-link-active")
            },
            goSignIn: function(){
                var that = this;
                ajax.goSignIn(function(data){
                    if(data.status==200){
                        if(data.data==3){
                            that.is_lottery = true;
                        }
                        that.buyerData.lastsignintime = 1;
                        that.buyerData.continuoussignin=data.data;
                        // that.buyerData.score++;
                    }
                })
            },
            closeLotteryBox: function(){
                this.is_lottery = false;
            },

            // 进入收藏列表页
            goCollection(href) {
                if (this.my_collection_num == '0') {
                    if (!this.displayCenterTip) {
                        this.displayCenterTip = true;
                        setTimeout(() => {
                            this.displayCenterTip = false;
                        },2000)
                    };
                } else {
                    this.$router.push(href)
                }
            }
        },
        beforeDestroy: function() {
            $(".footer-bottom a").eq(3).removeClass("router-link-active");
        },
        created: function(){
            this.getBuyerData();

            // 微信分享
            this.wxShareObj.title  = "小福拍--移动竞拍领航者";
            // this.wxShareObj.images = '../assets/img/share_logo.jpg';
            this.wxShareObj.wxThumb = false;
            this.wxShareObj.images = this.thumb; 
            this.wxShareObj.url    = 'http://' + location.host + '/shops/' + this.dataInfo.userid + '?type=2';
            this.wxShareObj.desc   = "手边的珍宝库，全品类艺术品，随时随地竞拍！";

        },
        mounted: function() {
            document.title="买家中心";
            this.$nextTick(function() {
                this.addRouterLink()
                $('#app,html,body').css({
                    'height':'100%',
                    'background': '#f6f6f6'
                })
            })

        }
    }

</script>
<style scoped>
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
    line-height: 2.5rem;
    font-size:1.7rem;
    color: #fff;
    margin-bottom:.8rem;
}
.name_text{
    font-style: normal;
    display: inline-block;
}
.name_level{
    margin-left: 1rem;
    margin-bottom: 0;
    line-height: 2.5rem;
    vertical-align: middle;
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
/*   签到模块    */
.sign_in{
    width: 100%;
    background-color: #FFF;
}
.sign_content{
    padding: 1.25rem 1.5rem;
}
.text_rt{
    width: 20rem;
    margin-left: 1.5rem;
}
.text_tit{
    font-size: 1.4rem;
    color: #333;
}
.text_descri{
    font-size: 1.1rem;
    color: #333;
}
.text_tip{
    font-size: 1.1rem;
    color: #999;
}
.spritesmap_left{
    display: inline-block;
    width: 3.6rem;
    height: 3rem;
    margin-top: 1.15rem;
    background-position: -15.8rem -9.4rem;
}
.sign_in_right{
    width: 7rem;
    height: 6.25rem;
    /*background-color: red;*/
}
.sign_right_content{
    margin: auto;
    padding: 0.5rem .85rem;
    /*width: auto;*/
    /*height: 2.6rem;*/
    border: 1px solid #AD1A1A;
    border-radius: 1rem;
    margin-top: 1.5rem;
}
.sign_right_content_complete{
    margin: auto;
    padding: 0.5rem .85rem;
    border: 1px solid #999;
    border-radius: 1rem;
    margin-top: 1.5rem;
}
.text_center{
    text-align: center;
}
.sign_right_content>span{
    font-size: 1.2rem;
    color: #AD1A1A;
}
.sign_right_content_complete>span{
    font-size: 1.2rem;
    color: #999;
}
.spritesmap_right{
    display: inlin-block;
    width: 1.7rem;
    height: 1.5rem;
    background-position: -20.3rem -10.9rem;
    margin-right: 0.75rem;
}


/*   / 签到模块   */
/* 分类-买家中心 */
.classify{
    background-color: #fff;
    margin-top: 1rem;
}
.classify_title{
    display: block;
    padding:1.5rem;
    color: #333;
    font-size:1.7rem;
}
.classify_cont{
    -webkit-display: flex;
    display: flex;
}
.classify_item{
    padding:1rem 0;
    -webkit-flex: 1;
    flex:1;
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
    /*line-height:1;*/
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
.space{
    width: 100%;
    min-height: 10rem;
}
</style>
