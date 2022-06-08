import { useAuthStore } from "stores/auth-store";
const authStore = useAuthStore()


const logInUser = async (user) => {
    await authStore.setUser(user)
    await authStore.logIn()
}

export { logInUser }
