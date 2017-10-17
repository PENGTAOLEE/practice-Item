<template>
    <div class="newschat re" id="newschat">
        <div class="chat-title fixed">
            <router-link class="chat-back ab" to="/newslist">
                <span class="shotsprites"></span>
            </router-link>
            <p class="name">{{otherName}}</p>
        </div>
        <!-- 聊天列表 -->
        <div class="chat-list">
            <!-- loading -->
            <div class="chat-list-loading">
                <img v-show="loaded"  src="../../assets/img/loading.gif" alt="Loading">
            </div>
            <div class="chat-con clearfix re" v-for="raw in news" :class="raw.objclass">
                <template v-if="raw.objclass == 'chat-other'">
                    <div class="other-img" :style="{background : 'url('+otherThumb+') center/contain no-repeat'}"></div>
                </template>
                <template v-if="raw.objclass == 'chat-own'">
                    <div class="other-img" :style="{background : 'url('+userThumb+') center/contain no-repeat'}"></div>
                </template>

                <template v-if="raw.type == 0">
                    <div class="other-con" v-html="raw.html"></div>
                </template>
                <template v-if="raw.type == 1">
                    <div class="other-con">
                        <div class="divbg works-picture re" :style="{background : 'url('+raw.html.thumb+') center/contain no-repeat'}">
                        </div>
                    </div>
                </template>
                <template v-if="raw.type == 2">
                    <router-link class="other-con" to="/">
                        <div class="divbg works-picture re" :style="{background : 'url('+raw.html.thumb+') center/contain no-repeat'}">
                            <div class="ab works-copy">{{raw.objclass == "chat-other" ? "Ta在查看..." : "正在查看"}}</div>
                        </div>
                        <div class="clearfix">
                            <p class="works-link fl">{{raw.html.title}}</p>
                            <span class="fr"></span>
                        </div>
                    </router-link>
                </template>
                <template v-if="raw.type == 3">
                    <div class="other-con" @click="goTo('/')">
                        <div class="divbg works-picture re" :style="{background : 'url('+raw.html.thumb+') center/contain no-repeat'}">
                            <div class="ab works-copy">正在查看...</div>
                        </div>
                        <div class="clearfix">
                            <p class="works-link fl works-ellipsis">{{raw.html.title}}</p>
                            <span class="fr worksbtn" @click.stop="pushGoods($event, raw.html.id, raw.html.title, raw.html.thumb)">发送拍品</span>
                        </div>
                    </div>
                </template>
                <div class="other-bg ab shotsprites"></div>
            </div>
        </div>
        <!-- 底部输入栏 -->
        <!--<div class="chat-bottom ab">-->
            <!--<div class="add-con">-->
                <!--<textarea class="add-con-in" id="txtContent" rows="1" cols="50" @keyup="resizeTextarea()" contenteditable="true" v-model="message"> </textarea>-->
            <!--</div>-->
            <!--<div class="ab add-btn" @click="addbtn($event)">发送</div>-->
            <!--<a class="ab add-img" id="uploadfile">+</a>-->
        <!--</div>-->
    </div>
</template>

<script>
    // require("module/newschat/newschat.css");
    import newschat from '@/components/find/newschat'

    var ajax = require("ajax");

    export default {
        data: function(){
            return {
                //系统消息
                news : [],
                page : 0,
                ajaxLock : true,
                //对方头像
                otherThumb : require("../../assets/img/logo.png"),
                //对方名字
                otherName : "小福拍",
                // loading
                loaded: false,
            }
        },
        created : function(){
            this.getMsg();
        },
        mounted : function(){
            //调整页面显示位置
            var $height = $(window).height();
            $("#newschat").css("height",$height);
            $(".chat-list").scrollTop($(".chat-list")[0].scrollHeight);

            // 绑定上拉加载
            this.pullUpLoading();

            this.$nextTick(function() {
                this.addRouterLink()
            })

        },
        beforeDestroy: function() {
            $(".footer-bottom a").eq(2).removeClass("router-link-active");
        },
        methods : {
            getMsg : function() {
                var that = this;

                if(this.ajaxLock == false){
                    return;
                }

                ajax.getSystemMsg(this.page, function(res){
                    if(res.status == 200){
                        that.page++
                        for(var i=0;i<res.data.length;i++){
                            //插入消息
                            that.news.unshift({
                                objclass : "chat-other",
                                html : res.data[i].msg,
                                type : 0
                            });

                            //插入时间
                            that.news.unshift({
                                objclass : "chat-time",
                                html : that.timeToDate(res.data[i].inputtime * 1000),
                                type : 0
                            });
                        }

                    } else {
                        that.ajaxLock = false;
                    }
                });
            },
            timeToDate : function(timestamp){
                var date = new Date(timestamp);

                var y = date.getFullYear();
                var m = (m = date.getMonth() + 1) < 10 ? "0"+m : m;
                var d = (d = date.getDate()) < 10 ? "0"+d : d;
                var h = (h = date.getHours()) < 10 ? "0"+h : h;
                var i = (i = date.getMinutes()) < 10 ? "0"+i : i;
                var s = (s = date.getSeconds()) < 10 ? "0"+s : s;

                //获取当天00:00:00的时间
                var dd = new Date();
                dd.setHours(0);
                dd.setMinutes(0);
                dd.setSeconds(0);

                //如果时间大于当天00:00:00的时间，则返回小时，分钟，秒数
                //如果时间小于当天00:00:00的时间，则返回年，月，日，小时，分钟，秒数
                if(date >= dd){
                    return h+":"+i+":"+s;
                } else {
                    return y+"/"+m+"/"+d+" "+h+":"+i+":"+s;
                }
            },

            // 上拉加载更多
            pullUpLoading: function () {
                var _this = this;
                var timer = null;
                var before = $('.chat-list').scrollTop();
                var beforeHeigth = $(".chat-list")[0].scrollHeight;

                clearTimeout(timer);
                $('.chat-list').on('scroll', function () {
                    var after = $('.chat-list').scrollTop();
                    // console.log(before + '/' + after)
                    // 判断滚动条滚到底部 执行事件
                    if (before > after) {
                        if ($('.chat-list').scrollTop() <= 0) {
                            _this.loaded = true;
                            // 模拟获取数据 完成之后取消loading
                            timer = setTimeout(function () {
                                // 在这里把前面的聊天记录push进渲染数据
                                _this.getMsg();
                                _this.loaded = false;

                                _this.$nextTick(function () {
                                    //高度计算放到DOM更新后的回调中进行
                                    var afterHeight = $(".chat-list")[0].scrollHeight;
                                    // 滚动条滚动距离
                                    var distance = afterHeight - beforeHeigth;
                                    beforeHeigth = afterHeight;
                                    // 设置加载数据之后滚动条保留之前位置
                                    $(".chat-list").scrollTop(distance);
                                });
                            }, 1000)
                        }
                    }
                });
            },

            // footer 样式
            addRouterLink: function() {
                $(".footer-bottom a").eq(2).addClass("router-link-active");
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style> 
  .other-con p img {
    width: 100%;
    position: relative;
    z-index: 10;
  }
</style>