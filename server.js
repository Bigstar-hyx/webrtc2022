const express = require('express')
const app = express()
const http = require('http').createServer(app)
const https = require('https')
const fs = require('fs')
const path = require('path')
const io = require('socket.io')(http)

app.use(express.static(path.resolve(__dirname, './dist')))
app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})

// https server
const options = {
  key: fs.readFileSync('./cert/www.bigstar.cloud.key'),
  cert: fs.readFileSync('./cert/www.bigstar.cloud.crt')
}
const httpsServer = https.createServer(options, app)

// 建立连接
io.on('connection', socket => {
  // console.log(socket)
  console.log('A user connected, ID: ', socket.id)
  // 获取客户端信息, 通过'chat message'识别于建立连接，此名称可自定义
  socket.on('chat message', msg => {
    console.log('message: ' + msg)
    // 将消息发送给客户端所有人
    io.emit('chat message', msg)
  })
  // 断开链接
  socket.on('disconnect', () => {
    console.log("A user disconnected, let's say byebye~")
  })
})

http.listen(88, '0.0.0.0', () => {
  console.log('Server running at http')
})
// httpsServer.listen(443, '0.0.0.0', () => {
//   console.log('Server running at https')
// })
