<template>
  <!-- <v-card class="auto">
    <v-card-item>
      <label style="color: gray">Seleccione los filtros de búsqueda:</label>
    </v-card-item>
    <v-card-text style="padding: 5px">
      <v-row class="mx-auto">
        <v-col cols="3">
          <v-select
            v-model="dataCampus"
            density="compact"
            label="Sede"
            :items="campusArray"
            item-title="text"
            item-value="value"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="dataGeneration"
            density="compact"
            label="Generación"
            :items="campusGenerations"
            item-title="entryName"
            item-value="id"
            :disabled="!dataCampus"
          ></v-select>
        </v-col>
        <v-col class="align-center" cols="6">
          <v-btn
            color="grey"
            :disabled="!isFormValid"
            :loading="loading"
            class="mr-2"
            prepend-icon="mdi-magnify"
            @click="filterData"
            >BUSCAR</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card> -->
  <v-data-table
    :headers="headers"
    :items="vacant"
    class="elevation-1"
    :loading="loading"
    :search="search"
    item-value="id"
  >
    <template #[`item.created_at`]="{ item }">
      {{ dayjs(item.created_at).format("DD/MM/YYYY HH:mm:ss") }}
    </template>
    <template #[`item.actions`]="{ item }">
      <div style="width: 100%; text-align: right">
        <v-tooltip text="Editar" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              color="warning"
              size="small"
              density="comfortable"
              icon="mdi-pencil"
              class="mr-2"
              @click="editItem(item)"
            >
            </v-btn>
          </template>
        </v-tooltip>

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
  vacant: { type: Array, default: () => [] },
  loading: { type: Boolean, default: () => false },
});

const search = ref("");

const emit = defineEmits(["create", "edit", "remove"]);

const headers = computed(() => [
  {
    title: "Nombre",
    key: "vacant_name",
  },
  {
    title: "Fecha de publicación",
    key: "created_at",
  },
  {
    title: "Estatus",
    key: "status",
  },
  {
    title: "",
    key: "actions",
  },
]);

const editItem = (item) => {
  emit("edit", item.id);
};

const deleteItem = (item) => {
  emit("remove", item.id);
};
</script>
