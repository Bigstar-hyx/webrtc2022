<template>
  <div class="web-login">
    <div>
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="密码登录">
          <div class="web-login-pw web-login-account">
            <span class="span-one">账号</span>
            <input v-model="loginZH" type="text" placeholder="请输入账号" />
          </div>
          <div class="web-login-pw web-login-password">
            <span class="span-one">密码</span>
            <input v-model="loginPass" type="text" placeholder="请输入密码" />
          </div>
          <a-button @click="btnRegOne" class="register-btn" type="primary">注册</a-button>
          <a-button @click="btnLogin" class="login-btn" type="primary">登录</a-button>
        </a-tab-pane>
        <a-tab-pane key="2" tab="验证码登录" force-render>
          <div class="web-login-pw web-login-account">
            <span class="span-one">+86&nbsp;..&nbsp;</span>
            <input type="text" v-model="phoneNumer" placeholder="请输入手机号" />
            <!-- <button :class="{ 'login-button' : btnSms  }" @click="btnGetSms">{{ btnSmsValue }}</button> -->
            <a :class="{ 'login-button' : btnSms  }" @click="btnGetSms">{{ btnSmsValue }}</a>
          </div>
          <div class="web-login-pw web-login-password">
            <span class="span-one">验证码</span>
            <input type="text" v-model="phoneCode" placeholder="请输入验证码" />
          </div>
          <a-button class="reg-login-btn" type="primary" @click="btnReg">注册/登录</a-button>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="web-login-p">
      <p>未注册过的手机号，我们将自动帮你注册账号</p>
      <p>
        登录或完成注册即代表你同意
        <a href>用户协议 &nbsp;</a>和
        <a href>隐私政策&nbsp;</a>
      </p>
    </div>
  </div>
</template>

<script>
import { DownOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
// import axios from 'axios';
export default defineComponent({
  name: 'WebLogin',
  components: {
    DownOutlined
  },
  setup() {
    let activeKey = ref('1');
    let btnSmsValue = ref('获取验证码');
    let btnSms = false;
    return {
      btnSmsValue,
      btnSms,
      activeKey
    };
  },

  data() {
    return {
      loginZH: '',
      loginPass: '',
      phoneNumer: '',
      phoneCode: ''
    };
  },
  methods: {
    // 注册
    btnRegOne() {
      this.activeKey = '2';
    },
    // 登录
    btnLogin() {
      if (!this.loginZH || !this.loginPass) {
        this.$message.error('账号或密码不能为空！');
        return;
      }
      let params = {
        account: this.loginZH, // 账号或者手机号，必填
        authKey: this.loginPass, // 密码或者验证码，必填
        codeLogin: false // 是否验证码登录，必填
      };
      this.$post(this.API.POST_LOGIN, params)
        .then(res => {
          console.log('登录成功：', res.data);
          // 存入 token
          this.$store.commit('setToken', res.data.data.token);
          // 设置 cookies
          this.$cookies.set('token', res.data.data.token);
          // 登录成功刷新当前页面
          this.$router.go(0);
        })
        .catch(err => {
          console.log('登录err', err);
        });
    },

    // 注册tab下'获取验证码'按钮
    btnGetSms() {
      // 验证输入的是否为手机号码（11位数字）
      if (this.phoneNumer.length == 11) {
        let params = {
          mobile: this.phoneNumer // 手机号，必填
        };
        this.$get(this.API.GET_SEND_SMS, params)
          .then(res => {
            this.$message.success('验证码已发送，请注意查收');
            console.log('获取验证码：', res.data);
            // 验证码冻结时间
            if (res.data.code === 200) {
              let count = 60;
              this.btnSms = true;
              this.btnSms = 'pointer-events:none';
              let countdown = setInterval(() => {
                this.btnSmsValue = count + 's后重新获取';
                if (count === 0) {
                  this.btnSmsValue = '获取短信验证码';
                  this.btnSms = false;
                  clearInterval(countdown);
                }
                count--;
              }, 1000);
            }
          })
          .catch(err => {
            console.log('获取验证码err', err);
          });
      } else {
        this.$message.error('请先填写正确的手机号码！');
      }
    },
    // 注册/登录
    btnReg() {
      if (this.phoneNumer.length !== 11) {
        this.$message.error('请填写正确的手机号码！');
        return;
      } else if (!this.phoneCode) {
        this.$message.error('短信验证码不能为空！');
        return;
      }
      let params = {
        account: this.phoneNumer, // 手机号，必填
        authKey: this.phoneCode, // 短信验证码
        codeLogin: true // 是否验证码登录，必填
      };
      this.$post(this.API.POST_LOGIN, params)
        .then(res => {
          console.log('注册/登录成功：', res.data);
          // 存入 token
          this.$store.commit('setToken', res.data.data.token);
          // 设置 cookies
          this.$cookies.set('token', res.data.data.token);
          // let value = this.$cookies.get('token');
          // console.log('cookie get: ' + value);
          // 登录成功刷新当前页面
          this.$router.go(0);
        })
        .catch(err => {
          console.log('注册/登录：', err);
        });
    }
  }
});
</script>

<style scoped>
.login-button {
  color: #cecece;
  /* cursor: not-allowed; */
  pointer-events: none;
}

.btn-get-sms {
  border: none;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
}
.web-login-pw {
  display: flex;
  padding: 0 20px;
  margin: 0 20px;
  align-items: center;
  border: 1px solid #e7e7e7;
  border-radius: 8px 8px 0 0;
  height: 43px;
}
.web-login-account {
  border-radius: 8px 8px 0 0;
  border-bottom: none;
}
.web-login-password {
  margin-bottom: 20px;
  border-radius: 0 0 8px 8px;
}
.web-login-pw input {
  width: 230px;
  outline: none;
  border: none;
  font-size: 14px;
  color: #212121;
  box-shadow: inset 0 0 0 20px #fff;
}
.span-one {
  margin-right: 20px;
  color: #212121;
  font-size: 14px;
}

.web-login-pw input::-webkit-input-placeholder {
  color: #c0c0c0;
  font-size: 14px;
}

.register-btn,
.login-btn {
  margin: 0 15px 15px 35px;
  width: 170px;
  height: 40px;
  border-radius: 8px;
  font-size: 14px;
}
.reg-login-btn {
  margin: 0 125px 15px 125px;
  width: 194px;
  height: 40px;
  border-radius: 8px;
  font-size: 14px;
}

.web-login-p p,
.web-login-other p {
  margin: 0 auto;
  font-size: 12px;
  color: #999;
  text-align: center;
}
</style>