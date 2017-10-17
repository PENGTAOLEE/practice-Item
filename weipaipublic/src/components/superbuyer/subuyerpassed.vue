<template>
	<div class="superbuyer-info">
		<div class="chunk-item">
			<h4 class="chunk-item-title">认证信息</h4>
			<p class="chunk-item-li clearfix">
				<span class="name fl">超级买家</span>
				<span class="value fl">已通过 超级买家</span>
			</p>
		</div>
		<div class="chunk-item">
			<h4 class="chunk-item-title">个人信息</h4>
			<p class="chunk-item-li clearfix">
				<span class="name fl">姓名</span>
				<span class="value fl">{{ formData.name }}</span>
			</p>
			<p class="chunk-item-li clearfix">
				<span class="name fl">工作单位</span>
				<span class="value fl">{{ formData.company }}</span>
			</p>
			<p class="chunk-item-li clearfix">
				<span class="name fl">职位</span>
				<span class="value fl">{{ formData.job }}</span>
			</p>
			<p class="chunk-item-li clearfix">
				<span class="name fl">手机号</span>
				<span class="value fl">{{ formData.phone }}</span>
			</p>
			<p class="chunk-item-li clearfix">
				<span class="name fl">兴趣</span>
				<ul class="interest-list clearfix fl">
					<li class="interest-item fl" v-for="(item,index) in formData.interest">{{ item.type_name }}</li>
					<li><router-link to="/interestin?from=subuyerinfo" class="interest-item fl" style="font-size:2rem; line-height:2rem">+</router-link></li>
				</ul>
			</p>
		</div>
		<div class="space">
			
		</div>
	</div>
</template>

<script>
  var showAlert = require("@/components/component/showAlert");
  var ajax = require('ajax');

  export default {
		data () {
			return {
				formData: {
					name: '',
					company: '',
					job: '',
					phone: '',
					interest: [],
					isApply: 0
				},
			}
		},
		
		components: {
      'show-alert': showAlert
      // 'my-footer': footer
	  },     
       
		mounted: function() {
			document.title = "认证";
			
			this.$nextTick(function() {
				$('#app,html,body').css({
					'height':'100%'
				})
			})
		},
		watch: {
		},
		beforeDestroy: function() {
		},
		created() {
			this.getDataInfo((data) => {
    		this.formData = {
					name: data.rel_name,
					company: data.company,
					job: data.position,
					phone: data.mobile,
					interest: data.interests,
					isApply: data.is_apply
				}
    	})
		},
		methods: {
			// 获取数据
      getDataInfo(callback) {
      	ajax.getSuperBuyerInfo((res) => {
      		const data = res.data;
      		if (res.status == 200) {
      			callback && callback(data);
      		};
      	})
      },
		}
	}	
</script>

<style scoped>
	.chunk-item {
		width: 100%;
		margin-bottom: 1rem;
		background-color: #fff;
	}

	.chunk-item-title {
		height: 4.4rem;
		line-height: 4.4rem;
		padding-left: 1.5rem;
		border-bottom: 1px solid #e5e5e5;
		font-size: 1.6rem;
		font-weight: 600;
		color: #333;
	}

	.chunk-item-li {
		/*height: 4.4rem;*/
		line-height: 4.4rem;
		margin-left: 1.5rem;
		border-bottom: 1px solid #e5e5e5;
		font-size: 1.4rem;
		color: #333;
	}

	.chunk-item-li:last-child {
		border-bottom: none;
	}

	.chunk-item-li .name {
		width: 8.5rem;
		min-height: 4.4rem;
	}

	.interest-item {
		padding-bottom: 2000px;
		margin-bottom: -2000px;	
	}
	
	.interest-list {
		width: 27.5rem;
		padding: 1rem 0;
	}

	.interest-item {
		min-width: 4rem;
		height: 2.4rem;
		line-height: 2.4rem;
		margin: 0 1rem 1rem 0;
		padding: 0 .8rem;
		border: 1px solid #ccc;
		border-radius: 100px;
		text-align: center;
	}
	.space{
		width: 100%;
		height: 5.5rem;
	}
</style>