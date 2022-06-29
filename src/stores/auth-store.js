import {defineStore} from 'pinia';
import router from "src/router";

export const useAuthStore = defineStore('auth', {
    persist: true,

    state: () => ({
        isLoggedIn: false,
        user: null,
        permissions: [],

        auth: {
            mode: null,
            data: null,
            expiry: null
        }
    }),

    getters: {
    },

    actions: {
        async setPermissions(permissions) {
            this.permissions = permissions
        },
        async setUser(user) {
            this.user = user
        },
        async logIn() {
            this.isLoggedIn = true
        },
        async logOut() {
            this.isLoggedIn = false
        }
    }
})
