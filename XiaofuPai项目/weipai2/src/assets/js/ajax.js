define(function(require, exports, module){
    function request(option){
        //请求地址
        this.url = option.url;
        //请求类型
        this.type = option.type ? option.type : "POST";
        //请求参数
        this.data = option.data ? option.data : {};
        //返回数据类型
        this.dataType = option.dataType ? option.dataType : 'json';
        //请求成功后的回调
        this.respondEvent = option.respondEvent;
        //401响应回调
        this.notLoggedRespondEvent = option.notLoggedRespondEvent ? option.notLoggedRespondEvent : undefined;

        var that = this;

        //向服务器发起请求
        this.requestData = function(){
            var returnData = {};

            $.ajax({
                url : that.url,
                async : false,
                type : that.type,
                data : that.data,
                dataType : that.dataType,
                timeout : 2000,
                complete : function(XMLHttpRequest){

                },
                success : function(res){
                    //处理需要登录的情况
                    if(res.status == 401){
                        if(that.notLoggedRespondEvent){
                            that.notLoggedRespondEvent();
                        } else {
                            that.defaultNotLoggedRespondEvent();
                        }

                        return false;
                    }

                    //处理csrf验证失败
                    if(res.status == 402){
                        return false;
                    }

                    that.respondEvent(res);
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){
                    console.log("拿不到")
                }
            });
        };

        //401回调
        this.defaultNotLoggedRespondEvent = function(){
            location.href = "/api/login"
            // console.log("default 401");
        };

        return this;
    }

    return {
        refreshToken: function (respondEvent) {
            request({
                url: "/api/refreshToken",
                respondEvent: respondEvent,
            }).requestData();
        },
        getDemoList: function (page, respondEvent) {
            request({
                url: "/api/demoList",
                data: {
                    page: page,
                },
                respondEvent: respondEvent,
            }).requestData();
        },
        //获取微信接口配置参数
        getWechatParam: function (url,respondEvent) {
            request({
                url: "/api/wechat-param",
                type: "GET",
                data: {
                    url: url
                },  
                respondEvent: respondEvent,
            }).requestData();
        },
        postPublish: function (data, respondEvent) { //卖家发布信息
            request({
                url: "/api/postPublish",
                type: 'post',
                data: data,
                respondEvent: respondEvent,
            }).requestData();
        },
        getDate: function (respondEvent) {
            request({
                url: "/api/get-date",
                type: 'get',
                respondEvent: respondEvent,
            }).requestData();
        },
        getType: function (parent_id, respondEvent) {
            request({
                url: "/api/type",
                type: 'get',
                data: {
                    type: parent_id
                },
                respondEvent: respondEvent,
            }).requestData();
        },
        hotList: function (page, respondEvent) { //首页热门
            request({
                url: "/api/index",
                type: 'get',
                data: {
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        followState: function (state, userid, respondEvent) {//关注
            request({
                url: "/api/getDoFollow",
                type: "get",
                data: {
                    type: state,
                    fowid: userid
                },
                respondEvent: respondEvent
            }).requestData();
        },
        userLike: function (id, respondEvent) {//点赞
            request({
                url: "/api/getDoLike",
                type: "get",
                data: {
                    goodid: id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        classifYnav: function (page, respondEvent) {//分类首页
            request({
                url: "/api/type",
                type: "get",
                data: {
                    type: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        classifYformat: function (id, pattern, num, respondEvent) {//分类的展现形式
            request({
                url: "/api/typelist",
                type: "GET",
                data: {
                    type: id,
                    mode: pattern,
                    page: num
                },
                respondEvent: respondEvent
            }).requestData();
        },
        getFans: function (page, respondEvent) {
            request({
                url: "/api/fans-info",
                type: 'get',
                data: {
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        editFocusStatus: function (userid, my_focus, respondEvent) {
            request({
                url: "/api/edit-focus-status",
                type: 'POST',
                data: {
                    userid: userid,
                    my_focus: my_focus
                },
                respondEvent: respondEvent
            }).requestData();
        },
        sellerSet: function (respondEvent) {
            request({
                url: "/api/seller-set",
                type: 'get',
                respondEvent: respondEvent
            }).requestData();
        },
        changeSellerStatus: function (is_seller, respondEvent) {
            request({
                url: "/api/change-seller-status",
                type: 'get',
                data: {
                    is_seller: is_seller,
                },
                respondEvent: respondEvent
            }).requestData();
        },
        addressList: function (respondEvent) { //卖家退货地址列表
            request({
                url: "/api/address-list",
                type: 'get',
                respondEvent: respondEvent
            }).requestData();
        },
        //<<===================杨彤杰=======================================
        //<<===================余额首页=======================================
        balanceList: function (num, respondEvent) {  //余额首页
            request(
                {
                    url: "/api/balance-index",
                    type: "get",
                    data: {
                        type: num
                    },
                    respondEvent: respondEvent
                }
            ).requestData();
        },
        confirmPassword: function (pwd, respondEvent) {//验证密码      password.js
            request({
                url: "/api/passWord",
                type: "post",
                data: {
                    pwd: pwd
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //<<===================余额首页=======================================
        //<<===================个人中心=======================================
        //个人中心     center.js
        getIsSeller: function (respondEvent) {
            request({
                url: "/api/is-seller",
                type: "get",
                respondEvent: respondEvent
            }).requestData();
        },
        //===================个人中心=======================================>>
        //referBankCard(pwd,uName,card)
        //<<===================买家中心=======================================
        //买家中心和卖家中心首页从后端获取数据的ajax封装函数
        getCenterData: function (is_seller, respondEvent) {
            request({
                url: "/api/user-index",
                type: "get",
                data: {
                    type: is_seller
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //买家订单列表    1. buyerAllOrder.js  2. nopayment.js 3   unFilledOrder   4.unreceived.js， 5.customerService
        getOrderList: function (type, page, respondEvent) {
            request({
                url: "/api/buyer/orderlist",
                type: "get",
                data: {
                    tap: type,
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //买家订单列表    1. buyerAllOrder.js  2. nopayment.js 3   unFilledOrder   4.unreceived.js， 5.customerService
        //买家订单详情
        getOrderDetails: function (id, respondEvent) {
            request({
                url: "/api/buyer/order-detail",
                type: "get",
                data: {
                    order_id: id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //买家订单详情
        // //买家订单退款页面
        // getRefundInfo: function(order_id,respondEvent){
        //     request({
        //         url:"/api/buyer/order-refund",
        //         type:"get",
        //         data:{
        //             order_id: order_id
        //         },
        //         respondEvent:respondEvent
        //     }).requestData();
        // },
        // //买家订单退款页面


        /*买家延迟付款或者买家延迟收货页面*/
        goDelay: function (order_id, respondEvent) {
            request({
                url: "/api/buyer/order-delayed",
                type: "post",
                data: {
                    order_id: order_id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        /*买家延迟付款或者买家延迟收货页面*/



        /*买家中心拒绝当面交易或者拒绝收货*/
        goRefuse: function (order_id, key, respondEvent) {
            request({
                url: "/api/buyer/order-refused",
                type: "post",
                data: {
                    order_id: order_id,
                    key: key
                },
                respondEvent: respondEvent
            }).requestData();
        },
        /*买家中心拒绝当面交易或者拒绝收货*/


        /*买家确认收货或者确认退货*/
        goConfirm: function (order_id, refund_express, refund_express_number, refund_type,respondEvent) {
            request({
                url: "/api/buyer/order-confirm",
                type: "post",
                data: {
                    order_id: order_id,
                    refund_express: refund_express,
                    refund_express_number: refund_express_number,
                    refund_type: refund_type
                },
                respondEvent: respondEvent
            }).requestData();
        },
        /*买家确认收货或者确认退货*/


        //买家中心申请退货或者申请退款

        confirmRefund: function(order_id,index,returnReason,respondEvent){

            request({
                url: "/api/buyer/order-refunded",
                type: "post",
                data: {
                    order_id: order_id,
                    return_reason: index,
                    other_return_reason: returnReason
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //买家中心申请退货或者申请退款


        /*买家中心取消申请退货或者申请退款*/
        cancelRefund: function (order_id, respondEvent) {
            request({
                url: "/api/buyer/order-withdraw",
                type: "post",
                data: {
                    order_id: order_id,
                },
                respondEvent: respondEvent
            }).requestData();
        },
        /*买家中心取消申请退货或者申请退款*/

        //买家确认收货
        // goReceived: function(order_id,respondEvent){
        //     request({
        //         url:"/api/buyer/received",
        //         type:"post",
        //         data:{
        //             order_id: order_id
        //         },
        //         respondEvent:respondEvent
        //     }).requestData();
        // },
        //买家确认收货
        /*买家信息编辑页面即买家设置页面*/
        getUserInfo: function (respondEvent) {
            request({
                url: "/api/buyer/user-detail",
                type: "get",
                respondEvent: respondEvent
            }).requestData();
        },
        refreshUserData: function (contact_name,is_seller,respondEvent) {
            request({
                url: "/api/buyer/user-enited",
                type: "post",
                data: {
                    contact_name: contact_name,
                    is_seller: is_seller
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //===================买家中心=======================================>>
        //<<===================卖家中心=======================================
        //卖家订单列表    1. AllOrder.js  2. sllerNopayment.js 3   sellerUnFilledOrder   4.sellerUnreceived.js， 5.sellerCustomerService
        getSellerOrderList: function (type, page, respondEvent) {
            request({
                url: "/api/order-info",
                type: "get",
                data: {
                    type: type,
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //卖家订单详情列表    1. sellerAllOrder.js  2. sellerNopayment.js  3   sellerUnFilledOrder   4.sellerUnreceived.js， 5.sellerCustomerService

        getDetails: function (id, respondEvent) {
            request({
                url: "/api/order-detail",
                type: "get",
                data: {
                    order_id: id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //卖家当面交易/拒绝退货、同意退货、通用接口
        orderHandle: function (id, request_type, index, refused_reason,other_refused_reason, respondEvent) {
            request({
                url: "/api/order-handle",
                type: "post",
                data: {
                    order_id: id,
                    request_type: request_type,
                    address_id: index,
                    refused_reason: refused_reason,
                    other_refused_reason: other_refused_reason
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //卖家当面交易/拒绝退货、同意退货、通用接口

        /*立即发货页面请求页面消息*/
        getSendInfo: function (order_id, respondEvent) {
            request({
                url: "/api/now-send",
                type: "get",
                data: {
                    order_id: order_id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        /*立即发货页面请求页面消息*/
        //确认发货
        sendgood: function (order_id, express, express_number, is_deliver_home,seller,seller_mobile,seller_address, respondEvent) {
            request({
                url: "/api/sure-send",
                type: "post",
                data: {
                    order_id: order_id,
                    express: express,
                    express_number: express_number,
                    is_deliver_home: is_deliver_home,
                    seller: seller,
                    seller_mobile: seller_mobile,
                    seller_address: seller_address
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //确认发货
        //===================卖家中心=========================================>>
        //===========================杨彤杰=================>>
        /*關於文章的ajax封裝函數*/
        getArticleInfo: function (id, respondEvent) {
            request({
                url: "/api/article",
                type: "get",
                data: {
                    id: id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        /*   /關於文章的ajax封裝函數*/
        addressSelect: function (address_id, respondEvent) {
            request({
                url: "/api/address-select",
                type: "GET",
                data: {
                    address_id: address_id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        newsAadd: function (formsNew, respondEvent) {
            request({
                url: "/api/address-add",
                type: 'post',
                data: formsNew,
                respondEvent: respondEvent
            }).requestData();
        },
        editShopDesc: function (shopDesc, respondEvent) {
            request({
                url: "/api/edit-shop-desc",
                type: "POST",
                data: {
                    shop_desc: shopDesc
                },
                respondEvent: respondEvent,
            }).requestData();
        },
        updateUserInfo: function (respondEvent) {
            request({
                url: "/api/update-user-info",
                type: "GET",
                respondEvent: respondEvent
            }).requestData();
        },
        // 聊天
        contactList: function (page, respondEvent) {
            request({
                url: "/api/contactlist",
                type: "GET",
                data: {
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        getLog: function (id, page, respondEvent) {
            request({
                url: "/api/msglog",
                type: "GET",
                data: {
                    id: id,
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        getToken: function (respondEvent) {
            request({
                url: "/api/apitoken",
                type: "GET",
                respondEvent: respondEvent
            }).requestData();
        },
        addressAdd: function (data, respondEvent) {
            request({
                url: "/api/address-add",
                type: "POST",
                data: data,
                respondEvent: respondEvent
            }).requestData();
        },
        //竞拍管理
        auctionShow: function (num, key, respondEvent) {
            request({
                url: "/api/auction-manage",
                type: "GET",
                data: {
                    type: num,
                    page: key
                },
                respondEvent: respondEvent
            }).requestData();
        },
        getFollowList: function (page, respondEvent) { // 获取首页关注数据
            request({
                url: "/api/followList",
                type: "GET",
                data: {
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        getAuctionManage: function (page, type, respondEvent) { //拍品管理
            request({
                url: "/api/auction-manage",
                type: "GET",
                data: {
                    page: page,
                    type: type
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //获取拍品的基本信息，标题，缩略图
        getBasicGoods: function (id, respondEvent) {
            request({
                url: "/api/basicgoods",
                type: "GET",
                data: {
                    id: id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //获取聊天双方用户的信息
        getContactsInfo: function (id, respondEvent) {
            request({
                url: "/api/contact-info",
                type: "GET",
                data: {
                    id: id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //获取oss授权 [type=img|video]
        getOssAuthorize: function (type, respondEvent) {
            request({
                url: "/api/ossauthorize",
                type: "GET",
                data : {
                    type : type
                },
                respondEvent: respondEvent
            }).requestData();
        },
        //获取阿里云sts
        getAliSts : function(respondEvent){
            request({
                url : "/api/alists",
                type : "GET",
                respondEvent : respondEvent
            }).requestData()
        },
        dingwei: function (lat, lng, url, respondEvent) {
            request({
                url: url,
                type: "GET",
                data: {
                    lat: lat,
                    lng: lng
                },
                dataType: "jsonp",
                respondEvent: respondEvent
            }).requestData();
        },
        // 出价接口
        getBidPort: function (id, price, respondEvent) {
            request({
                url: "/api/addBid",
                type: "GET",
                data: {
                    goodid: id,
                    bidprice: price
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 商铺首页-头部
        getShopHead: function (id, respondEvent) {
            request({
                url: "/api/shop-common",
                type: "GET",
                data: {
                    user_id: id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 商铺首页-商品列表
        getShopIndex: function (id, type, page, respondEvent) {
            request({
                url: "/api/shop-index",
                type: "GET",
                data: {
                    user_id: id,
                    type: type,
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 商铺信息页
        getShopInfo: function (id, respondEvent) {
            request({
                url: "/api/shop-info",
                type: "GET",
                data: {
                    user_id: id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 商品详情页
        getGoodsDetails: function (id, respondEvent) {
            request({
                url: "/api/goods-detail",
                type: "GET",
                data: {
                    id: id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 店铺二维码
        getQrcode: function (id, respondEvent) {
            request({
                url: "/api/create-qrcode",
                type: "GET",
                data: {
                    id: id
                },
                respondEvent: respondEvent
            }).requestData()
        },
        // 拍品下架
        offShelf: function (id, status, respondEvent) {
            request({
                url: "/api/sell-status-change",
                type: "GET",
                data: {
                    goods_id: id,
                    status: status
                },
                respondEvent: respondEvent
            }).requestData()
        },
        // 支付卖家保证金
        getDepositPay: function (id, respondEvent) {
            request({
                url: "/api/deposit-pay",
                type: "GET",
                data: {
                    goods_id: id,
                },
                respondEvent: respondEvent
            }).requestData()
        },
        // 支付买家保证金 [因为后端查询方式不得不氛围两个接口]
        getBuyerPay: function(goodsid, respondEvent) {
            request({
                url: "/api/pay-deposit",
                type: "GET",
                data: {
                    goods_id: goodsid,
                },
                respondEvent: respondEvent
            }).requestData()
        },
        //获取系统消息
        getSystemMsg: function (page, respondEvent) {
            request({
                url: "/api/system-msg",
                type: "GET",
                data: {
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 缴纳保证金, 充值
        payOrder: function (params, respondEvent) {
            // 设置默认参数
            var defaults = {};
            var params = $.extend(defaults, params);
            request({
                url: "/api/pay-order",
                type: "",
                data: {},
            });
        },
        // 商品支付
        goodOrder: function (params, respondEvent) {
            var defaults = {};
            var params = $.extend(defaults, params);
            request({
                url: "/api/good-order",
                type: "",
                data: {},
            });
        },
        // 发送验证码 Send verification code
        sendVerifiyCode: function (mobile,type, respondEvent) {
            request({
                url: "/api/sendCode",
                type: "GET",
                data: {
                    mobile: mobile,
                    type: type
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 验证发送的验证码 
        smsVerifiy: function (mobile, code, type, respondEvent) {
            request({
                url: "/api/updateInfo",
                type: "GET",
                data: {
                    mobile: mobile,
                    code: code,
                    type: type
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 出价列表分页
        getBidList: function (goodsId, page, respondEvent) {
            request({
                url: "/api/bid-list",
                type: "GET",
                data: {
                    goods_id: goodsId,
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 课程页面
        getCourseList: function (page, respondEvent) {
            request({
                url: "/api/all-course",
                type: "GET",
                data: {
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 验证原密码
        VerifyPassword: function (pwd, respondEvent) {
            request({
                url: "/api/verify-oldpwd",
                type: "POST",
                data: {
                    pwd: pwd
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 修改支付密码
        paypwdChange: function (pwd, sign, respondEvent) {
            request({
                url: "/api/paypwd-change",
                type: "POST",
                data: {
                    pwd: pwd,
                    sign: sign
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 订单支付
        orderPayment: function (orderId, respondEvent) {
            request({
                url: "/api/good-order",
                type: "GET",
                data: {
                    orderid: orderId
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 支付押金
        depositPayment: function (goodid, type, respondEvent) {
            request({
                url: "/api/pay-order",
                type: "GET",
                data: {
                    goodid: goodid,
                    type: type
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 删除拍品
        deleteGoods: function (goodsId, respondEvent) {
            request({
                url: "/api/goods-delete",
                type: "GET",
                data: {
                    goods_id: goodsId
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 草稿箱上架查询
        shelfQuery: function (goodsId, respondEvent) {
            request({
                url: "/api/putaway",
                type: "GET",
                data: {
                    goods_id: goodsId
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 忘记密码 验证身份
        verifyIdentity: function (username, nu, respondEvent) {
            request({
                url: "/api/verify-identity",
                type: "GET",
                data: {
                    username: username,
                    nu: nu
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 检测当前用户是否绑定有银行卡
        checkCardBind: function (username, identity, respondEvent) {
            request({
                url: "/api/check-card-bind",
                type: "GET",
                data: {
                    username: username,
                    identity: identity
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 修改身份信息
        editIdentity: function (username, identity, pay_pwd, respondEvent) {
            request({
                url: "/api/edit-identity",
                type: "POST",
                data: {
                    username: username,
                    identity: identity,
                    pay_pwd: pay_pwd
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 买家中心参拍拍品
        getBuyerAuction: function (page, style, respondEvent) {
            request({
                url: "/api/buyer/getlist",
                type: "GET",
                data: {
                    page: page,
                    style: style
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 提现
        withdrawCash: function (money, respondEvent) {
            request({
                url: "/api/extract-index",
                type: "GET",
                data: {
                    money: money
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 选择银行卡
        selectBankCard: function (bankid, respondEvent) {
            request({
                url: "/api/update-bank",
                type: "GET",
                data: {
                    bankid: bankid
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 用户设置支付密码&用户名&身份证号
        addIdentity: function (username, id_number, pay_password, respondEvent) {
            request({
                url: "/api/add-identity",
                type: "POST",
                data: {
                    username: username,
                    id_number: id_number,
                    pay_password: pay_password
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 展示用户银行卡列表
        getBankList: function (respondEvent) {
            request({
                url: "/api/bankcard-list",
                type: "GET",
                respondEvent: respondEvent
            }).requestData();
        },
        // 用户银行卡详情数据
        getBankCardDetails: function (id, respondEvent) {
            request({
                url: "/api/show-bankcard",
                type: "GET",
                data: {
                    id: id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 添加银行卡 
        addBankCard: function (dataObj, respondEvent) {
            request({
                url: "/api/add-bankcard",
                type: "POST",
                data: {
                    id_number_pic_f: dataObj.id_number_pic_f,
                    id_number_pic_b: dataObj.id_number_pic_b,
                    id_number_pic: dataObj.id_number_pic,
                    card_pic: dataObj.card_pic,
                    number: dataObj.number,
                    card_type: dataObj.card_type,
                    mobile: dataObj.mobile,
                    province: dataObj.province,
                    city: dataObj.city,
                    bank: dataObj.bank
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 添加银行卡默认带上的身份信息
        showIdentity: function (respondEvent) {
            request({
                url: "/api/show-identity",
                type: "GET",
                respondEvent: respondEvent
            }).requestData();
        },
        // 修改银行卡
        editBankCard: function (dataObj, respondEvent) {
            request({
                url: "/api/enit-bankcard",
                type: "POST",
                data: {
                    id: dataObj.id,
                    id_number_pic_f: dataObj.id_number_pic_f,
                    id_number_pic_b: dataObj.id_number_pic_b,
                    id_number_pic: dataObj.id_number_pic,
                    card_pic: dataObj.card_pic,
                    number: dataObj.number,
                    card_type: dataObj.card_type,
                    mobile: dataObj.mobile,
                    province: dataObj.province,
                    city: dataObj.city,
                    bank: dataObj.bank
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 删除银行卡
        deleteBankCard: function (bankid, respondEvent) {
            request({
                url: "/api/del-bankcard",
                type: "POST",
                data: {
                    id: bankid
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 余额明细 [历史记录]
        getBalanceHistory: function (page, respondEvent) {
            request({
                url: "/api/balanceList",
                type: "GET",
                data: {
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 余额明细 [已提现] 
        getBalanceExtract: function (page, respondEvent) {
            request({
                url: "/api/extracted",
                type: "GET",
                data: {
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 余额明细 [解冻]
        getBalanceFreeze: function (status, page, respondEvent) {
            request({
                url: "/api/balance-freeze",
                type: "GET",
                data: {
                    status: status,
                    page: page
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 余额明细 [查看详情]
        getBalanceDetails: function (id, respondEvent) {
            request({
                url: "/api/balance-detail",
                type: "GET",
                data: {
                    id: id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 删除地址
        deleteAddress: function (id, respondEvent) {
            request({
                url: "/api/del-address",
                type: "GET",
                data: {
                    id: id
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // 点击商铺头像
        avatorClick: function (user_id, type, respondEvent) {
            request({
                url: "/api/header-click",
                type: "GET",
                data: {
                    user_id: user_id,
                    type: type
                },
                respondEvent: respondEvent
            }).requestData();
        },
        // banner 图
        getBanner: function(respondEvent) {
            request({
                url: "/api/banner",
                type: "get",
                respondEvent: respondEvent
            }).requestData();
        },
        // 
        pay:function(paydata, respondEvent){
            request({
                url: "/api/test-wxpay",
                type: "get",
                data: paydata,             
                respondEvent: respondEvent
           }).requestData();
   
        },
        // 充值成功
        rechargeSuccess: function(paynum, respondEvent) {
            request({
                url: "/api/pay-success",
                type: "GET",
                data: {
                    paynum: paynum
                },             
                respondEvent: respondEvent
           }).requestData();
        },
        // 确认提现
        confirmWithdraw: function(type,bankid,money,respondEvent) {
            request({
                url: "/api/extract-money",
                type: "GET",
                data: {
                    type: type,
                    bankid: bankid,
                    money: money
                },             
                respondEvent: respondEvent
           }).requestData();
        },
        // 提现成功 获取数据
        extractSuccess: function(id,respondEvent) {
            request({
                url: "/api/extract-success",
                type: "GET",
                data: {
                    id: id,
                },             
                respondEvent: respondEvent
           }).requestData();
        },
        // 余额提现页面数据
        getExtractPage: function(respondEvent) {
           request({
                url: "/api/extract-input",
                type: "GET",            
                respondEvent: respondEvent
           }).requestData(); 
        },
        // footer消息通知
        messageNotify: function(respondEvent) {
            request({
                url: "/api/unread",
                type: "GET",            
                respondEvent: respondEvent
           }).requestData();
        },
        // 添加店铺的浏览量
        addShopView:function(userid,respondEvent) {
            request({
                url: "/api/shop-view",
                type: 'GET',
                data: {
                    userid: userid
                }, 
                respondEvent: respondEvent
            }).requestData();
        },
        // 获取个人信息
        showUserInfo: function(respondEvent) {
            request({
                url: "/api/show-userinfo",
                type: "GET",
                respondEvent: respondEvent
            }).requestData();
        }
    }
});
