// Document JavaScript

function setImg(index){
    var oList = document.getElementById('list');
	var aLi = oList.getElementsByTagName('li');
    if (aLi[index].dataset) {
        var src=aLi[index].dataset.src;
    } else{
        var src=aLi[index].getAttribute('data-src');
    }
    var oImg=document.createElement('img');
    oImg.src=src;
    if (aLi[index].children.length==0) {
        aLi[index].appendChild(oImg); 
    }
}

function getH(obj) {  
    var h = 0;  
    while (obj) {  
        h += obj.offsetTop;  
        obj = obj.offsetParent;  
    }  
    return h;  
}  

window.onscroll = function () {

    var oList = document.getElementById('list');
	var aLi = oList.getElementsByTagName('li');

    for (var i = 0, l = aLi.length; i < l; i++) {
        var oLi = aLi[i];
        var t = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);
        var h = getH(oLi);
		if (h < t) {
            setTimeout("setImg(" + i + ")", 500);
        }
    }
};
window.onload = function () {
    window.onscroll();
};