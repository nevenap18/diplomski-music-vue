<template>
  <div class="mobile-page">
    <div class="title"><h1>This app is not supported on handheld devices.</h1></div>
  </div>
</template>

<script>
export default {
  name: 'Mobile'
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.mobile-page {
  width: 100vw;
  height: 100vh;
  background: $background;
}
.title {
  margin: 30px 10px;
  color: $color-normal;
  background: $background;
  font: $font-regular-bold;
  line-height: 1;
  display: inline-block;
}
</style>

