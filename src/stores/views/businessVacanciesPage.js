import { defineStore, storeToRefs } from "pinia";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";
import { useBusinessVacanciesStore } from "@/stores/api/businessVacanciesStore";
import { useBusinessStore } from "@/stores/api/businessStore";
import { useAuthStore } from "@/stores/api/authStore";
import { useRoute, useRouter } from "vue-router"

export const useBusinessVacanciesPageStore = defineStore("businessVacanciesPage", () => {
    const { setLoading } = useAppStore();
    const { resVacancies,
    } = storeToRefs(useBusinessVacanciesStore());
    const { userProfile } = storeToRefs(useAuthStore())
    const { resBusinessData } = storeToRefs(useBusinessStore())
    const { fetchBusiness } = useBusinessStore()
    const router = useRouter()

    const vacantDialog = ref(false)
    const practiceDialog = ref(false)
    const updateVacantDialog = ref(false)
    const updatePracticeDialog = ref(false)
    const editVacant = ref(undefined)
    const editPractice = ref(undefined)
    const vacantId = ref(undefined)
    const disabledvacantDialog = ref(false)

    //loadings
    const loadingVacant = ref(false)
    const loadingPractice = ref(false)

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

    const openDisabledVacantDialog = (id) => {
        if (!id) return
        vacantId.value = id
        disabledvacantDialog.value = true
    }

    onBeforeMount(async () => {
        await fetchVacancies()
        await fetchBusiness()
    })

    const vacancies = computed(() => [...resVacancies.value.values()])
    const businessData = computed(() => resBusinessData.value)

    const onSaveVacant = async (form) => {
        loadingVacant.value = true
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
        loadingVacant.value = false
    };

    const onUpdateVacant = async (form) => {
        loadingVacant.value = true
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
        loadingVacant.value = false
    };

    const onRemoveVacant = async (id) => {
        if (!id) return
        try {
            await removeVacant(id)
        } catch (e) {
            console.error(e)
        }
    }

    const onDisabledSVacant = async (candidate) => {
        if (!vacantId.value) return
        try {
            await statusVacant(vacantId.value, candidate)
            disabledvacantDialog.value = false
        } catch (e) {
            console.error(e)
        }
    }

    const onStatusVacant = async (id) => {
        if (!id) return
        try {
            await statusVacant(id, null)
        } catch (e) {
            console.error(e)
        }
    }

    const onSavePractive = async (form) => {
        loadingPractice.value = true
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
        loadingPractice.value = false
    };

    const onUpdatePractice = async (form) => {
        loadingPractice.value = true
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
        loadingPractice.value = false
    };

    const openVacantDetail = async (id) => {
        try {
            await router.push("vacantes/" + id)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        vacancies,
        vacantDialog,
        editVacant,
        updateVacantDialog,
        practiceDialog,
        editPractice,
        updatePracticeDialog,
        userProfile,
        businessData,
        disabledvacantDialog,
        loadingVacant,
        loadingPractice,
        onSaveVacant,
        openEditVacant,
        onUpdateVacant,
        onRemoveVacant,
        onStatusVacant,
        onSavePractive,
        openVacantDialog,
        openEditPractice,
        onUpdatePractice,
        onDisabledSVacant,
        openPracticeDialog,
        openDisabledVacantDialog,
        openVacantDetail,
    };
});