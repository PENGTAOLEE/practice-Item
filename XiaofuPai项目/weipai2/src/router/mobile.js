import Vue from 'vue'
import Router from 'vue-router'
import banner from '@/components/homepage/banner'

Vue.use(Router)

export default new Router({
    routes: [
        /*{
            path:'/banner',
            name: 'banner',
            component: banner,
        }*/
        {
            path:"/banner",
            component:function(resolve){
                 require(['@/components/banner'], resolve);
        },
    ],
    mode : "history",
    scrollBehavior: function(to, from, savedPosition) {
        // return 期望滚动到哪个的位置     注意: 这个功能只在 HTML5 history 模式下可用。
        if (savedPosition) {//返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
        // $(window).unbind();
    },
})
// export default new Router({
//   mode : "history",
//   routes: [
//         {
//            path:"/",
//            component:function(resolve){
//                 require(['@/components/banner'], resolve);
//            },
//            children : [
//                 {
//                     path: "index",
//                     component:function(resolve){//热门
//                         require(['@/components/hot'], resolve);
//                         // seajs.use("module/indexhotBack/indexhotBack",resolve)
//                     }
//                 },
//                 {
//                     path: "follow",//关注
//                     component:function(resolve){
//                         require(['@/components/follow'], resolve);
//                     }
//                 }
//             ] 
//         },
//        {
//             path:"/classify",//分类首页
//             component:function(resolve){
//                 require(['@/components/index'], resolve);
//             },
//             children:[
//                 {
//                     path:"content/:id",
//                     component:function(resolve){
//                         require(['@/components/content'], resolve);
//                     }
//                 }
//             ]
//         },
//         {
//             path:"/format/:type",//分类排列格式
//             component:function(resolve){
//                 require(['@/components/format'], resolve);
//             },
//             children:[
//                 {
//                     path:"sort/:id",
//                     component:function(resolve){
//                         require(['@/components/sort'], resolve);
//                     }
//                 }
//             ]
//         },
//         {
//             path:"/autionList",//卖家拍卖管理
//             component:function(resolve){
//                 require(['@/components/auction'], resolve);
//             },
//             children:[
//                 {
//                     path:"govern/:id",
//                     component:function(resolve){
//                         require(['@/components/aucion-list'], resolve);
//                     }
//                 }
//             ]
//         },
//         {
//             path:"/shops/:id",//商铺首页
//             component:function(resolve){
//                 require(['@/components/shops'], resolve);
//             }
//         },
//         {
//             path:"/shopsnews/:id",//商铺信息
//             component:function(resolve){
//                 require(['@/components/news'], resolve);
//             }
//         },
//         {
//             path:"/lotdetails/:id",//拍品详情
//             component:function(resolve){
//                 require(['@/components/lotdetails'], resolve);
//             }
//         },
//         {
//             path:"/picture",//发布
//             component:function(resolve){
//                 require(['@/components/picture'], resolve);
//             }
//         },
//         {
//             path: "/payment/:id",//卖家保证金
//             component:function(resolve){
//                 require(['@/components/payment'], resolve);
//             }
//         },
//         {
//             path:"/newslist",//消息列表
//             component:function(resolve){
//                 require(['@/components/newslist'], resolve);
//             }
//         },
//         {
//             path:"/newschat/:id",//聊天窗口页
//             component:function(resolve){
//                 require(['@/components/newschat'], resolve);
//             }
//         },
//         {
//             path:"/newschat/:id/:auction",//聊天窗口页，发送拍品信息
//             component:function(resolve){
//                 require(['@/components/newschat'], resolve);
//             }
//         },
//         {
//             path : "/systemmsg",//系统消息
//             component : function(resolve){
//                 require(['@/components/systemMsg'], resolve);
//             }
//         },
//         {
//             path:"/find",//发现列表内容
//             component:function(resolve){
//                 require(['@/components/index'], resolve);
//             }
//         },
//         {
//             path:"/curriculum",//课程
//             component: function(resolve){
//                 require(['@/components/curriculum'], resolve);
//             }
//         },
//         {
//             path:"/works",//消息列表内容
//             component:function(resolve){
//                 require(['@/components/works'], resolve);
//             }
//         },
//         {

//             path:"/information/:id",//用户信息
//             component:function(resolve){
//                 require(['@/components/information'], resolve);
//             }
//         },
//         {
//         	path :"/auction",
//             component : function(resolve){
//                 require(['@/components/auction'], resolve);
//             },
//             children:[
//                 {
//                     path:"govern/:id",
//                     component:function(resolve){
//                         require(['@/components/auction-list'], resolve);
//                     }
//                 }
//             ]
//         },
//         {
//         	path :"/compete",//卖家设置
//             component : function(resolve){
//                 require(['@/components/compete'], resolve);
//             }
//         },
//         {
//         	path :"/items",// 参拍拍品 
//             component : function(resolve){
//                 require(['@/components/items'], resolve);
//             },
//             children:[
//                 {
//                     path:"govern/:id",
//                     component:function(resolve){
//                         require(['@/components/itemlist'], resolve);
//                     }
//                 }
//             ]
//         },
//          {
//         	path :"/buyerset",//买家设置
//             component : function(resolve){
//                 require(['@/components/buyerset'], resolve);
//             }
//         },
//          {
//         	path :"/location",//地址设置
//             name: "location",
//             component : function(resolve){
//                 require(['@/components/location'], resolve);
//             }
//         },
//         {
//         	path :"/Forms",//表单
//             component : function(resolve){
//                 require(['@/components/Forms'], resolve);
//             }
//         },       
//         {
//             path :"/addressmap",//退货地址定位
//             component : function(resolve){
//                 require(['@/components/AddressMap'], resolve);
//             }
//         },
//         {
//             path :"/AddressList",//退货地址定位
//             component : function(resolve){
//                 require(['@/components/AddressList'], resolve);
//             }
//         },
//         {
//         	path :"/fans",//粉丝
//             component : function(resolve){
//                 require(['@/components/fans'], resolve);
//             }
//         },
//         {
//         	path :"/shoping",//商铺介绍
//             component : function(resolve){
//                 require(['@/components/shoping'], resolve);
//             }
//         },
//         /*----------------------------------售后-----------------------------------*/
//         {
//             path: "/application/:id/:type", // 申请退款或者申请退货
//             component: function(resolve) {
//                 require(['@/components/application'], resolve);
//             }
//         },
      
        
//         /*------------------------------- 余额-首页 --------------------------------------*/
//         {
//             path:"/balance/:type",
//             component:function(resolve){
//                 require(['@/components/index'], resolve);
//             }
//         },
//         /*------------------------------- 余额-余额明细 --------------------------------------*/
//         {
//             path:"/billhistory/:type",           //余额-余额明细-列表
//             component:function(resolve){
//                 require(['@/components/billHistory'], resolve);
//             }
//         },
//         {
//             path:"/billfreeze/:id",           //余额-余额明细-明细
//             component:function(resolve){
//                 require(['@/components/billFreeze'], resolve);
//             }
//         },
//         /*------------------------------- 余额-充值 --------------------------------------*/
//         {
//             path:"/recharge/0",
//             component:function(resolve){
//                 require(['@/components/recharge'], resolve);
//             }
//         },
//         // {
//         //     path:"/rechargeSelect/:id",    //余额-充值-余额充值
//         //     component:function(resolve){
//         //         require(['@/components/rechargeSelect'], resolve);
//         //     }
//         // },
//         {
//             path:"/rechargeok/:id",         //余额-充值-充值成功
//             component:function(resolve){
//                 require(['@/components/rechargeOk'], resolve);
//             }
//         },
//         /*------------------------------- 余额-提现 --------------------------------------*/
//         {
//             path:"/withdraw",           //余额-提现-首页
//             component:function(resolve){
//                 require(['@/components/withdraw'], resolve);
//             }
//         },
//         // {
//         //     path:"/withdrawselect/:id",     //余额-提现-提现选择
//         //     component:function(resolve){
//         //         require(['@/components/withdrawSelect'], resolve);
//         //     }
//         // },
//         {
//             path:"/withdrawok/:id",         //余额-提现-提交成功 [id=cash 余额提现]
//             component:function(resolve){
//                 require(['@/components/withdrawOk'], resolve);
//             }
//         },
//         /*------------------------------- 余额-银行卡 --------------------------------------*/
//         {
//             path:"/bankcard",        //余额-银行卡-首页
//             component:function(resolve){
//                 require(['@/components/bankCard'], resolve);
//             }
//         },
//         {
//             path:"/bankcardadd/:from",        //余额-银行卡-添加
//             component:function(resolve){
//                 require(['@/components/bankCardAdd'], resolve);
//             }
//         },
//         // {
//         //     path:"/bankCardPassword",     //余额-银行卡-输入密码
//         //     component:function(resolve){
//         //         require(['@/components/bankCardPassword'], resolve);
//         //     }
//         // },
//         {
//             path:"/bankcarddetails/:type",     //余额-银行卡-银行卡详情
//             component:function(resolve){
//                 require(['@/components/bankCardDetails'], resolve);
//             }
//         },
//         /*------------------------------- 余额-支付安全 --------------------------------------*/
//         {
//             path:"/pay",     //余额-支付安全-首页
//             component:function(resolve){
//                 require(['@/components/pay'], resolve);
//             }
//         },
//         {
//             path:"/payreset",     //余额-支付安全-重置支付密码
//             component:function(resolve){
//                 require(['@/components/payReset'], resolve);
//             }
//         },
//         {
//             path:"/payforget",     //余额-支付安全-忘记支付密码
//             component:function(resolve){
//                 require(['@/components/payForget'], resolve);
//             }
//         },
//         {
//             path:"/payalter",     //余额-支付安全-修改身份信息
//             component:function(resolve){
//                 require(['@/components/payAlter'], resolve);
//             }
//         },
//         /*《《《------------------------------- 个人中心 --------------------------------------*/
//         {
//             path:"/center",     //买家卖家中心-首页
//             component:function(resolve){
//                 require(['@/components/center'], resolve);
//             }
//         },
//         /*------------------------------- 个人中心 --------------------------------------》》》*/
//         /*------------------------------- 买家中心 --------------------------------------*/
//         {
//             path:"/buyercenter",     //买家卖家中心-首页
//             component:function(resolve){
//                 require(['@/components/buyerCenter'], resolve);
//             }
//         },
//         {
//             path:"/buyerset",     //买家中心-设置
//             component:function(resolve){
//                 require(['@/components/buyerset'], resolve);
//             }
//         },
//         {
//             path:"/buyerorder/:id",     //买家中心-订单
//             component:function(resolve){
//                 require(['@/components/buyerOrder'], resolve);
//             }

//         },
//         {
//             path:"/customerservice",     //买家中心-售后
//             component:function(resolve){
//                 require(['@/components/customerService'], resolve);
//             }

//         },
//         {
//             path:"/buyerorderdetails/:id",  //买家中心-订单详情页
//             component:function(resolve){
//                 require(['@/components/buyerOrderDetails'], resolve);
//             }

//         },
//         //买家中心----卖家发货48小时后，买家立即退货
//         {
//             path:"/buyernowreturn/:id",  //买家中心-卖家发货48小时后，买家申请退货
//             component:function(resolve){
//                 require(['@/components/buyernowreturn'], resolve);
//             }
//         },
//         //买家中心----卖家发货48小时后，买家立即退货


//         /*------------------------------- 买家中心 --------------------------------------*/
//         /*<<<<<<<<<<<<<<<<<<<<<<<<<<<------------------------------- 卖家中心 --------------------------------------*/
//         {
//             path:"/sellercenter",     //卖家中心-首页
//             component:function(resolve){
//                 require(['@/components/sellerCenter'], resolve);
//             }
//         },
//         {
//             path:"/compete",     //卖家中心-设置
//             component:function(resolve){
//                 require(['@/components/compete'], resolve);
//             }
//         },
//         {
//             path:"/sellerorder/:id",     //卖家中心-订单
//             name: "sellerOrder",
//             component:function(resolve){
//                 require(['@/components/sellerOrder'], resolve);
//             }

//         },
//         {
//             path:"/textBylpt",  //测试
//             component:function(resolve){
//                 require(['@/components/shareSub'], resolve);
//             }

//         },
//         {
//             path:"/sellerorderdetails/:id",  //卖家中心-订单详情页
//             component:function(resolve){
//                 require(['@/components/sellerorderdetails'], resolve);
//             }

//         },
//         {
//             path:"/sellersendgood/:id",  //卖家中心-立即发货路由
//             component:function(resolve){
//                 require(['@/components/sellersendgood'], resolve);
//             }

//         },

//         {
//             path:"/sellercustomerservice",  //卖家中心-售后页面
//             component:function(resolve){
//                 require(['@/components/sellerCustomerService'], resolve);
//             }

//         },
//         // 测试数字键盘
//         {
//             path:"/keyboard",  //卖家中心-售后页面
//             component: function(resolve){
//                 require(['@/components/keyboard'], resolve);
//             }

//         },
//         //测试路由
//         {
//             path: "/selleragreerefund/:id", // 同意退款 - 填单 - 卖家
//             component: function(resolve) {
//                 require(['@/components/selleragreerefund'], resolve);
//             }
//         },
//         {
//             path: "/selleragreereturn/:id", // 同意退货 -  - 卖家
//             component: function(resolve) {
//                 require(['@/components/selleragreereturn'], resolve);
//             }
//         },
//          {
//             path: "/sellerrefuse/:id/:type", // 拒绝退货和拒绝退款- 填单 - 卖家
//             component: function(resolve) {
//                 require(['@/components/sellerrefuse'], resolve);
//             }
//         },
        
//         {
//             path: "/article/:id", // 同意退款 - 填单 - 卖家
//             component: function(resolve) {
//                 require(['@/components/article'], resolve);
//             }
//         },
//         {

//             path: "*",
//             component : function(resolve){
//                 require(['@/components/notfind'], resolve);
//             }
//         }
//     ]
// })
