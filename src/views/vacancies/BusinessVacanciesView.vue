<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="primary">
          NUEVA VACANTE <v-icon>mdi-chevron-down</v-icon>

          <v-menu activator="parent">
            <v-list>
              <v-list-item @click="openVacantDialog">
                <v-list-item-title>
                  <v-icon>mdi-account</v-icon> Vacante
                  laboral</v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="openPracticeDialog">
                <v-list-item-title>
                  <v-icon>mdi-account-outline</v-icon> Prácticas
                  profesionales</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-col>
    </v-row>

    <PublishedVacanciesTable
      :vacant="vacancies"
      @edit="openEditVacant"
      @practice="openEditPractice"
      @remove="onVacantDelete"
      @status="onVacantStatus"
    />
  </v-container>
  <CreateVacantDialog v-model="vacantDialog" @submit="onSaveVacant" />
  <UpdateVacantDialog
    v-model="updateVacantDialog"
    :edit-item="editVacant"
    @submit="onUpdateVacant"
  />
  <CreatePracticeVacantDialog
    v-model="practiceDialog"
    @submit="onSavePractive"
  />
  <UpdatePracticeVacantDialog
    v-model="updatePracticeDialog"
    :edit-item="editPractice"
    @submit="onUpdatePractice"
  />
  <ConfirmationDialog ref="confirmationDialog"></ConfirmationDialog>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog.vue";
import { useBusinessVacanciesPageStore } from "@/stores/views/businessVacanciesPage";
import { storeToRefs } from "pinia";

import PublishedVacanciesTable from "@/components/vacancies/PublishedVacanciesTable.vue";
import CreateVacantDialog from "@/components/vacancies/CreateVacantDialog.vue";
import UpdateVacantDialog from "@/components/vacancies/UpdateVacantDialog.vue";
import CreatePracticeVacantDialog from "@/components/vacancies/CreatePracticeVacantDialog.vue";
import UpdatePracticeVacantDialog from "@/components/vacancies/UpdatePracticeVacantDialog.vue";

const confirmationDialog = ref();

const {
  vacancies,
  vacantDialog,
  editVacant,
  updateVacantDialog,
  practiceDialog,
  editPractice,
  updatePracticeDialog,
} = storeToRefs(useBusinessVacanciesPageStore());

const {
  openVacantDialog,
  onSaveVacant,
  openEditVacant,
  onUpdateVacant,
  onRemoveVacant,
  onStatusVacant,
  onSavePractive,
  openPracticeDialog,
  openEditPractice,
  onUpdatePractice,
} = useBusinessVacanciesPageStore();

const onVacantDelete = async (id) => {
  if (!id) return;
  const response = await confirmationDialog.value?.open({
    title: "Eliminar Vacante",
    body: "Al aceptar, la vacante se removerá de su listado y ya no estará disponible para los usuarios. ¿Desea continuar?",
  });
  if (!response) return;
  await onRemoveVacant(id);
};

const onVacantStatus = async (item) => {
  if (!item) return;
  const response = await confirmationDialog.value?.open({
    title: item.status ? "Desactivar vacante" : "Activar vacante",
    body: item.status
      ? "Al aceptar, la vacante se deshabilitará y ya no estará visible para los usuarios. ¿Desea continuar?"
      : "Al aceptar, la vacante se habilitará y estará visible para los usuarios. ¿Desea continuar?",
  });
  if (!response) return;
  await onStatusVacant(item.id);
};
</script>
