<template>
  <div>
    <WebHomeBanner />
    <WebHomeCards />
  </div>
</template>

<script>
import WebHomeBanner from '../components/webHome/webHomeBanner.vue';
import WebHomeCards from '../components/webHome/webHomeCards.vue';

export default {
  components: {
    WebHomeBanner,
    WebHomeCards
  }
};
</script>
<style scoped>
</style>;
