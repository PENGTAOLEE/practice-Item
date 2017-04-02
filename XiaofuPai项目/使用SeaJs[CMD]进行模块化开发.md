# Seajs 模块化开发

> 项目结构
``` bash
    .
    ├── README.md
    ├── res
    │   ├── css
    │   ├── img
    │   ├── js
    │	│   ├── module
    │	│   │	  ├── component1
    │	│   │	  │	├── index.html
    │	│   │	  │	├── index.js
    │	│   │	  │	└── index.css
    │	│   │	  │	...
    │	│   │	  └── componentN
    │	│   │
    │   │   ├── app.js
    │	│   ├── router.js
    │	│   ├── utils.js
    │	│   └── ajax.js
    │   │
    │   ├── lib
    │	│   ├── jquery
    │	│   ├── vue
    │	│   │   ...
    │	│   └── SEA.JS
    │   ├── index.html
    └── static
```

> 在index.html文件中初始化sea.js
```html
...
<div id="app">
    <router-view></router-view>
    <my-footer></my-footer>
</div>

// 配置seajs
seajs.config({
    base : "/res/js",
    alias : {
        "atest" : "test.js",
    }
});

// 加载一个模块
seajs.use('app.js');
``` 

> 在单个组件中资源项目依赖
```javascript
// js
define(function(require,exports,module) {
	var footer = require("module/footer/footer");
    var showAlert = require("module/showAlert/showAlert");
    var ajax = require("ajax");
	require("module/application/application.css");
	return {
		// vue实例
	}
});

// html 
<div class="page">
	...
</div>

// css
...

```

> app.js 初始化Vue

```javascript
var router = require("./router.js");
var app = new Vue({
    router : router,
    components: {
        'my-footer': Footer
    }
}).$mount("#app");
```

> router.js Vue路由配置
```javascript
define(function(require, exports, module){   
	var routes = [
		{
           path:"/",
           component:function(resolve){
           		// sea加载一个模块
                seajs.use("module/banner/banner",resolve);
           },
           children: [
                {
                    path: "index",
                    component:function(resolve){//热门
                        seajs.use("module/indexhot/hot",resolve);
                    }
                },
                {
                    path: "follow",//关注
                    component:function(resolve){
                        seajs.use("module/indexfollow/follow",resolve);
                    }
                }
            ] 
        },
        {
			// 配置 404页面
            path: "*",
            component : function(resolve){
                seajs.use('module/notFound/notFound', resolve);
            }
        }
	]

	return new VueRouter({
        mode : "history",
        routes : routes,
        scrollBehavior: function(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
            //$(window).unbind();
        }
    })
}
```




**************************************************************************
## 留存文件只供个人使用  不开放交流
