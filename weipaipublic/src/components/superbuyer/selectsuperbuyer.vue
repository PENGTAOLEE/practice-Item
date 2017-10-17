<template>
<div class='superbuyergroup'>
    <div class='group-header clr'>
        <div  class='fl head-left'>选择超级买家({{select_list.length}}/5)</div>
        <div class='fr head-right' @click='goPush'>推送</div>
    </div>
    <div class='group-body'>
        <ul class='list-box'>
            <li class='list' v-for='(item,index) in data' :key='item.user_id'>
                <div class='clr'>
                    <div class='fl list-left'>
                        <div class='img-box'>
                            <img :src='item.thumb'/>
                        </div>
                    </div>
                    <div class='fr list-right'> 
                        <div class='fl list-content'>
                            <div class='line1'>{{item.company+item.position+item.rel_name}}</div>
                            <div class='line2'>已购:  {{item.total_num}}</div>
                            <div class='line3'><span class='list-icon'>#</span> <span class='list-span' v-for='inter in item.typelist' :key='inter'>{{inter}}</span></div>
                        </div>
                        <div class='list-button fr'>
                            <span class='shotsprites icon-unselected' :class='{"icon-selected": is_select_sum[index]}' @click='toggleSelect(item.user_id,index)'></span>
                        </div>
                    </div>
                </div>
            </li>
              
                   
        </ul>
    </div>
    <not-more v-if='is_not_more'></not-more>
    <div class="root-space">
        
    </div>
    <modal-tip :msg='tip_msg' @closeBox='closeTipBox' v-show='is_tip'></modal-tip>
    <time-task-tip :msg='task_msg' @childEvent='goJudge' v-show='is_task' ref='count'></time-task-tip>
</div>
</template>
<style scoped>
    .superbuyergroup{
        width: 100%;

    }
    .group-header{
        width: 100%;
        border: 1px solid #ccc; 
        position: fixed;
        top: 0;
    }
    .group-body{
        margin-top: 4.5rem;
    }
    .head-left{
        width: 40%;
        height: 4.5rem;
        padding-left: 1.5rem;
        line-height: 4.5rem;
        font-size: 1.4rem;
        color: #333;
    }
    .head-right{
        width: 40%;
        height: 4.5rem;
        padding-right: 1.5rem;
        line-height: 4.5rem;
        font-size: 1.4rem;
        color: #49BE39;
        text-align: right;
        
    }
    .list-box{
        padding-top: 1rem;
    }
    .list{
        padding: 2rem 0 0;
    }
    .list-left{
        width: 21%;
    }
    .list-right{
        width: 79%;
        border-bottom: 1px solid #ccc;
    }
    .img-box{
        width: 5rem;
        height: 5rem;
        margin: auto;
    }
    .img-box>img{
        width: 100%;
        border: 1px solid  #000;
        background-color: #f00;
        border-radius: 50%;
    }
    .list-content{
        width: 80%;
        padding-right: 1.5rem;
        font-size: 1.4rem;
        padding-bottom: 1.625rem;
        line-height: 153.6%;
    }
    .line1{
        color: #000;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
    }
    .line2{
        color: #666;
    }
    .line3{
        color: #999;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
    }
    .list-span{
        display: inline-block;
        margin: 0 0.5rem;
    }
    .list-button{
        margin-right: 1.5rem;
    }
    .icon-unselected{
        display: inline-block;
        width: 2.2rem;
        height: 2.2rem;
        margin-top: 2.45rem;
        background-position: -0.1rem -4.55rem;
    }
    .icon-selected{
        background-position: -2.5rem -4.55rem;
    }
    .root-space{
        width: 100%;
        height: 6rem;
    }
    
</style>

<script>
    import ajax from 'assets/js/ajax';
    import utils from 'assets/js/utils';
    import modalTip from '@/components/component/modal-tip.vue';
    import notMore from '@/components/component/not-more.vue';
    import timeTaskTip from '@/components/component/time-task-tip.vue';
    var config = window.config;
    export default{
        components: {
            "modal-tip": modalTip,
            "not-more": notMore,
            'time-task-tip': timeTaskTip
        },
        data: function(){
            return {
                data: [],
                is_student: '',
                page: 1,
                // url: config.img_url,
                select_list: [],
                is_select_sum: '',
                is_tip: false,
                tip_msg: '',
                url: config.img_url,
                is_not_more: false,
                task_msg:'',
                is_task: false
            }
        },
        // computed: {
        //     is_select_sum: function(){
        //         var array = new Array(this.data.length);
        //         array.fill(false);
        //     }
        // },
        created: function(){
            this.getAllList();
        },
        mounted: function(){
            var child = document.getElementById('footer-common');
            child.style.display = 'none';
            document.title = '超级买家团';
        },
        beforeDestroy: function(){
            var child = document.getElementById('footer-common');
            child.style.display = 'block';   
        },
        methods: {
             getOrderList: function(){
                var that = this;
                var page = that.page;
                var good_id = this.$route.params.id;
                ajax.getSuperBuyerGroup(good_id,page,function(data){
                    if(data.status ==200){
                        that.data = that.data.concat(data.data[1].data);
                        that.page_num = data.data[1].last_page;
                        that.is_select_sum = that.creatArray();
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
            toggleSelect: function(user_id,index){
                let is_select = this.select_list.indexOf(user_id)
                if(is_select>=0){
                    this.select_list.splice(is_select,1);
                    this.is_select_sum[index] = false;
                }else{
                    if(this.select_list.length<5){
                        this.select_list.push(user_id);
                        this.is_select_sum[index]= true;
                    }else{
                        this.tip_msg = '您只能选择五个买家';
                        this.is_tip = true;
                    } 
                }
                
            },
            creatArray: function(){
                let array = new Array(this.select_list.length);
                array.fill(false);
                console.log(array);
                return array
            },
            goPush: function(){
                this.is_tip = true;
                this.tip_msg = '推送中';
                let  good_id = this.$route.params.id;
                let select_list = this.select_list;
                var that = this;

                ajax.goPush(select_list,good_id,function(data){
                    if(data.status==200){
                        that.is_tip = false;
                        that.$nextTick( () => {
                            that.$refs.count.startcount(3000);
                        });
                        that.task_msg = '推送成功';
                        that.is_task = true;
                    }else{
                        that.tip_msg = data.msg;
                        that.is_tip = true;
                    }
                })
            },
            closeTipBox: function(){
                this.is_tip = false;
            },
            goJudge: function(){
                this.is_task = false;
                this.$router.push('/pushauction');
            }
        }
    }
</script>