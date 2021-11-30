<template>
  <div class="goods-item" @click="goodsClick">
    <van-image class="goods-img" :src="showGoods" lazy-load />
    <div class="goods-info">
      <p>{{ goods.title }}</p>
      <span class="price">￥{{ goods.price }}</span>
      <span class="collect">
        <img src="~assets/img/common/collect.svg" alt="" />
        {{goods.cfav}}
        </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodsListItem',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    showGoods() {
      return this.goods.img || this.goods.image || this.goods.show.img
    },
  },
  methods: {
    goodsClick() {
      this.$router.push('/detail/' + this.goods.iid);
    }
  }
}
</script>
<style lang="less" scoped>
.goods-item {
  position: relative;
  padding-bottom: 40px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
  overflow: hidden;
}
.goods-info p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect img{
  width: 13px;
}
</style>
