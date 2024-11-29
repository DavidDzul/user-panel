import axios from "@/axiosConfig";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert"

export const useCurriculumStore = defineStore("curriculumStore", () => {
    const router = useRouter();
    const { showAlert } = useAlertStore()
    const resCurriculumInfo = ref(null)
    const resPhoto = ref(null)
    const resWorkExperience = ref(new Map())
    const resAcademicInformation = ref(new Map())
    const resContinuingEducation = ref(new Map())
    const resTechnicalKnowledge = ref(new Map())

    const fetchCurriculum = async () => {
        try {
            const res = await axios.get("api/fetchCurriculum", {
                headers: { 'accept': 'application/json' }
            });
            resCurriculumInfo.value = res.data.info;
            resPhoto.value = res.data.images;
            resWorkExperience.value = new Map(res.data.workExperience.map((m) => [m.id, m]))
            resAcademicInformation.value = new Map(res.data.academic.map((m) => [m.id, m]))
            resContinuingEducation.value = new Map(res.data.education.map((m) => [m.id, m]))
            resTechnicalKnowledge.value = new Map(res.data.knowledge.map((m) => [m.id, m]))
            return res.data
        } catch (error) {
            console.error("Error en curriculum:", error);
        }
    };

    const createImage = async (file) => {
        const formData = new FormData();
        formData.append('url', file);

        try {
            const param = await axios.post("api/createImage", formData, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });
            showAlert({
                title: "Foto agregada exitosamente.",
                status: "success",
            });
            resPhoto.value = [param.data.image]
            return param.data;
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al guardar la foto, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    };

    const createPersonalData = async (form) => {
        try {
            const param = await axios.post("api/createPersonalData", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información guardada exitosamente.",
                    status: "success",
                });
                resCurriculumInfo.value = param.data.curriculum
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al guardar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const createWorkExperience = async (form) => {
        try {
            const param = await axios.post("api/createWork", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información guardada exitosamente.",
                    status: "success",
                });

                resWorkExperience.value.set(param.data.createWork.id, param.data.createWork)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al guardar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const updateWorkExperience = async (form) => {
        try {
            const param = await axios.post("api/UpdateWork", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información actualizada exitosamente.",
                    status: "success",
                });

                resWorkExperience.value.set(param.data.updateWork.id, param.data.updateWork)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al actualizar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const removeWorkExperience = async (id) => {
        try {
            const param = await axios.delete(`api/deleteWork/${id}`, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información eliminada exitosamente.",
                    status: "success",
                });
                resWorkExperience.value.delete(id)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al eliminar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const createAcademicInformation = async (form) => {
        try {
            const param = await axios.post("api/createAcademic", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información guardada exitosamente.",
                    status: "success",
                });

                resAcademicInformation.value.set(param.data.createAcademic.id, param.data.createAcademic)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al guardar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const updateAcademicInformation = async (form) => {
        try {
            const param = await axios.post("api/updateAcademic", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información actualizada exitosamente.",
                    status: "success",
                });

                resAcademicInformation.value.set(param.data.updateAcademic.id, param.data.updateAcademic)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al actualizar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const removeAcademicInformation = async (id) => {
        try {
            const param = await axios.delete(`api/deleteAcademic/${id}`, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información eliminada exitosamente.",
                    status: "success",
                });
                resAcademicInformation.value.delete(id)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al eliminar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const dowloandCurriculum = async () => {
        await axios
            .get('api/fetchPDF', { responseType: 'blob', headers: { 'accept': 'application/json' } }) // Importante: usa responseType 'blob'
            .then((response) => {
                const fileURL = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                window.open(fileURL);
            })
            .catch((error) => {
                console.error('Error generando el PDF:', error);
            });
    }

    const createContinuingEducation = async (form) => {
        try {
            const param = await axios.post("api/createEducation", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información guardada exitosamente.",
                    status: "success",
                });

                resContinuingEducation.value.set(param.data.createEducation.id, param.data.createEducation)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al guardar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const updateContinuingEducation = async (form) => {
        try {
            const param = await axios.post("api/updateEducation", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información actualizada exitosamente.",
                    status: "success",
                });

                resContinuingEducation.value.set(param.data.updateEducation.id, param.data.updateEducation)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al actualizar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const removeContinuingEducation = async (id) => {
        try {
            const param = await axios.delete(`api/deleteEducation/${id}`, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información eliminada exitosamente.",
                    status: "success",
                });
                resContinuingEducation.value.delete(id)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al eliminar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const createTechnicalKnowledge = async (form) => {
        try {
            const param = await axios.post("api/createKnowledge", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información guardada exitosamente.",
                    status: "success",
                });

                resTechnicalKnowledge.value.set(param.data.createKnowledge.id, param.data.createKnowledge)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al guardar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const updateTechnicalKnowledge = async (form) => {
        try {
            const param = await axios.post("api/updateKnowledge", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información actualizada exitosamente.",
                    status: "success",
                });

                resTechnicalKnowledge.value.set(param.data.updateKnowledge.id, param.data.updateKnowledge)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al actualizar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const removeTechnicalKnowledge = async (id) => {
        try {
            const param = await axios.delete(`api/deleteKnowledge/${id}`, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información eliminada exitosamente.",
                    status: "success",
                });
                resTechnicalKnowledge.value.delete(id)
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al eliminar la información, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    const changeStatusCV = async () => {
        try {
            const param = await axios.post(`api/updateStatusCV`, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Estatus actualizado exitosamente.",
                    status: "success",
                });
                resCurriculumInfo.value = param.data.curriculum
                return param.data.res
            }
        } catch (error) {
            console.error(error);
            showAlert({
                title: "Error al actualizar el estatus, intente nuevamente.",
                status: "error",
            });
            throw error;
        }
    }

    return {
        resPhoto,
        resCurriculumInfo,
        resWorkExperience,
        resTechnicalKnowledge,
        resAcademicInformation,
        resContinuingEducation,
        createImage,
        fetchCurriculum,
        createPersonalData,
        dowloandCurriculum,
        removeWorkExperience,
        updateWorkExperience,
        createWorkExperience,
        createAcademicInformation,
        updateAcademicInformation,
        removeAcademicInformation,
        createContinuingEducation,
        updateContinuingEducation,
        removeContinuingEducation,
        createTechnicalKnowledge,
        updateTechnicalKnowledge,
        removeTechnicalKnowledge,
        changeStatusCV,
    };
});