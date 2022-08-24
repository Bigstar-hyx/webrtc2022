<template>
  <div class="views-viewer">
    <WebLiveViewer />
    <WebOtherTalk />
  </div>
</template>

<script>
import WebOtherTalk from '../components/webOtherTak/otherTak.vue';
import WebLiveViewer from '../components/webViewer/webLiveViewer.vue';
export default {
  components: {
    WebOtherTalk,
    WebLiveViewer
  }
};
</script>

<style scoped>
.views-viewer {
  float: left;
  width: 100%;
  height: 745px;
  background: url(@/assets/img/viewer-img/back1.jpeg);
  background-size: 100% 100%;
}
</style>