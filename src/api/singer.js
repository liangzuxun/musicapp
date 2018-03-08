import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getSingerList(singerid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerid,
    order: 'listen',
    begin: 0,
    num: 50,
    songstatus: 1,
  })
  return jsonp(url,data,options)
}