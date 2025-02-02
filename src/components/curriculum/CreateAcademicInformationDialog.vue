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
          <v-toolbar-title>Formación académica</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="postgraduate_name"
                v-bind="postgraduate_nameProps"
                label="Nombre de la licenciatura"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="institute_name"
                v-bind="institute_nameProps"
                label="Nombre de la institución"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="postgraduate_start_date"
                v-bind="postgraduate_start_dateProps"
                label="Fecha de inicio"
                placeholder="Mes y año"
                hint="Ej: Diciembre 2024"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="postgraduate_end_date"
                v-bind="postgraduate_end_dateProps"
                label="Fecha de término"
                placeholder="Mes y año"
                hint="Ej: Diciembre 2024 o Actualidad"
                persistent-hint
              ></v-text-field>
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
      postgraduate_name: validations.postgraduate_name(),
      institute_name: validations.institute_name(),
      postgraduate_start_date: validations.postgraduate_start_date(),
      postgraduate_end_date: validations.postgraduate_end_date(),
    })
  ),
});

const [postgraduate_name, postgraduate_nameProps] = defineField(
  "postgraduate_name",
  vuetifyConfig
);
const [institute_name, institute_nameProps] = defineField(
  "institute_name",
  vuetifyConfig
);
const [postgraduate_start_date, postgraduate_start_dateProps] = defineField(
  "postgraduate_start_date",
  vuetifyConfig
);
const [postgraduate_end_date, postgraduate_end_dateProps] = defineField(
  "postgraduate_end_date",
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
