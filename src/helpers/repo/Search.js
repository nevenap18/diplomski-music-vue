import Api from '../api/Api'

const SONG_PATH = 'song'
const ALBUM_PATH = 'album'
const ARTIST_PATH = 'artist'
export default class LpRepo {
  constructor () {
    this.path = 'http://localhost:3000/api'
  }
  searchSongs (searchTerm) {
    const path = `${this.path}/${SONG_PATH}?title=${searchTerm}`
    return Api.get(path).then(response => response.data).catch(err => Promise.reject(err))
  }
  searchAlbums (searchTerm) {
    const path = `${this.path}/${ALBUM_PATH}?s={"title": {"$cont": "${searchTerm}"}}`
    return Api.get(path).then(response => response.data).catch(err => Promise.reject(err))
  }
  searchArtists (searchTerm) {
    const path = `${this.path}/${ARTIST_PATH}?s={"name": {"$cont": "${searchTerm}"}}`
    return Api.get(path).then(response => response.data).catch(err => Promise.reject(err))
  }
}
