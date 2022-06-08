import {boot} from 'quasar/wrappers'
import Cookies from 'js-cookie';

import {useAppStore} from "stores/app-store"
const appStore = useAppStore()

import {useAuthStore} from "stores/auth-store"
const authStore = useAuthStore()

export default boot(({router, store}) => {
    router.beforeEach(async (to, from, next) => {

        appStore.setTitle(to.meta.title)

        if (to.meta.middleware === "guest") {
            if (authStore.isLoggedIn) {
                next({ name: "dashboard" })
            }
            next()
        }
        else if (to.meta.middleware === "auth") {
            if (!Cookies.get('XSRF-TOKEN'))
                authStore.logOut()

            if (useAuthStore().isLoggedIn)
                next()
            else
                next({ name: "login", query: { _back: to.fullPath } })
        }
        else {
            next()
        }

    })
})
