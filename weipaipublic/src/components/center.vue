<template>
  <div></div>
</template>

<script>
    var ajax = require("ajax");
    export default {
            data: function () {
                return {

                }
            },
            methods: {
                //===发送ajax请求，根据请求的数据判断用户默认设置是买家还是卖家{
                getIsSeller: function () {
                    var _this = this;
                    ajax.getIsSeller(function (data) {
                        if (data.status == 200) {
                            data.data == 0 ? _this.$router.replace("/buyercenter") : _this.$router.replace("/sellercenter");
                        } else {
                            console.log("请登录！");
                        }
                    });
                }
            },
            created: function () {
                this.getIsSeller();//
            }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>