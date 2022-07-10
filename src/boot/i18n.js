import {boot} from 'quasar/wrappers'
import {createI18n} from 'vue-i18n'
import messages from 'src/i18n'


const i18n = createI18n({
    locale: 'fa-IR',
    fallbackLocale: 'en-US',
    legacy: false,
    messages
})


export default boot(({app}) => {
    // Set i18n instance on app
    app.use(i18n)

    // set this, so we can use ($t) in vue components
    app.config.globalProperties.$t = i18n.global.t
})

export {i18n}
