<template>
  <div>
    <h1>【case1】父传子</h1>
    <p>父：好大儿，去帮为父买几个东西吧，东西通过 props 传给你了</p>
    <!-- :传递到子组件的数据名="需要传递的数据" -->
    <Child :shop="shopList" @giveClick="giveMoney" />
    <p>父：给给给，一共 {{ number }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import Child from './child.vue';
export default {
  name: 'Father',
  components: {
    Child
  },
  setup() {
    const shopList = '三包烟, 两瓶啤酒, 一斤花生米';
    let number = ref();
    const giveMoney = msg => {
      console.log(msg);
      number.value = msg;
      console.log(number);
    };
    return {
      shopList,
      giveMoney,
      number
    };
  }
};
</script>