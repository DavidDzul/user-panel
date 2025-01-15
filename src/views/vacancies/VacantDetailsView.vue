<template>
  <VacantData
    v-if="loadVacant"
    :vacant="vacantDetail"
    :loading="loadingApplication"
    @submit="confirmApplication"
  />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVacantDetailsPageStore } from "@/stores/views/vacantDetailsPage";
import VacantData from "@/components/vacancies/VacantData.vue";

const { vacantDetail, loadVacant, loadingApplication } = storeToRefs(
  useVacantDetailsPageStore()
);
const { confirmApplication } = useVacantDetailsPageStore();
</script>

<style scoped></style>
