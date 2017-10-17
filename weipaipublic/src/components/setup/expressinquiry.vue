<template>
	<div class='express-inquiry'>
		快递页面查询{{dataInfo}}
	</div>
</template>
<script>
    var ajax = require("ajax");
    module.exports = {
        components: {
            
        },
        data: function(){
            return {
                dataInfo: '', // 数据对象
            }
        },
        created: function(){
        	this.getExpressInformation();
        },
        methods: {
        	getExpressInformation: function(){
        		let that = this;
                let cb = 'cb';
                let appid = 4001;
                let com = 'zhongtong';
                let nu = 451060427096;
                let vcode = '';
                let token = '';
                let _ = Date.parse(new Date());
                function handleData(data){
                    this.dataInfo = data;
                };
                ajax.getExpressInformation(cb,appid,com,nu,vcode,token,_,function(res){
                    if(res.status==200){
                        handleData(res.data); 
                    }
                });
                
        	}
            // handleData: function(data){
            //     this.dataInfo = data;
            //     console.log(this.dataInfo);
            // }
        }
    }

</script>
<style scoped>
	.express-inquiry{
		font-size: 1.4rem;
	}
</style>

