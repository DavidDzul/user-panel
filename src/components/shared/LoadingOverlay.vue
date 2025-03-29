<template>
  <v-overlay :model-value="loading" class="align-center justify-center">
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";

const { loading } = storeToRefs(useAppStore());
</script>
