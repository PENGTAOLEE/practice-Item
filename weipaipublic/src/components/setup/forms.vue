<template>
    <div class="Forms">
        <div class="formsList">
            
            <form action="#">
                <div class="input-group cc">
                    <label>收货人</label>
                    <input type="text" placeholder="姓名" class="textName" id="textName" v-model="userName"/>
                    <em class="compete-row" ></em>
                </div>
                <div class="input-group cc">
                    <label>手机号码</label>
                    <input type="text" placeholder="11位手机号" required id="numberPhone" v-model="numberPhone" />
                </div>
                <div class="input-group cc">
                    <label>地区信息</label>
                    <input type="text" placeholder="地区信息" class="textAdd"  id="textAdd" v-model="addressDetails"/>
                    <em class="compete-row-1" @click="getAddressInfo()"></em>
                </div>          
                <div class="input-group cc">
                    <label>详细地址</label>
                    <input type="text" placeholder="街道门牌信息"  id="openNub" v-model="numberDoor"/>
                </div>
                <div class="input-group cc">
                    <label>邮政编码</label>
                    <input type="text" placeholder="邮政编码" id="youNub" v-model="postCode" />
                </div>
                
                <div class="formSave" @click="aformSave">保存</div>
                
                <!--弹窗背景层-->
                <div class="formShow">
                    <dl class="formDl">
                        <dt class="formDt" id="formDt">提示信息</dt>
                        <dd class="formDd">确定</dd>
                    </dl>
                </div>
                
                
            </form>
            
            
        </div>

    <!--    <div>
            <ul>
                <li style="font-size: 25px" v-for="address in addressList">{{ address.address }}{{ address.title }}</li>
            </ul>
        </div>
     -->
        <show-alert v-if="is_alert" :msg='alert_msg' @closeBox='closeAlert'></show-alert>
    </div>
    
</template>

