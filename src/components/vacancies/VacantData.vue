<template>
  <v-row>
    <v-col cols="12">
      {{ props.vacant.vacant_name }}
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  vacant: { type: Object, required: true, default: {} },
  loading: { type: Boolean, default: false },
});
</script>

<style scoped></style>
