<template>
  <div class="user">
    <div class="avatar">
      <van-image
        round
        width="80px"
        height="80px"
        :src="require('assets/img/profile/avatar.svg')"
      />
    </div>
    <div class="user-info">
      <span>登录/注册</span>
      <van-icon name="arrow" />
    </div>
    <div class="sign">
      <van-button icon="completed" color="rgb(231, 223, 223)" round size="small" @click="signClick"
        >每日签到</van-button
      >
      <!-- 纯手写 -->
      <!-- <div class="sign-in"></div>
      <van-icon name="completed" />
      <span>每日签到</span> -->
    </div>
  </div>
</template>
<script>
import {Toast} from 'vant'
export default {
  name: 'User',
  data() {
    return {
      
    };
  },
  methods: {
    signClick() {
      Toast.success('签到成功')
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  height: 94px;
  line-height: 94px;
  padding-left: 20px;
  border-bottom: 8px solid rgb(245, 243, 242);
  display: flex;
  .avatar {
    padding-top: 10px;
  }
  .user-info {
    flex: 1;
    font-size: 20px;
    color: rgb(87, 85, 85);
    padding-left: 10px;
  }
  .sign {
    margin-right: 20px;
    /deep/ .van-button__text,.van-icon:before  {
      color: black;
    }
  }
  // .sign { 纯手写签到按钮
  //   font-size: 14px;
  //   margin-right: 20px;
  //   position: relative;
  //   .sign-in {
  //     position: absolute;
  //     border-radius: 5px;
  //     background-color: rgb(231, 223, 223);
  //     height: 30px;
  //     width: 80px;
  //     top: 34%;
  //     right: 49%;
  //     transform: translate(50%);
  //     z-index: -1;
  //   }
  // }
}
</style>
