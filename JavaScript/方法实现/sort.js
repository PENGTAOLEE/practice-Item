/**
 * 方法一
 * 利用array.sort()进行排序
 */
function systemSort(arr){
    return arr.sort(function(a,b) {
    	return a - b;
    })
}

let arr = [1,4,23,543,23,432,6234,3,45]
console.time('sort')
let result = systemSort(arr)
console.timeEnd('sort')
// console.log(result)



/**
 * 方法二
 * 冒泡排序
 * 比较两个相邻的元素，如果第一个比第二个大就交换他们，直到没有任何一对数字需要比较
 */
function bubbleSort(arr) {
    var i,
	j,
	len = arr.length,
	temp;
    for(i = len - 1;0 < i; i--) {
	for(j = 0; j < i; j++){
	    if(arr[j] > arr[j+1]) {
		temp = arr[j];
		arr[j] = arr[j+1];
		arr[j+1] = temp;
	    }
	}
    }
    return arr;
}

let arr1 = [1,4,23,543,23,432,6234,3,45]
console.time('bubble')
let result1 = bubbleSort(arr1)
console.timeEnd('bubble')
// console.log(result1)


/**
 * 方法三
 * 快速排序
 *  在数据集中选择一个元素作为基准
 *  小于基准的元素，移动到基准左边; 大于基准的元素移动到基准的右边
 *  对于基准的左边和右边的两个子集 继续重复上述的操作
 */
function quickSort(arr){
   if (arr.length <= 1) return arr;
   
    // 选择基准点
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex,1)[0];
    
    var left = [];
    var right = [];
  
    for(var i =0; i < arr.length;i++){
	if(arr[i] < pivot){
	    left.push(arr[i])
	} else {
	    right.push(arr[i])
	}
    }

    return quickSort(left).concat([pivot],quickSort(right))
}

let arr2 =  [1,4,23,543,23,432,6234,3,45]
console.time('quick')
let require2 = quickSort(arr2)
console.timeEnd('quick')
