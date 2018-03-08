var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
var options = {

}
var request = new Request(url, {
  headers: new Headers({
    referer: 'https://c.y.qq.com',
    host: 'c.y.qq.com'
  }),
  mode: 'cors',
  methods: 'GET'
})
export default function fetch() {
  return new Promise((resolve, reject) => {
    fetch(request,options).then((response) => {
      let ret = response.data
      if(typeof ret === 'string'){
        let reg = /^\W+\(({[^()]+})\)$/
        var matches = ret.match(reg)
        if(matches){
          ret=  JSON.parse(matches[0])
        }
      }
      
    })
  })
}