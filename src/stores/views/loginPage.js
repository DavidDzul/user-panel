import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/api/authStore";
import { useAppStore } from "@/stores/app";
import { ref } from "vue";

export const useLoginPageStore = defineStore("loginPage", () => {
    const { setLoading } = useAppStore();
    const { login } = useAuthStore();


    const loading = ref(false)
    const userLoginDialog = ref(false)

    const onLogin = async (email, password) => {
        loading.value = true
        try {
            if (email && password) {
                await login(email, password);
            }
        } catch (e) {
            console.error("Error en onLogin:", e);
        } finally {
            loading.value = false
        }
    };

    const openUserLoginDialog = () => {
        userLoginDialog.value = true
    }

    return {
        loading,
        userLoginDialog,
        onLogin,
        openUserLoginDialog,
    };
});