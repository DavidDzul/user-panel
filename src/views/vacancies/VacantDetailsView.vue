<template>
  <v-container>
    <VacantData :vacant="vacantDetail || {}" />
  </v-container>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVacantDetailsPageStore } from "@/stores/views/vacantDetailsPage";
import VacantData from "@/components/vacancies/VacantData.vue";

const { vacantDetail } = storeToRefs(useVacantDetailsPageStore());
const {} = useVacantDetailsPageStore();
</script>

<style scoped></style>
