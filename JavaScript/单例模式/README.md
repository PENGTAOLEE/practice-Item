# JavaScript 单例模式

在JavaScript里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象

## 使用对象字面量 【not single】

```javascript
// 字面量可以包含大量的属性 && 方法 
var singleton = {
    name1: "xiaoming",
    name2: "xiaohong",
    method1: function() {
        //do something
    }
}
```

## 借助函数返回值 【not single】

```javascript
/*如果以后要扩展该对象，你可以添加自己的私有成员和方法，然后使用闭包在其内部封装这些变量和函数声明。只暴露你想暴露的public成员和方法*/
var singleton = function() {

    /* 这里声明私有变量和方法 */
    var privateVariable = 'something private';
    function showPrivate() {
        console.log(privateVariable)
    }

    /* 公共变量和方法 */
    return {
        // 内部可以访问上面定义的私有属性和方法
        publicVariable = "the public can see this!",
        publicMethod: function() {
            showPrivate()
        }
    }

} 

var single = singleton()
console.log( single.privateVariable ) // undefined
console.log( single.showPrivate() ) // 报错
console.log( single.publicVariable ) // "the public can see this!"
single.publicMethod() // something private
```

## 成型单例

```javascript
/*只有在使用的时候才初始化*/
var singleton = (function() {
    // 私有属性和方法
    var privateVariable = "something private";
    var instantiation;
    function init() {
        return {
            // 公有属性和方法
            publicMethod: function() {
                //do something
            },
            publicVariable: "something public"
        }
    }

    return {
        getInstance: function() {
            if(!instantiation) {
                instantiation = init()
            }
            return instantiation;
        }
    }
})()

//调用公有方法来获取实例
singleton.getInstance().publicMethod() 
```

## 单例最佳实践

```javascript
var singleton = (function() {
    //传递给单例的一个参数集合
    function Singleton(args) {
        args = args || {};
        this.name = 'SingletonTester';
        this.pointX = args.pointX || 6;
        this.pointY = args.pointY || 8;
    }

    var instance;
    
    var _static = {
        name: 'SingletonTester',

        getInstance: function(args) {
            if(instance === undefined) {
                instance = new Singleton(args)
            }
            return instance;
        }
    };
    return _static;
})()

var single = singleton.getInstance({pointX: 4})

single.pointX
```
