<template>
  <UserTop />
  <UserNav />
  <UserContent />
  <UserData />
</template>

<script>
import UserTop from '../components/webUser/userTop.vue';
import UserNav from '../components/webUser/userNav.vue';
import UserContent from '../components/webUser/userContent.vue';
import UserData from '../components/webUser/userData.vue';

export default {
  components: {
    UserTop,
    UserNav,
    UserContent,
    UserData
  }
};
</script>

<style scoped>
</style>