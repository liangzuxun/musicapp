<template>
  <div class="singer" ref="singerContainer">
    <router-view></router-view>
    <scroll 
    :data="singer" 
    class="singer-scroll" 
    ref="singerScroll" 
    :listenScroll="true"
    @scroll="scroll">
    <ul class="singer-list">
      <li class="list-item" v-for="(item,index) in singer" :key="index" ref="listgroup">
        <div class="title">{{item.title}}</div>
        <ul class="singer-list-type">
          <li class="singer-item" v-for="(singerit,num) in item.items" :key="num" 
          :title="singerit.id" 
          @click="toSingerDetail(singerit)">
            <div class="singer-pic">
              <img v-lazy="singerit.avatar" alt="歌手缩略图" width="100">
            </div>
            <div class="singer-info">
              {{singerit.name}}
            </div>
          </li>
        </ul>
      </li>
    </ul>
      <div ref="totitle" class="Totitle" v-if="fixed!=='热门'">{{fixed}}</div>
  </scroll>
    <ul class="quick-enter-list" @touchstart="touch" @touchmove.stop.prevent="move($event)">
      <li v-for="(item,index) in singer" :key="index" :index="index" ref="zimulist" :class="{'current':currentIndex===index}">
        {{item.title}}
      </li>
    </ul>
    <loading v-if="!singer">
    </loading>
  </div>
</template>
<script>
import { getSingList } from "@/api/singerlist";
import Scroll from "@/base/scroll/scroll";
import { mapMutations } from "vuex";
import { miniplayerMixin } from "@/mixin/miniplayerMixin";
import Loading from "@/base/loading/loading";
const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
export default {
  mixins: [miniplayerMixin],
  name: "singer",
  components: {
    [Scroll.name]: Scroll,
    [Loading.name]: Loading
  },
  data() {
    return {
      singer: "",
      touchObj: {},
      currentIndex: 0,
      scrollY: -1,
      height: []
    };
  },
  computed: {
    fixed() {
      return this.singer[this.currentIndex]
        ? this.singer[this.currentIndex].title
        : 0;
    }
  },
  mounted() {
    getSingList().then(res => {
      if (res.code === 0) {
        this.singer = this.normalizeSinger(res.data.list);
        console.log(res)
      }
    });
  },
  methods: {
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    handlePlaylist(playlist) {
      let bottom = playlist.length > 0 ? "50px" : "";
      console.log(bottom);
      this.$refs.singerContainer.style.bottom = bottom;
      // this.$refs.singerScroll.$el.style.bottom = bottom
      this.$refs.singerScroll.refresh();
    },
    normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${
              item.Fsinger_mid
            }.jpg?max_age=2592000`
          });
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${
            item.Fsinger_mid
          }.jpg?max_age=2592000`
        });
      });
      //排序
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    touch(e) {
      let index = e.target.getAttribute("index");
      let touchone = e.touches[0].pageY;
      this.touchObj.touchone = touchone;
      this.touchObj.touchindex = index;
      this.$refs.singerScroll.scrollElement(this.$refs.listgroup[index], 300);
      //手动触发better-scroll 的事件
      this.scrollY = -this.height[index];
    },
    move(e) {
      let touchsecond = e.touches[0].pageY;
      let distance = touchsecond - this.touchObj.touchone;
      let realIndex = parseInt(this.touchObj.touchindex) + distance / 18;
      this.$refs.singerScroll.scrollElement(
        this.$refs.listgroup[parseInt(realIndex)],
        0
      );
      this.scrollY = -this.height[parseInt(realIndex)];
    },
    scroll(e) {
      this.scrollY = e.y;
    },
    getListGroupHeight() {
      this.height = [];
      let height = 0;
      this.height.push(height);
      this.$refs.listgroup.forEach((item, index) => {
        height += item.clientHeight;
        this.height.push(height);
      });
    },
    toSingerDetail(singerit) {
      this.$router.push(`/singer/${singerit.id}`);
      this.setSinger(singerit);
      console.log(singerit);
    }
  },
  watch: {
    //监听singer的每一次变化 获取高度
    singer() {
      this.$nextTick(() => {
        this.getListGroupHeight();
      });
    },
    scrollY(newY) {
      const Height = this.height;
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      for (let i = 0; i < Height.length; i++) {
        let h1 = Height[i];
        let h2 = Height[i + 1];
        if (-newY >= h1 && -newY < h2) {
          this.currentIndex = i;
          return;
        }
      }
      this.currentIndex = Height.length - 2;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './stylus.styl';

.singer {
  position: fixed;
  top: 100px;
  bottom: 0;
  width: 100%;

  .singer-scroll {
    height: 100%;
    overflow: hidden;
  }
}

.quick-enter-list {
  position: fixed;
  right: 0;
  top: 56%;
  transform: translateY(-50%);
  color: #fff;
  list-style: none;

  li {
    height: 18px;
    line-height: 18px;
    font-size: 12px;
    padding: 0 5px;

    &.current {
      color: orange;
    }
  }
}

.Totitle {
  position: absolute;
  top: 0px;
  text-align: left;
  background: #666;
  width: 100%;
  font-size: 16px;
  background: #666;
  color: #ffcd32;
  padding: 5px 10px;
}
</style>
