<template>
  <div class="rankdetail">
    <song-list :songs="songs" :bgImage="bgImage" :title="title" @select="select" :rank="true"></song-list>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { getTopListDetail } from "@/api/rank";
import Songlist from "@/base/songlist/songlist";
import { createSong } from "@/common/js/song";
export default {
  name: "rankdetail",
  components: {
    [Songlist.name]: Songlist
  },
  data() {
    return {
      songs: []
    };
  },
  computed: {
    ...mapState(["toplist"]),
    bgImage() {
      return this.toplist ? this.toplist.picUrl : "";
    },
    title() {
      return this.toplist ? this.toplist.topTitle : "";
    }
  },
  methods: {
    ...mapActions(["selectPlay"]),
    _getTopListDetail() {
      if (!this.toplist.id) {
        console.log("torank");
        this.$router.push("/rank");
        return;
      }
      getTopListDetail(this.toplist.id).then(res => {
        let songslist = this._normalizesongs(res.songlist);
        this.songs = songslist;
      });
      // this.$router.push(`/rank/${topid}`)
    },
    select(item, index) {
      this.selectPlay({
        list: this.songs,
        index: index
      });
    },
    _normalizesongs(list) {
      let arr = [];
      list.forEach((item, index) => {
        arr.push(createSong(item.data));
      });
      return arr;
    }
  },
  created() {
    this._getTopListDetail();
  }
};
</script>
<style lang="stylus" scoped>
</style>

