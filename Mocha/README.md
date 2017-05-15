# Mocha 学习
```bash
npm install -g mocha
```
## 测试脚本的写法
Mocha 的作用是运行测试脚本。所谓测试脚本，就是用来测试源码的脚本。

一个加法模块
```javascript
// add.js
function add(x,y) {
	return x + y;
}

module.exports = add;
```
要测试这个加法模块是否正确，就要写测试脚本

通常，测试脚本与所测试的源码脚本同名，但是后缀名为 .test.js(表示测试) 或者 .spec.js(表示规格)
比如 add.js 的测试脚本名字就是 add.test.js

```javascript
// add.test.js
var add = require('./add.js');
var expect = require('chai').expect;

describe('加法函数的测试',function(){
	it('1 加 1 应该等于 2', function(){
		expect(add(1,1)).to.be.equal(2);
	})
})
```
测试脚本里面应该包括一个或多个describe块 每个describe块应该包括一个或多个it块

describe块称为“测试套件”，表示一组相关的测试，它是一个函数，第一个参数是测试套件的名称，第二个参数是一个实际执行的函数

it块称为“测试用例”， 表示一个单独的测试，是测试的最小单位， 第一个参数是测试用例的名称，第二个参数是实际执行的函数

## 断言库的用法

```javascript
expect(add(1,1)).to.be.equal(2);
```
所谓“断言”，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误

所有的测试用例（it块）都应该含有一句或多句的断言。它是编写测试用例的关键 ，断言功能由断言库来实现，
MOcha不带断言库，所以必须先引入断言库
```javascript
var expect = require('chai').expect;
```
expect断言的优点是很接近自然语言
```javascript
// 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({bar: 'baz'});

// 布尔值为true
expect('everthing').to.be.ok;
expect(false).to.not.be.ok;

// typeof
expect('test').to.be.a('string');
expect({foo: 'bar'}).to.be.an('object')
expect(foo).to.be.an.instanceof(Foo);

// include
expect([1,2,3]).to.include(2);
expect('footer').to.contain('foo');
expect({foo:'bar',hello: 'universe'}).to.include.keys('foo');

// empty
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// match
expect('foobar').to.match(/^foo/);
```
基本上，expect断言的写法都是一样的，头部是expect方法，尾部是断言方法 equal a/an ok match等
两者之间使用 to 或者 to.be 连接

如果expect断言不成立，就会抛出一个错误 

## Mocha的基本用法
有了测试脚本以后，就可以用MOcha运行它

mocha命令后面紧跟测试脚本路径和文件名，可以指定多个测试脚本
```bash
mocha file1 file2 file3
```

Mocha默认运行test子目录里面的测试脚本
一般都会把脚本测试放在test目录里面，然后执行mocha就不需要参数了

test目录下所有测试用例都会（不管在哪一层），都会执行
```bash
mocha --recursive
```
## 通配符

命令行指定测试脚本时，可以使用通配符，同时指定多个文件

```bash
mocha spec/{my,awesome}.js

mocha test/unit/*.js
```
第一条命令，指定执行 spec 目录下面的 my.js 和 awesome.js 
第二条命令，指定执行test/unit 目录下面的所有js文件

除了使用Shell通配符，还可以使用 Node通配符
```bash
mocha 'test/**/*.@(js|jsx)'
```
上面代码指定运行 test 目录下面任何子目录中，文件后缀名为 js或者jsx 的测试脚本
Node的通配符放在单引号中，否则星号(*) Shell解释

## 命令行参数
查看Mocha的所有命令行参数
> mocha --help 

指定测试报告的格式，默认是spec格式
> mocha 
等同于
> mocha --reporter seec

使用mochawesome m模块 可以生成漂漂亮亮的HTML格式的报告
> npm install --save-dev mochawesome
> ../node_modules/.bin/mocha --reporter mochawesome

上面代码中，mocha命令使用项目内安装的版本，而不是全局安装的版本，因为 mochawesome模块是安装在项目内的
然后测试结果报告就在 mochawesome-reports子目录下生成

监听指定的测试脚本。只要测试脚本有变化，就会自动运行mocha
> mocha --watch

只要有一个测试用例没通过，就停止执行后面的测试 （对于持续集成很有用）
> mocha --bail

用于搜索测试用例的名称（即it块的第一个参数），然后执行匹配的测试用例
> mocha --grep "1 加 1"

## 配置文件mocha.opts
Mocha 允许在 test目录下面，配置文件 mocha.opts, 把命令行参数写在里面 

```bash
// mocha.opts
--reporter tap
--recursive
--growl

### 如果测试用例不是存放在test子目录下，可以在mocha.opts配置
server-tests
--recursive

### 以上指定 server-tests 目录之下的测试脚本
```
> Babel默认不会对Iterator、Generator、Promise、Map、Set等全局对象,以及一些Object.assign转码
> 如果你想对这些对象转码，请安装 babel-polyfill
> npm install babel-polyfill

## 改变默认的超时限制
> mocha -t 5000 timeout.test.js

## Mocha 内置对 Promise的支持
允许直接返回 primise对象 等到它的状态改变，再执行断言，而不是显示调用 done() 方法

## 测试用例钩子
Mocha在 describe块中，提供测试用例的四个钩子 
* before()
* after()
* beforeEach()
* afterEach()

```javascript
describe('hooks',function(){
	before(function(){
		// 在本区块的所有测试用例之前执行
	});
	after(function(){
		// 在本区块所有测试用例之后执行
	});
	beforeEach(function(){
		// 在本区块的每个测试用例之前执行
	});
	afterEach(function(){
		// 在本区块的每个测试用例之后执行
	})

	// test cases
})
```

## 测试用例管理
大型项目有很多测试用例，有时我们希望只运行其中的一部分，这是可以用only方法
describe/it块都允许调用only方法表示只运行某个测试套件或测试用例
```javascript
it.only('1 加 1 应该等于 2', function() {
  expect(add(1, 1)).to.be.equal(2);
});

it('任何数加0应该等于自身', function() {
  expect(add(1, 0)).to.be.equal(1);
});
```
skip方法： 表示跳过指定的测试用例或测试套件
```javascript
it.skip('mocha-name',functon(){
	expect(add(1,0)).to.be.equal(1)
})
```


