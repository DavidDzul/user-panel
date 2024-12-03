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


    return {
        resVacancies,
        createVacant,
        fetchVacancies
    };
});