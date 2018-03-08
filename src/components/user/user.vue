<template>
  <transition name="slide">
  <div class="user" ref="user">
    <div class="back">
      <i class="fa fa-angle-left" @click="back"></i>
      <span>用户个人中心</span>
    </div>
    <div class="switches-wrapper">
      <router-link to="/playhistory">播放历史</router-link>
      <router-link to="/collectsongs">收藏歌曲</router-link>
    </div>
    <div class="list-wrapper" ref="listWrapper">
      <router-view>
      </router-view>
    </div>
  </div>
  </transition>
</template>
<script>
export default {
  name: "user",
  methods: {
    back() {
      this.$router.push("/singer");
    },
  }
};
</script>
<style lang="stylus" scoped>
.user {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  z-index: 20;
  background: #222;

  .back {
    position: relative;
    height: 40px;
    line-height: 40px;

    .fa-angle-left {
      position: absolute;
      font-size: 30px;
      color: orange;
      left: 20px;
      line-height: 40px;
    }

    span {
      color: #fff;
      font-size: 16px;
    }
  }

  .switches-wrapper {
    a {
      text-decoration: none;
      color: #ccc;
      font-size: 16px;
    }
  }
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>


