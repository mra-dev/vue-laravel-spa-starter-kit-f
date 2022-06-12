import {useAuthStore} from "stores/auth-store";
const authStore = useAuthStore()


const exists = (permission) => authStore.permissions.includes(permission)

const can = permission => exists(permission)
const cant = permission => !exists(permission)

const hasAny = permissions => {
    let t = permissions.forEach(p => exists(p))
    console.log(t)
}

export { can, cant }
