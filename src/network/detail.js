import {request} from './request' //引入axios实例

//请求详情页数据
export function getDetail(iid){
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
//请求推荐数据
export function getRecommend(){
  return request({
    url: '/recommend'
  })
}
//整合杂乱的商品数据
export class Goods {
  constructor(itemInfo, columns, services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
//整合商品参数数据
export class GoodsParam {
  constructor(info, rule){
    //images可能没有值 有就获取 没有就为空
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}
//整合商家数据
export class Shop {
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}