<script>
export default {
    name: 'GuestMenu'
}
</script>
<script setup>
import {storeToRefs} from "pinia";

import {useAuthStore} from "stores/auth-store";
const { isLoggedIn } = storeToRefs(useAuthStore())

import {useQuasar} from "quasar";
const $q = useQuasar()
defineExpose({
    $q,
})
</script>

<template>
    <q-btn flat round dense icon="more_vert">
        <q-menu
            transition-show="jump-left"
            transition-hide="fade"
            self="top right"
            anchor="center middle"
        >
            <q-list style="min-width: 200px;">
                <template v-if="isLoggedIn">
                    <q-item clickable>
                        <q-item-section>حساب کاربری</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable>
                        <q-item-section class="text-red">خروج</q-item-section>
                    </q-item>
                </template>

                <template v-else>
                    <q-item clickable :to="{ name: 'login' }" exact exact-active-class="disabled" v-ripple>
                        <q-item-section>ورود به حساب</q-item-section>
                    </q-item>
                    <q-item clickable :to="{ name: 'register' }" exact exact-active-class="disabled" v-ripple>
                        <q-item-section>فعالسازی حساب</q-item-section>
                    </q-item>
                </template>
            </q-list>
        </q-menu>
    </q-btn>
</template>
