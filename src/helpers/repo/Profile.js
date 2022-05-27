import Api from '../api/Api'

export default class ProfileRepo {
  constructor () {
    this.path = 'http://localhost:3000/api/profile'
  }
  getProfile () {
    return Api.get(this.path).then(response => response.data).catch(err => Promise.reject(err))
  }
  // { email: email, username: un, password: pass}
  editProfile (data) {
    return Api.patch(this.path, data).then(response => response.data).catch(err => Promise.reject(err))
  }
}
