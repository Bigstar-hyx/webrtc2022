# todolist

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

优化点：

1. 讨论区进度条置地
2. 讨论姓名与内容分开
3. 讨论区多条消息问题
4. 注册前要先验证手机号码是否已存在，如何验证？
   获取 input 值，传给后端，后端返回给我是否已注册
5. 登录 tab 注册按钮需实现跳转至注册页面
6. 注册与登录接口的区别
   注册可以直接作为登录吗，前端而言的注册 = 登录，注册+验证
   (此处需要有流程图)
7. 首页的头像，（未登录 - 登录窗口；已登录 - 个人详情页）
8. 接口 4 - 14 均是个人详情页需要的
9. 接口 15，查看我的直播间信息，
   （get 请求然后必填莫？）这个感觉应该是 post 请求， 用来创建直播间
10. 应该加视频类别的接口，没有直播的时候有回放，
