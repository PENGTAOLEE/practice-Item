<template>
<div class="bank-details-box">
    <!-- 银行卡信息 -->
    <div class="bankCardInfo_title">银行卡信息（必填）</div>
    <div class="cell-input" @click="alterMask">
        <div class="cell-input_hd" >
            <label class="cell-input_label">开户名</label>
        </div>
        <div class="cell-input_bd">
            <span class="cell-input_input">{{ userName }}</span>
        </div>
    </div>
    <div class="cell-input" @click="alterMask">
        <div class="cell-input_hd">
            <label class="cell-input_label">身份证号</label>
        </div>
        <div class="cell-input_bd">
            <span class="cell-input_input">{{ identificationCard | privateInfo }}</span>
        </div>
    </div>
    <div class="cell-input">
        <div class="cell-input_hd">
            <label class="cell-input_label">银行卡号</label>
        </div>
        <div class="cell-input_bd">
            <!-- 银行卡号输入 -->
            <input class="cell-input_input" id="idNumber" @focus="validationType" @input="validationType" type="text" placeholder="支持信用卡、借记卡" v-model="bankCard">
        </div>
    </div>
    <div class="cell-input">
        <div class="cell-input_hd">
            <label class="cell-input_label">卡类型</label>
        </div>
        <div class="cell-input_bd">
            <ul>
                <li>{{cardType}}</li>
            </ul>
        </div>
    </div>
    <!--更多银行卡信息（余额提现时必须）-->
    <div class="bankCardInfo_title">更多银行卡信息（余额提现时必须）</div>
    <div class="cell-input">
        <div class="cell-input_hd">
            <label class="cell-input_label" >手机号</label>
        </div>
        <div class="cell-input_bd">
            <input class="cell-input_input" type="number" placeholder="开户时所填写的手机号" v-model="mobilePhone">
        </div>
    </div>
    <div class="cell-input">
        <div class="cell-input_hd">
            <label class="cell-input_label">开户行省份</label>
        </div>
        <div class="cell-input_bd">
            <input class="cell-input_input" type="text" placeholder="开户行所在省份 如：北京" v-model=" userProvince">
        </div>
    </div>
    <div class="cell-input">
        <div class="cell-input_hd">
            <label class="cell-input_label">开户行城市</label>
        </div>
        <div class="cell-input_bd">
            <input class="cell-input_input" type="text" placeholder="开户行所在城市 如：北京" v-model="userCity">
        </div>
    </div>
    <div class="cell-input">
        <div class="cell-input_hd">
            <label class="cell-input_label">开户行支行</label>
        </div>
        <div class="cell-input_bd">
            <input class="cell-input_input" type="text" placeholder="开户行银行支行名" v-model="bankBranch">
        </div>
    </div>
    <!-- 上传资质文件（余额提现时必须）-->
    <div class="bankCardInfo_title">上传资质文件（余额提现时必须）</div>
    <div class="clr wrap">
        <label 
            class="fl upload divbg re" 
            for="upload1" 
            data-index="0"
            :style="{backgroundImage:'url(' + images.positiveIDCard + ')'}"
        >
            <i id="upload1" class="upload_icon shotsprites icon-upload"></i>
            <div class="upload_text">身份证正面照片</div>
        </label>
        <label 
            class="fr upload divbg re" 
            for="upload2" 
            data-index="1"
            :style="{backgroundImage:'url(' + images.oppositeIDCard + ')'}"
        >
            <i id="upload2" class="upload_icon shotsprites icon-upload"></i>
            <div class="upload_text">身份证反面照片</div>
        </label>
    </div>
    <label 
        class="upload upload__wrap divbg re" 
        for="upload3" 
        data-index="2"
        :style="{backgroundImage:'url(' + images.holdIDCard + ')'}"
    >
        <i id="upload3" class="upload_icon shotsprites icon-upload"></i>
        <div class="upload_text">手持身份证照</div>
    </label>
    <label 
        class="upload upload__wrap divbg re" 
        for="upload4" 
        data-index="3"
        :style="{backgroundImage:'url(' + images.BankCardFront + ')'}"
    >
        <i id="upload4" class="upload_icon shotsprites icon-upload"></i>
        <div class="upload_text">银行卡正面照片</div>
    </label>
    <!-- 按钮 -->
    <div class="btn_area">
        <!-- 添加成功后跳到列表页 -->
        <a href="javascript:;" class="btn" @click='saveData'>保存</a>
        <a v-if="!isAdd" href="javascript:;" @click="deleteData" class="btn_default">删除</a>
    </div>

    <!-- 弹窗 修改身份信息 -->
    <div class="papup-cpm" v-if="isAlterMask">
        <div class="mask" v-on:click="alterMask()"></div>
        <div class="cpm">
            <div class="cpm_inner">
                <div class="cpm_text-area">
                    <i class="shotsprites warning"></i>
                    <p class="cpm_text">银行卡所有人身份信息必须与当前用户一致如确认修改，将前往修改身份信息</p>
                </div>
                <div class="cpm_btn-area">
                    <!-- <a class="cpm_btn_ok" href="/bankCardAuth?from=modify_user">确认修改</a> -->
                    <a class="cpm_btn_ok" href="/payalter">确认修改</a>
                    <a class="cpm_btn_close" href="javascript:;"  v-on:click="alterMask" >取消</a>
                </div>
            </div>
        </div>
    </div>
        
    <!-- 上传loading -->
    <div id="upload-box">
        <div class="upload-msg">正在上传</div>
        <div id="upload-progress">0%</div>
        <div class="upload-img">
            <img src="../../assets/img/loading_data.gif" alt="">
        </div>
    </div>

    <!-- confirm弹窗 -->
    <show-confirm v-show="showConf" :msg="tipMsg" @closeBox="closeBox" @childEvent="deleteBankCardEmit"></show-confirm>

    <!-- 组件弹窗 -->
    <show-alert v-show="showAlertBoll" :msg="tipMsg" @closeBox="closePopup"></show-alert>

