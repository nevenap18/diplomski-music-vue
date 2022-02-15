<template>
  <div class="HELLO" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Auth from './helpers/Auth.js'

export default {
  name: 'App',
  components: {
  },
  methods: {
    logout () {
      console.log('logout')
    }
  },
  async created () {
    let login = null
    const auth = new Auth()

    login = await auth.login('admin', 'admin').catch(() => {
      this.logout()
    })
    // await auth.verifyToken()
    console.log(login)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
html, body {
  height: 100%;
  margin: 0;
}
</style>
