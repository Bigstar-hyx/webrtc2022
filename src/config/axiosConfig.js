import axios from 'axios'

// 设置全局默认值
// axios.defaults.baseURL = '/api'
// 响应超时时间
axios.defaults.timeout = 3000
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'

// 封装get方法和post方法
// url：String[请求的url地址]
// params：Object[请求时携带的参数, get和post的传参格式并不相同]
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export function post(url, params, type) {
  switch (type) {
    case 'nojson': // 不需要转JSON
      break
    case 'file': // 上传文件的情况下不转换成JSON格式
      break
    default:
      params = JSON.stringify(params)
  }
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
