import { defineStore, storeToRefs } from "pinia";
import { useCurriculumStore } from "@/stores/api/curriculumStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";

export const useCurriculumPageStore = defineStore("curriculumPage", () => {
    const { setLoading } = useAppStore();
    const { resPhoto,
        resCurriculumInfo,
        resWorkExperience,
        resTechnicalKnowledge,
        resAcademicInformation,
        resContinuingEducation } = storeToRefs(useCurriculumStore());
    const { createImage,
        fetchCurriculum,
        createPersonalData,
        createWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        createAcademicInformation,
        updateAcademicInformation,
        removeAcademicInformation,
        dowloandCurriculum
    } = useCurriculumStore();

    const photoDialog = ref(false)
    const personalDialog = ref(false)
    const editWorkDialog = ref(false)
    const editAcademicDialog = ref(false)
    const workExperienceDialog = ref(false)
    const academicInformationDialog = ref(false)

    const editWork = ref(undefined)
    const editAcademic = ref(undefined)
    const file = ref()
    const previewUrl = ref("")

    onBeforeMount(async () => {
        await fetchCurriculum()
    })

    const userInfo = computed(() => resCurriculumInfo.value)
    const userPhoto = computed(() => resPhoto.value)
    const userWorkExperience = computed(() => [...resWorkExperience.value.values()])
    const userTechnicalKnowledge = computed(() => [...resTechnicalKnowledge.value.values()])
    const userAcademicInformation = computed(() => [...resAcademicInformation.value.values()])
    const userContinuingEducation = computed(() => [...resContinuingEducation.value.values()])

    const openPersonalDialog = () => {
        personalDialog.value = true
    }

    const openWorkExperienceDialog = () => {
        workExperienceDialog.value = true
    }

    const openAcademicInformationDialog = () => {
        academicInformationDialog.value = true
    }


    const openEditWork = (id) => {
        const work = resWorkExperience.value.get(id)
        if (!work) return
        editWork.value = { ...work }
        editWorkDialog.value = true
    }

    const openEditAcademic = (id) => {
        const academic = resAcademicInformation.value.get(id)
        if (!academic) return
        editAcademic.value = { ...academic }
        editAcademicDialog.value = true
    }

    const changePhoto = (event) => {
        if (event) {
            const fileToLoad = Array.isArray(event) ? event[0] : event
            previewUrl.value = window.URL.createObjectURL(fileToLoad)
            file.value = fileToLoad
            photoDialog.value = true
        } else {
            previewUrl.value = ""
            file.value = null
            photoDialog.value = false
        }
    }

    const savePhoto = async () => {
        if (file.value) {
            try {
                const res = await createImage(file.value);
                if (res) {
                    photoDialog.value = false;
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onSavePersonalData = async (form) => {
        if (form) {
            try {
                const res = await createPersonalData(form);
                if (res) {
                    personalDialog.value = false
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onSaveWorkExperience = async (form) => {
        if (form) {
            try {
                const res = await createWorkExperience(form);
                if (res) {
                    workExperienceDialog.value = false
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onUpdateWorkExperience = async (form) => {
        if (form) {
            try {
                const res = await updateWorkExperience(form);
                if (res) {
                    editWorkDialog.value = false
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onRemoveWorkExperience = async (id) => {
        try {
            await removeWorkExperience(id)
        } catch (e) {
            console.error(e)
        }
    }

    const onSaveAcademicInformation = async (form) => {
        if (form) {
            try {
                const res = await createAcademicInformation(form);
                if (res) {
                    academicInformationDialog.value = false
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onUpdateAcademicInformation = async (form) => {
        if (form) {
            try {
                const res = await updateAcademicInformation(form);
                if (res) {
                    editAcademicDialog.value = false
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const onAcademicInformation = async (id) => {
        try {
            await removeAcademicInformation(id)
        } catch (e) {
            console.error(e)
        }
    }

    const openCurriculumPDF = async () => {
        await dowloandCurriculum()
    }

    return {
        userInfo,
        userPhoto,
        previewUrl,
        photoDialog,
        editWork,
        editAcademic,
        editWorkDialog,
        editAcademicDialog,
        personalDialog,
        userWorkExperience,
        workExperienceDialog,
        userTechnicalKnowledge,
        userAcademicInformation,
        userContinuingEducation,
        academicInformationDialog,
        savePhoto,
        openEditAcademic,
        changePhoto,
        openEditWork,
        openCurriculumPDF,
        openPersonalDialog,
        onSavePersonalData,
        onSaveWorkExperience,
        onAcademicInformation,
        onRemoveWorkExperience,
        onUpdateWorkExperience,
        openWorkExperienceDialog,
        onSaveAcademicInformation,
        onUpdateAcademicInformation,
        openAcademicInformationDialog,
    };
});