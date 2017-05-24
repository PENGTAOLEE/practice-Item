<template>
<div class="location">
	<div class="location-list">
		<ul class="location-ul cc" :class="'addredddid' + al.id" v-for="al in addressList">
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
		</ul>
		<!-- 杨通杰 -->
		<router-link to="/Forms" class="newAdd cc" v-show="!id && !from1">
			<em class="addIcon"></em>
			<span>新增地址</span>
		</router-link>
		<router-link :to="'/Forms?from='+from+'&id='+id" class="newAdd cc" v-show="id">
			<em class="addIcon"></em>
			<span>新增地址</span>
		</router-link>
		<!-- 支付地址选择 -->
		<router-link :to="'/Forms?from='+from" class="newAdd cc" v-show="from1">
			<em class="addIcon"></em>
			<span>新增地址</span>
		</router-link>

		<!-- 管理银行卡 -->
		<div class="manage-add cc" @click="toDelete">
			<span>管理地址</span>
		</div>
	</div>
	<!-- 弹窗 -->
	<show-confirm v-show="showConf" :msg="tipMsg" @closeBox="closeBox" @childEvent="offShelf"></show-confirm>
	<my-footer></my-footer>
</div>
</template>
<script>


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
            'my-footer':footer,
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
						vue.$nextTick(function(){
							$(".location-ul li input").click(function(){
								// $(this).siblings().children(".checkBox").css("background-position","0 0");	
								$(this).children(".checkBox").css("background-position","0 -2.25rem");
							})
						});
						vue.id = utils.getRequest().id;
						vue.from = utils.getRequest().from;
						if (!vue.id) {
							vue.from1 = utils.getRequest().from;
						};
						
					}
				})
			},

			// 选中地址 
			select_address: function(id,name,mobile,address){//选择地址
				var ev = event.target;
				var vue = this;
				this.addressId = id

				var from = vue.from;
				var from1 = vue.from1;
				var id = vue.id;
				if(ev.tagName.toUpperCase() == "INPUT"){
					if(from == 'selleragreereturn'||from == 'sellersendgood'){
						window.sessionStorage.setItem("index",id);
						window.sessionStorage.setItem("seller",name);
						window.sessionStorage.setItem("seller_mobile",mobile);
						window.sessionStorage.setItem("seller_address",address);
						vue.$router.push('/'+from+'/'+id);
					} else {
						ajax.addressSelect(vue.addressId,function(res){
							if(res.status == 200){
								if (from1 == 'payment') {
									var userName = $(ev).parents('.checkbox-value').find('.user-name').text();
									var userMobile = $(ev).parents('.checkbox-value').find('.user-mobile').text();
									var userAdress = $(ev).parents('.checkbox-value').find('.user-address').text();
									
									var payment_url_order = window.sessionStorage.getItem("payment_url_order");
									window.location.href = payment_url_order;
								}else if(from == 'buyerset'){
									vue.$router.push("/buyerset");
								}else {
									vue.$router.push('/compete');
								}	
							}
						});
					}
					
				} else if (ev.tagName.toUpperCase() == "STRONG") {
					this.tipMsg = '您确定删除当前地址?'
					this.showConf = true;
				}
				// var address_id = $(event.target).attr("data-addressid")
				
				
			},

			// 添加删除按钮
			toDelete: function() {
				this.isDelete = !this.isDelete;
			},

			// 删除地址
			offShelf: function() {
				var _this = this;
				ajax.deleteAddress(_this.addressId,function(data) {
					if (data.status == 200) {
						$('.addredddid' + _this.addressId).remove()
					} else {
						console.log("添加提示弹出报错")
					}
				})
			},

			// 关闭按钮
			closeBox: function() {
				this.showConf = false;
			}

		}
	}

</script>
<style>
.location-ul{
	overflow: hidden;
	background: #FFFFFF;
	position: relative;
}
.location-ul li{
	padding:1rem 1.4rem;
	position: relative;
	border-bottom: .05rem solid #ddd;
} 
.location-dl{
	color: #333;
	font-size: 1.6rem;
}
.location-dl dt{
	float: left;
	width:10.35rem;
}
.location-dl dd{
	float: left;	
}
.location-ul li p{
	font-size: 1.4rem;
	color: #999;
	width: 29.4rem;
}


.checkBox {
	width: 2.2rem;
	height: 2.2rem;
	border-radius: 50%;
	/*border:.05rem solid #ccc;*/
	background: url(/res/img/pitch.png) no-repeat;
	background-size: 100%;
	position: absolute;
	right:1.4rem;
	top:2rem;
}
.delete-btn {
	width: 2.2rem;
	height: 2.2rem;
	/*border-radius: 50%;*/
	/*border:.05rem solid #ccc;*/
	background: url(/res/img/delete.png) no-repeat;
	background-size: 100%;
	position: absolute;
	right:1.4rem;
	top:2rem;
}

.newAdd,
.manage-add {
	padding: 1rem 1.4rem;
	background: #fff;
	color: #333;
	font-size: 1.4rem;
	display: block;
}
.newAdd .addIcon{
	width: 2.2rem;
	height: 2.2rem;
	background: url(/res/img/add.png) no-repeat;
	float: left;
	background-size: 100%;
}
.newAdd span{
	float: left;
	display: block;
	margin-left: 1rem;
}
.manage-add {
	margin-top: 1rem;
	margin-bottom: 10rem;
	width: 100%;
}
</style>
