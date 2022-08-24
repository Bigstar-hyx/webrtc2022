import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueSocketIO from 'vue-3-socket.io'
import io from 'socket.io-client'
import { get, post } from './config/axiosConfig'
import API from './config/apiAddress'
import VueCookies from 'vue-cookies'

// const socketio = new VueSocketIO({
//   debug: true,
//   connection: io('http://127.0.0.1:88', { transports: ['websocket'] })
//   // extraHeaders: {"Access-Control-Allow-Origin": '*'},
// })

const app = createApp(App)

// 封装的axios请求方法
app.config.globalProperties.$get = get
app.config.globalProperties.$post = post
// API地址
app.config.globalProperties.API = API

// 全局挂载 cookies
app.config.globalProperties.$cookies = VueCookies

app.use(store)
app.use(router)
app.use(Antd)
// app.use(socketio)
app.mount('#app')
