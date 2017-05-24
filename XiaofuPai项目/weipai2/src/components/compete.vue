<template>
<div class="compete">
	<div class="compete-name cc">
		<dl class="compete-head cc">
			<dt class="compete-img">
				<img :src="shopInfo.user_thumb" alt="" id="user_head">
			</dt>
			<dd class="compete-dd">
				<strong class="compete-str" id="compete-str">{{ shopInfo.user_name }}</strong>
				<span class="compete-wx">(头像、昵称将同步微信)</span>
			</dd>
		</dl>		
		<em class="compete-update" @click="updateUserInfo($event)"></em>
	</div>
	
	<div class="compete-site compete-site-shoping cc">
		<span class="compete-site-sp">店铺介绍</span>
		<router-link to="" class="compete-site-a">{{ shopInfo.desc }}</router-link>
		<em class="compete-row" ></em>
	</div>
	
	<!-- 退货地址 -->
	<router-link to="/location" class="compete-site-name cc">
		<span class="compete-site-sp">退货地址</span>
		<input v-if="!shopInfo.address"  type="text" class="compete-site-text" placeholder="设置收货地址" />

		<div v-if="shopInfo.address" class="compete-site-text">
			<div class="compete-site-text-title">
				<span>{{ shopInfo.name }}</span>
				<span>{{ shopInfo.mobile }}</span>
			</div>
			<div class="compete-site-text-address">{{ shopInfo.address }} {{ shopInfo.area }}</div>
		</div>
		<em class="compete-row"></em>
	</router-link>
	<!--<a href="#" target="_blank" class="compete-site-name cc">
		<span class="compete-site-sp">实名认证</span>
		<span class="compete-not">未认证</span>
		<em class="compete-row"></em>
	</a>-->
	<div class="compete-site cc">
		<span class="compete-site-sp">固定【我的】为卖家中心</span>
		
		<label class="compete-btn">
			<input class="mui-switch mui-switch-animbg" type="checkbox" @click="changeStatus()">
		</label>
		
	</div>
	
	<div class="shoping">
		<div class="shopName">
			<dl class="shopDl cc">
				<dt class="shopDt">店铺介绍</dt>
				<dd class="shopDd">
					<textarea class="shopText" required>{{ shopInfo.desc }}</textarea>
				</dd>
			</dl>
			<button class="formSave" @click="editShopDesc()">完成</button>
		</div>
	</div>	

	<!-- 弹窗提示 -->
	<show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>

	<my-footer></my-footer>
	
</div>

</template>
<script>


    module.exports = {
		data:function(){
			return {
				showAlertBoll: false,   
				tipMsg: '',
				shopInfo : [],
				arrlist:[]
			}
		},
		
		components: {
            'my-footer': footer,
            'show-alert': showAlert
      	},
		mounted: function(){
			document.title="店铺设置";
			this.seller_set()
			$(".compete-site-shoping").click(function(){
				$(".shoping").toggle();
				$(".shoping .shopText").focus()
			})
			$(".formSave").click(function(){
				$(".shoping").toggle();
			})

			// 禁用微信分享
            utils.disableSharing();
		},
		methods: {
			seller_set: function(){ //卖家中心设置首页数据请求	
				var vue = this;
				ajax.sellerSet(function(res){
					if(res.status == 200){
						vue.shopInfo = res.data;
						if( res.data.is_seller == 1 ) {
							$('.mui-switch-animbg').prop('checked',true)
						}
					} else {

					}
				});
			},
			changeStatus: function(){ //切换卖家买家状态
				var is_seller = $('.mui-switch-animbg').prop('checked') == true ? 1 : 0
				ajax.changeSellerStatus(is_seller,function(res){
					if(res.status != 200){
						alert(res.msg)
					}
				})
			},
			editShopDesc: function(){ //修改店铺简介
				var _this = this;
				var shopDesc = $('.shopText').val();
				ajax.editShopDesc(shopDesc,function(res){
					if(res.status == 200){ //修改主页的店铺简介
						$('.compete-site-a').html(shopDesc)
					} else {
						_this.tipMsg = res.msg;
						_this.showAlertBoll = true;
					}
				})
			},
			// 更新用户数据
			updateUserInfo: function(ev){ 
				var _this = this;
				ajax.updateUserInfo(function(res){
					if(res.status == 200){ //修改主页的店铺简介
						$(ev.target).css("transform","rotate(360deg)");
						$('#user_head').attr('src',res.data.thumb);
						$('#compete-str').html(res.data.name);
					} else {
						_this.tipMsg = res.msg;
						_this.showAlertBoll = true;
						
					}
				})
			},

			// 关闭弹窗
			closePopup: function() {
				this.showAlertBoll = false;
			}

		}

	}

