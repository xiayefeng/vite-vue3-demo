import { reqGet } from './common'

export function getInfo (url, params) {
  return reqGet(url, params, { useMemo: 1 })
}