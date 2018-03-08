import * as types from './mutation-type'
import fIndex from '@/common/js/fIndex'
import { savePlay, saveFavourite, deleteFavourite } from '@/common/js/cache'
export const selectPlay = function ({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
export const deleteSong = function ({ commit, state }, song) {
    let playlist = state.playlist.slice()
    let currentIndex = state.currentIndex
    let pIndex = fIndex(playlist, song)
    playlist.splice(pIndex, 1)
    if (currentIndex > pIndex || currentIndex === playlist.length) {
        currentIndex--
    }
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    if (!playlist.length) {
        commit(types.SET_PLAYING_STATE, false)
    } else {
        commit(types.SET_PLAYING_STATE, true)
    }
}
export const deleteAll = function ({ commit, state }) {
    let arr = [];
    let playlist = state.playlist.slice()
    playlist.forEach((item, index) => {
        arr.push(item)
    })
    arr.forEach((item, index) => {
        let pIndex = fIndex(playlist, item)
        playlist.splice(pIndex, 1)
    })
    commit(types.SET_PLAYING_STATE, false)
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_CURRENT_INDEX, -1)
}
export const saveFavouriteList = ({ commit }, song) => {
    commit(types.SET_FAVOURITE_LIST, saveFavourite(song))
}
export const deleteFavouriteList = ({ commit }, song) => {
    commit(types.SET_FAVOURITE_LIST, deleteFavourite(song))
}
export const savePlayHistoryList = ({ commit }, song) => {
    commit(types.SET_PLAY_HISTORY, savePlay(song))
}
