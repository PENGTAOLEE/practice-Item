<template>
<div class="">
    <div class="nav bdb">
        <router-link to="/sellerorder/1" class="nav_item "><span class="nav_item-inner ">全部</span></router-link>
        <router-link to="/sellerorder/2" class="nav_item"><span class="nav_item-inner ">未付款</span></router-link>
        <router-link to="/sellerorder/3" class="nav_item"><span class="nav_item-inner ">未发货</span></router-link>
        <router-link to="/sellerorder/4" class="nav_item"><span class="nav_item-inner ">待收货</span></router-link>

    </div>

    <order-list :msg="list"></order-list>
    <div class="space"></div>
    <my-footer></my-footer>

</div>
</template>
<script>


    module.exports = {
        
        components: {
            //'compt-buyer-order-item': comptbuyerOrderItem,
            "my-footer": footer,
            "order-list":orderList
        },
        data: function(){
            return {
                page: 1,
                list: [],
                page_num: ""
            }
        },
        methods: {
            getOrderList: function(){
                var that = this;
                var type = that.$route.params.id;
                var page = that.page;
                var list = that.list;
                ajax.getSellerOrderList(type,page,function(data){
                    if(data.status ==200){
                       that.list=that.list.concat(data.data.orderInfo);
                       that.page_num = data.data.page_num;
                    }else{
                        console.log("出错了");
                    }
                })
            },
            getAllList: function(){
                this.page = 1;
                this.page_num = '';
                this.list = [];
                this.getOrderList();
                var that = this
                utils.dropLoading(function(){
                    console.log(123);
                    if(that.page<that.page_num){
                        that.page++;
                        that.getOrderList();
                    }else{
                        console.log("已经到底了，没有更多数据了");
                    }
                });
            }
        },
        mounted: function(){
            document.title="卖家订单";
            this.getAllList();
        },
        watch: {
            "$route": "getAllList"
        }
        //,
        //methods: {
        //    changeTittle: function(){
        //        $('.nav').on('click',"a", function(e){
        //            //this => span
        //           e.preventDefault();
        //            e.stopPropagation();
        //            $(this).siblings("a").children(".nav_item-active").removeClass('nav_item-active');
        //            $(this).children("span").addClass('nav_item-active');
        //            console.log("开始执行dom操作")
        //        })
        //    }
        //}
    }

</script>
<style>
.nav{
    display: -webkit-flex;
    display: flex;
}
.nav_item{
    -webkit-flex: 1;
    flex: 1;
    line-height:1;
    text-align: center;
    color: #333;
    font-size:1.5rem;
    background-color: #fff;
}
.nav_item-inner{
    margin:0 auto;
    padding:1.5rem 0;
    display: block;
    width:5rem;
    height:100%;
}
.router-link-active>span{
    position: relative;
    color: #ad1a1a;
}
.nav_item-active:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ad1a1a;
    color: #CCCCCC;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.space{
    width: 100%;
    height: 10rem;
}
</style>
