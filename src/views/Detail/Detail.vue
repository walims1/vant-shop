<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <van-nav-bar fixed placeholder :border="false">
      <van-icon name="revoke" size="25px" slot="left" @click="backClick" />
      <van-search
        v-model="value"
        placeholder="点击搜索商品"
        shape="round"
        slot="left"
      />
      <van-icon
        class="share"
        size="25px"
        name="share-o"
        slot="right"
        @click="showShare = true"
      />
      <van-icon name="more-o" size="25px" slot="right" dot />
    </van-nav-bar>
    <!-- 分享面板 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
    <!-- 底部商品导航 -->
    <van-goods-action class="goods-action">
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon color="#ee0a24" v-if="isStar" icon="star" text="已收藏" @click="isItStar"/>
      <van-goods-action-icon v-else icon="star-o" text="收藏" @click="isItStar" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addToCart"/>
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <!-- 内容导航 -->
    <van-tabs v-model="active" scrollspy sticky offset-top="45px">
      <van-tab title="商品">
        <goods
          :topImages="topImages"
          :goods="goods"
          :shop="shop"
          :detailInfo="detailInfo"
        />
      </van-tab>
      <van-tab title="参数">
        <params :paramInfo="paramInfo" />
      </van-tab>
      <van-tab title="评论">
        <comment :commentInfo="commentInfo" />
      </van-tab>
      <van-tab title="推荐">
        <goods-list :goods="goodsRecommend" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Goods from './childComps/Goods'
import Params from './childComps/Params'
import Comment from './childComps/Comment'

import GoodsList from 'components/contest/goods/GoodsList.vue'

import { mapActions } from 'vuex'

import { Toast } from 'vant';

export default {
  name: 'Detail',
  components: {
    Goods,
    Params,
    Comment,
    GoodsList,
  },
  data() {
    return {
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      skuInfo: {},
      goodsRecommend: [],
      iid: null,
      value: '',
      showShare: false,
      active: 0,
      isStar: false
    }
  },
  created() {
    //从路由中拿到iid并保存
    this.iid = this.$route.params.iid
    //根据iid请求详情数据
    this._getDetail(this.iid)
    //请求推荐商品数据
    this._getRecommend()
  },
  methods: {
    /*
      映射vuex
    */
    ...mapActions(['addCart']),
    /*
    事件监听代码
    */
    backClick() {
      this.$router.go(-1)
    },
    //加入购物车
    addToCart() {
      //先存储一下需要在购物车使用的数据
      const cartInfo = {}
      cartInfo.logo = this.topImages[0]  //商品图片
      cartInfo.title = this.goods.title   //商品标题
      cartInfo.desc = this.goods.desc  //商品介绍
      cartInfo.price = this.goods.realPrice  //商品价格
      cartInfo.iid = this.iid  //该商品的iid
      //触发vuex的actions,并弹窗
      this.addCart(cartInfo).then(res => {
        Toast(res);
      })
    },
    isItStar(){
      this.isStar = !this.isStar
      if(this.isStar) {
        Toast.success('收藏成功！')
      }else{
        Toast.success('取消收藏！')
      }
    },
    /*
    数据请求代码
    */
    //请求详情数据
    _getDetail(iid) {
      this.$api.detail.getDetail(iid).then((res) => {
        const data = res.result
        // console.log(res)
        //1.保存轮播图数据
        this.topImages = data.itemInfo.topImages
        // console.log(this.topImages);
        //2.获取商品信息
        this.goods = new this.$api.detail.Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        )
        //3.获取店铺信息
        this.shop = new this.$api.detail.Shop(data.shopInfo)
        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo
        //5.保存参数数据
        this.paramInfo = new this.$api.detail.GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        )
        //6.保存商品评论数据（不是所有商品都有评论 先判断）
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        //7.保存商品规格数据
        this.skuInfo = data.skuInfo
        // console.log(this.skuInfo)
      })
    },
    //请求推荐数据
    _getRecommend() {
      this.$api.detail.getRecommend().then((res) => {
        this.goodsRecommend = res.data.list
      })
    },
  },
}
</script>
<style lang="less" scoped>
#detail {
  background-color: rgb(250, 248, 248);
}
.share {
  margin-right: 20px;
}
.abc {
  height: 500px;
  width: 100%;
}
.goods-action {
  z-index: 999;
}
</style>
