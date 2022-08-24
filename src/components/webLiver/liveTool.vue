<template>
  <div class="live-tool">
    <div class="tool-title">
      <ul>
        <li>
          直播间标题：
          <input type="text" placeholder="取个引人注目的标题吧～" />
        </li>
        <li>
          <button>同步标题</button>
        </li>
        <li>
          <button>封面设置</button>
        </li>
      </ul>
    </div>
    <div class="tool-debug">
      <div class="tool-debug-left">
        <ul>
          <li>
            <a-switch v-model:checked="checked" />
            <p>🎙麦克风</p>
          </li>
          <li>
            <a-switch v-model:checked="checked" />
            <p>📷摄像头</p>
          </li>
          <li>
            <a-switch v-model:checked="checked" />
            <p>📺共享屏幕</p>
          </li>
        </ul>
      </div>
      <div class="tool-debug-right">
        <button>● 录制</button>
        <button>开始直播</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'LiveTool',
  setup() {
    const checked = ref(false);
    return {
      checked
    };
  }
});
</script>

<style scoped>
.live-tool {
  margin: 15px 0 0 0;
}
.tool-title {
  height: 50px;
}
.tool-title ul {
  margin: 0;
  padding: 0;
}

.tool-title li {
  display: inline-block;
  padding: 6px 0;
  margin: 0 20px;
  font-size: 13px;
  color: #646c7a;
  /* background-color: #fff; */
  list-style: none;
}

.tool-title input {
  outline-style: none;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0 10px;
  width: 200px;
  height: 30px;
  background: #f1f2f4;
}

.tool-title input::-webkit-input-placeholder {
  color: #c1c1c1;
}

.tool-title button {
  border: 1px solid;
  border-radius: 12px;
  width: 80px;
  height: 30px;
  background-color: #fff;
}

.tool-title button {
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}

.tool-title button:hover {
  border: 2px solid #1990ff;
  background-color: #fff;
  color: #646c7a;
}
.tool-debug {
  height: 80px;
  /* background-color: pink; */
}

.tool-debug-left ul {
  margin: 0 10px;
  padding: 0;
}

.tool-debug-left li {
  float: left;
  padding: 15px 0;
  margin: 0 50px;
  font-size: 13px;
  color: #646c7a;
  list-style: none;
}
.tool-debug-left button {
  width: 60px;
}

.tool-debug-right {
  float: right;
  padding: 25px 10px 10px 20px;
  /* background-color: pink; */
}

.tool-debug-right button {
  border: none;
  border-radius: 8px;
  margin: 0 10px;
  width: 100px;
  height: 40px;
  /* font-size: 13px; */
  color: #fff;
  background-color: #1990ff;
}

.tool-debug-right button {
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}

.tool-debug-right button:hover {
  background-color: red;
}
</style>