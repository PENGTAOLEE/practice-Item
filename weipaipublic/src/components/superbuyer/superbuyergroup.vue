<template>
<div class='superbuyergroup'>
    <div class='group-header clr'>
        <div  class='fl head-left'>超级买家团</div>
        <router-link class='fr head-right' to='/applyentry' v-if='is_super_buyer!=1'>申请成为超级买家</router-link>
    </div>
    <div class='group-body'>
        <ul class='list-box'>
            <li class='list' v-for='item in data' :key='item.user_id'>
                <div class='clr'>
                    <div class='fl list-left'>
                        <div class='img-box'>
                            <img src='../../assets/img/share_logo.jpg'/>
                        </div>
                    </div> 
                    <div class='fr list-right'>
                        <div class='line1'>{{item.company+item.position+item.rel_name}}</div>
                        <div class='line2'>已购:  {{item.total_num}}</div>
                        <div class='line3'><span class='list-icon'>#</span> <span class='list-span' v-for='inter in item.typelist' :key='inter'>{{inter}}</span></div> 
                    </div>
                </div>
            </li>
              
                   
        </ul>
    </div>
    <div class='space'>
        
    </div>
    <div class='group-footer'>
        <div class='button-box'>
            <a href='javascript:;' @click='judgeStudent' class='group-button'>推送拍品</a>
        </div>
    </div>
    <show-tip :msg='tipMsg' :confirmtip='tipConfirm' @closebox='closeTip' @goconfirm='goConfirm' v-show='is_tip'></show-tip>
</div>

</template>
<style scoped>
    .superbuyergroup{
        width: 100%;

    }
    .group-header{
        width: 100%;
        border: 1px solid #ccc; 
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
    .list-right{
        width: 78%;
        padding-right: 1.5rem;
        font-size: 1.4rem;
        padding-bottom: 1.625rem;
        border-bottom: 1px solid #ccc;
        line-height: 153.6%;
    }
    .line1{
        color: #000;
    }
    .line2{
        color: #666;
    }
    .line3{
        color: #999;
    }
    .list-icon{
        color: #BBC3CA;
        font-weight: bold;
        display: inline-block;
        margin-right: .5rem;
    } 
    .list-span{
        display: inline-block;
        margin: 0 .5rem;
    }
    .space{
        width: 100%;

        height: 7rem;
    }
    .group-footer{
        position: fixed;
        bottom: 0px;
        width: 100%;
        height: 7rem;
        border-top: 1px solid #E5E5E5;
    }
    .button-box{
        margin-top: 1.5rem;
        height: 4rem;
        text-align: center;
    }
    .group-button{
        width: 90%;
        display: inline-block;
        height: 4rem;
        line-height: 4rem;
        color: #fff;
        font-size: 1.4rem;
        text-align: center;
        background-color: #49BE39;
    }
    
</style>

<script>
    import ajax from 'assets/js/ajax';
    import utils from 'assets/js/utils';
    import showTip from "@/components/component/show-tip.vue";
    export default{
        components: {
            "show-tip": showTip
        },
        data: function(){
            return {
                data: [],
                is_student: '',
                is_super_buyer: '',
                page: 1,
                page_num: '',
                is_tip: false,
                tipMsg: '只有学生才可推荐',
                tipConfirm: '我是学生'
            }
        },
        created: function(){
           // this.getData();
           this.getAllList();
        },
        mounted: function(){
            var child = document.getElementById('footer-common');
            child.style.display = 'none';
            document.title='超级买家团';
        },
        beforeDestroy: function(){
            var child = document.getElementById('footer-common');
            child.style.display = 'block';   
        },
        methods: {
            getOrderList: function(){
                var that = this;
                var page = that.page;
                var good_id = '';
                ajax.getSuperBuyerGroup(good_id,page,function(data){
                    if(data.status ==200){
                        that.is_student = data.data[0].is_student;
                        that.is_super_buyer = data.data[0].is_super_buyer;
                        that.data = that.data.concat(data.data[1].data);
                        that.page_num = data.data[1].last_page;
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
                    }
                });
            },
            closeTip: function(){
                this.is_tip = false;
            },
            goConfirm: function(){
                this.closeTip();
                this.$router.push('/authenstudentindex');
            },
            judgeStudent: function(){
                let is_student = this.is_student;
                if(is_student==1){
                    this.$router.push('/pushauction');
                    // this.is_tip = true;
                }else{
                    this.is_tip = true;
                }
            }
        }
    }
</script>