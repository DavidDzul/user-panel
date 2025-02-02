<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="400px"
    @keydown.stop.esc="close"
    :persistent="true"
  >
    <v-card>
      <v-card-title> Visualización de CV </v-card-title>
      <v-card-text>
        <p>
          Para facilitar tu búsqueda de empleo, tu currículum vitae estará
          disponible para que las empresas interesadas puedan contactarte. Por
          favor, selecciona tu disponibilidad laboral actual.
        </p>
        <v-radio-group class="mt-5" v-model="selectedAvailable" mandatory>
          <v-radio label="Tiempo completo" value="FULL_TIME"></v-radio>
          <v-radio label="Medio tiempo" value="PART_TIME"></v-radio>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="text" :disabled="loading" @click="close">
          Cancelar
        </v-btn>
        <v-btn
          :loading="loading"
          :disabled="!selectedAvailable"
          color="primary"
          variant="text"
          @click="save"
        >
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: () => false },
  loading: { type: Boolean, default: () => false },
  editItem: { type: Object, default: () => null },
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  submit: [value: Object];
}>();

const selectedAvailable = ref(null);

const close = () => {
  emit("update:modelValue", false);
};

const save = () => {
  emit("submit", selectedAvailable.value);
};
</script>
