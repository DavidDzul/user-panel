import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/api/authStore";
import { useAppStore } from "@/stores/app";
import { ref } from "vue";

export const useCurriculumPageStore = defineStore("curriculumPage", () => {
    const { setLoading } = useAppStore();

    const photoDialog = ref(false)
    const file = ref()
    const previewUrl = ref("")

    const changePhoto = (event) => {
        if (event) {
            const fileToLoad = Array.isArray(event) ? event[0] : event
            previewUrl.value = window.URL.createObjectURL(fileToLoad)
            file.value = fileToLoad
            photoDialog.value = true
        } else {
            previewUrl.value = ""
            file.value = null
        }
    }

    const savePhoto = async () => {
        if (file.value) {
            console.log(file)
            //   if (!selectedUser.value) return
            //   try {
            //     const res = await mutateAddPhoto({ photo: file.value, userId: selectedUser.value?.id })
            //     if (res) {
            //       photoDialog.value = false
            //     }
            //   } catch (e) {
            //     console.error(e)
            //   }
        }
    }

    return {
        previewUrl,
        photoDialog,
        savePhoto,
        changePhoto
    };
});