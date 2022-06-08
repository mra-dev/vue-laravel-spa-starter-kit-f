<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title v-html="title"></q-toolbar-title>

                <guest-menu />
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script setup>

import {storeToRefs} from "pinia";
import {useQuasar} from "quasar";
import {onMounted} from "vue";

import {useAppStore} from "stores/app-store";
const { title, loading } = storeToRefs(useAppStore())

import GuestMenu from "components/GuestMenu";
import titleMarquee from "src/services/titleMarquee";

const $q = useQuasar()
$q.dark.set(true)

onMounted(() => {
    titleMarquee()
})
</script>

<script>
export default {
    name: 'GuestLayout'
}
</script>
