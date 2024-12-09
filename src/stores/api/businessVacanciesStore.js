import axios from "@/axiosConfig";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert"

export const useBusinessVacanciesStore = defineStore("businessVacanciesStore", () => {
    const router = useRouter();
    const { showAlert } = useAlertStore()
    const resVacancies = ref(new Map())

    const fetchVacancies = async () => {
        try {
            const res = await axios.get("api/fetchVacancies", {
                headers: { 'accept': 'application/json' }
            });
            resVacancies.value = new Map(res.data.vacancies.map((m) => [m.id, m]))
            return res.data
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const createVacant = async (form) => {
        try {
            const param = await axios.post("api/createVacant", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información guardada exitosamente.",
                    status: "success",
                });

                resVacancies.value.set(param.data.createVacant.id, param.data.createVacant)
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

    const updateVacant = async (form) => {
        try {
            const param = await axios.post("api/updateVacant", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información actualizada exitosamente.",
                    status: "success",
                });

                resVacancies.value.set(param.data.updateVacant.id, param.data.updateVacant)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al actualizar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const removeVacant = async (id) => {
        try {
            const param = await axios.delete(`api/deleteVacant/${id}`, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información eliminada exitosamente.",
                    status: "success",
                });
                resVacancies.value.delete(id)
                return param.data.res
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

    const statusVacant = async (id) => {
        try {
            const param = await axios.post(`api/updateStatusVacant/${id}`, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Estatus actualizado exitosamente.",
                    status: "success",
                });
                resVacancies.value.set(param.data.vacant.id, param.data.vacant)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al actualizar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    return {
        resVacancies,
        createVacant,
        updateVacant,
        removeVacant,
        statusVacant,
        fetchVacancies
    };
});