<template>
  <div id="app">
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
var footer = require('@/components/component/footer')
var ajax = require('assets/js/ajax')

// 首屏加载
window.onload = function() {
  $('#app').show();
  $('.loading-box').hide()
}

module.exports = {
	components: {
    'my-footer': footer
  }

}
</script>

<style>
</style>
