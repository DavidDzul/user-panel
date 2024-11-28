<template>
  <v-data-table
    :headers="headers"
    :items="knowledges"
    class="elevation-1"
    :loading="loading"
    :search="search"
    item-value="id"
  >
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

const props = defineProps({
  knowledges: { type: Array, default: () => [] },
  loading: { type: Boolean, default: () => false },
});

const search = ref("");
const groupBy = ref(undefined);

const emit = defineEmits(["create", "edit", "remove"]);

const headers = computed(() => [
  {
    title: "Categoría",
    key: "type",
  },
  {
    title: "Descripción",
    key: "description_knowledge",
  },
  {
    title: "Nivel de dominio",
    key: "level",
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
