import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/api/authStore";
import { useAppStore } from "@/stores/app";
import { ref } from "vue";

export const useLoginPageStore = defineStore("loginPage", () => {
    const { setLoading } = useAppStore();
    const { login } = useAuthStore();

    const email = ref("");
    const password = ref("");
    const loading = ref(false)

    const onLogin = async () => {
        loading.value = true
        try {
            if (email.value && password.value) {
                await login(email.value, password.value);
            }
        } catch (e) {
            console.error("Error en onLogin:", e);
        } finally {
            loading.value = false
        }
    };

    return {
        email,
        password,
        loading,
        onLogin,
    };
});