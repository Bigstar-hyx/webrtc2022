<template>
  <div class="user-top">
    <div class="user-top-title">
      <img src="@/assets/img/liver-img/tx2.webp" alt="个人头像" />
      <h1>BBBigstar6</h1>
      <input type="text" placeholder="编辑个性签名" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserTop'
};
</script>

<style scoped>
.user-top {
  margin: 0 auto;
  width: 1283px;
  height: 190px;
  background: url(@/assets/img/user/user-back.webp);
}
.user-top-title {
  float: left;
  margin: 116px 0 0 0;
  width: 1283px;
  height: 75px;
  background: url(@/assets/img/user/user-back-jianbian.png);
}
.user-top-title img {
  float: left;
  margin: 5px 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.user-top-title h1 {
  margin: 0;
  color: aliceblue;
}
.user-top-title input {
  outline: none;
  background: transparent;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  line-height: 26px;
  height: 26px;
  width: 700px;
}
.user-top-title input:focus {
  background: #fff;
}

.user-top-title input::-webkit-input-placeholder {
  color: #d5dee3;
  font-size: 12px;
}
</style>
