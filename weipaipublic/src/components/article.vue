<template>
<div class="article">
	<div class="article-title">{{data.title}}</div>
	<div class="subhead"><span class="article-time">{{data.inputtime}}</span><span class="icon">{{data.views}}</span></div>
	<div class="content" v-html="data.content" >
	</div> 
</div>
</template>
<script>
    var ajax = require("ajax");
    module.exports = {
        
        components: {
        },
        data: function(){
            return {
              data: ''
            }
        },
        methods: {
           
            getArticleInfo: function(){
                 var that = this;
                 var id = that.$route.params.id;
                ajax.getArticleInfo(id,function(data){
                    if(data.status==200){
                        that.data = data.data;
                        var d = new Date(data.data.inputtime);
                        that.data.inputtime = that.formatDate(d);
                        var content = data.data.content;
                        that.data.content = content.replace(/(\d+|\d+\.\d+)px/ig,function(a1,a2){
                          return a2/10+"rem"
                        });
                        

                    }
                })

            },
            formatDate: function(now){     
              var   year=now.getFullYear();     
              var   month=now.getMonth()+1;     
              var   date=now.getDate();     
              // var   hour=now.getHours();     
              // var   minute=now.getMinutes();     
              // var   second=now.getSeconds();     
              // return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second; 
              console.log("创建的年为："+year);
              return   year+"."+month+"."+date;    
              }            
        },
        created: function(){
             this.getArticleInfo();
        },
        mounted: function(){
            document.title=this.data.title;
        },
    }

</script>
<style>
.article{
    width: 100%;
    height: 100%;
    /*padding: auto 1.5rem;*/
    padding: 1.5rem;
}
.article-title{
    width: 100%;
    font-size: 2rem;
    line-height: 4rem;
    text-align: left;
    color: #333;
}
.subhead{
    width: 100%;
    font-size: 1.4rem;
    line-height: 2.8rem;
    text-align: left;
    color: #999;
}
.content{
    /*text-indent: 2rem;*/
    font-size: 1.4rem;
    line-height: 3.4rem;
    color: #666;
    overflow: hidden;
}
.content img{
    width: 100% !important;
    height: auto !important;
    display: block !important;
    margin: 1rem auto !important;
}
span.icon{
    display: inline-block;
    padding-left: 2rem;
    margin-left: 1rem;
    background-image: url(../assets/img/view.png);
    background-position: left;
    background-repeat: no-repeat;
    background-size: 1.5rem 1rem;
}
/*.container-img{
    width: 100%;
    height: 16.4rem;
    background-image: url(../assets/img/shotsprites.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}*/
</style>
