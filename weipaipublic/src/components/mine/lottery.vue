<template>
    <div class="wrapper-lottery">
        <!-- main content -->
        <div class="content-lottery">
            <div class="lottery-sign">
                <span class="lottery-sign-text">已签到</span>
                <div class="signin-days">
                    <strong class="lottery-days-number">3</strong>天
                </div>
            </div>
            <div class="lottery-box">
                <a class="lottery-button" @click="stateLottery">
                    抽奖
                </a>
                <div class="lottery-num">
                    剩余抽奖次数: <span>1</span>
                </div>
            </div>
            <!-- 转盘 -->
            <div class="lottery-turntable">
                <!-- 上排 -->
                <div class="lottery-prize p1">
                    <div class="lottery-prize-icon spritesmap lottery-cash"></div>
                    <div class="lottery-desc">
                        1元
                    </div>
                </div>
                <div class="lottery-prize p2">
                    <div class="lottery-prize-icon spritesmap lottery-integral"></div>
                    <div class="lottery-desc">
                        5积分
                    </div>
                </div>
                <div class="lottery-prize p3">
                    <div class="lottery-prize-icon spritesmap lottery-cash"></div>
                    <div class="lottery-desc">
                        6元
                    </div>
                </div>
                <div class="lottery-prize p4">
                    <div class="lottery-prize-icon spritesmap lottery-thanks"></div>
                    <div class="lottery-desc">
                        再接再厉
                    </div>
                </div>
                <!-- 下排 -->
                <div class="lottery-prize p8">
                    <div class="lottery-prize-icon spritesmap lottery-integral"></div>
                    <div class="lottery-desc">
                        1积分
                    </div>
                </div>
                <div class="lottery-prize p7">
                    <div class="lottery-prize-icon spritesmap lottery-cash"></div>
                    <div class="lottery-desc">
                        3元
                    </div>
                </div>
                <div class="lottery-prize p6">
                    <div class="lottery-prize-icon spritesmap lottery-thanks"></div>
                    <div class="lottery-desc">
                        再接再厉
                    </div>
                </div>
                <div class="lottery-prize p5">
                    <div class="lottery-prize-icon spritesmap lottery-integral"></div>
                    <div class="lottery-desc">
                        10积分
                    </div>
                </div>
            </div>
            <!-- Close button -->
            <div class="spritesmap lottery-close" @click="close"></div>
            <!-- Close button end -->
        </div>
        <!-- Main content end -->
    </div>
</template>

<script>
import ajax from "ajax";

var $ = function(id) {
    return document.querySelector(id);
}
var LotteryData = {
    current: -1, //当前位置
    count: 0, //奖品数
    speed: 50, 
    times: 0, //已转过的次数
    cycle: 64, //至少转动次数
    prize: 0, //中奖位置默认值: 0
    prizes: [], //存储奖品格子
    numArr:[1,2,3,4,5,6,7,8],
    callback: null, //停止后的行为
    rolling: false,
    timer: null, //定时器
    imgArr: [] //存储奖品图片
}
/**
 * key: 后端返回值
 * value: 前端对应值
 */
const map = {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 7,
    6: 6,
    7: 5,
    8: 4
}

// 奖品字典
const dist = {
    1: "1元",
    2: "5积分",
    3: "6元",
    4: "再接在励",

    5: "1积分",
    6: "3元",
    7: "再接再厉",
    8: "10积分"
}

// 奖品类型
// type=0: 再接再厉；type=1: 积分；type=2: 金钱
const prizeType = [
    {   
        index: 1,
        type: 2,
        name: '1元'
    },
    {
        index: 2,
        type: 1,
        name: '5积分'
    },
    {
        index: 3,
        type: 2,
        name: '6元'
    },
    {
        index: 4,
        type: 0,
        name: '再接再厉'
    },
    {
        index: 5,
        type: 1,
        name: '1积分'
    },
    {
        index: 6,
        type: 2,
        name: '3元'
    },
    {
        index: 7,
        type: 0,
        name: '再接再厉'
    },
    {
        index: 8,
        type: 1,
        name: '10积分'
    }
]

class Lottery {
    constructor() { 
    }

    init() {
        // 把Dom的渲染顺序加入列表
        for(var i of LotteryData.numArr) {
            LotteryData.prizes.push($(`.wrapper-lottery .p${i}`))
        }
    }

    roll() {
        /**
         * 每次当前格子index加一
         * 当转动到最后一个（7） 跳转到 第一个（0）
         */
        LotteryData.current += 1
        if (LotteryData.current > 7) {
            LotteryData.current = 0
        }
        // 获取到当前元素的上一个
        var prev = LotteryData.current - 1;
        if (prev < 0) {
            prev = 7
        }   

        LotteryData.prizes[prev].classList.remove('on')
        LotteryData.prizes[LotteryData.current].classList.add('on')
    }

    stop() {
        clearTimeout(LotteryData.timer)
    }
}

const lottery = new Lottery()

const startRoll = () => {
    LotteryData.times += 1;
    lottery.roll();
    /**
     * 达成条件：
     *      1，大于最小转动次数
     *      2，当前位置等于目标位置
     */
    if( LotteryData.times > LotteryData.cycle + 8 && LotteryData.prize == LotteryData.current) {
        clearTimeout(LotteryData.timer)
        LotteryData.callback && LotteryData.callback()
    } else {
        // 减速
        if (LotteryData.times >= LotteryData.cycle) {
            LotteryData.speed += 40
        }
        LotteryData.timer = setTimeout(startRoll, LotteryData.speed)
    }
}

