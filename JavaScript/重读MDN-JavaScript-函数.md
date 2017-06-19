### arguments
arguments对象是所有函数中可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。第一个条目的索引从0开始
> arguments[0]

参数也可以被设置
> arguments[1] = 'new value';

只有函数被调用时，arguments对象才会创建，未调用时其值为null：
> console.log(new Function().arguments);//return null 

arguments对象不是一个Array. 它类似于数组，但除了`length`之外没有任何数组属性。
> console.log(arguments instanceof Array); // false 
将arguments对象转换为一个真正的数组：
方法一：
{% highlight javascript %}
let args = Array.prototype.slice.call(arguments);

let arg = [].slice.call(arguments);
{% endhighlight %}

方法二：
{% highlight javascript %}
// Array.from() 方法从一个类似数组或可迭代的对象中创建一个新的数组实例。
let args = Array.from(arguments);

// 扩展运算符可以将一个类数组对象中索引范围在[0,length)之间的所有属性的值添加到一个数组中
let args = [...arguments];
{% endhighlight %}

方法三：
{% highlight javascript %}
let args = (
	arguments.length === 1 ? 
	[arguments[0]] : 
	Array.apply(null, arguments)
);
{% endhighlight %}


* arguments对象仅在函数内部有效，在函数外部调用arguments对象会出现一个错误
* arguments的typeof返回'object'。
{% highlight javascript %}
console.log(typeof arguments); 
// 'object'
{% endhighlight %}
* 可以使用索引来确定各个arguments的类型。
{% highlight javascript %}
console.log(typeof arguments[0]); 
//这将返回单个参数的typeof。
{% endhighlight %}


如果你调用一个函数，当这个函数的参数数量比它显式声明的参数数量更多的时候，你就可以使用 arguments 对象。
arguments.length | 实参数量
Function.length  | 形参数量

属性
arguments.callee | 指向当前执行的函数(当函数被调用时，它的arguments.callee对象就会指向自身，也就是一个对自己的引用。)
arguments.caller | 指向调用当前函数的函数

定义一个创建HTML列表的方法：
这个函数唯一正式声明了的参数是一个字符。当该参数为 "u" 时，创建一个无序列表 (项目列表)；当该参数为 "o" 时，则创建一个有序列表 (编号列表)。
{% highlight javascript %}
function list(type) {
  var result = "<" + type + "l><li>";
  var args = Array.prototype.slice.call(arguments, 1);
  result += args.join("</li><li>");
  result += "</li></" + type + "l>"; // end list

  return result;
}
{% endhighlight %}
你可以传递任意数量的参数到该函数，然后该函数会将每个参数作为一个条目添加到第一个参数指定类型的列表当中。
> var listHTML = list("u", "One", "Two", "Three");


### 箭头函数

基础语法：
{% highlight javascript %}
(param1, param2, …, paramN) => { statements; }


/* 当删除大括号时，它将是一个隐式的返回值，这意味着我们不需要指定我们返回*/
(param1, param2, …, paramN) => expression;

// 等价于 

(param1, param2, …, paramN) => { return expression; } 


// 如果只有一个参数，圆括号是可选的:
(singleParam) => { statements; }

// 等价于

singleParam => { statements; }


// 如果箭头函数 有多参数, 必须使用 ()圆括号:
(param1, param2, …, paramN) => { statements; }

// 如果箭头函数 无参数 , 必须使用 ()圆括号或者 _下划线:
() => { statements; } 
或
_ => { statements; }

{% endhighlight %}


高级语法：
{% highlight javascript %}
//对函数体使用括号, 返回一个对象字面表达式
params => ({foo: bar})

// 支持 剩余参数 Rest parameters 和默认参数 default parameters:
(param1, param2, ...rest) => { statements }

// ...rest 参数, 必须是参数列表最后一个参数
let x1 = (param1,...,paramN,...rest) => {
	console.log(`{statements}`,)
}

