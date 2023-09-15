export default class requestStore {
  #map = new Map()
  has (key) {
    return this.#map.has(key)
  }
  getStore (key) {
    const res = this.#map.get(key)
    return res
  }
  setStore (key, val) {
    this.#map.set(key, val)
  }
  delStore (key) {
    this.#map.delete(key)
  }
}