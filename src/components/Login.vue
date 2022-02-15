<template>
  <div class="login-wrapper">
    <span>HEEEEEEEEEEEEEEEEEEEEEEHEEEEEEEEEEEEEE</span>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
  },
  created () {
    console.log('LOGIN CREATED')
  }
}
</script>

<style scoped lang="scss">
.login-wrapper {
  min-width: 1024px;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  background: red;
}
span {
  color: black;
  font-size: 50px;
  }
</style>
