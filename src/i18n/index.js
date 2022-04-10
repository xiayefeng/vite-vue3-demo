import { createI18n } from 'vue-i18n'
const i18n = createI18n({
  locale: 'zh',
  zh: {
    app: {
      netError: '网络连接异常'
    }
  },
  en: {
    app: {
      netError: 'abnormal network connection'
    }
  }
})

export function switchLang(lang) {
  if (!['zh', 'en'].includes(lang)) {
    throw new TypeError('language only support "zh" or "en"')
  }
  i18n.global.locale = lang
}

export default i18n