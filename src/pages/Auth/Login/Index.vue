<script>
export default {
    name: 'LoginIndex'
}
</script>
<script setup>
import {authInProgress} from "src/services/helpers";
import {changeLanguage} from "boot/languageManager";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "stores/auth-store";
import LayOut from "pages/Auth/LayOut";
import {nextTick, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useQuasar} from "quasar";
import {api} from "boot/axios";


const $q = useQuasar()
const {t} = useI18n()
const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

const inProgress = authInProgress(authStore)

const disabled = ref(false)
const loading = ref(false)
const errors = ref({})
const username = ref()
const formEl = ref()
const form = ref({
    username: '09210387161'
})


const submit = async () => {
    errors.value = {}
    await authStore.$reset()

    await formEl.value.validate()
        .then(state => {
            if (state) {
                loading.value = true

                api.post('/login/validate', form.value)
                    .then(async res => {
                        if (res.data.ok) {
                            authStore.auth.mode = 'password'
                            authStore.auth.data = form.value
                            authStore.auth.expiry = res.data.expiry

                            await router.push({ name: 'login.pwd', query: route.query })

                            // await logInUser(res.data.user)
                            // await router.push({ path: (route.query?._back || null) ?? res.data.location })
                        }
                    })
                    .catch(( {response} ) => {

                        if (response.status === 404) {
                            errors.value = { username: [ response.data.message ] }
                        }
                        else if (response.status === 429) {
                            errors.value = { username: [ response.data.message ] }
                            disabled.value = true

                            $q.notify({
                                message: response.data.data.throttle_message,
                                type: 'negative',
                                position: $q.platform.is.mobile ? 'top' : 'bottom-left',
                                progress: true,
                                timeout: 6000,
                                group: 'nuts'
                            })

                            setTimeout(() => {
                                disabled.value = false
                                errors.value = {}
                                username.value?.focus()

                                $q.notify({
                                    message: "هم اکنون می‌توانید دوباره برای ورود تلاش کنید.",
                                    type: 'info',
                                    position: $q.platform.is.mobile ? 'top' : 'bottom-left',
                                    progress: true,
                                    timeout: 5000
                                })

                            }, response.data.data.throttle_time_left * 1000)
                        }
                        else {
                            errors.value = response.data.errors
                        }

                    })
                    .finally(() => {
                        loading.value = false
                        nextTick(() => {
                            username.value?.focus()
                        })
                    })
            }
        })
}


if ( inProgress ) {
    $q.notify({
        message: t('auth.continueLogin'),
        progress: true,
        timeout: 12000,
        icon: 'phone_iphone',
        position: $q.platform.is.mobile ? 'top' : 'bottom-left',
        actions: [
            {
                label: t('auth.continueLoginAction'), color: 'yellow', class: 'q-ml-lg', handler: () => {
                    if (authStore.auth.mode === 'password')
                        router.replace({ name: 'login.pwd', query: route.query })
                    else if ( (authStore.auth.mode ?? '0').startsWith('verify.') )
                        router.replace({ name: 'verify', query: route.query })
                    else
                        router.replace({ name: 'login', query: route.query })
                }
            }
        ]
    })
}

const localeOptions = ref([
    { value: 'en-US', label: 'English' },
    { value: 'fa-IR', label: 'فارسی' }
])
</script>

<template>
    <lay-out>
        <template #title>{{ $t('common.logIntoAccount') }}</template>

        <q-select
            :model-value="$q.lang.isoName"
            @update:model-value="changeLanguage"
            :options="localeOptions"
            label="Quasar Language"
            dense
            borderless
            emit-value
            map-options
            options-dense
        />

        <q-form @submit.prevent="submit" ref="formEl">
            <q-input v-model="form.username"
                     @update:model-value="errors = {}"
                     ref="username"
                     color="accent"
                     type="tel"
                     unmasked-value
                     mask="####  ###  ##  ##"
                     :hint="$t('common.numberHint')"
                     :placeholder="$t('common.phoneNumber')"
                     dir="ltr"
                     outlined
                     rounded
                     autofocus
                     no-error-icon
                     :disable="loading"
                     :readonly="disabled"
                     :rules="[ val => !!val && val.length === 11 || $t('auth.phoneNumberError')]"
                     :error="!!errors.username"
                     :error-message="errors.username?.[0]"
            >
                <template #after>
                    <q-btn type="submit"
                           icon="fingerprint"
                           padding="14px"
                           round
                           :color="$q.dark.isActive ? 'accent' : 'white'"
                           :text-color="$q.dark.isActive ? 'white' : 'accent'"
                           :loading="loading"
                           :disable="disabled"
                           @click="submit"
                    />
                </template>

            </q-input>

        </q-form>


        <template #footer>
            <span class="text-body2">
                {{ $t('auth.login.question') }}
                <span class="q-ml-sm text-brand">
                    <router-link
                        class="link"
                        :to="{ name: 'register', query: route.query }"
                        v-text="$t('common.register')"
                    >
                    </router-link>
                </span>
            </span>
        </template>

    </lay-out>
</template>
