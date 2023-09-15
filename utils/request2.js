import axios from 'axios'


const request = axios.create({
    baseURL: '/根域名',
    timeout: 5000,
  })

let isLock = false
let requests = []



instance.interceptors.request.use((config) => {

  if (config.url.indexOf('/rereshToken') >= 0) {
    return config
  }
  if (token && tokenExpireTime) {
    const now = Date.now()
    if (now >= tokenExpireTime) {
      if (!isLock) {
        isLock = true
        refreshToken().then(res => {
          const { token, tokenExprieIn } = res.data
          const tokenExpireTime = now + tokenExprieIn * 1000
          requests.setToken( token)
          isLock = false
          return token
        }).then((token) => {
          requests.forEach(cb => cb(token))
          requests = []
        })
      }
      return new Promise((resolve) => {
        requests.push((token) => {
          config.headers['X-Token'] = token
          resolve(request(config))
        })
      })
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})



export default instance