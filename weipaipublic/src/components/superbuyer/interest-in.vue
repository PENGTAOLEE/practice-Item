<template>
	<div class="interset-in">
		<header class="interset-in-title">根据你的喜好我们为您推荐相关信息</header>
		<div class="interset-in-wrap">
			<!-- <ul class="interset-in-ul clearfix">
				<li v-for="(item,index) in interestList" @click.self="chooseThis($event,item.id)" class="interset-in-item fl" :class="{'on':item.is_interest}">{{item.name}}</li>
			</ul> -->
			<ul class="flex-box">
				<li v-for="(item,index) in interestList" @click.self="chooseThis($event,item.id)" class="flex-item" :class="{'on':item.is_interest}">{{item.name}}</li>
			</ul>
			<!-- <div class="space">
				
			</div> -->
		</div>
		<footer class="interset-in-footer">
			<p @click="postInterest" class="interset-in-confirm">确定</p>
		</footer>
	</div>
</template>

<script>
	var ajax = require('ajax');
	var utils = require('utils');
  module.exports = {
		data () {
			return {
				interestList: [],
			}
		},
		
		components: {
      // 'my-footer': footer
	  },     
       
    created() {
    	this.getInterestList((data) => {
    		this.interestList = data;
    	})
    },

		mounted: function() {
			document.title = "兴趣选择";
      		$('#footer-common').hide()
			
			this.$nextTick(function() {
				$('#app,html,body').css({
					'height':'100%'
				})
			})
		},
		watch: {
		},
		beforeDestroy: function() {
      $('#footer-common').show()	
		},
		methods: {
			// 选中兴趣
			chooseThis(ev,id) {
				if ($(ev.target).hasClass('on')) {
					this.delInterest(id,() => {
						$(ev.target).toggleClass('on')
					})
				} else {
					this.addInterest(id,() => {
						$(ev.target).toggleClass('on')
					})	
				}
			},

			// 确定兴趣
			postInterest() {
				var from = utils.getRequest().from;
				if (from == 'subuyerinfo') {
					this.$router.push('/subuyerinfo')
				} else {
					this.$router.push('/applyfillin')
				}
			},

			// 获取数据
			getInterestList(callback) {
				ajax.getInterestList((res) => {
					const data = res.data;
					if (res.status == 200) {
						callback && callback(data)
					};
				})
			},

			// 添加兴趣
			addInterest(typeId,callback) {
				ajax.postInterest(typeId,(res) => {
					if (res.status == 200) {
						callback && callback()
					};
				})
			},

			// 删除兴趣
			delInterest(typeId,callback) {
				ajax.delInterest(typeId,(res) => {
					if (res.status == 200) {
						callback && callback()
					};
				})
			}
		}
	}	
</script>

<style scoped>
	.interset-in {
		width: 100%;
		height: 100%!important;
		font-family: PingFangSC;
		background-color: #fff;
		border-bottom: 1px solid transparent;
		position: relative;
		margin-bottom: 0;
		overflow-y: scroll;
	}

	.interset-in-title {
		width: 100%;
		height: 8.2rem;
		background-color: #fff;
		line-height: 8.2rem;
		text-align: center;
		font-size: 1.4rem;
		color: #999;
	}

	.interset-in-wrap {
		padding-left: 4.5rem;
		padding-right: 4.5rem;
		margin-bottom: 7rem;
		/*padding-bottom: 5.3rem;*/
		border-bottom: 1px solid transparent;
	}
	/*
	.interset-in-ul {
		margin-right: -1.5rem;
		
	}

	.interset-in-item {
		position: relative;
		padding: 0 1.5rem;
		margin-right: 1.5rem;
		margin-bottom: 2.5rem;
		border: 1px solid #cecece;
		border-radius: 30px / 1.5rem;
		line-height: 3rem;
		font-size: 1.4rem;
		color: #333;
	}

	.interset-in-item.on {
		background-color: #53c640;
		color: #fff;
	}
	}*/
	/*.flex-box{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.flex-item{
		padding: 0 1.5rem;
		margin-bottom: 2.5rem;
		border: 1px solid #cecece;
		border-radius: 30px / 1.5rem;
		line-height: 3rem;
		font-size: 1.4rem;
		color: #333;

	}*/
	.flex-box{
		display: table;
		text-align: center;
		/*height: 100%;*/
		/*height: 47.5rem;*/
		/*padding-bottom: 5.3rem;*/
		/*height: 100%;*/
		overflow-y: scroll;
		/*margin-bottom: 5.3rem;*/
	}
	.flex-item{
		display: inline-block;
		padding: 0 1.5rem;
		margin-right: 1.5rem;
		margin-bottom: 2.5rem;
		border: 1px solid #cecece;
		border-radius: 30px / 1.5rem;
		line-height: 3rem;
		font-size: 1.4rem;
		color: #333;

	}
	.flex-item.on {
		background-color: #53c640;
		color: #fff;
	}
	.select-icon {
		position: absolute;
		top: -0.3rem;
		right: 0.9rem;
		width: 1.8rem;
		height: 1.8rem;
		background-position: -23rem -25.25rem;
	}

	.unselect {
		background-position: -25.45rem -25.25rem;	
	}
	
	.interset-in-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #fff;
	}

	.interset-in-confirm {
		margin-top: 1rem;
		border-top: 1px solid #e5e5e5;
		line-height: 7rem;
		text-align: center;
		/*font-family: PingFangSC;*/
		font-size: 1.7rem;
		font-weight: 600;
		color: #53c640;
	}
	/*.space{
		width: 100%;
		height: 5.3rem;
	}*/
</style>