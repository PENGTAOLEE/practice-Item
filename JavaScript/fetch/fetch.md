# JavaScript fetch
fetch方法返回一个Promise对象, 根据 Promise Api 的特性, fetch可以方便地使用then方法将各个处理逻辑串起来, 使用 Promise.resolve() 或 Promise.reject() 方法将分别返会肯定结果的Promise或否定结果的Promise, 从而调用下一个then 或者 catch. 一但then中的语句出现错误, 也将跳到catch中.

Fetch API  提供了一个 JavaScript接口，用于访问和操纵HTTP管道的部分，例如请求和响应。它还提供了一个全局 fetch()方法，该方法提供了一种简单，合乎逻辑的方式来跨网络异步获取资源。

这种功能以前是使用  XMLHttpRequest实现的。Fetch提供了一个更好的替代方法

fetch 规范与 jQuery.ajax() 主要有两种方式的不同:
* 从 fetch()返回的 Promise 将不会拒绝HTTP错误状态, 即使响应是一个 HTTP 404 或 500。相反，它会正常解决 (其中ok状态设置为false),  并且仅在网络故障时或任何阻止请求完成时，它才会拒绝。
* 默认情况下, fetch在服务端不会发送或接收任何 cookies, 如果站点依赖于维护一个用户会话，则导致未经认证的请求(要发送 cookies，必须发送凭据头).

## 进行 fetch 请求
```JavaScript
let myImage = document.querySelector('img');

fetch('flowers.jpg')
.then(function(response) {
    return response.blob();
})
.then(function(myBlob) {
    let objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
});
```
以上代码中，我们通过网络获取了一个图片，然后将它插入到一个 <img> 标签中。这个最简单的用法中，fetch() 接受了一个参数——请求的地址——然后返回一个包含 response（一个 Response 对象）的 promise 对象。

## 功能检测
Fetch API 的支持情况，可以通过检测 Headers、Request、Response 或 fetch() 是否在 Window 或 Worker 域中。
```JavaScript
if(self.fetch) {
    // run my fetch request here
} else {
    // do something with XMLHttpRequest?
}
```

## 自定义请求的参数
fetch() 接受第二个可选参数，一个可以控制不同配置的 init 对象

```JavaScript
var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

fetch('flowers.jpg',myInit)
.then(function(response) {
  return response.blob();
})
.then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});
```
## 检测请求是否成功
如果遇到网络故障，fetch() promise 将会 reject，带上一个 TypeError 对象。虽然这个情况经常是遇到了权限问题或类似问题——比如 404 不是一个网络故障。想要精确的判断 fetch() 是否成功，需要包含 promise resolved 的情况，此时再判断 Response.ok 是不是为 true。
一个栗子：
```JavaScript
fetch('flowers.jpg').then(function(response) {
  if(response.ok) {
    response.blob().then(function(myBlob) {
      var objectURL = URL.createObjectURL(myBlob);
      myImage.src = objectURL;
    });
  } else {
    console.log('Network response was not ok.');
  }
})
.catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});
```

## 自定义请求对象

除了传给 fetch() 一个资源的地址，你还可以通过使用 Request() 构造函数来创建一个 request 对象，然后再作为参数传给 fetch()：

```JavaScript
var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var myRequest = new Request('flowers.jpg', myInit);

fetch(myRequest).then(function(response) {
  return response.blob();
}).then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});
```

Request() 和 fetch() 接受同样的参数。你甚至可以传入一个已存在的 request 对象来创造一个拷贝：
> var anotherRequest = new Request(myRequest,myInit);

这个很有用，因为 request 和 response bodies 只能被使用一次。创建一个拷贝就可以再次使用 request/response 了，当然也可以使用不同的 init 参数。

## mode
fetch可以设置不同的模式使得请求有效. 模式可在fetch方法的第二个参数对象中定义.
> fetch(url, {mode: 'cors'});

可定义的模式如下:
* same-origin: 表示同域下可请求成功; 反之, 浏览器将拒绝发送本次fetch, 同时抛出错误 “TypeError: Failed to fetch(…)”.
* cors: 表示同域和带有CORS响应头的跨域下可请求成功. 其他请求将被拒绝.
* cors-with-forced-preflight: 表示在发出请求前, 将执行preflight检查.
* no-cors: 常用于跨域请求不带CORS响应头场景, 此时响应类型为 “opaque”.

## Headers
使用 Headers 的接口，你可以通过 Headers() 构造函数来创建一个你自己的 headers 对象。一个 headers 对象是一个简单的多名值对：

```javascript
var content = "Hello World";
myHeaders = new Headers({
  "Content-Type": "text/plain",
  "Content-Length": content.length.toString(),
  "X-Custom-Header": "ProcessThisImmediately",
});
```

它的内容可以被获取：
```javascript
console.log(myHeaders.has("Content-Type")); // true
console.log(myHeaders.has("Set-Cookie")); // false
myHeaders.set("Content-Type", "text/html");
myHeaders.append("X-Custom-Header", "AnotherValue");

console.log(myHeaders.get("Content-Length")); // 11
console.log(myHeaders.getAll("X-Custom-Header")); // ["ProcessThisImmediately", "AnotherValue"]

myHeaders.delete("X-Custom-Header");
console.log(myHeaders.getAll("X-Custom-Header")); // [ ]
```
如果使用了一个不合法的HTTP Header属性名，那么Headers的方法通常都抛出 TypeError 异常。如果不小心写入了一个不可写的属性，也会抛出一个 TypeError 异常。除此以外的情况，失败了并不抛出异常。

```javascript
var myResponse = Response.error();
try {
  myResponse.headers.set("Origin", "http://mybank.com");
} catch(e) {
  console.log("Cannot pretend to be a bank!");
}
```

## Response 对象
Response 实例是在fentch()处理完promises之后返回的.

它的实例也可用通过JavaScript来创建, 但只有在ServiceWorkers中才真正有用,当使用respondWith()方法并提供了一个自定义的response来接受request时:

```javascript
var myBody = new Blob();
> `Response()` 构造方法接受两个可选参数`response的数据体`和`一个初始化对象(与Request()所接受的init参数类似.)`

addEventListener('fetch', function(event) {
  event.respondWith(new Response(myBody, {
    headers: { "Content-Type" : "text/plain" }
  });
});
```
```

你会用到的最常见的response属性有:
* Response.status — 整数(默认值为200) 为response的状态码.
* Response.statusText — 字符串(默认值为"OK"),该值与HTTP状态码消息对应.
* Response.ok — 如上所示, 该属性是来检查response的状态是否在200-299(包括200,299)这个范围内.该属性返回一个Boolean值.

## Body
不管是请求还是响应都能够包含body对象. body也可以是以下任意类型的实例.

* ArrayBuffer
* ArrayBufferView (Uint8Array and friends)
* Blob/File
* string
* URLSearchParams
* FormData

Body 类定义了以下方法 (这些方法都被 Request 和Response所实现)以获取body内容. 这些方法都会返回一个被解析后的promise对象和数据.
* arrayBuffer()
* blob()
* json()
* text()
* formData()

请求体可以由传入body参数来进行设置:
```javascript
var form = new FormData(document.getElementById('login-form'));
fetch("/login", {
  method: "POST",
  body: form
})
```
