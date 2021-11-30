import {
  ADD_COUNTER,
  ADD_TO_CART,
  SUB_COUNTER,
  DEL_TO_CART,
} from './mutations-type'
export default {
  //当商品已经存在，商品数量加一
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  //商品数量减一
  [SUB_COUNTER](state, payload) {
    payload.count--
  },
  //当商品不存在时，将商品加入到数组
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },
  //删除商品
  [DEL_TO_CART](state, payload) {
    state.cartList.splice(payload,1)
  }
}
