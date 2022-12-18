import req from '@/utils/request'

export function reqGet (url, params, config = {}) {
  return req({ url, params, ...config })
}

export function reqPost (url, data, config = {}) {
  return req({ url, data, method: 'post', ...config })
}
