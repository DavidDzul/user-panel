import axios from "@/axiosConfig";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert"

export const useVacanciesStore = defineStore("vacanciesStore", () => {
    const router = useRouter();
    const { showAlert } = useAlertStore()
    const resVacancies = ref(new Map())
    const resVacantDetail = ref(null)

    const fetchVacantList = async () => {
        try {
            const res = await axios.get("api/fetchVacantList", {
                headers: { 'accept': 'application/json' }
            });
            resVacancies.value = res.data.vacancies;
            return res.data
        } catch (error) {
            console.error("Error en vacantes:", error);
        }
    };

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

    return {
        resVacancies,
        resVacantDetail,
        fetchVacantList,
        getVacantDetail
    };
});