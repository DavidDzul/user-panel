import axios from "@/axiosConfig";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert"

export const useApplicationsStore = defineStore("applicationsStore", () => {
    const router = useRouter();
    const { showAlert } = useAlertStore()
    const resBusinessApplications = ref(new Map())
    const resUserApplications = ref(new Map())

    const fetchBusinessApplications = async () => {
        try {
            const res = await axios.get("api/fetchBusinessApplications", {
                headers: { 'accept': 'application/json' }
            });
            resBusinessApplications.value = new Map(res.data.applications.map((m) => [m.id, m]))
            return res.data
        } catch (error) {
            console.error("Error en vacantes:", error);
        }
    };

    const fetchUserApplications = async () => {
        try {
            const res = await axios.get("api/fetchUserApplications", {
                headers: { 'accept': 'application/json' }
            });
            resUserApplications.value = new Map(res.data.applications.map((m) => [m.id, m]))
            return res.data
        } catch (error) {
            console.error("Error en vacantes:", error);
        }
    };

    const removeApplication = async (id) => {
        try {
            const param = await axios.delete(`api/deleteApplication/${id}`, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información eliminada exitosamente.",
                    status: "success",
                });
                resBusinessApplications.value.delete(id)
                return param.data
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al eliminar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const removeUserApplication = async (id) => {
        try {
            const param = await axios.delete(`api/deleteApplication/${id}`, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información eliminada exitosamente.",
                    status: "success",
                });
                resUserApplications.value.delete(id)
                return param.data
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al eliminar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    return {
        resBusinessApplications,
        resUserApplications,
        fetchBusinessApplications,
        fetchUserApplications,
        removeApplication,
        removeUserApplication,
    };
});