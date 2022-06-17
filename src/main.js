import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routes'
import store from '@/store'
import VueI18n from '@/i18n'
import 'virtual:svg-icons-register'
import '@/style/common.scss'
import myPlugin from '@/directives'

createApp(App)
.use(router)
.use(store)
.use(VueI18n)
.use(myPlugin)
.mount('#app')
