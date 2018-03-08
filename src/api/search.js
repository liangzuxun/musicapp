import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export const getHotKey = () => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    uin: 0,
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
export const getSearchResult = (text, num = 1) => {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    w: text,
    zhidaqu: 1,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: num,
    remoteplace: 'txt.mqq.all'
  })
  return jsonp(url, data, options)
}