<template>
  <div id="cart">
    <!-- 顶部导航栏 -->
    <van-nav-bar right-text="滑动管理" fixed placeholder>
      <div slot="title">购物车（{{ cartLength }}）</div>
    </van-nav-bar>
    <!-- 底部提交订单栏 -->
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      class="subBar"
      @submit="submit"
    >
      <van-checkbox v-model="isSellectAll" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
    <!-- 空状态提示符 -->
    <van-empty
      :image="require('assets/img/cart/cartempty.svg')"
      description="购物车为空"
      v-if="this.cartLength == 0"
    >
      <van-button round type="danger" class="bottom-button" @click="goShopping">去购物</van-button>
    </van-empty>
    <!-- 商品卡片 -->
    <div class="cart-list">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <cart-list
          v-for="(item, index) in cartList"
          :cartList="item"
          @delToCart="delToCart(index)"
        />
      </van-checkbox-group>
    </div>
  </div>
</template>
<script>
import cartList from './childComps/CartList.vue'
import { DEL_TO_CART } from 'store/mutations-type'
import { mapGetters } from 'vuex'
import { Toast } from 'vant';

export default {
  name: 'Cart',
  components: {
    cartList,
  },
  data() {
    return {
      result: [],
    }
  },
  computed: {
    ...mapGetters(['cartLength', 'cartList']),
    isSellectAll: {
      get() {
        if (this.cartLength == this.result.length && this.result.length != 0) {
          return true
        } else {
          return false
        }
      },
      set(newVal) {
        return newVal
      },
    },
    totalPrice() {
      let totalPrice = 0
      for (let i = 0; i < this.result.length; i++) {
        totalPrice += this.result[i].count * this.result[i].price
      }
      return totalPrice * 100
    },
  },
  activated() {
    const cartScrollTop = this.$route.meta.cartScrollTop
    const $cart = document.querySelector('#cart')
    if(cartScrollTop && $cart){
      $cart.scrollTop = cartScrollTop
    }
  },
  methods: {
    btnClick() {
      console.log(this.cartList)
    },
    delToCart(index) {
      this.$store.commit(DEL_TO_CART, index)
    },
    checkAll() {
      if (!this.isSellectAll) {
        this.$refs.checkboxGroup.toggleAll(true)
      } else {
        this.$refs.checkboxGroup.toggleAll(false)
      }
    },
    submit() {        
      if (this.result.length != 0) {
        Toast.success('提交订单成功')
        this.$refs.checkboxGroup.toggleAll(false)
      }else {
        Toast.fail('请选择商品')
      }
    },
    goShopping() {
      this.$router.push('/home')
    }
  },
}
</script>

<style lang="less" scoped>
#cart {
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
}
/deep/ .van-nav-bar__title {
  font-size: 17px;
}
/deep/ .van-nav-bar__right {
  .van-nav-bar__text {
    color: #ccc;
  }
}
/deep/ .van-empty {
  padding-top: 80px;
}
/deep/ .van-empty__description {
  font-size: 20px;
}
.subBar {
  margin-bottom: 50px;
}
.cart-list {
  padding-bottom: 100px;
}
::-webkit-scrollbar {
  display: none;
}
</style>
