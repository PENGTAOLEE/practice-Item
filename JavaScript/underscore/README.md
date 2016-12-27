# underscore 笔记

## 基础篇

作用域包裹
```javascript
(function() {
    //... 执行逻辑
})()
```

_ 对象
```javascript
// _ 是一个函数对象
var _ = function(obj) {
    if(obj instanceof _) return obj;
    if(!(this.instanceof _)) return new _(obj);
    this._wrapped = obj;
}
```

执行环境判断
```javascript
var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this;
```

如果处于node环境
```javascript
if (typeof exports != 'undefined' && !exports.nodeType) {
  // module 在node环境是一个Object
  if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
  }
  exports._ = _;
} else {
  root._ = _;
}
```

使用 _.noConflict() 重命名underscore对象 
```javascript
var previousUnderscore = root._;
...
_.noConflict = function() {
    // 把_所有权交还给原来的拥有者（比如lodash）
    root._ = previousUnderscore;
    // 返回underscore对象
    return this;
}

// ===================调用================
var underscore = _.noConflict()  // 此时underscore指代underscore对象
```

使用局部变量
```javascript 
// 避免冗长的代码
// 减少了对象成员的访问深度，提升性能
var ArrayProto = Array.prototype,
    ObjProto = Object.prototype,
    FuncProto = Function.prototype;
var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty;
```

处理undefined
```javascript
// ES3 全局的undefined是可以被修改的,使用以下运算获得undefined
void 0;
// or
void(0);
```

