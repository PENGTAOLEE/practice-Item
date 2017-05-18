var jquery = function(selector,context) {
	this.username = 'lipengtao';

	// 直接返回实例，造成死循环了
	// return new jquery();
	

}

jquery.prototype = {
	name: function(){
		console.log(this.username)
	},
	age: function(){
	
	}
}

jquery().name()
