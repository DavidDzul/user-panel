<template>
  <v-container>
    <v-row class="pb-5">
      <v-col v-if="userInfo">
        <v-btn
          color="red"
          class="mx-2 mb-2"
          v-if="userInfo.public"
          @click="onChangePlibicCV(0)"
          >DESACTIVAR VISUALIZACIÓN DE CV</v-btn
        >
        <v-btn
          color="green"
          class="mx-2 mb-2"
          v-else
          @click="onChangePlibicCV(1)"
          >HABILITAR VISUALIZACIÓN DE CV</v-btn
        >
        <v-btn
          color="blue"
          class="mx-2 mb-2"
          @click="openCurriculumPDF"
          :loading="loadingDowloandCV"
          >DESCARGAR CV</v-btn
        >
      </v-col>
    </v-row>

    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-title color="#f8f8f8">
          <template #default="{ expanded }">
            <PanelHeaderOptions
              title="Foto de perfil (Opcional)"
              button-text="Nueva foto"
              :expanded="expanded"
              @button-click="onPhotoUpload"
            />
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row class="pb-5">
            <v-col cols="12">
              <p>
                Fotografía tomada de frente, centrada y con el rostro
                completamente descubierto (sin lentes de sol, gorros, bufandas u
                otros accesorios similares). La imagen debe ser clara, con un
                tamaño máximo de archivo de 300 KB, y en formato JPG o PNG.
              </p>
            </v-col>
          </v-row>
          <UserPhoto
            :photos="userPhoto"
            :is-user="true"
            @remove="alertRemovePhoto"
          />
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
              title="Educación continua"
              button-text="Agregar"
              :expanded="expanded"
              @button-click="openContinuingEducationDialog"
            />
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row class="pb-5">
            <v-col cols="12">
              <p>
                <b>Nota:</b>
                Incluya su participación en el Programa de Formación Integral de
                Impulso Universitario con el año de inicio y término. Si aún
                continúa, indique 'Actualidad' en el apartado fecha de término.
              </p>
            </v-col>
          </v-row>

          <ContinuingEducationTable
            :educations="userContinuingEducation"
            @edit="openEditEducation"
            @remove="onEducationDelete"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title color="#f8f8f8">
          <template #default="{ expanded }">
            <PanelHeaderOptions
              title="Conocimientos"
              button-text="Agregar"
              :expanded="expanded"
              @button-click="openTechnicalKnowledgeDialog"
            />
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <TechnicalKnowledgeTable
            :knowledges="userTechnicalKnowledge"
            @edit="openEditKnowledge"
            @remove="onKnowledgeDelete"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  <CreatePhotoDialog
    v-model="photoDialog"
    :preview-url="previewUrl"
    :loading="loadingPhoto"
    @submit="savePhoto"
  />
  <PersonalDataDialog
    v-model="personalDialog"
    :initial-data="userInfo"
    :loading="loadingPersonalData"
    @submit="onSavePersonalData"
  />
  <CreateWorkExperienceDialog
    v-model="workExperienceDialog"
    @submit="onSaveWorkExperience"
    :loading="loadingWorkExperience"
  />
  <UpdateWorkExperienceDialog
    v-model="editWorkDialog"
    :edit-item="editWork"
    @submit="onUpdateWorkExperience"
    :loading="loadingWorkExperience"
  />
  <CreateAcademicInformationDialog
    v-model="academicInformationDialog"
    @submit="onSaveAcademicInformation"
    :loading="loadingAcademicInformation"
  />
  <updateAcademicInformationDialog
    v-model="editAcademicDialog"
    :edit-item="editAcademic"
    @submit="onUpdateAcademicInformation"
    :loading="loadingAcademicInformation"
  />
  <CreateContinuingEducationDialog
    v-model="continuingEducationDialog"
    @submit="onSaveContinuingEducation"
    :loading="loadingContinuingEducation"
  />
  <UpdateContinuingEducationDialog
    v-model="editEducationDialog"
    :edit-item="editEducation"
    @submit="onUpdateContinuingEducation"
    :loading="loadingContinuingEducation"
  />
  <CreateTechnicalKnowledgeDialog
    v-model="technicalKnowledgeDialog"
    @submit="onSaveTechnicalKnowledge"
    :loading="loadingTechnicalKnowledge"
  />
  <UpdateTechnicalKnowledgeDialog
    v-model="editKnowledgeDialog"
    :edit-item="editKnowledge"
    @submit="onUpdateTechnicalKnowledge"
    :loading="loadingTechnicalKnowledge"
  />
  <AvailableDialog
    v-model="availableCvDialog"
    :loading="loadingAvailableCvge"
    @submit="onUpdatePublicCV"
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
import ContinuingEducationTable from "@/components/curriculum/ContinuingEducationTable.vue";
import CreateContinuingEducationDialog from "@/components/curriculum/CreateContinuingEducationDialog.vue";
import UpdateContinuingEducationDialog from "@/components/curriculum/UpdateContinuingEducationDialog.vue";
import TechnicalKnowledgeTable from "@/components/curriculum/TechnicalKnowledgeTable.vue";
import CreateTechnicalKnowledgeDialog from "@/components/curriculum/CreateTechnicalKnowledgeDialog.vue";
import UpdateTechnicalKnowledgeDialog from "@/components/curriculum/UpdateTechnicalKnowledgeDialog.vue";
import AvailableDialog from "@/components/curriculum/AvailableDialog.vue";

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
  userContinuingEducation,
  continuingEducationDialog,
  editEducation,
  editEducationDialog,
  technicalKnowledgeDialog,
  userTechnicalKnowledge,
  editKnowledge,
  editKnowledgeDialog,
  loadingPhoto,
  loadingPersonalData,
  loadingWorkExperience,
  loadingAcademicInformation,
  loadingContinuingEducation,
  loadingTechnicalKnowledge,
  loadingDowloandCV,
  availableCvDialog,
  loadingAvailableCvge,
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
  openContinuingEducationDialog,
  onSaveContinuingEducation,
  openEditEducation,
  onUpdateContinuingEducation,
  onRemoveContinuingEducation,
  openTechnicalKnowledgeDialog,
  onSaveTechnicalKnowledge,
  openEditKnowledge,
  onUpdateTechnicalKnowledge,
  onRemoveTechnicalKnowledge,
  onUpdatePublicCV,
  openAvailableCvDialog,
  onRemovePhoto,
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

