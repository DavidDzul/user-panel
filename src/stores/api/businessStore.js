import axios from "@/axiosConfig";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert"

export const useBusinessStore = defineStore("businessStore", () => {
    const router = useRouter();
    const { showAlert } = useAlertStore()
    const resBusinessData = ref(null)
    const resPhoto = ref(null)


    const fetchBusiness = async () => {
        try {
            const res = await axios.get("api/fetchBusiness", {
                headers: { 'accept': 'application/json' }
            });
            resBusinessData.value = res.data.businessData;
            resPhoto.value = res.data.images;
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

    const updateBusinessData = async (form) => {
        try {
            const param = await axios.post("api/updateBusiness", form, {
                headers: { 'accept': 'application/json' }
            });
            if (param) {
                showAlert({
                    title: "Información guardada exitosamente.",
                    status: "success",
                });
                resBusinessData.value = param.data.updateBusiness
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



    return {
        resPhoto,
        resBusinessData,
        createImage,
        fetchBusiness,
        updateBusinessData
    };
});