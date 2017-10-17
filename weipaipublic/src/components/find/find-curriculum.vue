<template>
<div class="find-curriculum bottom-distance">
	<!-- 遍历列表 -->
	<div class="list-item" v-for="(item,index) in courseData">
		<div 
			class="curriculum-list divbg re" 
			:data-src="item.link"
			:style="{backgroundImage:'url(' + item.thumb + ')'}"
			@click.stop.prevent="goTo(item.link)"
		>	
			<div class="ab listbg">
				<p class="name">{{ item.title }}</p>
				<p class="time"><span>主讲嘉宾：{{ item.speechmaker }}</span>{{ item.start_time }}</p>
			</div>
		</div>
	</div>
	<div class="loading">
		<img src="../../assets/img/loading.gif" v-if="loading">
		<span v-if="!loading">没有更多了</span>
	</div>
</div>
</template>
<script>
	var ajax = require("ajax");
	var utils = require("utils");
	

    module.exports = {
		data: function(){
			return {
				loading: false,
				courseData: [],
				totalPage: '',
				page: 1
			}
		},
		mounted: function(){
			document.title="文玩学问";
			var _this = this;// 路由改变
			//  默认先加载第一页
			this.getCourse(1);

			this.$nextTick(function(){
				$(".footer-bottom a").eq(2).addClass("router-link-active");
			})
			
			// 下拉加载
			utils.dropLoading(function(){
				_this.getCourse(_this.page);
			})
			
		},
		destroyed: function() {
			$(".footer-bottom a").eq(2).removeClass("router-link-active");
		},
		watch: {
			'$route': ["addRouterLink"]
		},
		methods: {
			// 添加样式
			addRouterLink: function() {
				$(".footer-bottom a").eq(2).addClass("router-link-active");
			},

			// 获取课程数据
			getCourse: function(page) {
				var _this = this;
				if (this.totalPage >= this.page || !this.totalPage) {
					this.loading = true;
					ajax.getCourseList(page,function(data) {
						if (data.status == 200) {
							_this.totalPage = data.data.page_num;
							_this.page++
							for (var i = 0; i < data.data.all_course.length; i++) {
								_this.courseData.push(data.data.all_course[i]);
								_this.loading = false;
							};
						} else {
							alert(data.msg);
						}
					})
				};
				
			},

			// 路由跳转
			goTo: function(url) {
				window.location.href = url;
			}
			
			
		}
	}

</script>
<style>
.find-curriculum{
	padding-top: 0.5rem;
}
.curriculum-list{
	height: 20rem;
	display: block;
	margin-bottom: 0.5rem;
	background-image: url(../../assets/img/loading.gif);
	background-repeat: no-repeat;
	background-size: center;
}
.curriculum-list .listbg{
	left: 0;
	bottom: 0;
	width: 100%;
	height: 10rem;
	padding:4.4rem 0 0 1rem;
	background: url(../../assets/img/listbg.png) no-repeat;
	background-size: auto 10rem;
}
.curriculum-list .name{
	font-size: 1.6rem;
	color: #fff;
	margin-left: -0.7rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.curriculum-list .time{
	color: #fff;
	font-size: 1.2rem;
	line-height: 2.5rem;
}
.curriculum-list .time span{
	margin-right: 1rem;
}
.list-item {
	
}
</style>