const getRandom = (m,n) => {
    return Math.floor(Math.random()*(n-m)) + m; 
}

const getNumber = () => {
    var obj = {};
    ajax.getLottery( (res) => {
        if (res.status == 200) {
            obj.num = res.data[0];
            obj.name = res.data[1];
        } else {
            obj.num = 0;
        }
        obj.msg = res.msg;
    })
    return obj;
}

// 模拟一条数据
// var n = getRandom(1,9);
// var o = {"status":"ok","data":{"name":`第${n}个格子`,"level":`${n}`}}
// var obj = {
//     num: n
// }
const start = () => {
    if (Lottery.rolling) {
        return;
    } else {
        LotteryData.rolling = true
    }
    var obj = getNumber();
    if (obj.num) {
        let prize = obj.num;
        // 存缓存
        sessionStorage.setItem('prizeObj',JSON.stringify(prizeType[obj.num - 1]) );
        LotteryData.prize = map[prize];
        LotteryData.callback = () => {
            LotteryData.rolling = false;
            LotteryData.speed = 50;
            LotteryData.times = 0;

            setTimeout(() => {
                alert( prizeType[obj.num - 1].name )
            },500)
        }
        startRoll()
    } else {
        LotteryData.rolling = false;
        alert(obj.msg)
        // sessionStorage.setItem('prizeObj',11);
    }   

}

export default {
    data() {
        return {
            // showLottery: true,
        }
    },
    created () {
    },
    props: ['prizeObj'],
    mounted () {
        lottery.init()
    },
    methods: {
        // 关闭抽奖
        close () {
            this.$emit("closeBox");
        },

        // 抽奖
        stateLottery: function() {
            start();
            jQuery('.lottery-num span').text(0);

            // 触发回调
            setTimeout( () => {
                var prize = sessionStorage.getItem('prizeObj');
                // sessionStorage.removeItem('prizeObj');
                this.$emit('pushEvent',prize)
            },1000)
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper-lottery {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.4);
}

.content-lottery {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 32.7rem;
    height: 46.5rem;
    background: url(../../assets/img/reward_bg.png) no-repeat;
    background-size: cover;
}

.lottery-close {
    position: absolute;
    top: -3.8rem;
    right: 0;
    width: 3.1rem;
    height: 3.1rem;
    background-position: -15.7rem -5.6rem;
}

.lottery-sign {
    position: absolute;
    top: 5.6rem;
    left: 50%;
    -webkit-transform: translate3d(-50%,0,0);
    -ms-transform: translate3d(-50%,0,0);
    -o-transform: translate3d(-50%,0,0);
    transform: translate3d(-50%,0,0);
    width: 11.4rem;
    height: 11.4rem;
    text-align: center;
    font-family: PingFangSC;
}

.lottery-sign-text {
    display: block;
    margin-top: 2rem;
    color: #ff4545;
    font-size: 1.2rem;
}

.signin-days {
    color: #ad1a1a;
    font-size: 1.4rem;
}

.lottery-days-number {
    font-size: 4.4rem;
    line-height: 1;
}

.lottery-box {
    position: absolute;
    top: 21.4rem;
    width: 100%;
    text-align: center;
}

.lottery-button {
    display: inline-block;
    width: 15rem;
    height: 3.4rem;
    margin: 0 auto;
    background-color: #ff4545;
    text-align: center;
    line-height: 3.4rem;
    font-size: 1.4rem;
    color: #fff;
    -webkit-border-radius: 50px / 50px;
       -moz-border-radius: 50px / 50px;
            border-radius: 50px / 50px;
    -webkit-box-shadow: 0px 6px  #bf2323;
    box-shadow: 0px 6px  #bf2323;
}

/*.lottery-button:hover {
}*/
.lottery-button:active {
    position: relative;
    top: 1px;
}

.lottery-num {
    line-height: 3rem; 
    font-family: PingFangSC;
    font-size: 1.2rem;
    color: #999;
}

.lottery-turntable {
    overflow: hidden;
    position: absolute;
    bottom: 1.5rem;
    width: 100%;
    padding-left: 1rem;
}

.lottery-prize {
    width: 6.9rem;
    height: 6.9rem;
    float: left;
    margin: 0 1rem 1rem 0;
    border-radius: 1rem;
    background: #f3f3f3;
    border: .2rem solid #fff;
    text-align: center;
}

.lottery-prize.on {
    border: .2rem solid #facd89;
}

.lottery-prize-icon {
    display: inline-block;
    width: 2.8rem;
    height: 3rem;
    margin-top: 1.2rem;
}

.lottery-prize-icon img {
    width: 100%;
    height: 100%;
}

.lottery-desc {
    font-family: PingFangSC;
    font-size: 1.2rem;
    color: #999;
}

/*现金*/
.lottery-cash {
    background-position: -19.75rem -5.6rem;
}
/*积分*/
.lottery-integral {
    background-position: -23.2rem -5.6rem;
}
/*再接再厉*/
.lottery-thanks {
    width: 3.2rem;
    background-position: -26.7rem -5.6rem;
}
</style>