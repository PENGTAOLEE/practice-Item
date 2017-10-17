<template>
<transition name="pages">
    <div class="">
        <div class="hd">
            <div class="store">
                <router-link :to="'/shopsnews/'+ sellerData.userInfo.userid">
                    <img :src="thumb" alt="" class="headPortrait vc">
                </router-link> 
                
                <div class="store_text vc">
                    <div class="store_name clr">
                        <i class="name_text fl">{{userName}}</i>
                        <i class="spritesmap user-level fl name_shop" :class="'s'+sellerData.experience_type"></i>
                        <i class="spritesmap auth-user personal fl name_shop" v-if="sellerData.is_apply==1"></i>
                        <i class="spritesmap auth-user shop fl name_shop" v-else-if="sellerData.is_apply==2"></i>
                    </div>
                    <span class="store_fans">粉丝：{{sellerData.fanns_number}} | 经验值: {{sellerData.experience}}</span>
                </div>
                <router-link class="store_set icon-s_admin icon-set" to="/compete"></router-link>
            </div>
                        <!-- 签到模块-->
            <div class="sign_in">
                <div class="sign_content clr">
                    <div class="sign_in_left fl">
                        <i class="spritesmap spritesmap_left fl"></i>
                        <div class="text_rt fl">
                            <p class="text_tit">已连续签到{{sellerData.continuoussignin}}天</p>
                            <p class="text_descri">连续签到3天可获得1次抽奖机会</p>
                            <p class="text_tip">(抽奖有机会获得现金和积分哦)</p>
                        </div>
                    </div>
                    <div class="sign_in_right fr">
                        <div class="sign_right_content clr" v-if="sellerData.lastsignintime==2" @click="goSignIn" data-statistics="click_sign">
                            <i class="spritesmap spritesmap_right fl"></i>
                            <span class="fl">签到</span>                                                                              
                        </div>
                        <div class="sign_right_content_complete text_center" v-if="sellerData.lastsignintime==1">
                            <span >已签到</span>                                                                     
                        </div>
                    </div>
                </div>

            </div>
            <!-- /签到模块 -->
            <div class="classify">
                <router-link to="/sellerorder/1" class="classify_title bdb">卖家中心
                    <div class="fr item_more">
                        <span class="item_more_text"></span>
                    </div>
                </router-link>
                <div class="classify_cont">
                    <router-link class="classify_item" to="/sellerorder/2">
                        <i class="classify_icon icon_center_classify icon_arrearage re"> <b class="ab tip vc" v-show="no_pay_num!=0">{{no_pay_num}}</b></i>
                        <span class="classify_text">待付款</span>
                    </router-link>
                    <router-link class="classify_item" to="/sellerorder/3">
                        <i class="classify_icon icon_center_classify icon_sendGoods re"><b class="ab tip vc" v-show="wait_send_num!=0">{{wait_send_num}}</b></i>
                        <span class="classify_text">未发货</span>
                    </router-link>
                    <router-link class="classify_item" to="/sellerorder/4">
                        <i class="classify_icon icon_center_classify icon_notReceiving re"><b class="ab tip vc" v-show="wait_get_num!=0">{{wait_get_num}}</b></i>
                        <span class="classify_text">待收货</span>
                    </router-link>
                    <router-link class="classify_item" to="/sellercustomerservice">
                        <i class="classify_icon icon_center_classify icon_aftersale re"><b class="ab tip vc" v-show="after_sale_num!=0">{{after_sale_num}}</b></i>
                        <span class="classify_text">售后</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="bd">
            <a class="item bdb" href="/balance/1">
                <div class="item_inner clr">
                    <div class="fl item-title"><i class="item_icon icon-s_content_seller icon-balance-buyer vc"></i><span class="item_title vc">余额</span></div>
                    <div class="fr item_more"><span class="item_more_text">￥{{balance}}</span></div>
                </div>
            </a>
            <a class="item bdb" href="/integral">
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon_center_classify icon_seller_integrate vc"></i><span class="item_title vc">积分</span></div>
                    <div class="fr item_more"><span class="item_more_text">{{sellerData.score||0}}</span></div>
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
            <router-link class="item bdb" to="/pushauction" v-if='is_student==1'>
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon-s_content_seller icon-super-buyer-push vc"></i><span class="item_title vc">超级买家推送</span></div>
                    <div class="fr item_more"><span class="item_more_text">{{pushed_num}}/{{push_num}}</span></div>
                </div>
            </router-link>
            <div class="item bdb" @click="goCollection('/mycollection/2')" v-if='is_student==1'>
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon-s_content_seller icon-collection-buyer vc"></i><span class="item_title vc">被珍藏的作品</span></div>
                    <div class="fr item_more"><span class="item_more_text">{{my_collection_num}}</span></div>
                </div>
            </div>
            <router-link class="item bdb mt20" to="/buyercenter">
                <div class="item_inner clr">
                    <div class="fl"><i class="item_icon icon-s_content_seller icon-sellerCenter-seller vc"></i><span class="item_title vc">买家中心</span></div>
                    <div class="fr item_more"><span class="item_more_text"></span></div>
                </div>
            </router-link>
        </div>
       <div class="space">
       </div> 
        <!-- 微信分享 -->
        <wx-share :message="wxShareObj"></wx-share>
        <!-- 签到抽奖 -->
        <lottery v-if="is_lottery" @closeBox="closeLotteryBox" @pushEvent="UpdateData"></lottery> 
        <center-tip msg="暂无被收藏拍品" v-show="displayCenterTip"></center-tip>
    </div>
