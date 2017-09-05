# SVG学习

## 简介

* SVG意为可缩放矢量图形
* SVG使用XML来描述二维图形和绘图程序的语言
* SVG图像在放大或改变尺寸的情况下其图形质量不会有所损失
* SVG是万维网联盟的标准
* SVG与诸如DOM和XSL之类的w3c标准是一个整体

### 创建SVG文件
svg是XML文件，SVG图像可以用任何文件编辑器创建

### svg 引入
svg代码以`<svg>`元素开始，以`</svg>`关闭标签。这是根元素。
width和height属性可设置此svg文档的宽度和高度
version属性可定义所使用的svg版本
xmlns属性可定义SVG命令空间

stroke和stroke-width属性控制如何显示形状的轮廓
fill属性设置形状内的颜色

所有的开启标签必须有关闭标签

### SVG在HTML页面
svg文件可通过以下标签嵌入HTML文档：`<embed>`/ `<object>` / `<iframe>`

#### 使用<embed>标签
* 优势：所有主要浏览器都支持，并允许使用脚本
* 缺点：不推荐在HTML4和XHTML中使用（在html5中允许）

```html
<embed src="circle1.svg" type="image/svg+xml" />
```

#### 使用<object>标签
* 优势：所有主要浏览器都支持，并支持HTML4，XHTML和HTML5标准
* 缺点：不允许使用脚本

```html
<object data="circle1.svg" type="image/svg+xml"></object>
```

#### 使用<iframe>标签
* 优势：所有主要浏览器都支持，并允许使用脚本
* 缺点：不推荐在HTML4和XHTML中使用（但在html5允许）

```html
<iframe src="circle1.svg"></iframe>
```

#### 直接在HTML嵌入SVG代码

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>
```

#### 链接到SVG文件
可以用`<a>`标签链接到一个SVG文件

```html
<a href="circle1.svg">View SVG file</a>
```

### SVG实例

#### SVG有一些预定义的形状元素

* 矩形 <rect>
* 圆形 <circle>
* 椭圆 <ellipse>
* 线 <line>
* 折线 <polyline>
* 多边形 <polygon>
* 路径 <path>

矩形：

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect width="300" height="100"
  style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
</svg>
```

代码解析：
* rect元素的width和height属性可定义矩形的高度和宽度
* style属性用来定义CSS属性
* CSS的fill属性定义矩形的填充颜色（rgb值，颜色值或者十六进制）
* css的stroke-width属性定义矩形边框的宽度
* CSS的stroke属性定义矩形边框的颜色


