import { defineStore, storeToRefs } from "pinia";
import { useVacantDetailStore } from "@/stores/api/vacantDetailStore";
import { useAuthStore } from "@/stores/api/authStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router"

export const useVacantDetailsPageStore = defineStore("vacantDetailsPage", () => {
    const { setLoading } = useAppStore();
    const { resVacantDetail } = storeToRefs(useVacantDetailStore());
    const { userProfile } = storeToRefs(useAuthStore());
    const { getVacantDetail, createApplication } = useVacantDetailStore();

    const route = useRoute();
    const router = useRouter();
    const loadVacant = ref(false);
    const loadingApplication = ref(false);

    onBeforeMount(() => {
        validateAndFetchVacantDetail();
    });

    watch(
        () => route.fullPath,
        () => validateAndFetchVacantDetail()
    );

    const validateAndFetchVacantDetail = async () => {
        // Verificar si la ruta coincide con "/vacantes/:id"
        if (!route.path.startsWith("/vacantes/")) return;

        const id = parseInt(route.params.id, 10);
        if (isNaN(id) || id <= 0) {
            console.error("Invalid or missing ID in route:", route.params.id);
            loadVacant.value = false;
            return;
        }

        try {
            const res = await getVacantDetail(id);
            if (!res) {
                await router.push({ path: "/vacantes" });
            }
            loadVacant.value = true;
        } catch (error) {
            console.error("Error fetching vacant detail:", error);
            loadVacant.value = false;
        }
    };

    const vacantDetail = computed(() => resVacantDetail.value);
    const isBusiness = computed(() => userProfile.value.user_type === 'BUSINESS');

    const confirmApplication = async (vacantId, businessId) => {
        if (!userProfile.value) return;
        loadingApplication.value = true;
        try {
            await createApplication({
                user_id: userProfile.value.id,
                business_id: businessId,
                vacant_id: vacantId,
            });
        } catch (e) {
            console.error(e);
        }
        loadingApplication.value = false;
    };

    return {
        vacantDetail,
        loadVacant,
        loadingApplication,
        isBusiness,
        confirmApplication,
    };
});
