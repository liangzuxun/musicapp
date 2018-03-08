<template>
  <transition name="list-fade">
    <div class="playlist">
      <div class="list-wrapper">
        <div class="list-header">
          <span>播放列表</span>
          <i class="fa fa-trash" @click.stop="showconfirm"></i>
        </div>
        <div class="list-main">
        <scroll class="list-main-scroll" :data="playlist" ref="listContent">
        <ul class="list-content">
          <li v-for="(item,index) in playlist" :key="index" @click="selectItem(index)" ref="listItem">
            <span class="song-name">{{item.name}}</span>
            <span class="song-control">
              <i :class="favouriteIndex(item)" @click.stop="collectSong(item)"></i>
              <i class="fa fa-times" @click.stop="deleteSong(item)"></i>
            </span>
          </li>
        </ul>
        </scroll>
        </div>
        <div class="list-operate">
          <span class="add-song">+添加歌曲到列表</span>
        </div>
      </div>
      <div class="close-playlist" @click="close">
        关闭
      </div>
      <confirm ref="confirm" @confirmensure="deleteAll">
      </confirm>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { collectMixin } from "@/mixin/collectMixin";
import Confirm from "@/base/confirm/confirm";
import Scroll from "@/base/scroll/scroll";
export default {
  name: "play-list",
  mixins: [collectMixin],
  components: {
    [Scroll.name]: Scroll,
    [Confirm.name]: Confirm
  },
  computed: {
    ...mapState(["playlist"]),
    ...mapGetters(["currentSong", "currentIndex"]),
  },
  methods: {
    ...mapMutations({
      SetPlayList: "SET_PLAYLIST",
      SetPlayingState: "SET_PLAYING_STATE",
      SetCurrentIndex: "SET_CURRENT_INDEX"
    }),
    ...mapActions(["deleteSong", "deleteAll"]),
    close() {
      this.$emit("close");
    },
    selectItem(index) {
      this.SetCurrentIndex(index);
      this.SetPlayingState(true);
      this.scrollToCurrent(index);
    },
    scrollToCurrent(index) {
      this.$refs.listContent.scrollElement(this.$refs.listItem[index],300);
      this.$refs.listContent.refresh();
    },
    showconfirm() {
      this.$refs.confirm.show();
    },
    deleteItem(item) {
      this.deleteSong(item);
      if (!this.playlist.length) {
        this.close();
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.scrollToCurrent(this.currentIndex);
    }, 20);
  },
  watch: {
    currentSong(newSong) {}
  }
};
</script>
<style lang="stylus" scoped>
fj() {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.playlist {
  position: fixed;
  bottom: 60px;
  width: 100%;
  z-index: 400;
  background: #444;
  overflow: hidden;

  i {
    color: orange;
    font-size: 18px;
    padding: 0 4px;
  }

  .list-wrapper {
    padding: 10px;
    padding-bottom: 30px;

    .list-main {
      position: relative;
      height: 220px;

      .list-main-scroll {
        height: 100%;
        overflow: hidden;
      }
    }

    .list-header {
      fj();

      span {
        color: #ccc;
        text-indent: 15px;
      }
    }

    .list-content {
      li {
        fj();
        margin-bottom: 15px;

        .song-name {
          color: #fff;
          font-size: 14px;
          text-indent: 15px;
        }
      }
    }

    .list-operate {
      text-align: center;
      margin-top: 20px;

      span {
        color: #ccc;
        border: 1px solid #ccc;
        padding: 4px 10px;
        border-radius: 20px;
      }
    }
  }

  .close-playlist {
    color: #ccc;
    font-size: 18px;
    background: #222;
    line-height: 50px;
  }
}

.list-fade-enter-active, .list-fade-leave-active {
  transition: all 0.3s;
  transition-delay: 0.1s;
}

.list-fade-enter, .list-fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>

