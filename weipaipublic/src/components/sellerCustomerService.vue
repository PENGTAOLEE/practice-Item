<template>
<div>
	<order-item :msg = "orderList"></order-item>
	<div class="space">
	</div>
</div>
</template>
<script>
    var ajax = require("ajax");
    var orderItem = require("@/components/sellerOrderItem")
    var utils = require("utils");
    

    module.exports = {

        //杨彤杰   2017.3.1
        data: function(){
            return{
                orderList: [],
                page: 1,
                page_num: ""
            }
        },
        //props: ["msg"],
        
        components: {
            "order-item": orderItem,
        },
        created: function() {
            this.getAllList();
            
        },
        methods: {
            getList: function(){
                var that = this;
                var page = that.page;
                var type = 5;
                ajax.getSellerOrderList(type,page,function(msgs){
                    //console.log(msgs.data);
                    if(msgs.status == 200 ){
                        that.orderList = that.orderList.concat(msgs.data.orderInfo);
                        that.page_num = msgs.data.page_num;
                        console.log(that.orderList);
                    }else{
                        console.log(msgs.msg)
                    }
                });
            },
            getAllList: function(){
                var that = this;
                this.page = 1;
                this.orderList = [];
                this.getList();
                utils.dropLoading(function(){
                    console.log(that.page);
                    console.log(that.page_num);
                    if(that.page<that.page_num){
                        that.page++;
                        that.getList();
    
                    }else{
 
                    }
                })

            }
        }
    };
    // 2017.3.2杨彤杰

</script>
<style>
/*预留空间*/
.space{
	width: 100%;
	height: 10rem;
}
/*预留空间*/
</style>
