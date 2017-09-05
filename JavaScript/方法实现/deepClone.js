// 检测对象
const isObject = obj => Object.prototype.toString(obj) === '[object Object]';

// 检测数组
const isArray = array => Array.isArray(array);

// 静态数据
let mine = {
  name: 'lpt',
  age: 24,
  work: ['web', {
  	'aa': 111
  }],
  obj: {
    arr: [1,2,3,4,5]
  }
};

const deepClone = target => {
	
	// 非对象情况
	if (target == null || typeof target != 'object') {
		return target;
	};

	// 结果对象
	let result = isArray(target) ? [] : {};

	for(let key in target) {
		if ( target.hasOwnProperty(key) ) {
			let value = target[key]
			if (value === target) {
        continue;
      }

      if ( isObject(value) || isArray(value) ) {
        result[key] = deepClone(value)
      } else {
        result[key] = value;
      }
		};
	}
	return result;
}

const copyObj =  deepClone(mine);
copyObj.name = 'zdd';
console.log(mine.name)
console.log(copyObj.name)

