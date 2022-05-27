import Api from '../api/Api'

export default class ArtistRepo {
  constructor () {
    this.path = 'http://localhost:3000/api/Artist'
  }

  getArtists () {
    return Api.get(this.path).then(response => response.data).catch(err => Promise.reject(err))
  }
  getArtist (id) {
    const path = `${this.path}/${id}`
    return Api.get(path).then(response => response.data).catch(err => Promise.reject(err))
  }
}
