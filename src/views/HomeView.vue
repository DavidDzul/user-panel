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
</template>

<script setup>
import Appbar from "@/layouts/Appbar.vue";
</script>
<style lang="scss" scoped>
.container__main {
  height: calc(100svh - var(--v-layout-top));
  overflow-y: auto;
}
</style>
