<template>
    <q-page class="flex column flex-center">
        <img
            alt="Quasar logo"
            src="~assets/quasar-logo-vertical.svg"
            style="width: 200px; height: 200px"
        >
        {{ useAuthStore().isLoggedIn }}
    </q-page>
</template>

<script setup>
import {onMounted} from "vue";
import {api} from "boot/axios";

import {useQuasar} from 'quasar'
import {useRouter} from "vue-router";
import {useAuthStore} from "stores/auth-store";

const $q = useQuasar()
const router = useRouter()

onMounted(async () => {

    // $q.dark.set(true)

    // console.log('Logging in...')
    // await api.post('/login', {
    //     email: 'pacocha.clare@example.org',
    //     password: 'password'
    // })
    //     .then(login => {
    //         if (login.data.redirect)
    //             router.replace('/home')
    //         console.log(login)
    //     })
    //
    // console.log("Getting user Info...")
    // await api.get('/api/user').then(res => {
    //     console.log('User: ', res.data)
    // })
})

// import { defineComponent } from 'vue'
//
// export default defineComponent({
//   name: 'IndexPage'
// })
</script>
