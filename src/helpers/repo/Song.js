import Api from '../api/Api'

export default class SongRepo {
  constructor () {
    this.path = 'http://localhost:3000/api/song'
  }
  getSongs () {
    return Api.get(this.path).then(response => response.data).catch(err => Promise.reject(err))
  }
  getsong (id) {
    const path = `${this.path}/${id}`
    return Api.get(path).then(response => response.data).catch(err => Promise.reject(err))
  }
}
