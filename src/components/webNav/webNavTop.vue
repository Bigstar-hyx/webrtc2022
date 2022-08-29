<template>
  <div class="header">
    <div class="logo">
      <router-link to="/">
        <play-square-two-tone />&nbsp;Bigstar
      </router-link>
    </div>
    <div class="top-menu">
      <ul>
        <li>
          <router-link to="/viewer?type=live">直播</router-link>
        </li>
        <li>
          <router-link to="/viewer?type=all">全部</router-link>
        </li>
        <li>
          <router-link to="/viewer?type=online-game">网游</router-link>
        </li>
        <li>
          <router-link to="/viewer?type=phone-game">手游</router-link>
        </li>
        <li>
          <router-link to="/viewer?type=single-game">单机游戏</router-link>
        </li>
        <li>
          <router-link to="/viewer?type=entertainment">娱乐</router-link>
        </li>
        <li>
          <router-link to="/viewer?type=radio">电台</router-link>
        </li>
        <li>
          <router-link to="/viewer?type=VTuber">虚拟主播</router-link>
        </li>
        <li>
          <router-link to="/viewer?type=life">生活</router-link>
        </li>
        <li>
          <router-link to="/viewer?type=study">学习</router-link>
        </li>
        <li>
          <router-link to="/viewer?type=Competition">赛事</router-link>
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
        <a-spin :spinning="spinning" size="large">
          <WebLogin />
        </a-spin>
      </a-modal>
    </div>
    <!-- 登录状态 -->
    <div class="avatar" v-else>
      <a-popover>
        <template #content>
          <p>{{nickname}}</p>
          <p>
            <router-link to="/user">个人中心</router-link>
          </p>
          <p>
            <a @click="logout">退出登录</a>
          </p>
        </template>
        <a-button type="primary" shape="circle">
          <template #icon>
            <UserOutlined />
          </template>
        </a-button>
      </a-popover>
    </div>
    <div class="top-start">
      <ul>
        <li>
          <a>动态</a>
        </li>
        <li>
          <a>签到</a>
        </li>
        <li v-if="!isAnchor">
          <router-link to="/liver">
            <a-button type="primary" shape="round">
              <template #icon>
                <PlayCircleOutlined />
              </template>
              我要开播
            </a-button>
          </router-link>
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
      isLogin: false,
      nickname: '默认昵称'
    };
  },
  computed: {
    spinning() {
      return this.$store.state.pageInfo.loading;
    },
    isAnchor() {
      return this.$store.state.anchorInfo.anchor;
    }
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
  methods: {
    // 退出登录
    logout() {
      this.$post(this.API.POST_LOGOUT)
        .then(res => {
          console.log('退出登录：', res.data);
          this.$cookies.remove('token');
          this.$router.go(0);
        })
        .catch(err => {
          console.log('退出登录err', err);
        });
    },
    // 判断用户是否登录
    getIsLogin() {
      let token = this.$cookies.get('token');
      // let token = this.$store.state.userInfo.token;
      if (token) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    // 获取用户信息
    getCurrentUser() {
      this.$get(this.API.GET_CURRENT_USER).then(res => {
        this.nickname = res.data.data.nickname;
      });
    }
  },
  mounted() {
    this.getIsLogin();
    this.getCurrentUser();
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