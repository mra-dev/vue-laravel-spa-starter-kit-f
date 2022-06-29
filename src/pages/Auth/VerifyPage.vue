<script>
export default {
    name: 'VerifyPage'
}
</script>
<script setup>
import LayOut from "pages/Auth/LayOut";
import CodeInput from "components/CodeInput";
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<template>
    <lay-out>
        <template #title>تایید هویت</template>


        <q-page-sticky position="top-left" :offset="[15, 15]">
<!--            <q-btn round size="lg" flat color="accent" icon="arrow_forward" :to="{  }" />-->
        </q-page-sticky>


        <code-input
            @complete="completed"
            @change="complete = false"
            @submit="btn.click()"
            :fields="5"
            :required="true"
        />

        <q-btn ref="btn" color="primary" :disable="!complete" :loading="form.processing" @click="submit">
            <span v-if="mode === 'login'">ورود</span>
            <span v-else>ادامه</span>
        </q-btn>

        <template #footer>
            <span class="text-body2 text-brand">
                <router-link
                    class="link"
                    :to="{ name: 'login', query: route.query }"
                >
                    ورود با پیامک تایید
                </router-link>
            </span>
        </template>

    </lay-out>
</template>
