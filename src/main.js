import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routes'
import store from '@/store'
import VueI18n from '@/i18n'
import '@/style/common.scss'

createApp(App)
.use(router)
.use(store)
.use(VueI18n)
.mount('#app')
