<template>
	<div class="model-box">
		<div class="model-box-wrapper">
			<div class="model-box-title">
				{{ title }}
			</div>
			<div class="model-box-content" v-html="content"></div>
			<button class="model-box-button" @click="close">
				我知道了
			</button>
			<span class="model-box-close" @click="close">×</span>
		</div>
	</div>	
</template>

<script>
	export default {
		data () {
			return {

			}
		},

		props: ['title','content'],

		methods: {
			close: function() {
				this.$emit('closeBox')
			}
		}
	}
</script>

<style>
	.model-box {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 20;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.2);
	}
	
	.model-box-wrapper {
		position: absolute;
		top: 5.5rem;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-o-transform: translateX(-50%);
		transform: translateX(-50%);
		width: 33.5rem;
		height: 46.5rem;
		border-radius: .5rem;
		background-color: #fff;
	}

	.model-box-button {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 4rem;
		border-radius: 0 0 0.5rem .5rem;
		background-color: #ad1a1a;
		line-height: 4rem;
		text-align: center;
		color: #fff;
		font-size: 1.6rem;
		font-family: PingFangSC;
	}

	.model-box-close {
		position: absolute;
		top: 0rem;
		right: 1rem;
		font-size: 3rem;
	}

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
		color: #666;
	}
	
	.model-box-content p {
		margin-bottom: 1rem;
	}

	/* 等级经验值 */
	.content-scroll {
		overflow-y: scroll; 
	}

	.radius {
		border: 1px solid #ccc;
		border-radius: 1rem;
		overflow: hidden;
	}

	table {
		width: 100%;
		margin-bottom: -1px;
	}
	
	td {
		height: 3rem;
		line-height: 3rem;
		text-align: center;
		border-color: #ccc;
	}

	table th {
		height: 2.5rem;
		line-height: 2.5rem;
		text-align: center;
		font-size: 1.4rem;
		font-family: PingFangSC;
		font-weight: bold;
		font-style: italic;
		border-color: #ccc;
	}
	
	.buyer-info tr td:first-child {
		width: 7.7rem;
	}
	.buyer-info tr td:nth-child(2) {
		font-style: italic;
	}

	.shops-info tr td:first-child {
		width: 5rem;
	}
	.shops-info tr td:nth-child(2) {
		width: 10rem;
		font-style: italic;
	}
	.shops-info tr td:nth-child(3) {
		padding: .8rem 1rem;
		line-height: 1.5;
		font-family: PingFangSC;
		font-size: 1.2rem;
	}
	

	.empirical-point {
		font-size: PingFangSC;
		font-weight: bold;
		color: #ad1a1a;
	}

	.empirical-point span {
		font-size: 1.1rem;
	}

</style>