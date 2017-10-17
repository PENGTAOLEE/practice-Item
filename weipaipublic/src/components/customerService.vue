<template>
    <div>
        <order-item :msg = "orderList"></order-item>
    </div>
</template>

<script>
    var ajax = require("ajax");
    var orderItem = require("@/components/buyerOrderItem");
    var utils = require("utils");
    export default {
        data: function(){
            return{
                orderList: [],
                page: 1,
                page_num: ''
            }
        },
        //props: ["msg"],
        components: {
            "order-item": orderItem,
        },
        created: function() {
            this.getAllList();
            //console.log(1);
        },
        mounted: function() {
            //this.getList();
        },

        methods: {
            getList: function(){
                var that = this;
                ajax.getOrderList(4,1,function(msgs){
                    if(msgs.status == 200 ){
                        that.orderList = that.orderList.concat(msgs.data.orderInfo);
                        that.page_num = msgs.data.page_num;
                        console.log(that.orderList)
                    }else{
                        console.log(data.msg);
                    }
                });
            },
            getAllList: function(){
                this.page = 1;
                this.orderList = [];
                this.getList();
                utils.dropLoading(function(){
                   if(this.page<this.page_num){
                        this.page++;
                        this.getList();
                    }else{
                        console.log("没有更多数据了");
                    } 
                })
                
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>