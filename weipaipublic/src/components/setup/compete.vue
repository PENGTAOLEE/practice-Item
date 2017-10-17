<template>
	<div class="compete">
		<!-- 认证前 -->
		<div class="before-authentication" v-if="shopInfo.is_apply_now!=3">
			<div class="compete-name cc">
				<dl class="compete-head cc">
					<dt class="compete-img">
						<img :src="shopInfo.user_thumb" alt="" id="user_head">
					</dt>
					<dd class="compete-dd">
						<strong class="compete-str" id="compete-str">{{ shopInfo.user_name }}</strong>
						<!-- @weipai1.1 -->
						<span class="compete-wx">
							经验 {{ shopInfo.experience }} | 粉丝 {{ shopInfo.fanns_number }}
						</span>
						<!-- @weipai1.1 end -->
					</dd>
				</dl>		
				<em class="compete-update" @click="updateUserInfo($event)" v-if="shopInfo.is_apply_now != 3"></em>
			</div>
			
			<div class="compete-site compete-site-shoping cc">
				<span class="compete-site-sp">店铺介绍</span>
				<router-link to="" class="compete-site-a">{{ shopDescIn }}</router-link>
				<em class="compete-row" ></em>
			</div>
			
			<!-- 退货地址 -->
			<router-link to="/setaddress?from=compete" class="compete-site-name cc">
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
			
		
            <!--个人认证审核中和企业认证审核中-->
            <router-link to="/authenticationindex" class="compete-site-name cc" v-if="shopInfo.is_apply_now==1">
				<span class="compete-site-sp">店铺认证</span>
                <span class="compete-not" >&nbsp;未认证</span>
				<em class="compete-row"></em>
			</router-link>
            <router-link to="/authendetails" class="compete-site-name cc" v-else-if="shopInfo.is_apply_now!=1">
				<span class="compete-site-sp">店铺认证</span>
                <span class="compete-not" v-if="shopInfo.is_apply_now==2">&nbsp;审核中</span>
                <span class="compete-not" v-else-if="shopInfo.is_apply_now==4">&nbsp;认证失败</span>
                <span class="compete-not" v-else-if="shopInfo.is_apply_now==5">&nbsp;认证过期</span>
				<em class="compete-row"></em>
			</router-link>
		
			
			<div class="shoping">
				<div class="shopName">
					<dl class="shopDl cc">
						<dt class="shopDt">店铺介绍</dt>
						<dd class="shopDd">
							<textarea class="shopText" required>{{ shopDescIn }}</textarea>
						</dd>
					</dl>
					<button class="formSave" @click="editShopDesc()">完成</button>
				</div>
			</div>	
		</div>
		<!-- 认证前 结束 -->

		<!-- @weipai 1.1 -->
		<!-- 认证后 -->
		<!-- v-if="(shopInfo.is_apply == 1|| shopInfo.is_apply == 2)&&(shopInfo.is_apply_state==1)" -->
		<div class="after-authentication" v-if="shopInfo.is_apply_now==3">
			<div class="compete-name cc">
				<dl class="compete-head cc">
					<dt class="compete-img">
						<img :src="shopInfo.user_thumb" alt="" id="user_head">
					</dt>
					<dd class="compete-dd">
						<p class="compete-user-level-icon">
							<span class="compete-str" id="compete-str">{{ shopInfo.user_name }}</span>
							<span class="spritesmap user-level" v-if="shopInfo.experience_level" :class="'s'+shopInfo.experience_level"></span>
							<span class="spritesmap auth-user"  :class="{'personal':shopInfo.type==1,'shop':shopInfo.type==2}"></span>
						</p>
						<span class="compete-wx">
							评分 {{ shopInfo.average_mark }} | <span style="color:#b1a18c;">积分 {{ shopInfo.score }}</span>
						</span>
					</dd>
				</dl>		
			</div>

			<!-- 退货地址 -->
			<router-link to="/setaddress?from=compete" class="compete-site-name cc">
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
			
			<router-link to="/authenticationindex" class="compete-site-name cc">
				<span class="compete-site-sp">店铺认证</span>
				<span class="compete-not" :class="{'red-s1':shopInfo.type==1,'red-s2':shopInfo.type==2}"></span>
				<em class="compete-row"></em>
			</router-link>
		</div>
		<!-- 认证后 结束 -->
		<!-- @weipai 1.1 end -->
		<router-link to="/accountsecurity" class="compete-site-name cc">
				<span class="compete-site-sp">账户安全</span>
				<em class="compete-row"></em>
			</router-link>
		<div class="compete-site cc">
			<span class="compete-site-sp">固定【我的】为卖家中心</span>
			
			<label class="compete-btn">
				<input class="mui-switch mui-switch-animbg" type="checkbox" @click="changeStatus()">
			</label>
			
		</div>
		<div class="log-off" v-if='!is_weixin'>
            <p class="log-off-button" @click='logOff'>退出登录</p>
    	</div>
		<div class="space">
			
		</div>
		<!-- 弹窗提示 -->
		<show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>	
	</div>

