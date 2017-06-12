### 基础
JavaScript是区分大小写的，并使用了Unicode字符集

#### 类型
JavaScript 中的类型包括：
* Number (数字)
* String (字符串)
* Boolean (布尔值)
* Object (对象)
  * Function (函数)
  * Array (数组)
  * Date (日期)
  * RegExp (正则)
* Undefined (未定义)
* Null (空)
* Symbol (符号)

## 数字
JavaScript 不区分整数值和浮点数值，所有数字在 JavaScript 中均用浮点数值表示
> 0.1 + 0.2 = 0.30000000000000004

可以使用内置函数 `parseInt()`将字符串转换成整型，该函数的第二个参数表示字符串所表示数字的进制;
如果给定的字符串不存在数值形式，函数会返回一个特殊的值 NaN（Not a Number 的缩写）
> parseInt("010", 10); // 10
> parseInt("hello", 10); // NaN

可以使用内置函数 isNaN() 来判断一个变量是否为 NaN：
> isNaN(NaN); // true

JavaScript 还有一个类似的内置函数 `parseFloat()`，用以解析浮点数字符串，与parseInt()不同的地方是，parseFloat()只应用于解析十进制数字
> parseFloat('010')  // 10

 > parseInt() 和 parseFloat() 函数会尝试逐个解析字符串中的字符，直到遇上一个无法被解析成数字的字符，然后返回该字符前所有数字字符组成的数字。使用运算符 "+" 将字符串转换成数字，只要字符串中含有无法被解析成数字的字符，该字符串都将被转换成 NaN

## 字符串
JavaScript 中的字符串是一串Unicode 字符序列。这对于那些需要和多语种网页打交道的开发者来说是个好消息。更准确地说，它们是一串UTF-16编码单元的序列，每一个编码单元由一个 16 位二进制数表示。每一个Unicode字符由一个或两个编码单元来表示

#### 字符串也有methods（方法）
> 'qiyue'.charAt(0)   // 'q'
> 'hello,qiyue'.replace('hello','nihao')  // 'nihao,qiyue'

## 数组
JavaScript 中的数组是一种特殊的对象。它的工作原理与普通对象类似（以数字为属性名，但只能通过[] 来访问），但数组还有一个特殊的属性——length（长度）属性。这个属性的值通常比数组最大索引大 1。

如果试图访问一个不存在的数组索引，会得到 undefined：
> typeof(a[90]); // undefined

* 遍历数组方式一：
{% highlight javascript %}
for (var i = 0; i < a.length; i++) {
    // Do something with a[i]
}
{% endhighlight %}

* 遍历数组的另一种方式：
{% highlight javascript %}
for (var i in a) {
  // Do something with a[i]
}
{% endhighlight %}

* ECMAScript 5 增加了遍历数组的另一个方法 forEach()：
{% highlight javascript %}
["dog", "cat", "hen"].forEach(function(currentValue, index, array) {
  // Do something with currentValue or array[index]
});
{% endhighlight %}

Array（数组）类自带了许多方法：
| methods                                             | description           |
| ------------- ------------------------------------- |:-------------------------------------------------------------------------------:|
| a.toString()                                        | 返回一个包含数组中所有元素的字符串，每个元素通过逗号分隔。                           |
| a.toLocaleString()                                  | 根据宿主环境的区域设置，返回一个包含数组中所有元素的字符串，每个元素通过逗号分隔。     |
| a.concat(item1[, item2[, ...[, itemN]]])            | 返回一个数组，这个数组包含原先 a 和 item1、item2、……、itemN 中的所有元素。          |
| a.join(sep)                                         | 返回一个包含数组中所有元素的字符串，每个元素通过指定的 sep 分隔。 |
| a.pop()                                             | 删除并返回数组中的最后一个元素。      |
| a.push(item1, ..., itemN)                           | 将 item1、item2、……、itemN 追加至数组 a。      |
| a.shift()                                           | 删除并返回数组中第一个元素。 |
| a.unshift([item])                                   | 将 item 插入数组头部，返回数组新长度（考虑 undefined）。      |
| a.reverse()                                         | 数组逆序（会更改原数组 a）。      |
| a.slice(start, end)                                 | 返回子数组，以 a[start] 开头，以 a[end] 前一个元素结尾。      |
| a.sort([cmpfn])                                     | 依据 cmpfn 返回的结果进行排序，如果未指定比较函数则按字符顺序比较（即使元素是数字）。      |
| a.splice(start, delcount[, item1[, ...[, itemN]]])  | 从 start 开始，删除 delcount 个元素，然后插入所有的 item。      |

