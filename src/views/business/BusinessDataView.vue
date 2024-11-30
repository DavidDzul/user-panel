<template>
  <v-container>
    <v-row class="pb-5">
      <v-col cols="12">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum
          provident ipsum quae voluptatem molestiae, fugit itaque adipisci, rem,
          esse neque perferendis aspernatur repellendus dolore. Repudiandae
          aliquam nobis tempora qui?
        </p>
      </v-col>
    </v-row>

    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-title color="#f8f8f8">
          <template #default="{ expanded }">
            <PanelHeaderOptions
              title="Foto de perfil"
              button-text="Nueva foto"
              :expanded="expanded"
              @button-click="onPhotoUpload"
            />
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <UserPhoto :photos="businessPhoto" />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-file-input
        ref="fileInput"
        class="d-none"
        accept="image/*"
        @update:model-value="changePhoto"
      ></v-file-input>

      <v-expansion-panel>
        <v-expansion-panel-title color="#f8f8f8">
          <template #default="{ expanded }">
            <PanelHeaderOptions
              title="Información de la Empresa"
              button-text="Actualizar"
              :expanded="expanded"
              @button-click=""
            />
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <!-- <PersonalData :personal="userInfo" /> -->
          {{ businessData }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  <CreatePhotoDialog
    v-model="photoDialog"
    :preview-url="previewUrl"
    @submit="savePhoto"
  />

  <ConfirmationDialog ref="confirmationDialog"></ConfirmationDialog>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog.vue";
import UserPhoto from "@/components/users/UserPhoto.vue";
import PanelHeaderOptions from "@/components/shared/PanelHeaderOptions.vue";
import { useBusinessPageStore } from "@/stores/views/businessPage";
import { storeToRefs } from "pinia";
import CreatePhotoDialog from "@/components/photo/CreatePhotoDialog.vue";

const panel = ref([0, 1]);

const { businessData, businessPhoto } = storeToRefs(useBusinessPageStore());
const { savePhoto, changePhoto } = useBusinessPageStore();

const fileInput = ref(null);
const onPhotoUpload = () => {
  fileInput.value.$el.getElementsByTagName("input")[0].click();
};

const confirmationDialog = ref();
</script>
