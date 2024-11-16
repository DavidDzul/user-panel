<template>
  <v-layout id="app">
    <Appbar />
    <v-main class="h-100">
      <v-img
        :src="currentBackgroundImage"
        height="100"
        class="background-image"
        cover
      >
        <div class="overlay">
          <h1 class="bg-img-title">{{ currentTitle }}</h1>
        </div>
      </v-img>
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
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { show, config } = storeToRefs(useAlertStore());

const currentTitle = computed(() => route.meta.title);
const currentBackgroundImage = computed(() => route.meta.backgroundImage);
</script>
<style lang="scss">
.container__main {
  // height: calc(100svh - var(--v-layout-top));
  overflow-y: auto;
}
</style>
