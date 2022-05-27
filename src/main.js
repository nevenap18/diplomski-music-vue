import Vue from 'vue'
import { router } from './router/index'
import App from './App'
import { store } from './store/store'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
