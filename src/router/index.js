import Vue from 'vue'
import Router from 'vue-router'

import Home from 'views/Home/Home'
import Category from 'views/Category/Category'
import Cart from 'views/Cart/Cart'
import Profile from 'views/Profile/Profile'
import Detail from 'views/Detail/Detail'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页',
      // keepAlive: true
      homeScrollTop: 0,
    },
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类',
      // keepAlive: true
      asideScrollTop: 0,
      mainScrollTop: 0
    },
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车',
      cartScrollTop: 0
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '个人主页',
    },
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      title: '商品详情',
      star: false
    },
  },
]

const router = new Router({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  //不同页面不同网页标题
  // window.document.title = to.matched[0].meta.title //有嵌套路由
  window.document.title = to.meta.title //没有嵌套路由
  //记录页面滚动位置
  const $home = document.querySelector('#home')
  const $aside = document.querySelector('#category-aside')
  const $main = document.querySelector('#category-main')
  const $cart = document.querySelector('#cart')
  const homeScrollTop = $home ? $home.scrollTop : 0
  const asideScrollTop = $aside ? $aside.scrollTop : 0
  const mainScrollTop = $main ? $main.scrollTop : 0
  const cartScrollTop = $cart ? $cart.scrollTop : 0
  from.meta.homeScrollTop = homeScrollTop
  from.meta.asideScrollTop = asideScrollTop
  from.meta.mainScrollTop = mainScrollTop
  from.meta.cartScrollTop = cartScrollTop
  next()
})

export default router
