// import child from './users'
export default {
  // components: {
  //   child
  // },
  data() {
    return {
      messages: [],
      inputArea: '',
      // localVideo: ' ',
      // remoteVideo:'',
      outputArea: ' ',
      jy: false,
      shareDesk: false,
      myvedio: false,
      localStream: null,
      remoteStream: null,
      socket: null,
      state: 'init',
      pc: null,
      peerConns: {},
      roomPeerConn: {},
      deskStream: null,
      roomid: this.$route.params.room,
      //roomid : '111',
      value: this.$route.params.flag,
      myName: this.$route.params.userName,
      //myName: 'a',
      userName: null,
      users: null,
      activeName: 'first',
      //activeName: 'second',
      usernum: '',
      nowDate: '',
      nowTime: '',
      tableData: [{}]
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
      // localVideo.srcObject = this.localStream
      document.getElementById('localVideo').srcObject = this.localStream
      this.listen()
    },
    getDeskStream(stream) {
      this.localStream = stream
      // localVideo.srcObject = this.localStream
      document.getElementById('localVideo').srcObject = this.localStream
      //console.log(this.deskStream)
      this.listen()
    },
    start2() {
      navigator.mediaDevices.getDisplayMedia({ video: true }).then(this.getDeskStream).catch(this.handleError)
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
        fz: true
      })
      //this.listenJoined ()
      this.sockets.subscribe('joined', data => {
        console.log('-------------------------------joined------------------------------------')
        console.log(data)
        this.state = 'joined'
        console.log('join state=', this.state)
        //this.createPeerConnection()
        let roomList = data.roomList
        let room = data.room
        let msgName = data.userName
        let roomnum = data.usernum
        console.log('joined roomList!', roomList)
        if (roomList.length > 1) {
          roomList.forEach(item => {
            let arr = [item.userName, this.userName]
            let peerName = arr.sort().join('-')
            if (!this.roomPeerConn[peerName]) {
              var a = item.userName
              var b = this.userName
              if (item.userName !== this.userName) {
                this.createPeerConnection(peerName, item)
              }
            }
          })
        }
      })
      this.sockets.subscribe('message', dataa => {
        console.log('=====================================message===================================')
        console.log(dataa)
        let data = dataa.sdp
        let username = dataa.userName
        let room = dataa.room
        let candidate = dataa.candidate
        let type = dataa.type
        // 媒体协商
        // if (data) {
        if (type === 'offer') {
          console.log('____________________offer_________________________')
          console.log(dataa)
          this.setRemoteOfferAndSendAswer(data, username, room)
        } else if (type === 'answer') {
          console.log('____________________answer_________________________')
          console.log(dataa)
          this.getRmoteAnswrer(data, username)
        } else if (type === 'candidate') {
          console.log('____________________candidate_________________________')
          console.log(dataa)
          this.setCandidate(candidate, username)
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
      //监听ontrack事件，将远端流赋值给远端video
      // console.log('监听ontrack事件')
      // var hasAddTrack = (this.localPc.addTrack !== undefined)
      // if(hasAddTrack) {
      // console.log('hasAddTrack')
      // this.localPc.addStream = (event) => {
      //   let dom = document.getElementById(peerName)
      //   console.log('dom', dom)
      //   console.log('peerName', peerName)
      //   if (dom && dom != null) {
      //     dom.srcObject = event.stream
      //   } else {
      //     // 新建一个vedio
      //     let video = document.createElement('video')
      //     video.controls = true
      //     video.autoplay = true
      //     video.playsinline = true
      //     video.id = peerName
      //     video.src = event.stream
      //     //setRateVideo.append(video)
      //     this.setRateVideo.append(video)
      //   }
      // }
      // } else {
      // localPc.onaddstream = (event) => {

      // }
      //   }
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
      this.roomPeerConn[peerName] = localPc
      localPc.onaddstream = this.getRemoteStream

      localPc = null
      //原先的
      // if (! this.pc) {
      //this.pc = new RTCPeerConnection({})
      //this.pc.addStream(this.localStream)
      // 监听candidate事件
      // this.pc.onicecandidate = (e)=>{
      //   if(e.candidate) {
      //     //发送消息给对端
      //     this.sendMessage(this.roomid, {
      //       type: 'candidate',
      //       label:e.candidate.sdpMLineIndex,
      //       id:e.candidate.sdpMid,
      //       candidate: e.candidate.candidate
      //     });
      //   } else{
      //     console.log('this is the end candidate')
      //   }
      // }
      //监听ontrack事件，将远端流赋值给远端video
      // this.pc.ontrack = this.getRemoteStream
      //this.peerConns[] = pc
      // }
      // //将本地流track添加到PeerConnection中
      // if(this.localStream){
      //   this.localStream.getTracks().forEach((track) => {
      //     this.pc.addTrack(track)
      //   })
      // }
    },
    getRemoteStream(e) {
      this.remoteStream = e.stream
      remoteVideo.srcObject = e.stream
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
              //console.log('send p2p message ', peerCon.localDescription)
              this.$socket.emit('message', {
                type: 'offer',
                sdp: desc,
                userName: name,
                room: room
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
      //alert('getRemoteOffer')
      // console.log('answern username', username)
      //this.sockets.subscribe('message', (dataa) => {})
      let msguserName = username
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
      console.log('getRmoteAnswrer')
      let msgUsername = username
      this.roomPeerConn[msgUsername] &&
        this.roomPeerConn[msgUsername].setRemoteDescription(new RTCSessionDescription(data), () => {
          console.log('setRemote')
        })
    },
    setCandidate(candidate, username) {
      console.log('setCandidate')
      let thisName = username
      if (candidate.candidate) {
        this.roomPeerConn[thisName] &&
          this.roomPeerConn[thisName].addIceCandidate(candidate.candidate).catch(() => {
            console.log('setCandidate')
          })
      }
    },
    handleError(err) {
      console.error('error:', err)
    },
    btnvedio() {
      this.start()
      // return true
      // if (this.myvedio === true) {
      //   start()
      // }
    },
    btnshareDesk() {
      // if(this.shareDesk === true){
      // navigator.mediaDevices. ({video: true})
      //   .then(this.getDeskStream)
      //   .catch(this.handleError);
      // } else {
      //   this.deskStream = null
      // }
      this.start2()
    },

    currentTime() {
      setInterval(this.getDate, 500)
    },
    getDate() {
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
    btnjy() {
      var data = this.jy
      var room = this.roomid
      this.$socket.emit('jy', room, data)
    },
    getusernum() {
      var room = this.roomid
      this.$socket.emit('joinusernum', room)
      this.sockets.subscribe('user', data => {
        if (data.room === room) {
          this.usernum = data.data
        }
      })
      let myname = this.myName
      var js = '主播'
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
    btnleave() {
      var room = this.roomid
      this.$socket.emit('leave', room)
      this.sockets.subscribe('userleave', data => {
        if (data.room === room) {
          this.usernum = data.data
        }
      })
    },
    btnSend() {
      var data = this.inputArea
      var room = this.roomid
      //var mydata = {headerr:this.myName + ' '+this.nowDate+ ' '+ this.nowTime,bodyy:data}
      var mydata = { headerr: this.myName + ' ' + this.nowTime, bodyy: data }
      this.messages.push(mydata)
      //data = {header:this.myName + ' '+this.nowDate+ ' '+ this.nowTime,body:data}
      data = { header: this.myName + ' ' + this.nowTime, body: data }
      this.$socket.emit('chat', room, data) //发送消息给服务器
      this.inputArea = ' '
      // this.sockets.subscribe('chat', (data) => {
      //   if(data.room === this.roomid) {
      //     this.outputArea = this.outputArea + data.data + '\r'
      //   }
      // })
    },
    jyjt() {
      this.sockets.subscribe('chat', data => {
        if (data.room === this.roomid) {
          this.messages.push(data.data)
        }
      })
    }
  },
  mounted() {
    //alert(this.roomPeerConn)
    //this.start2()
    //this.listen()
    //this.btnjy ()
    this.jyjt()
    this.currentTime()
    this.getusernum()
    // console.log('1',this.nowDate)
    // console.log('2',this.nowTime)
    // var data = this.jy
    // var room = this.roomid
    // this.$socket.emit('jy', room, data)
  }
}
