<template>
	<div class="recom-follow">
		<header class="recom-follow-title">推荐你可能感兴趣的学生</header>
		<div class="recom-follow-wrap">
			<ul class="clearfix">
				<li v-for="(item,index) in dataList" @click.stop="toggleSelect(item.id,index)" class="recom-follow-item fl" :key>
					<img :src="item.thumb" alt="" class="avator">
					<span class="student-name">{{item.name}}</span>
					<span class="univer-name" v-if='item.type_name=="更多院校"'>{{item.author_type}}</span>
					<span class="univer-name" v-if='item.type_name!="更多院校"'>{{item.type_name}}</span>
					<i class="shotsprites select-icon" :class="{'unselect': !is_select_sum[index]}"></i>
				</li>
			</ul>
		</div>
		<footer class="recom-follow-footer">
			<button class="recom-follow-btn" @click="addFollow">进入小福拍</button>
			<p class="recom-follow-update" @click="replaceBatch">换一批</p>
		</footer>
		<modal-tip :msg='tipMsg' @closeBox='closeBox' v-show='is_tip_show'></modal-tip>
		<div class="space">	
		</div>
	</div>
</template>

<script>
	import ajax from 'assets/js/ajax';
	import modalTip from '@/components/component/modal-tip'
    var config = window.config;
    export default{
		data: function() {
			return {
				dataList: '',
				page: 1,
				page_num: '',
				select_list: [],
				is_select_sum: '',
				is_tip_show: false,
				tipMsg: ''
			}
		},
		
		components: {
        	'modal-tip': modalTip
	  	},     
       	created() {
			this.getRecomFollow();
       	},
		mounted: function() {
			document.title = "推荐关注学生";
			
	      $('#footer-common').hide()
				
				// this.$nextTick(function() {
				// 	$('#app,html,body').css({
				// 		'height':'100%'
				// 	})
				// })
			},
		watch: {
		},
		beforeDestroy: function() {
      $('#footer-common').show()
		},
		methods: {
			getRecomFollow: function(){
				let that = this;
				let page = this.page;
				ajax.getRecomFollow(page,function(res){
						if(res.status==200){
							that.dataList = res.data.orderInfo;
							that.page_num = res.data.page_num;
							
						}
				});
				that.fillArray(that.dataList);
				that.is_select_sum = that.creatArray();
				// console.log(that.select_list);
			},
			fillArray: function(list){
				this.select_list = [];
				for(let item of list){
					this.select_list.push(item.id);
				}
			},
			creatArray: function(){
                let array = new Array(this.dataList.length);
                array.fill({'isBo':true});
                return array
            },
			
			toggleSelect: function(user_id,index){
                let is_select = this.select_list.indexOf(user_id)
                if(is_select >= 0){
                    this.select_list.splice(is_select,1);
                    // this.is_select_sum[index] = false;
                    this.$set(this.is_select_sum,index,false);

                }else{
                    this.select_list.push(user_id);
                    // this.is_select_sum[index]= true;
                    this.$set(this.is_select_sum,index,true);
                }
            },

			addFollow() {
				// 处理交互逻辑
				console.log(1111);
				let that = this;
				let ids = this.select_list.join(',');
				ajax.addFollow(ids,function(res){
					if(res.status==200){
						that.$router.push('/college');
					}
				});
			},

			// 换一批
			replaceBatch() {
				console.log(111);
				if(this.page_num==1){
					this.tipMsg = '没有更多的学生推荐'
					this.is_tip_show = true;
				}else if(this.page<this.page_num){
					this.page++;
					this.getRecomFollow();
				}else{
					this.page = 1;
					this.getRecomFollow();
				}

			},
			closeBox: function(){
				this.is_tip_show = false;
			}

		}
	}	
</script>

<style scoped>
    .html,.body{
    	height: 100%;
    }
	.recom-follow {
		position: absolute;
		width: 100%;
		height: 100%;
		font-family: PingFangSC;
		background-color: #fff;
		z-index: 11;
	}

	.recom-follow-title {
		width: 100%;
		height: 5.7rem;
		background-color: #fff;
		line-height: 5.7rem;
		text-align: center;
		font-size: 1.9rem;
		font-weight: 600;
		color: #010101;
	}

	.recom-follow-wrap {
		padding: 0 2.5rem;
		width: 100%;
		min-height: 11.2rem;
		max-height: 44.8rem;
		height: auto;
		margin-bottom: 9rem;
		overflow-y: scroll;
	}

	.recom-follow-item {
		position: relative;
		width: 33.3%;
	}

	.avator {
		width: 4.7rem;
		height: 4.7rem;
		margin: .9rem auto;
		border-radius: 50%;
	}
  
	.student-name,
	.univer-name {
		display: block;
		text-align: center;
		width: 100%;
		 white-space:nowrap;
    	overflow:hidden;
    	text-overflow:ellipsis;
	}

	.student-name {
		font-size: 1.4rem;
		color: #333;
	}

	.univer-name {
		line-height: 3rem;
		height: 3rem;
		font-size: 1.1rem;
		color: #999;
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
	
	.recom-follow-footer {
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 9rem;
	}

	.recom-follow-btn {
		display: block;
		width: 34.5rem;
		height: 4rem;
		margin: 0 auto;
		margin-top: 1rem;
		background: #49be39;
		border-radius: .4rem;
		font-size: 1.4rem;
		color: #fff;
	}

	.recom-follow-update {
		line-height: 4rem;
		text-align: center;
		font-family: PingFangSC;
		font-size: 1.2rem;
		color: #6699ff;
	}
</style>