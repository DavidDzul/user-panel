<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <UserApplications
          :applications="applications"
          @submit="openVacantDetail"
          @remove="onApplicationDelete"
        />
      </v-col>
    </v-row>
  </v-container>

  <ConfirmationDialog ref="confirmationDialog"></ConfirmationDialog>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserApplicationsPageStore } from "@/stores/views/userApplicationsPage";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog.vue";

import UserApplications from "@/components/applications/UserApplications.vue";
const { applications } = storeToRefs(useUserApplicationsPageStore());
const { openVacantDetail, onRemoveUserApplication } =
  useUserApplicationsPageStore();

const confirmationDialog = ref();

const onApplicationDelete = async (id) => {
  if (!id) return;
  const response = await confirmationDialog.value?.open({
    title: "Eliminar postulación",
    body: "Al aceptar, este registro se removerá de su listado. ¿Desea continuar?",
  });
  if (!response) return;
  await onRemoveUserApplication(id);
};
</script>
