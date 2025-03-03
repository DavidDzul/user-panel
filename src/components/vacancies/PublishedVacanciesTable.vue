<template>
  <v-data-table
    :headers="headers"
    :items="vacant"
    class="elevation-1"
    :loading="loading"
    :search="search"
    item-value="id"
  >
    <template #top>
      <v-toolbar :flat="true">
        <p style="font-size: 18px; margin: 15px">Vacantes publicadas</p>
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
    <template #[`item.vacant_name`]="{ item }">
      {{ item.vacant_name }}
      <v-tooltip text="Visualizar" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            variant="text"
            color="warning"
            size="small"
            density="comfortable"
            icon="mdi-eye"
            class="ml-2"
            @click="openVacant(item)"
          >
          </v-btn>
        </template>
      </v-tooltip>
    </template>
    <template #[`item.category`]="{ item }">
      {{ vacantTypeMap.get(item.category).text }}
    </template>
    <template #[`item.created_at`]="{ item }">
      {{ dayjs(item.created_at).format("DD/MM/YYYY HH:mm:ss") }}
    </template>
    <!-- <template #[`item.published`]="{ item }">
      <v-icon v-if="item.published" color="success">mdi-check</v-icon>
      <v-icon v-else color="error">mdi-close</v-icon>
    </template> -->
    <!-- <template #[`item.candidate_type`]="{ item }">
      {{
        item.candidate_type === "INTERNAL"
          ? "CANDIDATO INTERNO IU"
          : item.candidate_type === "EXTERNAL"
          ? "CANDIDATO EXTERNO"
          : item.candidate_type === "NOT_COVERED"
          ? "NO CUBIERTA"
          : ""
      }}
    </template> -->

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

        <v-tooltip text="Desactivar" location="bottom" v-if="item.status">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              color="error"
              size="small"
              density="comfortable"
              icon="mdi-delete"
              class="mr-2"
              @click="statusItem(item)"
            >
            </v-btn>
          </template>
        </v-tooltip>
        <!-- <v-tooltip text="Activar" location="bottom" v-else>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              color="success"
              size="small"
              density="comfortable"
              icon="mdi-account-check"
              class="mr-2"
              @click="statusItem(item)"
            >
            </v-btn>
          </template>
        </v-tooltip> -->

        <!-- <v-tooltip text="Eliminar" location="bottom">
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
        </v-tooltip> -->
      </div>
    </template>
    <template #no-data> No existen datos registrados </template>
  </v-data-table>
</template>

<script setup>
import { computed, ref } from "vue";
import dayjs from "dayjs";

import { vacantTypeMap } from "@/constants";

const props = defineProps({
  vacant: { type: Array, default: () => [] },
  loading: { type: Boolean, default: () => false },
  user: { type: Object, required: true },
});

const search = ref("");

const emit = defineEmits([
  "open",
  "create",
  "edit",
  "remove",
  "status",
  "practice",
  "junior",
]);

const headers = computed(() => [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "Nombre",
    key: "vacant_name",
  },
  {
    title: "Tipo",
    key: "category",
  },
  {
    title: "Fecha de publicación",
    key: "created_at",
  },
  // {
  //   title: "Publicado",
  //   key: "published",
  // },
  // {
  //   title: "Estatus",
  //   key: "candidate_type",
  // },
  {
    title: "",
    key: "actions",
  },
]);

const logCategory = (category) => {
  return category === "PROFESSIONAL_PRACTICE"
    ? "Prácticas profesionales"
    : "Laboral";
};

const editItem = (item) => {
  if (item.category === "PROFESSIONAL_PRACTICE") {
    emit("practice", item.id);
  } else if (item.category === "JOB_POSITION") {
    emit("edit", item.id);
  } else if (item.category === "JR_POSITION") {
    emit("junior", item.id);
  }
};

const statusItem = (item) => {
  emit("status", item);
};

const openVacant = (item) => {
  emit("open", item.id);
};
</script>
