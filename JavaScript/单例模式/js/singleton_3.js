var singleton = (function() {
    var privateVariable = "something private";
    var instantiation;
    function init() {
        return {
            // 作为公有属性和方法 暴露出去
            publicMethod: function() {
                console.log( privateVariable )
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
console.log(singleton) // 使用的时候调用 getInstance 进行实例化
// 调用
console.log( singleton.privateVariable ) // undefined

singleton.getInstance().publicMethod() // 'something private'

