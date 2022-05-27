import Api from '../api/Api'

export default class AlbumRepo {
  constructor () {
    this.path = 'http://localhost:3000/api/album'
  }

  getAlbums () {
    return Api.get(this.path).then(response => response.data).catch(err => Promise.reject(err))
  }
  getAlbum (id) {
    const path = `${this.path}/${id}`
    return Api.get(path).then(response => response.data).catch(err => Promise.reject(err))
  }
}
