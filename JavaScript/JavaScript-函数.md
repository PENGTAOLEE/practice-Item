## JS函数

### 介绍
Name| Description
DRY | 不要重复自己，don't repeat yourself
高内聚低耦合| loose coupling high cohesion
YAGNI | 你不会用到它的，ya ain't gonna need it
最小意外原则 | Principle of least surprise
单一责任 | single responsibility

## 函数
你可以像对待任何其他数据类型一样对待函数 —— 把它们存在数组里，当作参数传递，赋值给变量...等等

一定要非常小心 this 值
{% highlight javascript %}
var fs = require('fs');

// 不好
fs.readFile('freaky_friday.txt', Db.save);

// 好
fs.readFile('freaky_friday.txt', Db.save.bind(Db));
{% endhighlight %}
把 Db 绑定（bind）到它自己身上以后，你就可以随心所欲地调用它的原型链式了


下面这两个函数做的事情一模一样，但后一个就显得更加通用，可重用性也更高：
{% highlight javascript %}
// 只针对当前的博客
var validArticles = function(articles) {
  return articles.filter(function(article){
    return article !== null && article !== undefined;
  });
};

// 对未来的项目友好太多
var compact = function(xs) {
  return xs.filter(function(x) {
    return x !== null && x !== undefined;
  });
};
{% endhighlight %}


纯函数的好处
> 纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。

{% highlight javascript %}
var xs = [1,2,3,4,5];

// 纯的
xs.slice(0,3);
//=> [1,2,3]

xs.slice(0,3);
//=> [1,2,3]


// 不纯的
xs.splice(0,3);
//=> [1,2,3]

xs.splice(0,3);
//=> [4,5]
{% endhighlight %}

> 在函数式编程中，我们讨厌这种会改变数据的笨函数。我们追求的是那种可靠的，每次都能返回同样结果的函数，而不是像 splice 这样每次调用后都把数据弄得一团糟的函数，这不是我们想要的。

另一个例子：
{% highlight javascript %}
// 不纯的
var minimum = 21;
var checkAge = function(age) {
  return age >= minimum;
};


// 纯的
var checkAge = function(age) {
  var minimum = 21;
  return age >= minimum;
};
{% endhighlight %}
checkAge 的结果将取决于 minimum 这个可变变量的值。

我们也可以让 minimum 成为一个不可变（immutable）对象，这样就能保留纯粹性，因为状态不会有变化。要实现这个效果，必须得创建一个对象，然后调用 Object.freeze 方法：
{% highlight javascript %}
var immutableState = Object.freeze({
  minimum: 21
});
{% endhighlight %}

可以通过延迟执行的方式把不纯的函数转换为纯函数
{% highlight javascript %}
var pureHttpCall = memoize(function(url, params){
  return function() { return $.getJSON(url, params); }
});
{% endhighlight %}
我们并没有真正发送 http 请求——只是返回了一个函数，当调用它的时候才会发请求。这个函数之所以有资格成为纯函数，是因为它总是会根据相同的输入返回相同的输出：给定了 url 和 params 之后，它就只会返回同一个发送 http 请求的函数。

纯函数对于其依赖必须明确，这样我们就能知道它的目的。
{% highlight javascript %}
// 不纯的
var signUp = function(attrs) {
  var user = saveUser(attrs);
  welcomeUser(user);
};

var saveUser = function(attrs) {
    var user = Db.save(attrs);
    ...
};

var welcomeUser = function(user) {
    Email(user, ...);
    ...
};

// 纯的
var signUp = function(Db, Email, attrs) {
  return function() {
    var user = saveUser(Db, attrs);
    welcomeUser(Email, user);
  };
};

var saveUser = function(Db, attrs) {
    ...
};

var welcomeUser = function(Email, user) {
    ...
};
{% endhighlight %}
仅从纯函数版本的 signUp 的签名就可以看出，它将要用到 Db、Email 和 attrs

