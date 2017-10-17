<template>
<div class="">
	<div class="bankCardAdd" v-show="!isBankCandInfo">
		<div class="bankCardAdd_cont">
			<!-- 修改 -->
			<ul class="card-list">
				<li 
					class="bankCardAdd_item clr" 
					v-for="item in bankCardList"
					@click.stop="jumpEvent" 
					:data-id="item.id">
					<span class="bankCardAdd_title fl">{{ item.card_type }}</span>
					<span class="bankCardAdd_des fr" :data-id="item.id" @click.stop="jumpEventS">{{ item.number }}</span>
				</li>
			</ul>
			
			<!-- 正常添加 -->
			<router-link to="/bankcarddetails/add" class="bankCardAdd_item clr" v-on:click="bankCandInfo" v-if="!from">
				<div class="bankCardAdd_title fl">添加银行卡</div>
				<div class="bankCardAdd_des fr">支持信用卡、借记卡</div>
			</router-link>
			<!-- 提现页面 添加 -->
			<router-link to="/bankcarddetails/add?from=selectpage" class="bankCardAdd_item clr" v-on:click="bankCandInfo" v-if="from">
				<div class="bankCardAdd_title fl">添加银行卡</div>
				<div class="bankCardAdd_des fr">支持信用卡、借记卡</div>
			</router-link>

		</div>
		<div class="btn_area">
			<!-- <a href="javascript:;" class="link" v-on:click="bankInfoQuota()">支持银行及限额说明</a> -->
		</div>
	</div>
	<!-- 弹窗 修改身份信息 -->
	<div class="mask" v-if="isAlterMask" v-on:click="alterMask()"></div>
	<div class="cpm"  v-if="isAlterMask">
		<div class="cpm_inner">
			<div class="cpm_text-area">
				<i class="cpm_icon icon-s_admin icon-plaint"></i>
				<p class="cpm_text">银行卡所有人身份信息必须与当前用户一致如确认修改，将前往修改身份信息</p>
			</div>
			<div class="cpm_btn-area">
				<a class="cpm_btn_ok" href="/bankCardAuth">确认修改</a>
				<a class="cpm_btn_close" href="javascript:;"  v-on:click="alterMask()" >取消</a>
			</div>
		</div>
	</div>
	<!-- 弹窗 修改身份信息 -->
	<!-- 弹窗 支持银行及限额说明 -->
	<my-bank-info-quota :isBankInfoQuota="isBankInfoQuota"></my-bank-info-quota>
	<!-- 跳转 添加银行卡 -->
	<!-- <my-bank-cand-info :isBankCandInfo="isBankCandInfo"></my-bank-cand-info> -->
