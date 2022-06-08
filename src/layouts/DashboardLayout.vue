<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleLeftDrawer"
                />

                <q-toolbar-title v-html="title"></q-toolbar-title>

                <div>Quasar v{{ $q.version }}</div>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            persistent
        >
            <q-list>
                <q-item-label
                    header
                >
                    Essential Links
                </q-item-label>

                //
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script setup>

import {storeToRefs} from "pinia";
import {useQuasar} from "quasar";
import {onMounted, ref} from "vue";

import {useAppStore} from "stores/app-store";
const { title, loading } = storeToRefs(useAppStore())

import GuestMenu from "components/GuestMenu";
import titleMarquee from "src/services/titleMarquee";

const $q = useQuasar()
// $q.dark.set(true)

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(() => {
    titleMarquee()
})
</script>

<script>
export default {
    name: 'DashboardLayout'
}
</script>
