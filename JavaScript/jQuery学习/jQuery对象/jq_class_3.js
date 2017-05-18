var jquery = function(selector,context){
	this.username = "lipengtao";
	return jquery.prototype.init()
}


jquery.prototype = {
	init: function(){
		this.username = "peter";
		return this;
	},

	name: function(){
		console.log(this.username)
	},

	age: function(){
		// coding
	}
}

jquery().name()
