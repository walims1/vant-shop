import { ADD_COUNTER, ADD_TO_CART } from './mutations-type'
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //判断该对象是否已经存在，判断方式还是比较多的，这里使用的是一个数组的find方法，这个方法待会儿讲
      let oldProduct = context.state.cartList.find(
        (item) => item.iid == payload.iid
      )
      //如果有，提交增加数量的mutations，注意这里传的是oldProduct，为什么？待会儿讲了find方法就明白了
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量加一')
      } else {
        //否则提交新增商品的mutations，注意是在这个为其加了一个count为1，也就是mutations中增加数量时改变的count
        payload.count = 1 //这样的好处是根据情况判断，要加到购物车的才有这个属性，别的就没有，比较节约资源
        context.commit(ADD_TO_CART, payload)
        resolve('加入购物车成功')
      }
    })
  },
}
