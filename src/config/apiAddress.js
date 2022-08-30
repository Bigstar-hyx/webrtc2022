const API = {
  // 登录
  POST_LOGIN: '/api/v1/live/login',
  // 发送短信验证码
  GET_SEND_SMS: '/api/v1/live/code/send',
  // 退出登录
  POST_LOGOUT: '/api/v1/live/logout',
  // 获取用户个人信息
  GET_CURRENT_USER: '/api/v1/live/account/info/currentUser',
  // 获取推荐直播信息
  GET_HOT_LIVE: '/api/v1/live/account/info/hotLive',
  // 获取首页轮播图信息
  GET_WEB_BANNER: '/api/v1/live/account/info/webBanner'
}

export default API
