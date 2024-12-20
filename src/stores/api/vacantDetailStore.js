import axios from "@/axiosConfig";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert"

export const useVacantDetailStore = defineStore("vacantDetailStore", () => {
    const router = useRouter();
    const { showAlert } = useAlertStore()
    const resVacantDetail = ref(null)

    const getVacantDetail = async (id) => {
        try {
            const res = await axios.get(`api/getVacant/${id}`, {
                headers: { 'accept': 'application/json' }
            });
            console.log(res)
            resVacantDetail.value = res.data.vacant;
            return res.data
        } catch (error) {
            console.error("Error al obtener la vacante:", error);
        }
    };


    return {
        resVacantDetail,
        getVacantDetail
    };
});