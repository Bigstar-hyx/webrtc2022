<template>
  <div class="header">
    <div class="logo">
      <a href="/">
        <play-square-two-tone />&nbsp;Bigstar
      </a>
    </div>
    <div class="top-menu">
      <ul>
        <li>
          <a href="/viewer">直播</a>
        </li>
        <li>
          <a href="/viewer">全部</a>
        </li>
        <li>
          <a href="/viewer">网游</a>
        </li>
        <li>
          <a href="/viewer">手游</a>
        </li>
        <li>
          <a href="/viewer">单机游戏</a>
        </li>
        <li>
          <a href="/viewer">娱乐</a>
        </li>
        <li>
          <a href="/viewer">电台</a>
        </li>
        <li>
          <a href="/viewer">虚拟主播</a>
        </li>
        <li>
          <a href="/viewer">生活</a>
        </li>
        <li>
          <a href>学习</a>
        </li>
        <li>
          <a href="/viewer">赛事</a>
        </li>
      </ul>
    </div>
    <div class="div-search">
      <a-input class="search" size="large" placeholder="今天你想了解什么呢？(☆▽☆)">
        <template #suffix>
          <search-outlined />
        </template>
      </a-input>
    </div>
    <!-- 未登录状态 -->
    <div class="avatar" v-if="!isLogin">
      <a-button type="primary" shape="circle" @click="showModal">登录</a-button>
      <a-modal v-model:visible="visible" footer width="500px" style="top: 170px" @ok="handleOk">
        <WebLogin />
      </a-modal>
    </div>
    <!-- 登录状态 -->
    <div class="avatar" v-else>
      <a href="/user">
        <a-button type="primary" shape="circle">
          <template #icon>
            <UserOutlined />
          </template>
        </a-button>
      </a>
    </div>
    <div class="top-start">
      <ul>
        <li>
          <a href>动态</a>
        </li>
        <li>
          <a href>签到</a>
        </li>
        <li>
          <a href="/liver">
            <a-button type="primary" shape="round">
              <template #icon>
                <PlayCircleOutlined />
              </template>
              我要开播
            </a-button>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { PlaySquareTwoTone, SearchOutlined, UserOutlined, PlayCircleOutlined } from '@ant-design/icons-vue';
import WebLogin from '../webLogin/webLogin.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'WebNavTop',
  components: {
    PlaySquareTwoTone,
    SearchOutlined,
    UserOutlined,
    PlayCircleOutlined,
    WebLogin
  },
  data() {
    return {
      isLogin: false
    };
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
  // computed: {
  //   token() {
  //     return this.$store.state.userInfo.token;
  //   }
  // },
  // watch: {
  //   token(newVal, oldVal) {
  //     this.getIsLogin();
  //   }
  // },
  methods: {
    // 判断用户是否登录
    getIsLogin() {
      let token = this.$cookies.get('token');
      // let token = this.token;
      console.log('token', token);
      if (token) {
        console.log('login');
        this.isLogin = true;
      } else {
        console.log('unlogin');
        this.isLogin = false;
      }
    }
  },
  mounted() {
    this.getIsLogin();
  }
});
</script>

<style scoped>
.header {
  height: 50px;
  padding: 0 50px;
  box-shadow: 0px 0px 1px #000;
  color: rgba(0, 0, 0, 0.85);
  line-height: 50px;
  background: #fff;
}

/* logo */
.logo {
  float: left;
  padding: 0px 0px 0px 20px;
  width: 100px;
  color: #646c7a;
  font-size: 15px;
}
.avatar {
  float: left;
  margin: 0 30px;
  width: 32px;
  height: 32px;
}

/* top-menu */
.top-menu ul {
  margin: auto;
}
.top-menu ul li a {
  float: left;
  color: #646c7a;
  font-size: 13px;
}

.top-menu li {
  list-style: none;
}

.top-menu li a {
  margin: 0 5px;
  padding: 0 8px;
}

/* search */
.search {
  float: left;
  margin: 8px 10px 8px 20px;
  padding: 0px 10px 0px 15px;
  border: none;
  border-radius: 20px;
  background: #f1f2f4;
  width: 240px;
  height: 34px;
}

.div-search /deep/ .ant-input-affix-wrapper > input.ant-input {
  background: #f1f2f4;
  font-size: 13px;
}

/* start */
.top-start ul {
  margin: auto;
}
.top-start ul li a {
  float: left;
  color: #646c7a;
  font-size: 13px;
}

.top-start li {
  list-style: none;
}

.top-start li a {
  margin: 0 5px;
  padding: 0 8px;
}
</style>