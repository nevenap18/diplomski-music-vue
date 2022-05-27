import Api from '../api/Api'

const TYPE = 'application/json'
export default class AuthRepo {
  constructor () {
    this.PATH = 'auth'
  }
  register (email, username, password) {
    const config = {
      url: `http://localhost:3000/${this.PATH}/register`,
      headers: {
        'Content-Type': TYPE
      },
      method: 'POST',
      data: {
        email,
        username,
        password
      }
    }
    return Api.getOpenApi().request(config).then(response => response.data).catch(err => Promise.reject(err))
  }
  login (username, password) {
    const config = {
      url: `http://localhost:3000/${this.PATH}/login`,
      headers: {
        'Content-Type': TYPE
      },
      method: 'POST',
      data: {
        username,
        password
      }
    }
    return Api.getOpenApi().request(config).then(response => response.data).catch(err => Promise.reject(err))
  }
  verifyToken (token) {
    const config = {
      url: `http://localhost:3000/${this.PATH}/verify`,
      headers: {
        'Content-Type': TYPE
      },
      method: 'POST',
      data: {
        token
      }
    }
    return Api.getOpenApi().request(config).then(response => response.data).catch(err => Promise.reject(err))
  }
  reInit () {
    Api.reInit()
  }
}
