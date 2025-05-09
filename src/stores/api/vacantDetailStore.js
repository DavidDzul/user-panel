import axios from "@/axiosConfig";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert"
import { useApplicationsStore } from "./applicationsStore";

export const useVacantDetailStore = defineStore("vacantDetailStore", () => {
    const router = useRouter();
    const { showAlert } = useAlertStore()
    const resVacantDetail = ref(null)
    const { resUserApplications } = storeToRefs(useApplicationsStore())

    const getVacantDetail = async (id) => {
        try {
            const res = await axios.get(`api/getVacant/${id}`, {
                headers: { 'accept': 'application/json' }
            });
            resVacantDetail.value = res.data.vacant;
            return res.data
        } catch (error) {
            console.error("Error al obtener la vacante:", error);
        }
    };

    const createApplication = async (form) => {
        try {
            const param = await axios.post("api/createApplication", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: param.data.msg || "Información guardada exitosamente.",
                    status: "success",
                });
                resUserApplications.value.set(param.data.application.id, param.data.application)
                return true;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.msg || "Error al guardar la información, intente nuevamente.";
            showAlert({
                title: errorMessage,
                status: "error",
            });

            throw error;
        }
    };


    return {
        resVacantDetail,
        getVacantDetail,
        createApplication,
    };
});