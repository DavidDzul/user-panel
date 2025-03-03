<template>
  <v-container>
    <v-row>
      <v-col v-if="businessData" cols="12" lg="6">
        <div>
          <strong>Total de vacantes: </strong>
          <label v-if="userProfile.role.unlimited">
            <v-icon size="small">mdi-infinity</v-icon> /
            {{ vacanciesCount }}
          </label>
          <label v-else
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
              <v-list-item @click="openVacantJrDialog">
                <v-list-item-title>
                  <v-icon>mdi-account-minus</v-icon> Vacante
                  Jr</v-list-item-title
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
      @junior="openEditVacantJr"
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
  <DisabledVacantDialog
    v-model="disabledvacantDialog"
    @submit="onDisabledSVacant"
  />
  <CreateJrVacantDialog
    v-if="userProfile"
    v-model="vacantJrDialog"
    :user="userProfile"
    :loading="loadingVacantJr"
    @submit="onSaveVacantJr"
  />
  <UpdateJrVacantDialog
    v-if="userProfile"
    v-model="updateVacantJrDialog"
    :edit-item="editVacantJr"
    :user="userProfile"
    :loading="loadingVacantJr"
    @submit="onUpdateVacantJr"
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
import DisabledVacantDialog from "@/components/vacancies/DisabledVacantDialog.vue";
import CreateJrVacantDialog from "@/components/vacancies/CreateJrVacantDialog.vue";
import UpdateJrVacantDialog from "@/components/vacancies/UpdateJrVacantDialog.vue";

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
  vacantJrDialog,
  loadingVacantJr,
  editVacantJr,
  updateVacantJrDialog,
} = storeToRefs(useBusinessVacanciesPageStore());

const {
  openVacantDialog,
  onSaveVacant,
  openEditVacant,
  onUpdateVacant,
  onStatusVacant,
  onSavePractive,
  openPracticeDialog,
  openEditPractice,
  onUpdatePractice,
  onDisabledSVacant,
  openDisabledVacantDialog,
  openVacantDetail,
  openVacantJrDialog,
  onSaveVacantJr,
  openEditVacantJr,
  onUpdateVacantJr,
} = useBusinessVacanciesPageStore();

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
