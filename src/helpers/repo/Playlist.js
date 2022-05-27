import Api from '../api/Api'

const EDIT_PATH = 'edit'
const ADD_PATH = 'add'
const REMOVE_PATH = 'remove'
export default class PlaylistRepo {
  constructor () {
    this.path = 'http://localhost:3000/api/playlist'
  }
  getPlaylists () {
    return Api.get(this.path).then(response => response.data).catch(err => Promise.reject(err))
  }
  getPlaylist (id) {
    return Api.get(`${this.path}/${id}`).then(response => response.data).catch(err => Promise.reject(err))
  }
  // { title: title, description: desc }
  createPlaylist (data) {
    return Api.post(this.path, data).then(response => response.data).catch(err => Promise.reject(err))
  }
  // { playlistId: id, title: title, description: desc}
  editPlaylist (data) {
    const path = `${this.path}/${EDIT_PATH}`
    return Api.patch(path, data).then(response => response.data).catch(err => Promise.reject(err))
  }
  // { songId: id, playlistId: id}
  addSongToPlaylist (data) {
    const path = `${this.path}/${ADD_PATH}`
    return Api.post(path, data).then(response => response.data).catch(err => Promise.reject(err))
  }
  // { songId: id, playlistId: id}
  removeSongFromPlaylist (data) {
    const path = `${this.path}/${REMOVE_PATH}`
    return Api.put(path, data).then(response => response.data).catch(err => Promise.reject(err))
  }
  deletePlaylist (id) {
    const path = `${this.path}/${id}`
    return Api.delete(path).then(response => response.data).catch(err => Promise.reject(err))
  }
}
