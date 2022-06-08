<script>
export default {
    name: 'DashboardIndexPage'
}
</script>
<script setup>
import {onMounted} from "vue";
import {api} from "boot/axios";
import {useRoute} from "vue-router";

const route = useRoute()

onMounted(async () => {
    await api.get('/api/user').then(res => {
        console.log('User: ', res.data)
    })
})
</script>

<template>
    <q-page class="flex column flex-center q-pa-md">
        <div class="q-gutter-md">
            <q-btn :to="{ name: route.name === 'dashboard' ? 'home' : 'dashboard' }">
                {{ route.name === 'dashboard' ? 'Home' : 'Dashboard' }}
            </q-btn>
        </div>
    </q-page>
</template>

<style scoped>
</style>
