import { playMode } from '@/common/js/config'
import { loadPlay, loadFavourite } from '@/common/js/cache'
const state = {
  singer: {},
  playing: false,//是否播放
  fullScreen: false,//全屏
  playlist: [],//播放列表
  squenceList: [],//已排序列表
  mode: playMode.sequence,//播放模式
  currentIndex: -1,//当前索引
  disc: [],
  toplist: [],
  searchlog: [],
  favouritelist: loadFavourite(),//收藏
  playhistory: loadPlay(),//播放历史
  commentlist:[]
}
export default state