<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :offset="1"
    :immediate-check="false"
  >
    <van-grid :border="false" :column-num="2" class="item">
      <van-grid-item v-for="item in goods">
        <goods-list-item :goods="item" />
      </van-grid-item>
    </van-grid>
  </van-list>
</template>
<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name: 'GoodsList',
  components: {
    GoodsListItem,
  },
  data() {
    return {
      finished: false,
      loading: false,
    }
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    onLoad() {
      this.$emit('goodsLoad')
      this.loading = false
    },
  },
}
</script>
<style lang="less" scoped>
/deep/ .van-grid-item__content {
  padding: 8px;
}
</style>
