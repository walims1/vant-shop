<template>
  <div class="cartList">
    <van-swipe-cell>
      <div class="checked">
        <van-checkbox :name="cartList" />
      </div>
      <div class="goods">
        <van-card
          lazy-load
          class="goods-card"
          :num="cartList.count"
          :price="sumPrice"
          :desc="cartList.desc"
          :title="cartList.title"
          :thumb="cartList.logo"
          @click-thumb="logoClick"
        >
          <template #footer>
            <!-- <van-checkbox :name="cartList" /> -->
            <van-button
              round
              :disabled="cartList.count == 1"
              size="mini"
              @click="subCount()"
              >-</van-button
            >
            <van-button round size="mini" @click="addCount()"
              >+</van-button
            >
          </template>
        </van-card>
      </div>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="delToCart()"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { ADD_COUNTER, SUB_COUNTER } from 'store/mutations-type'
import { mapActions } from 'vuex'

export default {
  name: 'CartList',
  props: {
    cartList: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    sumPrice() {
      return (this.cartList.price * this.cartList.count).toFixed(2)
    },
  },
  methods: {
    ...mapActions(['delCart']),
    delToCart() {
      this.$emit('delToCart')
      // this.delCart(this.cartList)
    },
    subCount(index) {
      // console.log(index);
      this.$store.commit(SUB_COUNTER, this.cartList)
    },
    addCount(index) {
      this.$store.commit(ADD_COUNTER, this.cartList)
      // console.log(index);
    },
    logoClick() {
      this.$router.push('/detail/' + this.cartList.iid)
    },
  },
}
</script>

<style lang="less" scoped>
.checked {
  position: relative;
  z-index: 999;
  top: 60px;
  left: 10px;
}
.goods-card {
  display: block;
  margin-left: 25px;
  background-color: white;
}
.delete-button {
  height: 100%;
}
/deep/ .van-button--mini {
  width: 20px;
  height: 20px;
}
</style>
