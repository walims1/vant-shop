<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tabbar />
  </div>
</template>
<script>
import mainTabbar from 'components/contest/MainTabbar'

export default {
  name: 'App',
  components: {
    mainTabbar,
  },
}
</script>

<style></style>
