import Api from './api/Api'

export default class AuthRepo {
  constructor () {
    this.PATH = 'auth'
  }

  login (username, password) {
    const config = {
      url: `http://localhost:3000/${this.PATH}/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: {
        username,
        password
      }
    }
    return Api.getOpenApi().request(config).then(response => response.data).catch(err => Promise.reject(err))
  }
  verifyToken () {
    const config = {
      url: `http://localhost:3000/${this.PATH}/verify`,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: {
        token: 'eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjozLCJpYXQiOjE2NDQ4NTU5OTksImV4cCI6MTY0NTcxOTk5OX0'
      }
    }
    return Api.getOpenApi().request(config).then(response => response.data).catch(err => Promise.reject(err))
  }
  reInit () {
    Api.reInit()
  }
}
