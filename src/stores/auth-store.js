import {defineStore} from 'pinia';
import router from "src/router";

export const useAuthStore = defineStore('auth', {
    persist: {
        storage: sessionStorage
    },

    state: () => ({
        isLoggedIn: false,
        user: null
    }),

    getters: {
    },

    actions: {
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
