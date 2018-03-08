import { mapState } from 'vuex'
export const miniplayerMixin = {
  computed: {
    ...mapState(['playlist'])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newplaylist) {
      this.handlePlaylist(newplaylist)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error("wheat")
    }
  }
}