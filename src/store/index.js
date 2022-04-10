import { createStore } from 'vuex'

const store = createStore({
  strict: import.meta.env.PROD,
  state() {
    return {
      token: null
    }
  },
  mutations: {
    getToken(state, payload) {
      state.token = payload
    }
  }
})

export default store