</template>
<script>
	var showAlert = require("@/components/component/showAlert")
	
	var ajax = require("ajax");
	var utils = require("utils");
	

    module.exports = {
		data:function(){
			return {
				showAlertBoll: false,   
				tipMsg: '',
				shopInfo : [],
				arrlist:[],
				is_weixin: utils.isWeixin(),
				shopDescIn: ''
			}
		},
		
		components: {
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
			// 转义特殊字符
      this.shopDescIn = utils.strEscape(this.shopInfo.desc )

      if(/&(lt|gt|nbsp|amp|rdquo|quot);/ig.test(this.shopDescIn) ) {
        this.shopDescIn = utils.strEscape(this.shopDescIn)
      }

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
			},
			logOff(){
                let that = this;
                ajax.logOff(function(res){
                    if(res.status==200){
                        that.$router.push('/index');
                    }else{
                        that.tipMsg = res.msg;
                        that.showAlertBoll = true;
                    }
                });
            }

		}

	}

</script>
<style scoped>
/* 认证前 */
.compete-name{
	width: 100%;
	position: relative;
}
.compete-head{
	width: 100%;
	background: #FFF;
	padding: 1.5rem;
	margin-bottom: 1rem;	
	/*border-bottom: .05rem solid #c5c5c5;*/
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
.compete-head .compete-str {
	max-width: 10rem;
	font-size: 1.7rem;
	color: #333;
	display: inline-block;
	font-weight: normal;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.compete-head .compete-wx{
	font-size: 1.3rem;
	color: #999;
	display: block;
}
.compete-update {
	width: 1.7rem;
	height: 1.7rem;
	background: url(../../assets/img/update.png) no-repeat;
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
	display: inline-block;
	float: left;
	margin-right: 4rem;
	font-size: 1.6rem;
	font-family: PingFangSC;
	color: #333;
}
.compete-not{
	float:left;
	/*margin-left: 18rem;*/
	font-size: 1.4rem;
	color: #999;
}
.compete-not.red-s1 {
	color: #fa693c;
}
.compete-not.red-s1:after {
	content: "已个人认证";
}
.compete-not.red-s2 {
	color: #ad1a1a;
}
.compete-not.red-s2:after {
	content: "已企业认证";
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
	background: url(../../assets/img/arrow.png) no-repeat;
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
/* 认证前 结束 */

/* 认证后 */
.compete-user-level-icon {
}

.compete-user-level-icon span {
	display: inline-block;
	vertical-align: middle;
}
/* 认证后结束 */
.log-off{
	width: 28rem;
	height: 5.7rem;
	margin: 3rem auto;
}
.log-off-button{
	width: 25rem;
	height: 3.4rem;
	margin: auto;
	background-color: #AD1A1A;
	color: #fff;
	font-size: 1.4rem;
	line-height: 3.4rem;
	text-align: center;

}
.space{
	width: 100%;
	height: 3.8rem;
}
</style>
