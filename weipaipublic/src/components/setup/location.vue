<template>
<div class="location">
	<div class="location-list">
        <ul class="location-ul">
            <li class="location-li clr" v-for='al in addressList' :key='al.id'>
                <div class="location_desc fl" @click='select_address(al.id,al.name,al.mobile,al.area,al.address)'>
                    <div class="basic_box clr">
                        <div class="personal_name fl">{{al.name}}</div>
                        <div class="personal_mobile fr">{{al.mobile}}</div>
                    </div>
                    <div class="address_details"><span v-if='al.checked==1'>[默认地址]</span>{{al.area+al.address}}</div>
                </div>
                <router-link class="location_operation clr fr" :to='"/forms?from="+from+"&id="+id+"&address_id="+al.id' v-if='id'>
                   <div class="edit_address clr fr">
                        <span class="spritesmap edit-icon fr"></span>
                   </div>  

                </router-link>
                <router-link class="location_operation clr fr" :to='"/forms?from="+from+"&address_id="+al.id' v-else-if='!id'>
                   <div class="edit_address clr fr">
                        <span class="spritesmap edit-icon fr"></span>
                   </div>  

                </router-link>
            </li>

        </ul>
		<!-- 杨通杰 -->
		<router-link to="/forms" class="add_address_box" v-show="!id && !from1">
			<span>新增地址</span>
		</router-link>
		<router-link :to="'/forms?from='+from+'&id='+id" class="add_address_box" v-show="id">
			<span>新增地址</span>
		</router-link>
		<!-- 支付地址选择 -->
		<router-link :to="'/forms?from='+from" class="add_address_box" v-show="from1">
			<span>新增地址</span>
		</router-link>
        <div class="space">

        </div>
	</div>
	<!-- 弹窗 -->
    
</div>
</template>
<script>
	var showConfirm = require("@/components/component/showConfirm")
	
	var ajax = require('ajax');
	var utils = require("utils");
	

    module.exports = {
		data : function(){
			return {
				showConf: false,
				tipMsg: '',
				isDelete: false,
				addressList : '',
				addressId: '',
				id: '',   
				from: '',            // 当前选中订单
				from1: '',           // edit by lpt
			}
		},
		
		components: {
            'show-confirm': showConfirm
      	},
      
		mounted:function(){
			this.address_list();
		},
		methods: {
			address_list : function(){ //卖家中心列表页
				var vue = this;
				ajax.addressList(function(res){
					if(res.status == 200){
						vue.addressList = res.data;
						vue.id = utils.getRequest().id;
						vue.from = utils.getRequest().from;
						if (!vue.id) {
							vue.from1 = utils.getRequest().from;
						};
						
					}
				})
			},

			// 选中地址 
			select_address: function(address_id,name,mobile,area,address){//选择地址
				var vue = this;
				this.address_id = address_id;

				var from = vue.from;
				var from1 = vue.from1;
                var id = vue.id;
                var address_details = area+address          //区域和地址详情地址
                window.sessionStorage.setItem("location_id",address_id);         //地址id
                window.sessionStorage.setItem("location_name",name);             //地址收货人姓名
                window.sessionStorage.setItem("location_mobile",mobile);         //地址手机号
                window.sessionStorage.setItem("location_details",address_details);       //地址区域+地址详情
                window.sessionStorage.setItem('location_area',area);                     //地址区域
                window.sessionStorage.setItem('location_address',address);               //地址详情
                if(from=='payment'){
                    var payment_url_order = window.sessionStorage.getItem('payment_url_order');
                    window.location.href  = payment_url_order;
                    // vue.$router.push(payment_url_order);
                }else if(id){
                    vue.$router.push('/'+from+'/'+id);
                } else {
                    vue.$router.push('/'+from)
                }
			},

			

			// 关闭按钮
			closeBox: function() {
				this.showConf = false;
			}

		}
	}

</script>
<style scoped>
.location-ul{
	background: #f6f6f6;
    font-size: 1.4rem;
}
.location-li{
    margin-top: 1rem;
    background: #fff;
    font-size: 1.4rem;
    border-top: 1px solid transparent;
    border-bottom: 1px solid #DDD;
    position: relative;
}
li.location-li:last-child{
    border-bottom: 1px solid transparent;
    margin-bottom: 1rem;
}
.location_desc{
    width: 87%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    line-height: 100%;
}
.basic_box{
    font-size: 1.6rem;
    color: #333;
    margin: 1.2rem 0;
}
.address_details{
    font-size: 1.4rem;
    color: #999;
    margin-bottom: 1.2rem;
}
.address_details>span{
    color: #FF4545;
}
.location_operation{
    width: 12%;
    height: 2rem;
    font-size: 1.4rem;
    color: #666;
    padding-right: 1.5rem;
    position: absolute;
    top: 50%;
     margin-top: -1rem; 
}
.edit-icon{
    margin-right: 0;
    margin-top: 0.35rem;
}
.edit_address{
    width: 100%;
    height: 2rem;
    border-left: 1px solid #DDD;
    
}
.add_address_box{
    position: fixed;
    bottom: 5rem;
    left: 0;
    right: 0;
    height: 4.4rem;
    line-height: 4.4rem;
    background-color: #FF4545;
    color: #FFF;
    font-size: 1.4rem;
    text-align: center;
}
div.space{
    height: 9.4rem;
    background-color: #f6f6f6;
}
</style>
