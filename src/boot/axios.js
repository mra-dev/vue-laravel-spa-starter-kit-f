import {boot} from 'quasar/wrappers'
import axios from 'axios'
import Cookies from 'js-cookie';

import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()

import { useAppStore } from "stores/app-store";
const appStore = useAppStore()

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)


axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: location.protocol + '//' + (process.env.DEV ? '' : 'api.') + location.hostname + (process.env.DEV ? ':8000' : ''),
    maxRedirects: 0
})

const requestHandler = request => {
    if (
        (
            request.method === 'post' ||
            request.method === 'put' ||
            request.method === "delete"
        )
        &&
        !Cookies.get('XSRF-TOKEN')
    )
    {
        return api.get('/sanctum/csrf-cookie')
            .then(res => request)
    }

    return request
};
const responseHandler = response => {
    // if (response.status === 302) {
    // }

    return response
};
const errorHandler = error => {
    if (error.response.status === 401) {
        // logout user automatically
        authStore.$reset()
        appStore.loggedOut = true

        // Can be omitted duo to adding a login dialog in purpose of not losing page user entered data (alike WordPress)
        route.push({ name: 'login', query: { _back: route.currentRoute.value.fullPath } })
    }

    return Promise.reject(error)
};
api.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);
api.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

let route = null

export default boot(({app, router}) => {
    route = router

    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
})

export {api, axios}
