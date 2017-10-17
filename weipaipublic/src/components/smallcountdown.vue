<template>
<span>
	<!-- <b class="red">{{time.day}}</b><b v-show="time.day!=0">天</b>
	<b class="red">{{time.hour}}</b><b v-show="time.hour!=0">时</b>
	<b class="red">{{time.min}}</b><b v-show="time.min!=0">分</b> -->
	<b class="red" v-show="start">{{time.sec}}s</b>
</span>
</template>
<script>

    
    

    module.exports = {
            
            ////components: {
            //    "my-footer": footer
            //},
            props: ["dateDuring",'cd'],
            data: function () {
                return {
                    during: 0,
                    start: false,
                    timer: this.cd
                }
            },
            methods: {
                startcount: function(during){
                    var that = this;
                    that.during = during;
                    

                    console.log(this.during);
                    this.timer = setInterval(function(){
                        that.start = true;
                    if(that.during<1000){
                        that.during = 0;
                        window.clearInterval(this.timer);
                        that.start = false;
                        that.$emit("childEvent");
                    }else{
                        that.during -= 1000;

                    }

                },1000)
                } 
                
          
            },
            created: function () {
                
            },
            computed: {
                time: function(){
                    var during = this.during;
                    var timeList = {};
                     timeList.day = Math.floor(during/1000/3600/24);
                     timeList.hour = Math.floor(during/1000/3600%24);
                     timeList.min = Math.floor((during/1000/60)%(24*60));
                     timeList.sec = Math.floor(during/1000%60);
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
