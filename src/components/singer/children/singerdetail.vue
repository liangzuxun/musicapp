<template>
<transition name="slide">
  <div class="singer-detail">
      <song-list @select="select" :songs="songs" :title="title" :bgImage="bgImage"></song-list>
  </div>
 </transition>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

import { getSingerList } from "@/api/singer";

import { createSong } from "@/common/js/song";

import SongList from "@/base/songlist/songlist";
export default {
  name: "singer-detail",

  components: {
    [SongList.name]: SongList
  },

  computed: {
    ...mapState(["singer"]),

    title() {
      return this.singer.name;
    },

    bgImage() {
      return this.singer.avatar;
    }
  },

  created() {
    console.log(this.singer);

    this._getDetail(this.singer.id);
  },

  data() {
    return {
      songs: []
    };
  },

  methods: {
    ...mapActions(["selectPlay"]),
    ...mapMutations({
      SetCommentList: "SET_COMMENT_LIST"
    }),
    select(item, index) {
      this.selectPlay({
        list: this.songs,
        index: index
      });

    },

    _getDetail(id) {
      if (!this.singer.id) {
        this.$router.push("/singer");

        return;
      }
      getSingerList(id).then(data => {
        this.songs = this._normalizelist(data.data.list);
      });
    },

    _normalizelist(list) {
      let arr = [];

      list.forEach((item, index) => {
        let { musicData } = item;

        if (musicData.songid && musicData.albummid) {
          arr.push(createSong(musicData));
        }
      });

      return arr;
    }
  }
};
</script>
<style lang="stylus" scoped>
.singer-detail {
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  bottom: 0;
  width: 100%;
  background: #222;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>

