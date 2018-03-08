import { commonParams } from './config'

import axios from 'axios'

export const getLyric = (songmid) => {
  const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: songmid,
    pcachetime: + new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    loginUin: 0,
    g_tk: 5381,
    from: 'json',
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}