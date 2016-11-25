// JavaScript
function Swiper (options) {
	this.box = $(options.el)
	this.lis = $(options.el).find("li")
	this.current = (this.lis.length / 2) + (this.lis.length % 2) - 1
	this.posArr = []
	this.dir = options.dir || 'left'
	this.timer = null
	this.a = $("#prev")
	this.b = $("#next")
	this.init()

}

Swiper.prototype = {
	constructor: Swiper,
	//初始化
	init: function () {
		var _this = this
		this.current = parseInt(this.current)
		for (var i = 0; i < this.lis.length; i++) {
			if (i < this.current) {
				this.posArr.push("left")
			} else if (i === this.current) {
				this.posArr.push("active")
			} else {
				this.posArr.push("right")
			}
		}
		$(this.lis).each(function(index,item) {
			$(item).addClass(_this.posArr[index])
		})
		this.autoPlay()
	},
	//自动轮播
	autoPlay: function () {
		var _this = this
		clearInterval(this.timer)
		this.timer = setInterval(function(){
						console.log(_this.dir)
						// pop() 删除并返回数组的最后一个元素
						// push() 向数组末尾添加一个或多个元素
						// shift() 删除并返回数组的第一个元素
						// unshift() 向数组开头添加一个或者多个元素
						if (_this.dir === "right") { 
							// 取出数组的第一个元素 添加到末尾
							_this.posArr.push(_this.posArr.shift())
						} else {
							// 取出数组最后一个元素 添加到开头
						 	_this.posArr.unshift(_this.posArr.pop())
						}
						console.log(_this.posArr)
						$(_this.lis).attr("class"," ")
						$(_this.lis).each(function (index,item) {
							$(item).addClass(_this.posArr[index])
						})	
					},3000)
	}
	//点击上一张
	//点击下一张
}

var s = new Swiper({
	el: "#box"
})