<script>
export default {
    name: 'RegisterPage'
}
</script>
<script setup>
import LayOut from "pages/Auth/LayOut";
import {logInUser} from "src/services/authManager";
import {computed, ref} from "vue";
import {api} from "boot/axios";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()

const loading = ref(false)


const password = ref('password')
const username = ref()
const isUsernameOk = computed(() => username.value ? username.value.modelValue ? !username.value.hasError : false : false)

const formEl = ref()
const form = ref({
    firstname: null,
    lastname: null,
    username: null,
    password: null,
})

const register = async () => {

    await formEl.value.validate()
        .then(state => {
            if (state) {
                loading.value = true

                api.post('/register', form.value)
                    .then(async res => {
                        console.log(res)

                        if (res.data.ok && res.data.redirect) {
                            await logInUser(res.data.user)
                            await router.push({ path: (route.query?._back || null) ?? res.data.location })
                        }
                    })
                    .catch((e) => {
                        // alert(e.response)
                    })
                    .finally(() => {
                        loading.value = false
                    })
            }
        })
}
</script>

<template>
    <lay-out>
        <template #title>ثبت نام</template>

        <q-form @submit.prevent="register" ref="formEl" class="q-gutter-md">

            <q-input v-model="form.username"
                     ref="username"
                     color="accent"
                     type="tel"
                     unmasked-value
                     mask="##  ###  ##  ##"
                     hint="نمونه: ۶۴ ۷۳ ۴۳۳ ۰۹۱۲"
                     placeholder="شماره همراه"
                     dir="ltr"
                     outlined
                     rounded
                     autofocus
                     :rules="[ val => !!val && val.length === 9 || 'یک شماره تلفن معتبر وارد کنید']"
                     no-error-icon
            >
                <template #append>
                    <small style="font-size: 15px">09</small>
                </template>
                <template #prepend>
                    <q-icon name="done_outline" color="accent" v-if="isUsernameOk" />
                </template>
            </q-input>

            <q-input v-model="form.firstname"
                     color="accent"
                     hint="نمونه: محمدرضا"
                     placeholder="نام کوچک"
                     outlined
                     rounded
                     no-error-icon
                     class="text-body1"
                     :rules="[ val => !!val || 'نام کوچکتان را درست وارد کنید']"
            >
            </q-input>

            <q-input v-model="form.lastname"
                     color="accent"
                     hint="نمونه: عربی"
                     placeholder="نام خانوادگی"
                     outlined
                     rounded
                     no-error-icon
                     class="text-body1"
                     :rules="[ val => !!val || 'نام خانوادگی خود را درست وارد کنید']"
            >
            </q-input>

            <q-input v-model="form.password"
                     :type="password"
                     color="accent"
                     placeholder="رمز عبور"
                     outlined
                     rounded
                     no-error-icon
                     class="text-body1"
                     :rules="[ val => !!val || 'یک رمز عبور قوی وارد کنید']"
            >
                <template #append>
                    <q-btn round icon="visibility" @click="password = 'text'" v-if="password === 'password'"></q-btn>
                    <q-btn round icon="visibility_off" @click="password = 'password'" v-else></q-btn>
                </template>
            </q-input>

            <div class="q-mt-xl">
                <q-btn type="submit"
                       :ripple="{ color: 'black' }"
                       class="full-width text-body1"
                       color="accent"
                       :loading="loading"
                       rounded
                       :to="{ name: 'verify', query: route.query }"
                >ثبت نام</q-btn>
            </div>

        </q-form>

        <template #footer>
            <span class="text-body2">
                میخوای وارد حسابت بشی ؟
                <span class="q-ml-sm text-brand">
                    <router-link
                        class="link"
                        :to="{ name: 'login', query: route.query }"
                    >
                        ورود
                    </router-link>
                </span>
            </span>
        </template>

    </lay-out>
</template>
