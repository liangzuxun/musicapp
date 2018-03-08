<template>
  <div class="progress-bar" ref="progressbar" @click="jump($event)">
    <div class="progress-bar-inner" ref="progressinner">
      <div class="progress-bar-circle" 
      @touchstart="touchstart" 
      @touchmove="move"
      @touchend="end">
        <span class="progress-bar-circle-center"></span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: "progress-bar",
  props: {
    precent: {
      type: Number,
      default: 0,
    }
  },
  data(){
    return {
      touchx:0,
      touchy:0,
      Precent:0
    }
  },
  watch: {
    precent(newprecent) {
      if (newprecent >= 0) {
        const progressbarwidth = this.$refs.progressbar.clientWidth;
        const progressinnerwidth = progressbarwidth * newprecent;
        this.$refs.progressinner.style.width = progressinnerwidth + "px";
      }
    }
  },
  methods: {
    ...mapMutations({
      setPlaying:'SET_PLAYING_STATE'
    }),
    jump(e) {
      let width = e.pageX - this.$refs.progressbar.offsetLeft
      if(width>=0){
        let precent = width / this.$refs.progressbar.clientWidth;
        this.$emit('changecurrentTime',precent)
      }
    },
    touchstart(e){
      console.log(e.touches[0])
      this.touchx = e.touches[0].pageX
      this.Precent =  this.precent
    },
    move(e){
      this.setPlaying(false)
      let newX = e.touches[0].pageX
      let currentX = newX - this.touchx
      this.newprecent = currentX/this.$refs.progressbar.clientWidth+this.Precent
      this.$emit('changecurrentTime',this.newprecent)
    },
    end(){
      this.setPlaying(true)
    }
  }
};
</script>
<style lang="stylus" scoped>
.progress-bar {
  width: 100%;
  height: 3px;
  background: #222;
  position: relative;
  border-radius: 3px;

  &-inner {
    position: absolute;
    left: 0;
    height: 100%;
    background: orange;
    border-radius: 3px;
  }

  &-circle {
    position: absolute;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: #fff;
    right: -7px;
    top: 50%;
    margin-top: -7px;

    &-center {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: orange;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

