export default {
  //这个是计算数组内部有多少个对象，也就是购物车中总共有多少个商品，显示在标题栏购物车后的括号里
  cartLength(state) {
    return state.cartList.length
  },
  //原封不动的返回cartList
  cartList(state) {
    return state.cartList
  }
}