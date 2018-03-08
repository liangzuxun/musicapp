<template>
  <div class="collectsongs" ref="collect">
   <scroll :data="songs" ref="playhistoryscroll" class="playhistoryscroll">
    <song-single :songs="songs" @select="select">
    </song-single>
    </scroll>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Playlist from "@/base/songlistother/songlistother";
import Scroll from "@/base/scroll/scroll";
import { miniplayerMixin } from "@/mixin/miniplayerMixin";
export default {
  name: "collectsongs",
  mixins: [miniplayerMixin],
  components: {
    [Playlist.name]: Playlist,
    [Scroll.name]: Scroll
  },
  data() {
    return {
      songs: []
    };
  },
  computed: {
    ...mapGetters(["getFavouriteList"])
  },
  created() {
    this.songs = this.getFavouriteList;
  },
  methods: {
    ...mapActions(["selectPlay"]),
    handlePlaylist(playlist){
      const bottom = playlist.length>0?'60px':'0px'
      this.$refs.collect.style.bottom = bottom
      this.$refs.playhistoryscroll.refresh()
    },
    select(item, index) {
      this.selectPlay({
        list: this.songs,
        index: index
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.collectsongs {
  position: fixed;
  top: 80px;
  bottom: 0;
  width: 100%;

  .playhistoryscroll {
    height: 100%;
    overflow: hidden;
  }
}
</style>



