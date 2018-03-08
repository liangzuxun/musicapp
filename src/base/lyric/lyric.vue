<template>
     <scroll class="song-lyric" :data="lyric" ref="lyricList">
     <div class="lyric-container">
     <p v-for="(item,index) in lyric" 
     :key="index" 
     :class="{'current':lineNum===index}"
     ref="lyricline">
     {{item.txt}}
    </p>
   </div>
  </scroll>
</template>
<script>
import Scroll from "@/base/scroll/scroll";
import { mapState } from "vuex";
export default {
  name: "lyric",
  props: {
    lyric: {
      type: Array,
      default: []
    },
    lineNum: {
      type: Number,
      default: 0
    }
  },
  components: {
    [Scroll.name]: Scroll
  },
  computed:{
    ...mapState(["playlist"]),
  },
  watch: {
    //监听lineNum的变化触发scroll
    lineNum(newlineNum) {
      if (newlineNum > 5) {
        let scrollElement = this.$refs.lyricline[this.lineNum - 5];
        this.$refs.lyricList.scrollElement(scrollElement, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
    },
    playlist(newplaylist) {
      if (newlineNum > 5) {
        let scrollElement = this.$refs.lyricline[this.lineNum - 5];
        this.$refs.lyricList.scrollElement(scrollElement, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.song-lyric {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  overflow: hidden;

  p {
    opacity: 0.7;
    line-height: 2em;
    font-size: 14px;

    &.current {
      color: orange;
    }
  }
}
</style>

