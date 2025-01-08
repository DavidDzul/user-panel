<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <CandidatesList :list="candidates" @open="openUserCV" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCandidatesPageStore } from "@/stores/views/candidatesPage";

import CandidatesList from "@/components/candidates/CandidatesList.vue";
const { candidates } = storeToRefs(useCandidatesPageStore());
const { openUserCV } = useCandidatesPageStore();

const search = ref("");
</script>

<style scoped></style>
