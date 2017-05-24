<template>
<div class="cyformat clearfix format-current">
	<div class="abreas-list fl" v-for="num in formatlist">
		<!-- 提供父容器 避免出现样式错乱 -->
		<div class="img-box">
			<router-link 
				v-if="num.thumb.type == 'img'"
				:to="'/lotdetails/'+num.id" 
				class="list-img divbg" 
				:style="{backgroundImage:'url('+ baseUrl + num.thumb.url+')'}"
			>
			</router-link>
			<!-- 视频 -->
			<router-link
				v-if="num.thumb.type == 'video'"
				:to="'/lotdetails/'+num.id" 
				class="list-img video-box" 	
			>	
				<span class="video-play-rectangle">
					<i class="shotsprites video-play-rectangle-icon"></i>
				</span>
				<video :src="baseUrlVideo + num.thumb.url" poster="/res/img/video_ns_2.jpg"  style="object-fit: fill;"></video>
			</router-link>
		</div>
		<p class="img-explain">{{num.desc}}</p>
		<div class="clearfix img-bottom" :class="'goodsid'+num.id">
			<span class="color fl">￥{{num.current_price}}</span>
			<!-- 店铺首页列表 -->
			<span v-if="num.like_num !== undefined"
				class="fr imglike" 
				:data-goodsid="num.id" 
				:class="{ 'imglikecur': num.is_like}"
				@click="doLike"
			>{{num.like_num}}</span>
			<!-- 分类数据列表 -->
			<span v-if="num.likes !== undefined"
				class="fr imglike" 
				:data-goodsid="num.id" 
				:class="{ 'imglikecur': num.is_like}"
				@click="doLike"
			>{{num.likes}}</span>
			<span class="fr imgbrowse">{{num.views}}</span>
		</div>
	</div>
</div>

</template>
<script>


    module.exports = {
		data: function() {
			return {
				baseUrl: config.img_url,
				baseUrlVideo: "http://xfpvideoupload.oss-cn-beijing.aliyuncs.com/", // 视频未转码
			}
		},
		props:["formatlist"],
		
		created: function() {
			
		},
		mounted: function() {
			
		},
		methods: {	
			doLike: function(ev) {
				var goodsid = $(ev.target).attr('data-goodsid');
				this.$emit('childEvent',ev,goodsid)
			}
		}
	}

</script>
<style>

.abreas-list{
	width: 17.25rem;
	background-color: #fff;
	margin-right: 1rem;	
	margin-bottom: 1rem;
}
.abreas-list .img-box {
	width: 100%;
	height: 17.25rem;
}
.abreas-list .list-img{
	display: block;
	height: 17.25rem;
}
.abreas-list .img-explain{
	padding:0.3rem 0.5rem 0;
	color: #333;
	font-size: 1.4rem;
	height: 1.8rem;
	line-height:1.8rem;
	/* 超出隐藏 */
	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.abreas-list .img-bottom{
	font-size: 1.2rem;
    color: #666;
    line-height: 3.5rem;
    padding-left: 0.5rem;
}
.abreas-list .img-bottom .imgbrowse{
	height: 3.5rem;
	line-height: 3.5rem;
}
.abreas-list .img-bottom .imglike{
	height: 3.5rem;
	line-height: 3.4rem;
}
.abreas-list .img-bottom .color{
	font-size: 1.4rem;
}
.abreas-list .imglike{
    padding-right: 0.5rem;
}
</style>
