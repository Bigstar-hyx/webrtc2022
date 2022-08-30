<template>
  <div class="up-live">
    <div class="up-title">
      <div class="up-head"></div>
      <div class="up-headline">
        <ul class="up-headline-l">
          <li class="up-headline-bun">{{ roomInfo.categoryName}}</li>
          <li>{{ roomInfo.title }}</li>
        </ul>

        <ul class="up-headline-r">
          <li>
            <a href>
              <EyeOutlined />
              &nbsp;{{ roomInfo.roomPeopleNum }}人
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
          <li class="up-lv-class">up {{ hostInfo.hostGrade }}</li>
          <li>{{ hostInfo.nickname }}</li>
          <li>
            <StarTwoTone twoToneColor="#eb2f96" />
            &nbsp;{{ hostInfo.subscribeNum }} 万
          </li>
          <li>
            <FundTwoTone twoToneColor="green" />
            &nbsp; No. {{ hostInfo.ranked }}
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
import { useRouter } from 'vue-router';
export default {
  name: 'WebLiveViewer',
  components: {
    WarningOutlined,
    EyeOutlined,
    ShareAltOutlined,
    StarTwoTone,
    FundTwoTone
  },
  data() {
    return {
      roomInfo: [],
      hostInfo: []
    };
  },
  methods: {
    getRoomInfo() {
      let params = this.$route.query.roomNo;
      this.$get(this.API.GET_ROOM_INFO, params).then(res => {
        let arr = res.data.data;
        if (arr.length) {
          for (let i = 0; i < 2; i++) {
            if (arr[i].roomNo === params) {
              this.roomInfo = arr[i];
            }
          }
        }
      });
    },
    getHostInfo() {
      // let params = this.$route.query.id;
      let params = 'bbb';
      this.$get(this.API.GET_HOST_INFO, params).then(res => {
        let arr = res.data.data;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === params) {
            this.hostInfo = arr[i];
          }
        }
      });
    }
  },
  mounted() {
    this.getRoomInfo();
    this.getHostInfo();
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