import { getUid } from './uid'
import { getVKey } from '@/api/singerlist'
import { getLyric } from '@/api/song'
import { Base64 } from 'js-base64'
let urlMap = {}
export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
    this.filename = `C400${this.mid}.m4a`
    if (urlMap[this.id]) {
      this.url = urlMap[this.id]
    } else {
      this.getUrl()
    }
  }
  //获取歌词
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === 0) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('lyric error')
        }
      })
    })

  }
  //获取歌曲播放源
  getUrl() {
    if (this.url) {
      return
    }
    getVKey(this.mid, this.filename).then((res) => {
      if (res.code === 0) {
        const vkey = res.data.items[0].vkey
        this.url = `http://dl.stream.qqmusic.qq.com/${this.filename}?vkey=${vkey}&guid=${getUid()}&fromtag=66`
        urlMap[this.id] = this.url
      }
    })
  }
}
export function createSong(musicdata) {
  return new Song({
    id: musicdata.songid,
    mid: musicdata.songmid,
    singer: getSinger(musicdata.singer),
    name: musicdata.songname,
    album: musicdata.albumname,
    duration: musicdata.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicdata.albummid}.jpg?max_age=2592000`,
  })
}
function getSinger(singer) {
  let arr = []
  if (!singer) {
    return;
  }
  singer.forEach((item) => {
    arr.push(item.name)
  })
  return arr.join('/')
}
