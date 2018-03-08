<template>
   <transition name="confirm">
   <div class="confirm" v-show="confirmshow" @click.stop>
    <div class="confirm-box">
      <div class="confirm-content">{{text}}</div>
      <div class="confirm-btn">
        <span class="ensure" @click="ensure">确定</span>
        <span class="cancel" @click="cancel">取消</span>
      </div>
    </div>
  </div>
   </transition>
</template>
<script>
export default {
  name: "confirm",
  props: {
    text: {
      type: String,
      default: "是否清空播放列表"
    }
  },
  data(){
    return{
      confirmshow:false
    }
  },
  methods: {
    hide(){
      this.confirmshow = false
    },
    show(){
      this.confirmshow = true
    },
    cancel() {
      this.hide()
      this.$emit("confirmcancel");
    },
    ensure(){
      this.hide()
      this.$emit('confirmensure')
    }
  }
};
</script>
<style lang="stylus" scoped>
.confirm {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 300;

  .confirm-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    transform: translate(-50%, -50%);
    background: #888;
    padding: 20px 0;
    padding-bottom: 0;
    border-radius: 5px;

    .confirm-content {
      font-size: 16px;
      color: #ccc;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      z-index: 2;
    }

    .confirm-btn {
      display: flex;

      span {
        width: 50%;
        padding: 10px 0;
        color: #ccc;

        &:nth-of-type(1) {
          border-right: 1px solid #ccc;
        }
      }
    }
  }
}

.confirm-enter-active, .confirm-leave-active {
  transition: all 0.3s;
}

.confirm-enter, .confirm-leave-to {
  opacity: 0;
}
</style>



