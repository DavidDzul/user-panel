import { defineStore, storeToRefs } from "pinia";
import { useCandidatesStore } from "@/stores/api/candidatesStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router"

export const useCandidatesPageStore = defineStore("candidatesPage", () => {
    const { setLoading } = useAppStore();
    const { resCandidates } = storeToRefs(useCandidatesStore());

    const { fetchCandidates, validateVisualizations
    } = useCandidatesStore();

    const router = useRouter()
    const loadingCard = ref(false)

    onBeforeMount(async () => {
        await fetchCandidates()
    })

    const candidates = computed(() => [...resCandidates.value.values()])

    const openUserCV = async ($id) => {
        loadingCard.value = true
        try {
            await validateVisualizations($id)
        } catch (e) {
            console.error(e)
        }
        loadingCard.value = false
    }

    return {
        candidates,
        loadingCard,
        openUserCV,
    };
});