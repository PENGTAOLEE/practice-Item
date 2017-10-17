<template>
<div class="select_item" @click.self='close'>
	<div class="select_box">
		<div class='item_selected clr'>学校选择</div>
        <div class="item_box">
            <ul class="item_ul">
                <li class="item" v-for='(list,index) in academyData' :key='list.id' :value='list.id' @click='gainData(list.id,list.name)'>
                    <div class='item-content'>
                         {{list.name}} 
                    </div>   
                 </li>
            </ul>
        </div>
        
	</div>
</div>
</template>
<script>

	
	var ajax  = require("ajax");

   export default {
		data: function() {
			return {
				parent_id: '',
                academyData: '',
                selected_name: '',
                selected_id: '',

			}
		},
		mounted: function(){
		},
		created: function(){
            this.getAcadeClass();
		},
		methods: {
			close: function() {
				this.$emit('closeBox');
			},
			// 确定
		    getAcadeClass: function(){
                var that = this;
		var key = 0;
                ajax.getType(0,key,function(res){
                    if(res.status==200){
			key = 1;
                        let items = res.data;
                        for( let item of items){
                            if(item.id==window.config.college_id){
                                that.parent_id = item.id;
                                ajax.getType(item.id,key,function(data){
                                    if(data.status==200){
                                        that.academyData = data.data;
                                        that.selected_name = that.academyData[0].name;
                                        that.selected_id = that.academyData[0].id;
                                    }
                                }); 
                                return                               
                            }
                        }
                    }
                });
            },
            gainData: function(id,name){
                this.selected_name = name;
                this.selected_id = id;
                let is_other = this.selected_id==this.academyData[this.academyData.length-1].id?true:false;
                this.$emit('goAcademy',this.parent_id,this.selected_id,this.selected_name,is_other);
            },	
		}
	}


</script>
<style>
/* 公共弹窗 */
.select_item {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 33;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
}
.select_box {
	position: absolute;
	bottom: 0;
	left: 0;
	/*padding: 0rem 1rem;*/
	width: 100%;
    /*max-height: 48rem;*/
	/*min-height: 20rem;*/
	background-color: #fff;
    overflow: scroll;
}
.item_selected{
    width: 100%;
    font-size: 1.4rem;
    height: 4.8rem;
    line-height: 4.8rem;
    color: #999;
    /*font-weight: bold;*/
    padding: 0 1.5rem;
    background-color: #F0F0F0;
}
/*.item_selected img{

    margin-top: 1.1rem;
}*/
.item_box{
    width: 100%;
    font-size: 1.4rem;
    background-color: #FFF;
    padding: 2rem 1.5rem;
    height: 20.5rem;
}
.item_ul{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    /*align-items: center;*/
    /*align-content: center;*/
    align-content: space-between;
    height: 16.5rem;
    overflow: scroll;
}
.item{
    color: #333;
    /*项目设置*/
    flex: 0 0 33.3%;
    /*  项目设置*/
    /*border: 1px solid #ccc;*/
    text-align: center;
    /*align-content: */
    height: 4.5rem;
    /*vertical-align: center;*/
    /*div下*/
    /*width: 87.5%;
    /*margin: auto;*/
    /*margin-top: .75rem;*/
    /*padding: .75rem 1.1rem;*/
    /*text-align: center;*/
    /*font-size: 1.4rem;*/
    /*line-height: 3rem;*/
    /*line-height: 3rem;*/
    /*height: 3rem;*/
    /*color: #333;*/
    /*border: 1px solid #ccc;*/
    /*div下*/
}
.item-content{
    width: 87.5%;
    margin: auto;
    margin-top: .75rem;
    /*padding: .75rem 1.1rem;*/
    text-align: center;
    font-size: 1.4rem;
    line-height: 3rem;
    height: 3rem;
    color: #333;
    border: 1px solid #ccc;
    border-radius: .6rem;
}

</style>
