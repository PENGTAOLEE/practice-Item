<template>
<div class='pushauction'>
    <div class='group-header clr'>
        <div  class='fl head-left'><span class='head-icon'>!</span><span>每天最多推送1个拍品({{select_id?1:0}}/1)</span></div>
        <a class='fr head-right' href='javascript:;' @click='judgePush' :class="{'is_push_style': is_push_bool}">推送</a>
    </div>
    <div class='group-body'>
        <ul class='list-box'>
            <li class='list' v-for='item in data' :key='item.id'>
                <div class='clr'>
                    <div class='fl list-left'>
                        <div class='img-box' :style='"background-image: url("+url+JSON.parse(item.thumb).url+")"'>
                            <!-- <img :src='url+JSON.parse(item.thumb).url'/> -->
                        </div>
                    </div> 
                    <div class='fl list-content'>
                        <div class='line1'>{{item.desc}}</div>
                        <div class='line2'>结拍时间: {{item.end_time}}</div>
                    </div>
                    <div class='fr list-button'>
                        <span class='shotsprites icon-unselected' :class='{"icon-selected":(item.id==select_id)}' @click='selectItem(item.id)'></span>
                    </div>
                </div>
            </li>
              
                   
        </ul>
        <not-auction v-if='!(data.length>0)'></not-auction>
        <not-more v-if='is_not_more'></not-more>
    </div>
    <modal-tip :msg='tip_msg' @closeBox='closeTipBox' v-show='is_tip'></modal-tip>
</div>
</template>
<style scoped>
    .pushauction{
        width: 100%;

    }
    .group-header{
        position: fixed;
        top: 0;
        height: 4.5rem;
        width: 100%;
        border: 1px solid #ccc; 
    }
    .group-body{
        margin-top: 4.5rem;
    }
    .head-left{
        width: 60%;
        height: 4.5rem;
        padding-left: 1.5rem;
        line-height: 4.5rem;
        font-size: 1.4rem;
        color: #333;
    }
    .head-icon{
        color: #f00;
        display: inline-block;
        margin-right: 1rem;
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
    .group-box{
        padding-top: 4.5rem;
    }
    .list-box{
        padding-top: 1rem;
    }
    .list{
        padding: 2rem 0 0;
    }
    .list-left{
        width: 33.1%;
    }
    .img-box{
        width: 9.7rem;
        height: 9.7rem;
        margin: auto;
        background-position: center center;
        -webkit-background-size: cover;
        background-size: cover;
        background-repeat: no-repeat;

    }
    .img-box>img{
        width: 100%;
        height: 100%;
        border: 1px solid  #000;
    }
    .list-content{
        width: 55%;
        height: 9.7rem;
        padding-right: 1.5rem;
        font-size: 1.4rem;
        padding-bottom: 2rem;
        position: relative;
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
        width: 100%;
        font-size: 1.4rem;
        line-height: 2.6rem;
        position: absolute;
        bottom: 0;
    }
    .list-button{
        margin-right: 1.5rem;
    }
    .icon-unselected{
        display: inline-block;
        width: 2.2rem;
        height: 2.2rem;
        margin-top: 3.75rem;
        background-position: -0.1rem -4.55rem;
    }
    .icon-selected{
        background-position: -2.5rem -4.55rem;
    }
    .is_push_style{
        color: #999; 
    }
    
</style>

<script>
    import ajax from 'assets/js/ajax';
    import utils from 'assets/js/utils';
    import modalTip from '@/components/component/modal-tip.vue';
    import notAuction from '@/components/component/not-auction.vue';
    import notMore from '@/components/component/not-more.vue';
    var config = window.config;
    export default{
        components: {
            "modal-tip": modalTip,
            "not-auction": notAuction,
            'not-more': notMore
        },
        data: function(){
            return {
                data: [],
                page: 1,
                page_num: '',
                is_push: 1,//1是没有推送拍品  2是已经推送拍品
                is_push_bool: false,
                url: config.img_url,
                select_id: '',
                tip_msg: '',
                is_tip: false,
                is_not_more: false
            }
        },
        created: function(){
            this.getAllList();
        },
        mounted: function(){
            document.title = '拍品推送';
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
                ajax.getPushAuction(page,function(data){
                    if(data.status ==200){
                        that.is_push = data.data[0];
                        that.data = that.data.concat(data.data[1].data);
                        that.page_num = data.data[1].last_page;
                        that.is_push_bool=that.is_push == 2? true:false;
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
            selectItem: function(id){
                if(this.select_id==id){
                    this.select_id = undefined;
                }else{
                    this.select_id  = id;
                }
                // this.select_id = id;
            },
            judgePush: function(){
                if(this.is_push==1){
                    this.$router.push('selectsuperbuyer/'+this.select_id);
                }else if(this.is_push==2){
                    this.is_tip = true;
                    this.tip_msg = "每天只能推送一个拍品";
                }
            },
            closeTipBox: function(){
                this.is_tip = false;
            }
        }
    }
</script>