// 默认参数
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }

// 也支持参数列表中的解构赋值 Destructuring
let f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
// a=1; b=2; x=c; c=a+b=3;

{% endhighlight %}

箭头函数的引入有两个方面的作用：
* 一是更简短的函数书写
* 二是对 this的词法解析。

一个箭头函数表达式的语法比一个函数表达式更短，并且不绑定自己的 this，arguments，super或 new.target。
这些函数表达式最适合用于非方法函数，并且它们不能用作构造函数。

> 在箭头函数出现之前，每个新定义的函数都有其自己的 this 值（例如，构造函数的 this 指向了一个新的对象；严格模式下的函数的 this 值为 undefined；如果函数是作为对象的方法被调用的，则其 this 指向了那个调用它的对象,例如 obj.func ,那么func中的this就是obj）。
{% highlight javascript %}
function Person() {
    var self = this; 
    // 也有人选择使用 `that` 而非 `self`, 只要保证一致就好.
    self.age = 0;
    setInterval(function growUp() {
        // 回调里面的 `self` 变量就指向了期望的那个对象了
        // 除此之外，还可以使用 bind 函数，把期望的 this 值传递给 growUp() 函数。
        self.age++;
    }, 3000);
}

var p = new Person();
{% endhighlight %}

箭头函数会捕获其所在上下文的  this 值，作为自己的 this 值，(默认指向在定义它时,它所处的对象,而不是执行时的对象)
{% highlight javascript %}
function Person() {  
    this.age = 0;  
    setInterval(() => {
        // 回调里面的 `this` 变量就指向了期望的那个对象了
        this.age++;
    }, 3000);
}

var p = new Person();
{% endhighlight %}

#### 使用 call 或 apply 调用

由于 this 已经在词法层面完成了绑定，通过 call() 或 apply() 方法调用一个函数时，只是传入了参数而已，对 this 并没有什么影响：
{% highlight javascript %}
var adder = {
  base : 1,
    
  add : function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base : 2
    };
            
    return f.call(b, a);
  }
};

console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3 ——译者注）
{% endhighlight %}

#### 不绑定参数（arguments）
箭头函数不会在其内部暴露出参数（arguments )： arguments.length, arguments[0], arguments[1] 等等，都不会指向箭头函数的 arguments，而是指向了箭头函数所在作用域的一个名为 arguments 的值（如果有的话，否则，就是 undefined。）。

{% highlight javascript %}
var arguments = 42;
var arr = () => arguments;

arr(); // 42

function foo() {
  var f = (i) => arguments[0]+i; 
  // foo函数的间接参数绑定
  return f(2);
}

foo(1); // 3
{% endhighlight %}

箭头函数没有自己的 arguments ，不过在大多数情形下，rest参数可以给出一个解决方案：
{% highlight %}
function foo() { 
  var f = (...args) => args[0]; 
  return f(2); 
}

foo(1); 
// 2
{% endhighlight %}

* 箭头函数表达式对非方法函数是最合适的。
{% highlight javascript %}
'use strict';
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b(); 
// undefined
obj.c(); 
// 10, Object {...}
{% endhighlight %}

{% highlight javascript %}
'use strict';
var obj = {
  a: 10
};

Object.defineProperty(obj, "b", {
  get: () => {
    console.log(this.a, typeof this.a, this);
    return this.a+10; 
   // represents global object 'Window', therefore 'this.a' returns 'undefined'
  }
});
{% endhighlight %}

* 箭头函数不能用作构造器，和 new 一起用就会抛出错误。
{% highlight javascript %}
var Foo = () => {};
var foo = new Foo(); 
// TypeError: Foo is not a constructor
{% endhighlight %}

* 箭头函数没有原型属性
{% highlight javascript %}
var Foo = () => {};
console.log(Foo.prototype); 
// undefined
{% endhighlight %}

* yield 关键字通常不能在箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数不能用作生成器。
{% highlight javascript %}
var func = x => x * x;                  
// 简写函数 省略return

