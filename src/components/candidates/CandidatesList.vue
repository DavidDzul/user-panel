<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="9" md="12">
        <v-text-field
          class="mx-5"
          v-model="search"
          hide-details
          prepend-icon="mdi-magnify"
          density="compact"
          single-line
          label="Nombre, apellido, título profesional, resumen profesional, localidad, estado."
          :clearable="true"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" md="12">
        <div class="text-right pa-2">
          <span> <b>Total de resultados:</b> {{ totalResults }}</span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, index) in paginatedList"
        :key="index"
        cols="12"
        md="12"
        lg="12"
      >
        <v-card
          @click="openCV(item)"
          @mouseenter="hover = index"
          @mouseleave="hover = null"
          :style="cardStyle(index)"
          :disabled="loading"
          :loading="loading"
        >
          <v-card-title class="pa-5">
            <h3 style="color: #ff7900">
              {{ item.first_name.split(" ")[0] }}
            </h3>
          </v-card-title>

          <v-card-text>
            <v-row class="pt-0">
              <v-col cols="12">
                <h3>
                  {{
                    item.academic_information
                      ? item.academic_information.postgraduate_name
                      : ""
                  }}
                </h3>

                <p>
                  {{ item.locality }}, {{ item.state }},
                  {{ item.country }}
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12"> {{ item.professional_summary }} </v-col>
            </v-row>
          </v-card-text>
          <!-- <v-card-actions>
                <small class="mx-3" style="color: #275ffc">
                  Publicado: {{ formattedHistory(item.created_at) }}
                </small>
              </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Paginación -->
  <div class="text-center pt-2">
    <v-pagination v-model="page" :length="pageCount"></v-pagination>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

const props = defineProps({
  list: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
});

const page = ref(1);
const itemsPerPage = ref(7);
const hover = ref(null);
const search = ref("");

dayjs.extend(relativeTime);
dayjs.locale("es");

const emit = defineEmits(["open", "remove"]);

const filteredList = computed(() => {
  const searchTerm = search.value.toLowerCase();

  return props.list.filter((item) => {
    // Verifica si academic_information existe y busca en postgraduate_name
    const matchesAcademicInfo = item.academic_information
      ? item.academic_information.postgraduate_name
          .toLowerCase()
          .includes(searchTerm)
      : false;

    // Verifica en otros campos
    const matchesOtherFields =
      item.professional_summary.toLowerCase().includes(searchTerm) ||
      item.first_name.toLowerCase().includes(searchTerm) ||
      item.last_name.toLowerCase().includes(searchTerm) ||
      item.locality.toLowerCase().includes(searchTerm) ||
      item.state.toLowerCase().includes(searchTerm);

    // Combina todas las condiciones
    return matchesAcademicInfo || matchesOtherFields;
  });
});

const totalResults = computed(() => filteredList.value.length);

const paginatedList = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  return filteredList.value.slice(start, start + itemsPerPage.value);
});

const pageCount = computed(() => {
  return Math.ceil(filteredList.value.length / itemsPerPage.value);
});

// Reseteo de página al cambiar los resultados filtrados
// watch([filteredList, props.search], () => {
//   page.value = 1;
// });

const openCV = (item) => {
  emit("open", item.id);
};

const cardStyle = (index) => {
  return hover.value === index ? { backgroundColor: "#ffffeb" } : {};
};
</script>
