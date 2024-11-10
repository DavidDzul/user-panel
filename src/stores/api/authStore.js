import axios from "@/axiosConfig";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("authStore", () => {
    const router = useRouter();

    const loggedUser = ref(false);
    const userProfile = ref(null);
    const token = ref(""); // Variable reactiva de token

    const login = async (email, password) => {
        const credentials = { email, password };
        try {
            await axios.get("sanctum/csrf-cookie");
            const res = await axios.post("api/login", credentials, {
                headers: { 'accept': 'application/json' }
            }, { withCredentials: true });
            token.value = res.data.token; // Guarda el token en la variable reactiva
            localStorage.setItem("token", token.value);
            await router.push({ path: "/" });
        } catch (error) {
            console.error("Error en login:", error);
        }
    };

    const logout = async () => {
        await axios.post("api/logout").then(async () => {
            loggedUser.value = false;
            userProfile.value = null;
            token.value = "";
            localStorage.removeItem('token')
            await router.push({ path: "/auth/login" });
        }).catch((error) => {
            console.log(error)
        });
    }

    const getProfile = async (authToken) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        await axios.get("sanctum/csrf-cookie");
        await axios
            .get("api/user")
            .then((res) => {
                loggedUser.value = true;
                userProfile.value = res.data;
                token.value = authToken;
            })
            .catch((error) => {
                console.error("Error al obtener el perfil:", error);
            });
    };

    const userInitials = computed(() => `${userProfile?.value?.firstName.charAt(0) || ""}${userProfile?.value?.lastName.charAt(0) || ""}`)

    const fullName = computed(() => `${userProfile?.value?.firstName || ""} ${userProfile?.value?.lastName || ""}`)


    return {
        login,
        logout,
        getProfile,
        token,
        fullName,
        loggedUser,
        userProfile,
        userInitials,
    };
});