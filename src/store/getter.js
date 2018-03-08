import Song from '@/common/js/song'
export const singer = state => state.singer
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
export const currentIndex = state => state.currentIndex
export const getPlayHistory = (state) => {
  return state.playhistory.map((item) => {
    return new Song(item)
  })
}
export const getFavouriteList = (state) => {
  return state.favouritelist.map((item) => {
    return new Song(item)
  })
}
export const commentlist = state => state.commentlist
