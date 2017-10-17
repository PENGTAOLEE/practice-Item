<template>
<div class="buyerSet">
	<!-- 认证前头部 -->
	<div class="compete-name cc" v-if="data.is_apply == 0">
		<dl class="compete-head cc">
			<dt class="compete-img">
				<img :src="data.thumb" />
			</dt>
			<dd class="compete-dd">
				<strong class="compete-str">{{data.name||"未设置"}}</strong>
				<span class="compete-wx">(头像、昵称将同步微信)</span>
			</dd>
		</dl>		
		<em class="compete-update" @click="updateUserInfo($event)"></em>
	</div>

	<!-- 认证后头部 -->
	<div class="compete-name cc" v-if="data.is_apply != 0">
		<dl class="compete-head cc">
			<dt class="compete-img">
				<img :src="data.thumb" />
			</dt>
			<dd class="compete-dd">
				<p class="compete-user-level-icon">
					<span class="compete-str" id="compete-str">{{data.name||"未设置"}}</span>
					<!-- <span class="spritesmap user-level s1"></span>
					<span class="spritesmap auth-user personal"></span> -->
				</p>
				<span class="compete-wx">
					经验 {{ data.experience }} | <span style="color:#b1a18c;">粉丝 {{ data.fanns_number }}</span>
				</span>
			</dd>
		</dl>		
	</div>
	
	<div class="buyerList">
		<form action="#">
			<div class="buyerList-group cc" @click="inputData">
				<label>联系人</label>
				<!-- <input type="text" value="请输入联系人姓名"  /> -->
				<p class="normal-list">{{contact_name||"请输入联系人姓名"}}</p>
				<em class="compete-row"></em>
			</div>
			<div class="buyerList-group cc" v-if='is_weixin'>
				<label>微信号</label>
				<p class="normal-list">{{data.wechat}}</p>
			</div>
			<div class="buyerList-group cc" @click="mobileBox=!mobileBox">
				<label>手机号码</label>
				<p class="phoneNum">{{data.mobile||"请绑定手机号"}}</p>
				<em class="compete-row"></em>
			</div>
			<div class="buyerList-group cc" v-show="data.address_id==0" >
				<label>收货地址</label>
				<router-link to="/setaddress?from=buyerset"  title="" class="buyserA">设置收货地址</router-link>
				<em class="compete-row"></em>
			</div>
			
			<div class="compete-site compete-address compete-address-1 cc" v-show="data.address_id!=0"> 
				<span class="compete-site-sp">收货地址</span>
				<router-link to="/setaddress?from=buyerset"  title="" class="compete-p">{{data.address_name+data.address_mobile+data.address_area+data.address}}</router-link>
				<em class="compete-row"></em>
			</div>
			
		</form>
	</div>
	
	<div class="compete-site cc">
		<span class="compete-site-sp">超级买家</span>
		<!-- 
			未认证 /   =>  申请页面
			审核中 /   
			审核失败 / =>  重新申请
			认证成功   =>  认证成功后页面
		 -->
		<a href="/applyentry" @click='judgeStuent' class="compete-p-super" style="color:#999;" v-if="is_superBuyer==9">
			未认证
		</a>
		<router-link to="/applyentry" class="compete-p-super" style="color:#999;" v-if="is_superBuyer==0">
			审核中
		</router-link>
		<router-link to="/subuyerinfo" class="compete-p-super" style="color:#999;" v-if="is_superBuyer==1">
			认证成功
		</router-link>
		<router-link to="/applyentry" class="compete-p-super" style="color:#999;" v-if="is_superBuyer==2">
			审核失败
		</router-link>
		<em class="compete-row"></em>	
	</div>
	
	<router-link class="compete-site cc" to='/accountsecurity'>
		<span class="compete-site-sp">账户安全</span>
		<em class="compete-row"></em>	
	</router-link>
	<div class="compete-site cc">
		<span class="compete-site-sp">固定【我的】为买家中心</span>
		
		<label class="compete-btn" v-if='!is_weixin'>
			<input class="mui-switch mui-switch-animbg" type="checkbox" @click="translate" 
			v-model="is_checked">
		</label>

	</div>
	<div class="log-off" v-if='!is_weixin'>
            <p class="log-off-button" @click='logOff'>退出登录</p>
    </div>
    <div class="space">
    	
    </div>
	<text-box v-show="is_basic" @saveBox="gotoSave" @close="close"></text-box>
	<show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>
	<!--  手机号-->
	<div class="offer-box fixed" v-show="mobileBox" @click.self='closeMobileBox'>
		<div class="ab offerbg mobile" >
			<input type="number" class="mobile-num offerinput "  placeholder="请输入手机号" v-model="mobileNum">
			<!-- 事件绑定在这儿 -->
			<!-- <div  class="offerbtnbg mobile-btn" >下一步</div> -->
			<div  :class="mobileClass" @click="nextStep">下一步</div>
		</div>
	</div>
	<!--  手机号-->
			<!-- 验证码 -->
	
	<div class="offer-box fixed" v-show="identifyBox" @click.self='closeIdentifyBox'>
		<div class="voiceAuth_cpm" >
			<div class="voiceAuth_text-area">
				<a class="voiceAuth_text voiceAuth_text__red" href="javascript:;">验证码&nbsp;</a>
				<span class="voiceAuth_text voiceAuth_text__grey">将发送至</span>
				<a  class="voiceAuth_text voiceAuth_text__red" href="javascript:;">{{mobileNum}}</a>
			</div>
			<div class="voiceAuth_input-area clr">
				<input type="text" class="voiceAuth_input-input fl" placeholder="验证码" :disabled="is_disabled" v-model="identifyNum">
				<a  type="button"  class="voiceAuth_input-btn fr" @click.prevent="firstSend" v-show="identi_first">发送验证码</a>
				<a  type="button" class="voiceAuth_input-btn fr" :class="{'grey-btn': send_btn_ok}" v-show="identi_more" @click.prevent="moreSend" >重新发送<countdown ref="count" @childEvent="changeColor"></countdown></a>
			</div>
			<div class="voiceAuth_info re">
			</div>
			<div class="btn_area">
				<a  class="btn" @click.prevent="sendCode" :class="{btn_ok: (identifyNum!=0)}">确定</a>
			</div>
		</div>
	</div>