</script>
<style>
.compete-name{
	width: 100%;
	position: relative;
}
.compete-head{
	width: 100%;
	background:#FFF;
	padding:1.5rem;	
	border-bottom: .05rem solid #c5c5c5;
}
.compete-head{
	/*width:50%;*/
	float: left;
}
.compete-head .compete-img{
	width:4.5rem;
	height: 4.5rem;
	background: #CCC;
	border-radius: 50%;
	float: left;
}
.compete-head .compete-img img{
	width:4.5rem;
	height: 4.5rem;
	background: #CCC;
	border-radius: 50%;
	float: left;
	vertical-align: top;
	border-radius: 50%;
}
.compete-head .compete-dd{
	float: left;
	margin-left:1rem;
}
.compete-head .compete-str{
	font-size: 1.7rem;
	color: #333;
	display: block;
	font-weight: normal;
}
.compete-head .compete-wx{
	font-size: 1.3rem;
	color: #999;
	display: block;
}
.compete-update {
	width: 1.7rem;
	height: 1.7rem;
	background: url(/res/img/update.png) no-repeat;
	background-size: 100%;
	display: inline-block;
	position: absolute;
	top: 3rem;
	right: 1.5rem;
	
	-webkit-transition: all 1s; 
	   -moz-transition: all 1s; 
			-o-transition: all 1s; 

	-webkit-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		 -o-transform: rotate(0deg);
			transform: rotate(0deg);
}
.compete-site{
	padding:1.5rem;
	color: #333;
	background: #fff;
	margin-bottom: 1rem;
}

.compete-site-sp{
	font-size: 1.6rem;
	display: inline-block;
	float: left;
	margin-right: 4rem;
}
.compete-not{
	float:left;
	margin-left: 18rem;
	font-size: 1.4rem;
	color: #999;
}
.compete-site-text {
	width: 20rem;
	float: left;
	font-size: 1.4rem;
	color: #999;
	display: block;
	white-space: nowrap; 
	overflow: hidden; 
	text-overflow: ellipsis;
	/*line-height:1.6rem;*/
}
.compete-site-text-title,
.compete-site-text-address {
	white-space: nowrap; 
	overflow: hidden; 
	text-overflow: ellipsis;
}
.compete-row {
	position: absolute;
	top: 50%;
	right: 1.6rem;
	transform: translateY(-50%);
	width: .75rem;
	height: 1.3rem;
	background: url(/res/img/arrow.png) no-repeat;
	background-size: 100%;
}
.compete-site-name {
	position: relative;
	padding: 1.5rem;
	color: #333;
	background: #fff;
	margin-bottom: 1rem;
	display: block;
} 
.compete-address-1{
	margin-top: 0;
}

.compete-address .compete-p{
	font-size: 1.4rem;
	float: left;
	width:21.5rem;
	display: block;
	text-decoration: none;
	color: #333;
	
}
.compete-btn{
	float: right;
}
.compete-site-shoping{
	position: relative;
	border-bottom: .05rem solid #c5c5c5;
	margin-bottom: 0;
}
.compete-site .compete-site-a{
	width: 22.5rem;
	display: block;
	font-size: 1.4rem;
	color: #999;
	text-decoration: none;
	float: left;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

/*控制开关件*/
.mui-switch {
  width:4.5rem;
  height:2.5rem;
  position: relative;
  border:.05rem solid #dfdfdf;
  background-color: #f6f6f6;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border-radius:3rem;
  background-clip: content-box;
  display: inline-block;
  -webkit-appearance: none;
  user-select: none;
  outline: none; 
  }
.mui-switch:before {
    content: '';
    width:2.4rem;
    height:2.4rem;
    position: absolute;
    top: 0px;
    left: 0;
    border-radius:50%;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4); }
.mui-switch:checked {
    border-color: #64bd63;
    box-shadow: #64bd63 0 0 0 16px inset;
    background-color: #64bd63; }
    .mui-switch:checked:before {
      left: 2rem; 
      }
.mui-switch.mui-switch-animbg {
    transition: background-color ease 0.4s; }
.mui-switch.mui-switch-animbg:before {
      transition: left 0.3s; 
      }
.mui-switch.mui-switch-animbg:checked {
      box-shadow: #dfdfdf 0 0 0 0 inset;
      background-color: #64bd63;
      transition: border-color 0.4s, background-color ease 0.4s; }
      .mui-switch.mui-switch-animbg:checked:before {
        transition: left 0.3s; 
        }
.mui-switch.mui-switch-anim {
    transition: border cubic-bezier(0, 0, 0, 1) 0.4s, box-shadow cubic-bezier(0, 0, 0, 1) 0.4s; }
.mui-switch.mui-switch-anim:before {
      transition: left 0.3s; 
      }
.mui-switch.mui-switch-anim:checked {
      box-shadow: #64bd63 0 0 0 16px inset;
      background-color: #64bd63;
      transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s; }
.mui-switch.mui-switch-anim:checked:before {
        transition: left 0.3s; 
}



/*店铺介绍*/

.shoping{
	position: absolute;
	top: 0;
	left: 0;
	background:#f6f6f6;
	width: 100%;
	height: 100%;
	z-index: 9999;
	display: none;
}
.shopDl{
	padding:1.4rem 2.7rem 0 1.4rem;
	background: #fff;
}
.shopDt{
	float: left;
	width: 6.5rem;
	font-size: 1.6rem;
	color: #333;
}
.shopDd{
	width: 25.5rem;
	float: right;
	font-size: 1.4rem;
	color: #999;
}
.shopDd .shopText{
	font-size: 1.4rem;
	color: #999;
	line-height: 2.8rem;
	resize:none;
	width: 25.5rem;
}

.formSave{
	background:#15af25;
	color:#fff;
	text-align:center;
	border:0;
	border-radius:1rem;
	padding:3%;
	font-size:1.6rem;
	width: 90%;
	margin:4rem 5% 4rem;
}

</style>
