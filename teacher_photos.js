// 引入http模块
const http = require('http')
// 引入cheerio
const cheerio = require('cheerio')
// 引入download
const download = require('download')
const HOST = 'http://web.itheima.com/'
// 创建请求对象
let req = http.request('http://web.itheima.com/teacher.html', res => {
    // console.log(res)
    let chunks = []
    // 监听data事件，获取传递过来的数据片段
    // 拼接数据片段
    res.on('data', c => chunks.push(c))
    // 监听end事件，获取数据完毕时触发
    res.on('end', () => {
        // 拼接所有的chunk,并转换成字符串 =》html 字符串
        // console.log(Buffer.concat(chunks).toString('utf-8'))
        let htmlStr = Buffer.concat(chunks).toString('utf-8')
        let $ = cheerio.load(htmlStr)
        // console.log($('.tea_main .tea_con .li_img > img').attr('src'))
        // console.log($('.tea_main .tea_con .li_img > img').length)
        // let imgs = []
        // $('.tea_main .tea_con .li_img > img').each((index,item) => {
        //     // console.log(HOST + $(item).attr('src'))
        //     imgs.push(HOST + $(item).attr('src'))
        // })
        //优化
        // 由于http协议不支持URL有中文的下载，如果下载的文件地址有中文，一顶要用encodeURI进行base64编码
        let imgs = Array.prototype.map.call($('.tea_main .tea_con .li_img > img'), item => HOST + encodeURI($(item).attr('src'))) // 结果是数组
        // let imgs = $('.tea_main .tea_con .li_img > img').map((index,item) => HOST + $(item).attr('src')) // 结果是为数组
        // console.log(imgs[1])
        Promise.all(imgs.map(x => download(x, 'dist')))
        .then(() => {
            console.log('files downloaded!')
        })

    })
})
// 当调用这个函数时候请求才会被发送
req.end()