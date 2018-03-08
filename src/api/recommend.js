import jsonp from '@/common/js/jsonp'
import axios from 'axios'
import { commonParams, options } from './config'
export const getRecommend = function () {
  const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg"
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
  })
  return jsonp(url, data, options)
}
export const getPlayList = () => {
  const url = '/api/getPlayList'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    notice: 0,
    format: 'json',
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export const getAlbumSongList = (disstid) => {
  const url = '/api/getAlbumSongList'
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    g_tk: 5381,
    hostUin:0,
    platform: 'yqq',
    needNewCode: 0
  })
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}
