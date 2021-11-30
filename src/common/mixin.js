import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    };
  },
  mounted(){
    //1.监听图片加载完成的事件
    this.refresh = debounce(this.$refs.scroll.refresh, 100)
    //2.保存监听的事件
    this.itemImgListener =  () => {
     this.refresh() //防抖操作之后
    }
    this.$bus.$on('imageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    };
  },
  components: {
    BackTop
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > 1000
    },
  }
}