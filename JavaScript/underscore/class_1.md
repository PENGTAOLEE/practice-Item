# Underscore 

## Array.isArray
用于确定传递的值是否是一个 Array。如果对象是 Array，则为true; 否则为false

注意：Array.prototype 也是一个数组

#### 对比 instanceof 
instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

在浏览器中，我们的脚本可能需要在多个窗口之间进行交互。多个窗口意味着多个全局环境，不同的全局环境拥有不同的全局对象，从而拥有不同的内置类型构造函数。

表达式[] instanceof window.frames[0].Array 会返回false，
因为 Array.prototype !== window.frames[0].Array.prototype，因此你必须使用 Array.isArray(arr).

#### Polyfill

```javascript
if(!Array.isArray) {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	}
}
```

## Object.keys
Object.keys()方法会返回一个由一个给定对象的自身可枚举属性组成的数组。数组中属性名的排列顺序和使用`for...in`循环遍历该对象时返回的顺序一致【两者的主要区别是一个for...in循环还会枚举其原型链上的属性】

在ES5里，如果此方法的参数不是对象（而是一个原始值），那么它会抛出 TypeError。在ES2015中，非对象的参数将被强制转换为一个对象。

## Object.create
Object.create() 方法会使用指定的原型对象及其属性去创建一个新的对象。

语法
> Object.create(proto,[propertiesObject ])

## call
call() 方法调用一个函数, 其具有一个指定的this值和分别地提供的参数(参数的列表)。

> fun.call(thisArg[, arg1[, arg2[, ...]]])

* thisArg  在fun函数运行时指定的this值
* arg1, arg2, ...  指定的参数列表






