<template>
    <div class="help-reply">
        <div class="container">
            <h3 class="help-reply-title">
                <i class="spritesmap icon-title"></i>
                {{ title }}
            </h3>
            <p class="help-reply-text clearfix" v-if="!isImg">
                <i class="spritesmap icon-reply fl"></i>
                <span class="fl" v-html="reply"></span>
            </p>
            <!-- 流程图 -->
            <img src="../../assets/img/flow_chart.png" alt="" class="flow-chart" v-if="isImg">
        </div>
    </div>
</template>
<script>
    var listData = require('@/assets/js/help.json') 

    module.exports = {
        data: function(){
            return {
                title: "",
                reply: "",
                isImg: false
            }
        },
        components: {
        
        },
        methods: {
        
        },
        created: function(){
            var id = this.$route.params.id;
            document.title = "帮助中心"
            this.title = listData[id-1].title;
            this.reply = listData[id-1].reply;

            // 流程图单独处理
            if (listData[id-1].type == 'img') {
                this.isImg = true;    
            };
             
        },
        mounted: function(){
            $('#footer-common').remove()
        },
    }

</script>
<style scoped>
.container {
    margin: 1rem;
    padding: 1.5rem 1rem;
    background-color: #fff;
}

.help-reply-title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
}

.icon-title {
    background-position: -20.5rem -25.45rem;
    display: inline-block;
    width: 1.3rem;
    height: 1.3rem;
    margin-right: .4rem;
}

.icon-reply {
    background-position: -22.5rem -25.44rem;
    display: inline-block;
    width: 1.3rem;
    height: 1.3rem;
    margin-right: .7rem;
    margin-top: .6rem;
}

.help-reply-text {
    font-size: 1.4rem;
    color: #666;
}

.help-reply-text span {
    display: inline-block;
    width: 31.5rem;
}

.flow-chart {
    width: 100%;
    margin: 0 auto;
}
</style>