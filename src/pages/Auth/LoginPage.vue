<script>
export default {
    name: 'LoginPage'
}
</script>
<script setup>
import {logInUser} from "src/services/authManager";
import {ref} from "vue";
import {api} from "boot/axios";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()

const form = ref({
    email: 'pacocha.clare@example.org',
    password: 'password'
})

const logIn = async () => {
    await api.post('/login', form.value)
        .then(async res => {
            console.log(res)

            if (res.data.ok && res.data.redirect) {
                await logInUser(res.data.user)
                await router.push({ path: (route.query?._back || null) ?? res.data.location })
            }
        })
}
</script>

<template>
    <q-page class="flex flex-center">

        <div class="">
            <q-btn color="accent" @click="logIn">
                لاگین
            </q-btn>
        </div>

        <!--        <q-inner-loading :showing="true">-->
        <!--            <q-spinner-dots-->
        <!--                color="primary"-->
        <!--                size="10em"-->
        <!--            />-->
        <!--        </q-inner-loading>-->

    </q-page>
</template>
