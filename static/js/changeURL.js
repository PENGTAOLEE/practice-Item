(function(){
	var p = [
		['��Ƶ','http://www.2221.com/wangmei.htm'],
		['С˵ ','http://www.2221.com/book.htm'],
		['��Ϸ','http://www.2221.com/game.htm'],
		['����','http://www.2221.com/music.htm'],
		['����','http://www.2221.com/game.htm'],
		['����','http://www.2221.com/sport.htm'],
		
		['����','http://www.2221.com/netbuy.htm'],
		['�̳� ','http://www.2221.com/netbuy.htm'],
		['�Ź�','http://www.2221.com/netbuy.htm'],
		['Ů��','http://www.2221.com/manwoman.htm'],
		['����','http://www.2221.com/club.htm'],
		['����','http://www.2221.com/car.htm'],
		
		['����','http://www.2221.com/newsweek.htm'],
		['����','http://www.2221.com/junshi.htm'],
		['�ƾ�','http://www.2221.com/stock.htm'],
		['����','http://www.2221.com/love.htm'],
		['��Ƹ','http://www.2221.com/rencai.htm'],
		['����','http://www.1155.com/zhaoshangjiameng/?1'],
		
		['����','http://www.2221.com/mail.htm'],
		['����','http://www.2221.com/hardware.htm'],
		['����','http://www.2221.com/bankjt.htm'],
		['�ֻ� ','http://www.2221.com/shouji.htm'],
		['�ռ�','http://www.2221.com/blog.htm'],
		['����','http://www.2221.com/club.htm']
	];

	for(var i=0;i<p.length;i++){
		var url = p[i][1];
		var getAtage = function(id){
			return (document.getElementById(id)).getElementsByTagName("a")[0];
		}
		var j =i+1;
		getAtage("more_l_"+j).href=url;
		getAtage("more_r_"+j).href=url;
		//console.log(j,url)
	}
})();
document.oncontextmenu = hideContextmenu;
function hideContextmenu(){  
	return false;
}