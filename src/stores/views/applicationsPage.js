import { defineStore, storeToRefs } from "pinia";
import { useApplicationsStore } from "@/stores/api/applicationsStore";
import { useCurriculumStore } from "@/stores/api/curriculumStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router"

export const useApplicationsPageStore = defineStore("applicationsPage", () => {
    const { setLoading } = useAppStore();
    const { resBusinessApplications } = storeToRefs(useApplicationsStore());

    const { fetchBusinessApplications, removeApplication
    } = useApplicationsStore();

    const { dowloandCurriculum } = useCurriculumStore()
    const router = useRouter()
    const loadingCV = ref(false)

    onBeforeMount(async () => {
        await fetchBusinessApplications()
    })

    const applications = computed(() => [...resBusinessApplications.value.values()])

    const openUserCV = async (userId) => {
        loadingCV.value = true
        try {
            await dowloandCurriculum(userId)
        } catch (error) {
            console.log(error)
        }
        loadingCV.value = false
    }

    const onRemoveApplication = async (id) => {
        try {
            await removeApplication(id)
        } catch (e) {
            console.error(e)
        }
    }

    return {
        applications,
        loadingCV,
        openUserCV,
        onRemoveApplication,
    };
});