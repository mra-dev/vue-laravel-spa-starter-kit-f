import {defineStore} from 'pinia';
import titleMarquee from "src/services/titleMarquee";

export const useAppStore = defineStore('app', {
    state: () => ({
        title: '',
        loading: false,
        loggedOut: false,
        titleMarqueeTimer: null
    }),

    getters: {
        // doubleCount(state) {
        //     return state.counter * 2
        // }
    },

    actions: {
        async setTitle(title = 'بدون عنوان') {
            let t = title + ' - ' + 'اپلیکیشن مدیریت ساختمان'
            this.title = title
            titleMarquee(t, true)
        },
        offLoad() {
            this.loading = false
        },
        onLoad() {
            this.loading = true
        }
    }
})
