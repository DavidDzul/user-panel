<template>
  <v-layout id="app">
    <Appbar />
    <v-main class="h-100">
      <div v-if="route.meta.title" class="background-gradient">
        <div class="overlay">
          <h1 class="bg-img-title">{{ currentTitle }}</h1>
        </div>
      </div>
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
<style lang="scss" scoped>
.container__main {
  overflow-y: auto;
}

.background-gradient {
  height: 100px; /* Ajusta la altura */
  background: rgba(35, 180, 254, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.overlay {
  text-align: center;
}

.bg-img-title {
  font-size: 24px; /* Ajusta el tamaño del texto */
  color: rgb(0, 0, 0); /* Color del título */
  // text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); /* Sombra para el texto */
}
</style>
