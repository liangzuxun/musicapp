import jsonp from 'common/js/jsonp'

import { commonParams, options } from './config'
import { getUid } from '@/common/js/uid'
export const getSingList = function () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
  })
  return jsonp(url, data, options)
}
export const getVKey=(songmid, filename)=>{
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    cid: 205361747,
    format: 'json',
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    uin: 0,
    songmid,
    filename,
    guid: getUid()
  })

  return jsonp(url, data, Object.assign({}, options, {
    param: 'callback'
  }))
}
