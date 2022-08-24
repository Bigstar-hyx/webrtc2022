// 测试发送与接收
// this.$socket.emit('chat message', 'test')
// this.sockets.subscribe('chat message', data => {
//   console.log('serve: ', data)
// })
// 点击发送按钮，将input中的内容发送至服务端
function chatSend() {
  this.$socket.emit('chat message', chatInput)
  console.log('send to server msg: ', chatInput)
  chatInput = ''
  receiveMsg()
}

// 监听服务端收到的消息，并新建p标签打印在聊天框
function receiveMsg() {
  this.sockets.subscribe('chat message', function (msg) {
    var chatOutput = document.getElementById('chatOutput')
    var para = document.createElement('p')
    para.setAttribute('class', 'chatP')
    chatOutput.appendChild(para)
    var username = '大星的忠实粉丝'
    para.innerHTML = username + '：' + msg
    console.log(para)
  })
}
// 点击回车按键，将input中的内容发送至服务端
// chatInput.onkeypress = event => {
//   if (event.keyCode == 13) {
//     event.preventDefault() //阻止默认行为
//     this.$socket.emit('chat message', chatInput.value)
//     console.log('send to server msg: ', chatInput.value)
//     chatInput.value = ''
//   }
// }
