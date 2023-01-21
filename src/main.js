import Vue from 'vue'
import { router } from './router/index'
import App from './App'
import { store } from './store/store'
import directives from './directives'

directives.forEach(directive => {
  Vue.directive(directive.name, { ...directive.methods })
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
