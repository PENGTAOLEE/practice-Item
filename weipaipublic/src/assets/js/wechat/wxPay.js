define(function(require,exports,module){
    var ajax = require('ajax');
    var wx = require('weixin-js-sdk')
    // require('http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
    function wxPay() {
        var oThis = this;
        // 下订单
         oThis.makeOrder = function (orderData) {
            var defaults = {
                // 支付方式 1 是微信 2 是余额
                'paytype': 1,
                // 1 商品保证金 2 充值 3 订单 4 诚信保证金 5 卖家保证金
                'ordertype': 0,
                'goodid':0,
                // 订单号
                'paynum':'a2014090899999',
                'money':1.99,
                // goodtype  为 1:结拍提交的订单; 2:一口价的订单
                'goodtype':0,
                'formurl' : 'details',  // 跳转支付url 默认为详情页 details: 详情页; follow: 关注页面
                'address':[], // 收获地址
                'orderid' : 0            // 订单id
            };
            var orderData = $.extend(defaults, orderData);          
            ajax.pay(orderData, function(data) {
                if(data.status == 200) {
                    var configInfo = data.data.info;
                    var orderInfo = data.data.orderdata;
                     oThis.appId = configInfo.appId;
                     oThis.timeStamp = configInfo.timeStamp;
                     oThis.nonceStr = configInfo.nonceStr;  
                     oThis.package = configInfo.package;     
                     oThis.signType = configInfo.signType;
                     oThis.paySign = configInfo.paySign;
                     // 订单相关数据获取
                     oThis.requestData = orderInfo;
                     // 发起支付
                    oThis.bindWeixin();
                } else if(data.status == 202) {
                    // 支付宝
                    $('#app').append(data.data.orderdata);
                    setTimeout(() => {
                        document.forms['alipaysubmit'].submit();
                    },1000)
                } else {
                    alert('下单失败: '+data.msg);
                    setTimeout(function(){
                        $('.sellpayment').css('backgroundColor','#15af25');
                        $('.sellpayment').attr('disabled',false);
                    },100)
                   
                }  
            });
        }

        // 发起支付
        oThis.bindWeixin = function () {
            if (typeof WeixinJSBridge == 'undefined') {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', oThis.onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', oThis.onBridgeReady);
                    document.attachEvent('onWeixinJSBrideReady',oThis.onBridgeReady);
                }
            } else {
               oThis.onBridgeReady();
            }
        }
        // 调用支付的接口
        oThis.onBridgeReady = function() {
            // js 支付调用接口
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                {
                    "appId":oThis.appId,
                    "timeStamp":oThis.timeStamp,
                    "nonceStr":oThis.nonceStr,
                    "package":oThis.package,
                    "signType":oThis.signType,
                    "paySign":oThis.paySign,
                },

                // 支付通知结果
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok"){
                        // 1 商品保证金 2 充值 3 订单 4 诚信保证金 5 卖家保证金
                        var orderType = oThis.requestData.ordertype;  //  支付类型     
                        var goodsid = oThis.requestData.goods_id;     //  拍品id
                        var paynum  = oThis.requestData.paynum;       //  订单id
                        var url     = oThis.requestData.formurl;      //  关注页 || 详情页面
                        var orderid = oThis.requestData.orderid;      // 订单id
                        
                        switch (orderType) {
                            case 1: // 支付商品押金  [判断详情页 || 关注列表页] isOK
                                if (url == 'details') {
                                    top.location.href = '/lotdetails/' + goodsid + '?from=complete&goodsid=' + goodsid;
                                } else if (url = 'follow') {
                                    top.location.href = '/follow?from=complete&goodsid=' + goodsid;
                                }
                                break;
                            case 2: // 余额充值 跳到充值成功页面 需要传递 paynum
                                top.location.href = '/rechargeok/' + paynum;
                                break;
                            case 3: // 订单支付 订单详情页
                                top.location.href = '/buyerOrderDetails/' + orderid;
                                break;
                            case 4: // 支付诚信押金  [判断详情页 || 关注列表页]
                                if (url == 'details') {
                                    top.location.href = '/lotdetails/' + goodsid + '?from=complete&goodsid=' + goodsid;
                                } else if (url = 'follow') {
                                    top.location.href = '/follow?from=complete&goodsid=' + goodsid;
                                }
                                break;
                            case 5: // 支付卖家保证金 跳到详情页 isOK
                                top.location.href = '/lotdetails/' + goodsid;
                                break;
                            case 6: // 支付认证费用
                                top.location.href = '/compete';
                                break;
                            default: 
                                throw new Error("不存在的支付类型");
                                top.location.href = '/';

                        }
                        return;
                    }
                    // 用户支付途中取消
                    if(res.err_msg == "get_brand_wcpay_request:cancel"){
                        setTimeout(function(){
                            $('.sellpayment').css('backgroundColor','#15af25');
                            $('.sellpayment').attr('disabled',false);
                        },100)
                        return;
                    }
                    if(res.err_msg == "get_brand_wcpay_request:fail") {
                        setTimeout(function(){
                            $('.sellpayment').css('backgroundColor','#15af25');
                            $('.sellpayment').attr('disabled',false);
                        },100)
                        alert("支付失败");
                        return;
                    }
                }
            )
        };
    }

    return {
        wxPay: wxPay
    }
});
