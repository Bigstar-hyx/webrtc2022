<template>
  <div class="up-live">
    <div class="up-title">
      <div class="up-head"></div>
      <div class="up-headline">
        <ul class="up-headline-l">
          <li class="up-headline-bun">直播</li>
          <li>欢迎来到 BBBigstar 的直播间 ~~~</li>
        </ul>

        <ul class="up-headline-r">
          <li>
            <a href>
              <EyeOutlined />&nbsp;1000人
            </a>
          </li>
          <li>
            <a href>
              <ShareAltOutlined />&nbsp;分享
            </a>
          </li>
          <li>
            <a href>
              <WarningOutlined />&nbsp;举报
            </a>
          </li>
        </ul>
      </div>
      <div class="up-lv">
        <ul>
          <li class="up-lv-class">up 30</li>
          <li>BBBigstar</li>
          <li>
            <StarTwoTone twoToneColor="#eb2f96" />&nbsp;1487.8 万
          </li>
          <li>
            <FundTwoTone twoToneColor="green" />&nbsp; No. 1000
          </li>
        </ul>
      </div>
    </div>
    <div class="up-video">
      <video src></video>
    </div>
  </div>
</template>

<script>
import { WarningOutlined, EyeOutlined, ShareAltOutlined, StarTwoTone, FundTwoTone } from '@ant-design/icons-vue';
export default {
  name: 'WebLiveViewer',
  components: {
    WarningOutlined,
    EyeOutlined,
    ShareAltOutlined,
    StarTwoTone,
    FundTwoTone
  }
};
</script>

<style scoped>
.up-live {
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

.up-title {
  height: 100px;
}
.up-head {
  float: left;
  margin: 17px 20px;
  border-radius: 50%;
  width: 66px;
  height: 66px;
  background: url(@/assets/img/viewer-img/upHead.webp);
  background-size: 100%;
}
.up-headline {
  height: 50px;
}
.up-headline-l {
  float: left;
  margin: 17px 0px;
  padding: 0px;
}
.up-headline-l li {
  list-style: none;
  float: left;
  margin: auto 0;
  padding: 0px 5px;
  font-size: 16px;
  /* flex-direction: row;
  justify-content: center; */
  /* line-height: 16px; */
}
.up-headline-bun {
  background-color: white;
  color: #1a94ff;
  border: 1px solid #1a94ff;
}
.up-headline-r {
  float: right;
  margin: 17px 20px 17px 0px;
  padding: 0px;
}
.up-headline-r li a {
  color: #646c7a;
  font-size: 12px;
  margin: 0 3px;
  padding: 0 8px;
}

.up-headline-r li {
  float: right;
  list-style: none;
}
.up-lv {
  height: 50px;
}

.up-lv ul li {
  list-style: none;
  float: left;
  color: #646c7a;
  font-size: 14px;
  padding: 0 10px;
}
.up-lv-class {
  background-color: white;
  color: #855de4;
  border: 1px solid #855de4;
}

.up-video {
  height: 524px;
  background-color: #000;
}
</style>