<script>
export default {
    name: 'LoginIndex'
}
</script>
<script setup>
import {logInUser} from "src/services/authManager";
import {useRoute, useRouter} from "vue-router";
import LayOut from "pages/Auth/LayOut";
import {computed, nextTick, ref} from "vue";
import {api} from "boot/axios";
import {useAuthStore} from "stores/auth-store";
import {storeToRefs} from "pinia";
import {useQuasar} from "quasar";


const $q = useQuasar()

const authStore = useAuthStore()

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const errors = ref({})

const username = ref()

const formEl = ref()
const form = ref({
    username: '09124442547'
})


const logIn = async () => {
    errors.value = {}
    await authStore.$reset()

    await formEl.value.validate()
        .then(state => {
            if (state) {
                loading.value = true

                api.post('/login/validate', form.value)
                    .then(async res => {
                        if (res.data.ok) {
                            authStore.auth.mode = 'login'
                            authStore.auth.data = form.value
                            authStore.auth.expiry = res.data.expiry

                            // await logInUser(res.data.user)
                            // await router.push({ path: (route.query?._back || null) ?? res.data.location })
                        }
                    })
                    .catch(( {response} ) => {
                        errors.value = response.data.errors

                        if (response.status === 429) {
                            errors.value = { username: [ response.data.message ] }
                            $q.notify({
                                message: response.data.data.throttle_message,
                                type: 'negative',
                                position: $q.platform.is.mobile ? 'top' : 'bottom-left',
                                progress: true,
                                timeout: 6000
                            })
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
</script>

<template>
    <lay-out>
        <template #title>ورود به حساب</template>


        <q-form @submit.prevent="logIn" ref="formEl">
            <q-input v-model="form.username"
                     @update:model-value="errors = {}"
                     ref="username"
                     color="accent"
                     type="tel"
                     unmasked-value
                     mask="####  ###  ##  ##"
                     hint="نمونه: ۶۴ ۷۳ ۴۳۳ ۰۹۱۲"
                     placeholder="شماره همراه"
                     dir="ltr"
                     outlined
                     rounded
                     autofocus
                     no-error-icon
                     :disable="loading"
                     :rules="[ val => !!val && val.length === 11 || 'یک شماره تلفن معتبر وارد کنید']"
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
                           @click="logIn"
                    />
                </template>

            </q-input>

        </q-form>


        <template #footer>
            <span class="text-body2">
                حساب کاربری نداری ؟
                <span class="q-ml-sm text-brand">
                    <router-link
                        class="link"
                        :to="{ name: 'register', query: route.query }"
                    >
                        ثبت نام
                    </router-link>
                </span>
            </span>
        </template>

    </lay-out>
</template>
