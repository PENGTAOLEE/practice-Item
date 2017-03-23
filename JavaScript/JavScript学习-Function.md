# Function 对象
> 如果一个函数中没有使用return语句，则它默认返回undefined. 
> 如果要返回一个特定的值，则函数必须使用return语句来指定一个所要返回的值

> 在函数执行时，this 关键字并不会指向正在运行的函数本身，而是指向调用该函数的对象
> 如果你想在函数内部获取函数自身的引用，只能使用函数名或者使用arguments.callee属性(严格模式下不可用)，如果该函数是一个匿名函数,则你只能使用后者。

## 函数定义

> 函数声明
```javascript
function name ([param[, param[, ... param]]]) {
	statements
}

* 声明提前
```

> 函数表达式
```javascript
function [name]([param] [, param] [..., param]) { 
	statements 
}

// 例子一
var multiply = function(x, y) {
   return x * y;
};

// 例子二
var multiply = function func_name(x, y) {
   return x * y;
};
console.log(func_name)  // 这里的func_name访问不到
```

> 函数生成器表达式 (function* 表达式)
```javascript
function* [name]([param] [, param] [..., param]) { statements }

*  生成器函数
// 生成器是一种可以从中退出并在之后重新进入的函数
function* idMaker(){
  var index = 0;
  while(index<3)
    yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // undefined
// ...

// 被 yield*委派至另一个生成器函数。
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

// yield* 指定一个生成器 跑完该生成器的yield 然后再继续跑当前的yield
console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```

> 箭头函数表达式 (=>)
```javascript
([param] [, param]) => { statements } param => expression

* statements or expression
	多个声明statements需要用大括号括起来，而单个表达式时则不需要。表达式expression也是该函数的隐式返回值。

```

> Function构造函数
```javascript
function Function() {}

// 可以使用new操作符创建
new Function (arg1, arg2, ... argN, functionBody)

// 创建了一个能返回两个参数和的函数
var adder = new Function("a", "b", "return a + b");

// 调用函数
adder(2, 6);
//  8
```

# Function 参数

> 参数(arguments)对象
arguments: 一个包含传递给当前执行函数参数的类数组集合[实参]
arguments.callee: 当前正在执行的函数
arguments.length: 实参长度

# 方法函数定义
Getter 和 Setter函数

> get：当查找某个对象属性时，该对象属性将会与被调用函数绑定。
> set: 当试图设置该属性时，对象属性与被调用函数绑定。

```javascript	
var log = ['test'];
var obj = {
  // 使用表达式作为函数名称绑定在属性上	
  get latest () {
    if (log.length == 0) return undefined;
    return log[log.length - 1]
  },
  set latest () {
  	return "为当前元素绑定了一个值"
  }
}

console.log (obj.latest); // Will return "test".
obj.latest = 1;           // "为当前元素绑定了一个值"
```

> 只需使用 delete ,就可删除getter  
```javascript
delete obj.latest
```

> 使用defineProperty在存在的对象上定义 getter
```javascript
var o = { 
	a: 0 
}

// 访问 o.b 时运行getter
Object.defineProperty(o, "b", {
	get: function () { 
		return this.a + 1; 
	} 
});

console.log(o.b) // 1
```

# setter 定义方法也是一样的



