<template>

<transition name="pages">
	<div class="index-cy">
		<div class="cy-content re">
			<!-- 左侧分类栏目 -->
				<div class="cy-con-ul fixed">
					<!-- 常用分类栏目 -->
					<router-link  
						v-for="num in leftnav" 
						:to="'/classify/content/'+num.id + '?title=' + num.name "
						v-if="num.id != activityId"
					>{{num.name}}</router-link>
					<!-- 常用分类栏目结束 -->

					<!-- 运营活动栏目 -->
					<router-link  
						v-for="num in leftnav" 
						:to="'/classify/content/'+num.id + '?title=' + num.name + '&type=activity&v=' + new Date().getTime().toString().slice(0,-4)"
						v-if="num.id == activityId"
					>{{num.name}}</router-link>
					<!-- 运营活动栏目结束 -->
				</div>
			<!-- 左侧分类栏目结束 -->

			<!-- 拍品分类列表 -->
			<router-view></router-view>
			<!-- 拍品分类列表结束 -->
		</div>
	</div>
</transition>
</template>
<script>


    module.exports = {
		data:function(){
			return {
				leftnav: [],
				activityId: config.activity_id,      // 推荐店铺分类id
			}
		},
		created: function() {
			this.classifindex(0)
		},
		
		mounted: function(){
		},
		components: {
			'my-footer': footer
		},
		methods: {
			// 调取右边分类商品
			classifindex:function(num){
				var that = this;
				ajax.classifYnav(num,function(data){
					if(data.status){
						that.leftnav = data.data;

						// 缓存中取出 id & title
						var classifyNavId = window.localStorage.getItem('classify_nav_id');
						var classifyNavTitle = window.localStorage.getItem('classify_nav_title');

						if (classifyNavId) {
							// 此id 为运营活动分类id 
							if (that.activityId == classifyNavId) {
								that.$router.replace("/classify/content/"+ classifyNavId + '?title=' + classifyNavTitle + '&type=activity&v=' + new Date().getTime().toString().slice(0,-4) );//取缓存中的记录
							} else {
								that.$router.replace("/classify/content/"+ classifyNavId + '?title=' + classifyNavTitle);//取缓存中的记录	
							}
							
						} else {
							that.$router.replace("/classify/content/"+data.data[0].id + '?title=' + data.data[0].name);//默认的第一个请求
						}
						
					}else{
						console.log("出错了 in indexLeft");
					}
					
            	});
			},

		}

	}

</script>
<style>
.cy-content{
	position: absolute;
	top: 0;
	padding-left: 9.5rem;
}
#wrapper-content {
	position: relative;
	top: 0;
	left: 0;
	z-index: 1;
	height: 100%;
}
.cy-con-ul{
	left: 0;
	top: 0;
	width: 9.5rem;
	background: #f6f6f6;
}
.cy-con-ul a{
	width: 9.5rem;
	height: 4.5rem;
	line-height: 4.5rem;
	text-align: center;
	font-size: 1.4rem;
	color: #333;
	border-left:2px solid #c5c5c5;
	border-bottom: 1px solid #c5c5c5;
	display: block;
}
.cy-con-ul a.router-link-active{
	background-color: #fff;
	color: #ad1a1a;
	border-left-color: #ad1a1a;
}
.cy-list-con {
	/*overflow-y: scroll;*/
	/*-webkit-overflow-scrolling: touch;*/
	height: 100.25%;
	border-left:1px solid #c5c5c5;
	padding: 1.5rem 0 0 1.5rem;
	padding-bottom: 5rem;
}
.cy-list-con .list-con{
	margin-right: 1.4rem;
	width: 7.4rem;
	background-color: #fff;
	margin-bottom: 1.4rem;
}
.cy-list-con .list-con .list-con-img{
	height: 8rem;
}
.cy-list-con .list-con .list-con-img img {
	width: 100%;
	height: 100%;
}
.cy-list-con .list-con .list-con-name{
	font-size: 1.4rem;
	color: #333;
	height: 4rem;
	line-height: 4rem;
	text-align: center;
}
</style>
