<template>
  <VacantData
    v-if="loadVacant && vacantDetail"
    :vacant="vacantDetail"
    :loading="loadingApplication"
    :is-business="isBusiness"
    @submit="confirmApplication"
  />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVacantDetailsPageStore } from "@/stores/views/vacantDetailsPage";
import VacantData from "@/components/vacancies/VacantData.vue";

const { vacantDetail, loadVacant, loadingApplication, isBusiness } =
  storeToRefs(useVacantDetailsPageStore());
const { confirmApplication } = useVacantDetailsPageStore();
</script>

<style scoped></style>
