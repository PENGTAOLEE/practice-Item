<template>
<main class="index-hot" id="indexhot" data-indexhot="true">
	<ul class="stop-list clearfix">
		<li class="stop-item" v-for="item in [1,2,3,4,5,6,7]">
			<div class="stop-head clearfix">
				<div class="stop-avatar">
					<img src="../assets/img/fans1.png" alt="">
				</div>
				<div class="stop-name">花猫酱</div>
				<!-- 是否关注 控制style样式 || 控制img引用路径  -->
				<div class="follow-icon fr">
					<img 
						src="../assets/img/notfollow.png"
						v-if="!followed" 
						@click="attentionShop"
						alt=""
					/>
					<img 
						src="../assets/img/followed.png"
						v-if="followed" 
						alt=""
					/>
				</div>
			</div>
			<!-- 商品图片 -->
			<div class="stop-goods">
				<img class="stop-goods-img" src="../assets/img/list.jpg" alt="">
				<div class="stop-goods-desc">和田玉玉名称</div>
				<div class="stop-goods-price">
					当前<span>￥2048</span>
				</div>
			</div>			
		</li>
	</ul>
</main>
</template>
<script>

	
	var ajax = require('ajax');
	

    module.exports = {
		data: function() {
			return {
				// 数据
				hotList: [],
				page: 1,
				// 每条信息设置一条是否关注信息  根据这条判断是否关注
				followed: false,

			}
		},
		created: function() {
		},
		mounted : function(){
            this.listData();
            this.hotlist();
        },
		
		methods: {
			// 加载
			hotlist: function(){//下拉加载
                var that=this;
                $(window).unbind();
                $(window).scroll(function(){
                    if($("#indexhot").attr("data-indexhot")){
                        var hcon=$(document).height()-$(window).height()-200;
                        var hdiv=$(".swiper-container").height();
                        var scroll=$(this).scrollTop();
                        if(scroll>hcon&&that.keynum){
                            that.listData();
                        }
                        scroll>1?$(".backtop").show():$(".backtop").hide();
                        scroll>hdiv? $(".index-nav-in").addClass("index-nav-fixed"): $(".index-nav-in").removeClass("index-nav-fixed");
                    }
                });
            },

			// 数据接口
			listData:function(){//ajax请求数据
                var _this = this;
                // this.divname = [];
                // this.keynum = false;
                ajax.hotList(this.page,function(data){
                    console.log( JSON.parse( JSON.stringify(data) ) );
                    // if(data.status==200){
                    //     for(var i=0; i<data.data.length; i++){
                    //         that.hotList.push(data.data[i]);
                    //         that.divname.push(data.data[i].user_id);
                    //     }
                    //     //console.log(that.hotList,that.divname);
                    //     that.$nextTick(function(){//dom更新完执行函数
                    //         that.slide();//调用轮播图
                    //         that.heart();//调用点赞
                    //     });
                    //     that.page++;
                    //     that.keynum=true;
                    // }else{
                    //     $(".loading img").hide();
                    //     $(".loading p").show();
                    // }
                   
                });
            },

			// 关注店铺
			attentionShop: function() {
				// 并且告诉后台用户关注了店铺
				this.followed = true;
			}
		}
	}

</script>
<style>
.index-hot {
	padding: 0 .52rem;
}
.stop-list {
	margin-right: -0.5rem;
}
/* 单个店铺 */
.stop-item {
	float: left;
	width: 11.8rem;
	height: 21.8rem;
	margin-right: .52rem;
	margin-bottom: .9rem;
	border-bottom: 1px solid #dcdcdc;
	background-color: #fff;
}

/* 店铺 */
.stop-head {
	height: 3.8rem;
	padding: 0 .4rem 0 .5rem;
	line-height: 3.8rem;
}

.stop-avatar,
.stop-name,
.follow-icon {
	/*float: left;*/
	display: inline-block;
	vertical-align: middle;
}

.stop-avatar {
	overflow: hidden;
	width: 2.2rem;
	height: 2.2rem;
	margin-right: .4rem;
	border-radius: 50%;
}
.stop-avatar img {
	width: 100%;
	height: 100%;
}

.stop-name {
	font-size: 1.2rem;
	color: #000;
}

.follow-icon {

}

/* 商品详情 */
.stop-goods {
}

.stop-goods-img {
	width: 100%;
	height: 11.8rem;
	margin-bottom: .5rem;
}

.stop-goods-desc,
.stop-goods-price {
	height: 2.2rem;
	text-indent: .6rem;
	line-height: 2.2rem;
	font-size: 1.4rem;
}

.stop-goods-desc {
	color: #333;
}

.stop-goods-price {
	color: #ad1a1a;
}
</style>
