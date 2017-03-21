# Sesjs导出构造函数

```javascript
// Dialog.js
define(function(require, exports, module) {

    function Dialog(type) {
        this.type = type || {};
    }
    
    Dialog.portotype.init = fuction() {
        doSomething()...
    }
    
    Dialog.createDom = function() {
        doSomething()...
    }
    
    module.exports = Dialog;
});
```

> 今天使用阿里云oos上传图片，用到plupload，需要使用seajs包装并导出一个构造器

> 调用的时候

```javascript
	define(function(require, exports, module) {
		var Dialog = require('Dialog/Dialog');
		console.log(Dialog);
		var log = new Dialog();
		log.init();
	});
```