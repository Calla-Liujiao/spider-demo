// 引入http模块
const http = require('http')
// 引入cheerio
// const cheerio = require('cheerio')

// 如果网页信息是ajax请求回来的数据，我们爬网址是没有用处的，需要爬数据url
// let url = 'http://www.itcast.cn/newsvideo/newslist.html'
let url = 'http://www.itcast.cn/news/json/f1f5ccee-1158-49a6-b7c4-f0bf40d5161a.json'

// 创建请求对象
let req = http.request(url, {method: 'post', headers: {
    // Accept-Encoding: gzip, deflate,
    // Accept-Language: zh-CN,zh;q=0.9,
    // Cache-Control: no-cache,
    // Connection: Upgrade,
    // Host: websocket.7moor.com,
    // Origin: http://webchat.7moor.com,
    // Pragma: no-cache,
    // Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits,
    // Sec-WebSocket-Key: o71/qf5h0UmugbzIlKaT7Q==,
    // Sec-WebSocket-Version: 13,
    // Upgrade: websocket,
    // User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36
}}, res => {
    let chunks = []
    res.on('data', chunk => chunks.push(chunk))
    res.on('end', () => {
        // let htmlStr = Buffer.concat(chunks).toString('utf-8')
        let result = Buffer.concat(chunks).toString('utf-8')
        console.log(JSON.parse(result))
    })
})
// 发送请求
req.end()