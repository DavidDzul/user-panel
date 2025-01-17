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

    const onRejectedUserApplication = async (id) => {
        try {
            await updateUserStatusApplications(id, 'REJECTED')
        } catch (e) {
            console.error(e)
        }
    }

    return {
        applications,
        openVacantDetail,
        onRejectedUserApplication,
    };
});