<template>
  <div>
    <p>子：好的爸爸，这是我收到的东西：{{ shop }}</p>
    <h1>【case2】子传父</h1>
    <p>子：爸爸我没钱了</p>
    <button @click="moneyClick">伸手要钱</button>
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: ['shop'],
  setup(props, { emit }) {
    const moneyClick = () => {
      // 触发父组件中的方法，方法名要与父组件中的监听事件名一样
      emit('giveClick', '1000');
    };
    return {
      moneyClick
    };
  }
};
</script>