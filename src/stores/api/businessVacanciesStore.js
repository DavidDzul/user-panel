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
                    title: param.data.msg || "Información guardada exitosamente.",
                    status: "success",
                });

                resVacancies.value.set(param.data.createVacant.id, param.data.createVacant);
                return param.data.res;
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

    const updateVacant = async (id, form) => {
        try {
            const param = await axios.put(`api/updateVacant/${id}`, form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información actualizada exitosamente.",
                    status: "success",
                });

                resVacancies.value.set(param.data.updateVacant.id, param.data.updateVacant)
                return param.data.res;
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al actualizar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    };

    const createPractice = async (form) => {
        try {
            const param = await axios.post("api/createPractice", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información guardada exitosamente.",
                    status: "success",
                });

                resVacancies.value.set(param.data.createPractice.id, param.data.createPractice)
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

    const updatePractice = async (id, form) => {
        try {
            const param = await axios.put(`api/updatePractice/${id}`, form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información actualizada exitosamente.",
                    status: "success",
                });

                resVacancies.value.set(param.data.updatePractice.id, param.data.updatePractice)
                return param.data.res;
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al actualizar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    };

    const statusVacant = async (id, candidateType) => {
        try {
            const response = await axios.put(`api/updateVacantStatus/${id}`, { candidate_type: candidateType }, {
                headers: { 'accept': 'application/json' },
            });
            if (response.data.res) {
                showAlert({
                    title: "Estatus actualizado exitosamente.",
                    status: "success",
                });
                // resVacancies.value.set(response.data.vacant.id, response.data.vacant);
                resVacancies.value.delete(id)
                return response.data.res;
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al actualizar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    };

    return {
        resVacancies,
        createVacant,
        updateVacant,
        statusVacant,
        createPractice,
        updatePractice,
        fetchVacancies
    };
});