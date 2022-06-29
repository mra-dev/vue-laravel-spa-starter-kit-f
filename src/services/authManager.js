import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()


const logInUser = async (user) => {
    await authStore.setUser(user)
    await authStore.logIn()
    await authStore.setPermissions([
        'user list',
        'user show',
        // 'user edit',
        'user update',
        // 'user delete',
    ])
}

export { logInUser }
