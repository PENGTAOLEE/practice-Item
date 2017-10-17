<template>
	<main>
		<h2 class="model-box-title">积分说明</h2>
		<div class="model-box-content">
			<p>1.在【个人中心】点击【签到】获得积分，每天限签到一次，连续签到三次，可获得一次抽奖机会，抽奖可获得积分</p>
			<p>2.通过分享，带来新关注用户可抽奖获得积分</p>
			<p>3.每笔订单1元等于1积分，当面交易没有积分</p>
			<p>4.如果用户违约积分也将受到影响，违约订单扣除应得积分的双倍。</p>
			<div class="radius size ab">
				<table border="0">
					<tbody>
						<tr>
							<td>积分可兑换课程哦~ 在【发现】点击【课程】可兑换<br/>
							积分商城正在建设中，未来用户除了可以直接用积分兑换自己喜欢的奖品，还将可以用积分抽取豪华大奖！</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</main>
</template>

<script>
	export default {
		data () {
			return {

			}
		},

		created () {

		},

		mounted () {
			$("#footer-common").hide()
		}
	}
</script>

<style scoped> 
.model-box-title {
	width: 100%;
	margin-top: 1.8rem;
	text-align: center;
	font-size: 1.6rem;
	font-family: PingFangSC;
	font-weight: bold;
	color: #ad1a1a;
}

.model-box-content {
	overflow-y: auto;
	height: 38rem;
	padding: 1.3rem 2.5rem;
	font-size: 1.4rem;
}

.model-box-content p {
	margin-bottom: 1rem;
	color: #333;
}	

.radius {
	border: 1px solid #333;
	border-radius: 1rem;
	overflow: hidden;
}
.radius.size {
	height: 11rem;
	margin-right: 2.5rem;
}

table {
	width: 100%;
}

table td {
	padding: 1.2rem .8rem;
}
</style>