</div>
</template>
<script>
    var Plupload1 = require("pluploadMore");
    var Plupload2 = require("pluploadMore1");
    var Plupload3 = require("pluploadMore2");
    var Plupload4 = require("pluploadMore3");

    var showAlert = require("@/components/component/showAlert")
    var showConfirm = require("@/components/component/showConfirm")
    // 银行卡类型判断
    var BIN   = require("cardtype");
    // var BIN = require("bankcardinfo");
    var ajax  = require("ajax");
    var utils = require("utils");
    var config = window.config;
    

    export default {
        
        data: function(){
            return {
                isAlterMask: false,

                userName: "",                                       // 开户名  刘璐同学
                identificationCard: '',                             // 身份证号
                bankCard: '',                                       // 银行卡号 6227 0033 2024 0034 988
                mobilePhone: '',                                    // 手机号   15877651169
                userProvince: "",                                   // 开户行省份
                userCity: "",                                       // 开户行城市
                bankBranch: '',                                     // 开户行支行
                cardType: '',                                       // 银行卡类型                
                
                images: {                                           // 上传图片
                    positiveIDCard: '',
                    oppositeIDCard: '',
                    holdIDCard: '',
                    BankCardFront: ''
                },
                index: 0,                                           // 当前触发上传组件下标
                uploadArr: [                                        // 上传图片触发元素
                    "upload1",
                    "upload2",
                    "upload3",
                    "upload4"
                ],
                imgs: [],                                           // 上传图片数组  未使用                                       
                imgsJson : '',                                      // 存库图片格式  未使用
                baseUrl : window.config.img_url,

                // 弹窗
                showAlertBoll: false,
                tipMsg: '',
                // confirm弹窗
                showConf: false,
            }
        },
        filters: {
            // 隐藏身份证中间数字
            privateInfo: function (value) {
                return value.toString().replace(value.substr(6,10), "**********");
            }
        },
        components: {
            'show-alert': showAlert,
            'show-confirm': showConfirm
        },
        computed: {
            // 修改
            isModify: function() {
                return this.$route.params.type == 'modify'
            },

            // 添加
            isAdd: function() {
                return this.$route.params.type == 'add'
            }
        },
        mounted: function() {
            // 修改 | 删除银行卡
            this.isModify && this.getDetails();

            // 添加银行卡
            this.isAdd && this.getMineInfo()

            this.cardType = this.getType(this.bankCard);

            // 初始化上传组件
            var _this = this;
            $('label').on('touchend',function() {
                _this.index = $(this).attr('data-index')
            })
            // $.each(_this.uploadArr,function(i,n){
            //     var self = this.toString();
            //     // 为当前元素创建 input:file dom
            //     _this.pluploadInit(self)
            // });
            
            // 分别为不同按钮配置input [临时解决方案 by lpt]
            var plupload1 = new Plupload1();
            var plupload2 = new Plupload2();
            var plupload3 = new Plupload3();
            var plupload4 = new Plupload4();
            plupload1.init({
                browseButton: 'upload1',
                fileUploadEvent: function(up, file, info){
                    _this.images.positiveIDCard = _this.baseUrl + file;
                },
                fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
            })
            plupload2.init({
                browseButton: 'upload2',
                fileUploadEvent: function(up, file, info){
                    _this.images.oppositeIDCard = _this.baseUrl + file;
                },
                fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
            })
            plupload3.init({
                browseButton: 'upload3',
                fileUploadEvent: function(up, file, info){
                    _this.images.holdIDCard = _this.baseUrl + file;
                },
                fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
            })
            plupload4.init({
                browseButton: 'upload4',
                fileUploadEvent: function(up, file, info){
                    _this.images.BankCardFront = _this.baseUrl + file;
                },
                fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
            })


            this.$nextTick(function(){
                this.addRouterLink()
                utils.getKeyboard($('.cell-input_input'),$('.footer-bottom'))
            })
        },
        beforeDestroy: function(){
            $(".footer-bottom a").eq(3).removeClass("router-link-active");
        },
        methods: {
            alterMask: function() {
                this.isAlterMask = !this.isAlterMask;
            },

            /**
             * 图片上传初始化
             * @param  {string} self 图片上传绑定元素
             * @return 无
             */
            pluploadInit: function(self) {
                var _this = this;
                var plupload = new Plupload();

                plupload.init({
                    browseButton: self,
                    fileUploadEvent: function(up, file, info){
                        var emitId = this.browseButton[_this.index];
                        if (emitId == 'upload1') {
                            _this.images.positiveIDCard = _this.baseUrl + file;
                        } else if (emitId == 'upload2') {
                            _this.images.oppositeIDCard = _this.baseUrl + file;
                        } else if (emitId == 'upload3') {
                            _this.images.holdIDCard = _this.baseUrl + file;
                        } else if (emitId == 'upload4') {
                            _this.images.BankCardFront = _this.baseUrl + file;
                        };
                    },
                    fileType: ["image/jpeg","image/png","image/gif","image/jpg"]
                })
            },

            /**
             * 银行卡输入，四位一空格
             * @return 无
             */
            validationType: function() {
                var c = '';
                for(var i=0;i<idNumber.value.length; i++) {

                    if(/^[0-9]$/.test(idNumber.value.charAt(i))||(((i+1)%5==0)&&(idNumber.value.charAt(i)==" "))) {
                        c=c+idNumber.value.charAt(i);
                    }

                    if((c.length%5)==0&&(c.charAt(c.length-1)!=" ")&&(c.length!=0)) {
                        c=c.substring(0,c.length-1)+" "+c.charAt(c.length-1);
                    }   
                }
                this.bankCard = c;
                // 验证卡类型
                this.cardType = this.getType(this.bankCard);
            },

            /**
             * @param  {string} str 银行卡号字符串
             * @return {string}     返回当前银行卡的类型
             */
            getType: function(str) {
                var _this = this;
                // 处理传入的参数 去掉空格
                var str = str.replace(/\s+/g,'');
                var name;
                BIN.getBankBin(str,function(err,data){
                    if(!err){
                        name = data.bankName + ' ' + data.cardTypeName
                    }
                })
                return name
            },

            // 银行卡图片上传
            formatImgs : function(){
                this.imgsJson = JSON.stringify(this.imgs);
            },

            // 根据银行卡id 获取银行卡数据 => 修改银行卡
            getDetails: function() {
                var _this = this;
                var id = utils.getRequest().bankid;
                ajax.getBankCardDetails(id,function(data){
                    if (data.status == 200) {
                        var oData = data.data;
                        // 当前数据赋值dom
                        _this.userName              = oData.rel_name;
                        _this.identificationCard    = (oData.id_number) + '';
                        _this.bankCard              = oData.number;
                        _this.mobilePhone           = oData.mobile;
                        _this.userProvince          = oData.province;
                        _this.userCity              = oData.city;
                        _this.bankBranch            = oData.bank;
                        _this.cardType              = oData.card_type;

                        _this.images.positiveIDCard = oData.id_number_pic_f;
                        _this.images.oppositeIDCard = oData.id_number_pic_b;
                        _this.images.holdIDCard     = oData.id_number_pic;
                        _this.images.BankCardFront  = oData.card_pic;
                    } else {
                        _this.showAlertTip(data.msg)
                    }
                })
            },

            // 无参数获取银行卡数据 => 保存银行卡
            getMineInfo: function() {
                var _this = this;
                ajax.showIdentity(function(data){
                    if (data.status == 200) {
                        var oData = data.data;
                        // 当前数据赋值dom
                        _this.userName              = oData.rel_name;
                        _this.identificationCard    = (oData.id_number) + '';
                    } else {
                        _this.showAlertTip(data.msg)
                    }
                })
            },


            // 点击保存按钮
            saveData: function() {
                var allData = {
                    rel_name:        this.userName,
                    id_number:       this.identificationCard,
                    number:          this.bankCard.replace(/\s+/g,''),
                    card_type:       this.cardType,
                    mobile:          this.mobilePhone,
                    province:        this.userProvince,
                    city:            this.userCity,
                    bank:            this.bankBranch,
                    id_number_pic_f: this.images.positiveIDCard,
                    id_number_pic_b: this.images.oppositeIDCard,
                    id_number_pic:   this.images.holdIDCard,
                    card_pic:        this.images.BankCardFront
                }

                var id = utils.getRequest().bankid;              // 银行卡id
                var BKregexp = /^(\d{16}|\d{19})$/;              // 银行卡
                var MBregexp = /^1[3|4|5|8][0-9]\d{4,8}$/;       // 手机号

                if( !(BKregexp.test(allData.number)) ) {
                    this.showAlertTip('请输入正确格式的银行卡号')
                } else if ( !(MBregexp.test(allData.mobile)) ) {
                    this.showAlertTip('请输入正确格式的手机号')
                } else if( allData.rel_name.length == 0 ) {
                    this.showAlertTip('请设置开户名')
                } else if( allData.id_number.length == 0 ) {
                    this.showAlertTip('请设置身份证号')
                } else if( allData.mobile.length == 0 ) {
                    this.showAlertTip('请输入手机号')
                } else if( allData.province.length == 0 ) {
                    this.showAlertTip('请输入开户行省份')
                } else if( allData.city.length == 0 ) {
                    this.showAlertTip('请输入开户行城市')
                } else if( allData.bank.length == 0 ) {
                    this.showAlertTip('请输入开户行支行')
                } else if( allData.id_number_pic_f.length == 0 ) {
                    this.showAlertTip('请上传身份证正面照片')
                } else if( allData.id_number_pic_b.length == 0 ) {
                    this.showAlertTip('请上传身份证反面照片')
                } else if( allData.id_number_pic.length == 0 ) {
                    this.showAlertTip('请上传手持身份证照片')
                } else if( allData.card_pic.length == 0 ) {
                    this.showAlertTip('请上传银行卡正面照片')
                } else if(!allData.card_type) {
                    this.showAlertTip('该银行卡暂时不支持，请换张卡重试')
                } else {
                    // 保存还是修改
                    if (this.isModify) {
                        allData.id = id;
                        this.editBankCard(allData);
                    } else {
                        this.addBankCard(allData)
                    }
                }

            },

            // 添加用户银行卡 
            addBankCard: function(obj) {
                var _this = this;
                ajax.addBankCard(obj,function(data) {
                    if (data.status == 200) {
                        _this.showAlertTip(data.msg)
                        if (utils.getRequest().from == 'selectpage') {
                            // 选择银行卡 
                            _this.$router.push('/bankcardadd/selectpage')
                        } else {
                            // 修改银行卡
                            _this.$router.push('/bankcardadd/bankcard')
                        }
                    } else if(data.status == 501) {
                        _this.showAlertTip("数据有误，请认真审查您填写的个人信息")
                    } else {
                        _this.showAlertTip(data.msg)
                    }
                })
            },
            // 修改用户银行卡 
            editBankCard: function(obj) {
                var _this = this;
                ajax.editBankCard(obj,function(data) {
                    if (data.status == 200) {
                        _this.showAlertTip(data.msg)
                        _this.showAlertTip(data.msg)
                        if (utils.getRequest().from == 'selectpage') {
                            // 选择银行卡 
                            _this.$router.push('/bankcardadd/selectpage')
                        } else {
                            // 修改银行卡
                            _this.$router.push('/bankcardadd/bankcard')
                        }
                    } else if(data.status == 501) {
                        _this.showAlertTip("数据有误，请认真审查您填写的个人信息")
                    } else {
                        _this.showAlertTip(data.msg)
                    }
                })
            },

            // 删除银行卡
            deleteBankCard: function(bankid) {
                var _this = this;
                ajax.deleteBankCard(bankid,function(data){
                    if (data.status == 200) {
                        _this.showAlertTip(data.msg)
                        setTimeout(function(){
                            _this.$router.push('/bankcardadd/bankcard')
                        },1500)
                        
                    } else {
                        _this.showAlertTip(data.msg)
                    }
                })

            },

            // 点击银行卡删除按钮
            deleteData: function() {
                this.tipMsg = "您确定要删除该银行卡?";
                this.showConf = true;
            },

            // confirm点击确定按钮 删除操作
            deleteBankCardEmit: function() {
                var bankid = utils.getRequest().bankid;
                this.deleteBankCard(bankid)
            },

            // 关闭confirm 弹窗
            closeBox: function() {
                this.showConf = false;
            },

            // alert弹窗提醒
            showAlertTip: function(tip) {
                this.tipMsg = tip;
                this.showAlertBoll = true;
            },
            // alert弹窗关闭
            closePopup: function() {
                this.showAlertBoll = false;
            },

            // footer 样式添加
            addRouterLink: function() {
                $(".footer-bottom a").eq(3).addClass("router-link-active");
            }


        }
    }

