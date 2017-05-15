# 开发webapp

## webkit内核 部分私有化meta标签
强制让文档的宽度与设备的宽度保持1:1，并且不允许用户点击屏幕放大浏览
> <meta content="width=device-width,initial-scale=1.1,maximum-scale=1.1,user-scalable=0;" name="viewport"/>

iphone设备中的safari私有meta标签，表示：允许全屏模式浏览
> <meta content="yes" name="apple-mobile-web-app-capable" />

iphone设备私有属性，指定iphone中Safari顶端的状态栏样式
> <meta content="black" name="apple-mobile-web-app-status-bar-style"/>

告诉设备忽略将页面中的数字识别为电话号码
> <meta content="telephone=no" name="format-detection"/>

## 使用css3边框背景属性
> 使用 -webkit-border-image 定义按钮样式

## 去除Android平台中对邮箱地址的识别
> <meta content="" email="no" name="format-detection" />

## 去除IOS 和Android中的输入url的控件条
> setTimeout(scrollTo,0,0,0);
这句代码必须放到window.onload里面才能正常使用

## 关闭IOS中键盘自动大写
> 移动版本为input元素提供了 autocapitalize属性，指定 autocapitalize="off" 关闭键盘默认首字母大写

## ios中禁止用户保存图片、复制图片
> 为img标签指定 -webkit-touch-callout 为 none禁止设备弹出列表按钮

## ios中禁止用户选中文字
> 指定文字标签的 -webkit-user-select属性为none便可以禁止ios用户选中文字

# 单页应用
优点：页面切换流畅 响应很快 
定义：一个页面上集成多种功能，甚至整个系统就只有一个页面，所有的业务功能都是他的子模块，通过特定的方式挂接到主界面上

## 代码合并与加载策略
把更过的公共部分放到首次加载，以减少每次加载的载入量

渲染界面：新渲染的页面来源一般两种：即时请求，像请求数据那样请求ajax;另一种是内置于主界面的某些部分，后者在切换功能的时候速度有优势，但是加重了主页面的负担

## 路由与状态管理
传统的页面型产品是以页面为单位的
单页应用的做法：把产品划分为若干状态，每个状态映射到响应的路由，然后通过pushState这种机制，动态解析路由，使之与功能界面匹配

## 缓存与本地存储
单页应用的前端部分存在大量的静态文件，对静态文件利用浏览器缓存机制，而对于动态加载的界面模板应用自定义的加载机制
使用 localStorage 或者 sesionStorage

## 服务器通信
使用WebSocket
WebSocket与传统基于http的通信机制相比，有很大的优势。他可以让服务器很便利的使用反向推送，前端只响应确定产生业务数据的时间，减少一遍一遍的AJAX轮询

## 缺陷
因为单页应用的绝大部分都是动态生成的，所以索索引擎很不容易索引到它


