<template>
<div class="location">
	<div class="location-list">
		<!-- <ul class="location-ul cc" :class="'addredddid' + al.id" v-for="al in addressList" :key='al.id'>
			<div class="checkbox-value">
				<li :data-addressid="al.id"  @click="select_address(al.id,al.name,al.mobile,al.area+al.address)">
					<dl class="location-dl cc">
						<dt class="user-name">{{ al.name }}</dt>
						<dd class="user-mobile">{{ al.mobile }}</dd>
					</dl>
					<p class="user-address">{{ al.area + al.address }}</p>
					<input v-if="!isDelete" type="checkbox" checked="checked" value="Bike" class="checkBox" />
					<strong v-if="isDelete" class="delete-btn"></strong>
				</li> 
			</div>
		</ul> -->
        <!-- refactor  337 -->
        <ul class="location-ul">
            <li class="location-li" v-for='(al,index) in addressList' :key='al.id'>
                <div class="location_desc">
                    <div class="basic_box clr">
                        <div class="personal_name fl">{{al.name}}</div>
                        <div class="personal_mobile fr">{{al.mobile}}</div>
                    </div>
                    <div class="address_desc">{{al.area+al.address}}</div>
                </div>
                <div class="location_operation clr">
                   <div class="default_address fl clr" v-if='al.checked==0' @click='setDefault(al.id,index)' >
                       <span class="spritesmap no-select-icon fl"></span>
                       <span class='fl'>设为默认</span>
                   </div>
                   <div class="default_address fl clr" v-else-if='al.checked==1' >
                       <span class="spritesmap select-icon fl"></span>
                       <span class='fl'>默认地址</span>
                   </div>
                   <div class="delete_address clr fr" @click='deleteAddress(al.id,al.checked,index)'>
                       <span class="spritesmap delete-icon fl"></span>
                       <span class='fl'>删除</span>  
                   </div>
                   <router-link class="edit_address clr fr" :to='"/forms?from="+from+"&address_id="+al.id'>
                        <span class="spritesmap edit-icon fl"></span
                        <span class="fl">编辑</span>
                   </router-link>  

                </div>
            </li>

        </ul>
        <router-link class="add_address_box" :to='"/forms?from="+from'>
            新增地址
        </router-link>
        <div class="space">

        </div>
	</div>
	<!-- 弹窗 -->
	<show-confirm v-show="showConf" :msg="tipMsg" @closeBox="closeBox" @childEvent="confirmDelete"></show-confirm>
    <show-alert v-show='is_alert' :msg='alert_msg' @closeBox='closeAlert'></show-alert>
</div>
</template>
<script>
	var showConfirm = require("@/components/component/showConfirm")
	var showAlert = require('@/components/component/showAlert');
	var ajax = require('ajax');
	var utils = require("utils");
	

    module.exports = {
		data : function(){
			return {
				showConf: false,
				tipMsg: '',
				isDelete: false,
				addressList : '',
				address_id: '',
                address_index: '',
				id: '',   
				from: '',            // 当前选中订单
                is_alert: false,
                alert_msg: '',
                checked: '',
			}
		},
		
		components: {
            'show-confirm': showConfirm,
            'show-alert': showAlert
      	},
      
		mounted:function(){
            document.title="我的地址";
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
					}
				})
			},

			// 设为默认地址接口 
			setDefault: function(id,index){//选择地址
                var that = this;
               
                ajax.addressSelect(id,function(res){
                    if(res.status==200){
                        that.addressList.forEach(function(element) {
                           element.checked=0;
                        });
                        that.addressList[index].checked =1;	
                    }else{
                        that.alert_msg = res.msg;
                        that.is_alert = true;
                    }
                })	
			},
            //删除地址接口
            deleteAddress: function(id,checked,index){
                this.address_id = id;
                this.address_index = index;
                this.checked = checked;
                this.tipMsg  = '确定要删除该地址吗？';
                this.showConf = true;
            },
			confirmDelete: function() {
				var that = this;
                var id = that.address_id;
                var index = that.address_index;
                var checked = that.checked;
				ajax.deleteAddress(id,checked,function(data) {
					if (data.status == 200) {
                        if(checked==0){
                            that.addressList.splice(index,1);
                        }else if(checked==1){
                            that.$router.go(0);
                        }
						
					} else {
						that.is_alert = data.msg;
                        that.alert_msg = true;
					}
				})
			},

			// 关闭按钮
			closeBox: function() {
				this.showConf = false;
			},
            closeAlert: function(){
                this.is_alert = false;
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
    padding-left: 1.5rem;
    border-top: 1px solid transparent;
    border-bottom: 1px solid #DDD;
}
li.location-li:last-child{
    margin-bottom: 1rem;
}
.location_desc{
    width: 100%;
    padding-right: 1.5rem;
    border-bottom: 1px solid #E5E5E5;
    line-height: 100%;
}
.basic_box{
    font-size: 1.6rem;
    color: #333;
    margin: 1.2rem 0;
}
.address_desc{
    font-size: 1.4rem;
    color: #999;
    margin-bottom: 1.2rem;
}
.location_operation{
    font-size: 1.4rem;
    color: #666;
    padding-right: 1.5rem;
    height: 4.4rem;
    line-height: 4.4rem;
}
.edit_address{
    color: #666;
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
}

</style>
