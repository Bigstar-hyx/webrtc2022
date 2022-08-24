<template>
  <div class="views-liver">
    <LiveUp />
    <WebOtherTalk />
  </div>
</template>

<script>
import LiveUp from '../components/webLiver/liveUp.vue';
import WebOtherTalk from '../components/webOtherTak/otherTak.vue';

export default {
  components: {
    LiveUp,
    WebOtherTalk
  }
};
</script>

<style scoped>
.views-liver {
  float: left;
  width: 100%;
  height: 745px;
  background: url(@/assets/img/liver-img/liver-bg.webp);
  background-size: 100% 100%;
}
</style>