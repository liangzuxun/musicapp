import { mapGetters, mapState, mapActions } from 'vuex'
export const collectMixin = {
  computed: {
    ...mapState(['favouritelist']),
    ...mapGetters(['currentSong']),
    collectStyle() {
      return this.favouriteIndex(this.currentSong)
    }
  },
  methods: {
    ...mapActions(['saveFavouriteList','deleteFavouriteList']),
    isFavourite(song) {
      let index = this.favouritelist.findIndex((item) => {
        return song.id === item.id
      })
      return index 
    },
    favouriteIndex(song) {
      const index = this.isFavourite(song)
      if (index < 0) {
        return 'fa fa-heart-o'
      } else {
        return 'fa fa-heart'
      }
    },
    collectSong(song){
      const index = this.favouritelist.findIndex((item)=>{
        return item.id === song.id
      })
      if(index<0){
        this.saveFavouriteList(song)
      }else{
        this.deleteFavouriteList(song)
      }
    }
  }
}