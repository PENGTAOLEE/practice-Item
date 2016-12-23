var singleton = (function() {
    //传递给单例的一个参数集合
    function Singleton(args) {
        var args = args || {};
        this.name = _static.name;
        this.pointX = args.pointX || 6;
        this.pointY = args.pointY || 8;
    }

    var instance;
    
    var _static = {
        name: 'lipengtao',

        getInstance: function(args) {
            if(instance === undefined) {
                instance = new Singleton(args)
            }
            return instance;
        }
    };
    return _static;
})()

// var single = singleton.getInstance({pointX: 4})
// console.log(single.name)

var a = singleton.getInstance()
var b = singleton.getInstance()
console.log( a === b) // true