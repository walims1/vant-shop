<template>
  <div class="goods">
    <!-- 轮播图部分 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      lazy-load
    >
      <van-swipe-item v-for="img in topImages">
        <van-image :src="img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 商品价格及标题部分 -->
    <van-cell-group
      inset
      class="goodsInfo"
      v-if="Object.keys(goods).length !== 0"
    >
      <!-- 上边价格区域 -->
      <van-cell :border="false">
        <template #title>
          <span class="new-price">{{ goods.newPrice }}</span>
          <span class="old-price">{{ goods.oldPrice }}</span>
          <van-tag
            type="primary"
            :color="goods.discountBgColor"
            size="medium"
            >{{ goods.discount }}</van-tag
          >
        </template>
      </van-cell>
      <!-- 下边描述区域 -->
      <van-cell>
        <template #title>
          <span class="goods-title">{{ goods.title }}</span>
          <van-grid :border="false" column-num="3" class="goods-text">
            <van-grid-item v-for="item in goods.columns" :text="item" />
          </van-grid>
          <!-- <div></div> -->
          <van-grid :column-num="5" direction="horizontal" square>
            <van-grid-item v-for="value in goods.services" :text="value.name" />
          </van-grid>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 店铺信息 -->
    <van-cell-group inset class="goods-store">
      <!-- 店铺名部分 -->
      <van-cell>
        <template #title>
          <van-row type="flex">
            <van-col span="4">
              <van-image
                class="shop-photo"
                :src="shop.logo"
                round
                width="45px"
                lazy-load
              />
            </van-col>
            <van-col span="16" class="shop-name">
              {{ shop.name }}
            </van-col>
          </van-row>
          <!-- 评价部分 -->
          <van-cell class="shop-eval">
            <template #title>
              <van-row>
                <van-col span="12" class="shop-num">
                  <!-- 总销量 -->
                  <van-col span="12" class="sell">
                    <van-row class="number">
                      {{ shop.sells | showSell }}
                    </van-row>
                    <van-row> 总销量 </van-row>
                  </van-col>
                  <!-- 全部宝贝 -->
                  <van-col span="12">
                    <van-row class="number">
                      {{ shop.goodsCount }}
                    </van-row>
                    <van-row> 全部宝贝 </van-row>
                  </van-col>
                </van-col>
                <!-- 评分部分 -->
                <van-col span="12" class="shop-score">
                  <van-row v-for="item in shop.score">
                    <van-col span="12">{{ item.name }}</van-col>
                    <van-col span="6">{{ item.score }}</van-col>
                    <van-col span="6">{{
                      item.isBetter ? '高' : '低'
                    }}</van-col>
                  </van-row>
                </van-col>
              </van-row>
            </template>
          </van-cell>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 穿着效果 -->
    <div v-for="(item, index) in detailInfo.detailImage">
      <van-image v-for="(img, index) in item.list" :src="img" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'goods',
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      },
    },
    goods: {
      type: Object,
      default() {
        return {}
      },
    },
    shop: {
      type: Object,
      default() {
        return {}
      },
    },
    detailInfo: {
      type: Object,
      default() {
        return
      },
    },
  },
  filters: {
    showSell(value) {
      if (value < 10000) {
        return value + '万'
      } else {
        return (value / 10000).toFixed(1) + '万'
      }
    },
  },
}
</script>
<style lang="less" scoped>
/deep/ .my-swipe .van-swipe-item {
  height: 300px;
}
.goodsInfo {
  margin: 10px;
  .new-price {
    color: orangered;
    font-size: 25px;
    margin-right: 10px;
  }
  .old-price {
    color: rgb(174, 175, 175);
    text-decoration: line-through;
    margin-right: 15px;
  }
  .goods-title {
    font-size: 14px;
  }
  .goods-text {
    /deep/ .van-grid-item__text {
      font-size: 14px;
    }
    /deep/ .van-grid-item__content {
      padding: 8px;
    }
  }
}
.goods-store {
  margin: 10px;
  display: flex;
  align-items: center;
  padding-top: 10px;
  .shop-photo {
    flex: 1;
    border: 1px solid rgb(143, 138, 138);
  }
  .shop-name {
    line-height: 50px;
    color: rgb(83, 83, 87);
    font-size: 15px;
  }
  .shop-eval {
    text-align: center;
    .shop-num {
      padding-right: 25px;
      padding-top: 10px;
      .number {
        font-size: 20px;
        margin-bottom: 5px;
      }
    }
    .shop-score {
      border-left: 1px solid rgb(168, 163, 163);
      padding-left: 20px;
    }
  }
}
</style>
