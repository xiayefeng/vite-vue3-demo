/*
 * @Author: Anyuxuan xiayu_12@yeah.net
 * @Date: 2023-03-17 00:06:28
 * @LastEditors: xiayefeng xiayu_12@yeah.net
 * @LastEditTime: 2023-03-18 01:47:47
 * @FilePath: \vite-vue3-demo\src\utils\cancleController.js
 * @Description: 
 */
export default class CancelAxios {
  #map = new Map()
  removePendingReq (url, type) {
    const item = this.#map.get(url)
    if (item) {
      this.#map.delete(url)
      type === 'req' && item.abort()
    }
  }
  addController (url, config) {
    const controller = new AbortController()
    config.signal = controller.signal
    this.#map.set(url, controller)
  }
  clear() {
    this.#map.clear()
  }
}