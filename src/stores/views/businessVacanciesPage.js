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
    const { userProfile, vacantJrPermission } = storeToRefs(useAuthStore())
    const { resBusinessData } = storeToRefs(useBusinessStore())
    const { fetchBusiness } = useBusinessStore()
    const router = useRouter()

    const vacantDialog = ref(false)
    const vacantJrDialog = ref(false)
    const practiceDialog = ref(false)
    const updateVacantDialog = ref(false)
    const updatePracticeDialog = ref(false)
    const updateVacantJrDialog = ref(false)
    const editVacant = ref(undefined)
    const editPractice = ref(undefined)
    const editVacantJr = ref(undefined)
    const vacantId = ref(undefined)
    const disabledvacantDialog = ref(false)

    //loadings
    const loadingVacant = ref(false)
    const loadingVacantJr = ref(false)
    const loadingPractice = ref(false)

    const { fetchVacancies, createVacant, updateVacant, statusVacant, createPractice, updatePractice, createVacantJr, updateVacantJr } = useBusinessVacanciesStore();

    const openVacantDialog = () => {
        vacantDialog.value = true
    }

    const openPracticeDialog = () => {
        practiceDialog.value = true
    }
    const openVacantJrDialog = () => {
        vacantJrDialog.value = true
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

    const openEditVacantJr = (id) => {
        const vacant = resVacancies.value.get(id)
        if (!vacant) return
        editVacantJr.value = { ...vacant }
        updateVacantJrDialog.value = true
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
    const vacanciesCount = computed(() => vacancies.value.length);
    const businessData = computed(() => resBusinessData.value)

    const openVacantDetail = async (id) => {
        try {
            await router.push("vacantes/" + id)
        } catch (error) {
            console.log(error)
        }
    }

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

        if (!editVacant.value && !form) return
        try {
            const res = await updateVacant(editVacant.value.id, form);
            if (res) {
                updateVacantDialog.value = false
            }
        } catch (error) {
            console.error(error);
        }
        loadingVacant.value = false
    };

    const onDisabledSVacant = async (form) => {
        if (!vacantId.value) return
        try {
            await statusVacant(vacantId.value, form)
            disabledvacantDialog.value = false
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
        if (!editPractice.value && !form) return
        if (form) {
            try {
                const res = await updatePractice(editPractice.value.id, form);
                if (res) {
                    updatePracticeDialog.value = false
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadingPractice.value = false
    };

    const onStatusVacant = async (id) => {
        if (!id) return
        try {
            await statusVacant(id, null)
        } catch (e) {
            console.error(e)
        }
    }

    const onSaveVacantJr = async (form) => {
        loadingVacantJr.value = true
        if (!form) return
        try {
            const res = await createVacantJr(form);
            if (res) {
                vacantJrDialog.value = false
            }
        } catch (error) {
            console.error(error);
        }
        loadingVacantJr.value = false
    };

    const onUpdateVacantJr = async (form) => {
        loadingVacantJr.value = true

        if (!editVacantJr.value && !form) return
        try {
            const res = await updateVacantJr(editVacantJr.value.id, form);
            if (res) {
                updateVacantJrDialog.value = false
            }
        } catch (error) {
            console.error(error);
        }
        loadingVacantJr.value = false
    };

    return {
        vacancies,
        vacantDialog,
        vacantJrDialog,
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
        vacanciesCount,
        loadingVacantJr,
        editVacantJr,
        updateVacantJrDialog,
        vacantJrPermission,
        onSaveVacant,
        openEditVacant,
        onUpdateVacant,
        onStatusVacant,
        onSavePractive,
        openVacantDialog,
        openEditPractice,
        onUpdatePractice,
        onDisabledSVacant,
        openPracticeDialog,
        openDisabledVacantDialog,
        openVacantDetail,
        openVacantJrDialog,
        onSaveVacantJr,
        openEditVacantJr,
        onUpdateVacantJr
    };
});