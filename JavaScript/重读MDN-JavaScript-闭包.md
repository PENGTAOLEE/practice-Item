### 闭包(Closures)
Closures (闭包)是使用被作用域封闭的变量，函数，闭包等执行的一个函数的作用域。通常我们用和其相应的函数来指代这些作用域。(可以访问独立数据的函数)

闭包是指这样的作用域，它包含有一个函数，这个函数可以调用被这个作用域所封闭的变量、函数或者闭包等内容。通常我们通过闭包所对应的函数来获得对闭包的访问

## 词法作用域
{% highlight javascript %}
function init() {
  // name 是一个被init创建的局部变量
  let name = "Mozilla"; 
  // displayName() 是一个内部函数
  function displayName() { 
      //  一个闭包使用在父函数中声明的变量
      alert(name); 
  } 
  displayName();
}
init();
{% endhighlight %}
函数 init() 创建了一个局部变量 name和一个名为 displayName() 的函数.displayName() 是一个内部函数——定义于 init() 之内且仅在该函数体内可用。displayName() 没有任何自己的局部变量，然而它可以访问到外部函数的变量，即可以使用父函数 init() 中声明的 name 变量。

> 在 JavaScript 中，变量的作用域是由它在源代码中所处位置决定的，并且嵌套的函数可以访问到其外层作用域中声明的变量。

## 闭包
{% highlight javascript %}
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
{% endhighlight %}
函数中的局部变量仅在函数的执行期间可用。一旦 makeFunc() 执行过后，我们会很合理的认为 name 变量将不再可用。但是闭包会保留return 函数内部使用到的变量。
闭包是一种特殊的对象。它由两部分构成：函数，以及创建该函数的环境。环境由闭包创建时在作用域中的任何局部变量组成。
myFunc 是一个闭包，由 displayName 函数和闭包创建时存在的 "Mozilla" 字符串形成。

另一个有意思的示例 — makeAdder 函数：
{% highlight javascript %}
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
{% endhighlight %}

从本质上讲，makeAdder 是一个函数工厂 — 创建将指定的值和它的参数求和的函数，在上面的示例中，我们使用函数工厂创建了两个新函数 — 一个将其参数和 5 求和，另一个和 10 求和。add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的环境。

## 用闭包模拟私有方法
JavaScript 并不提供原生的私有方法，但是可以使用闭包模拟私有方法。私有方法不仅仅有利于限制对代码的访问：还提供了管理全局命名空间的强大能力，避免非核心的方法弄乱了代码的公共接口部分。

下面的示例展现了如何使用闭包来定义公共函数，且其可以访问私有函数和变量【模块模式】
{% highlight javascript %}
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }   
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */
{% endhighlight %}

只创建了一个环境，为三个函数所共享：Counter.increment，Counter.decrement 和 Counter.value。

该共享环境创建于一个匿名函数体内，该函数一经定义立刻执行。环境中包含两个私有项：名为 privateCounter 的变量和名为 changeBy 的函数。 这两项都无法在匿名函数外部直接访问。必须通过匿名包装器返回的三个公共函数访问。

这种形式的闭包提供了许多通常由面向对象编程所享有的益处，尤其是数据隐藏和封装。

## 在循环中创建闭包：一个常见错误
在 ES6 引入 let 关键字 之前，闭包的一个常见的问题发生于在循环中创建闭包。参考下面的示例：
{% highlight html %}
<p id="help">Helpful notes will appear here</p>
<p>E-mail: <input type="text" id="email" name="email"></p>
<p>Name: <input type="text" id="name" name="name"></p>
<p>Age: <input type="text" id="age" name="age"></p>
{% endhighlight %}

{% highlight javascript %}
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp();
{% endhighlight %}

数组 helpText 中定义了三个有用的提示信息，每一个都关联于对应的文档中的输入域的 ID。通过循环这三项定义，依次为每一个输入域添加了一个 onfocus  事件处理函数，以便显示帮助信息。

运行这段代码后，您会发现它没有达到想要的效果。无论焦点在哪个输入域上，显示的都是关于年龄的消息。

该问题的原因在于赋给 onfocus是闭包（setupHelp）中的匿名函数而不是闭包对象；在闭包（setupHelp）中一共创建了三个匿名函数，但是它们都共享同一个环境（item）。在 onfocus 的回调被执行时，循环早已经完成，且此时 item 变量（由所有三个闭包所共享）已经指向了 helpText 列表中的最后一项。


解决这个问题的一种方案是使onfocus指向一个新的闭包对象。
{% highlight javascript %}
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
  return function() {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
  }
}

setupHelp();
{% endhighlight %}
这段代码可以如我们所期望的那样工作。所有的回调不再共享同一个环境， makeHelpCallback 函数为每一个回调创建一个新的环境。在这些环境中，help 指向 helpText 数组中对应的字符串。

