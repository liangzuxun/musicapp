<template>
  <div class="songlist">
  <h1 class="title">
    <i class="fa fa-angle-left" @click="tosingerpage"></i>
    <p>{{title}}</p>
  </h1>
    <div class="bg-image" :style="backgroundImage" ref="bgimage">
      <div class="play-wrapper" v-if="songs.length">
        <div class="playBtn">
          <span class="text" >随机播放全部</span>
        </div>
      </div>
      <slot name="rankdetail">
      </slot>
      <div class="filter" ref="filter"></div>
    </div>
      <div class="scroll-layer" ref="layer"></div>
      <scroll :data="songs" :probeType="3" 
      :listenScroll="listenscroll" @scroll="scroll" 
      class="list-scroll" ref="list">
    <song-single :songs="songs" @select="select" :rank="rank"></song-single>
    </scroll>
  </div>
</template>
<script>
import Scroll from "@/base/scroll/scroll";
import SongListSingle from "@/base/songlistother/songlistother";
import { miniplayerMixin } from "@/mixin/miniplayerMixin";
const MAX_SCROLL = 40;
export default {
  mixins: [miniplayerMixin],
  name: "song-list",
  props: {
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ""
    },
    bgImage: {
      type: String,
      default: ""
    },
    rank:{
      type:Boolean,
      default:false
    }
  },
  components: {
    [Scroll.name]: Scroll,
    [SongListSingle.name]: SongListSingle
  },
  data() {
    return {
      scrollY: 0
    };
  },
  computed: {
    backgroundImage() {
      return this.bgImage ? `background-image:url(${this.bgImage})` : "";
    }
  },
  created() {
    this.listenscroll = true;
  },
  mounted() {
    this.imgHeight = this.$refs.bgimage.clientHeight;
    this.$refs.list.$el.style.top = `${this.imgHeight}px`;
    this.translateY = -this.imgHeight + MAX_SCROLL;
  },
  methods: {
    select(item, index) {
      this.$emit("select", item, index);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    tosingerpage() {
      // this.$router.push("/singer");
      this.$router.go(-1)
    },
    //mixin 主要为了底部miniplayer不遮盖songlist
    handlePlaylist(playlist) {
      let bottom = playlist.length > 0 ? "50px" : "";
      this.$refs.list.$el.style.bottom = bottom;
      this.$refs.list.refresh();
    }
  },
  watch: {
    scrollY(newY) {
      let zIndex = 0;
      //precent是为了无缝贴合
      let precent = Math.abs(newY / this.imgHeight);
      let scale = 1;
      this.maxY = Math.max(this.translateY, newY);
      this.$refs.layer.style["webkitTransform"] = `translate3d(0,${
        this.maxY
      }px,0}`;
      this.$refs.layer.style.transform = `translate3d(0,${this.maxY}px,0)`;

      if (newY < this.translateY) {
        zIndex = 10;
        this.$refs.bgimage.style.paddingTop = 0;
        this.$refs.bgimage.style.height = `${MAX_SCROLL}px`;
      } else {
        zIndex = 0;
        this.$refs.bgimage.style.paddingTop = "70%";
        this.$refs.bgimage.style.height = "0px";
      }
      //如果下拉 把图片放大
      if (newY > 0) {
        scale = scale + precent;
        this.$refs.bgimage.style.transform = `scale(${scale})`;
      }
      this.$refs.bgimage.style.zIndex = zIndex;
    }
  }
};
</script>
<style lang="stylus" scoped>
.songlist {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #222;
  z-index:999
  .title {
    font-size: 22px;
    color: orange;
    font-weight: normal;
    height: 40px;
    line-height: 40px;
    position: absolute;
    z-index: 50;
    width: 100%;
    text-align: center;
    top: 0;

    .fa-angle-left {
      position: absolute;
      left: 10px;
      top: 50%;
      height: 40px;
      margin-top: -20px;
      font-size: 26px;
      line-height: 40px;
      padding: 0 10px;
    }

    p {
      width: 70%;
      margin: 0 auto;
      font-size: 20px;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
    }
  }

  .bg-image {
    padding-top: 70%;
    background-repeat: no-repeat;
    -webkit-transform-origin: top;
    background-size: cover;
    width: 100%;
    height: 0;
    position: relative;

    .play-wrapper {
      position: absolute;
      bottom: 40px;
      width: 100%;
      text-align: center;

      .playBtn {
        display: inline-block;
        padding: 7px 20px;
        border: 2px solid orange;
        border-radius: 20px;

        span {
          color: #ffcd32;
        }
      }
    }
  }

  .song-list {
    list-style: none;

    .list-item {
      padding: 15px;
      text-align: left;

      h4 {
        font-weight: normal;
        font-size: 16px;
      }

      p {
        font-size: 14px;
        margin-top: 4px;
      }
    }
  }
}

.list-scroll {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  // overflow:hidden
}

.scroll-layer {
  position: relative;
  height: 100%;
  background: #222;
}
</style>