<script>
    // var footer = require("module/footer/footer");
    // require("module/Forms/Forms.css");
    var ajax = require('ajax');
    var utils = require("utils");
    var showAlert = require("@/components/component/showAlert");
    export default {
        data:function(){
            return {
                addressList : [],
                // 地区选择
                addressTitle: '',
                addressDetails: '',
                // 表单相关
                userName: '',
                numberPhone: '',
                numberDoor: '',
                postCode: '',
                address_id: '',
                is_alert: false,
                alert_msg: '',
            }
        },
        component: {
            "show-alert": showAlert
        },
        created: function () {
            var from = utils.getRequest().from;
            var address_id = utils.getRequest().address_id;
            if(address_id){
                this.getAddressInformation(address_id);
                document.title = '修改地址';
            }else{
                document.title = '新增地址';
            }
        },
        mounted: function(){
                this.getAddressTitle();
        },
        methods: {
            getAddressInformation: function(address_id){
                var that = this;
                ajax.getAddressInformation(address_id,function(res){
                    if(res.status==200){
                        that.userName = res.data.name;
                        that.numberPhone = res.data.mobile;
                        that.addressDetails = res.data.area;
                        that.numberDoor = res.data.address;
                        that.postCode = res.data.postcode;
                        that.address_id = address_id;
                    }
                })
            },
            // 保存地址
            aformSave: function(){
                var textName    = $("#textName").val();
                var numberPhone = $("#numberPhone").val();
                var textAdd     = $("#textAdd").val();
                var openNub     = $("#openNub").val();
                var youNub      = $("#youNub").val();

                var formAlldata = {
                    "name": textName,
                    "mobile": numberPhone,
                    "area": textAdd,
                    "address": openNub,
                    "postcode": youNub
                }
                
                // 验证用户名
                var reg = /^[\u4E00-\u9FA5]{2,4}$/;
                // 验证手机号
                var phoneReg = /^1(3|4|5|7|8)\d{9}$/; 
                // 前端验证
                // 前端用户名验证   textName == "" || !reg.test(textName)
                if( textName == "" ){
                    $(".formShow").show().find(".formDt").html("请输入正确的姓名");
                    $(".formDd").click(function() {
                        $(".formShow").hide();
                    })
                } else if (numberPhone == "" || numberPhone.length!=11 || !phoneReg.test(numberPhone) ) {
                    $(".formShow").show().find(".formDt").html("请输入正确的手机号码");
                    $(".formDd").click(function() {
                        $(".formShow").hide();
                    })
                } else if(textAdd.length == "") {
                    $(".formShow").show().find(".formDt").html("请填写地区信息");
                    $(".formDd").click(function() {
                        $(".formShow").hide();
                    })
                } else if ( youNub==""||!/^[0-9][0-9]{5}$/.test(youNub) ) {
                    $(".formShow").show().find(".formDt").html("请输入正确的邮政编码");
                    $(".formDd").click(function(){
                        $(".formShow").hide();
                    })
                } else {
                    var _this = this;
                    var from = utils.getRequest().from;
                    var id = utils.getRequest().id;
                    var address_id = utils.getRequest().address_id;
                    if(address_id){
                        ajax.goEditAddress(_this.userName,_this.numberPhone,_this.addressDetails,_this.numberDoor,_this.postCode,_this.address_id,function(res){
                            if(res.status==200){
                                if(from=='buyerset'||from=='compete'){
                                    _this.$router.replace('/setaddress?from='+from);
                                }else if(from=='payment'){
                                    _this.$router.replace('/location?from='+from);
                                }else{
                                    _this.$router.replace('/location?from='+from+'&id'+id);
                                }
                            }else{
                                _this.alert_msg = res.data.msg;
                                _this.is_alert  = true;
                            }
                        });
                    }else{
                        ajax.addressAdd(formAlldata,function(res){
                            if (res.status == 200) {
                                if(from=="sellersendgood"){//卖家立即发货
                                    _this.$router.push('/location?from='+from+'&id='+id);
                                }else if(from=="selleragreereturn"){//卖家同意退款
                                    _this.$router.push('/location?from='+from+'&id='+id);
                                }else if(from=="buyerset"||from=='compete'){//买家设置中心
                                    _this.$router.push('/setaddress?from='+from);
                                } else if(from=="payment") {// 支付地址选择 edit by lpt
                                    _this.$router.push('/location?from=payment');
                                }else{
                                    _this.$router.push('/location');
                                }   
                            } else {
                                $(".formShow").show();
                                $(".formShow").find(".formDt").html(res.msg);
                                $(".formDd").click(function(){
                                    $(".formShow").hide();
                                })
                            }
                        });
                    }
                    
                    

                }                   
            },

            // 获取地图选中地址
            getAddressInfo : function(){
                var from = utils.getRequest().from;
                var id = utils.getRequest().id;
                var address_id = utils.getRequest().address_id;
                if(address_id){
                    if (utils.getRequest().from == 'payment') { // edit by lpt
                      this.$router.push('/addressmap?from=payment'+'&address_id='+address_id);
                    }else if(from=="sellersendgood"){//卖家立即发货
                        this.$router.push('/addressmap?from='+from+'&id='+id+'&address_id='+address_id);
                    }else if(from=="selleragreereturn"){//卖家同意退款
                        this.$router.push('/addressmap?from='+from+'&id='+id+'&address_id='+address_id);
                    }else if(from=="buyerset"||from=="compete"){//买家卖家设置中心
                        this.$router.push('/addressmap?from='+from+'&address_id='+address_id);
                    }else {
                        this.$router.push('/addressmap'+'?address_id='+address_id);
                    } 
                
                }else{
                   if (utils.getRequest().from == 'payment') { // edit by lpt
                      this.$router.push('/addressmap?from=payment');
                    }else if(from=="sellersendgood"){//卖家立即发货
                        this.$router.push('/addressmap?from='+from+'&id='+id);
                    }else if(from=="selleragreereturn"){//卖家同意退款
                        this.$router.push('/addressmap?from='+from+'&id='+id);
                    }else if(from=="buyerset"||from=="compete"){//买家卖家设置中心
                        this.$router.push('/addressmap?from='+from);
                    }else {
                        this.$router.push('/addressmap');
                    } 
                }
                // 把当前已经输入的内容键入sessionStorange
                var forms_user_name,
                    forms_number_phone,
                    forms_number_door,
                    forms_post_code;

                forms_user_name    = $("#textName").val();
                forms_number_phone = $("#numberPhone").val();
                forms_number_door  = $("#openNub").val();
                forms_post_code    = $("#youNub").val();

                sessionStorage.setItem('forms_user_name',forms_user_name);
                sessionStorage.setItem('forms_number_phone',forms_number_phone);
                sessionStorage.setItem('forms_number_door',forms_number_door);
                sessionStorage.setItem('forms_post_code',forms_post_code);
            },

            // 读取 sessionStorange 
            getAddressTitle: function() {
                    if(sessionStorage.getItem('addressTitle')){
                    //地图选择位置
                    this.addressTitle = sessionStorage.getItem('addressTitle');
                    this.addressDetails = sessionStorage.getItem('addressDetails');

                    // 事先填写好的数据
                    this.userName    = sessionStorage.getItem('forms_user_name');
                    this.numberPhone = sessionStorage.getItem('forms_number_phone');
                    this.numberDoor  = sessionStorage.getItem('forms_number_door');
                    this.postCode    = sessionStorage.getItem('forms_post_code');

                    //使用完毕移除缓存
                    sessionStorage.removeItem('addressTitle');
                    sessionStorage.removeItem('addressDetails');
                    sessionStorage.removeItem('forms_user_name');
                    sessionStorage.removeItem('forms_number_phone');
                    sessionStorage.removeItem('forms_number_door');
                    sessionStorage.removeItem('forms_post_code');
                }
               
            },
            closeAlert: function(){
                this.is_alert = false;
            },
        },
    }   
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.formsList{
    background: #fff;
}
.compete-row{
    width: 1.75rem;
    height: 2.3rem;
    background:url(../../assets/img/addIocn.png) no-repeat;
    background-size: 100%;
    float: right;
    /*margin-top: .5rem;*/
}
.compete-row-1{
    width: 1.75rem;
    height: 2.3rem;
    background:url(../../assets/img/phone.png) no-repeat;
    background-size: 100%;
    float: right;
}
.input-group{
    padding: 1.25rem 1.5rem;
    font-size: 1.6rem;
    border-bottom: .05rem solid #ddd;
}
.compete-row{
    width: 1.75rem;
    height:2.3rem;
    background:url(../../assets/img/phone.png) no-repeat;
    background-size: 100%;
    float: right;   
}
.compete-row-1{
    width: 1.75rem;
    height:2.3rem;
    background:url(../../assets/img/addIocn.png) no-repeat;
    background-size: 100%;
    float: right;   
}
/*.textName{
    background:url(../../assets/img/phone.png) no-repeat;
    background-position:95% center;
    background-size:auto 100%
}
.textAdd{
    background:url(../../assets/img/addIocn.png) no-repeat;
    background-position:95% center;
    background-size:auto 100%
}*/

