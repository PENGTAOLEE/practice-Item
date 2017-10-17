<template>
<div class='tradingrecord'>
    <ul class='record-box'>
        <router-link :to='"/lotdetails/"+item.goods_id' tag='li' class='template' v-for='item in data' :key='item.inputtime'>
                <div class='trading-left' >{{item.inputtime}}</div>
                <div class='record-content'>
                    {{item.company+item.position+'\"'+item.username+'\"'+'购买了'+item.sellername+'的\"'+item.desc+'\"'}}
                </div>
        </router-link>
    </ul>
    <not-more v-show='is_not_more'></not-more>
    <div class='super-root'>
        <div class='super-box'>
            <b class='spritesmap  super-icon'>

            </b>
            <router-link to='/superbuyergroup' class='super-nav'>
                查看超级买家团
            </router-link>

        </div>
    </div>
    <div class='root-space'>

    </div>
</div>
</template>
<style scoped>
    .tradingrecord{
        width: 100%;

    }
    .template{
        width: 100%;
        padding-top: 1.5rem;
        background: #fff;
        padding-bottom: 1.5rem;
    }
    .template:nth-child(n+1){
        margin-top: .5rem;
    }
    .trading-left{
        width: 100%;
        padding-right: 1rem;
        font-size: 1.3rem;
        color: #666;
        text-align: right;
        height: 2.3rem;
        line-height: 2.3rem;
    }
    .record-content{
        width: 100%;
        padding: 0 1rem;
        font-size: 1.4rem;
        color: #333;
        /*height: 2rem;*/
        line-height: 2.2rem;

        /*显示三行，其余的省略*/
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; 
        overflow: hidden;
    }


    .super-root{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 6rem;
        background-color: #fff;
        border: 1px solid #D8D9D9;
    }
    .super-box{
        width: 100%;
        margin-top: 1.95rem;
        height: 2.1rem;
        text-align: center;
    }
    .super-icon{
        display: inline-block;
        width: 2.5rem;
        height: 2.1rem;
        background-position: -26.55rem -13.95rem;
    }
    .super-nav{
        color: #333;
        font-size: 1.7rem;
    }
    .root-space{
        width: 100%;
        height: 6rem;
    }
    .li-box{
        width: 100%;
    }
</style>

<script>
    import ajax from 'assets/js/ajax';
    import utils from 'assets/js/utils';
    import notMore from '@/components/component/not-more';
    export default{
        components: {
           "not-more": notMore 
        },
        data: function(){
            return {
                data: '',
                page: 1,
                page_num: '',
                is_not_more: false
            }
        },
        created: function(){
            this.getAllList();
        },
        // computed:{
        //     setData: function(){
        //         let data = this.data;
        //         for(let item of data){
        //             let time = new Date(item.inputtime);
        //             let date = time.getDate();
        //             let month = time.getMonth()+1;
        //             item.inputtime = month+'月'+date+'日';
        //         }
        //         return data
        //     }
        // },
        mounted: function(){
            document.title = '成交公告';
            var child = document.getElementById('footer-common');
            child.style.display = 'none';
        },
        beforeDestroy: function(){
            var child = document.getElementById('footer-common');
            child.style.display = 'block';   
        },
        methods: {
            getOrderList: function(){
                var that = this;
                var page = that.page;
                ajax.getAnnouncement(page,function(data){
                    if(data.status ==200){
                        that.data = that.data.concat(data.data);
                        that.data = that.setData(that.data);
                        console.log(that.data);
                        that.page_num = data.data[1].num;
                    }else{
                        console.log(data.msg);
                    }
                })
            },
            getAllList: function(){
                this.page = 1;
                this.page_num= '';
                this.data = [];
                this.getOrderList();
                var that = this;
                utils.dropLoading(function(){
                    if(that.page<that.page_num){
                        that.page++;
                        that.getOrderList();
                    }else{
                        // console.log("已经到底了，没有更多数据了");
                        that.is_not_more = true;
                    }
                });
            },
            setData: function(args){
                let data = args;
                for(let item of data){
                    let time = new Date(item.inputtime*1000);
                    let date = time.getDate();
                    let month = time.getMonth()+1;
                    item.inputtime = month+'月'+date+'日';
                }
                return data
            }
        }
    }
</script>