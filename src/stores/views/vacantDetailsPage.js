import { defineStore, storeToRefs } from "pinia";
import { useVacantDetailStore } from "@/stores/api/vacantDetailStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router"

export const useVacantDetailsPageStore = defineStore("vacantDetailsPage", () => {
    const { setLoading } = useAppStore();
    const { resVacantDetail } = storeToRefs(useVacantDetailStore());

    const { getVacantDetail
    } = useVacantDetailStore();

    const route = useRoute()
    const loadVacant = ref(false)

    onBeforeMount(async () => {
        checkRouteId(route.params.id)
    })

    watch(
        () => route.params.id,
        (idString) => checkRouteId(idString),
    )

    const checkRouteId = async (idString) => {
        const id = !Array.isArray(idString) ? parseInt(idString) : NaN
        await getVacantDetail(id)
        loadVacant.value = true
    }

    const vacantDetail = computed(() => resVacantDetail.value)

    return {
        vacantDetail,
        loadVacant,
    };
});