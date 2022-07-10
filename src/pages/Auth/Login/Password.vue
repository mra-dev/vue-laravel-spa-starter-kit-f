<script>
export default {
    name: 'LoginPassword'
}
</script>
<script setup>
import {authInProgress, remainingTime, secondsToTime} from "src/services/helpers";
import {logInUser} from "src/services/authManager";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "stores/auth-store";
import {onMounted, ref, nextTick} from "vue";
import LayOut from "pages/Auth/LayOut";
import {useQuasar} from "quasar";
import {api} from "boot/axios";


const $q = useQuasar()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const inProgress = authInProgress(authStore)

const formEl = ref()
const field = ref()
const form = ref({
    password: null
})
const password = ref('password')
const disabled = ref(false)
const loading = ref(false)
const errors = ref({})


// Component created hook handler
if ( !inProgress || authStore.auth.mode !== 'password' )
    router.push({ name: 'login', query: route.query })


const logIn = async () => {
    errors.value = {}

    await formEl.value.validate()
        .then(state => {
            if (state) {
                loading.value = true

                api.post('/login', {...form.value, ...authStore.auth.data})
                    .then(async res => {
                        if (res.data.ok) {
                            await authStore.$reset()
                            await logInUser(res.data.user)
                            await router.push({ path: (route.query?._back || null) ?? res.data.location })
                        }
                    })
                    .catch(( {response} ) => {
                        errors.value = response.data.errors
                        errors.value = { password: [ response.data.message ] }

                        if (response.status === 429) {
                            errors.value = { password: [ response.data.message ] }
                            disabled.value = true

                            $q.notify({
                                message: response.data.data.throttle_message,
                                type: 'negative',
                                position: $q.platform.is.mobile ? 'top' : 'bottom-left',
                                progress: true,
                                timeout: 6000,
                                group: 'nuts'
                            })
                        }
                    })
                    .finally(() => {
                        loading.value = false
                        nextTick(() => {
                            field.value?.focus()
                        })
                    })
            }
        })
}

const returnBack = () => {
    authStore.auth.mode = null
    authStore.auth.data = null
    authStore.auth.expiry = null

    router.replace({ name: 'login' })
}

const loginViaSMS = () => {
    authStore.auth.mode = 'verify.login'
    router.replace({ name: 'verify', query: route.query })
}


onMounted(async () => {
    // remainingTime( authStore.auth?.expiry )
    // authInProgress(authStore)
})
</script>

<template>
    <lay-out>
        <template #title>{{ $t('auth.login.loginViaPassword') }}</template>

        <q-page-sticky position="top-left" :offset="[15, 15]">
            <q-btn round size="lg" flat color="accent" :icon="$q.lang.rtl ? `arrow_forward` : `arrow_back`" @click="returnBack" />
        </q-page-sticky>

        <div class="flex justify-between q-my-md q-px-sm text-grey">
            <div>{{ $t('common.username') }} :</div>
            <div>{{ authStore.auth.data?.username }}</div>
        </div>

        <q-form @submit.prevent="logIn" ref="formEl">
            <q-input v-model="form.password"
                     @update:model-value="errors = {}"
                     class="text-body1 text-right"
                     :type="password"
                     ref="field"
                     color="accent"
                     :placeholder="$t('common.password')"
                     dir="ltr"
                     outlined
                     rounded
                     autofocus
                     no-error-icon
                     :disable="loading"
                     :readonly="disabled"
                     :rules="[ val => !!val || $t('auth.login.passwordError') ]"
                     :error="!!errors?.password"
                     :error-message="errors.password?.[0]"
            >
                <template #after>
                    <q-btn type="submit"
                           icon="vpn_key"
                           padding="14px"
                           round
                           :color="$q.dark.isActive ? 'accent' : 'white'"
                           :text-color="$q.dark.isActive ? 'white' : 'accent'"
                           :loading="loading"
                           :disable="disabled"
                           @click="logIn"
                    />
                </template>
                <template #prepend>
                    <q-btn round flat icon="visibility" @click="password = 'text'" v-if="password === 'password'"></q-btn>
                    <q-btn round flat icon="visibility_off" @click="password = 'password'" v-else></q-btn>
                </template>
            </q-input>

        </q-form>


        <template #footer>
            <q-btn flat color="accent" class="text-body2" v-text="$t('auth.login.loginViaSMS')" @click="loginViaSMS" />
        </template>

    </lay-out>
</template>
