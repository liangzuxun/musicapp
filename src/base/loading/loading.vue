<template>
  <div class="loading">
    <img :src="require('./loading.gif')" alt="">
    <div class="text">{{text}}</div>
  </div>
</template>
<script>
export default {
  name:'loading',
  props:{
    text:{
      type:String,
      default:"正在载入..."
    }
  }
}
</script>
<style lang="stylus" scoped>
  .loading{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index:20;
    }
  .text{
    color:#fff;
    font-size:14px;
    }
</style>


