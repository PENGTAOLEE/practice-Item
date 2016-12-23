// 借助函数返回值
var singleton = function() {

    /* 这里声明私有变量和方法 */
    var privateVariable = 'something private';
    function showPrivate() {
        console.log(privateVariable)
    }

    /* 公共变量和方法 */
    return {
        // 内部可以访问上面定义的私有属性和方法
        publicVariable: 'the public can see this!',
        publicMethod: function() {
            showPrivate()
        }
    }

} 

// var single = singleton()
// console.log( single.privateVariable ) // undefined
// console.log( single.showPrivate() ) // 报错 single.showPrivate is not a function
// console.log( single.publicVariable ) // "the public can see this!"
// single.publicMethod() // something private
// console.log(singleton())

// 到这一步并不是成型的单例
var a = singleton()
var b = singleton()
console.log(a === b) // false