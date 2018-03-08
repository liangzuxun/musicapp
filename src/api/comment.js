import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'
export const getSongComment = (topid) => {
  const url = '/api/getComment'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    outCharset: 'GB2312',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205360772,
    reqtype: 2,
    biztype: 1,
    topid,
    cmd: 8,
    needmusiccrit: 0,
    pagenum: 0,
    pagesize: 25,
    lasthotcommentid: "",
    domain: 'qq.com',
    ct: 24,
    cv: 101010,
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}