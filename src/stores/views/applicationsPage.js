import { defineStore, storeToRefs } from "pinia";
import { useApplicationsStore } from "@/stores/api/applicationsStore";
import { useCurriculumStore } from "@/stores/api/curriculumStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router"

export const useApplicationsPageStore = defineStore("applicationsPage", () => {
    const { setLoading } = useAppStore();
    const { resBusinessApplications } = storeToRefs(useApplicationsStore());

    const { fetchBusinessApplications, updateStatusApplications
    } = useApplicationsStore();

    const { dowloandCurriculum } = useCurriculumStore()
    const router = useRouter()
    const loadingCV = ref(false)
    const businessRejectedDialog = ref(false)
    const selectedApplication = ref(null)
    const loadingRejected = ref(false)

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

    const openBusinessRejectedDialog = (id) => {
        const data = resBusinessApplications.value.get(id)
        if (data) {
            selectedApplication.value = data.id
            businessRejectedDialog.value = true
        }
    }

    const onRejectedApplication = async (form) => {
        if (!selectedApplication.value) return
        loadingRejected.value = true
        try {
            const res = await updateStatusApplications(selectedApplication.value, form)
            if (res) {
                selectedApplication.value = null
                businessRejectedDialog.value = false
            }
        } catch (e) {
            console.error(e)
        }
        loadingRejected.value = false
    }

    const onAcceptedApplication = async (id) => {
        try {
            await updateStatusApplications(id, {
                status: "ACCEPTED",
            })
        } catch (e) {
            console.error(e)
        }
    }

    return {
        loadingCV,
        applications,
        loadingRejected,
        businessRejectedDialog,
        openUserCV,
        onRejectedApplication,
        onAcceptedApplication,
        openBusinessRejectedDialog,
    };
});