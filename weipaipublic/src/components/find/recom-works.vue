<template>
	<div class="recom-works">
		
		<router-link class="auction-item-wrap" v-for="item in data" :key='item.id' :to='"/lotdetails/"+item.id' tag='div'>
			<div class="push-date">{{item.inputtime}}</div>
			<div class="auction-item clearfix">
				<div class="auction-image fl">
					<img :src="baseUrl+JSON.parse(item.thumbs).url" alt="">					
				</div>
				<div class="auction-details fl">
					<p class="auction-details-desc text-limit">{{item.desc}}</p>
					<span class="auction-details-price">￥{{item.current_price}}</span>
					<div class="footer clearfix">
						<img :src="item.thumb" alt="" class="dibvam avator">
						<span class="dibvam text-overflow" style="max-width:9rem;">{{item.name}}</span>
					</div>
				</div>
			</div>
		</router-link>

	</div>
</template>

<script>
	import ajax from 'assets/js/ajax';
    import utils from 'assets/js/utils';
    let config = window.config;
  export default {
		data () {
			return {
				data: [],
                page: 1,
                page_num: '',
                baseUrl: config.img_url
			}
		},
		
		components: {
	  },     
        created:  function(){
        	this.getAllList();
        },
		mounted: function() {
			document.title = "学生作品推荐";
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
			getOrderList: function(){
                var that = this;
                var page = that.page;
                ajax.getRecommendMessageList(page,function(data){
                    if(data.status ==200){
                        that.data = that.data.concat(data.data.data);
                        that.page_num = data.data.last_page;
                    }else{
                        console.log(data.msg);
                    }
                })
            },
            getAllList: function(){
                this.page = 1;
                this.page_num= '';
                this.data = [];
                this.getOrderList();
                var that = this;
                utils.dropLoading(function(){
                    if(that.page<that.page_num){
                        that.page++;
                        that.getOrderList();
                    }else{
                        // console.log("已经到底了，没有更多数据了");
                    }
                });
            }
		}
	}	
</script>

<style scoped>
	.recom-works {
		width: 100%;
		height: 100%;
		font-family: PingFangSC;
	}

	.auction-item-wrap {
		position: relative;
		margin-bottom: .25rem;
		padding-top: 4.5rem;
	}

	.auction-item {
		width: 34.5rem;
		height: 11rem;
		margin: 0 auto;
		padding: 1rem 0 0 1rem;
		background-color: #fff;
		border-radius: .5rem;
		border-bottom: .1rem solid #cbcbcb;
	}

	.auction-image {
		overflow: hidden;
		width: 9rem;
		height: 9rem;
		border-radius: .5rem;
	}

	.auction-image img {
		width: 100%;
		height: 100%;
	}

	.auction-details {
		width: 23.5rem;
		margin-left: .5rem;
	}

	.auction-details-desc {
		padding-left: .5rem;
		padding-right: .5rem;
		line-height: 1.7rem;
		min-height: 3rem;
		font-weight: 600;
		font-size: 1.4rem;
		color: #333;
	}

	.auction-details-price {
		display: block;
		padding-left: .5rem;
		margin-top: 1rem;
		font-size: 1.6rem;
		font-weight: 600;
		color: #ad1a1a;
	}
	
	.footer {
		padding-left: .5rem;
		padding-right: 1rem;
		font-size: 1.3rem;
	}

	.avator {
		width: 1.7rem;
		height: 1.7rem;
		border-radius: 50%;
	}

	.text-limit {
		overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
	}

	.push-date {
		position: absolute;
		left: 50%;
		top: 1.5rem;
		transform: translateX(-50%);
		display: inline-block;
		margin: 0 auto;
		height: 2rem;
		background-color: #a6a6a6;
		padding: 0 .6rem;
		border-radius: 1rem;
		line-height: 2rem;
		font-size: 1.2rem;
		color: #fff;
	}
</style>