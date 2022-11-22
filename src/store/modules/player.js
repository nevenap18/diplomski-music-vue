const state = {
  currentSong: null
}

const getters = {
  getCurrentSong: state => state.currentSong
}

const mutations = {
  UPDATE_CURRENT_SONG: (state, payload) => {
    state.currentSong = payload
  }
}

const actions = {
  updateCurrentSong: ({commit}, {song, artist}) => {
    const songMapped = {
      songId: song.songId,
      albumId: song.albumId,
      title: song.title,
      url: song.url,
      year: song.year,
      artistId: artist.id,
      artist: artist.name
    }
    commit('UPDATE_CURRENT_SONG', songMapped)
  },
  stopSong({commit}){
    commit('UPDATE_CURRENT_SONG', null)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
