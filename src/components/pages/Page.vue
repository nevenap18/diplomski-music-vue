<template>
  <div class="page">
    <top-header />
    <div class="page-container">
      <router-view></router-view>
    </div>
    <!-- <Player/> -->
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader.vue'
export default {
  name: 'Page',
  components: {
    TopHeader
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.page {
  overflow-x: hidden;
  width: 100%;
  padding-left: 50px;
  background: $background;
}
.page-container {
  min-width: 500px;
  width: 92%;
  padding-bottom: 130px;
}
</style>
