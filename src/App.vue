<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Inter-Regular', sans-serif;
}
:root {
  --font-regular: 400 15px/21px 'Inter-Regular', sans-serif;
  --font-medium: 400 18px/26px 'Inter-Regular', sans-serif;
  --font-large: 400 24px/32px 'Inter-Regular', sans-serif;
  --font-xlarge: 400 28px/36px 'Inter-Regular', sans-serif;
  --font-small: 400 12px/17px 'Inter-Regular', sans-serif;
  --font-regular-bold: 700 14px/20px 'Inter-Regular', sans-serif;
  --font-medium-bold: 700 18px/26px 'Inter-Regular', sans-serif;
  --font-large-bold: 700 24px/32px 'Inter-Regular', sans-serif;
  --font-xlarge-bold: 700 28px/36px 'Inter-Regular', sans-serif;
  --font-xxlarge-bold: 700 32px/38px 'Inter-Regular', sans-serif;
  --font-small-bold: 700 12px/17px 'Inter-Regular', sans-serif;
}

@media (min-width: 2000px) {
    :root {
      --font-regular: 400 21px/27px 'Inter-Regular', sans-serif;
      --font-medium: 400 24px/32px 'Inter-Regular', sans-serif;
      --font-large: 400 30px/38px 'Inter-Regular', sans-serif;
      --font-xlarge: 400 34px/42px 'Inter-Regular', sans-serif;
      --font-small: 400 18px/23px 'Inter-Regular', sans-serif;
      --font-regular-bold: 700 21px/27px 'Inter-Regular', sans-serif;
      --font-medium-bold: 700 24px/32px 'Inter-Regular', sans-serif;
      --font-large-bold: 700 30px/38px 'Inter-Regular', sans-serif;
      --font-xlarge-bold: 700 34px/42px 'Inter-Regular', sans-serif;
      --font-xxlarge-bold: 700 38px/44px 'Inter-Regular', sans-serif;
      --font-small-bold: 700 15px/121px 'Inter-Regular', sans-serif;
    }
}
@media (max-width: 1024px) {
  :root {
    --font-regular: 400 12px/18px 'Inter-Regular', sans-serif;
    --font-medium: 400 15px/23px 'Inter-Regular', sans-serif;
    --font-large: 400 21px/29px 'Inter-Regular', sans-serif;
    --font-xlarge: 400 25px/33px 'Inter-Regular', sans-serif;
    --font-small: 400 9px/14px 'Inter-Regular', sans-serif;
    --font-regular-bold: 700 12px/18px 'Inter-Regular', sans-serif;
    --font-medium-bold: 700 15px/23px 'Inter-Regular', sans-serif;
    --font-large-bold: 700 21px/29px 'Inter-Regular', sans-serif;
    --font-xlarge-bold: 25px/33px 'Inter-Regular', sans-serif;
    --font-xxlarge-bold: 700 29px/35px 'Inter-Regular', sans-serif;
    --font-small-bold: 700 9px/14px 'Inter-Regular', sans-serif;
  }
}
html, body {
  height: 100%;
  margin: 0;
}
</style>
