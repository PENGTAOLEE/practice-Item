<template>
    <div class="help-list">
        <div class="container">
            <ul class="list">
                <li v-for="item in listData" class="item">
                    <router-link :to="'/helpreply/' + item.id " class="item-link">{{ item.text }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data: function(){
            return {
                listData: {}, // 渲染列表
                buyerList: [
                    {
                        type: 'buyer',
                        id: 1,
                        text: '保证金是什么？为什么要缴纳保证金？'
                    },
                    {
                        type: 'buyer',
                        id: 2,
                        text: '如何联系卖家'
                    },
                    {
                        type: 'buyer',
                        id: 3,
                        text: '拍下的商品如何付款？'
                    },
                    {
                        type: 'buyer',
                        id: 4,
                        text: '如何确认收货？'
                    },
                    {
                        type: 'buyer',
                        id: 5,
                        text: '如何新增/修改收货地址？'
                    }
                ],
                sellerList: [
                    {
                        type: 'seller',
                        id: 6,
                        text: '为什么要入驻小福拍？'
                    },
                    {
                        type: 'seller',
                        id: 7,
                        text: '如何开店？'
                    },
                    {
                        type: 'seller',
                        id: 8,
                        text: '关于拍品发布'
                    },
                    {
                        type: 'seller',
                        id: 9,
                        text: '关于拍品保证金'
                    },
                    {
                        type: 'seller',
                        id: 10,
                        text: '平台增粉方式'
                    },
                    {
                        type: 'seller',
                        id: 11,
                        text: '常规交易流程图'
                    },
                    {
                        type: 'seller',
                        id: 12,
                        text: '如何提现？'
                    },
                    {
                        type: 'seller',
                        id: 13,
                        text: '什么的情况下货品会直接被下架'
                    },
                    {
                        type: 'seller',
                        id: 14,
                        text: '买家一直不确认收货怎么办？'
                    },
                    {
                        type: 'seller',
                        id: 15,
                        text: '3000家商家亲测，如此描述拍品有助于提高截拍率!'
                    }
                ]
            }
        },
        components: {
        
        },
        methods: {
        
        },
        created: function(){
            var id = this.$route.params.id;
            if (id == 'buyer') {
                document.title = "买家帮助";
                this.listData = this.buyerList;   
            };
            if (id == 'seller') {
                document.title = "卖家帮助";
                this.listData = this.sellerList;   
            };
            
        },
        mounted: function(){
            $('#footer-common').remove()
        },
    }

</script>
<style scoped>
.container {
    margin: 1rem;
    border-radius: .1rem;
    background-color: #fff;
}

.list {
}

.item {
    position: relative;
    font-size: 1.4rem;
    text-indent: 1rem;
    border-bottom: .1rem solid #e5e5e5;
}

.item:after {
    content: " ";
    display: inline-block;
    height: 0.8rem;
    width: 0.8rem;
    border-width: 0.15rem 0.15rem 0 0;
    border-color: #999;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 50%;
    margin-top: -0.4rem;
    right: 1rem;
}

.item:last-child {
    border-bottom: none;
}

.item-link {
    display: block;
    height: 4.4rem;
    line-height: 4.4rem;
    text-decoration: none;
    color: #333;
}
</style>