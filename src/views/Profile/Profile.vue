<template>
  <div id="profile">
    <!-- 顶部导航栏 -->
    <van-nav-bar fixed placeholder :border="false">
      <van-icon name="scan" size="25px" slot="left" />
      <van-icon name="friends-o" size="25px" slot="right"/>
      <van-icon class="envelop" name="envelop-o" size="25px" slot="right" dot />
      <van-icon name="setting-o" size="25px" slot="right" />
    </van-nav-bar>
    <!-- 头像信息部分 -->
    <user/>
    <!-- 具体信息部分 -->
    <property/>
    <!-- 钱包部分 -->
    <money/>
  </div>
</template>
<script>
import User from './childComps/User.vue'
import Property from './childComps/Property.vue'
import Money from './childComps/Money'
export default {
  name: 'Profile',
  components: {
    User,
    Property,
    Money,
  }
}
</script>

<style lang="less" scoped>
.envelop {
  margin:0 25px;
}
</style>
