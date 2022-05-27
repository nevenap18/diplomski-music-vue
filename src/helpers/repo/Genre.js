import Api from '../api/Api'

export default class GenreRepo {
  constructor () {
    this.path = 'http://localhost:3000/api/genre'
  }
  getGenres () {
    return Api.get(this.path).then(response => response.data).catch(err => Promise.reject(err))
  }
  getGenre (id) {
    const path = `${this.path}/${id}`
    return Api.get(path).then(response => response.data).catch(err => Promise.reject(err))
  }
}