</div>
</template>
<script>

	
	var myBankInfoQuota = require("@/components/balance/bankInfoQuota")
	var myBankCandInfo  = require("@/components/balance/bankCardInfo")

	var ajax = require("ajax");
	

    module.exports = {
		
		data:function(){
			return {
				isBankInfoQuota:false,	 // 支持银行及限额说明
				isBankCandInfo:false,	 // 添加银行卡
				isAlterMask:false,		 // 确定弹窗
				bankCardList: [],        // 银行卡列表
				from: '',                // 是否来自提现页面
			}
		},
		created: function () {
			this.getBankCardList()
			if (this.$route.params.from == 'selectpage') {
				this.from = this.$route.params.from;
			};
			
		},
		mounted: function(){
			var _this = this;
			//支持银行及限额说明 弹窗
			$(".mask, .bankCardInfoMask_ft").on("click",function(){
				_this.isBankInfoQuota = !_this.isBankInfoQuota;
			});
			//支持银行及限额说明 弹窗
			$(".bankCardInfo .btn").on("click",function(){
				if($('.bankCardInfo').css("display") == "block"){
					$('.bankCardAdd').show();
					_this.isBankCandInfo = !_this.isBankCandInfo;
				}
			});

			this.$nextTick(function() {
				this.addRouterLink()
			})
		},
		methods: {
			bankInfoQuota: function(){
				this.isBankInfoQuota = !this.isBankInfoQuota;
			},
			bankCandInfo: function(){
				this.isBankCandInfo = !this.isBankCandInfo;
			},
			alterMask: function(){
				this.isAlterMask = !this.isAlterMask;
			},

			// 修改银行卡[触发li]
			jumpEvent: function(ev) {
				var _this = this;
				var fromUrl = this.$route.params.from;
				if ( ev.target.tagName.toUpperCase() == 'LI') {
					var bankid 	 = ev.target.dataset.id;
					var bankName = $(ev.target).find('.bankCardAdd_title').html();
					if (fromUrl == 'selectpage') {
						sessionStorage.setItem('bank_name',bankName);
						// 设置当前用户的银行卡
						ajax.selectBankCard(bankid,function(data) {
							if (data.status == 200) {
								// 此处拿到当前设置的银行卡
							};
						})
						// 延时跳转
						setTimeout(function(){
							window.location.href = window.sessionStorage.getItem("payment_url_bank")
						},1000)
						
					} else {
						// 修改 删除银行卡
						this.$router.push("/bankcarddetails/modify?bankid=" + bankid)
					}
				}	
			},

			// 修改银行卡[触发span]
			jumpEventS: function(ev) {
				var _this = this;
				var fromUrl = this.$route.params.from;
				if ( ev.target.tagName.toUpperCase() == 'SPAN') {

					var bankid 	 = ev.target.dataset.id;
					var bankName = $(ev.target).parent('li').find('.bankCardAdd_title').html();
					if (fromUrl == 'selectpage') {
						sessionStorage.setItem('bank_name',bankName);

						// 延时跳转
						setTimeout(function(){
							// _this.$router.back();
							window.location.href = window.sessionStorage.getItem("payment_url_bank")
						},1000)
						
					} else {
						// 修改 删除银行卡
						this.$router.push("/bankcarddetails/modify?bankid=" + bankid)
					}
				}	
			},

			// 获取银行卡列表
			getBankCardList: function() {
				var _this = this;
				ajax.getBankList(function(data) {
					if (data.status == 200) {
						_this.bankCardList = data.data
					} else if( data.status == 501) {
						alert("传参错误")
					}
				})
			},

			// footer 样式添加
			addRouterLink: function() {
				$(".footer-bottom a").eq(3).addClass("router-link-active");
			}
			
		},
		beforeDestroy: function() {
			$(".footer-bottom a").eq(3).removeClass("router-link-active");
		},
		components: {
			'my-bank-info-quota': myBankInfoQuota,
			'my-bank-cand-info':myBankCandInfo
	  	}
	}

</script>
<style>
.bankCardAdd_cont{
    overflow: hidden;
}
.bankCardAdd_item {
    display: block;
    margin-top:1rem;
    padding:0 1rem;
    height:4.5rem;
    line-height:4.5rem;
    background-color: #fff;
}
.bankCardAdd_title{
    font-size:1.6rem;
    color: #333;
}
.bankCardAdd_des{
    font-size:1.4rem;
    color: #999;
}
/* 按钮 */
.btn_area{
    margin: 4rem 3.75rem;
    text-align: center;
}
.link{
    color: #6699ff;
    font-size: 1.4rem;
}
/* 弹窗 修改身份信息 */
.cpm{
    position: absolute;
    bottom:0;
    left:0;
    width: 100%;
    background-color: #f7f8f7;
    overflow: hidden;
}
.cpm_icon{
    margin:1.25rem auto .8rem;
    display: block;
}
.cpm_text-area, .cpm_btn-area{
    padding:0 3.5rem;
}
.cpm_text{
    line-height: 2.8rem;
    font-size: 1.6rem;
    color: #000;
    text-align: center;
}
.cpm_btn_ok, .cpm_btn_close{
    margin: 1.9rem 0;
    display: block;
    width: 30rem;
    height: 4.3rem;
    line-height: 4.3rem;
    color: #333;
    font-size: 1.6rem;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: .3rem;
}
.cpm_btn_close{
    background-color: #808593;
    color: #fff;
}
.cpm_btn_ok:active{
    background: rgba(0,0,0,.1);
}
.cpm_btn_close:active{
    background: rgba(0,0,0,.5);
}

</style>
