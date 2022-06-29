import {useAuthStore} from "stores/auth-store";
const authStore = useAuthStore()


const exists = (permission) => authStore.permissions.includes(permission)

const can = permission => exists(permission)
const cant = permission => !exists(permission)

const hasAny = permissions => {
    for (const perm of permissions) {
        if (exists(perm)) {
            return true
        }
    }
    return false
}

export { can, cant, hasAny }
