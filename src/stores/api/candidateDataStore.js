import axios from "@/axiosConfig";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert"

export const useCandidateDataStore = defineStore("candidateDataStore", () => {
    const router = useRouter();
    const { showAlert } = useAlertStore()
    const resData = ref(null)

    const fetchCandidateData = async () => {
        try {
            const res = await axios.get("api/candidateData", {
                headers: { 'accept': 'application/json' }
            });
            resData.value = res.data.result;
            return res.data
        } catch (error) {
            console.error("Error en vacantes:", error);
        }
    };


    return {
        resData,
        fetchCandidateData,
    };
});