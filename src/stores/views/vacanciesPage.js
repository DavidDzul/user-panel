import { defineStore, storeToRefs } from "pinia";
import { useVacanciesStore } from "@/stores/api/vacaciesStore";
import { useAuthStore } from "@/stores/api/authStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router"

export const useVacanciesPageStore = defineStore("vacanciesPage", () => {
    const { setLoading } = useAppStore();
    const { resVacancies } = storeToRefs(useVacanciesStore());
    const { userProfile } = storeToRefs(useAuthStore())

    const { fetchVacantList
    } = useVacanciesStore();

    const vacantDetailDialog = ref(false)
    const router = useRouter()

    onBeforeMount(async () => {
        await fetchVacantList()
    })

    const vacancies = computed(() => [...resVacancies.value.values()])
    const userType = computed(() => userProfile.value.user_type);

    const openVacantDetail = (id) => {
        router.push("vacantes/" + id)
    }

    return {
        userType,
        vacancies,
        vacantDetailDialog,
        openVacantDetail,
    };
});