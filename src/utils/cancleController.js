/*
 * @Author: Anyuxuan xiayu_12@yeah.net
 * @Date: 2023-03-17 00:06:28
 * @LastEditors: Anyuxuan xiayu_12@yeah.net
 * @LastEditTime: 2023-03-17 00:09:18
 * @FilePath: \vite-vue3-demo\src\utils\cancleController.js
 * @Description: 
 */
const reqMap = new Map()

export default class CancelAxios {
  removePendingReq (url, type) {
    const item = reqMap.get(url)
    if (item) {
      type === 'req' && item.abort()
      reqMap.delete(url)
    }
  }
  addController (config) {
    const controller = new AbortController()
    config.signal = controller.signal
    reqMap.set(url, controller)
  }
}