<template>
  <div id="category">
    <!-- <van-nav-bar title="商品分类" fixed placeholder/> -->
    <!-- 顶部搜索框 -->
    <el-container>
      <el-header height="50px">
        <van-search v-model="value" placeholder="请输入搜索关键词" />
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside id="category-aside" width="80px">
          <van-sidebar v-model="activeKey" @change="onChange">
            <van-sidebar-item
              v-for="list in categoryList"
              :title="list.title"
            />
          </van-sidebar>
        </el-aside>
        <!-- 主体列表 -->
        <el-main id="category-main">
          <!-- 分类列表 -->
          <van-grid :column-num="3" :icon-size="40" square>
            <van-grid-item
              v-for="info in categoryInfo"
              :icon="info.image"
              :text="info.title"
              :url="info.link"
            />
          </van-grid>
          <!-- 商品详情 -->
          <van-tabs v-model="active" color="skyblue" @change="tabChange">
            <van-tab v-for="item in titles" :title="item">
              <goods-list :goods="categoryDetail[currentType]" />
            </van-tab>
          </van-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import GoodsList from 'components/contest/goods/GoodsList.vue'

export default {
  name: 'Category',
  components: {
    GoodsList,
  },
  data() {
    return {
      categoryList: [],
      categoryInfo: [],
      categoryDetail: {
        pop: [],
        new: [],
        sell: [],
      },
      titles: ['流行', '新品', '精选'],
      value: '',
      activeKey: 0,
      active: 0,
      currentType: 'pop',
    }
  },
  created() {
    //请求分类列表
    this._getCategory()
  },
  activated() {
    const asideScrollTop = this.$route.meta.asideScrollTop
    const mainScrollTop = this.$route.meta.mainScrollTop
    const $aside = document.querySelector('#category-aside')
    const $main = document.querySelector('#category-main')
    if (asideScrollTop && $aside) {
      $aside.scrollTop = asideScrollTop
    }
    if (mainScrollTop && $main) {
      $main.scrollTop = mainScrollTop
    }
  },
  methods: {
    /*
    事件监听
    */
    onChange(index) {
      this._getSubcategory(index)
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
    数据请求
    */
    //请求分类列表
    _getCategory() {
      this.$api.category.getCategory().then((res) => {
        this.categoryList = res.data.category.list
        this._getSubcategory(0)
      })
    },
    //请求分类内容
    _getSubcategory(index) {
      const maitKey = this.categoryList[index].maitKey
      this.$api.category.getSubcategory(maitKey).then((res) => {
        this.categoryInfo = res.data.list
        const miniWallkey = this.categoryList[index].miniWallkey
        this._getCategoryDetail(miniWallkey, 'pop')
        this._getCategoryDetail(miniWallkey, 'new')
        this._getCategoryDetail(miniWallkey, 'sell')
      })
    },
    _getCategoryDetail(miniWallKey, type) {
      this.$api.category.getCategoryDetail(miniWallKey, type).then((res) => {
        this.categoryDetail[type] = res
      })
    },
  },
}
</script>

<style lang="less" scoped>
#category {
  /deep/ .el-header {
    padding: 0;
  }
  .el-aside {
    height: calc(100% - 100px);
    position: absolute;
  }
  .el-main {
    height: calc(100% - 100px);
    position: absolute;
    left: 80px;
  }
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
