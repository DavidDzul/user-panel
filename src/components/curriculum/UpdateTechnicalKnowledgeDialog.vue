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
          <v-toolbar-title>Conocimientos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <!-- <v-text-field
                v-model="course_name"
                v-bind="course_nameProps"
                label="Puesto del curso"
              ></v-text-field> -->
              <v-select
                v-model="type"
                :items="typeKnowledge"
                v-bind="typeProps"
                item-title="text"
                item-value="value"
                label="Categoria"
              ></v-select>
            </v-col>
            <v-col cols="12" md="12" v-if="type === 'OTHER'">
              <v-text-field
                v-model="other_knowledge"
                v-bind="other_knowledgeProps"
                label="Otro"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="description_knowledge"
                v-bind="description_knowledgeProps"
                label="Descripción"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-select
                v-model="level"
                :items="levelKnowledge"
                v-bind="levelProps"
                item-title="text"
                item-value="value"
                label="Nivel de dominio"
              ></v-select>
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
import { typeKnowledge, levelKnowledge } from "@/constants";

const vuetifyConfig = (state: PublicPathState) => ({
  props: {
    "error-messages": state.errors,
  },
});
const { defineField, meta, values, setValues, resetForm } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      id: validations.id(),
      type: validations.type(),
      other_knowledge: validations.other_knowledge(),
      description_knowledge: validations.description_knowledge(),
      level: validations.level(),
    })
  ),
});

const [type, typeProps] = defineField("type", vuetifyConfig);
const [other_knowledge, other_knowledgeProps] = defineField(
  "other_knowledge",
  vuetifyConfig
);
const [description_knowledge, description_knowledgeProps] = defineField(
  "description_knowledge",
  vuetifyConfig
);
const [level, levelProps] = defineField("level", vuetifyConfig);

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
    if (!value) {
      resetForm();
    }
  }
);

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      if (props.editItem) {
        setValues({
          id: props.editItem.id,
          type: props.editItem.type,
          other_knowledge: props.editItem.other_knowledge,
          description_knowledge: props.editItem.description_knowledge,
          level: props.editItem.level,
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
