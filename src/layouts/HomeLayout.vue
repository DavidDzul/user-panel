<template>
  <v-layout id="app">
    <Appbar />
    <!-- <NavMenu /> -->
    <v-main>
      <!-- <LoadingOverlay :loading="loading" />
        <Alert /> -->
      <v-container class="container__main" :fluid="true">
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
  <v-snackbar
    v-model="show"
    :timeout="7000"
    :location="'right top'"
    :close-on-content-click="true"
    :color="config.status"
    :vertical="true"
  >
    <div class="d-flex">
      <v-icon
        class="mt-1 mr-2"
        v-if="config?.icon"
        :icon="config.icon"
      ></v-icon>
      <div>
        <div class="text-subtitle-1 font-weight-bold">{{ config.title }}</div>
        <p>{{ config?.body }}</p>
      </div>
    </div>
  </v-snackbar>
</template>

<script setup>
import Appbar from "@/layouts/Appbar.vue";
import { storeToRefs } from "pinia";
import { useAlertStore } from "@/stores/alert";

const { show, config } = storeToRefs(useAlertStore());
</script>
<style lang="scss" scoped>
.container__main {
  height: calc(100svh - var(--v-layout-top));
  overflow-y: auto;
}
</style>
