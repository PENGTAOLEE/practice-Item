/**
 * lottery
 * @author lipengtao
 */
var $ = function(id) {
	return document.querySelector(id);
}
var LotteryData = {
	current: -1, //当前位置
	count: 0, //奖品数
	speed: 50, 
	times: 0, //已转过的次数
	cycle: 64, //至少转动次数
	prize: 0, //中奖位置默认值: 0
	prizes: [], //存储奖品格子
	numArr:[1,2,3,4,5,6,7,8],
	callback: null, //停止后的行为
	rolling: false,
	timer: null, //定时器
	imgArr: [] //存储奖品图片
}
const map = {
	1: 0,
	2: 1,
	3: 2,
	4: 3,
	5: 4,
	6: 5,
	7: 6,
	8: 7
}

//ES6
class Lottery {
	constructor() {
		
	}

	init() {
		for(var i of LotteryData.numArr) {
			LotteryData.prizes.push($(`.wrapper .p${i}`))
		}
	}

	roll() {
		/**
		 * 转动
		 * 每次当前格子index加一
		 * 当转动到最后一个（7） 跳转到 第一个（0）
		 * 达成条件：
		 * 		1，与返回值一直
		 * 		2，大于最小转动次数
		 * 		3，speed 为 0
		 */
		LotteryData.current += 1
		if (LotteryData.current > 7) {
			LotteryData.current = 0
		}
		var prev = LotteryData.current - 1;
		if (prev < 0) {
			prev = 7
		}
		LotteryData.prizes[prev].classList.remove('on')
		LotteryData.prizes[LotteryData.current].classList.add('on')
	}

	stop() {
		// clearTimeout(LotteryData.timer)
	}
}

const lottery = new Lottery()

const startRoll = () => {
	LotteryData.times += 1;
	lottery.roll();
	if( LotteryData.times > LotteryData.cycle + 8 && LotteryData.prize == LotteryData.current) {
		clearTimeout(LotteryData.timer)
		LotteryData.callback && LotteryData.callback()
	} else {
		if (LotteryData.times >= LotteryData.cycle) {
			LotteryData.speed += 40
		}
		LotteryData.timer = setTimeout(startRoll, LotteryData.speed)
	}
}
/**
 * 生成m..n范围内的随机数
 * @param  {Number} m
 * @param  {Number} n
 * @return {Number}
 */
const getRandom = (m,n) => {
	return Math.floor(Math.random()*(n-m)) + m; 
}
const start = () => {
	if (Lottery.rolling) {
		return
	} else {
		LotteryData.rolling = true
	}
	// 模拟一条数据
	var n = getRandom(1,9);
	console.log(n)
	var o = {"status":"ok","data":{"id":"12a453cf-52f2-4784-aacf-0445c1b306fb","name":`第${n}个格子`,"level":`${n}`}}
	if (o.status == 'ok') {
		let prize = o.data.level;
		LotteryData.prize = map[prize];
		LotteryData.callback = () => {
			LotteryData.rolling = false;
			LotteryData.speed = 50;
			LotteryData.times = 0;
			setTimeout(() => {
				alert(`${o.data.name}`)
			},1000)
		}
		startRoll()
	} else {
		LotteryData.rolling = false;
		console.log(`$(o.message)`)
	}	
}

window.onload = function() {
	lottery.init();
	$('.start').onclick = function() {
		start()
	}
}