<template>
<span>
	<b class="red">{{time.day||00}}</b><b>天</b>
	<b class="red">{{time.hour||00}}</b><b>时</b>
	<b class="red">{{time.min||00}}</b><b>分</b>
</span>
</template>
<script>


    module.exports = {
            
            data: function () {
                return {
                    during: 0
                }
            },
            props: ["starttime","endtime"],
            methods: {
                startcount: function(during){
                    var that = this;
                    that.during = that.endtime-that.starttime;
                    var cd = setInterval(function(){
                        if(that.during<60){
                            that.during = 0;
                            window.clearInterval(cd);
                            // that.$emit("childEvent");
                        }else{
                            that.during -= 1;
                        }
                    },1000);
                },
                formate: function(time){
                      time<10&&(time="0"+time)
                      return time;
                }     
          
            },
            mounted: function () {
                this.startcount();
            },
            computed: {
                time: function(){
                    var during = this.during;
                    var timeList = {};
                    if(during!=0){
                    timeList.day = this.formate(Math.floor(during/3600/24));
                    timeList.hour = this.formate(Math.floor(during/3600%24));
                     timeList.min = this.formate(Math.floor((during/60)%60));   
                    }else{
                         timeList.day = "00";
                        timeList.hour = "00";
                        timeList.min = "00";
                    }
                     
                    return timeList;
                }
            }

        }


</script>
<style>
b{
	font-weight: normal;
}
b.red{
	color: #ad1a1a!important;
}
</style>
