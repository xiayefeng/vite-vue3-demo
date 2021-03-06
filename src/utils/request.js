/**
 * Created by wx on 2018-11-06.
 */
import axios from 'axios'
import qs from 'qs'
// import { strHash } from './index'
// import md5 from 'js-md5'

export const reqMap = new Map()

const removePendingReq = (url, type) => {
  const item = reqMap.get(url)
  if (item) {
    type === 'req' && item.abort()
    reqMap.delete(url)
  }
}

const instance = axios.create({
  // baseURL: 'https://api.example.com'
})

instance.defaults.timeout = 10000

instance.interceptors.request.use(
  config => {
    let url = config.url
    /* if (config.method === 'get') {
      url += '?' + qs.stringify(config.params)
    } */
    if (config.signalRequest) {
      removePendingReq(url, 'req')
      const controller = new AbortController()
      config.signal = controller.signal
      reqMap.set(url, controller)
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
      /* let formData = new FormData()
      for (let i in config.data) {
        formData.append(i, config.data[i])
      } */
      // config.data = formData
    } else if (config.data) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  resp => {
    const res = resp.data
    let url = resp.config.url
    /* if (resp.config.method === 'get') {
      url += '?' + qs.stringify(resp.config.params)
    } */
    if (resp.config.signalRequest) {
      removePendingReq(url, 'resp')
    }

    if (res.code === 0) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    console.log(error)
    if (error.message.includes('Network')) {
      error.message = '网络不给力，请稍后再试'
    } else if (error.message.includes('timeout')) {
      error.message = '请求超时，请稍后重试'
    } else if (axios.isCancel(error)) {
      error.message = '请求已取消'
    } else if (typeof error.code === 'undefined') {
      error.message = '连接出错，请重试'
    }
    return Promise.reject(error)
  }
)

export default ({ url, method = 'get', params = {}, data = {}, ...rest } = {}) => {
  // console.log(url)
  // console.log(params)
  if (!url) {
    return
  }
  if (/[A-Z]/.test(method)) {
    method = method.toLocaleLowerCase()
  }
  return new Promise((resolve, reject) => {
    instance.request({
      url,
      params,
      data,
      method,
      ...rest
    }).then((res) => {
      return resolve(res)
    }).catch(error => {
      // console.log(error)
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      }
      return reject(error)
    })
  })
}
