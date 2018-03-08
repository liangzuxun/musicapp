import * as types from './mutation-type'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, arr) {
    state.playlist = arr
  },
  [types.SET_SEQUENCE_LIST](state, arr) {
    state.squenceList = arr
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, currentindex) {
    state.currentIndex = currentindex
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, toplist) {
    state.toplist = toplist
  },
  [types.SET_SEARCH_LOG](state, searchlog) {
    state.searchlog = searchlog
  },
  [types.SET_FAVOURITE_LIST](state, arr) {
    state.favouritelist = arr
  },
  [types.SET_PLAY_HISTORY](state, arr) {
    state.playhistory = arr
  },
  [types.SET_COMMENT_LIST](state, arr) {
    state.commentlist = arr
  }
}
export default mutations