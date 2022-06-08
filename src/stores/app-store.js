import {defineStore} from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        title: '',
        loading: false
    }),

    getters: {
        // doubleCount(state) {
        //     return state.counter * 2
        // }
    },

    actions: {
        setTitle(title) {
            document.title = title + ' - ' + 'اپلیکیشن مدیریت ساختمان'
            this.title = title
        },
        offLoad() {
            this.loading = false
        },
        onLoad() {
            this.loading = true
        }
    }
})
