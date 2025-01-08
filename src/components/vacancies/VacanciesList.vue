<template>
  <div>
    <!-- Mostrar total de resultados -->

    <!-- Tarjetas de vacantes -->
    <v-container fluid>
      <div class="text-right pa-2">
        <span> <b>Total de resultados:</b> {{ totalResults }}</span>
      </div>
      <v-row>
        <v-col
          v-for="(item, index) in paginatedList"
          :key="index"
          cols="12"
          md="12"
          lg="12"
        >
          <!-- {{ item }} -->
          <v-card
            @click="openVacant(item)"
            @mouseenter="hover = index"
            @mouseleave="hover = null"
            :style="cardStyle(index)"
          >
            <v-card-title>
              <h3 style="color: #ff7900">{{ item.vacant_name }}</h3>
            </v-card-title>
            {{ item }}
            <!-- <v-card-text>
              <v-row>
                <v-col cols="12">
                  <h4>{{ item.business.bs_name }}</h4>
                  <p>
                    {{ item.business.bs_locality }},
                    {{ item.business.bs_state }}, {{ item.business.bs_country }}
                  </p>
                </v-col>
                <v-col cols="12">
                  {{ item.activities.substr(0, 150) }}...
                </v-col>
              </v-row>
            </v-card-text> -->
            <v-card-actions>
              <small class="mx-3" style="color: #275ffc">
                Publicado: {{ formattedHistory(item.created_at) }}
              </small>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Paginación -->
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
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
  search: { type: String, default: "" },
  type: { type: String, default: "" },
});

const page = ref(1);
const itemsPerPage = ref(7);
const hover = ref(null);

dayjs.extend(relativeTime);
dayjs.locale("es");

const emit = defineEmits(["open", "remove"]);

const filteredList = computed(() => {
  const searchTerm = props.search.toLowerCase();
  return props.list.filter((item) => {
    const matchesCategory = !props.type || item.category === props.type; // Filtro condicional
    const matchesSearch =
      item.vacant_name.toLowerCase().includes(searchTerm) ||
      item.business.bs_name.toLowerCase().includes(searchTerm) ||
      item.business.bs_locality.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
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

const openVacant = (item) => {
  emit("open", item.id);
};

const formattedHistory = (time) => {
  const date = dayjs(time);
  return dayjs().to(date);
};

const cardStyle = (index) => {
  return hover.value === index ? { backgroundColor: "#ffffeb" } : {};
};
</script>

<style scoped>
.v-card {
  margin-bottom: 16px;
  transition: background-color 0.3s ease;
}
</style>
