var jquery = function(selector,context){
	this.username = "lipengtao";
	return new jquery.prototype.init()
}


jquery.prototype = {
	init: function(){
		this.username = "peter";
		// this 指向jquery类
		return this;
	},

	name: function(){
		console.log(this.username)
	},

	age: function(){
		// coding
	}
}
// 此时new的init 跟jquery类的this分离了
// 如果不添加这条 jquery() 的返回值指向init的构造函数
// 该条代码的作用是 把jquery的原型对象覆盖init构造器的原型对象
jquery.prototype.init.prototype = jquery.prototype;

// jquery执行的返回值 为 new出来的init
// init 的返回值 为jquery类
console.log( jquery() )

// 直接new 出init 不会找到jquery原型上的name()
jquery().name()
