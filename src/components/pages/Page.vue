<template>
  <div class="page">
    <div class="page-container">
      <router-view></router-view>
    </div>
    <!-- <Player/> -->
  </div>
</template>

<script>
// import Player from '../components/Player.vue'
export default {
  name: 'Page',
  components: {
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.page {
  overflow-x: hidden;
  width: 100%;
  margin-top: 90px;
  display: flex;
  justify-content: center;
  background: $cream;
}
.page-container {
  min-width: 500px;
  width: 70%;
}
</style>