</script>
<style>
/* input 输入 */
.bank-details-box {
    padding-bottom: 4rem;
    font-family: PingFangSC;
}
.cell-input{
    position: relative;
    padding:1.5rem;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    line-height: 1;
    font-family: PingFangSC;
    font-size: 1.6rem;
    background-color: #fff;
}
.cell-input:before{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.cell-input_label{
    display: block;
    width: 10rem;
    color: #333;
    word-wrap: break-word;
    word-break: break-all;
}
.cell-input_bd{
    -webkit-flex: 1;
    flex: 1;
}
.cell-input_input{
    width: 100%;
    line-height: 1;
    color: #999;
}
/* 标题 */
.bankCardInfo_title{
    padding: 0 1.5rem;
    height: 5.3rem;
    line-height: 5.3rem;
    color: #666;
    font-size: 1.6rem;
    font-family: PingFangSC;
}
/* 按钮 */
.btn_area{
    margin: 4rem 3.75rem;
}
.btn{
    display: block;
    margin: 0 auto;
    padding:0 1rem;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    background-color: #15af25;
    color: #fff;
    font-size: 1.6rem;
    border-radius: 0.5rem;
}
.btn:active{
    background-color: #64d86c;
}
.btn_default{
    display: block;
    margin: 0 auto;
    padding:0 1rem;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    color: #fff;
    font-size: 1.6rem;
    border-radius: 0.5rem;
    margin-top: 1.5rem;
    background-color: #ccc;
}
/* 上传 */
.wrap{
    margin:0 auto;
    width:34.5rem;
}
.upload{
    display: block;
    width:16.5rem;
    height:10.5rem;
    background-color: #fff;
}
.upload__wrap{
    margin:1rem auto 0;
    width:34.5rem;
    height:18rem;
    overflow: hidden;
}
.upload_icon{
    margin:1.3rem auto 2rem;
    display: block;
}
.upload__wrap .upload_icon{
    margin:5rem auto 2.5rem;
}
.upload_text{
    line-height:1;
    color: #666;
    font-size:1.4rem;
    text-align: center;
}

/*修改身份信息*/
.papup-cpm {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 29;
    width: 100%;
    height: 100%;
}
.mask{
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background: rgba(0,0,0,0.4);
}
.cpm{
    position: absolute;
    bottom:0;
    left:0;
    width: 100%;
    background-color: #f7f8f7;
    overflow: hidden;
}
.cpm_icon{
    margin:1.25rem auto .8rem;
    display: block;
}
.cpm_text-area, .cpm_btn-area{
    padding:0 3.5rem;
}
.cpm_text{
    line-height: 2.8rem;
    font-size: 1.6rem;
    color: #000;
    text-align: center;
}
.cpm_btn_ok, .cpm_btn_close{
    margin: 1.9rem 0;
    display: block;
    width: 30rem;
    height: 4.3rem;
    line-height: 4.3rem;
    color: #333;
    font-size: 1.6rem;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: .3rem;
}
.cpm_btn_close{
    background-color: #808593;
    color: #fff;
}
.cpm_btn_ok:active{
    background: rgba(0,0,0,.1);
}
.cpm_btn_close:active{
    background: rgba(0,0,0,.5);
}
.warning {
    display: block;
    width: 5.2rem;
    height: 5.2rem;
    margin: 0 auto;
    margin-top: .7rem;
    background-position: -24.2rem -15.7rem;
}
.opacityed {
    display: block;
    width: 100%;
    height: 100%;
}

/* 正在上传 */
#upload-box {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 19;
    -webkit-transform: translate3D(-50%,-50%,0);
    transform: translate3D(-50%,-50%,0);
    width: 24rem;
    height: 14rem;
    background-color: rgba(0,0,0,.5);
    border-radius: .5rem;
    font-size: 1.6rem;
    text-align: center;
    display: none;
}
#upload-box div {
    color: #f0f0f0;
}
.upload-msg {
    margin-top: 2rem;
}
#upload-progress {
    margin: 1rem 0;
}
.upload-img {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    margin-top: 0rem;
}
.upload-img img {
    width: 100%;
    height: 100%;
}
</style>
