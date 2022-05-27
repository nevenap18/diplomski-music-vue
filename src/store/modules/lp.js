// import Api from '@/helpers/Api'
import LpRepo from '@/helpers/repo/Lp.js'

const state = {
  landingPage: {}
}

const getters = {
  landingPage: state => state.landingPage
}

const mutations = {
  SET_LP: (state, payload) => {
    state.landingPage = payload
  }
}

const actions = {
  getLandingPage: async ({commit}) => {
    const lp = new LpRepo()
    const landpg = await lp.getLp()
    commit('SET_LP', landpg)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
