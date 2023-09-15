import axios from 'axios'
const request = axios.create({
  baseURL: '/根域名',
  timeout: 5000,
})

let isLock = false
let requests = []

instance.interceptors.response.use(response => {
  const { code } = response.data
  if (code === 1234) {
    if (!isLock) {
        isLock = true
      return refreshToken().then(res => {
        const { token } = res.data
        response.config.headers['X-Token'] = token
        requests.forEach(cb => cb(token))
        requests = []
        return request(config)
      }).finally(() => {
        isLock = false
      })
    } else {
      return new Promise((resolve) => {
        requests.push((token) => {
          config.headers['X-Token'] = token
          resolve(request(config))
        })
      })
    }
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default request