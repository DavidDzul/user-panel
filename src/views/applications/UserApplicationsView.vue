<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <UserApplications
          :applications="applications"
          @submit="openVacantDetail"
          @rejected="onApplicationRejected"
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
const { openVacantDetail, onRejectedUserApplication } =
  useUserApplicationsPageStore();

const confirmationDialog = ref();

const onApplicationRejected = async (id) => {
  if (!id) return;
  const response = await confirmationDialog.value?.open({
    title: "Descatar postulación",
    body: "Si confirmas, esta postulación será descartada de manera permanente. ¿Estás seguro de que desea continuar?",
  });
  if (!response) return;
  await onRejectedUserApplication(id);
};
</script>
