import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            component: function(resolve) {
                require(['@/components/homepage/banner'], resolve)
            },
            children: [{
                    path: 'index',
                    component: function(resolve) { // 热门
                        require(['@/components/homepage/indexhot'], resolve)
                            // seajs.use("module/indexhotBack/indexhotBack",resolve)
                    }
                },
                {
                    path: 'follow', // 关注
                    component: function(resolve) {
                        require(['@/components/homepage/indexfollow'], resolve)
                    }
                },
                {
                    path: 'college', // 美院
                    component: function(resolve) {
                        require(['@/components/homepage/indexcollege'], resolve)
                    }
                }
            ]
        },
        {
            path: '/classify', // 分类首页
            component: function(resolve) {
                require(['@/components/classify/classify-index'], resolve)
            },
            children: [{
                path: 'content/:id',
                component: function(resolve) {
                    require(['@/components/classify/classify-content'], resolve)
                }
            }]
        },
        {
            path: '/format/:type', // 分类排列格式
            component: function(resolve) {
                require(['@/components/classify/classify-format'], resolve)
            },
            children: [{
                path: 'sort/:id',
                component: function(resolve) {
                    require(['@/components/classify/classify-sort'], resolve)
                }
            }]
        },
        {
            path: '/autionlist', // 卖家拍卖管理
            component: function(resolve) {
                require(['@/components/auction'], resolve)
            },
            children: [{
                path: 'govern/:id',
                component: function(resolve) {
                    require(['@/components/auction-list'], resolve)
                }
            }]
        },
        {
            path: '/shops/:id', // 商铺首页
            component: function(resolve) {
                require(['@/components/classify/classify-shops'], resolve)
            }
        },
        {
            path: '/shopsnews/:id', // 商铺信息
            component: function(resolve) {
                require(['@/components/classify/classify-shopsnews'], resolve)
            }
        },
        {
            path: '/lotdetails/:id', // 拍品详情
            component: function(resolve) {
                require(['@/components/lot-details'], resolve)
            }
        },
        {
            path: '/picture', // 发布
            component: function(resolve) {
                require(['@/components/homepage/release-picture'], resolve)
            }
        },
        {
            path: '/payment/:id', // 卖家保证金
            component: function(resolve) {
                require(['@/components/balance/release-payment'], resolve)
            }
        },
        {
            path: '/newslist', // 消息列表
            component: function(resolve) {
                require(['@/components/find/newslist'], resolve)
            }
        },
        {
            path: '/newschat/:id/:send_welcome', // 聊天窗口页
            component: function(resolve) {
                require(['@/components/find/newschat'], resolve)
            }
        },
        {
            path: '/newschat/:id/:send_welcome/:auction', // 聊天窗口页，发送拍品信息
            component: function(resolve) {
                require(['@/components/find/newschat'], resolve)
            }
        },
        {
            path: '/systemmsg', // 系统消息
            component: function(resolve) {
                require(['@/components/find/systemMsg'], resolve)
            }
        },
        {
            path: '/find', // 发现列表内容
            component: function(resolve) {
                require(['@/components/find/find-index'], resolve)
            }
        },
        {
            path: '/curriculum', // 课程
            component: function(resolve) {
                require(['@/components/find/find-curriculum'], resolve)
            }
        },
        // {
        //    path:"/works",//消息列表内容
        //    component:function(resolve){
        //        require(['@/components/works'], resolve);
        //    }
        // },
        // {
        //    path:"/information/:id",//用户信息
        //    component:function(resolve){
        //        require(['@/components/information'], resolve);
        //    }
        // },
        {
            path: '/auction',
            component: function(resolve) {
                require(['@/components/auction'], resolve)
            },
            children: [{
                path: 'govern/:id',
                component: function(resolve) {
                    require(['@/components/auction-list'], resolve)
                }
            }]
        },
        {
            path: '/compete', // 卖家设置
            component: function(resolve) {
                require(['@/components/setup/compete'], resolve)
            }
        },
        {
            path: '/items', // 参拍拍品
            component: function(resolve) {
                require(['@/components/items'], resolve)
            },
            children: [{
                path: 'govern/:id',
                component: function(resolve) {
                    require(['@/components/itemlist'], resolve)
                }
            }]
        },
        {
            path: '/buyerset', // 买家设置
            component: function(resolve) {
                require(['@/components/setup/buyerset'], resolve)
            }
        },
        {
            path: '/location', // 地址设置
            name: 'location',
            component: function(resolve) {
                require(['@/components/setup/location'], resolve)
            }
        },
        {
            path: '/forms', // 表单
            component: function(resolve) {
                require(['@/components/setup/forms'], resolve)
            }
        },
        {
            path: '/addressmap', // 退货地址定位
            component: function(resolve) {
                require(['@/components/setup/addressmap'], resolve)
            }
        },
        {
            path: '/addresslist', // 退货地址定位
            component: function(resolve) {
                require(['@/components/setup/addresslist'], resolve)
            }
        },
        {
            path: '/fans', // 粉丝
            component: function(resolve) {
                require(['@/components/fans'], resolve)
            }
        },
        {
            path: '/shoping', // 商铺介绍
            component: function(resolve) {
                require(['@/components/shoping'], resolve)
            }
        },
        /* ----------------------------------售后----------------------------------- */
        {
            path: '/application/:id/:type', // 申请退款或者申请退货
            component: function(resolve) {
                require(['@/components/application'], resolve)
            }
        },
        /* ------------------------------- 余额-首页 -------------------------------------- */
        {
            path: '/balance/:type',
            component: function(resolve) {
                require(['@/components/balance/balance'], resolve)
            }
        },
        /* ------------------------------- 余额-余额明细 -------------------------------------- */
        {
            path: '/billhistory/:type', // 余额-余额明细-列表
            component: function(resolve) {
                require(['@/components/balance/billHistory'], resolve)
            }
        },
        {
            path: '/billfreeze/:id', // 余额-余额明细-明细
            component: function(resolve) {
                require(['@/components/balance/billFreeze'], resolve)
            }
        },
        /* ------------------------------- 余额-充值 -------------------------------------- */
        {
            path: '/recharge/0',
            component: function(resolve) {
                require(['@/components/balance/recharge'], resolve)
            }
        },
        {
            path: '/rechargeok/:id', // 余额-充值-充值成功
            component: function(resolve) {
                require(['@/components/balance/rechargeOk'], resolve)
            }
        },
        /* ------------------------------- 余额-提现 -------------------------------------- */
        {
            path: '/withdraw', // 余额-提现-首页
            component: function(resolve) {
                require(['@/components/balance/withdraw'], resolve)
            }
        },
        {
            path: '/withdrawok/:id', // 余额-提现-提交成功 [id=cash 余额提现]
            component: function(resolve) {
                require(['@/components/balance/withdrawOk'], resolve)
            }
        },
        {
            path: '/bankcard', // 余额-银行卡-首页
            component: function(resolve) {
                require(['@/components/balance/bankCard'], resolve)
            }
        },
        {
            path: '/bankcardadd/:from', // 余额-银行卡-添加
            component: function(resolve) {
                require(['@/components/balance/bankCardAdd'], resolve)
            }
        },
        {
            path: '/bankcarddetails/:type', // 余额-银行卡-银行卡详情
            component: function(resolve) {
                require(['@/components/balance/bankCardDetails'], resolve)
            }
        },
        /* ------------------------------- 余额-支付安全 -------------------------------------- */
        {
            path: '/pay', // 余额-支付安全-首页
            component: function(resolve) {
                require(['@/components/balance/pay'], resolve)
            }
        },
        {
            path: '/payreset', // 余额-支付安全-重置支付密码
            component: function(resolve) {
                require(['@/components/balance/payReset'], resolve)
            }
        },
        {
            path: '/payforget', // 余额-支付安全-忘记支付密码
            component: function(resolve) {
                require(['@/components/balance/payforget'], resolve)
            }
        },
        {
            path: '/payalter', // 余额-支付安全-修改身份信息
            component: function(resolve) {
                require(['@/components/balance/payAlter'], resolve)
            }
        },
        /* --------------------------------------余额-支付安全 结束---------------------------------------------- */
        {
            path: '/center', // 买家卖家中心-首页
            component: function(resolve) {
                require(['@/components/center'], resolve)
            }
        },
        {
            path: '/buyercenter', // 买家卖家中心-首页
            component: function(resolve) {
                require(['@/components/buyerCenter'], resolve)
            }
        },
        {
            path: '/buyerset', // 买家中心-设置
            component: function(resolve) {
                require(['@/components/setup/buyerset'], resolve)
            }
        },
        {
            path: '/buyerorder/:id', // 买家中心-订单
            component: function(resolve) {
                require(['@/components/buyerOrder'], resolve)
            }

        },
        {
            path: '/customerservice', // 买家中心-售后
            component: function(resolve) {
                require(['@/components/customerService'], resolve)
            }

        },
        {
            path: '/buyerorderdetails/:id', // 买家中心-订单详情页
            component: function(resolve) {
                require(['@/components/buyerOrderDetails'], resolve)
            }

        },
        {
            path: '/buyernowreturn/:id', // 买家中心-卖家发货48小时后，买家申请退货
            component: function(resolve) {
                require(['@/components/buyernowreturn'], resolve)
            }
        },
        {
            path: '/buyerorderevaluate/:id', // 买家中心-评价页面
            component: function(resolve) {
                require(['@/components/buyer/buyerorderevaluate'], resolve)
            }
        },
        /* ------------------------------- 买家中心 -------------------------------------- */
        {
            path: '/sellercenter', // 卖家中心-首页
            component: function(resolve) {
                require(['@/components/sellerCenter'], resolve)
            }
        },
        {
            path: '/compete', // 卖家中心-设置
            component: function(resolve) {
                require(['@/components/setup/compete'], resolve)
            }
        },
        {
            path: '/sellerorder/:id', // 卖家中心-订单
            name: 'sellerOrder',
            component: function(resolve) {
                require(['@/components/sellerOrder'], resolve)
            }

        },
        {
            path: '/sellerorderdetails/:id', // 卖家中心-订单详情页
            component: function(resolve) {
                require(['@/components/sellerorderdetails'], resolve)
            }

        },
        {
            path: '/sellersendgood/:id', // 卖家中心-立即发货路由
            component: function(resolve) {
                require(['@/components/sellersendgood'], resolve)
            }

        },

        {
            path: '/sellercustomerservice', // 卖家中心-售后页面
            component: function(resolve) {
                require(['@/components/sellerCustomerService'], resolve)
            }

        },
        {
            path: '/keyboard',
            component: function(resolve) {
                require(['@/components/component/keyboard'], resolve)
            }

        },
        {
            path: '/selleragreerefund/:id', // 同意退款 - 填单 - 卖家
            component: function(resolve) {
                require(['@/components/selleragreerefund'], resolve)
            }
        },
        {
            path: '/selleragreereturn/:id', // 同意退货 -  - 卖家
            component: function(resolve) {
                require(['@/components/selleragreereturn'], resolve)
            }
        },
        {
            path: '/sellerrefuse/:id/:type', // 拒绝退货和拒绝退款- 填单 - 卖家
            component: function(resolve) {
                require(['@/components/sellerrefuse'], resolve)
            }
        },

        {
            path: '/article/:id', // 同意退款 - 填单 - 卖家
            component: function(resolve) {
                require(['@/components/article'], resolve)
            }
        },
        // {
        //     path: '/lottery', // 抽奖测试 稍后删除
        //     component: function(resolve) {
        //         require(['@/components/mine/lottery'], resolve)
        //     }
        // },

        // 认证首页
        {
            path: '/authenticationindex', // 认证首页
            component: function(resolve) {
                require(['@/components/identification/index'], resolve)
            }

        },
        {
            path: '/reauthenticationindex', // 重新认证页面
            component: function(resolve) {
                require(['@/components/identification/reauthenindex'], resolve)
            }

        },
        {
            path: '/authenshop', // 修改店铺页面
            component: function(resolve) {
                require(['@/components/identification/authenshop'], resolve)
            }

        },
        {
            path: '/authenticationflow', // 个人认证流程
            component: function(resolve) {
                require(['@/components/identification/flow'], resolve)
            }

        },
        {
            path: '/authenticationenterpriseflow', // 企业认证流程
            component: function(resolve) {
                require(['@/components/identification/enterpriseflow'], resolve)
            }

        },
        // 个人认证
        {
            path: '/authenticationinfo',
            component: function(resolve) {
                require(['@/components/identification/identifyinfo'], resolve)
            },
            children: [{
                    path: 'personal/:id/:step', // 个人信息
                    component: function(resolve) {
                        require(['@/components/identification/identifypersonal'], resolve)
                    }
                },
                {
                    path: 'shop/:id/:step', // 店鋪信息
                    component: function(resolve) {
                        require(['@/components/identification/identifyshop'], resolve)
                    }
                }

            ]
        },
        // 企业认证
        {
            path: '/authenticationenterpriseinfo',
            component: function(resolve) {
                require(['@/components/identification/identifyenterpriseinfo'], resolve)
            },
            children: [{
                    path: 'personal/:id/:step', // 个人信息
                    component: function(resolve) {
                        require(['@/components/identification/identifypersonal'], resolve)
                    }
                },
                {
                    path: 'shop/:id/:step', // 店鋪信息
                    component: function(resolve) {
                        require(['@/components/identification/identifyshop'], resolve)
                    }
                },
                {
                    path: 'enterprise/:step', // 企业信息
                    component: function(resolve) {
                        require(['@/components/identification/identifyenterprise'], resolve)
                    }
                }

            ]
        },
        {
            path: '/authendetails', // 认证详情页
            component: function(resolve) {
                require(['@/components/identification/authendetails'], resolve)
            }

        },

        {
            path: '/excellentshop', // 优店 
            component: function(resolve) {
                require(['@/components/find/excellentshop'], resolve)
            }

        },
        {
            path: '/integral', // 积分规则
            component: function(resolve) {
                require(['@/components/mine/integralRule'], resolve)
            }

        },
        {
            path: '/authenstudent', // 学生认证
            component: function(resolve) {
                require(['@/components/find/authenstudent'], resolve)
            }
        },
        {
            path: '/authenstudentindex', // 学生认证首页
            component: function(resolve) {
                require(['@/components/find/student-index'], resolve)
            }
        },
        {
            path: '/helpserver', // 帮助中心
            component: function(resolve) {
                require(['@/components/help/help-index'], resolve)
            }
        },
        {
            path: '/helpserver/:id', // 卖家帮助 | 买家帮助
            component: function(resolve) {
                require(['@/components/help/help-list'], resolve)
            }
        },
        {
            path: '/helpreply/:id', // 客服回复
            component: function(resolve) {
                require(['@/components/help/help-reply'], resolve)
            }
        },
        {
            path: '/setaddress', // 买家中心和卖家中心设置中的地址设置页面 
            component: function(resolve) {
                require(['@/components/setup/setaddress'], resolve)
            }
        },
        {
            path: '/applyentry', // 申请超级买家入口 
            component: function(resolve) {
                require(['@/components/superbuyer/apply-index'], resolve)
            }
        },
        {
            path: '/applyfillin', // 申请超级买家信息填写 
            component: function(resolve) {
                require(['@/components/superbuyer/apply-fillin'], resolve)
            }
        },
        {
            path: '/recomfollow', // 推荐关注学生 
            component: function(resolve) {
                require(['@/components/superbuyer/recom-follow'], resolve)
            }
        },
        {
            path: '/interestin', // 超级买家兴趣选择 
            component: function(resolve) {
                require(['@/components/superbuyer/interest-in'], resolve)
            }
        },
        {
            path: '/tradingrecord', // 超级买家成交记录 
            component: function(resolve) {
                require(['@/components/superbuyer/tradingrecord'], resolve)
            }
        },
        {
            path: '/superbuyergroup', // 超级买家团 
            component: function(resolve) {
                require(['@/components/superbuyer/superbuyergroup'], resolve)
            }
        },
        {
            path: '/pushauction', // 拍品推送 
            component: function(resolve) {
                require(['@/components/superbuyer/pushauction'], resolve)
            }
        },
        {
            path: '/selectsuperbuyer/:id', // 选择超级买家
            component: function(resolve) {
                require(['@/components/superbuyer/selectsuperbuyer'], resolve)
            }
        },
        {
            path: '/subuyerinfo', // 超级认证通过 
            component: function(resolve) {
                require(['@/components/superbuyer/subuyerpassed'], resolve)
            }
        },
        {
            path: '/mycollection/:page', // 我的收藏 买家[page=1] 卖家[page=2]
            component: function(resolve) {
                require(['@/components/mine/my-collection'], resolve)
            }
        },
        {
            path: '/collection/:page/:id', // 收藏详情 买家[page=1] 卖家[page=2]
            component: function(resolve) {
                require(['@/components/mine/collection-details'], resolve)
            }
        },
        {
            path: '/pushworks/:userid', // 学生作品推荐
            component: function(resolve) {
                require(['@/components/find/recom-works'], resolve)
            }
        },
        {
            path: '/login', // 浏览器登陆
            component: function(resolve) {
                require(['@/components/login/index'], resolve)  
            }
        },
        {
            path: '/expressinquiry', // 快递单号查询
            component: function(resolve) {
                require(['@/components/setup/expressinquiry'], resolve)
            }
        },
        {
            path: '/accountsecurity', // 快递单号查询
            component: function(resolve) {
                require(['@/components/setup/account-security'], resolve)
            }
        },
        {
            path: '/alipaysuccess', // 支付宝支付成功
            component: function(resolve) {
                require(['@/components/balance/alipay-success'], resolve)
            }
        },
        // {
        //     path: '/shopgetalldetails', // 买家中心和卖家中心设置中的地址设置页面 
        //     component: function(resolve) {
        //         require(['@/components/classify/classify-format'], resolve)
        //     }
        // },
        {

            path: '*',
            component: function(resolve) {
                require(['@/components/notfind'], resolve)
            }
        }
    ]
})