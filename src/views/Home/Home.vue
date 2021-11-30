<template>
  <div id="home" ref="home">
    <!-- 顶部导航 -->
    <!-- <van-nav-bar class="navBar" title="首页" fixed placeholder /> -->
    <!-- 回到顶部按钮 -->
    <el-backtop target="#home" :bottom="60" :right="15"> </el-backtop>
    <!-- 搜索 -->
    <van-search
      class="search"
      v-model="value"
      placeholder="请输入搜索关键词"
      input-align="center"
    />
    <!-- <scroll class="content"> -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in banner">
          <a :href="item.link">
            <van-image :src="item.image" lazy-load :radius="5" />
          </a>
        </van-swipe-item>
      </van-swipe>
      <!-- 推荐信息 -->
      <van-grid class="recommend" square :icon-size="50" :border="false">
        <van-grid-item
          v-for="item in recommend"
          :icon="item.image"
          :text="item.title"
          :url="item.link"
        />
      </van-grid>
      <!-- 商品类别 -->
      <van-tabs
        v-model="active"
        @change="tabChange"
        color="skyblue"
        sticky
        :offset-top="45"
      >
        <van-tab v-for="item in titles" :title="item">
          <goods-list :goods="homeGoods" @goodsLoad="goodsLoad" />
        </van-tab>
      </van-tabs>
    </van-pull-refresh>

    <!-- </scroll> -->
  </div>
</template>
<script>
import Scroll from 'components/commen/scroll/Scroll.vue'
import GoodsList from 'components/contest/goods/GoodsList.vue'
export default {
  name: 'Home',
  components: {
    Scroll,
    GoodsList,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      titles: ['流行', '新品', '精选'],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] },
      },
      active: 0,
      value: '',
      currentType: 'pop',
      isLoading: false,
      // scroll: 0,
    }
  },
  created() {
    //请求轮播图和推荐数据
    this._getHomeMultidata()
    //请求商品数据
    this._getHomeGoods('pop')
    this._getHomeGoods('new')
    this._getHomeGoods('sell')
  },
  activated() {
    const homeScrollTop = this.$route.meta.homeScrollTop
    const $home = document.querySelector('#home')
    if (homeScrollTop && $home) {
      $home.scrollTop = homeScrollTop
    }
  },
  computed: {
    homeGoods() {
      return this.goods[this.currentType].list
    },
  },
  methods: {
    /*
    事件监听
    */
    onRefresh() {
      setTimeout(() => {
        this.homeGoods.sort(() => {
          return 0.5 - Math.random()
        })
        this.isLoading = false
      }, 1000)
    },
    goodsLoad() {
      this._getHomeGoods(this.currentType)
    },
    tabChange() {
      switch (this.active) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    /*
    数据请求代码
    */
    //请求轮播图和推荐数据
    _getHomeMultidata() {
      this.$api.home.getHomeMultidata().then((res) => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    _getHomeGoods(type) {
      const page = this.goods[type].page
      this.$api.home.getHomeGoods(type, page).then((res) => {
        const newList = res.data.list
        this.goods[type].list.push(...newList)
        this.goods[type].page += 1
      })
    },
  },
}
</script>

<style lang="less" scoped>
#home {
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
}
/deep/ .van-grid-item__text {
  font-size: 13px;
}
.search {
  position: fixed;
  // top: 45px;
  width: 100%;
  z-index: 9;
}
.my-swipe {
  margin: 0 8px;
  margin-top: 54px;
}
::-webkit-scrollbar {
  display: none;
}
// .content {
//   overflow: hidden;
//   height: calc(100% - 147px);
//   margin-bottom: 100px;
// }
</style>
