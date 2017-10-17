<template>
	<div class="login-index">
		设置密码
	</div>
</template>

<script>
  module.exports = {
		data () {
			return {
			}
		},
		
		components: {
      // 'my-footer': footer
	  },     
       
		mounted: function() {
			document.title = "sh";
      $('#footer-common').hide()
			
			this.$nextTick(function() {
				$('#app,html,body').css({
					'height':'100%'
				})
			})
		},
		watch: {
		},
		beforeDestroy: function() {
      $('#footer-common').show()
      $('#app,html,body').css({
					'height':'auto'
				})
		},
		methods: {
		}
	}	
</script>

<style scoped>
</style>