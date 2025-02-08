<template>
  <v-container>
    <v-row>
      <v-col v-if="businessData" cols="12" lg="6">
        <div>
          <strong>Total de vacantes: </strong
          ><label
            >{{ userProfile.role.num_vacancies }} / {{ vacanciesCount }}
          </label>
        </div>
      </v-col>
      <v-col cols="12" lg="6" v-if="businessData" class="text-right">
        <v-btn color="primary" class="mb-4">
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
      <v-col cols="12" lg="12" md="12" v-else>
        <div class="pb-5">
          <b style="color: red">
            Para publicar vacantes, por favor solicita a los administradores de
            la plataforma que completen la información necesaria de tu empresa.
          </b>
        </div>
      </v-col>
    </v-row>

    <PublishedVacanciesTable
      v-if="userProfile"
      :vacant="vacancies"
      :user="userProfile"
      @open="openVacantDetail"
      @edit="openEditVacant"
      @practice="openEditPractice"
      @remove="onVacantDelete"
      @status="onVacantStatus"
    />
  </v-container>
  <CreateVacantDialog
    v-if="userProfile"
    v-model="vacantDialog"
    :user="userProfile"
    :loading="loadingVacant"
    @submit="onSaveVacant"
  />
  <UpdateVacantDialog
    v-if="userProfile"
    v-model="updateVacantDialog"
    :edit-item="editVacant"
    :user="userProfile"
    :loading="loadingVacant"
    @submit="onUpdateVacant"
  />
  <CreatePracticeVacantDialog
    v-if="userProfile"
    v-model="practiceDialog"
    :user="userProfile"
    :loading="loadingPractice"
    @submit="onSavePractive"
  />
  <UpdatePracticeVacantDialog
    v-if="userProfile"
    v-model="updatePracticeDialog"
    :edit-item="editPractice"
    :user="userProfile"
    :loading="loadingPractice"
    @submit="onUpdatePractice"
  />
  <ConfirmationDialog ref="confirmationDialog"></ConfirmationDialog>
  <DisabledVacantDialog
    v-model="disabledvacantDialog"
    @submit="onDisabledSVacant"
  />
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
import DisabledVacantDialog from "@/components/vacancies/DisabledVacantDialog.vue";

const confirmationDialog = ref();

const {
  vacancies,
  vacantDialog,
  editVacant,
  updateVacantDialog,
  practiceDialog,
  editPractice,
  updatePracticeDialog,
  userProfile,
  businessData,
  disabledvacantDialog,
  loadingVacant,
  loadingPractice,
  vacanciesCount,
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
  onDisabledSVacant,
  openDisabledVacantDialog,
  openVacantDetail,
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
  if (item.status) {
    openDisabledVacantDialog(item.id);
  } else {
    const response = await confirmationDialog.value?.open({
      title: "Activar vacante",
      body: "Al aceptar, la vacante se habilitará y estará visible para los usuarios. ¿Desea continuar?",
    });
    if (!response) return;
    await onStatusVacant(item.id);
  }
};
</script>
