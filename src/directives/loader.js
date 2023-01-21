import Vue from 'vue'
import Loader from '../components/components/Loader'

export default {
  name: 'loader',
  methods: {
    bind (el, binding) {
      el.componentInst = initializeLoader()
      Vue.set(el.componentInst.$data, 'show', binding.value)
      el.appendChild(el.componentInst.$el)
      el.style.position = 'relative'
    },
    componentUpdated (el, binding) {
      el.style.pointerEvents = !binding.value ? 'auto' : 'none'
      Vue.set(el.componentInst.$data, 'show', binding.value)
    },
    unbind (el) {
      console.log('DESTROY')
      el.componentInst.$destroy()
    }
  }
}

const initializeLoader = () => {
  return new Vue({
    data () {
      return {
        show: false
      }
    },
    components: {Loader},
    template: `<Loader v-if="show" />`
  }).$mount()
}