.input-group label{
    float: left;
    width:9.5rem;
    float: left;
}

.input-group input{
    float: left;
    /*width: 25rem;*/
    color: #999;
    text-overflow:ellipsis;
    overflow: hidden;
    white-space: normal;
}

.formSave{
    background:#15af25;
    color:#fff;
    text-align:center;
    border:0;
    border-radius:1rem;
    padding:3%;
    font-size:1.6rem;
    width: 90%;
    margin:4rem 5% 4rem;
}

/*弹窗效果*/
.formShow{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index:9999;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    display: none;
}

.formDl{
    position:absolute;
    top:50%;
    left:50%;
    width: 24rem;
    -ms-transform: translate(-50%,-50%); /* IE 9 */
    -webkit-transform: translate(-50%,-50%);    /* Safari and Chrome */
    -o-transform: translate(-50%,-50%); /* Opera */
    -moz-transform: translate(-50%,-50%);   /* Firefox */
    transform: translate(-50%,-50%);
    background-color:#fff;
    border-radius: 1rem;
    font-size: 1.4rem;
}
.formDl .formDt{
    text-align: center;
    padding:2rem;
    border-bottom:.05rem solid #e5e5e5;
    color: #333;
}
.formDl .formDd{
    text-align: center;
    font-size: 1.4rem;
    color: #6699ff;
    padding: 1rem;
}
</style>