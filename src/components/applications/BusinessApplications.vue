<template>
  <v-data-table
    :headers="headers"
    :items="applications"
    class="elevation-1"
    :loading="loading"
    :search="search"
    item-value="id"
  >
    <template #top>
      <v-toolbar :flat="true">
        <p style="font-size: 18px; margin: 15px">Listado de postulaciones</p>
        <v-text-field
          class="mx-10"
          v-model="search"
          hide-details
          prepend-icon="mdi-magnify"
          density="compact"
          single-line
          label="Buscar"
          :clearable="true"
        ></v-text-field>
      </v-toolbar>
    </template>
    <template #[`item.vacant_id`]="{ item }">
      {{ item.vacant.vacant_name }}
    </template>
    <template #[`item.user_id`]="{ item }">
      {{ item.user.first_name }}
      {{ item.user.last_name }}
    </template>
    <template #[`item.view_cv`]="{ item }">
      <v-btn
        v-bind="props"
        color="warning"
        density="comfortable"
        class="mr-2"
        @click="openCV(item)"
      >
        <v-icon size="small" class="mr-2">mdi-eye</v-icon>
        Abrir
      </v-btn>
    </template>
    <template #[`item.created_at`]="{ item }">
      {{ dayjs(item.created_at).format("DD/MM/YYYY HH:mm:ss") }}
    </template>
    <template #[`item.actions`]="{ item }">
      <div style="width: 100%; text-align: right">
        <v-tooltip text="Eliminar" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              color="error"
              size="small"
              density="comfortable"
              icon="mdi-delete"
              class="mr-2"
              @click="deleteItem(item)"
            >
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </template>
    <template #no-data> No existen datos registrados </template>
  </v-data-table>
</template>

<script setup>
import { computed, ref } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  applications: { type: Array, default: () => [] },
  loading: { type: Boolean, default: () => false },
});

const search = ref("");
const groupBy = ref(undefined);

const emit = defineEmits(["submit", "remove"]);

const headers = computed(() => [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "Vacante",
    key: "vacant_id",
  },
  {
    title: "Usuario",
    key: "user_id",
  },
  {
    title: "Curriculum Vitae",
    key: "view_cv",
  },
  {
    title: "Fecha",
    key: "created_at",
  },
  {
    title: "",
    key: "actions",
  },
]);

const deleteItem = (item) => {
  emit("remove", item.id);
};

const openCV = (item) => {
  emit("submit", item.user_id);
};
</script>
