<template>
  <div class="live-up">
    <div class="live-up-video">
      <video autoplay id="player" playsinline></video>
    </div>
    <LiveTool />
  </div>
</template>

<script>
import LiveTool from './liveTool.vue';
import { gotDevices } from '@/assets/js/client.js';

export default {
  name: 'LiveUp',
  components: {
    LiveTool
  },
  methods: {
    methods1: function () {
      gotDevices();
    }
  }
};
</script>

<style scoped>
.live-up {
  float: left;
  margin: 16px 10px 10px 100px;
  border-radius: 10px;
  border-width: 0.5px;
  border-color: #ccc;
  border-style: solid;
  width: 907px;
  height: 700px;
  background-color: #fff;
}
.live-up-video {
  height: 509px;
  background-color: #000;
}
#player {
  width: 906px;
}
</style>