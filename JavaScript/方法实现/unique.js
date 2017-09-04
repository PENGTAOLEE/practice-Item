/**
 * 方法一 
 * 使用set进行去重
 *
 * /
function uniqueBySet(arr) {
    return [...new Set(arr)]
}

// 不同类型的数据【1和‘1’】，会作为不同类型处理
let arr = [1,2,3,4,5,1,2,3,4,5,'1','2']
let result = uniqueBySet(arr);
// console.log(result)


/**
 * 方法二
 * 使用临时数据
 */
function uniqueByArr(arr) {
    let n = []; // 临时数组
    for(var i=0;i<arr.length;i++){
    	if(n.indexOf(arr[i]) == -1 ) n.push(arr[i])
    }
    return n;
}

let arr1 = [1,2,3,4,5,1,2,3,4,5,'1','2','11']
let result1 = uniqueByArr(arr1);
// console.log(result1)

/**
 * 方法三
 * 使用对象字面量
 */
function uniqueByObj(arr) {
    var obj = {},
	i = 0,
	len = 0;
    if(Array.isArray(arr) && arr.length > 0) {
    	len = arr.length;
	for(i=0;i<len;i++) {
	    obj[arr[i]] = arr[i]
	}
	// 去除对象的全部key，返回一个数组
	return Object.keys(obj)
    }
    return []
}

let arr2 = [1,2,3,4,5,1,2,3,4,5,'1','2','11']
let result2 = uniqueByObj(arr2)
console.log(result2)