## 性能考量
如果不是因为某些特殊任务而需要闭包，在没有必要的情况下，在其它函数中创建函数是不明智的，因为闭包对脚本性能具有负面影响，包括处理速度和内存消耗。

例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。。

以下并不是一个好的闭包的应用
{% highlight javascript %}
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function() {
    return this.name;
  };

  this.getMessage = function() {
    return this.message;
  };
}
{% endhighlight %}
每次调用MyObject构造器，方法都会被重新赋值一次；

可以改成：
{% highlight javascript %}
function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}
(function() {
    this.getName = function() {
        return this.name;
    };
    this.getMessage = function() {
        return this.message;
    };
}).call(MyObject.prototype);
{% endhighlight %}

### 单例模式
单例模式的核心思想是让指定的类只存在唯一一个实例。这意味着当你第二次使用相同的类去创建对象的时候，你得到的应该和第一次创建的是同一个对象。

在JavaScript中没有类，只有对象。当你创建一个对象时，事实上根本没有另一个对象和它一样，这个对象其实已经是一个单例。

在JavaScript中，对象永远不会相等，除非它们是同一个对象，所以即使你创建一个看起来完全一样的对象，它也不会和前面的对象相等：

所以你可以说当你每次使用对象字面量创建一个对象的时候就是在创建一个单例，并没有特别的语法迁涉进来。

JavaScript没有类，所以一字一句地说单例的定义并没有什么意义。但是JavaScript有使用new、通过构造函数来创建对象的语法，有时候你可能需要这种语法下的一个单例实现。这也就是说当你使用new、通过同一个构造函数来创建多个对象的时候，你应该只是得到同一个对象的不同引用。

将构造函数和实例包在一个立即执行的函数中。当构造函数第一次被调用的时候，它返回一个对象并且将私有的instance指向它。在后续调用时，构造函数只是简单地返回这个私有变量
{% hightlight javascript %}
var Universe;

(function () {

    var instance;

    Universe = function Universe() {

    if (instance) {
        return instance;
    }

    instance = this;

    // all the functionality
    this.start_time = 0;
    this.bang = "Big";

    };

}());
{% endhighlight %}

## 实现一个完整的单例：
{% highlight javascript %}
// 单例
var mySingleton = (function () {

  // Instance stores a reference to the Singleton
  var instance;
  
  // 初始化
  function init() {

    // 私有方法和变量
    function privateMethod(){
        console.log( "I am private" );
    }

    var privateVariable = "Im also private";

    var privateRandomNumber = Math.random();

    return {

      // 公共方法和变量
      publicMethod: function () {
        console.log( "The public can see me!" );
      },

      publicProperty: "I am also public",

      getRandomNumber: function() {
        return privateRandomNumber;
      }

    };

  };

  return {

    // 如果存在获取此单例实例，如果不存在创建一个单例实例
    getInstance: function () {

      if ( !instance ) {
        instance = init();
      }

      return instance;
    }

  };

})();

// 非单例
var myBadSingleton = (function () {

  // 存储单例实例的引用
  var instance;

  function init() {

    var privateRandomNumber = Math.random();

    return {

      getRandomNumber: function() {
        return privateRandomNumber;
      }

    };

  };

  return {

    // 总是创建一个新的实例
    getInstance: function () {

      instance = init();

      return instance;
    }

  };

})();

// 单例
var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); // true

// 非单例
var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
console.log( badSingleA.getRandomNumber() !== badSingleB.getRandomNumber() ); // true
{% endhighlight %}

### 当一个对象需要和另外的对象进行跨系统协作的时候，单例模式很有用。下面是一个单例模式在这种情况下使用的例子：
{% highlight javascript %}
var SingletonTester = (function () {

  // options: an object containing configuration options for the singleton
  // e.g var options = { name: "test", pointX: 5}; 
  function Singleton( options )  {

    options = options || {};
	
	// 为单例创造一些数据
    this.name = "SingletonTester";

    this.pointX = options.pointX || 6;

    this.pointY = options.pointY || 10; 

  }

  // our instance holder 
  var instance;

  // 静态变量和方法
  var _static  = {  

    name:  "SingletonTester",

    // 获取实例的方法。它返回一个单例对象的单实例。
    getInstance:  function( options ) {   
      if( instance  ===  undefined )  {    
        instance = new Singleton( options );   
      }   

      return  instance; 

    } 
  }; 

  return  _static;

})();

var singletonTest  =  SingletonTester.getInstance({
  pointX:  5
});

// 输出: 5
console.log( singletonTest.pointX );
{% endhighlight %}



单例模式更难测试，因为可能有多种多样的问题出现，例如隐藏的依赖关系，很难去创建多个实例，很难清理依赖关系，等等