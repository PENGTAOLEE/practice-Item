/**
 * JavaScript 设计模式之单例模式
 * @author lpt
 */
// 对象字面量方式【最简单的方式】
var singleton = {
    name1: "xiaoming",
    name2: "xiaohong",
    method1: function() {
        console.log("调用了methos")
    }
}

console.log(singleton.name1) // xiaoming
singleton.method1() // 调用了methos

