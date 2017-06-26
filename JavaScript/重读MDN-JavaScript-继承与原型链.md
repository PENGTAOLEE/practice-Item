### 继承与原型链
JavaScript本身没有提供一个类实现。(在ES2015/ES6中引入了class关键字，但只是语法糖，JavaScript 仍然是基于原型的)。

当谈到继承时，Javascript 只有一种结构：对象。每个对象都有一个私有属性(称为是[[Prototype]]), 它持有一个连接到另一个称为其 prototype 对象的链接。该原型对象具有一个自己的原型，等等，直到达到一个对象的 prototype 为 null。

根据定义，null 没有 prototype，并作为这个 prototype chain 中的最后一个环节。

## 基于原型链的继承
#### 继承属性
JavaScript对象是动态的属性“包”（指其自己的属性）。JavaScript对象有一个指向一个对象原型的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

> 从 ECMAScript 6 开始, __proto__ 可以用Object.getPrototypeOf()和Object.setPrototypeOf()访问器来访问。

#### 理解 __proto__
{% heighlight javascript %}
let o = {a: 1, b: 2}
// o 的原型 o.__proto__有属性 b 和 c：
// 最后, o.__proto__.__proto__ 是 null.   这就是原型链的末尾，即 null
// 综上，整个原型链如下:
// {a:1, b:2} ---> {b:3, c:4} ---> null
console.log(o.a); // 1
// a是o的自身属性吗？是的，该属性的值为1

console.log(o.b); // 2
// b是o的自身属性吗？是的，该属性的值为2
// o.__proto__上还有一个'b'属性,但是它不会被访问到.这种情况称为"属性遮蔽 (property shadowing)".

console.log(o.c); // 4
// c是o的自身属性吗？不是，那看看o.__proto__上有没有.
// c是o.__proto__的自身属性吗？是的,该属性的值为4

console.log(o.d); // undefined
// d是o的自身属性吗？不是,那看看o.__proto__上有没有.
// d是o.__proto__的自身属性吗？不是，那看看o.__proto__.__proto__上有没有.
// o.__proto__.__proto__为null，停止搜索，
// 没有d属性，返回undefined
{% endhighlight %}

#### 继承方法
在 JavaScript 里，任何函数都可以添加到对象上作为对象的属性。函数的继承与其他的属性继承没有差别

当继承的函数被调用时，this 指向的是当前继承的对象(实例)，而不是继承的函数所在的原型对象。
{% highlight javascript %}
var o = {
	a: 2,
	m: function() {
		return this.a + 1;
	}
}

console.log( o.m() ) // 3

var p = Object.create(o);

p.a = 12;
console.log( p.m() ) // 13
// 调用 p.m 时, 'this'指向 p. 
// 又因为 p 继承 o 的 m 函数
// 此时的'this.a' 即 p.a，即 p 的自身属性 'a'

{% endhighlight %}


## 使用不同的方法来创建对象和生成原型链

使用普通语法创建对象
{% highlight javascript %}
var o = {a:1}

// o 这个对象继承了Object.prototype上面的所有属性
// 所以可以这样使用 o.hasOwnProperty('a').

// 原型链如下:
// o ---> Object.prototype ---> null


var a = ["yo", "whadup", "?"];

// 数组都继承于Array.prototype 
// (indexOf, forEach等方法都是从它继承而来).
// 原型链如下:
// a ---> Array.prototype ---> Object.prototype ---> null


function f(){
  return 2;
}

// 函数都继承于Function.prototype
// (call, bind等方法都是从它继承而来):
// f ---> Function.prototype ---> Object.prototype ---> null
{% endhighlight %}

使用构造器创建对象:
在 JavaScript 中，构造器其实就是一个普通的函数。当使用 new 操作符 来作用这个函数时，它就可以被称为构造方法（构造函数）。
{% highlight javascript %}
function Graph() {
	this.vertices = [];
	this.edges = [];
}

Graph.prototype = {
	addVertex: function() {
		this.vertices.push(v)
	}
}

var g = new Graph();
// g是生成的对象,他的自身属性有'vertices'和'edges'.
// 在g被实例化时,g.__proto__指向了Graph.prototype.
{% endhighlight %}

使用 Object.create 创建对象
可以调用Object.create来创建一个新对象。新对象的原型就是调用 create 方法时传入的第一个参数：
{% highlight javascript %}
var a = {a: 1}; 
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined, 因为d没有继承Object.prototype
{% endhighlight %}

使用 class 关键字:
JavaScript引入了一套新的关键字用来实现 class。这些新的关键字包括 class, constructor, static, extends, 和 super.
但是JavaScript 仍然是基于原型的。
{% highlight javascript %}
"use strict";

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);

{% endhighlight %}

## 补充：
在原型链上查找属性比较耗时，对性能有副作用，这在性能要求苛刻的情况下很重要。另外，试图访问不存在的属性时会遍历整个原型链。

遍历对象的属性时，原型链上的每个可枚举属性都会被枚举出来。

检测对象的属性是定义在自身上还是在原型链上，有必要使用 hasOwnProperty 方法，所有继承自 `Object.proptotype` 的对象都包含这个方法。

hasOwnProperty 是 JavaScript 中唯一一个只涉及对象自身属性而不会遍历原型链的方法。

> 仅仅通过判断值是否为 undefined 还不足以检测一个属性是否存在，一个属性可能存在而其值恰好为 undefined。

#### prototype 和 Object.getPrototypeOf
所有的都是实例（对象）。即使我们模拟出的 “类（classes）”，也只是一个函数对象。

__proto__ 看起来就像递归引用

> `a1.doSomething` , `Object.getPrototypeOf(a1).doSomething` , `Object.getPrototypeOf(Object.getPrototypeOf(a1)).doSomething`等等等，直到它找到 doSomething 这个属性或者 Object.getPrototypeOf 返回 null。


因此，当你执行：
> var o = new Foo()

JavaScript 实际上执行的是：
> var o = new Object();
> o.__proto__ = Foo.prototype;
> Foo.call(o);

然后当你执行：
> o.someProp;

> 它会检查是否存在 someProp 属性。如果没有，它会查找 Object.getPrototypeOf(o).someProp ,如果仍旧没有，它会继续查找 Object.getPrototypeOf(Object.getPrototypeOf(o)).someProp ，一直查找下去，直到它找到这个属性 或者 Object.getPrototypeOf() 返回 null 。


