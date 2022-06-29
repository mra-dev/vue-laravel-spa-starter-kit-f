<script>
export default {
    name: 'DashboardIndexPage'
}
</script>
<script setup>
import {onMounted} from "vue";
import {api} from "boot/axios";
import {useRoute} from "vue-router";
import {hasAny} from "src/services/accessManager";
import {useQuasar} from "quasar";

const route = useRoute()

const $q = useQuasar()

onMounted(async () => {

    $q.dark.set(true)

    await api.get('/api/user').then(res => {
        console.log('User: ', res.data)
    })

    console.log(
        'hasAny => ',
        hasAny([
            'user edit',
            'user delete',
            'user update'
        ])
    )

})
</script>

<template>
    <q-page class="flex column flex-center q-pa-md">
        <q-btn :to="{ name: route.name === 'dashboard' ? 'home' : 'dashboard' }">
            {{ route.name === 'dashboard' ? 'صفحه اصلی' : 'داشبورد' }}
        </q-btn>

        <br>

        <q-btn v-if="$can('user edit')">Can Edit Users</q-btn>
    </q-page>
</template>
