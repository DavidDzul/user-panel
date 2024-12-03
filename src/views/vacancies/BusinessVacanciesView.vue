<template>
  <v-container>
    <v-col>
      <v-btn color="primary">
        NUEVA VACANTE

        <v-menu activator="parent">
          <v-list>
            <v-list-item @click="openVacantDialog">
              <v-list-item-title>Vacante laboral</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Prácticas profesionales</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-col>
    <PublishedVacanciesTable :vacant="vacancies" />
  </v-container>
  <CreateVacantDialog v-model="vacantDialog" @submit="onSaveVacant" />
</template>
<script setup>
import PublishedVacanciesTable from "@/components/vacancies/PublishedVacanciesTable.vue";
import CreateVacantDialog from "@/components/vacancies/CreateVacantDialog.vue";
import { useBusinessVacanciesPageStore } from "@/stores/views/businessVacanciesPage";
import { storeToRefs } from "pinia";

const { vacancies, vacantDialog } = storeToRefs(
  useBusinessVacanciesPageStore()
);
const { openVacantDialog, onSaveVacant } = useBusinessVacanciesPageStore();
</script>
