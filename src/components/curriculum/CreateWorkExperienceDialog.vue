<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="700px"
    @keydown.stop.esc="close"
    :persistent="true"
  >
    <v-card>
      <v-form>
        <v-toolbar dark>
          <v-toolbar-title>Experiencia Laboral</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="job_position"
                v-bind="job_positionProps"
                label="Puesto de trabajo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="business_name"
                v-bind="business_nameProps"
                label="Nombre de la empresa"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="start_date"
                v-bind="start_dateProps"
                label="Fecha de inicio"
                placeholder="Mes y año"
                hint="Ej: Diciembre 2024"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="end_date"
                v-bind="end_dateProps"
                label="Fecha de término"
                placeholder="Mes y año"
                hint="Ej: Diciembre 2024 o Actualidad"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <small
                ><b>Nota:</b> Escribe las responsabilidades en un solo párrafo,
                separadas por comas y sin viñetas. Ej: Coordinar el equipo,
                garantizar objetivos, optimizar procesos, gestionar clientes y
                proveedores, elaborar reportes y proponer mejoras.
              </small>
              <v-textarea
                v-model="responsibility"
                v-bind="responsibilityProps"
                label="Responsabilidades"
                rows="3"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" :disabled="loading" @click="close"
            >Cancelar</v-btn
          >
          <v-btn
            color="primary"
            variant="text"
            :disabled="!meta.valid"
            :loading="loading"
            @click="save"
          >
            Guardar</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/yup";
import { PublicPathState, useForm } from "vee-validate";
import { computed, watch } from "vue";
import * as yup from "yup";

import * as validations from "@/validations";

const vuetifyConfig = (state: PublicPathState) => ({
  props: {
    "error-messages": state.errors,
  },
});
const { defineField, meta, values, resetField, resetForm } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      job_position: validations.job_position(),
      business_name: validations.business_name(),
      start_date: validations.start_date(),
      end_date: validations.end_date(),
      responsibility: validations.responsibility(),
    })
  ),
});

const [job_position, job_positionProps] = defineField(
  "job_position",
  vuetifyConfig
);
const [business_name, business_nameProps] = defineField(
  "business_name",
  vuetifyConfig
);
const [start_date, start_dateProps] = defineField("start_date", vuetifyConfig);
const [end_date, end_dateProps] = defineField("end_date", vuetifyConfig);
const [responsibility, responsibilityProps] = defineField(
  "responsibility",
  vuetifyConfig
);

const props = defineProps({
  modelValue: { type: Boolean, default: () => false },
  loading: { type: Boolean, default: () => false },
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  submit: [value: Object];
}>();

watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      resetForm();
    }
  }
);

const close = () => {
  emit("update:modelValue", false);
};

const save = () => {
  if (meta.value.valid) {
    emit("submit", values);
  }
};
</script>

<style scoped></style>
