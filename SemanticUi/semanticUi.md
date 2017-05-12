# SemanticUI

## 安装环境 [Mac环境]
> brew install node
> sudo npm install -g gulp

##  semanticUI
进入项目的静态文件目录
执行 
> npm install semantic-ui --save

例如设置Semantic UI 目录为 ./semantic
> mkdir my-semantic
> cd my-semantic
如果是windows并且使用git Bash安装会报错  请使用cmd安装 并手动创建 package.json文件
> npm install semantic-ui --save

设置Semantic UI
> 使用上下箭头选择即可
* Automantic: 自动配置，一切使用默认的设置
* Express: 快速配置，只需要设置组件还有输出目录
* Custom: 自定义，完全自己去定义 src/dist 目录

执行编译命令
> cd semantic
> gulp build

编译好的 Semantic UI 回访在 dist这个目录下面
components/ 目录下是一些单独的一些组件

## 使用Semantic UI
使用Semantic UI,只需要在HTML文件头部引入如下文件即可
```HTML
<script src="http://upcdn.b0.upaiyun.com/libs/jquery/jquery-2.0.2.min.js"></script>
<link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css">
<script src="semantic/dist/semantic.min.js"></script>
```
## 使用Browsersync
监听项目下的某个文件（index.html）的变化 
这样修改了这个文档以后就不需要手动去刷新浏览器来查看变化了
> npm install -g browser-sync

> cd ~/Desktop/my-semantic
> browser-sync start --server --no-notify --files "index.html"

## 使用Ui组件
> 直接使用 对应样式的class即可 


