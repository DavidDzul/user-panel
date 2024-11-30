import { defineStore, storeToRefs } from "pinia";
import { useBusinessStore } from "@/stores/api/businessStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";

export const useBusinessPageStore = defineStore("businessPage", () => {
    const { setLoading } = useAppStore();
    const { resPhoto,
        resBusinessData
    } = storeToRefs(useBusinessStore());

    const { fetchBusiness
    } = useBusinessStore();

    const photoDialog = ref(false)

    const file = ref()
    const previewUrl = ref("")

    onBeforeMount(async () => {
        await fetchBusiness()
    })

    const businessData = computed(() => resBusinessData.value)
    const businessPhoto = computed(() => resPhoto.value)

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

    const onSaveBusinessData = async (form) => {
        // if (form) {
        //     try {
        //         const res = await createPersonalData(form);
        //         if (res) {
        //             personalDialog.value = false
        //         }
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
    };

    return {
        businessData,
        businessPhoto,
        savePhoto,
        changePhoto
    };
});