<template>
<transition name="pages">
    <div class="">
        <div class="hd-history bdb">
            <div class="clr">
                <div class="title fl"><span class="title_text">余额(元)</span><span class="price">{{ balance }}</span></div>
                <div class="nav_container fr" @click="navShow">
                    <i class="nav_icon vc shotsprites icon-billHistory_nav"></i>
                    <span class="nav_text vc">款项筛选</span>
                    <div class="nav_wrap" v-show="isNavShow">
                        <i class="nav_triangle icon-s_admin icon-billHistory_triangle"></i>
                        <ul class="nav_list">
                            <li class="bdb" data-index="1">
                                <router-link :to="'/billhistory/1?type=' + type">全部款项</router-link>
                            </li>
                            <li class="bdb" data-index="2">
                                <router-link :to="'/billhistory/2?type=' + type">冻结中款项</router-link>
                            </li>
                            <li class="bdb" data-index="3">
                                <router-link :to="'/billhistory/3?type=' + type">已解冻款项</router-link>
                            </li>
                            <li class="bdb" data-index="4">
                                <router-link :to="'/billhistory/4?type=' + type">已提现款项</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="bd">
            <ul class="list">
                <li class="list_item bdb"  v-for="item in dataList">
                    <router-link class="clr" :to="'/billfreeze/'+ item.id +'?type=' + type">
                        <div class="fl">
                            <div class="list_title">{{ item.title }}</div>
                            <span class="list_date">{{ item.inputtime }}</span>
                        </div>
                        <!-- 处理功能分类 -->
                        <div class="fr">
                            <!-- 收入 -->
                            <div v-if="item.type==1" class="list_price">+{{ item.pay }}</div>
                            <!-- 支出 -->
                            <div v-if="item.type==0" class="list_price list_price__plus">-{{ item.pay }}</div>
                            <!-- 状态 -->
                            <!-- modifier LL -->
                            <template v-if="item.type == 0">
                                <template v-if="item.moneyUsedStates == 1">
                                    <span class="list_status">
                                        <template v-if="item.extractStatus == 0">处理中</template>
                                        <template v-if="item.extractStatus == 1">处理中</template>
                                        <template v-if="item.extractStatus == 2">成功</template>
                                        <template v-if="item.extractStatus == 3">失败</template>
                                        <template v-if="item.extractStatus == 99">异常</template>
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="list_status">成功</span>
                                </template>
                            </template>
                            <template v-else>
                                <span v-if="item.freestatus!=3" class="list_status">成功</span>
                                <span v-if="item.freestatus==3" class="list_status">手续费 -{{ item.fee }} | 冻结中</span>
                            </template>
                            <!-- modify end -->
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 列表结束 -->
    </div>
