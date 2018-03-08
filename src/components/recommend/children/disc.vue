<template>
  <div class="disc">
    <song-list :title="title" 
    :songs="songs"
    :bgImage="bgImage"
    @select="select"
    ></song-list>
  </div>
</template>
<script>
import Songlist from "@/base/songlist/songlist";
import { mapState, mapActions } from "vuex";
import { getAlbumSongList } from "@/api/recommend";
import {createSong} from '@/common/js/song'
export default {
  name: "disc",
  components: {
    [Songlist.name]: Songlist
  },
  data(){
    return {
      songs:[]
    }
  },
  computed: {
    title() {
      return this.disc.dissname;
    },
    bgImage() {
      return this.disc.imgurl;
    },
    ...mapState(["disc"])
  },
  created() {
   this._getAlbumSongList()
  },
  mounted(){
    console.log(this.disc.dissid)
  },
  methods: {
    ...mapActions(['selectPlay']),
    select(item,index){
      this.selectPlay({
        list:this.songs,
        index:index
      })
    },
    _getAlbumSongList() {
      getAlbumSongList(this.disc.dissid).then((res)=>{
        if(res.code === 0){
          this.songs = this._normalizelist(res.cdlist[0].songlist)
        }
      })
    },
    _normalizelist(list){
      let arr = []
      list.forEach((item,index)=>{
        arr.push(createSong(item))
      })
      return arr
    }
  },
};
</script>
<style lang="stylus" scoped>
</style>

