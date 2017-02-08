// html
/**
 * 1, HTML5没有使用SGML或者XHTML ，是一套全新的东西
 * 		<! DOCTYPE html> ：不需要书写DTD
 * 		新添加的标签 <header> :代表html头部数据
 * 					 <nav>  ： 页面导航元素
 * 					 <article> ：自包含的内容
 * 					 <section> ：使用内部article去定义区域或者把分组内容放到区域里
 * 					 <sidebar> ：工具栏   
 * 					 <aside> ：代表页面的侧边栏内容
 * 					 <footer> ：html底部
 * 		HTML5 中的dataList是什么：
 * 			Datalist元素有助于提供文本自动完成特性
			<input list="Country">
			<datalist id="Country">
			  <option value="India">
			  <option value="Italy">
			  <option value="Iran">
			  <option value="Israel">
			  <option value="Indonesia">
			</datalist>
		HTML5 新的表单元素类型
			color ： 颜色选择
			Date ： 日期对话框
			Email ： 邮箱
			Url ： url验证
			Range ： 范围控制
			Telephone ： 手机号
			Number ： 文本展示数字范围
			Time ： 只能输入时间
			Search ： 搜索框
		SVG 可缩放矢量图形 基于文本的图形语言 使用文本，线条，点等来进行图像绘制
			分辨路率无关
			处理事件处理

		Canvas HTML中绘制图形的区域  分辨率相关 不能绘制事件的相关处理
			<canvas> 
			var ctx = c.getContext("2d")
				ctx.moveTo(10,10)
				ctx.lineTo(200,100)
				ctx.stock() 绘制结束

				ctx.rext(20,20,150,100)
				ctx.stroke()
		Web worker帮助我们用异步执行JavaScript文件 

		Web Worker线程的限制是什么：
			Web worker线程不能修改HTML元素、全局变量、和Window.location一类的窗口属性

		如何在JS中创建一个worker线程：
			创建一个worder线程，需要通过JavaScript文件名创建worder对象
			var worder = new Worker("MyhEAVYpROCESS.JS");
			worker.postMessage();
			当worker线程发送数据的时候，我们在调用结束的时候，通过”onMessage”事件获取

			终止Web Worker 
			worker.terminate()

		HTML5本地存储
			localStorage : 永久
			sessionStorage : 临时

			localStorage.setItem("aaa","111");
			localStorage.getItem("aaa")



 * 		
 */
// CSS
/**
 * 超链接
 *  a:link    {color:green;}
	a:visited {color:green;}
	a:hover   {color:red;}
	a:active  {color:yellow;}
 * CSS使用列布局
 * colum-count: 3;  // 划分为3列
 * column-gap:20px;  // 两列之间的差距
 * column-rule:6px outset #ff00ff; // 列之间划一条线
 *
 * 阴影文本效果 text-shadow: x y deep color;
 *
 * word-wrap: break-word; 
 *
 * CSS兼容性问题
 * 	1，margin加倍问题
 * 		设置为float的div在ie下设置的margin会加倍
 * 		解决：设置div display:inline;
 * 	2, IE与宽度和高度的问题
 * 		ie不认的min- 这个定义 但会把正常的width解析为 min-width
 * 		解决：width: auto; min-heihgt: 80px;
 * 	3, Div浮动 ie文本产生3px的bug 
 * 		解决：左边设置 margin-right: -3px;
 * 	4，IE捉迷藏问题
 * 		有些元素显示不出来
 * 		解决：设置line-height 或者 使用固定宽高
 * 	5，ie7 float:right 不生效
 * 		解决：使用position: right;设置
 * 	6，ie display:inline-block;不成功
 * 		解决：使用display:block; float;
 * 	7, 火狐float div必须与具有float同级的div同级 之间不能存在嵌套关系
 * 		并且需要设置 .clear{ clear:box; }
 *  8, 当包含float的div时，高度自适应在IE下无效，这时候应该触发 zoom:1;
 *  	并且设置 overflow:hidden;
 *  9, cursor: pointer;
 *  	filter: alpha(60)
 *  	opacity: .6;
 *  	
 */