var func = (x, y) => { return x + y; }; 
//常规编写 明确的返回值
{% endhighlight %}

* 用 params => {object:literal} 这种简单的语法返回一个文字表达式是行不通的：
{% highlight javascript %}
var func = () => {  foo: 1  };
// undefined!

var func = () => {  foo: function() {}  };
// SyntaxError: function statement requires a name（未定义函数语句）
{% endhighlight %}
这是因为花括号（即 {} ）里面的代码被解析为序列语句了（例如， foo 被认为是一个标签, 而非文字表达式的组成部分）。
所以，记得用圆括号把文字表达式包起来：
{% highlight javascript %}
var func = () => ({ foo: 1 });
{% endhighlight %}

#### 解析顺序

在箭头函数中的箭头不是操作符(或者运算符,就像'+ -'那些)， 但是箭头函数有特殊的解析规则就是：相比普通的函数，受操作符的优先级影响。
{% highlight javascript %}
let callback;

callback = callback || function() {}; 
// ok
callback = callback || () => {};      
// SyntaxError:非法箭头函数属性
callback = callback || (() => {});    
// ok
{% endhighlight %}

### 默认参数值
默认函数参数允许使用默认值初始化形式参数, 如果没有值或未定义被传入。

ES6之前：
{% highlight javascript %}
function multiply(a, b) {
  b = typeof b !== 'undefined' ?  b : 1;

  return a*b;
}

multiply(5); // 5
{% endhighlight %}

使用默认参数：
{% highlight  javascript %}
function multiply(a, b = 1) {
  return a*b;
}

multiply(5); // 5
{% endhighlight %}

函数调用中，即使显式地传入了undefined，参数的值也会取默认值。

在函数被调用时，参数默认值会被解析，每次函数调用时都会创建一个新的参数对象。
{% highlight javascript %}
function append(value, array = []) {
  array.push(value);
  return array;
}

append(1); //[1]
append(2); //[2], not [1, 2]
{% endhighlight %}

这个规则对于函数和变量也是适用的。
{% highlight javascript %}
function callSomething(thing = something()) { return thing }

function something(){
  return "sth";
}

callSomething();  //sth
{% endhighlight %}

前置参数对于后面的默认参数是可见的
{% highlight javascript %}
function singularAutoPlural(singular, plural = singular+"s", 
                            rallyingCry = plural + " ATTACK!!!") {
  return [singular, plural, rallyingCry ]; 
}
{% endhighlight %}

可以通过解构赋值为参数赋值:
{% highlight javascript %}
function f([x, y] = [1, 2], {z: z} = {z: 3}) { 
  return x + y + z; 
}

f(); // 6
{% endhighlight %}

### 方法的定义
在对象初始器中定义方法的语法，这是一种把方法名直接赋给函数的简写方式。

## 语法
{% highlight javascript %}
var obj = {
  property([parameters]) {},
  get property() {},
  set property(value) {},
  * generator() {}
};
{% endhighlight %}

如下代码，
{% highlight javascript %}
var obj = {
  foo: function() {},
  bar: function() {}
};
{% endhighlight %}
现可被简写为：
{% highlight javascript %}
var obj = {
  foo() {},
  bar() {}
};
{% endhighlight %}

生成器方法也可以用这种简写语法定义。注意简写语法中的星号（*）必须出现在生成器名前，也就是说* g(){}可以正常工作，而g *(){}不行。
{% highlight javascript %}
// 用有属性名的语法定义方法（ES6之前）：
var obj2 = {
  g: function*() {
    var index = 0;
    while(true)
      yield index++;
  }
};

// 同一个方法，简写语法：
var obj2 = { 
  * g() {
    var index = 0;
    while(true)
      yield index++;
  }
};

var it = obj2.g();
console.log(it.next().value); // 0
console.log(it.next().value); // 1
{% endhighlight %}

