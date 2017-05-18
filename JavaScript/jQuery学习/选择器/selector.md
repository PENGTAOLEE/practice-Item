# jquery选择器

> 检测HTML字符串的表达式
```regexp
rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/
```
使用上面的正则可以匹配到下面的9种选择器

* $(document)   
* $(‘<div>’) 
* $(‘div’) 
* $(‘#test’) 
* $(function(){}) 
* $("input:radio", document.forms[0]); 
* $(‘input’, $(‘div’)) 
* $() 
* $("<div>", { 
         "class": "test", 
         text: "Click me!", 
         click: function(){ $(this).toggleClass("test"); } 
    }).appendTo("body"); 
* $($(‘.test’))

