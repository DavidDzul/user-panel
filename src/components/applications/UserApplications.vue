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
    <template #[`item.business_id`]="{ item }">
      {{ item.business.bs_name }}
    </template>
    <template #[`item.vacant_id`]="{ item }">
      {{ item.vacant.vacant_name }}
      <v-tooltip text="Abrir" location="bottom">
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
    <template #[`item.status`]="{ item }">
      <p
        :style="{
          color:
            item.status === 'ACCEPTED'
              ? 'green'
              : item.status === 'REJECTED'
              ? 'red'
              : '',
        }"
      >
        {{ statusApplicationMap?.get(item.status)?.text }}
      </p>
    </template>
    <template #[`item.rejected_reason`]="{ item }">
      <span v-if="item.rejected_reason !== 'OTHER'">
        {{ rejectedReasonMap.get(item.rejected_reason).text }}
      </span>
      <span v-else> {{ item.rejected_other }} </span>
    </template>
    <template #[`item.created_at`]="{ item }">
      {{ dayjs(item.created_at).format("DD/MM/YYYY HH:mm:ss") }}
    </template>
    <template #[`item.actions`]="{ item }">
      <template v-if="item.status === 'PENDING'">
        <div style="width: 100%; text-align: right">
          <v-tooltip text="Descartar" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                color="warning"
                density="comfortable"
                icon="mdi-account-remove"
                class="mr-2"
                @click="rejectedItem(item)"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </template>
    </template>
    <template #no-data> No existen datos registrados </template>
  </v-data-table>
</template>

<script setup>
import { computed, ref } from "vue";
import dayjs from "dayjs";

import { statusApplicationMap, rejectedReasonMap } from "../../constants";

const props = defineProps({
  applications: { type: Array, default: () => [] },
  loading: { type: Boolean, default: () => false },
});

const search = ref("");
const groupBy = ref(undefined);

const emit = defineEmits(["submit", "rejected"]);

const headers = computed(() => {
  const baseHeaders = [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Empresa",
      key: "business_id",
    },
    {
      title: "Vacante",
      key: "vacant_id",
    },
    {
      title: "Estatus",
      key: "status",
    },
    {
      title: "Fecha",
      key: "created_at",
    },
    {
      title: "",
      key: "actions",
    },
  ];

  if (props.applications.some((item) => item.status === "REJECTED")) {
    baseHeaders.splice(4, 0, {
      title: "Motivo de Rechazo",
      key: "rejected_reason",
    });
  }

  return baseHeaders;
});

const rejectedItem = (item) => {
  emit("rejected", item.id);
};

const openVacant = (item) => {
  emit("submit", item.vacant_id);
};
</script>
