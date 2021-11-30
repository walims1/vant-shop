<template>
  <div class="money">
    <van-cell  v-for="item in moneyInfo" :title="item.title" :value="item.value" />
  </div>
</template>
<script>
export default {
  name: 'Money',
  data() {
    return {
      moneyInfo: [
        {title: '余额',value: '￥0.00'},
        {title: '优惠券',value: '0'},
        {title: '津贴',value: '￥0.00'},
      ],
    };
  },
}
</script>
<style lang="less" scoped>
</style>
