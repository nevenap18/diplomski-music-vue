import Vue from 'vue'
import Vuex from 'vuex'

import lp from './modules/lp'
import content from './modules/content'
import profile from './modules/profile'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    lp,
    content,
    profile
  }
})
