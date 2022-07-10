<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <q-page class="fit row wrap justify-center items-stretch content-stretch">

                <div class="col flex flex-center q-pa-md">
                    <transition name="slide-fade">
                        <router-view />
                    </transition>
                </div>
                <div class="col gt-sm flex flex-center q-pa-md window-height">
                    <img src="~assets/Auth/Auth.svg" class="full-height full-width" alt="">
                </div>

                <q-page-sticky position="bottom-right" :offset="[18, 18]">
                    <q-btn fab dense color="grey-3" class="text-black" icon="dark_mode" v-if="!$q.dark.isActive" @click="setTheme()" />
                    <q-btn fab dense color="blue-grey-10" icon="light_mode" v-else @click="setTheme(false)" />
                </q-page-sticky>

            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useQuasar} from "quasar";
import {onMounted} from "vue";
import {setTheme} from "boot/themeManager";

import {useAppStore} from "stores/app-store";
const { title, loading } = storeToRefs(useAppStore())

// import GuestMenu from "components/GuestMenu";
// import titleMarquee from "src/services/titleMarquee";

const $q = useQuasar()
// $q.dark.set(true)

onMounted(() => {
    // $q.fullscreen.request()
    //     .then(() => {
    //         // success!
    //     })
    //     .catch(err => {
    //         // oh, no!!!
    //     })
})
</script>

<script>
export default {
    name: 'GuestLayout'
}
</script>
