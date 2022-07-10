<script>
export default {
    name: 'VerifyPage'
}
</script>
<script setup>
import LayOut from "pages/Auth/LayOut";
import CodeInput from "components/CodeInput";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {useAuthStore} from "stores/auth-store";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {authInProgress, secondsToTime, remainingTime as remainingTimeHelper} from "src/services/helpers";
import {useQuasar} from "quasar";
import {jd} from "boot/dayjs";
import {api} from "boot/axios";
import {logInUser} from "src/services/authManager";



const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const {t} = useI18n()
const $q = useQuasar()

const inProgress = authInProgress(authStore, false)
const inProgressTimed = authInProgress(authStore)

let ok = false
const mode = computed(() => authStore.auth.mode.split('.')[1] ?? null)
const hasError = ref(false)
const verifying = ref(false)
const loading = ref(true)
const complete = ref(false)
const submitBtn = ref()
const timer = ref(null)
const remainingTime = ref('00:00')
const form = ref({
    username: authStore.auth.data?.username,
    token: null
})



const remainingSeconds = () => remainingTimeHelper(authStore.auth.expiry)

const setRemainingTime = () => {
    let rs = remainingSeconds()
    remainingTime.value = secondsToTime(rs)

    return rs
}

const startTimer = () => {
    if (authStore.auth.mode === "verify.login.sent" && authInProgress(authStore)) {
        let rs = setRemainingTime()

        timer.value = setInterval(() => {
            rs = setRemainingTime()
            if (rs <= 1) {
                clearInterval(timer.value)
                showExpiredNotify()
                returnBack()
            }
        }, 1000)
    }
}

const showExpiredNotify = () => {
    $q.notify({
        message: t('auth.verifyOtpExpired'),
        type: 'negative',
        position: $q.platform.is.mobile ? 'top' : 'bottom-left',
        timeout: 6000
    })
}

const completed = (v) => {
    complete.value = true
    // No need, I think. It's been set already at top L30
    // form.value.username = authStore.auth.data?.username
    form.value.token = v

    submit()
}

const returnBack = async () => {
    await clearInterval(timer.value)

    authStore.auth.mode = null
    authStore.auth.data = null
    authStore.auth.expiry = null

    await router.push({ name: 'login', query: route.query })
}

const sendOtpCode = () => {

    api.post(`/verify/${mode.value}/send`, {
        username: authStore.auth.data.username
    })
        .then(response => {
            $q.notify({
                type: response.data.notify,
                message: response.data.message,
                position: $q.platform.is.mobile ? 'top' : 'bottom-left'
            })

            authStore.auth.expiry = response.data.data.time_remaining
            authStore.auth.mode = 'verify.login.sent'
            startTimer()
        })
        .catch( ( {response} ) => {

            let message = ''
            if (response.status === 429) {
                message = response.data.data.throttle_message
            } else {
                message = response.data.message
            }

            $q.notify({
                type: 'negative',
                message,
                position: $q.platform.is.mobile ? 'top' : 'bottom-left'
            })

            returnBack()
        } )
        .finally(() => {
            loading.value = false
        })
}

const submit = async () => {
    if (complete.value) {

        verifying.value = true

        await api.post(`/verify/${mode.value}`, form.value)
            .then(async response => {
                $q.notify({
                    type: response.data.notify,
                    message: response.data.message,
                    position: $q.platform.is.mobile ? 'top' : 'bottom-left'
                })

                clearInterval(timer.value)

                if (response.data.ok) {
                    await authStore.$reset()
                    await logInUser(response.data.user)
                    await router.push({ path: (route.query?._back || null) ?? response.data.next })
                }
            })
            .catch( ({response}) => {
                $q.notify({
                    type: response.data?.notify ?? 'negative',
                    message: response.data.message,
                    position: $q.platform.is.mobile ? 'top' : 'bottom-left'
                })
            })
            .finally(() => {
                verifying.value = false
            })

    }
}



if ( !inProgress && !(authStore.auth.mode ?? '0').startsWith('verify.') )
    router.replace({ name: 'login', query: route.query })
else
    ok = true

if ( !inProgressTimed && (authStore.auth.mode ?? '0').endsWith('.sent') ) {
    showExpiredNotify()
    returnBack()
}



onMounted(() => {
    if (ok)
        sendOtpCode()
})

onUnmounted(async () => {
    await clearInterval(timer.value)
})
</script>

<template>
    <lay-out>
        <template #title>احراز پیامک تایید</template>

        <q-page-sticky position="top-left" :offset="[15, 15]">
            <q-btn round size="lg" flat color="accent" :icon="$q.lang.rtl ? `arrow_forward` : `arrow_back`" @click="returnBack"/>
        </q-page-sticky>

        <div class="flex justify-between q-my-md q-px-sm text-grey">
            <div>{{ $t('common.username') }} :</div>
            <div>{{ authStore.auth.data?.username }}</div>
        </div>

        <transition name="slide-fade">
            <div v-if="!loading">

                <code-input
                    @complete="completed"
                    @change="complete = false; hasError = false"
                    @submit="submitBtn.click()"
                    :disabled="verifying"
                    :fields="5"
                    :required="true"
                    :error="hasError"
                />

                <div class="flex flex-center q-mt-lg">
                    <q-btn ref="submitBtn" color="accent" :disable="!complete" :loading="verifying" @click="submit">
                        <span v-if="(authStore.auth.mode ?? '0').startsWith('verify.login')" v-text="$t('auth.verifyLoginButton')"></span>
                        <span v-else v-text="$t('auth.verifyRegisterButton')"></span>
                    </q-btn>
                </div>
            </div>
        </transition>

        <template #footer v-if="!loading">
            <span class="text-body2 text-brand">
                {{ $t('auth.verifyTimerTextPrefix') }}
                <span class="q-px-md">{{ remainingTime }}</span>
                {{ $t('auth.verifyTimerTextSuffix') }}
            </span>
        </template>

        <q-inner-loading color="accent" class="transparent text-accent" style="height: 100px" size="lg" showing :label="$t('auth.verify.sendingCode')" v-if="loading" />


    </lay-out>
</template>