</transition>
</template>
<script>


    module.exports = {
        data:function(){
            return {
                loading: false,          // 加载loading
                isNavShow: false,        // 分类弹窗显示
                dataList: [],            // 数据列表
                balance: '',             // 金额
                page: 0,                 // 分页页数
                type: ''                 // type=0[买家] | type=1[卖家] 
            }
        },
        
        created: function() {
            this.type = utils.getRequest().type; 
        },
        mounted: function() {
            var _this = this;
            
            // 全部
            this.getHistory()
            utils.dropLoading(function() {
                var type = parseInt( _this.$route.params.type);
                _this.judgeLoading(type)
            })

            this.$nextTick(function() {
                this.addRouterLink()
            })
            
            
            
        },
        watch: {
            '$route': ["judgeType"]
        },
        destroyed: function() {
            this.dataList = [];
            this.page = 0;
            $(window).unbind('scroll');
            $(".footer-bottom a").eq(3).removeClass("router-link-active");
        },
        methods: {
            // 置空
            setZero: function() {
                this.dataList = [];
                this.page = 0;
            },

            navShow: function(){
                this.isNavShow = !this.isNavShow;
            },

            // 分类判断
            judgeType: function() {
                var type = parseInt( this.$route.params.type);
                switch(type) {
                    case 1:
                        // 全部款项
                        this.setZero()
                        this.getHistory()
                        break;
                    case 2:
                        // 冻结中
                        this.setZero()
                        this.balanceFreeze(0)
                        break;
                    case 3:
                        // 已解冻
                        this.setZero()
                        this.balanceFreeze(3)
                        break;
                    case 4:
                        // 已提现
                        this.setZero()
                        this.hadExtracted()
                        break;
                    default:
                        throw new Error("不存在的数据")
                }
            },
            // 下拉加载判断
            judgeLoading: function(type) {
                switch(type) {
                    case 1:
                        // 全部款项
                        this.getHistory()
                        break;
                    case 2:
                        // 冻结中
                        this.balanceFreeze(0)
                        break;
                    case 3:
                        // 已解冻
                        this.balanceFreeze(3)
                        break;
                    case 4:
                        // 已提现
                        this.hadExtracted()
                        break;
                    default:
                        throw new Error("不存在的数据")
                }
            },

            // 选择分类
            selectedLi: function(ev) {
                
            },

            // 全部款项
            getHistory: function() {
                var _this = this;
                ajax.getBalanceHistory(_this.page,function(data) {
                    if (data.status == 200) {
                        _this.page++
                        _this.balance = data.data.balance;
                        for (var i = 0; i < data.data.loglist.length; i++) {
                            _this.dataList.push( data.data.loglist[i] )
                        }; 
                    } else {
                        alert(data.msg);
                    }
                })
            },

            // 余额明细 [已经提现]
            hadExtracted: function() {
                var _this = this;
                ajax.getBalanceExtract(_this.page,function(data) {
                    if (data.status == 200) {
                        _this.page++
                        for (var i = 0; i < data.data.loglist.length; i++) {
                            _this.dataList.push( data.data.loglist[i] )
                        };
                    } else {
                        alert(data.msg);
                    }
                })
            },

            // 余额明细 [解冻]
            balanceFreeze: function(status) {
                var _this = this;
                ajax.getBalanceFreeze(status,_this.page,function(data){
                    if (data.status == 200) {
                        _this.page++
                        for (var i = 0; i < data.data.loglist.length; i++) {
                            _this.dataList.push(data.data.loglist[i])
                        };
                    } else {
                        alert(data.msg);
                    }
                })
            },

            // footer 样式补充
            addRouterLink: function() {
                $(".footer-bottom a").eq(3).addClass("router-link-active");
            }
        }
    }

</script>
<style>
.hd-history{
    padding:1.5rem;
    background-color: #fff;
}
.title{
    font-size:0;
}
.title_text{
    line-height:1;
    color: #333;
    font-size:1.4rem;
}
.price{
    padding-left:1.5rem;
    line-height:1;
    color: #ad1a1a;
    font-size:1.6rem;
}
/* 导航 */
.nav_container{
    position: relative;
    font-size:0;
}
.nav_text{
    padding-left: 1rem;
    line-height:1;
    font-size:1.4rem;
    color: #999;
}
.nav_wrap{
    position: absolute;
    top:4.5rem;
    left:-2rem;
    z-index: 1;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius:0.3rem;
    box-shadow:0 0 0.3rem #ccc;
}
.nav_triangle{
    position: absolute;
    top:-.95rem;
    left:4rem;
}
.nav_list li {
    display: ;
    margin:0 0.5rem;
    width:9rem;
    height:3.25rem;
    line-height:3.25rem;
    text-align:center;
    font-size:1.4rem;    
}
.nav_list li a {
    color: #333;
}
.nav_list li:last-child.bdb:after{
    border: 0;
}
/* 表单列表 */
.bd{
    margin-bottom: 10rem;
    padding: 0 1.5rem;
    background-color: #fff;
}
.list .fr{
    text-align: right;
}
.list_item{
    padding:1.5rem 0;
}
.list_title{
    line-height:1;
    font-size:1.4rem;
    color: #333;
}
.list_date{
    padding-top:.9rem;
    display: block;
    line-height:1;
    font-size:1.1rem;
    color: #999;
}
.list_price{
    line-height:1;
    color: #6db247;
    font-size:1.4rem;
}
.list_price__plus{
    color: #fc3438;
}
.list_status{
    padding-top:.9rem;
    display: block;
    line-height:1;
    color: #999;
    font-size:1.1rem;
}
</style>