</div>

</template>
<script>
	var ajax = require("ajax");
	
	var textBox = require("@/components/textbox")
	var showAlert = require("@/components/component/showAlert")
	var countdown = require("@/components/smallcountdown")
	var utils = require("utils");
	

  module.exports = {
		
		data: function(){
			return {
				contact_name: "",    //联系人 ，  需要post
				address_id : '',     //地址id， 需要post
				data: '', 
				mobile_number: "",     //绑定手机号 ，需要post
				is_seller: "",          //默认买家还是卖家  ，需要post
				showAlertBoll: false,   
				tipMsg: "",
				is_basic: false,
				showtip: false,
				identifyBox: false, //输入验证码弹窗
				mobileBox: false,  //输入手机号弹窗
				mobileNum: '', //验证手机号的model变量
				identifyNum: '', //验证验证码的model变量
				identi_first: true,
		        identi_more: false,
		        send_btn_ok: true,
		        is_click: false,
		        is_disabled: true,
		        // 默认为未认证
		        is_superBuyer: 9,
		        is_student: 0,
		        is_weixin: utils.isWeixin()

			}
		},
		computed: {
			is_checked: function(){
				if(this.is_seller){
					return false;
				}else{
					return true;
				}
			},
			mobileClass: function(){
				return {
					offerbtnbg: true,
					"mobile-btn": true,
					btn_ok: this.mobileNum!=0 
				}
			},
		},
		components: {
            "text-box" : textBox,
            "showAlert": showAlert,
            "countdown": countdown
		},
		mounted: function() {
			document.title="个人信息设置";

			// 禁用微信分享
            utils.disableSharing();
		},
		methods: {

			// 验证是否超级买家 @lpt
			getSuperBuyerInfo(callback) {
				ajax.getSuperBuyerInfo((res) => {
					const data = res.data;
					if (res.status == 200) {
						callback && callback(data)
					} else if(res.status == 201) {
						this.is_superBuyer = 9;
					}
				})
			},

			getInfo:function(){
				 var that = this;
				ajax.getUserInfo(function(data){
					if(data.status == 200){
						that.data = data.data[0];
						that.is_seller = data.data[0].is_seller;
						that.contact_name = data.data[0].contact_name;
						that.is_student = data.data[0].is_student;
						//判断本地是否存储收货地址

					}else{
						console.log(data.msg);
					}
				})
			},
			refreshUserData: function(){
				var that = this;
				var contact_name = that.contact_name;
				var is_seller = that.is_seller;
				ajax.refreshUserData(contact_name,is_seller,function(data){
					if(data.status == 200){
						// that.$router.go(0);
						// that.data = data.data;
					}else{
						console.log("失败！");
					}
				})
			},
			// 更新用户数据
			updateUserInfo: function(ev){ 
				var that = this;
				ajax.updateUserInfo(function(res){
					if(res.status == 200){ //修改主页的店铺简介
						$(ev.target).css("transform","rotate(360deg)");
						
						that.data.thumb = res.data.thumb;
						that.data.name = res.data.name;
						
					} else {
						that.tipMsg = res.msg;
						that.showAlertBoll = true;
						
					}
				})
			},
			/*输入手机号之后下一步的方法*/
			 nextStep: function() {
                var _this = this;
                var regExp = /^1(3|4|5|7|8)\d{9}$/;

                if ( !regExp.test(this.mobileNum) ) {
                    console.log('请输入正确格式的手机号')
                    this.tipMsg = "请输入正确格式的手机号"
                    this.showAlertBoll = true;
                } else if(this.data.mobile==this.mobileNum){
                	this.tipMsg = "您输入的手机号与已绑定的手机号相同，请重新输入！亲"
                    this.showAlertBoll = true;
                }else {
                    console.log("输入的手机号正确");
                    this.mobileBox = false;

                    this.identifyBox = true;
                    // 暂时给出测试代码 提交测试 删除一下代码
                    // _this.showBond = false;
                    // _this.showVerCode = true;
                    // _this.smsVerification()
                }
            },
            /*输入手机号之后下一步的方法*/
            firstSend: function(){
                this.identi_first = false;
                this.commonSend();  
            },
            /*发送验证码*/
            commonSend: function(){
            	this.btn_ok = true;
                this.identi_more = true

             	this.$refs.count.startcount(60000);
             	var that = this;
            	ajax.sendVerifiyCode(that.mobileNum,0,function(data){
            		if(data.status==200){
            			console.log("发送验证码成功！");

            		}else{
            			that.tipMsg = "每天只能发送三次验证码，发送失败，亲！"
                    	that.showAlertBoll = true;
            		}
            	});
            	this.is_disabled = false;
            },
            
            moreSend: function(){
            	this.identi_more = true;
            	if(this.is_click){	
            		this.commonSend();
            		this.is_click= false;	
            	}
            	
            },

			closePopup: function() {
				this.showAlertBoll = false;
			},
			close: function() {
				this.showtip = false;
			},
			gotoSave: function(text){
			     var that = this;
			     that.is_basic = false;
				that.contact_name = text;
				console.log(123);
				that.refreshUserData();
			},
			translate: function(){
				this.is_seller = !this.is_seller;
				this.refreshUserData();
			},
			inputData: function(){
				this.is_basic = true;
				console.log(123);
			},
			changeColor: function(){
				this.send_btn_ok = !this.send_btn_ok;
				this.is_click = true;
			},
			sendCode: function(){
				var that = this;
				var mobileNum = that.mobileNum;
				var identifyNum = that.identifyNum;
				if(identifyNum){
					ajax.smsVerifiy(mobileNum,identifyNum,1,function(data){
						if(data.status==200){
							console.log("验证成功");

							that.identifyBox = false;
							that.data.mobile = mobileNum;
							that.tipMsg = "亲，您已验证成功！"
                    		that.showAlertBoll = true;
						}else{
							alert(data.msg);
							that.identifyBox = false;
							that.tipMsg = "验证失败，亲！"
                    		that.showAlertBoll = true;
							
						}
					})
				}
			},
			judgeStuent: function(e){
				if(this.is_student==1){
					this.tipMsg = '学生不能申请成为超级买家';
					this.showAlertBoll = true;
					e.preventDefault();
				}else{
					return true;
				}
			},
			closeIdentifyBox: function(){
				console.log(1111);
				this.identifyBox = false;
			},
			closeMobileBox: function(){
				this.mobileBox = false;
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

		},
		created: function(){
      this.getInfo();

      this.getSuperBuyerInfo((data) => {
      	this.is_superBuyer = data.is_apply;
      })
		}
	}

</script>
<style scoped>
.compete-p-super {
	display: inline-block;
	width: 23rem;
}
.compete-name{
	position: relative;
	width: 100%;
	margin-bottom: 1rem;
}
.compete-head{
	width: 100%;
	background:#FFF;
	padding:1.5rem;	
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
	display: inline-block;
	vertical-align: middle;
	font-weight: normal;
	max-width: 10rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.compete-head .compete-wx{
	font-size: 1.3rem;
	color: #999;
	display: block;
}
.compete-update{
	width: 1.7rem;
	height:1.7rem;
	background:url(../../assets/img/update.png) no-repeat;
	background-size: 100%;
	display: inline-block;
	position: absolute;
	top: 3rem;
	right: 1.5rem;
}
.compete-site{
	display: block;
	padding:1.5rem;
	font-size: 1.6rem;
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
	/*margin-left: 18rem;*/
	font-size: 1.4rem;
	color: #999;
}
.compete-site-text{
	float: left;
	font-size:1.4rem;
	color: #999;
	line-height:1.6rem;
}
.compete-row{
	width: .75rem;
	height: 1.3rem;
	background:url(../../assets/img/arrow.png) no-repeat;
	background-size: 100%;
	float: right;
	margin-top: .5rem;
}
.compete-address{
	margin-top: 2.5rem;
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

/*信息列表*/
.buyerList{
	background: #fff;
	margin-bottom: 1rem;
}
.buyerList-group{
	display: block;
	padding: 1.25rem 1.5rem;
	font-size: 1.6rem;
	border-bottom: .05rem solid #ddd;
}
.buyerList-group label{
	float: left;
	width:9.5rem;
	float: left;
}

.buyerList-group input{
	float: left;
	width: 24rem;
	color: #999;
}
.buyerList-group .buyserA{
	float: left;
	width: 24rem;
	color: #999;
	display: block;
	text-decoration: none;
}
.phoneNum{
	float: left;
	font-size: 1.4rem;
	color: #333;
}
.normal-list{
	float: left;
	font-size: 1.4rem;
	color: #999;
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
  outline: none; }
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
      left: 2rem; }
.mui-switch.mui-switch-animbg {
    transition: background-color ease 0.4s; }
.mui-switch.mui-switch-animbg:before {
      transition: left 0.3s; }
.mui-switch.mui-switch-animbg:checked {
      box-shadow: #dfdfdf 0 0 0 0 inset;
      background-color: #64bd63;
      transition: border-color 0.4s, background-color ease 0.4s; }
      .mui-switch.mui-switch-animbg:checked:before {
        transition: left 0.3s; }
.mui-switch.mui-switch-anim {
    transition: border cubic-bezier(0, 0, 0, 1) 0.4s, box-shadow cubic-bezier(0, 0, 0, 1) 0.4s; }
.mui-switch.mui-switch-anim:before {
      transition: left 0.3s; }
.mui-switch.mui-switch-anim:checked {
      box-shadow: #64bd63 0 0 0 16px inset;
      background-color: #64bd63;
      transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s; }
.mui-switch.mui-switch-anim:checked:before {
        transition: left 0.3s; }
        
/*输入手机号弹窗*/
 .offer-box{
  left: 0;
  top: 0;

  /*自己添加*/
  right: 0;
  bottom: 0;
  /*自己添加*/
  background-color: rgba(0,0,0,0.4);
  width: 100%;
  height: 100%;
  z-index: 29;
}
.offer-box .offerbg{
  width: 100%;
  left:0;
  bottom: 0;
  background-color: #f7f8f7;
  padding: 2.5rem 1.5rem 2rem 1.5rem;
  /*display: none;*/
}
.offer-box .offerinput{
  width: 100%;
  height: 4.5rem;
  border:1px solid #ddd;
  font-size: 1.6rem;
  color: #333;
  background-color: #fff;
  margin-bottom: 2.3rem;
}
.offer-box  .offerbtnbg {
  height: 4.4rem;
  line-height: 4.4rem;
  background-color: #ddd;
  color: #fff;
  font-size: 1.6rem;
  text-align: center;
  border-radius: 0.3rem;
  /*background-color: #15af25;
*/}
.offer-box .mobile-num{
  padding-left: 1rem;
}
.offer-box .mobile-btn,.offer-box .vn-btn{
  margin-bottom: 0.5rem;
}
.btn_ok{
  background-color: #15af25!important;
}
/*输入手机号弹窗*/




/*  验证码   */
.voiceAuth_cpm{
    position: fixed;
    bottom:0;
    left:0;
    z-index: 19;
    width: 100%;
    background-color: #f7f8f7;
}
.voiceAuth_text-area{
    padding:1.5rem;
}
.voiceAuth_text{
    color: #333;
    font-size: 1.4rem;
    line-height: 1;
}
.voiceAuth_text__red{
    color: #ad1a1a;
}
.voiceAuth_input-area{
    padding:0 1.5rem;
}
.voiceAuth_input-input{
    padding:1rem;
    width: 13.75rem;
    height: 4.3rem;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    color: #999;
    font-size: 1.4rem;
}
.voiceAuth_input-btn{
    width: 19.7rem;
    height: 4.3rem;
    line-height: 4.3rem;
    background-color: #6699ff;
    color: #fff;
    text-align: center;
    font-size: 1.4rem;
    border-radius: 0.3rem;
}
.grey-btn {
    background-color: #ddd;
}
.voiceAuth_input-btn:active{
    background-color: #8ab1fd;
}
.voiceAuth_info{
    padding:0.5rem 0;
    /*min-height: 4.5rem;*/
    color: #6e7294;
    font-size: 1.2rem;
    text-align: right;
}
.voiceAuth_cpm .btn_area{
    margin-top: 0;
    margin-bottom: 2rem;
}
.voiceAuth_cpm .btn:active{
    background-color: #41c74f;
}
/* 已发送至 */
.voiceAuth_hint{
    padding:0 1.5rem 1rem;
    color: #999;
    font-size: 1.2rem;
}
.voiceAuth_hint__red{
    color: #ff5454;
}
.voiceAuth_info-text{
    position: absolute;
    top:1rem;
    right:1.5rem;
}
.voiceAuth_info-box{
    margin:0 auto;
    width: 17rem;
    height: 3.5rem;
    line-height: 1.75rem;
    border: 1px dashed #ff0000;
    font-size: 0;
}
.voiceAuth_info-box p{
    text-align: center;
    font-size: 1.1rem;
}
.voiceAuth_info-box p:first-child, .voiceAuth_info-box p:first-child a{
    color: #ff0000;
}
.voiceAuth_info-box p:first-child a{
    text-decoration: underline;
}
.voiceAuth_info-box p:last-child a{
    color: #6699ff;
}

/*   手机验证 */

.compete-user-level-icon span {
	display: inline-block;
	vertical-align: middle;
}
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
