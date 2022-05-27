import Api from '../api/Api'

const SONGS_PATH = 'songs'
const ALBUMS_PATH = 'albums'
const SONG_PATH = 'song'
const ALBUM_PATH = 'album'
export default class GenreRepo {
  constructor () {
    this.path = 'http://localhost:3000/api/favorites'
  }
  getFavoriteSongs () {
    return Api.get(`${this.path}/${SONGS_PATH}`).then(response => response.data).catch(err => Promise.reject(err))
  }
  getFavoriteAlbums () {
    return Api.get(`${this.path}/${ALBUMS_PATH}`).then(response => response.data).catch(err => Promise.reject(err))
  }
  // { favId: id, value: value }
  addRemoveFavoriteSong (data) {
    const path = `${this.path}/${SONG_PATH}`
    return Api.post(path, data).then(response => response.data).catch(err => Promise.reject(err))
  }
  addRemoveFavoriteAlbum (data) {
    const path = `${this.path}/${ALBUM_PATH}`
    return Api.post(path, data).then(response => response.data).catch(err => Promise.reject(err))
  }
}