计算属性名
{% highlight javascript %}
var bar = {
  foo0 : function (){return 0;},
  foo1(){return 1;},
  ["foo" + 2](){return 2;},
};

console.log(bar.foo0()); // 0
console.log(bar.foo1()); // 1
console.log(bar.foo2()); // 2
{% endhighlight %}

### 剩余参数
剩余参数语法允许我们将一个不定数量的参数表示为一个数组

如果函数的最后一个命名参数以...为前缀，则在函数被调用时,该形参会成为一个数组,数组中的元素都是传递给该函数的多出来的实参的值。

剩余参数和 arguments 对象之间的区别主要有三个：
* 剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。
* arguments 对象不是一个真实的数组,而剩余参数是真实的 Array实例
* arguments 对象对象还有一些附加的属性 (比如callee属性)。

使用剩余参数可以避免将arguments转为数组的麻烦
{% highlight javascript %}
// 下面的代码模拟了剩余数组
function f(a, b){
  var args = Array.prototype.slice.call(arguments, f.length);
  // ...
}
 
// 现在代码可以简化为这样了
function(a, b, ...args) {
   
}
{% endhighlight %}

一个栗子
{% highlight javascript %}
// 剩余参数包含了从第二个到最后的所有实参. 然后用第一个实参依次乘以它们
function multiply(multiplier, ...theArgs) {
  return theArgs.map(function (element) {
    return multiplier * element;
  });
}

var arr = multiply(2, 1, 2, 3); 
// [2, 4, 6]
console.log(arr);
{% endhighlight %}

### getter
get 语法将一个对象属性绑定到查询该属性时将被调用的一个函数上。
> {get prop() { ... } }
>{get [expression]() { ... } }

使用get语法时应注意以下问题:
* 可以使用数值或字符串作为标识;
* 必须不带参数;
* 在对象字面量中,同一个属性不能有两个get,也不能既有get又有属性键值对(不允许使用 { get x() { }, get x() { } } 和 { x: ..., get x() { } } ).

可通过 delete 操作符删除getter.

#### 在新对象初始化时定义一个getter
{% highlight javascript %}
var log = ['test'];
var obj = {
  get latest () {
    if (log.length == 0) return undefined;
    return log[log.length - 1]
  }
}
console.log (obj.latest); // Will return "test".
{% endhighlight %}

使用delete操作符删除getter
> delete obj.latest;

#### 使用defineProperty在存在的对象上定义 getter
{% highlight javascript %}
// 在任意时间添加getter到一个存在的对象,使用 Object.defineProperty().

var o = { a:0 }

Object.defineProperty(o, "b", { 
	get: function () { return this.a + 1; } 
});

console.log(o.b)
{% endhighlight %}

### setter
在 javascript 中，如果试着改变一个属性的值，那么对应的 setter 将被执行。setter 经常和 getter 连用以创建一个伪属性。一个拥有真实值的属性就不能再有 setter 了。

使用set语法时需要注意：
* 它的标识符可以是 number 与 string 二者之一。
* 它必须有一个明确的参数 
* 在同一个对象中，不能为一个已有真实值的变量使用 set ，也不能为一个属性设置多个 set。
( { set x(v) { }, set x(v) { } } 和 { x: ..., set x(v) { } } 是不允许的 )

setter 可以用  delete 操作来移除。

为对象 o 定义一个伪属性 current ，当对它赋值时，将会把值更新到 log：
{% highlight javascript %}
// current 属性是未定义的，访问它时将会返回 undefined。
var o = {
  set current (str) {
    return this.log[this.log.length] = str;
  },
  log: []
}
{% endhighlight %}

使用 defineProperty 为已存在的对象定义 setter
{% highlight javascript %}
var o = { a:0 };

Object.defineProperty(o, "b", { 
	set: function (x) { this.a = x / 2; } 
});

o.b = 10;
console.log(o.a) // 5
{% endhighlight %}

