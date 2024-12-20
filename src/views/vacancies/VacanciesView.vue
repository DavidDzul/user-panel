<template>
  <v-container>
    <v-row>
      <!-- Columna izquierda: Listado de vacantes -->
      <v-col cols="12" md="3">
        <v-card class="my-8">
          <v-card-title style="background-color: rgba(0, 0, 0, 0.03)">
            <small>Filtros de búsqueda</small>
          </v-card-title>

          <v-card-text>
            <v-row class="mt-2">
              <v-col cols="12" md="12">
                <v-text-field
                  label="Buscar"
                  append-inner-icon="mdi-magnify"
                  density="compact"
                ></v-text-field>
                <v-select label="Tipo de vacante" density="compact"></v-select>
                <v-select label="Sede" density="compact"></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <VacanciesList :list="vacancies" @open="openVacantDetail" />
      </v-col>

      <!-- Columna derecha: Información de la vacante fija -->
      <!-- <v-col cols="12" md="8" class="right-column">
        <div class="vacant-details">
          <v-card class="mx-auto my-8" elevation="16" max-width="344">
            <v-card-item>
              <v-card-title> Card title </v-card-title>

              <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
            </v-card-item>

            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </v-card-text>
          </v-card>
        </div>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useVacanciesPageStore } from "@/stores/views/vacanciesPage";

import VacanciesList from "@/components/vacancies/VacanciesList.vue";

const { vacancies, vacantDetailDialog } = storeToRefs(useVacanciesPageStore());
const { openVacantDetail } = useVacanciesPageStore();
</script>

<style scoped></style>
