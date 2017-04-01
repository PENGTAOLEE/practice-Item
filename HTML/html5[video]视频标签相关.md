# html5 [video]
> 项目中用到video标签 总结

> 让video自适应父容器 css样式
```html
<video :src="baseUrl + key.thumb.url" style="object-fit: fill;"></video>
```
在标签上使用了object-fit: fill; 让video充满容器 
更多 [object-fit]: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit   "object-fit"

> 判断video资源网络状态
```javascript
...
//200毫秒延迟后，判断视频连接网络状态是否可用
setTimeout(function(){
	var video = $("#my-video");
	//如果不能播放，则替换视频连接为未转码视频连接
	if(video[0].networkState == 3){
		_this.videoSrc = _this.baseUrl2 + _this.videoBaseSrc;
		//连接被替换后，在下次dom更新时播放视频
		_this.$nextTick(function(){
			video[0].play();
		});
	} else {
		//如果连接可用，则直接播放视频
		video[0].play();
	}
}, 200);
```
使用 video 的 networkState 判断网络状态 
更多 [networkState]: http://www.w3school.com.cn/tags/av_prop_networkstate.asp   "networkState"