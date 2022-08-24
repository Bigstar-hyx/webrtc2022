// 获取音视频设备信息并在控制台打印详情
if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log('sorry, enumerateDevices is not supported')
} else {
  navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError)
}

function gotDevices(devices) {
  devices.forEach(function (device) {
    console.log('kind: ' + device.kind + ', name: ' + device.label + ', id= ' + device.deviceId)
  })
}

// 获取媒体流，包含视频轨道和音频轨道
function gotMediaStream(mediaStream) {
  var videoplay = document.querySelector('video#player')
  videoplay.srcObject = mediaStream
}

if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  console.log('すみません, getUserMedia is not supported')
} else {
  var constraints = {
    // 可以在这里自定义摄像头的分辨率，尺寸等
    // audio: true,
    video: true
  }
  navigator.mediaDevices.getUserMedia(constraints).then(gotMediaStream).catch(handleError)
}

// 异常捕获
function handleError(err) {
  console.log(err.name + ': ' + err.message)
}

// export { gotDevices }
