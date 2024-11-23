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
      <v-col cols="12" class="text-right">
        <v-btn @click="openCurriculumPDF">DESCARGAR CV</v-btn>
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
          <UserPhoto :photos="userPhoto" />
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
              title="Información personal"
              button-text="Actualizar"
              :expanded="expanded"
              @button-click="openPersonalDialog"
            />
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <PersonalData :personal="userInfo" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title color="#f8f8f8">
          <template #default="{ expanded }">
            <PanelHeaderOptions
              title="Experiencia laboral"
              button-text="Agregar"
              :expanded="expanded"
              @button-click="openWorkExperienceDialog"
            />
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <WorkExperienceTable
            :works="userWorkExperience"
            @edit="openEditWork"
            @remove="onWorkDelete"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title color="#f8f8f8">
          <template #default="{ expanded }">
            <PanelHeaderOptions
              title="Formación académica"
              button-text="Agregar"
              :expanded="expanded"
              @button-click="openAcademicInformationDialog"
            />
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <AcademicInformationTable
            :informations="userAcademicInformation"
            @edit="openEditAcademic"
            @remove="onAcademicDelete"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title class="panel-title"
          >Educación continua</v-expansion-panel-title
        >
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title class="panel-title"
          >Conocimientos</v-expansion-panel-title
        >
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  <CreatePhotoDialog
    v-model="photoDialog"
    :preview-url="previewUrl"
    @submit="savePhoto"
  />
  <PersonalDataDialog
    v-model="personalDialog"
    :initial-data="userInfo"
    @submit="onSavePersonalData"
  />
  <CreateWorkExperienceDialog
    v-model="workExperienceDialog"
    @submit="onSaveWorkExperience"
  />
  <UpdateWorkExperienceDialog
    v-model="editWorkDialog"
    :edit-item="editWork"
    @submit="onUpdateWorkExperience"
  />
  <CreateAcademicInformationDialog
    v-model="academicInformationDialog"
    @submit="onSaveAcademicInformation"
  />
  <updateAcademicInformationDialog
    v-model="editAcademicDialog"
    :edit-item="editAcademic"
    @submit="onUpdateAcademicInformation"
  />
  <ConfirmationDialog ref="confirmationDialog"></ConfirmationDialog>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog.vue";
import UserPhoto from "@/components/users/UserPhoto.vue";
import PanelHeaderOptions from "@/components/shared/PanelHeaderOptions.vue";
import { useCurriculumPageStore } from "@/stores/views/CurriculumPage";
import { storeToRefs } from "pinia";
import CreatePhotoDialog from "@/components/photo/CreatePhotoDialog.vue";
import PersonalData from "@/components/curriculum/PersonalData.vue";
import PersonalDataDialog from "@/components/curriculum/PersonalDataDialog.vue";
import WorkExperienceTable from "@/components/curriculum/WorkExperienceTable.vue";
import CreateWorkExperienceDialog from "@/components/curriculum/CreateWorkExperienceDialog.vue";
import UpdateWorkExperienceDialog from "@/components/curriculum/UpdateWorkExperienceDialog.vue";
import AcademicInformationTable from "@/components/curriculum/AcademicInformationTable.vue";
import CreateAcademicInformationDialog from "@/components/curriculum/CreateAcademicInformationDialog.vue";
import updateAcademicInformationDialog from "@/components/curriculum/updateAcademicInformationDialog.vue";

const panel = ref([0, 1, 2, 3, 4, 5, 6, 7, 8]);
const {
  photoDialog,
  previewUrl,
  userInfo,
  editWork,
  editWorkDialog,
  userPhoto,
  editAcademic,
  editAcademicDialog,
  personalDialog,
  userWorkExperience,
  workExperienceDialog,
  userAcademicInformation,
  academicInformationDialog,
} = storeToRefs(useCurriculumPageStore());
const {
  savePhoto,
  changePhoto,
  openEditWork,
  openPersonalDialog,
  onSavePersonalData,
  onSaveWorkExperience,
  onUpdateWorkExperience,
  onRemoveWorkExperience,
  openWorkExperienceDialog,
  onSaveAcademicInformation,
  openAcademicInformationDialog,
  openEditAcademic,
  onUpdateAcademicInformation,
  onAcademicInformation,
  openCurriculumPDF,
} = useCurriculumPageStore();

const fileInput = ref(null);
const onPhotoUpload = () => {
  fileInput.value.$el.getElementsByTagName("input")[0].click();
};

const confirmationDialog = ref();

const onWorkDelete = async (id) => {
  if (!id) return;
  const response = await confirmationDialog.value?.open({
    title: "Eliminar Experiencia Laboral",
    body: "Al aceptar, este registro se removerá de su listado. ¿Desea continuar?",
  });
  if (!response) return;
  await onRemoveWorkExperience(id);
};

const onAcademicDelete = async (id) => {
  if (!id) return;
  const response = await confirmationDialog.value?.open({
    title: "Eliminar Formación Académica",
    body: "Al aceptar, este registro se removerá de su listado. ¿Desea continuar?",
  });
  if (!response) return;
  await onAcademicInformation(id);
};
</script>
