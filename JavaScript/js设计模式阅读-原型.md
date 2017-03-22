# JavaScript设计模式  原型理解

> Object.prototype 是js对象的根原型

> 获得obj的对象原型 
```javascript
Object.getPrototypeOf( obj )
```

> js要得到一个对象不是通过实例化，而是通过找到一个对象作为原型并克隆它

但用 new 调用构造器时，还要注意一个问题，如果构造器显式地返回了一个 object 类型的对 
象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的 this: 
```javascript
var myClass =  function（） {
	this.name = ‘seven’;
	return {
		name: ‘lpt’
	}
}
var obj = new MyClass()
alert( obj.name ) // lpt
```
如果构造器不显式地返回任何数据，或者是返回一个非对象类型的数据，就不会造成上述问题.

// 实现bind 方法
```javascript
Function.prototype.bind = function( context ) { 
	var self = this; // 保存原函数 
	return function(){ // 返回一个新的函数 
		return self.apply( context, arguments ); 
		// 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this 
	} 
}; 
```

> 借用方式的实践1
B函数会继承A函数上的属性和方法
```javascript
var A = function( name ){ 
	this.name = name; 
}; 
var B = function(){  
	// A函数的this指向当前函数作用域的this. 也就是让B拥有A的属性和方法	
	A.apply( this, arguments );
}
```
 
> 借用方式的实践2

(function(){ 
	Array.prototype.push.call( arguments, 3 ); 
	console.log ( arguments ); // 输出[1,2,3] 
})( 1, 2 ); 

借用 Array.prototype.push 方法的对象还要满足以下两个条件 
* 对象本身要可以存取属性 
* 对象的 length 属性可读写 
[ Number/ Function 不满足条件 ] 

## Object.create(obj)
> 继承obj对象上的属性和方法
```javascript
//内部实现
if (!Object.create) {
    Object.create = function (o) {
	    function F() {}  //定义了一个隐式的构造函数
	    F.prototype = o;
	    return new F();  //其实还是通过new来实现的
    };
 }
```


