var express = require('express')
var compression = require('compression')
var config = require('./config/index')
var axios = require('axios')
var port = process.env.PORT || config.build.port
var app = express()
var router = express.Router()
router.get('/getPlayList', function (req, res) {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
})
// 歌词
router.get('/lyric', function (req, res) {
    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        let ret = response.data
        if (typeof ret === 'string') {
            let reg = /^\w+\(({[^()]+})\)$/
            var matches = ret.match(reg)
            if (matches) {
                ret = JSON.parse(matches[1])
            }
        }
        res.json(ret)
    }).catch((e) => {
        console.log(e)
    })
})
router.get('/getAlbumSongList', function (req, res) {
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios.get(url,
        {
            headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
            },
            params: req.query
        }).then((response) => {
            let ret = response.data
            if (typeof ret === 'string') {
                const reg = /^\w+\(({.+})\)$/
                const matches = ret.match(reg)
                if (matches) {
                    ret = JSON.parse(matches[1])
                }
            }
            res.json(ret)
        }).catch(() => {
            console.log("获取歌单详情失败")
        })
})
router.get('/getComment', function (req, res) {
    const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg'
    axios.get(url,
        {
            headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
            },
            params: req.query
        }).then((response) => {
            let ref = response.data
            if (typeof ref === 'string') {
                const reg = /^\w+\(({.+})\)$/
                const matches = ref.match(reg)
                if (matches) {
                    ref = JSON.parse(matches[1])
                }
            }
            res.json(ref)
        }).catch(() => {
            console.log('获取歌曲评论失败')
        })
})
app.use("/api", router)
app.use(compression())
app.use(express.static("./dist"))
module.exports = app.listen(port, function (err) {
    if (err) {
        return
    }
    console.log(port)
})