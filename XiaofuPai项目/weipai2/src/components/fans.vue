<template>
<div class="fans">
	
	<div class="fansList">
		<ul class="fansUl cc">
			<li v-for="fan in fansData">
				<router-link :to="fan.has_shop==1?('/shopsnews/'+ fan.user_id):('/shops/'+fan.user_id+'?type=0')">
				<dl class="fansDl cc">
					<dt class="fansDt">
						<img :src="fan.thumb" />
					</dt>
					<dd class="fansD1">{{ fan.name }}</dd>
					<dd class="fansD2">{{ fan.desc }}</dd>
				</dl>
				</router-link>
				<span :userid="fan.user_id" class="fansIcon"  :class="{fansIconcur: (fan.my_foucus==1?false:true)}" @click="focus"></span>
			</li>
		</ul>
	</div>
	
</div>

</template>
<script>


    module.exports = {
		data : function(){
			return {
				fansData : [],
				pageNum : 1,
				page : 1
			  }
		    },
		
		components: {
            'my-footer':footer
        },
        mounted:function(){
        	document.title="我的粉丝";
            this.getAllFans();

            this.$nextTick(function() {
            	this.addRouterLink()
            })
        },
        beforeDestroy: function() {
        	$(".footer-bottom a").eq(3).removeClass("router-link-active");
        },
		methods: {
			getFans : function(){
				var vue = this;
				
					ajax.getFans(vue.page,function(res){
						if(res.status == 200){
							vue.pageNum = res.data.page_num;
							// $.each(res.data.my_fans, function (i,v) {
							// 	vue.fansData.push(v);
							// });
							vue.fansData = vue.fansData.concat(res.data.my_fans);
						}else{
							alert(res.msg)
						}
					})
					
				
			},
			focus : function(event){

				$(event.target).toggleClass('fansIconcur');
				var userid =$(event.target).attr('userid')
				var my_focus;

				/*杨彤杰修改*/
				my_focus = ($(event.target).hasClass('fansIconcur'))?1:0;
				/*杨彤杰修改*/
				
				ajax.editFocusStatus(userid,my_focus,function(res){
					if(res.status == 200){

						if(my_focus==0){
							console.log("操作关注成功");
						}else if(my_focus == 1){
							console.log("操作取消关注成功");
						}
					}else{
						if(my_focus==10){
							console.log("操作关注失败原因："+res.msg);
						}else if(my_focus == 1){
							console.log("操作取消关注成功："+res.msg);
						}
					}
				})
			},
			getAllFans: function(){
				var vue = this;
				vue.page_num = "";
				vue.page = 1;
				vue.fansData= []
				this.getFans();
			    utils.dropLoading(function(){
			    	if(vue.page<vue.page_num){
			    		vue.page++;
			    		vue.getFans();
			    	}else{
			    		console.log("没有更多了");
			    	}
			    });
			},

			// footer 样式
			addRouterLink: function() {
				$(".footer-bottom a").eq(3).addClass("router-link-active");
			}


		}
	
		// directives: {
		// 	scroll: {
		// 		bind : function(el,binding){
		// 			window.addEventListener('scroll',function(){
		// 				if(document.body.scrollTop + window.innerHeight >= document.body.clientHeight){
		// 					var fnc = binding.value;
		// 					fnc();
		// 				}
		// 			})
		// 		}
		// 	}
		// },
	}

</script>
<style>
.fansList{
	background: #fff;
}
.fansList li{
	padding:1.5rem 1.4rem;
	border-bottom: .05rem solid #e5e5e5;
	position: relative;
}
.fansDl .fansDt{
	width: 4.4rem;
	height: 4.4rem;
	border-radius: 50%;
	float: left;
	background: #999;
}
.fansDl .fansDt img{
	width: 4.4rem;
	height: 4.4rem;
	vertical-align: top;
	border-radius: 50%;
}
.fansDl dd{
	float: left;
	margin-left: 1.5rem;
	width: 26.2rem;
}
.fansDl .fansD1{
	font-size: 1.6rem;
	color: #333;
}
.fansDl .fansD2{
	font-size: 1.4rem;
	color:#999;
	/*超出隐藏*/
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}

.fansIcon{
	position: absolute;
	width:2.2rem;
	height: 2.2rem;
	background: url(/res/img/fansIcon.png) no-repeat;
	background-size: 100%;
	position: absolute;
	right:1.4rem;
	top:2.5rem;
}
.fansIconcur{
	background-position:0 -2.2rem;
}


</style>
