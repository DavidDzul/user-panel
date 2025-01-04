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
                  v-model="search"
                  label="Buscar"
                  append-inner-icon="mdi-magnify"
                  density="compact"
                ></v-text-field>
                <v-select
                  v-model="type"
                  :items="vacantType"
                  item-title="text"
                  item-value="value"
                  label="Tipo de vacante"
                  density="compact"
                  clearable
                ></v-select>
                <v-select
                  v-model="sede"
                  :items="sedeArray"
                  item-title="text"
                  item-value="value"
                  label="Sede"
                  density="compact"
                  clearable
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <VacanciesList
          :list="vacancies"
          :search="search"
          :type="type"
          @open="openVacantDetail"
        />
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
import { ref, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { useVacanciesPageStore } from "@/stores/views/vacanciesPage";

import VacanciesList from "@/components/vacancies/VacanciesList.vue";
import { vacantType, sedeArray } from "@/constants";

const { vacancies, vacantDetailDialog } = storeToRefs(useVacanciesPageStore());
const { openVacantDetail } = useVacanciesPageStore();

const search = ref("");
const type = ref("");
const sede = ref("");
</script>

<style scoped></style>
