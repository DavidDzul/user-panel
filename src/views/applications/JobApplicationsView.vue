<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <BusinessApplications
          :applications="applications"
          @submit="openUserCV"
          @rejected="onApplicationRejected"
          @accepted="onApplicationAccepted"
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
const { openUserCV, onRejectedApplication, onAcceptedApplication } =
  useApplicationsPageStore();

const confirmationDialog = ref();

const onApplicationRejected = async (id) => {
  if (!id) return;
  const response = await confirmationDialog.value?.open({
    title: "Descatar postulación",
    body: "Si confirmas, esta postulación será descartada de manera permanente. ¿Estás seguro de que desea continuar?",
  });
  if (!response) return;
  await onRejectedApplication(id);
};

const onApplicationAccepted = async (id) => {
  if (!id) return;
  const response = await confirmationDialog.value?.open({
    title: "Aceptar postulación",
    body: "Aceptar marcará al candidato como posible seleccionado para esta vacante. ¿Estás seguro de que desea continuar?",
  });
  if (!response) return;
  await onAcceptedApplication(id);
};
</script>
