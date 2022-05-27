import Api from '../api/Api'

export default class LpRepo {
  constructor () {
    this.path = 'http://localhost:3000/api/lp'
  }
  getLp () {
    return Api.get(this.path).then(response => response.data).catch(err => Promise.reject(err))
  }
}
