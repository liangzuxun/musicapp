<template>
  <div class="swiper-box" ref="swiperBox">
  <scroll :data="playList" class="recommend-content" ref="scroll">
    <div class="fly">
      <div class="swiper-banner" v-if="recommends">
     <keep-alive>
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-wrapper"
        >
       <swiper-slide v-for="(item,index) in recommends" :key="index" class="swiper-slide">
        <a :ahref="item.linkUrl" ref="picturelink">
          <img @load="loadImage" :src="item.picUrl" alt="" class="swiper-image"
            :index="index"
            @touchstart="SwiperOnTouchStart($event,index)"
            @touchmove="SwiperOnTouchMove($event)"
            @touchend ="SwiperOnTouchEnd($event)">
          >
        </a>
       </swiper-slide>
       </swiper>
     </keep-alive>
    </div>
    <div class="recommend-list">
     <h1 class="list-title">热门歌单推荐</h1>
     <ul>
       <li v-for="(item,index) in playList" 
       :key="index"
       @click="selectItem(item)">
         <div class="icon">
           <img  v-lazy="item.imgurl" alt="" width="60">
         </div>
         <div class="text">
           <h2 class="name" v-html="item.creator.name"></h2>
           <p class="disname" v-html="item.dissname"></p>
         </div>
       </li>
     </ul>
   </div>
  </div>
  </scroll>
    <loading v-if="!playList">
    </loading>
    <router-view></router-view>
  </div>
</template>
<script>
import { getRecommend } from "@/api/recommend";
import Vue from "vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getPlayList } from "@/api/recommend";
import Loading from "@/base/loading/loading";
import Scroll from "@/base/scroll/scroll";
import { miniplayerMixin } from "@/mixin/miniplayerMixin";
import { mapMutations } from "vuex";
export default {
  name: "recommend",
  mixins: [miniplayerMixin],
  components: {
    swiper,
    swiperSlide,
    [Scroll.name]: Scroll,
    [Loading.name]: Loading
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 4000,
          stopOnlastSlide: true,
          disableOnInteraction: false
        },
        preventClicks: true,
        effect: "slide",
        loop:true
      },
      recommends: "",
      playList: null
    };
  },
  created() {
    this._getRecommend();
    this._getPlayList();
  },
  methods: {
    ...mapMutations({
      setDisc: "SET_DISC"
    }),
    SwiperOnTouchStart(e, index) {
      var touch = e.touches[0];
      this.startY = touch.pageY;
      this.startX = touch.pageX;
    },
    SwiperOnTouchMove(e) {
      var touch = e.touches[0];
      this.endX = touch.pageX - this.startX;
      this.endY = touch.pageY - this.startY;
    },
    SwiperOnTouchEnd(e, index) {
      if (Math.abs(this.endX) > 5) {
        this.endX = 0;
      } else {
        window.location.href = e.target.parentNode.getAttribute('ahref');
        this.endX = 0;
      }
    },
    selectItem(item) {
      console.log(item);
      this.setDisc(item);
      this.$router.push(`/recommend/${item.dissid}`);
    },
    handlePlaylist(playlist) {
      let bottom = playlist.length > 0 ? "50px" : "";
      this.$refs.swiperBox.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    _getRecommend() {
      getRecommend().then(res => {
        this.recommends = res.data.slider;
      });
    },
    _getPlayList() {
      getPlayList().then(res => {
        this.playList = res.data.list;
      });
    },
    loadImage() {
      this.$refs.scroll.refresh();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import './stylus.styl';

.swiper-image {
  width: 100%;
}

.swiper-box {
  position: fixed;
  width: 100%;
  top: 100px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;
    position: relative;
  }
}
</style>