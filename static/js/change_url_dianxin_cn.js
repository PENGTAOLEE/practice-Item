(function(){
	var p = [
		['��Ƶ','  http://www.dianxin.cn/html/sh/shipin/'],
['С˵','  http://www.dianxin.cn/html/xi/xiaoshuo/'],
['��Ϸ',' http://www.dianxin.cn/html/yo/youxi/'],
['����',' http://www.dianxin.cn/html/yi/yinle/'],
['����',' http://www.114la.com/xiaoyouxi/1'],
['����',' http://www.dianxin.cn/html/ti/tiyu/'],

['����',' http://www.114la.com/wangshanggouwu/index.htm1'],
['�̳�',' http://www.dianxin.cn/html/sh/shangcheng3513/'],
['�Ź�',' http://www.dianxin.cn/html/go/gouwu/'],
['Ů��',' http://www.dianxin.cn/html/nv/nvxing2218/'],
['����',' http://www.114la.com/lvyouchuxing/1'],
['����',' http://www.dianxin.cn/html/qi/qiche/'],

['����',' http://www.dianxin.cn/html/xi/xinwen/'],
['����',' http://www.dianxin.cn/html/ju/junshi/'],
['�ƾ�',' http://www.dianxin.cn/html/gu/gupiao/'],
['����',' http://www.dianxin.cn/html/ji/jiaoyou/'],
['��Ƹ',' http://www.dianxin.cn/html/zh/zhaopin/'],
['����',' http://www.dianxin.cn/html/xi/xingye/'],

['����',' http://www.dianxin.cn/html/ji/jiankang/'],
['����',' http://www.114la.com/computer/1'],
['����',' http://www.dianxin.cn/html/yi/yinxing/'],
['�ֻ�',' http://www.dianxin.cn/html/sh/shouji/'],
['�ռ�',' http://www.114la.com/blog/1'],
['����',' http://www.dianxin.cn/html/sh/shequ/']

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