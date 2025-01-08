import axios from "@/axiosConfig";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert"

export const useCandidatesStore = defineStore("candidatesStore", () => {
    const router = useRouter();
    const { showAlert } = useAlertStore()
    const resCandidates = ref(new Map())

    const fetchCandidates = async () => {
        try {
            const res = await axios.get("api/fetchCandidates", {
                headers: { 'accept': 'application/json' }
            });
            resCandidates.value = new Map(res.data.candidates.map((m) => [m.id, m]))
            return res.data
        } catch (error) {
            console.error("Error en vacantes:", error);
        }
    };

    const validateVisualizations = async ($id) => {
        try {
            const param = await axios.get(`api/fetchValidatePDF/${$id}`, {
                responseType: 'blob',
                headers: { accept: 'application/json' },
            });

            // Verificar el contenido si es necesario
            const fileURL = URL.createObjectURL(new Blob([param.data], { type: 'application/pdf' }));
            window.open(fileURL);

            showAlert({
                title: "PDF generado exitosamente.",
                status: "success",
            });

            return true;
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Leer el contenido del Blob y procesarlo como JSON
                const reader = new FileReader();
                reader.onload = () => {
                    const errorMessage = JSON.parse(reader.result).msg || "Error al generar el PDF.";
                    showAlert({
                        title: errorMessage,
                        status: "error",
                    });
                };
                reader.readAsText(error.response.data);
            } else {
                // Error genérico
                const errorMessage = "Error al generar el PDF, intente nuevamente.";
                showAlert({
                    title: errorMessage,
                    status: "error",
                });
            }

            throw error;
        }
    };



    return {
        resCandidates,
        fetchCandidates,
        validateVisualizations,
    };
});