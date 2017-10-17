<template>
	<div class="apply-index">
		<div class="apply-index-wrap">
			<span class="border-corner row1"></span>
			<span class="border-corner row2"></span>
			<span class="border-corner col1"></span>
			<span class="border-corner col2"></span>
			<div class="apply-index-title"></div>
			<p class="apply-index-desc">
				小福拍是中国首家专注大学生艺术创意和创作的在线拍卖平台，致力于汇聚中外各大艺术院校的优秀学生和高水准的学院艺术作品。
			</p>
			<span class="dot">·</span>
			<span class="dot">·</span>
			<p class="apply-index-invite">我们诚邀您成为小福拍的超级买家，共同助力未来的艺术大师们，推动中国艺术产业的发展和进击！</p>
			<div class="arrow-down"><img src="../../assets/img/arrow_down.png" alt=""></div>
			<div class="tobe-buyer">
				<router-link to="/applyfillin" class="tobe-buyer-btn">成为超级买家</router-link>
			</div>
		</div>
		<p class="service-agreenment">
			*成为超级买家即视为同意《<a href="http://mp.weixin.qq.com/s/jQyMMTd55xmWZ1kPjJHDwA">小福拍超级买家服务协议</a>》
		</p>
		<div class="space">	

		</div>
		<!-- 微信分享 -->
		<wx-share :message="wxShareObj"></wx-share>
	</div>
</template>

<script>
	var sharePage = require('@/components/component/shareSub');
  module.exports = {
		data () {
			return {
				wxShareObj: {},
				logoImg: require("../../assets/img/share_logo.jpg"),
			}
		},
		
		components: {
			'wx-share': sharePage,
      // 'my-footer': footer
	  },     
    created: function() {
    	// 微信分享
      this.wxShareObj.title = "超级买家申请";
      this.wxShareObj.images = this.logoImg; 
      this.wxShareObj.url = location.href;
      this.wxShareObj.desc = "我们诚邀您成为小福拍的超级买家，共同助力未来的艺术大师们，推动中国艺术产业的发展和进击！";
    },   
		mounted: function() {
			document.title = "超级买家申请";
      // $('#footer-common').hide()
			
			this.$nextTick(function() {
				$('#app,html,body').css({
					'height':'100%'
				})
			})
		},
		watch: {
		},
		beforeDestroy: function() {
      // $('#footer-common').show()
		},
		methods: {
		}
	}	
</script>

<style scoped>
	.apply-index {
		width: 100%;
		height: 100%;
		background: #fcf8f0 url('../../assets/img/apply_index_bg.png') no-repeat;
		background-size: contain; 
		padding-top: 2.5rem;
	}
	
	.apply-index-wrap {
		position: relative;
		width: 31.5rem;
		/*height: 48.5rem;*/
		margin: 0 auto;
		padding-top: 4rem;
		background: #fff;
		box-shadow: 0 0 2rem #ccc;
	}

	.border-corner {
    position: absolute;
    padding: 1.1rem;
    border-style: solid;
    border-color: #e5c171;
  }
  .row1 {
    border-width: .3rem 0 0 .3rem;
    top: 0;
    left: 0;
  }
  .row2 {
    border-width: .3rem .3rem 0 0;
    top: 0;
    right: 0;
  }
  .col1 {
    border-width: 0 0 .3rem .3rem;
    bottom: 0;
    left: 0;
  }
  .col2 {
    border-width: 0 .3rem .3rem 0;
    bottom: 0;
    right: 0;
  }

  .apply-index-title {
  	width: 22.5rem;
  	height: 4.5rem;
  	margin: 0 auto;
  	margin-bottom: 3.5rem;
  	background: url('../../assets/img/apply_index_title.png') no-repeat;
  	background-size: contain;
  }
	
	.arrow-down {
		width: 2rem;
		height: 2.4rem;
		margin: 0 auto;
		animation: bounce-down 1.5s linear infinite;
	}

	@keyframes bounce-down {
	  25% { transform: translateY(-10px);}
	  50%, 100% {transform: translateY(0);}
	  75% {transform: translateY(10px);}
	}

	.apply-index-desc,
	.apply-index-invite {
		margin: 0  1.5rem 2.4rem 1.5rem;
		text-align: center;
		line-height: 2.3rem;
		font-size: 1.4rem;
	}

	.apply-index-desc {
		color: #333;
	}

	.apply-index-invite {
		margin-top: 1.5rem;
		color: #e1bb66;
	}

	.dot {
		margin: 0 auto;
		text-align: center;
		display: block;
		font-weight: 600;
		color: #e1bb66;
	}

	.tobe-buyer {
		margin: 0 .8rem;
		margin-top: 1.5rem;
		padding: 3.3rem 0;
		border-top: 1px solid #eee;
	}

	.tobe-buyer-btn {
		display: block;
		width: 15rem;
		height: 4.4rem;
		line-height: 4.4rem;
		margin: 0 auto;
		border-radius: 100px / 100px;
		background-color: #ff4545;
		text-align: center;
		font-size: 1.4rem;
		font-family: FZLTZHK;
		color: #fff;
		box-shadow: 0 0 1rem #FF4557;
	}

	.service-agreenment {
		line-height: 4rem;
		font-size: 1.3rem;
		text-align: center;
		color: #999;
	}

	.service-agreenment a {
		text-decoration: underline;
		color: #999;
	}
	.space{
		width: 100%;
		height: 5rem;
	}
</style>