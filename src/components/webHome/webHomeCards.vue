<template>
  <div class="cards">
    <h1>推荐直播</h1>
    <a-card v-for="item in hotLive" :key="item.roomNo" hoverable class="single-card">
      <template #cover>
        <img alt="example" :src="item.cover" />
      </template>
      <a-card-meta :title="item.title">
        <template #description>{{ item.nickname }}</template>
      </a-card-meta>
    </a-card>
    <a-card hoverable class="single-card">
      <template #cover>
        <img alt="example" src="@/assets/img/cards/card1.webp" />
      </template>
      <a-card-meta title="欠B站好多币！55">
        <template #description>Queen晴</template>
      </a-card-meta>
    </a-card>
    <a-card hoverable class="single-card">
      <template #cover>
        <img alt="example" src="@/assets/img/cards/card2.webp" />
      </template>
      <a-card-meta title="恋爱天花板">
        <template #description>妮宝儿U</template>
      </a-card-meta>
    </a-card>
    <a-card hoverable class="single-card">
      <template #cover>
        <img alt="example" src="@/assets/img/cards/card3.webp" />
      </template>
      <a-card-meta title="【死亡细胞】谁说手指烫伤的不算英雄">
        <template #description>龙胆千锤百炼</template>
      </a-card-meta>
    </a-card>
    <a-card hoverable class="single-card">
      <template #cover>
        <img alt="example" src="@/assets/img/cards/card4.webp" />
      </template>
      <a-card-meta title="3D双设备 甜音清流 还能磕头">
        <template #description>梦梦Sweet</template>
      </a-card-meta>
    </a-card>
    <a-card hoverable class="single-card">
      <template #cover>
        <img alt="example" src="@/assets/img/cards/card5.webp" />
      </template>
      <a-card-meta title="上五五贼船啦～">
        <template #description>把五五往怀里</template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'WebHomeCards',
  data() {
    return {
      hotLive: []
    };
  },
  methods: {
    getHotLiveList() {
      this.$get(this.API.GET_HOT_LIVE).then(res => {
        let arr = res.data.data;
        if (arr.length > 0) {
          this.hotLive = arr;
        }
        // console.log('hot', this.hotLive[1].nickname);
      });
    }
  },
  mounted() {
    this.getHotLiveList();
  }
};
</script>

<style scoped>
.cards {
  padding: 15px 0;
  margin: 0 160px;
}

.single-card {
  float: left;
  /* margin: 5px 5px; */
  width: 223px;
  height: 220px;
}
.ant-card-hoverable {
  cursor: pointer;
  /* transition: box-shadow 0.3s, border-color #fff; */
}
.ant-card-bordered {
  border: 10px solid #eff2f5;
}
</style>