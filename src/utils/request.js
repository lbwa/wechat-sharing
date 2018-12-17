import axios from 'axios'
// import { tokenFromStorage } from 'UTILS/storage'

function createBasicRequest (baseURL) {
  if (!baseURL) throw new Error('[create base request]: You should pass a `baseURL` to create request instance')

  const request = axios.create({
    // 在 .env.[mode] files 中定义环境变量
    baseURL,
    timeout: 10000
  })

  request.interceptors.request.use(req => {
    req.headers['content-type'] = 'application/json'
    req.headers['app_key'] = process.env.VUE_APP_KEY
    req.headers['app_secret'] = process.env.VUE_APP_SECRET

    // ! 如何获取微信 access_token
    // @notice 不应在本地存储 access_token，对于服务端 access_token 唯一，但是对于不同用户无法判断当前 access_token 的有效期
    // 若后端可返回当前 access_token 有效期，那么可将以下代码解除注释，实现本地缓存 access_token

    // 检测是否存在本地缓存 access_token，否则向蛮牛服务端请求 access_token
    // const token = tokenFromStorage.getItem()
    // const period = Date.now() - token.update
    // if (token && period > 7200) {
    //   resolve(token)
    //   return
    // }

    // 添加 access_token 请求头
    // token && (req.headers['access_token'] = token.value)

    return req
  }, err => {
    err && console.error(`[Request error]: ${err}`)
    return Promise.reject(err)
  })

  request.interceptors.response.use(({ data }) => {
    // return data.code !== 2000
    //   ? Promise.reject(data)
    //   : data
    return data
  }, err => {
    err && console.error(`[Response error]: ${err}`)
    return Promise.reject(err)
  })

  return request
}

export default createBasicRequest
