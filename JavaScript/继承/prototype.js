function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

// PrimaryStudent 构造函数
function PrimaryStudent(props) {
	// Student.call(this,props);
	this.grade = props.grade || 1;
}

//空函数
function F() {}

// 把F的原型指向Student.prototype
F.prototype = Student.prototype;

// 把PrimaryStudent的原型指向一个新的F对象 F对象的原型正好指向Student.prototype
PrimaryStudent.prototype = new F();

// 把primaryStudent原型的构造函数修复为 primaryStudent
PrimaryStudent.prototype.constructor = PrimaryStudent;

// 创建小明
var xiaoming = new PrimaryStudent({
	name: '小明',
	grade: 2
})

console.log(xiaoming.name)
