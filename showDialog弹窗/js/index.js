// JavaScript
window.alert = (function () {
	var body = document.getElementsByTagName("body")[0]
	function $(id) {
		return document.getElementById(id)
	}	
	//绑定函数
	function bind (target,type,fn) {
		target.addEventListener(type,function(){
			fn && fn()
		},false)
	}
	//如果用户自定义了alert 则使用用户的数据
	function replaceData (defs,opts) {
		for(var i in opts) {
			defs[i] = opts[i]
		}
	}
	// 执行之前 先执行销毁函数 避免出现多个弹窗的情况
	function destory () {
		var box = $("alert")
		if (box) {
			box.parentNode.removeChild(box)
		}
	}
	 //渲染 html
	 //
	 //confirm  &&　cancel  函数
	function render (options,callback) {
		destory ()
		// 如果不设置options 参数
		if (typeof options == "function") {
			callback = options
		}
		var defaults = {//默认配置
			title: "提示框",
			body: "这是输出内容。。但是 应该是需要一个文字内容吧",
			confirmText: "确定",
			yesCallback: function () {
				console.log ("点击确定")
				destory()
			},
			noCallback: function () {
				console.log("点击取消")
				destory()
			}
		}
		replaceData(defaults,options)
		//Template
		var tpl = 	'<div id="alert">'
					+	'<div id="title">'
					+		defaults.title
					+	'</div>'
					+	'<div id="content">'
					+		defaults.body
					+	'</div>'
					+	'<div id="footer">'
					+		'<div id="confirm">' + defaults.confirmText + '</div>'
					+	'</div>'
					+	'<div id="cancel">×</div>'
					+ '</div>'
		document.body.insertAdjacentHTML("beforeEnd",tpl)
		callback && callback() //存在就执行
	}

	return function (options) {
		if (typeof options == 'object') {
			render(options,function () {
				var confirm = $("confirm"),
					cancel = $("cancel");
				bind(confirm,"click",function(){
					options.yesCallback()
					destory()
				})
				bind(cancel,"click",function(){
					options.noCallback()
					destory()
				})
			})
		} else {
			render(function () {
				var confirm = $("confirm"),
					cancel = $("cancel");
				bind(confirm,"click",function(){
					//处理默认确认 && 取消
					destory()
				})
				bind(cancel,"click",function(){
					//处理默认确认 && 取消
					destory()
				})
			})
		}
	}

})()

var btn1 = document.getElementsByTagName("button")[0]
var btn2 = document.getElementsByTagName("button")[1]
btn1.addEventListener("click",function() {
	alert({
		title: "Title",
		body: "lpt fill in love with zdd",
		confirmText: "OK",
		yesCallback: function() {
			// 处理点击确认后的事件
			console.log("good day")
		},
		noCallback: function() {
			// 处理点击取消后的事件
			console.log("good bey")
		}
	})
},false)
btn2.addEventListener("click",function() {
	alert()
},false)


