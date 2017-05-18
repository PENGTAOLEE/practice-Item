// JavaScript 类的常规使用方法
var jQuery = function(selector,context) {
	// 构造函数
	this.username = "lipengtao";
	this.age = "24"
}

jQuery.prototype = {
	//原型方法
	name: function(){
		console.log(this.username)
	},
	age: function(){
		console.log(this.age)
	}

}

var $ = new jQuery();



$.name()
