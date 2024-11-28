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
          <v-toolbar-title>Educación continua</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="course_name"
                v-bind="course_nameProps"
                label="Puesto del curso"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="course_institute"
                v-bind="course_instituteProps"
                label="Nombre de la institución"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="course_start_date"
                v-bind="course_start_dateProps"
                label="Fecha de inicio"
                placeholder="Mes y año"
                hint="Ej: Diciembre 2024"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="course_end_date"
                v-bind="course_end_dateProps"
                label="Fecha de término"
                placeholder="Mes y año"
                hint="Ej: Diciembre 2024"
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
const { defineField, meta, values, setValues, resetForm } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      id: validations.id(),
      course_name: validations.course_name(),
      course_institute: validations.course_institute(),
      course_start_date: validations.course_start_date(),
      course_end_date: validations.course_end_date(),
    })
  ),
});

const [course_name, course_nameProps] = defineField(
  "course_name",
  vuetifyConfig
);
const [course_institute, course_instituteProps] = defineField(
  "course_institute",
  vuetifyConfig
);
const [course_start_date, course_start_dateProps] = defineField(
  "course_start_date",
  vuetifyConfig
);
const [course_end_date, course_end_dateProps] = defineField(
  "course_end_date",
  vuetifyConfig
);

const props = defineProps({
  modelValue: { type: Boolean, default: () => false },
  loading: { type: Boolean, default: () => false },
  editItem: { type: Object, default: () => null },
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  submit: [value: Object];
}>();

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      if (props.editItem) {
        setValues({
          id: props.editItem.id,
          course_name: props.editItem.course_name,
          course_institute: props.editItem.course_institute,
          course_start_date: props.editItem.course_start_date,
          course_end_date: props.editItem.course_end_date,
        });
      }
    } else {
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
