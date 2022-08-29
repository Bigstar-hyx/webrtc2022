<template>
  <div class="other-talk">
    <div class="viewer-list">
      <p>房间动态</p>
      <!-- 观众列表 -->
      <div class="viewer-list"></div>
    </div>
    <!-- 讨论区textarea -->
    <div class="danmu">
      <div class="danmu-list" id="chatOutput">
        <p class="chatP" id="chatp">主播：快来发表评论吧～凸^-^凸～</p>
      </div>
    </div>
    <div class="viewer-send">
      <div>
        <input v-model="chatInput" class="viewer-send-input" :placeholder="danmuMsg" @keyup.enter="handleSend" />
        <template v-if="!danmuIsLogin">
          <button class="viewer-send-bun" @click="showModal">登录</button>
          <a-modal v-model:visible="visible" footer width="500px" style="top: 170px" @ok="handleOk">
            <a-spin :spinning="spinning" size="large">
              <WebLogin />
            </a-spin>
          </a-modal>
        </template>
        <button v-else @click="chatSend" class="viewer-send-bun">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import WebLogin from '../webLogin/webLogin.vue';
import { ref } from 'vue';
export default {
  name: 'WebOtherTalk',
  components: {
    WebLogin
  },

  setup() {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };

    return {
      visible,
      showModal,
      handleOk
    };
  },
  computed: {
    spinning() {
      return this.$store.state.pageInfo.loading;
    }
  },
  data() {
    return {
      chatInput: '',
      danmuMsg: '主播：快来发表评论吧～凸^-^凸～',
      danmuIsLogin: false
    };
  },
  methods: {
    // 更改主播状态
    setAnchorInfo() {
      this.$store.state.anchorInfo.anchor = true;
    },
    // 讨论区验证是否登录
    getIsLogin() {
      let token = this.$cookies.get('token');
      // let token = this.$store.state.userInfo.token;
      if (token) {
        this.danmuMsg = '发个弹幕呗～(☆▽☆)';
        this.danmuIsLogin = true;
      } else {
        this.danmuMsg = '主播：登录后才可以发表评论哦～';
        this.danmuIsLogin = false;
      }
    },
    // 点击发送按钮，将input中的内容发送至服务端
    chatSend() {
      this.$socket.emit('chat message', this.chatInput);
      console.log('send to server msg: ', this.chatInput);
      this.chatInput = '';
      this.receiveMsg();
    },
    // 回车键盘，将input中的内容发送至服务端
    handleSend() {
      this.chatSend();
    },
    // 监听服务端收到的消息，并新建p标签打印在聊天框
    receiveMsg() {
      this.sockets.subscribe('chat message', function (msg) {
        var chatOutput = document.getElementById('chatOutput');
        var para = document.createElement('p');
        para.setAttribute('class', 'chatP');
        chatOutput.appendChild(para);
        var username = '大星的忠实粉丝';
        para.innerHTML = username + '：' + msg;
        console.log(para);
      });
    }
  },
  mounted() {
    this.getIsLogin();
    this.setAnchorInfo();
  }
};
</script>

<style scoped>
.other-talk {
  float: right;
  margin: 16px 110px 10px 10px;
  border-radius: 10px;
  border-width: 0.5px;
  border-color: #ccc;
  border-style: solid;
  width: 300px;
  height: 700px;
  background-color: #fff;
}
.viewer-list {
  height: 120px;
  text-align: center;
  /* background-color: pink; */
}
.viewer-list p {
  margin: 8px;
}
.danmu {
  margin: 5px 0;
  padding: 2px 10px;
  height: 450px;
  background-color: #f8f8f8;
}
.viewer-send {
  text-align: center;
}

/* viewer-list */
.viewer-list {
  /* background-color: #f1f2f4; */
}
.viewer-list ul {
  margin: 0 10px;
  padding: 0 5px 5px 0;
}

.viewer-list li {
  list-style: none;
}
.viewer-list ul li {
  margin: 10px 0;
}

.div-left {
  float: left;
}
.span-right {
  /* float: right; */
  color: #646c7a;
  font-size: 12px;
}
.div-left img {
  width: 30px;
  border-radius: 50%;
}

/* danmu */
.danmu-list {
  height: 450px;
  overflow: auto;
}
.danmu-list ul {
  margin: 10px 5px;
  padding: 0;
}

.danmu-list li {
  list-style: none;
}
.danmu-list ul li {
  margin: 20px 0;
}

.danmu-div-left {
  float: left;
}
.danmu-span-right {
  /* float: right; */
  color: #646c7a;
  font-size: 12px;
}

.danmu-div-left img {
  width: 30px;
  border-radius: 50%;
}

/* send */
.viewer-send-input {
  display: block;
  margin: 10px 10px;
  padding: auto 10px;
  width: 280px;
  height: 50px;
  background-color: #f1f2f4;
  border-radius: 10px;
  border-width: 0.5px;
  border-color: #ccc;
  border-style: solid;
}

.viewer-send-bun {
  width: 100px;
  background-color: #1a94ff;
  color: #fff;
  border: 1px solid #1a94ff;
}
.chatP {
  margin: 5px 8px;
  font-size: 14px;
}
</style>