import { defineStore, storeToRefs } from "pinia";
import { useApplicationsStore } from "@/stores/api/applicationsStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router"

export const useUserApplicationsPageStore = defineStore("userApplicationsPage", () => {
    const { setLoading } = useAppStore();
    const { resUserApplications } = storeToRefs(useApplicationsStore());

    const { fetchUserApplications, updateUserStatusApplications
    } = useApplicationsStore();

    const router = useRouter()
    const userRejectedDiaog = ref(false)
    const selectedApplication = ref(null)
    const loadingRejected = ref(false)

    onBeforeMount(async () => {
        await fetchUserApplications()
    })

    const applications = computed(() => [...resUserApplications.value.values()])

    const openVacantDetail = async (id) => {
        try {
            await router.push("vacantes/" + id)
        } catch (error) {
            console.log(error)
        }
    }

    const openUserRejectedDiaog = (id) => {
        const data = resUserApplications.value.get(id)
        if (data) {
            selectedApplication.value = data.id
            userRejectedDiaog.value = true
        }
    }

    const onRejectedUserApplication = async (form) => {
        if (!selectedApplication.value) return
        loadingRejected.value = true
        try {
            const res = await updateUserStatusApplications(selectedApplication.value, form)
            if (res) {
                selectedApplication.value = null
                userRejectedDiaog.value = false
            }
        } catch (e) {
            console.error(e)
        }
        loadingRejected.value = false
    }

    return {
        applications,
        loadingRejected,
        userRejectedDiaog,
        openVacantDetail,
        openUserRejectedDiaog,
        onRejectedUserApplication,
    };
});