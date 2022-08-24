export default {
  // props: {
  //   inputName: String,
  //   required: true
  // },
  data() {
    return {
      //roomid: '111',
      //userName: 'aaa',
      inputArea: '',
      //  remoteVideo: ' ',
      // localVideo:'',
      outputArea: ' ',
      // remoteStream: null,
      socket: null,
      state: 'init',
      pc: null,
      usernum: null,
      roomid: this.$route.params.room,
      value: this.$route.params.flag,
      myName: this.$route.params.userName,
      //myName : 'b',
      userName: null,
      userjy: this.$route.params.userjy,
      activeName: 'first',
      myvedio: true,
      tableData: [{}],
      nowDate: '',
      nowTime: '',
      peerConns: {},
      roomPeerConn: {},
      jydata: false,
      messages: []
    }
  },
  methods: {
    closetrack() {
      this.localStream.getTracks().forEach(track => {
        track.stop()
      })
    },
    gotMediaStream(stream) {
      this.localStream = stream
      //localVideo.srcObject = this.localStream
      this.listen()
    },
    start() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia is not supported!')
        return true
      } else {
        var constraints = {
          video: true,
          audio: false
        }
        navigator.mediaDevices.getUserMedia(constraints).then(this.gotMediaStream).catch(this.handleError)
      }
    },
    listen() {
      // 信令交互
      var room = this.roomid
      alert('listen')
      this.userName = new Date().valueOf() //随机获取用户名作为唯一标识
      this.$socket.emit('join', {
        room: room,
        userName: this.userName,
        fz: false
      })
      //this.listenJoined ()
      this.sockets.subscribe('joined', data => {
        console.log('joined data!', data)
        // this.state = 'joined'
        // console.log('join state=', this.state)
        //this.createPeerConnection()
        let roomList = data.roomList
        let room = data.room
        let msgName = data.userName
        let roomnum = data.usernum
        //let fz = data.fz
        console.log('joined roomList!', roomList)
        //console.log('joined roomList.fz!', roomList.fz)
        if (roomList.length > 1) {
          roomList.forEach(item => {
            let arr = [item.userName, this.userName]
            let peerName = arr.sort().join('-')
            //alert( this.userName)
            if (!this.roomPeerConn[peerName]) {
              var a = item.userName
              var b = this.userName
              if (item.userName !== this.userName) {
                this.createPeerConnection(peerName, item)
              }
            }
          })
        }
        if (msgName === this.userName) {
          this.createOffer(room)
        }
      })
      // this.sockets.subscribe('otherjoin', (data) => {
      //   let room = data.room
      //   console.log('receive otherjoin message:', room)
      //   this.state = 'joined_conn'
      //   console.log('receive other_join state=', this.state)
      //   //this.createPeerConnection()
      //   this.createOffer(room)
      // })
      //this.listenMessage()
      this.sockets.subscribe('message', dataa => {
        let data = dataa.sdp
        let username = dataa.userName
        let room = dataa.room
        let candidate = dataa.candidate
        let type = dataa.type
        if (type === 'offer') {
          console.log('____________________offer_________________________')
          console.log(dataa)
          this.setRemoteOfferAndSendAswer(data, username, room)
        } else if (type === 'answer') {
          console.log('____________________answer_________________________')
          console.log(dataa)
          this.getRmoteAnswrer(data, username)
        } else if (type === 'candidate') {
          console.log('i am candidate')
          console.log(dataa)
          this.setCandidate(candidate, username, dataa)
        } else {
          console.error('the message is invalid!')
        }
        // }
      })
    },
    createPeerConnection(peerName, item) {
      console.log('create RTCPeerConnection!')
      let pcConfig = {
        //'iceServers':[{'urls':'turn:515webrtclearn.club:3478','credential':'123456','username':'root',}]
      }
      let localPc = new RTCPeerConnection(pcConfig)
      localPc.addStream(this.localStream)
      // for (const track of this.localStream.getTracks()) {
      //   console.log('addTrack')
      //     localPc.addTrack(track, this.localStream);
      //   }
      // this.pc.ontrack = this.getRemoteStream()
      //   localPc.ontrack = (event) => {

      //       console.log('event.streams[0]', event.streams[0])
      //       document.getElementById('remoteVideo').srcObject = event.streams[0]
      //       // remoteVideo.srcObject = event.streams[0]
      // }
      // else {
      // localPc.onaddstream = (e) => {
      //     //  if(event.stream){
      //   this.remoteStream = e.streams[0]
      //   remoteVideo.srcObject = e.streams[0]
      //       //  document.getElementById('remoteVideo').srcObject = event.stream
      //       //  remoteVideo.srcObject = event.stream
      //        console.log('event.stream', event.stream)
      //     //  }
      // }
      // }
      // 监听candidate事件
      var room = this.roomid
      localPc.onicecandidate = e => {
        if (e.candidate) {
          this.$socket.emit('message', {
            type: 'candidate',
            candidate: e.candidate,
            room: room,
            userName: peerName
          })
        }
      }
      //localPc.ontrack = this.getRemoteStream
      localPc.onaddstream = this.getRemoteStream
      //   localPc.ontrack = (e) => {

      //       console.log('event.streams[0]', e.streams[0])
      //       // document.getElementById('remoteVideo').srcObject = event.streams[0]
      //       remoteVideo.srcObject = e.streams[0]
      // }
      this.roomPeerConn[peerName] = localPc
      localPc = null
    },
    getRemoteStream(e) {
      document.getElementById('remoteVideo').srcObject = e.stream
      console.log('this.remoteStream', this.remoteStream)
    },
    createOffer(room) {
      console.log('createOffer')
      for (let name in this.roomPeerConn) {
        let peerCon = this.roomPeerConn[name]
        peerCon
          .createOffer({
            offerToRecieveAudio: 0,
            offerToRecieveVideo: 1
          })
          .then(desc => {
            peerCon.setLocalDescription(desc, () => {
              this.$socket.emit('message', {
                type: 'offer',
                room: room,
                userName: name,
                sdp: desc
                //desc: desc
              })
            })
            // peerCon.setLocalDescription(desc) // 触发收集candidate
            // // 发送端对端消息给另一端
            // this.$socket.emit('message', {
            //   room: room,
            //   userName: name,
            //   data: desc
            // })
          })
      }
    },
    setRemoteOfferAndSendAswer(data, username, room) {
      console.log('answern data', data)
      // console.log('answern username', username)
      //this.sockets.subscribe('message', (dataa) => {})
      let msguserName = username
      //alert('收到offer')
      //alert(msguserName)
      //let name = this.roomPeerConn
      console.log('answern username', msguserName)
      this.roomPeerConn[msguserName] &&
        this.roomPeerConn[msguserName].setRemoteDescription(
          new RTCSessionDescription(data),
          () => {
            this.roomPeerConn[msguserName].createAnswer().then(desc => {
              console.log('createAnswer')
              this.roomPeerConn[msguserName].setLocalDescription(desc, () => {
                this.$socket.emit('message', {
                  type: 'answer',
                  room: room,
                  userName: msguserName,
                  sdp: this.roomPeerConn[msguserName].localDescription
                })
              })
              console.log('createAnswer-sdp', this.roomPeerConn[msguserName].localDescription)
            })
          },
          () => {
            console.log('setLocal')
          }
        )
      // peerCon.setLocalDescription(desc)
      // this.$socket.emit('message', {
      //   room: room,
      //   data: desc
      // })
      // peerCon.setRemoteDescription(new RTCSessionDescription(data))
    },
    getRmoteAnswrer(data, username) {
      let msgUsername = username
      //alert('getRmoteAnswrer')
      //alert(msgUsername)
      this.roomPeerConn[msgUsername] &&
        this.roomPeerConn[msgUsername].setRemoteDescription(
          new RTCSessionDescription(data),
          function () {},
          () => {
            console.log('setRemote')
          }
        )
    },
    setCandidate(candidate, username, dataa) {
      console.log('setCandidate')
      //alert('setCandidate')
      //alert(username)
      let thisName = username
      if (candidate.candidate) {
        this.roomPeerConn[thisName] &&
          this.roomPeerConn[thisName].addIceCandidate(dataa.candidate).catch(() => {
            console.log('setCandidate')
          })
      }
      // this.closetrack ()
    },
    handleError(err) {
      console.error('error:', err)
    },
    currentTime() {
      setInterval(this.getDate, 500)
    },

    getDate: function () {
      var _this = this
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1
      let dd = new Date().getDate()
      let week = new Date().getDay()
      let hh = new Date().getHours()
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      _this.nowTime = hh + ':' + mf
      _this.nowDate = yy + '/' + mm + '/' + dd
    },
    jyjt() {
      this.sockets.subscribe('jy', data => {
        this.jydata = data.data
      })
      this.sockets.subscribe('chat', data => {
        if (data.room === this.roomid) {
          this.messages.push(data.data)
        }
      })
      // this.sockets.subscribe('chat', (data) => {
      //   console.log('data.data',data.data)
      //   //console.log('this.outputArea',this.outputArea)
      // if(data.room === this.roomid) {
      //   this.messages.push(data.data)
      //   // this.outputArea = this.outputArea + data.data + '\r'
      // }
      //   //console.log(this.outputArea)
      // })
    },
    btnSend() {
      var room = this.roomid
      if (this.jydata === true) {
        //this.outputArea = this.outputArea + '该房间已被禁言' + '\r'
        var datajy = { bodyjy: '该房间已被禁言' }
        this.messages.push(datajy)
        console.log('jy')
      } else {
        var data = this.inputArea
        var mydata = { headerr: this.myName + ' ' + this.nowTime, bodyy: data }
        this.messages.push(mydata)
        //data = this.myName + ' '+ this.nowDate + ' '+ this.nowTime + '\r' + data
        data = { header: this.myName + ' ' + this.nowTime, body: data }
        this.$socket.emit('chat', room, data) //发送消息给服务器
        this.inputArea = ''
      }
    },
    getusernum() {
      var room = this.roomid
      this.$socket.emit('joinusernum', room)
      this.sockets.subscribe('user', data => {
        if (data.room === room) {
          this.usernum = data.data
        }
      })
      var myname = this.myName
      var js = '观众'
      this.$socket.emit('userlist', js, room, myname)
      this.sockets.subscribe('userlist', data => {
        if (data.room === room) {
          var newValue = {
            js: data.js,
            nc: data.myname
          }
        }
        this.tableData.push(newValue)
      })
    },
    btnvedio() {
      this.start()
      // // return true
      // if (this.myvedio === true) {
      //   this.start()
      // } else if (this.myvedio === false) {
      //   this.closetrack ()
      // }
    }
  },
  mounted() {
    this.start()
    this.getusernum()
    this.currentTime()
    this.jyjt()
    //console.log(this.inputName)
  }
}
