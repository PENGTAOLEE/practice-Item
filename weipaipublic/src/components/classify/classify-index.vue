<template>

<transition name="pages">
	<div class="index-cy">
		<div class="cy-content re">
			<!-- 左侧分类栏目 -->
			<div class="cy-con-ul fixed">
				<div v-for="(num,key) in collegeArr" class="cy-con-ul-item">
					<!-- 学院分类 -->
					<router-link  
						:to="'/classify/content/'+num.id + '?title=' + num.name + '&type=college'"
						v-if="num.id == collegeId"
						:key="key"
						class="classify-college-box"
					>
					<i class="classify-new spritesmap new-icon" v-if="num.new"></i>
					{{num.name}}</router-link>
					<!-- 学院分类 end -->
				</div>
				<div class="part-line"></div>
				<div v-for="(num,key) in commonArr" class="cy-con-ul-item">
					<!-- 常用分类栏目 -->
					<router-link  
						:to="'/classify/content/'+num.id + '?title=' + num.name "
						v-if="(num.id != activityId)&&(num.id != collegeId)"
						:key="key"
					>
					<i class="classify-new spritesmap new-icon" v-if="num.new"></i>
					{{num.name}}</router-link>
					<!-- 常用分类栏目结束 -->
				</div>
				<div class="part-line"></div>
				<div v-for="(num,key) in specialArr" class="cy-con-ul-item">
					<!-- 常用分类栏目 -->
					<router-link  
						:to="'/classify/content/'+num.id + '?title=' + num.name "
						v-if="(num.id != activityId)&&(num.id != collegeId)"
						:key="key"
					>
					<i class="classify-new spritesmap new-icon" v-if="num.new"></i>
					{{num.name}}</router-link>
					<!-- 常用分类栏目结束 -->
					<!-- 推荐店铺 -->
					<router-link  
						:to="'/classify/content/'+num.id + '?title=' + num.name + '&type=activity'"
						v-if="num.id == activityId"
						:key="key"
					>
					<i class="classify-new spritesmap recommen-icon"></i>
					{{num.name}}</router-link>
					<!-- 推荐店铺 end -->
					<div class="part-line"></div>
				</div>
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
	import ajax from 'assets/js/ajax'
	var config = window.config

    export default {
		data:function(){
			return {
				leftnav: [],
				collegeArr: [], // 学院
				commonArr: [],  // 常用分类
				specialArr: [], // 活动分类 
				activityId: window.config.activity_id,      // 推荐店铺分类id
				collegeId: window.config.college_id,        // 学院分类id
			}
		},
		created: function() {
			this.classifindex(0)
		},
		
		mounted: function(){
		},
		methods: {
			// 调取右边分类商品
			classifindex:function(num){
				var that = this;
				var routeId = this.$route.params.id;
				ajax.classifYnav(num,function(data){
					if(data.status){
						that.leftnav = data.data;
						const dataArr = data.data;
						for (var i = 0; i < dataArr.length; i++) {
							switch (dataArr[i].id) {
								case 126:
									that.collegeArr.push(dataArr[i]);
									break;
								case 81:
									that.specialArr.push(dataArr[i]);
									break;
								case 206:
									that.specialArr.push(dataArr[i]);
									break;
								case 209:
									that.specialArr.push(dataArr[i]);
									break;
								default:
									that.commonArr.push(dataArr[i])
							}
						};

						// 缓存中取出 id & title
						var classifyNavId = window.localStorage.getItem('classify_nav_id');
						var classifyNavTitle = window.localStorage.getItem('classify_nav_title');
						// 历史记录 || 学院id || 活动id
						if (classifyNavId || (that.collegeId == routeId) || (routeId == 81) || (routeId == 229)) {
							if (that.collegeId == routeId) {
								classifyNavId = that.collegeId;
								classifyNavTitle = '学院专区';	
							};
							if (routeId == 81) {
								classifyNavId = 81;
								classifyNavTitle = '推荐拍品';
							};

							if (routeId == 229) {
								classifyNavId = 229;
								classifyNavTitle = '紫砂壶专场';
							};

							// 此id 为运营活动分类id 
							if (that.activityId == classifyNavId) {
								that.$router.replace("/classify/content/"+ classifyNavId + '?title=' + classifyNavTitle + '&type=activity' );//取缓存中的记录
							} else if (that.collegeId == classifyNavId) {
								that.$router.replace("/classify/content/"+ classifyNavId + '?title=' + classifyNavTitle + '&type=college');
							}
							else {
								that.$router.replace("/classify/content/"+ classifyNavId + '?title=' + classifyNavTitle);//取缓存中的记录	
							}
							
						} else {
							that.$router.replace("/classify/content/"+data.data[0].id + '?title=' + data.data[0].name  + '&type=college');//默认的第一个请求
						}
						
					} else {
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
.cy-con-ul-item {
	position: relative;
}
.part-line {
	width: 100%;
	height: .5rem;
	background-color: #f6f6f6;
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
	background: #fff;
}
.cy-con-ul a{
	width: 9.5rem;
	height: 4.5rem;
	line-height: 4.5rem;
	text-align: center;
	font-size: 1.4rem;
	color: #333;
	/*border-left: .2rem solid #fff;*/
	border-bottom: 1px solid #c5c5c5;
	display: block;
}
.cy-con-ul a.router-link-active{
	background-color: #fff;
	color: #ad1a1a;
	border-left: .2rem solid #ad1a1a;
}
.cy-list-con {
	/*overflow-y: scroll;*/
	/*-webkit-overflow-scrolling: touch;*/
	height: 100.25%;
	border-left: 1px solid #c5c5c5;
	padding: 1.5rem 0 0 1.5rem;
	padding-bottom: 5rem;
}

.cy-con-ul .classify-college-box {
	position: relative;
}
.cy-list-con .list-con{
	overflow: hidden;
	margin-right: 1.5rem;
	/*width: 8.4rem;*/
	width: 7.3rem;
	background-color: #fff;
	margin-bottom: 1.5rem;
}
.cy-list-con .list-con .list-con-img{
	height: 6.7rem;
	margin: .5rem .4rem 0 .4rem;
}
.cy-list-con .list-con .list-con-img img {
	width: 100%;
	height: 100%;
}
.cy-list-con .list-con .list-con-name{
	white-space:nowrap;
	font-size: 1.4rem;
	color: #333;
	/*height: 4.5rem;*/
	line-height: 3.5rem;
	text-align: center;
}
.classify-new {
	position: absolute;
	top: .3rem;
	right: .1rem;
}
</style>
