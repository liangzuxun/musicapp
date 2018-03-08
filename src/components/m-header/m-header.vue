<template>
  <div class="m-header">
    Music App
    <router-link to="/user-content">
    <i class="fa fa-user"></i>
    </router-link>
  </div>
</template>
<script>
export default {
  name:'m-header',
}
</script>

<style lang="stylus" scoped>
.m-header
  position:fixed
  top:10px
  color:#fff
  text-align:center
  width:100%
  font-size:22px
  .fa-user
    color:#ccc
    position:absolute
    left:20px
</style>

