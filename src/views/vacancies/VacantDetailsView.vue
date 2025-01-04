<template>
  <VacantData v-if="loadVacant" :vacant="vacantDetail" />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVacantDetailsPageStore } from "@/stores/views/vacantDetailsPage";
import VacantData from "@/components/vacancies/VacantData.vue";

const { vacantDetail, loadVacant } = storeToRefs(useVacantDetailsPageStore());
const {} = useVacantDetailsPageStore();
</script>

<style scoped></style>
