<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="400px"
    @keydown.stop.esc="close"
    :persistent="true"
  >
    <v-card>
      <v-card-title> Desactivar vacante </v-card-title>
      <v-card-text>
        <p>
          La vacante será deshabilitada y dejará de estar visible para los
          usuarios. Por favor, selecciona el estatus correspondiente para
          indicar si la vacante ha sido cubierta.
        </p>
        <v-radio-group class="mt-5" v-model="selectedCandidateType" mandatory>
          <v-radio
            label="Candidato interno de Impulso Universitario A.C."
            value="INTERNAL"
          ></v-radio>
          <v-radio label="Candidato externo" value="EXTERNAL"></v-radio>
          <v-radio label="No fue cubierto" value="NOT_COVERED"></v-radio>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="text" @click="close"> Cancelar </v-btn>
        <v-btn
          :disabled="!selectedCandidateType"
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

const selectedCandidateType = ref(null);

const close = () => {
  emit("update:modelValue", false);
};

const save = () => {
  emit("submit", selectedCandidateType.value);
};
</script>
