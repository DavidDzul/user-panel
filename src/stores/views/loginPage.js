import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/api/authStore";
import { useAppStore } from "@/stores/app";
import { ref } from "vue";

export const useLoginPageStore = defineStore("loginPage", () => {
    const { setLoading } = useAppStore();
    const { login, enrollmentLogin } = useAuthStore();

    const loading = ref(false)
    const userLoginDialog = ref(false)
    const businessLoginDialog = ref(false)

    const onLogin = async (email, password) => {
        setLoading(true)
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
        setLoading(false)
    };

    const onLoginEnrollment = async (enrollment, password) => {
        setLoading(true)
        loading.value = true
        try {
            if (enrollment && password) {
                await enrollmentLogin(enrollment, password);
            }
        } catch (e) {
            console.error("Error en onLogin:", e);
        } finally {
            loading.value = false
        }
        setLoading(false)
    }

    const openUserLoginDialog = () => {
        userLoginDialog.value = true
    }

    const openBusinessLoginDialog = () => {
        businessLoginDialog.value = true
    }

    return {
        loading,
        userLoginDialog,
        businessLoginDialog,
        onLogin,
        onLoginEnrollment,
        openUserLoginDialog,
        openBusinessLoginDialog
    };
});