const onEducationDelete = async (id) => {
  if (!id) return;
  const response = await confirmationDialog.value?.open({
    title: "Eliminar Educación continua",
    body: "Al aceptar, este registro se removerá de su listado. ¿Desea continuar?",
  });
  if (!response) return;
  await onRemoveContinuingEducation(id);
};

const onKnowledgeDelete = async (id) => {
  if (!id) return;
  const response = await confirmationDialog.value?.open({
    title: "Eliminar conocimiento",
    body: "Al aceptar, este registro se removerá de su listado. ¿Desea continuar?",
  });
  if (!response) return;
  await onRemoveTechnicalKnowledge(id);
};

const onChangePlibicCV = async (status) => {
  if (status) {
    openAvailableCvDialog();
  } else {
    const response = await confirmationDialog.value?.open({
      title: "Visualización de CV",
      body: "Al aceptar, el curriculum vitae ya no será visible para que las empresas puedan ponerse en contacto contigo. ¿Desea continuar?",
    });
    if (!response) return;
    await onUpdatePublicCV();
  }
};

const alertRemovePhoto = async (value) => {
  if (!value) return;
  const response = await confirmationDialog.value?.open({
    title: "Eliminar foto",
    body: "Esta acción eliminará el archivo multimedia de su perfil y no se podrá recuperar. ¿Está seguro de continuar?",
  });
  if (!response) return;
  await onRemovePhoto(value);
};
</script>
