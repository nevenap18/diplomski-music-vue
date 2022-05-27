import axios from 'axios'

export default class Api {
  static create (config) {
    // Here is dependency with AXIOS
    if (config) {
      return axios.create(config)
    } else {
      return axios.create()
    }
  }
  static getOpenApi (config) {
    if (Api.openApi == null) {
      Api.openApi = Api.create(config)
    }
    return Api.openApi
  }
  static get (url, config = {}) {
    return Api.api.get(url, config)
  }
  static post (url, data, config = {}) {
    return Api.api.post(url, data, config)
  }
  static put (url, data, config = {}) {
    return Api.api.put(url, data, config)
  }
  static patch (url, data, config = {}) {
    return Api.api.patch(url, data, config)
  }
  static delete (url, config = {}) {
    return Api.api.delete(url, config)
  }
  static request (config) {
    return Api.api.request(config)
  }
  static reInit () {
    Api.api = null
    Api.api = Api.create()
  }
  static setDefaultHeaders (header, value) {
    Api.api.defaults.headers['common'][header] = value
  }
  static removeDefaultHeader (header) {
    delete Api.api.defaults.headers['common'][header]
  }
  static setErrorInterceptor (errorCode, cbError) {
    Api.api.interceptors.response.use(response => response, error => {
      if (error.statusCode === errorCode) {
        cbError()
      }
      return Promise.reject(error)
    })
  }

}
Api.api = Api.create()

Api.openApi = null