// JavaScript
Js兼容性问题：
/**
 * 事件
 * window.event  //IE下
 * event        // 标准浏览器直接从参数获取事件对象
 *
 * mouse相对客户端的坐标
 * IE :
 * 		event.x
 * 		event.y
 * 标准 ：
 * 		event.pageX
 * 		event.pageY
 *
 * 触发事件的元素
 * IE :
 * 		event.srcElement
 * 标准 ：
 * 		event.target
 * 	var obj = event.srcElement ? event.srcElement : event.target;
 * 	var currentObj = event.currentTarget ? event.currentTarget : this;
 *
 * window.location.href 
 * window.location
 *
 * 使用window.document.getElementId("frameId");
 *
 * IE   document.body.onload = fn;
 * 标准 document.body.onload = fn();
 *
 * 访问父元素
 * 		在IE下 使用obj.parentElement 或 obj.parentNode访问父节点
 * 		标准   使用obj.parentNode 访问父节点
 *
 * Table操作问题
 *
 * 对象宽高复制问题
 * 		obj.style.height = xxx + 'px'
 *
 * JQuery 面试题
 * 	jQuery.noConflict() 将变量$的控制权交给其他库
 * 	遇到的问题
 * 		$.ajax()返回值一直有问题 返回之前的值 并且未执行url
 * 		解决 : 未设置 type 
 * 	选择器： 基本选择器 层次选择器 过滤选择器 表单选择器
 * 	使用$("li").get(index) 得到相应的dom对象
 * 	get / post 区别：
 * 		 get请求会将参数跟在URL后进行传递，POST请求则是作为HTTP消息的实体内容发送给Web服务器的，这种传递是对用户不可见的
 * 		 get方式传输的数据大小不能超过2KB 而POST要大的多
 * 		 GET 方式请求的数据会被浏览器缓存起来，因此有安全问题。
 * 	jq操作 样式
 * 		addClass() removeClass()  toggle()
 *
 *	jq 动画
 *		hide() / show()
 *		fadeIn() / fadeOut() / fadeTo()
 *		slideUp() / slideDown() / slideToggle()
 *		animate({style},speed,eading,callback)
 *	jquery 使用哪些插入节点
 *		append()
 *		appendTo()
 *		prepend()
 *		prependTo()
 *		after()
 *		insertAfter()
 *		before()
 *		indertBefore()
 *	包裹节点
 *		wrapAll()
 *		wrap()
 *		wrapInner()
 *		插入额外结构化标记而不改变原始文档
 *	设置属性
 *		attr()  /  removeAttr()
 *
 * 	childer() 取得匹配元素的子节点元素集合，不考虑后代
 * 	next() 获取紧跟元素后面紧邻的同辈元素
 * 	prev() 取得匹配元素前面紧邻的同辈元素
 * 	sinlings() 获取同辈所有前后的元素
 * 	find() 获取匹配元素集合 包括子代和后代
 *
 *	beforeSend作用
 *	xmlhttpRequest 如果beforeSend返回false 取消本次交互 用于检测
 *
 *	$('prev~div') 获取子节点 与find() 不一定
 *	:first  第一个
 *	:last 最后一个
 *	:even 偶数
 *	:odd 奇数
 *	: eq(index) 查询第几个
 *	:gt(index)  查询大于
 *	:lt(index)  查询小于
 *
 * 	nextAll() 与 $('prev ~ siblings') 一样
 *
 *  $(document).ready() DOM载入然后进行操作
 *  window.onload  网页中所有元素完全加载
 *
 *  jQuery如何处理缓存
 *  	要处理缓存就是禁用缓存
 *  		通过$.post() 方法来获取数据，那么默认就是禁用缓存的
 *  		过$.get()方法 来获取数据，可以通过设置时间戳来避免缓存。可以在URL后面加上+(+new Date)例 $.get('ajax.xml?'+(+new Date),function () { //内容 })
 *    		通过$.ajax 方法来获取数据，只要设置cache:false即可
 *
 *  $.getScript()方法 和 $.getJson() 方法有什么区别？
 *  	$.getScript() 方法可以直接加载.js文件，并且不需要对javascript文件进行处理，javascript文件会自动执行
 *  	$.getJson() 是用于加载JSON 文件的 ，用法和$.getScript() 
 *
 *  radio单选组的第二个元素为当前选中值，该怎么去取？
 *  	$('input[name=items]').get(1).checked = true; 
 *
 *  在ajax中data主要有几种方式？
 *  	三种，html拼接的，json数组，form表单经serialize()序列化的。
 *
 *  stopPropagation（） 阻止冒泡
 *  event.preventDefault() 阻止默认

 * jQuery事件绑定的几种形式
 * 		1, 只能添加到已经存在的元素上
 * 		bind() 
 * 		$(selector).bind(event,data,function)
 * 		$(selector).bind("click dbclick mouseout",data,function);
 *
 * 		2. 事件代理 冒泡 效率比较差
 * 		live() 
 * 		　$(selector).live(event,data,function)
 * 		　$(selector).live("click dbclick mouseout",data,function);
 *
 * 		3, 事件代理 冒泡 效率比较高
 * 		delegate() 
 * 			$(selector).delegate(childSelector,event,data,function)
 *
 * 		4, on() 
 * 		$(selector).on(event,childselector,data,function)
 *
 * 		删除事件
 * 		off()
 * 		 
 * 	
 * 
 */