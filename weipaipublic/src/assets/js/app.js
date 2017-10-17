define(function(require, exports, module){
    var router = require("./router.js");
    var Footer = require('module/footer/footer');

    var app = new Vue({
        router : router,
        components: {
            'my-footer': Footer
        },
        watch : {
            '$route' : function(){
                if (_czc) {
                    var location = window.location
                    var content_url = location.pathname + location.hash
                    var referer_url = '/'
                    _czc.push(['_trackPageview', content_url, referer_url])
                }
            }
        }
    }).$mount("#app");
});