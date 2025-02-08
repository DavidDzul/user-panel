import axios from "@/axiosConfig";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert"

export const useAuthStore = defineStore("authStore", () => {
    const router = useRouter();
    const { showAlert } = useAlertStore()

    const token = ref("");
    const loggedUser = ref(false);
    const userProfile = ref(null);
    const permissions = ref([])
    const openUserProfileDialog = ref(false)

    const openUserDialog = () => {
        openUserProfileDialog.value = true;
    };

    const login = async (email, password) => {
        const credentials = { email, password };
        try {
            await axios.get("sanctum/csrf-cookie");
            const res = await axios.post("api/login", credentials, {
                headers: { 'accept': 'application/json' }
            }, { withCredentials: true });
            token.value = res.data.token;
            localStorage.setItem("token", token.value);
            await getUserPermissions(res.data.token)
            await router.push({ path: "/" });
        } catch (error) {
            console.error("Error en login:", error);
            showAlert({
                title: "Error al iniciar sesión, verifica tu usuario y/o contraseña.",
                status: "error",
            })
        }
    };

    const enrollmentLogin = async (enrollment, password) => {
        const credentials = { enrollment, password };
        try {
            await axios.get("sanctum/csrf-cookie");
            const res = await axios.post("api/enrollmentLogin", credentials, {
                headers: { 'accept': 'application/json' }
            }, { withCredentials: true });
            token.value = res.data.token;
            localStorage.setItem("token", token.value);
            await getUserPermissions(res.data.token)
            await router.push({ path: "/" });
        } catch (error) {
            console.error("Error en login:", error);
            showAlert({
                title: "Error al iniciar sesión, verifica tu usuario y/o contraseña.",
                status: "error",
            })
        }
    };

    const logout = async () => {
        await axios.post("api/logout").then(async () => {
            loggedUser.value = false;
            userProfile.value = null;
            token.value = "";
            localStorage.removeItem('token')
            await router.push({ path: "/login" });
        }).catch((error) => {
            showAlert({
                title: "Error al cerrar sesión.",
                status: "error",
            })
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

    const updateUserProfile = async (form) => {
        try {
            const param = await axios.post("api/updateUser", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información guardada exitosamente.",
                    status: "success",
                });
                userProfile.value = param.data.user
                openUserProfileDialog.value = false
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al guardar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const getUserPermissions = async (authToken) => {
        try {
            const response = await axios.get("/api/user/permissions", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });

            permissions.value = response.data.permissions;
            return permissions;
        } catch (error) {
            console.error("Error fetching user permissions:", error);
            return [];
        }
    };

    const userInitials = computed(() => `${userProfile?.value?.first_name.charAt(0) || ""}${userProfile?.value?.last_name.charAt(0) || ""}`)
    const fullName = computed(() => `${userProfile?.value?.first_name || ""} ${userProfile?.value?.last_name || ""}`)
    const userType = computed(() => userProfile.value?.user_type)
    const userRole = computed(() => userProfile.value?.role)

    return {
        login,
        logout,
        getProfile,
        openUserDialog,
        enrollmentLogin,
        updateUserProfile,
        getUserPermissions,
        token,
        userRole,
        userType,
        fullName,
        loggedUser,
        permissions,
        userProfile,
        userInitials,
        openUserProfileDialog,
    };
});