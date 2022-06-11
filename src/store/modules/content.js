// import Api from '@/helpers/Api'
import FavoritesRepo from '@/helpers/repo/Favorites.js'
import PlaylistRepo from '@/helpers/repo/Playlist.js'
import AlbumRepo from '@/helpers/repo/Album.js'
import ArtistRepo from '@/helpers/repo/Artist.js'
import GenreRepo from '@/helpers/repo/Genre.js'

const state = {
  favoriteAlbums: [],
  favoriteSongs: [],
  playlistsList: [],
  albums: [],
  artists: [],
  genres: [],
  playlistModalData: {},
  showAddPlaylistModal: false,
  showCreatePlaylistModal: false,
  editPlaylistModalData: {},
  showEditPlaylistModal: false
}

const getters = {
  favoriteAlbums: state => state.favoriteAlbums,
  favoriteSongs: state => state.favoriteSongs,
  playlistsList: state =>  {
    return state.playlistsList.map(playlist => ({
      title: playlist.title,
      image: playlist.image,
      id: playlist.id,
      songs: playlist.songs.map(song => song.songId)
    }))
  },
  albums: state => state.albums,
  artists: state => state.artists,
  genres: state => state.genres,
  playlistModalData: state => state.playlistModalData,
  showAddPlaylistModal: state => state.showAddPlaylistModal,
  showCreatePlaylistModal: state => state.showCreatePlaylistModal,
  showEditPlaylistModal: state => state.showEditPlaylistModal,
  editPlaylistModalData: state => state.editPlaylistModalData
}

const mutations = {
  SET_FAVORITE_ALBUMS: (state, payload) => {
    state.favoriteAlbums = payload.map(album => album.id)
  },
  SET_FAVORITE_SONGS: (state, payload) => {
    state.favoriteSongs = payload.map(song => song.songId)
  },
  UPDATE_FAVORITE_SONG: (state, payload) => {
    if (payload.value) {
      state.favoriteSongs.push(payload.favId)
    } else {
      state.favoriteSongs = state.favoriteSongs.filter(id => id !== payload.favId)
    }
  },
  UPDATE_FAVORITE_ALBUM: (state, payload) => {
    if (payload.value) {
      state.favoriteAlbums.push(payload.favId)
    } else {
      state.favoriteAlbums = state.favoriteAlbums.filter(id => id !== payload.favId)
    }
  },
  SET_PLAYLISTS: (state, payload) => {
    state.playlistsList = Object.freeze(payload)
  },
  SET_ALBUMS: (state, payload) => {
    state.albums = Object.freeze(payload)
  },
  SET_ARTISTS: (state, payload) => {
    state.artists = Object.freeze(payload)
  },
  SET_GENRES: (state, payload) => {
    state.genres = Object.freeze(payload)
  },
  UPDATE_PLAYLIST_MODAL_DATA: (state, payload) => {
    state.playlistModalData = Object.freeze(payload)
  },
  OPEN_ADD_PLAYLIST_MODAL: (state) => {
    state.showAddPlaylistModal = true
  },
  CLOSE_ADD_PLAYLIST_MODAL: (state) => {
    state.showAddPlaylistModal = false
  },
  OPEN_CREATE_PLAYLIST_MODAL: (state) => {
    state.showCreatePlaylistModal = true
  },
  CLOSE_CREATE_PLAYLIST_MODAL: (state) => {
    state.showCreatePlaylistModal = false
  },
  UPDATE_EDIT_PLAYLIST_MODAL_DATA: (state, payload) => {
    state.editPlaylistModalData = payload
  },
  OPEN_EDIT_PLAYLIST_MODAL: (state) => {
    state.showEditPlaylistModal = true
  },
  CLOSE_EDIT_PLAYLIST_MODAL: (state) => {
    state.showEditPlaylistModal = false
  }
}
const actions = {
  getFavorites: async ({commit}) => {
    const favs = new FavoritesRepo()
    await favs.getFavoriteSongs().then(res => {
      commit('SET_FAVORITE_SONGS', res)
    }).catch(e => {
      console.log(e)
    })
    await favs.getFavoriteAlbums().then(res => {
      commit('SET_FAVORITE_ALBUMS', res)
    }).catch(e => {
      console.log(e)
    })
  },
  addRemoveFavoriteSong: async ({commit}, payload) => {
    const favs = new FavoritesRepo()
    await favs.addRemoveFavoriteSong(payload).then(() => {
      commit('UPDATE_FAVORITE_SONG', payload)
    }).catch(e => {
      console.log(e)
    })
  },
  addRemoveFavoriteAlbum: async ({commit}, payload) => {
    console.log(payload, 'PAYLOAD')
    const favs = new FavoritesRepo()
    await favs.addRemoveFavoriteAlbum(payload).then(() => {
      commit('UPDATE_FAVORITE_ALBUM', payload)
    }).catch(e => {
      console.log(e)
    })
  },
  getPlaylists: async ({commit}) => {
    const pl = new PlaylistRepo()
    const playlists = await pl.getPlaylists()
    commit('SET_PLAYLISTS', playlists)
  },
  getAlbums: async ({commit}) => {
    const album = new AlbumRepo()
    const albums = await album.getAlbums()
    commit('SET_ALBUMS', albums)
  },
  getArtists: async ({commit}) => {
    const artist = new ArtistRepo()
    const artists = await artist.getArtists()
    commit('SET_ARTISTS', artists)
  },
  getGenres: async ({commit}) => {
    const genre = new GenreRepo()
    const genres = await genre.getGenres()
    commit('SET_GENRES', genres)
  },
  openAddPlaylistModal: async ({commit}, songId) => {
    commit('UPDATE_PLAYLIST_MODAL_DATA', songId)
    commit('OPEN_ADD_PLAYLIST_MODAL')
  },
  closeAddPlaylistModal: async ({commit}) => {
    commit('UPDATE_PLAYLIST_MODAL_DATA', {})
    commit('CLOSE_ADD_PLAYLIST_MODAL')
  },
  openCreatePlaylistModal: async ({commit}) => {
    commit('OPEN_CREATE_PLAYLIST_MODAL')
  },
  closeCreatePlaylistModal: async ({commit}) => {
    commit('CLOSE_CREATE_PLAYLIST_MODAL')
  },
  addRemoveSongFromPlaylist: async ({dispatch}, payload) => {
    const playlist = new PlaylistRepo()
    if (payload.action) {
      await playlist.addSongToPlaylist({songId: payload.songId, playlistId: payload.playlistId}).then(() => {
        dispatch('getPlaylists')
      }).catch(e => {
        console.log(e)
      })
    } else {
      await playlist.removeSongFromPlaylist({songId: payload.songId, playlistId: payload.playlistId}).then(() => {
       dispatch('getPlaylists')
      }).catch(e => {
        console.log(e)
      })
    }
  },
  openEditPlaylistModal: async ({commit}, payload) => {
    commit('UPDATE_EDIT_PLAYLIST_MODAL_DATA', payload)
    commit('OPEN_EDIT_PLAYLIST_MODAL')
  },
  closeEditPlaylistModal: async ({commit}) => {
    commit('UPDATE_EDIT_PLAYLIST_MODAL_DATA', {})
    commit('CLOSE_EDIT_PLAYLIST_MODAL')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
