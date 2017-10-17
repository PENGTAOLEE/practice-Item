<template>
	<div class="excellent">
		<section class="shop-item" v-for="(item,key) in dataList" :key="key">
			<div class="shop-item-top clearfix">
				<router-link :to="'/shops/'+item.id + '?type=2'" class="shop-item-avator fl">
					<img :src="item.thumb" alt="">
				</router-link>
				<div class="shop-item-desc fl">
					<p class="clearfix">
						<span class="shop-item-name">{{ item.name }}</span>
						<span class="spritesmap user-level shop-item-icon" :class="'s' + item.experience"></span>
						<span class="spritesmap auth-user shop-item-icon" v-if="item.is_apply" :class="{'personal': item.is_apply==1,'shop': item.is_apply==2}"></span>
					</p>
					<p class="shop-item-score">
						<span> <i class="shop-item-locat spritesmap"></i> {{ item.address }}</span>
						<span class="middle-line">|</span>
						<span class="red-text">评分 {{ item.average_mark }}</span>
					</p>
				</div>
				<div class="shop-item-follow fr" @click="follow($event)" data-id="1" :class="{'already-follow':item.guanzhu}">
					{{item.guanzhu?keyfollow:notfollow}}
				</div>
			</div>

			<div class="shop-item-goods-list clearfix">
				<div class="shop-item-goods item-one fl" v-for="(itemGoods,key) in item.list" v-if="list.length == 1">
					<router-link 
						:to="'/lotdetails/' + itemGoods.id" 
						class="divbg list-img link-a"
						:style="{'background-image':'url('+baseUrl + JSON.parse(itemGoods.thumb).url+')'}"
					>
					</router-link>
				</div>

				<div class="shop-item-goods item-two fl" v-for="(itemGoods,key) in item.list" v-if="list.length == 2">
					<router-link 
						:to="'/lotdetails/' + itemGoods.id" 
						class="divbg list-img link-a"
						:style="{'background-image':'url('+baseUrl + JSON.parse(itemGoods.thumb).url+')'}"
					>
					</router-link>
				</div>

				<div class="shop-item-goods item-three fl" v-for="(itemGoods,key) in item.list" v-if="list.length == 3">
					<router-link 
						:to="'/lotdetails/' + itemGoods.id" 
						class="divbg list-img link-a"
						:style="{'background-image':'url('+baseUrl + JSON.parse(itemGoods.thumb).url+')'}"
					>
					</router-link>
				</div>
			</div>
		</section>

<!-- 		<div class="shop-item-goods-list clearfix">
			<div class="shop-item-goods item-two fl" v-for="(itemGoods,key) in list"  v-if="list.length == 2">
				<router-link 
					:to="'/lotdetails/' + itemGoods.id" 
					class="divbg list-img link-a" 
					:style="{'background-image':'url('+require('../../assets/img/shop_top.png')+')'}"
				>
				</router-link>
			</div>
		</div> -->

		<my-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closeShowAlert"></my-alert>

	</div>
</template>

<script>
	import ajax from "ajax";
	import utils from "utils";
	var config = window.config;
	import showAlert from "@/components/component/showAlert"

	export default {
		data () {
			return {
				keyfollow: "已关注",
				notfollow: "+关注",
				list: [
					{
						"id": '1',
						"thumb": 'xfpimg/2017/06/01/14963086878jpZ4br3XD.jpg?x-oss-process=image/resize,w_800'
					},{
						"id": '2',
						"thumb": 'xfpimg/2017/06/01/14963086878jpZ4br3XD.jpg?x-oss-process=image/resize,w_800'
					}
				],
				// 数据
				dataList: [],
				page: 1,
				// alert 弹窗
				showAlertBoll: false,
				tipMsg: "描述内容",
				// 配置信息
				baseUrl: window.config.img_url,
			}
		},
		components: {
			"my-alert": showAlert,
		},
		created () {

			this.dataList = this.getDataList(this.page);
			// 下拉加载
			utils.dropLoading(() => {
				console.log(1111)
				var obj = this.getDataList(this.page);
				if (obj[0]) {
					this.dataList.push( obj );
				};
			});
		},

		mounted () {
			// 微信预览
			// this.$nextTick(() => {
			// 	utils.wxPreviewImage($('.shop-item-goods img'),'.shop-item-goods-list');
			// })
		},
		methods: {
			// 调用关注店铺
			follow (ev) {
				utils.follow(ev)
			},

			// 调取页面数据
			getDataList (page) {
				var obj = {}
				ajax.qualityShop (page,(res) => {
					if (res.status == 200 && res.data.datas) {
						this.page++
						console.log( res.data.datas )
						res.data.datas.forEach(function(item,index) {
							item.list.splice(3,);
						})

						obj = res.data.datas;
					} else if (res.status == 201) {
						console.log("无数据")
					} else {
						console.log(1111)
					}
				})
				return obj;
			},

			closeShowAlert () {
				this.showAlertBoll = false;
			}
		}
	}
</script>

<style scoped>
.excellent {
	margin-bottom: 10rem;
}
.shop-item {
	height: auto;
	margin: 1rem .5rem;
	border-radius: .5rem;
	background-color: #fff;
}


.shop-item-top {
	height: 6.4rem;
}

.shop-item-avator {
	overflow: hidden; 
	display: inline-block;
	vertical-align: middle;
	width: 4.4rem;
	height: 4.4rem;
	margin: 1rem;
	border-radius: 50%;
	text-align: center;
	background-color: #fff;
}

.shop-item-avator img {
	width: 100%;
	height: 100%;
}

.shop-item-desc {
	margin-top: 1.3rem;
}

.shop-item-name {
	display: inline-block;
	vertical-align: middle;
	font-size: 1.4rem;
	color: #333;
}

.shop-item-icon {
	display: inline-block;
	vertical-align: middle;
}

.shop-item-locat {
	display: inline-block;
	vertical-align: middle;
	width: .7rem;
	height: 1rem;
	background-position: -20.7rem -9.5rem;
}

.shop-item-score {
	font-size: 1.1rem;
	color: #999;
}

.shop-item-score .middle-line {
	margin: 0 .3rem;
}

.shop-item-score .red-text {
	color: #ad1a1a;
}

.shop-item-follow {
	width: 5rem;
	height: 2.3rem;
	margin: 2rem 1.2rem;
	text-align: center;
	line-height: 2.3rem;
	border: 1px solid #ff4545;
	border-radius: 50px / 50px;
	font-size: 1.3rem;
	color: #ff4545;
}

.shop-item-follow.already-follow {
	border: 1px solid #999;
	color: #999;
}

.link-a {
	display: inline-block;
	width: 100%;
	height: 100%;
}

.shop-item-goods-list {
	padding: 0 .5rem 1.5rem .5rem;
}

.item-one {
	display: inline-block;
	width: 100%;
	height: 11.2rem;
}

.item-two {
	display: inline-block;
	width: 49%;
	height: 11.2rem;
	margin-right: 2%;
}
.item-two:last-child {
	margin-right: 0%;
}

.item-three {
	display: inline-block;
	width: 33%;
	height: 11.2rem;
	margin-right: .4%;
}
.item-three:last-child {
	margin-right: 0%;
}

/*.item-three.shop-item-goods {
	width: 11.2rem;
	height: 11.2rem;
	margin-right: .9rem;
}
.item-three.shop-item-goods:nth-child(3n) {
	margin-right: 0;
}

.item-three.shop-item-goods img {
	width: 100%;
	height: 100%;
}*/

</style>