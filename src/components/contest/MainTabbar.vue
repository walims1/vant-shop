<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/profile" icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: "MainTabbar",
  data() {
    return {
      active: 0,
    }
  },
}
</script>
<style lang="less" scoped>
  
</style>
