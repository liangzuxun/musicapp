export default class Comment {
  constructor({ id, image, name, rootcontent, time, parisenum, rootid, rootuin }) {
    this.id = id
    this.image = image
    this.name = name
    this.content = rootcontent
    this.time = time
    this.parisenum = parisenum
    this.rootid = rootid
    this.rootuin = rootuin
  }
}

export function HotComment(commentlist) {
  return new Comment({
    id: commentlist.commentid,
    image: commentlist.avatarurl,
    name: commentlist.nick,
    rootcontent: commentlist.rootcommentcontent,
    time: timeparse(commentlist.time),
    parisenum: commentlist.praisenum,
    rootid: commentlist.rootcommentid,
    rootuin: commentlist.rootcommentuin,
  })
}
function addzero(num) {
  return num < 10 ? '0' + num : num
}
function timeparse(time) {
  var date = new Date(time * 1000)
  var Y = date.getFullYear()
  var M = date.getMonth()+1
  var D = date.getDate()
  var H = date.getHours()
  var m = date.getMinutes()
  var S = date.getSeconds()
  return `${Y}年${M}月${D}日 ${addzero(H)}:${addzero(m)}`
}