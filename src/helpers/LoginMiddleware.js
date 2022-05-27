
import Auth from './repo/Auth.js'
import Api from './api/Api'
export default async function (to) {
  // get stored token
  const token = document.cookie.match('(^|;)\\s*' + 'token' + '\\s*=\\s*([^;]+)')?.pop() || ''

  // if no token redirect to Login page
  if (!token) {
    if (to.name !== 'Login' && to.name !== 'Register') {
      return Promise.resolve('/login')
    } else {
      return Promise.resolve(true)
    }
  }
  // if token exist verify its validity
  const auth = new Auth()
  let route = ''
  await auth.verifyToken(token).then(() => {
    // set Auth headers for protected api routes
    Api.setDefaultHeaders('Authorization', `Bearer ${token}`)
    if (to.name !== 'Login' && to.name !== 'Register') { // if route is not Login page redirect to Home or desired page
      route = true
    } else { // if route is Login page redirect to Home page
      route = '/'
    }
  }).catch(() => { // if token not Valid remove from cookies and redirect to Login page
    document.cookie = 'token=; expires=Thu, 01-Jan-1970 00:00:01 GMT'
    if (to.name !== 'Login' && to.name !== 'Register') {
      route = '/login'
    } else {
      route = true
    }
  })
  return Promise.resolve(route)
}
