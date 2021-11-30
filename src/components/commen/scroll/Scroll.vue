<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from '@better-scroll/observe-image'
// import Pullup from '@better-scroll/pull-up' //不建议安装 会与监测滚动冲突

BScroll.use(ObserveDOM)
BScroll.use(ObserveImage)
// BScroll.use(Pullup)

export default ({
  name: 'Scroll',
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //创建bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true,
      // observeImage: true,
      pullUpLoad: this.pullUpLoad,
      probeType: this.probeType
    })

    //监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3) { //先判断有没有在监听 更严谨 节省性能
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position);
      })
    }
    //监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      })
    }
  },
  methods: {
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
})
</script>
<style scoped>

</style>