import { defineStore, storeToRefs } from "pinia";
import { useBusinessStore } from "@/stores/api/businessStore";
import { useAppStore } from "@/stores/app";
import { computed, onBeforeMount, ref } from "vue";

export const useBusinessPageStore = defineStore("businessPage", () => {
    const { setLoading } = useAppStore();
    const { resPhoto,
        resBusinessData
    } = storeToRefs(useBusinessStore());

    const { fetchBusiness, createImage, updateBusinessData
    } = useBusinessStore();

    const photoDialog = ref(false)
    const editBusinessDialog = ref(false)

    const file = ref()
    const previewUrl = ref("")

    //loadings
    const loadingBusinessPhoto = ref(false)
    const loadingBusinessData = ref(false)

    onBeforeMount(async () => {
        await fetchBusiness()
    })

    const businessData = computed(() => resBusinessData.value)
    const businessPhoto = computed(() => resPhoto.value)

    const openEditBusinessInformation = (id) => {
        if (!businessData.value) return
        editBusinessDialog.value = true
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
        loadingBusinessPhoto.value = true
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
        loadingBusinessPhoto.value = false
    };

    const onUpdateBusinessData = async (form) => {
        loadingBusinessData.value = true
        if (form) {
            try {
                const res = await updateBusinessData(form);
                if (res) {
                    editBusinessDialog.value = false
                }
            } catch (error) {
                console.error(error);
            }
        }
        loadingBusinessData.value = false
    };

    return {
        previewUrl,
        photoDialog,
        businessData,
        businessPhoto,
        editBusinessDialog,
        loadingBusinessPhoto,
        loadingBusinessData,
        savePhoto,
        changePhoto,
        onUpdateBusinessData,
        openEditBusinessInformation,
    };
});