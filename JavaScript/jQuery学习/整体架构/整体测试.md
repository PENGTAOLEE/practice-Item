# jQuery 对象的创建方式

> 常规对象的创建与调用
```javascript
var jQuery = function(){
	// 构造函数
	this.username = 'lpt'
}

// 原型方法
jQuery.prototype = {
	getName: function(){
		return this.username;
	},
	getAge: function(){}
}

var $ = new jQuery();

// 调用方法
$.name()
```

> 创建jQuery对象
通过原型传递，把jQuery的原型传递给jQuery.prototype.init.prototype
```javascript
var jQuery = function(){
	// 直接返回this : 调用jQuery之前需要先实例化
	// 直接new出jQuery实例：会造成无限循环
	// 借助jQuery上的init方法 返回当前jQuery构造器的实例
	return new jQuery.prototype.init();
}

jQuery.prototype = {
	init: function(){
		// this 指向 jQuery
		return this;
	},
	getAge: function() {
		return this.age;
	},
	age: 24


}

// 原型传递
// 直接new原型上的init： 返回的就是init的构造函数，不能查询到 jQuery上的init方法
// 把jQuery的原型对象覆盖init构造器的原型对象
jQuery.prototype.init.prototype = jQuery.prototype;

// jQuery() 指向jQuery构造器
jQuery().name(); // 20
```
