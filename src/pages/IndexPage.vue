<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'IndexPage'
})
</script>

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
})
</script>

<template>
    <q-page class="flex column flex-center">
        <img
            alt="Quasar logo"
            src="~assets/quasar-logo-vertical.svg"
            style="width: 200px; height: 200px"
        >
        {{ useAuthStore().isLoggedIn }}
        <router-link :to="{ name: 'login' }">لاگین</router-link>
    </q-page>
</template>