## 函数
一个 JavaScript 函数可以包含 0 个或多个已命名的变量。函数体中的表达式数量也没有限制。你可以声明函数自己的局部变量。return 语句在返回一个值并结束函数。如果没有使用 return 语句，或者一个没有值的 return 语句，JavaScript 会返回 undefined。

已命名的参数更像是一个指示而没有其他作用。如果调用函数时没有提供足够的参数，缺少的参数会被 undefined 替代

#### 构造函数通常的写法
{% highlight javascript %}
function Person(first, last) {
    this.first = first;
    this.last = last;
    this.fullName = function() {
        return this.first + ' ' + this.last;
    }
    this.fullNameReversed = function() {
        return this.last + ', ' + this.first;
    }
}
var s = new Person("Simon", "Willison");
{% endhighlight %}
> 创建一个崭新的空对象，然后使用指向那个对象的 this 调用特定的函数。
缺点：每次我们创建一个 Person 对象的时候，我们都在其中创建了两个新的函数对象

#### 优化方案
{% highlight javascript %}
function Person(first, last) {
    this.first = first;
    this.last = last;
}
Person.prototype.fullName = function() {
    return this.first + ' ' + this.last;
}
Person.prototype.fullNameReversed = function() {
    return this.last + ', ' + this.first;
}
{% endhighlight %}

Person.prototype 是一个可以被Person的所有实例共享的对象。
当你试图访问一个 Person 没有定义的属性时，解释器会首先检查这个 Person.prototype 来判断是否存在这样一个属性。所以，任何分配给 Person.prototype 的东西对通过 this 对象构造的实例都是可用的。

#### 内部函数
JavaScript 允许在一个函数内部定义函数，JavaScript 中的嵌套函数，一个很重要的细节是它们可以访问父函数作用域中的变量：
{% highlight javascript %}
function betterExampleNeeded() {
    var a = 1;
    function oneMoreThanA() {
        return a + 1;
    }
    return oneMoreThanA();
}
{% endhighlight %}
可以将它们嵌套在会被调用的那个函数内部，这样做可以减少全局作用域下的函数的数量，这有利于编写易于维护的代码

## 闭包
一个闭包就是一个函数和被创建的函数中的作用域对象的组合。
每当 JavaScript 执行一个函数时，都会创建一个作用域对象（scope object），用来保存在这个函数中创建的局部变量。它和被传入函数的变量一起被初始化。这与那些保存的所有全局变量和函数的全局对象（global object）类似，但仍有一些很重要的区别，第一，每次函数被执行的时候，就会创建一个新的，特定的作用域对象；第二，与全局对象（在浏览器里面是当做 window 对象来访问的）不同的是，你不能从 JavaScript 代码中直接访问作用域对象，也没有可以遍历当前的作用域对象里面属性的方法

{% highlight javascript %}
function makeAdder(a) {
    return function(b) {
        return a + b;
    }
}
var x = makeAdder(5);
var y = makeAdder(20);
x(6); // 11
y(7); // 27
{% endhighlight %}


## 其他类型
JavaScript中`null`和 `undefined`是不同的
`null`: 表示一个空值，必须使用 null 关键字才能访问
`undefined`: 表示一个未初始化的值，一个未被赋值的变量就是undefined类型

用 var 或 let 声明的且未赋初值的变量，值会被设定为 undefined

### 声明
JavaScript有三种声明变量
`var`：声明一个变量，可选择将其初始化为一个值。
`let`: 声明一个块作用域的局部变量，可选择将其初始化为一个值。
`const`: 声明一个只读的常量。

#### 变量
一个JavaScript标识符必须以 `字母`、`下划线_` 或者 `$` 开头，后续的字符也可以是数字

## 运算符
&& 和 || 运算符使用短路逻辑，是否会执行第二个语句（操作数）取决于第一个操作数的结果。
在需要访问某个对象的属性时，使用这个特性可以事先检测该对象是否为空：
> var name = o && o.getName(); // 存在 o 才执行赋值操作

或运算可以用来设置默认值：
> var name = otherName || "default";

类似地，JavaScript 也有一个用于条件表达式的三元操作符：
> var allowed = (age > 18) ? "yes" : "no";

在需要多重分支时可以使用  基于一个数字或字符串的switch 语句：
{% highlight javascript %}
// 在 switch 的表达式和 case 的表达式是使用 === 严格相等运算符进行比较的
switch(a) {
    case 1: // 继续向下
    case 2:
        eatIt();
        break;
    default:
        doNothing();
}
{% endhighlight %}
