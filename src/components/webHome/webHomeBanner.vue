<template>
  <div class="toutu">
    <a-carousel class="datu" autoplay>
      <div>
        <img src="@/assets/img/lunbo/lunbo1.jpeg" alt="1" />
      </div>
      <div>
        <img src="@/assets/img/lunbo/lunbo2.webp" alt="2" />
      </div>
      <div>
        <img src="@/assets/img/lunbo/lunbo3.webp" alt="3" />
      </div>
      <div>
        <img src="@/assets/img/lunbo/lunbo4.webp" alt="4" />
      </div>
    </a-carousel>
  </div>
</template>

<script>
export default {
  name: 'WebHomeBanner',
  components: {}
};
</script>

<style scoped>
.toutu {
  padding: 15px 0;
  height: 550px;
  background: url(@/assets/img/lunbo/toutubj.jpeg);
  background-size: 100% 100%;
  /* background: #ad2521; */
}
.datu img {
  margin: 0 160px;
  height: 520px;
  width: 1120px;
  border-radius: 10px;
  /* color: '#fff';
  text-align: 'center';
  background: pink; */
}

.toutu /deep/ .ant-carousel .slick-dots li button {
  height: 10px;
}

.toutu /deep/ .ant-carousel .slick-dots {
  height: 15px;
}
</style>