</transition>
</template>
<script>
    var ajax = require("ajax");
    var sharePage = require("@/components/component/shareSub");
    var centerTip = require("@/components/component/center-tip");
    var lottery = require("@/components/mine/lottery");

    module.exports = {
        
        components: {
            "wx-share": sharePage,
            "lottery": lottery,
            "center-tip": centerTip
        },
        data: function(){
            return {
                displayCenterTip: false,
                my_collection_num: 0,
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
                average_mark: 0,  //平均分
                experience: 0,    //经验
                is_apply: 0,      //是否验证   
                score: 0,         // 积分
                lastsignintime: 2, //签到状态
                is_lottery: false,     //是否可以抽奖
                push_num: 1,            //卖家每天向超级买家可推送的次数（总数）
                pushed_num: 0,           //卖家已经推送消息的数量
                is_student: false
            }
        },
        methods: {
            // 更新数据
            UpdateData (value) {
                var type = JSON.parse(value).type;
                var prize = JSON.parse(value).name;
                if (type == 1) {
                    this.sellerData.score = parseFloat(this.sellerData.score) + parseInt(prize);
                } else if (type == 2) {
                    this.balance = (parseFloat(this.balance) + parseInt(prize)).toFixed(2);
                } else {
                    console.log(JSON.parse(value).name )
                }
                
            },
            getsellerData: function(){
                var that = this;
                ajax.getCenterData(that.is_seller,function(data){
                    if(data.status == 200){
                        that.sellerData = data.data;
                        that.userName  = data.data.userInfo.name;
                        that.thumb = data.data.userInfo.thumb;
                        that.balance = data.data.userInfo.balance;
                        that.is_student = data.data.userInfo.is_student;
                        that.fanns_number = data.data.fanns_number;
                        that.auctioning_number = data.data.auctioning_number;
                        that.after_sale_num = data.data.after_sale_num;
                        that.no_pay_num = data.data.no_pay_num;
                        that.wait_get_num = data.data.wait_get_num;
                        that.wait_send_num = data.data.wait_send_num;
                        that.pushed_num = data.data.ke_num;
                        that.my_collection_num = data.data.super_buyer_num;
                    }
                })
            },
            // translate: function(){
            //     this.$router.push("/buyerCenter")
            // },

            // footer样式
            addRouterLink: function() {
                $(".footer-bottom a").eq(3).addClass("router-link-active")
            },
            goSignIn: function(){
                var that = this;
                if (that.sellerData.lastsignintime = 2) {
                    ajax.goSignIn(function(data){
                        if(data.status==200){
                            if(data.data==3){
                                that.is_lottery = true;
                            }
                            that.sellerData.lastsignintime = 1;
                            that.sellerData.continuoussignin = data.data;
                            //  that.sellerData.score++;
                        }
                    })
                };
            },
            closeLotteryBox: function(){
                this.is_lottery = false;
            },

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
        watch: {
            '$route': ["addRouterLink"]
        },
        created: function(){
            this.getsellerData();
            // 微信分享
            this.wxShareObj.title = "小福拍--移动竞拍领航者";
            // this.wxShareObj.images = '../assets/img/share_logo.jpg';
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
                $('#app,html,body').css({
                    'height':'100%',
                    'background': '#f6f6f6'
                })
            })
        },
        beforeDestroy: function() {
            $(".footer-bottom a").eq(3).removeClass("router-link-active")
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
    line-height:1;
    font-size:1.7rem;
    color: #fff;
    margin-bottom:.8rem;
}
.name_text{
    font-style: normal;
    display: inline-block;
}
.name_shop{
    margin-left: 1rem;
    margin-top: .2rem;
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
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    padding: 0;
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
    height: 7rem;
}
</style>
