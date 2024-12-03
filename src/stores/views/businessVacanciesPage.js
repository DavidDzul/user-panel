import { defineStore, storeToRefs } from "pinia";
import { useBusinessVacanciesStore } from "@/stores/api/businessVacanciesStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";

export const useBusinessVacanciesPageStore = defineStore("businessVacanciesPage", () => {
    const { setLoading } = useAppStore();
    const { resVacancies,
    } = storeToRefs(useBusinessVacanciesStore());

    const vacantDialog = ref(false)

    const { fetchVacancies, createVacant
    } = useBusinessVacanciesStore();

    const openVacantDialog = () => {
        vacantDialog.value = true
    }

    onBeforeMount(async () => {
        await fetchVacancies()
    })

    const vacancies = computed(() => [...resVacancies.value.values()])

    const onSaveVacant = async (form) => {
        if (form) {
            try {
                const res = await createVacant(form);
                if (res) {
                    vacantDialog.value = false
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return {
        vacancies,
        vacantDialog,
        onSaveVacant,
        openVacantDialog,
    };
});