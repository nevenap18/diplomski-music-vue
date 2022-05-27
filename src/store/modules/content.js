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
  genres: []
}

const getters = {
  favoriteAlbums: state => state.favoriteAlbums,
  favoriteSongs: state => state.favoriteSongs,
  playlistsList: state => state.playlistsList,
  albums: state => state.albums,
  artists: state => state.artists,
  genres: state => state.genres
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
    state.playlistsList = payload
  },
  SET_ALBUMS: (state, payload) => {
    state.albums = payload
  },
  SET_ARTISTS: (state, payload) => {
    state.artists = payload
  },
  SET_GENRES: (state, payload) => {
    state.genres = payload
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
