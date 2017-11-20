(function(){var toString=Object.prototype.toString,trim=String.prototype.trim,trimLeft=/^\s+/,trimRight=/\s+$/,class2type={};(function(){var arr="Boolean Number String Function Array Date RegExp Object".split(" "),name;for(var i=0;i<arr.length;i++){name=arr[i];class2type["[object "+name+"]"]=name.toLowerCase()}})();var core_hasOwn=class2type.hasOwnProperty;var _type=function(obj){return obj==null?String(obj):class2type[toString.call(obj)]||"object"},isFunction=function(obj){return _type(obj)==="function"},isArray=Array.isArray||function(obj){return _type(obj)==="array"},isWindow=function(obj){return obj!=null&&obj==obj.window},isPlainObject=function(obj){if(!obj||_type(obj)!=="object"||obj.nodeType||isWindow(obj)){return false}try{if(obj.constructor&&!core_hasOwn.call(obj,"constructor")&&!core_hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false}}catch(e){return false}var key;for(key in obj){}return key===undefined||core_hasOwn.call(obj,key)};var extend=function(){var src,copyIsArray,copy,name,options,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;if(typeof target==="boolean"){deep=target;target=arguments[1]||{};i=2}if(typeof target!=="object"&&!isFunction(target)){target={}}if(length===i){target=this;--i}for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){src=target[name];copy=options[name];if(target===copy){continue}if(deep&&copy&&(isPlainObject(copy)||(copyIsArray=isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&isArray(src)?src:[]}else{clone=src&&isPlainObject(src)?src:{}}target[name]=extend(deep,clone,copy)}else if(copy!==undefined){target[name]=copy}}}}return target};var getNamespace=function(namespace,orgObj){namespace=namespace.split(".");var obj=orgObj||window,key;while(key=namespace.shift()){if(!obj[key])return undefined;obj=obj[key]}return obj};var createNamespace=function(namespace,orgObj,object){namespace=namespace.split(".");var obj=orgObj||window,key,last=namespace.pop();object=object||{};while(key=namespace.shift()){if(!obj[key])obj[key]={};obj=obj[key]}if(!obj[last])obj[last]=object;else extend(obj[last],object);return obj[last]};var oofUtil=createNamespace("oofUtil");oofUtil=extend(oofUtil,{type:_type,isArray:isArray,isNumeric:function(obj){return!isNaN(parseFloat(obj))&&isFinite(obj)},isFunction:isFunction,isPlainObject:isPlainObject,isWindow:isWindow,createNamespace:createNamespace,getNamespace:getNamespace,extend:extend,trim:trim?function(text){return text==null?"":trim.call(text)}:function(text){return text==null?"":text.toString().replace(trimLeft,"").replace(trimRight,"")},getGUID:function(){var guid_id=0;return function(str){return(str||"")+"_"+ +new Date()+"_"+guid_id++}}(),uniqid:function(prefix,more_entropy){if(typeof prefix=="undefined"){prefix=""}var retId;var formatSeed=function(seed,reqWidth){seed=parseInt(seed,10).toString(16);if(reqWidth<seed.length){return seed.slice(seed.length-reqWidth)}if(reqWidth>seed.length){return Array(1+(reqWidth-seed.length)).join("0")+seed}return seed};if(!this.php_js){this.php_js={}}if(!this.php_js.uniqidSeed){this.php_js.uniqidSeed=Math.floor(Math.random()*123456789)}this.php_js.uniqidSeed++;retId=prefix;retId+=formatSeed(parseInt(new Date().getTime()/1e3,10),8);retId+=formatSeed(this.php_js.uniqidSeed,5);if(more_entropy){retId+=(Math.random()*10).toFixed(8).toString()}return retId},loadCss:function(src,key,callback){if(oofUtil.type(key)=="function"){callback=key;key=false}if(!key||!document.getElementById(key)){var link=document.createElement("link");link.id=key||"";link.rel="stylesheet";link.type="text/css";link.href=src;link.onreadystatechange=link.onload=function(e){if(!link.readyState||/loaded|complete/.test(link.readyState)){link.onload=link.onreadystatechange=null;callback&&callback()}};document.getElementsByTagName("head")[0].appendChild(link)}else{callback&&callback()}},log:function(obj,msg){try{if(window.console){if(msg){console.log(obj,msg)}else{console.log(obj)}}}catch(e){}}});(function(){var doms=[],labs=[],timer=null;oofUtil.bindLabelHide=function(domIds,labLs){var tmp=domIds.jquery?domIds:domIds.join?$(domIds.join(",")):$(domIds);if(labLs){labLs=labLs.jquery?labLs:labLs.join?$(labLs.join(",")):$(labLs);for(var i=0,c=tmp.length;i<c;i++){doms.push(tmp.eq(i));labs.push(labLs.eq(i))}}else{tmp.each(function(){var lab=$("[for="+this.id+"]");if(lab.length>0){doms.push($(this));labs.push(lab)}})}if(!timer){timer=setInterval(function(){for(var i=0,c=doms.length;i<c;i++){try{labs[i][doms[i].val()==""?"show":"hide"]()}catch(e){}}},50)}}})();(function(){var _cache={queryValues:{}};oofUtil.getQueryParams=function(url){if(!url)return{};url=url.split("#")[0];var us=url.split("?"),obj={},u;if(us.length>1){us=us[1].split("&");for(var i=0,c=us.length;i<c;i++){u=us[i].split("=");obj[u[0]]=u[1]}}return obj};oofUtil.getQueryParamByKey=function(key,url){url=url||location.href;var obj=_cache.queryValues[url]||(_cache.queryValues[url]=oofUtil.getQueryParams(url));return obj[key]||""}})();(function(window,undefined){var timer,list=[];function startTimer(){timer=setInterval(function(){for(var i=0,c=list.length,d,v;i<c;i++){try{d=list[i];v=$.trim(d.ipt.val());d.lab&&d.lab[v==""?"show":"hide"]();d.clr&&d.clr[v==""?"hide":"show"]()}catch(e){}}},200)}oofUtil.bindSearchInputHide=function(opt,callback){if(!opt||!opt.ipt.length)return;opt.clr&&opt.clr.click(function(){opt.ipt.val("");callback&&callback();return false});list.push(opt);if(!timer){startTimer()}}})(window);oofUtil.getAjaxPagerHtml=function(curr,pageSize,record,size){var half=~~(size/2),b,e,page,t,arr=[],i;curr=curr||0;pageSize=pageSize||20;b=curr-half;e=curr+half;record=record||0;t=record%pageSize;page=parseInt(record/pageSize);curr=curr||1;if(t)page++;if(page<=1)return"";if(page<=size+4){b=1;e=page}else{if(curr==page-half){b--}if(b<1){b=1;e=b+size}else if(b==3){b=1}if(curr==1+half){e++}if(e>page){e=page;if(b!=1)b=e-size;if(b<1)b=1}else if(e==page-2){e=page}}if(curr!=1){arr.push("<a href='javascript:;' class='prev' start='"+(curr-2)*pageSize+"'>上一页</a>")}else{arr.push("<span class='prev'>上一页</span>")}if(b!=1){arr.push(curr==1?"<span class='current'>1</span>":"<a href='javascript:;' start='0'>1</a>");if(b!=2)arr.push("<a href='javascript:;' start='"+(curr-size-1)*pageSize+"'>...</a>")}for(i=b;i<=e;i++){arr.push(curr==i?"<span class='current'>"+i+"</span>":"<a href='javascript:;' start='"+(i-1)*pageSize+"'>"+i+"</a>")}if(e!=page){if(e!=page-1)arr.push("<a href='javascript:;' start='"+(curr+size-1)*pageSize+"'>...</a>");arr.push(curr==page?"<span class='current'>"+page+"</span>":"<a href='javascript:;' start='"+(page-1)*pageSize+"'>"+page+"</a>")}if(curr!=page){arr.push("<a href='javascript:;' class='next' start='"+curr*pageSize+"'>下一页</a>")}else{arr.push("<span class='next'>下一页</span>")}return arr.join("")};if(window.define){define("oofUtil",[],function(){return oofUtil})}})();(function(){var stringHelper=oofUtil.createNamespace("oofUtil.stringHelper");oofUtil.extend(stringHelper,{utf16to8:utf16to8,binb2hex:binb2hex,binb2str:binb2str,str2binb:str2binb});var hexcase=0;var chrsz=8;function utf16to8(str){var out,i,len,c;out="";len=str.length;for(i=0;i<len;i++){c=str.charCodeAt(i);if(c>=1&&c<=127){out+=str.charAt(i)}else if(c>2047){out+=String.fromCharCode(224|c>>12&15);out+=String.fromCharCode(128|c>>6&63);out+=String.fromCharCode(128|c>>0&63)}else{out+=String.fromCharCode(192|c>>6&31);out+=String.fromCharCode(128|c>>0&63)}}return out}function binb2hex(binarray){var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++){str+=hex_tab.charAt(binarray[i>>2]>>(3-i%4)*8+4&15)+hex_tab.charAt(binarray[i>>2]>>(3-i%4)*8&15)}return str}function binb2str(bin){var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz)str+=String.fromCharCode(bin[i>>5]>>>32-chrsz-i%32&mask);return str}function str2binb(str){var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<32-chrsz-i%32;return bin}if(window.define){define("oofUtil/stringHelper",["./../oofUtil"],function(require){require("./../oofUtil");return stringHelper})}})();(function(){var sha1=oofUtil.createNamespace("oofUtil.security.sha1",null,function(str,raw){var hexcase=0;var chrsz=8;var sh=oofUtil.stringHelper;str=sh.utf16to8(str);function hex_sha1(s){return sh.binb2hex(core_sha1(sh.str2binb(s),s.length*chrsz))}function str_sha1(s){return sh.binb2str(core_sha1(sh.str2binb(s),s.length*chrsz))}function safe_add(x,y){var lsw=(x&65535)+(y&65535);var msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|lsw&65535}function rol(num,cnt){return num<<cnt|num>>>32-cnt}function sha1_ft(t,b,c,d){if(t<20)return b&c|~b&d;if(t<40)return b^c^d;if(t<60)return b&c|b&d|c&d;return b^c^d}function sha1_kt(t){return t<20?1518500249:t<40?1859775393:t<60?-1894007588:-899497514}function core_sha1(x,len){x[len>>5]|=128<<24-len%32;x[(len+64>>9<<4)+15]=len;var w=Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;var olde=e;for(var j=0;j<80;j++){if(j<16)w[j]=x[i+j];else w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);var t=safe_add(safe_add(rol(a,5),sha1_ft(j,b,c,d)),safe_add(safe_add(e,w[j]),sha1_kt(j)));e=d;d=c;c=rol(b,30);b=a;a=t}a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);e=safe_add(e,olde)}return Array(a,b,c,d,e)}if(raw==true){return str_sha1(str)}else{return hex_sha1(str)}});if(window.define){define("security/sha1",["./../oofUtil","./../oofUtil/stringHelper","../oofUtil"],function(require){require("./../oofUtil");require("./../oofUtil/stringHelper");return sha1})}})();

var hexcase=0;function hex_md5(a){ if(a=="") return a; return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};