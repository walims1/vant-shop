<template>
  <div class="Property">
    <div class="shopping">
      <van-grid :column-num="3">
        <van-grid-item v-for="item in shoppingInfo">
          <van-cell :title="item.title" :value="item.value" />
        </van-grid-item>
      </van-grid>
    </div>
    <div class="purchase">
      <van-cell center title="购买" value="0" is-link :border="false" />
      <van-grid :border="false" :column-num="5">
        <van-grid-item
          v-for="item in purchaseIndo"
          :icon="item.icon"
          :text="item.text"
        />
      </van-grid>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Property',
  data() {
    return {
      shoppingInfo: [
        { title: '收藏', value: 0 },
        { title: '足迹', value: 0 },
        { title: '订阅', value: 0 },
      ],
      purchaseIndo: [
        { icon: 'credit-pay', text: '待付款' },
        { icon: 'sign', text: '待发货' },
        { icon: 'logistics', text: '待收货' },
        { icon: 'chat-o', text: '待评价' },
        { icon: 'after-sale', text: '退款售后' },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
// /deep/ .van-grid-item__content {
//   padding: 8px;
// }
.Property {
  border-bottom: 8px solid rgb(245, 243, 242);
}
</style>
