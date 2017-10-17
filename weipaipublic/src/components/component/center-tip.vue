<template>
  <div class="center-tip">
    {{ msg }}
  </div>  
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: ['msg']
  }
</script>

<style scoped>
  .center-tip {
    position: fixed;
    top: 11rem;
    left: 50%;
    transform: translateX(-50%);
    width: 15rem;
    height: 9rem;
    padding-top: 3rem;
    border-radius: .5rem;
    background-color: rgba(0,0,0,.8);
    text-align: center;
    font-size: 1.4rem;
    color: #fff;
  }
</style>