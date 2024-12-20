import { defineStore, storeToRefs } from "pinia";
import { useVacanciesStore } from "@/stores/api/vacaciesStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router"

export const useVacanciesPageStore = defineStore("vacanciesPage", () => {
    const { setLoading } = useAppStore();
    const { resVacancies } = storeToRefs(useVacanciesStore());

    const { fetchVacantList
    } = useVacanciesStore();

    const vacantDetailDialog = ref(false)
    const router = useRouter()

    onBeforeMount(async () => {
        await fetchVacantList()
    })

    const vacancies = computed(() => [...resVacancies.value.values()])

    const openVacantDetail = (id) => {
        router.push("vacantes/" + id)
    }

    return {
        vacancies,
        vacantDetailDialog,
        openVacantDetail,
    };
});