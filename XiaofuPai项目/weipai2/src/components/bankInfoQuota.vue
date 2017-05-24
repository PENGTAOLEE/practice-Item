<template>
<!-- 支持银行及限额说明 弹窗 -->
<div>
	<div class="mask" v-show="isBankInfoQuota"></div>
	<div class="bankCardInfoMask" v-show="isBankInfoQuota">
		<div class="bankCardInfoMask_hd">支持银行及限额说明</div>
		<div class="bankCardInfoMask_bd">
			<div class="bankCardInfoMask_thead">
				<div class="bankCardInfoMask_tr">
					<div class="bankCardInfoMask_td">支持银行(额度)</div>
					<div class="bankCardInfoMask_td">借记卡</div>
					<div class="bankCardInfoMask_td">信用卡</div>
				</div>
			</div>
			<!-- 银行卡列表 -->
			<div class="bankCardInfoMask_tbody">
				<div class="bankCardInfoMask_tr" v-for="item in [1,2,3,4,5,6]">
					<div class="bankCardInfoMask_td vc"> 
						<div class="bankCardInfoMask_icon-area vc">
							<img src="/res/img/likecur.png" alt="" class="bankCardInfoMask_icon">
						</div>
						<span class="vc">农业银行</span>
					</div>
					<div class="bankCardInfoMask_td">5,000</div>
					<div class="bankCardInfoMask_td">10,000</div>
				</div>
			</div>
		</div>
		<div class="bankCardInfoMask_ft">我知道了</div>
	</div>
</div>
<!-- end 支持银行及限额说明 弹窗 -->
</template>
<script>


    module.exports = {
		data: function() {
			return {
				// 银行限额数据
				bankDataList: {}
			}
		},
		props: ['isBankInfoQuota'],
		template: require("module/bankInfoQuota/bankInfoQuota.html")
	}

</script>
<style>
/* 支持银行及限额说明 */
.mask{
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background: rgba(0,0,0,0.4);
}
.bankCardInfoMask{
    position: absolute;
    top:2.5rem;
    left:50%;
    margin-left: -16.75rem;
    width: 33.5rem;
    background-color: #fff;
    border-radius: .3rem;
}
.bankCardInfoMask_hd{
    padding:1.8rem 1.5rem 1.3rem; 
    color: #333;
    font-size: 1.6rem;
    line-height: 1;
}
.bankCardInfoMask_bd{
    position: relative;
    margin:0 auto;
    width: 30.75rem;
}
.bankCardInfoMask_bd:before{
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid #ddd;
    color: #ddd; 
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
}
.bankCardInfoMask_bd:after{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #ddd;
    color: #ddd;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.bankCardInfoMask_thead{
    background-color: #eee;
    font-size: 0;
}
.bankCardInfoMask_tr{
    position: relative;
    display: flex;
    align-items: center;
}
.bankCardInfoMask_tr:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-left: 1px solid #ddd;
    color: #ddd; 
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
}
.bankCardInfoMask_tr:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ddd;
    color: #ddd;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.bankCardInfoMask_thead .bankCardInfoMask_td{
    font-size: 1.4rem;
    padding:1rem 0;
}
.bankCardInfoMask_td{
    flex:1;
    display: inline-block;
    line-height: 1;
    font-size: 1.3rem;
    color: #333;
    text-align: center;
    padding:.5rem 0;
}
.bankCardInfoMask_tbody{
    overflow: auto;
    height: 30rem;
}
.bankCardInfoMask_icon-area{
    position: relative;
    top:0;
    right:.75rem;
    display: inline-block;
    width: 2.25rem;
    height: 2.25rem;
}
.bankCardInfoMask_icon{
    width: 100%;
    height: 100%;
}
.bankCardInfoMask_ft{
    height: 4rem;
    line-height: 4rem;
    background-color: #ad1a1a;
    text-align: center;
    color: #fff;
    font-size: 1.6rem;
    border-bottom-left-radius: .3rem;
    border-bottom-right-radius: .3rem;
}
</style>
