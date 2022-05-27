// import Api from '@/helpers/Api'
import ProfileRepo from '@/helpers/repo/Profile.js'

const state = {
  profile: null
}

const getters = {
  profile: state => state.profile
}

const mutations = {
  SET_PROFILE: (state, payload) => {
    state.profile = payload
  }
}

const actions = {
  getProfile: async ({commit}) => {
    const profile = new ProfileRepo()
    const currentProfile = await profile.getProfile()
    commit('SET_PROFILE', currentProfile)
  },
  editProfile: async ({commit}, payload) => {
    const profile = new ProfileRepo()
    const editedProfile = await profile.editProfile(payload)
    commit('SET_PROFILE', editedProfile)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
