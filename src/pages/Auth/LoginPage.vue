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

const loading = ref(false)

const form = ref({
    email: 'pacocha.clare@example.org',
    password: 'password'
})

const logIn = async () => {

    loading.value = true

    await api.post('/login', form.value)
        .then(async res => {
            console.log(res)

            if (res.data.ok && res.data.redirect) {
                await logInUser(res.data.user)
                await router.push({ path: (route.query?._back || null) ?? res.data.location })
            }
        })
        .catch((e) => {
            alert(e.response)
        })
        .finally(() => {
            loading.value = false
        })
}
</script>

<template>

    <q-page class="bg-light-green row justify-center items-center">
        <div class="column">
            <div class="row">
                <h5 class="text-h5 text-white q-my-md">Company & Co</h5>
            </div>
            <div class="row">
                <q-card square bordered class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input square filled clearable v-model="email" type="email" label="email" />
                            <q-input square filled clearable v-model="password" type="password" label="password" />
                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="ورود" @click="logIn" />
                    </q-card-actions>
                    <q-card-section class="text-center q-pa-none">
                        <p class="text-grey-6">Not reigistered? Created an Account</p>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>


<!--    <q-page class="flex flex-center">-->

<!--        <div class="">-->
<!--            <q-btn color="accent" @click="logIn" :loading="loading">-->
<!--                لاگین-->
<!--            </q-btn>-->
<!--        </div>-->

<!--        &lt;!&ndash;        <q-inner-loading :showing="true">&ndash;&gt;-->
<!--        &lt;!&ndash;            <q-spinner-dots&ndash;&gt;-->
<!--        &lt;!&ndash;                color="primary"&ndash;&gt;-->
<!--        &lt;!&ndash;                size="10em"&ndash;&gt;-->
<!--        &lt;!&ndash;            />&ndash;&gt;-->
<!--        &lt;!&ndash;        </q-inner-loading>&ndash;&gt;-->

<!--    </q-page>-->
</template>
