(function(){
	var p = [
		['视频','http://www.2221.com/wangmei.htm'],
		['小说 ','http://www.2221.com/book.htm'],
		['游戏','http://www.2221.com/game.htm'],
		['音乐','http://www.2221.com/music.htm'],
		['酷玩','http://www.2221.com/game.htm'],
		['体育','http://www.2221.com/sport.htm'],
		
		['购物','http://www.2221.com/netbuy.htm'],
		['商城 ','http://www.2221.com/netbuy.htm'],
		['团购','http://www.2221.com/netbuy.htm'],
		['女性','http://www.2221.com/manwoman.htm'],
		['生活','http://www.2221.com/club.htm'],
		['汽车','http://www.2221.com/car.htm'],
		
		['新闻','http://www.2221.com/newsweek.htm'],
		['军事','http://www.2221.com/junshi.htm'],
		['财经','http://www.2221.com/stock.htm'],
		['交友','http://www.2221.com/love.htm'],
		['招聘','http://www.2221.com/rencai.htm'],
		['招商','http://www.1155.com/zhaoshangjiameng/?1'],
		
		['邮箱','http://www.2221.com/mail.htm'],
		['电脑','http://www.2221.com/hardware.htm'],
		['银行','http://www.2221.com/bankjt.htm'],
		['手机 ','http://www.2221.com/shouji.htm'],
		['空间','http://www.2221.com/blog.htm'],
		['社区','http://www.2221.com/club.htm']
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