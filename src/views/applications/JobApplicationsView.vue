<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <BusinessApplications
          :applications="applications"
          @submit="openUserCV"
          @remove="onApplicationDelete"
          :loading="loadingCV"
        />
      </v-col>
    </v-row>
  </v-container>

  <ConfirmationDialog ref="confirmationDialog"></ConfirmationDialog>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { useApplicationsPageStore } from "@/stores/views/applicationsPage";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog.vue";

import BusinessApplications from "@/components/applications/BusinessApplications.vue";
const { applications, loadingCV } = storeToRefs(useApplicationsPageStore());
const { openUserCV, onRemoveApplication } = useApplicationsPageStore();

const confirmationDialog = ref();

const onApplicationDelete = async (id) => {
  if (!id) return;
  const response = await confirmationDialog.value?.open({
    title: "Eliminar postulación",
    body: "Al aceptar, este registro se removerá de su listado. ¿Desea continuar?",
  });
  if (!response) return;
  await onRemoveApplication(id);
};
</script>
