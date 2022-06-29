<script>
export default {
    name: 'LayOut'
}
</script>
<script setup>
import {useRoute} from "vue-router";
const route = useRoute()
</script>

<template>
    <q-card class="my-card transparent" flat>

        <q-card-section class="flex flex-center row q-mb-lg">
            <q-toolbar-title style="font-weight: bold !important;" class="text-center text-bold text-h4 ">
                <slot name="title" />
            </q-toolbar-title>
        </q-card-section>

        <q-card-section>
            <slot />
        </q-card-section>

        <q-card-section class="flex flex-center q-mt-xl">
            <slot name="footer" />
        </q-card-section>

    </q-card>
</template>

<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 350px
</style>
