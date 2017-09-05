// @队列
class Quene {
	constructor() {
		this.data = [];
		this.front = 0;
		this.rear = 0;
	}
	push(arg) {
		this.data[this.rear] = arg;
		this.rear++
	}

	pop() {
		if (this.isEmpty()) {
			return console.error('队列已经为空，下溢操作')
		}
		return this.data[this.front++]
	}

	size() {
		return this.rear - this.front;
	}

	isEmpty() {
		return this.front === this.rear;
	}

	clear() {
		this.front = this.rear = 0;
	}
}

var q = new Quene()

q.push(1)
q.clear()
q.isEmpty()
q.pop()
console.log(q)