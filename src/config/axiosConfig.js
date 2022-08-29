import axios from 'axios'
import { message } from 'ant-design-vue'
import store from '@/store'
import VueCookies from 'vue-cookies'

// cookies保存的周期（保存一天）
VueCookies.config('1d')
// 响应超时时间
axios.defaults.timeout = 5000

// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前打开loading
    store.commit('setLoading', true)
    // 配置请求头
    config.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
    // 添加 token参数
    config.headers['token'] = store.state.userInfo.token
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 收到响应后关闭loading
    store.commit('setLoading', false)
    if (response.data.code >= 400 && response.data.code < 600) {
      let errorMsg = response.data.error.msg
      message.error(errorMsg)
      return Promise.reject(response)
    }
    return response
  },
  function (error) {
    // 收到响应后关闭loading
    store.commit('setLoading', false)
    return Promise.reject(error)
  }
)

// 封装get方法和post方法
// url：String[请求的url地址]；params：Object[请求时携带的参数, get和post的传参格式并不相同]
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
