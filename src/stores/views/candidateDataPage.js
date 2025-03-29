import { defineStore, storeToRefs } from "pinia";
import { useCandidateDataStore } from "@/stores/api/candidateDataStore";
import { useAuthStore } from "@/stores/api/authStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router"

export const useCandidateDataPageStore = defineStore("candidateDataPage", () => {
    const { setLoading } = useAppStore();
    const { resData } = storeToRefs(useCandidateDataStore());

    const { fetchCandidateData
    } = useCandidateDataStore();

    onBeforeMount(async () => {
        await fetchCandidateData()
    })

    const data = computed(() => resData.value);


    return {
        data,
    };
});