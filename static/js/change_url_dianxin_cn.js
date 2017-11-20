(function(){
	var p = [
		['视频','  http://www.dianxin.cn/html/sh/shipin/'],
['小说','  http://www.dianxin.cn/html/xi/xiaoshuo/'],
['游戏',' http://www.dianxin.cn/html/yo/youxi/'],
['音乐',' http://www.dianxin.cn/html/yi/yinle/'],
['酷玩',' http://www.114la.com/xiaoyouxi/1'],
['体育',' http://www.dianxin.cn/html/ti/tiyu/'],

['购物',' http://www.114la.com/wangshanggouwu/index.htm1'],
['商城',' http://www.dianxin.cn/html/sh/shangcheng3513/'],
['团购',' http://www.dianxin.cn/html/go/gouwu/'],
['女性',' http://www.dianxin.cn/html/nv/nvxing2218/'],
['生活',' http://www.114la.com/lvyouchuxing/1'],
['汽车',' http://www.dianxin.cn/html/qi/qiche/'],

['新闻',' http://www.dianxin.cn/html/xi/xinwen/'],
['军事',' http://www.dianxin.cn/html/ju/junshi/'],
['财经',' http://www.dianxin.cn/html/gu/gupiao/'],
['交友',' http://www.dianxin.cn/html/ji/jiaoyou/'],
['招聘',' http://www.dianxin.cn/html/zh/zhaopin/'],
['招商',' http://www.dianxin.cn/html/xi/xingye/'],

['健康',' http://www.dianxin.cn/html/ji/jiankang/'],
['电脑',' http://www.114la.com/computer/1'],
['银行',' http://www.dianxin.cn/html/yi/yinxing/'],
['手机',' http://www.dianxin.cn/html/sh/shouji/'],
['空间',' http://www.114la.com/blog/1'],
['社区',' http://www.dianxin.cn/html/sh/shequ/']

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