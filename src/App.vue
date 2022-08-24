<template>
  <div>
    <a-layout>
      <a-layout-header>
        <WebNavTop />
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">Live System ©2022 Created by Bigstar</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import WebNavTop from './components/webNav/webNavTop.vue';
export default {
  components: {
    WebNavTop
  }
};
</script>

<style scoped>
.ant-layout-header {
  height: 50px;
  padding: 0;
}
</style>
