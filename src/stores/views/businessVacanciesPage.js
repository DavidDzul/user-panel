import { defineStore, storeToRefs } from "pinia";
import { useBusinessVacanciesStore } from "@/stores/api/businessVacanciesStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";

export const useBusinessVacanciesPageStore = defineStore("businessVacanciesPage", () => {
    const { setLoading } = useAppStore();
    const { resVacancies,
    } = storeToRefs(useBusinessVacanciesStore());

    const vacantDialog = ref(false)
    const practiceDialog = ref(false)
    const updateVacantDialog = ref(false)
    const updatePracticeDialog = ref(false)
    const editVacant = ref(undefined)
    const editPractice = ref(undefined)

    const { fetchVacancies, createVacant, updateVacant, removeVacant, statusVacant, createPractice, updatePractice } = useBusinessVacanciesStore();

    const openVacantDialog = () => {
        vacantDialog.value = true
    }

    const openPracticeDialog = () => {
        practiceDialog.value = true
    }

    const openEditVacant = (id) => {
        const vacant = resVacancies.value.get(id)
        if (!vacant) return
        editVacant.value = { ...vacant }
        updateVacantDialog.value = true
    }

    const openEditPractice = (id) => {
        const practice = resVacancies.value.get(id)
        if (!practice) return
        editPractice.value = { ...practice }
        updatePracticeDialog.value = true
    }

    onBeforeMount(async () => {
        await fetchVacancies()
    })

    const vacancies = computed(() => [...resVacancies.value.values()])

    const onSaveVacant = async (form) => {
        if (!form) return
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

    const onUpdateVacant = async (form) => {
        if (!form) return
        if (form) {
            try {
                const res = await updateVacant(form);
                if (res) {
                    updateVacantDialog.value = false
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onRemoveVacant = async (id) => {
        if (!id) return
        try {
            await removeVacant(id)
        } catch (e) {
            console.error(e)
        }
    }

    const onStatusVacant = async (id) => {
        if (!id) return
        try {
            await statusVacant(id)
        } catch (e) {
            console.error(e)
        }
    }

    const onSavePractive = async (form) => {
        if (!form) return
        if (form) {
            try {
                const res = await createPractice(form);
                if (res) {
                    practiceDialog.value = false
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onUpdatePractice = async (form) => {
        if (!form) return
        if (form) {
            try {
                const res = await updatePractice(form);
                if (res) {
                    updatePracticeDialog.value = false
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return {
        vacancies,
        vacantDialog,
        editVacant,
        updateVacantDialog,
        practiceDialog,
        editPractice,
        updatePracticeDialog,
        onSaveVacant,
        openEditVacant,
        onUpdateVacant,
        onRemoveVacant,
        onStatusVacant,
        onSavePractive,
        openVacantDialog,
        openEditPractice,
        onUpdatePractice,
        openPracticeDialog,
    };
});