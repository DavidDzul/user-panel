<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="890px"
    @keydown.stop.esc="close"
    :persistent="true"
  >
    <v-card>
      <v-form>
        <v-toolbar dark>
          <v-toolbar-title
            >Nueva vacante de prácticas profesionales
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-stepper v-model="step" show-actions elevation="0">
            <v-stepper-header>
              <v-stepper-item
                :complete="step > 1"
                title="Información General"
                :value="1"
              ></v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item
                title="Información adicional"
                :value="2"
              ></v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item title="Contacto" :value="3"></v-stepper-item>
            </v-stepper-header>
            <v-stepper-window>
              <v-stepper-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="12">
                    <b>Información acerca de la vacante:</b>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="vacant_name"
                      v-bind="vacant_nameProps"
                      label="Nombre de la vacante"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-textarea
                      v-model="activities"
                      v-bind="activitiesProps"
                      label="Actividades o funciones"
                      rows="3"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="study_profile"
                      v-bind="study_profileProps"
                      label="Perfil de estudios"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-checkbox
                      v-model="financial_support"
                      v-bind="financial_supportProps"
                      label="Apoyo económico"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="12" v-if="financial_support">
                    <v-text-field
                      v-model="support_amount"
                      v-bind="support_amountProps"
                      label="Monto mensual asignado"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-col class="my-5" cols="12" md="12">
                  <v-row justify="space-between">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      @click="next"
                      :disabled="validateStep1"
                      >Siguiente</v-btn
                    >
                  </v-row>
                </v-col>
              </v-stepper-window-item>
              <v-stepper-window-item :value="2">
                <v-row>
                  <v-col cols="12" md="12">
                    <b>Establecer días y horarios de prácticas:</b>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="start_day"
                      :items="daysValue"
                      v-bind="start_dayProps"
                      item-title="text"
                      item-value="value"
                      label="Día prácticas inicio"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="end_day"
                      :items="daysValue"
                      v-bind="end_dayProps"
                      item-title="text"
                      item-value="value"
                      label="Día prácticas fin"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="start_hour"
                      v-bind="start_hourProps"
                      label="Hora de inicio"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="end_hour"
                      v-bind="end_hourProps"
                      label="Hora de término"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="12">
                    <b>Conocimientos:</b>
                  </v-col>

                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="semester"
                      v-bind="semesterProps"
                      label="Semestre y/o cuatrimestre"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-checkbox
                      v-model="software_use"
                      v-bind="software_useProps"
                      label="Manejo de software"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="12" v-if="software_use">
                    <v-textarea
                      v-model="software_description"
                      v-bind="software_descriptionProps"
                      label="Software requerido"
                      rows="3"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-textarea
                      v-model="skills"
                      v-bind="skillsProps"
                      label="Habilidades y/o competencias"
                      rows="3"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-checkbox
                      v-model="general_knowledge"
                      v-bind="general_knowledgeProps"
                      label="Conocimientos generales"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="12" v-if="general_knowledge">
                    <v-textarea
                      v-model="knowledge_description"
                      v-bind="knowledge_descriptionProps"
                      label="¿Cuáles?"
                      rows="3"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-col class="my-5" cols="12" md="12">
                  <v-row justify="space-between">
                    <v-btn color="grey" @click="back">Atrás</v-btn>
                    <v-btn
                      color="primary"
                      @click="next"
                      :disabled="validateStep2"
                      >Siguiente</v-btn
                    >
                  </v-row>
                </v-col>
              </v-stepper-window-item>
              <v-stepper-window-item :value="3">
                <v-row>
                  <v-col cols="12" md="12">
                    <b>Información de contacto:</b>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="contact_name"
                      v-bind="contact_nameProps"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="contact_position"
                      v-bind="contact_positionProps"
                      label="Puesto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="contact_telphone"
                      v-bind="contact_telphoneProps"
                      label="Teléfono"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field
                      v-model="contact_email"
                      v-bind="contact_emailProps"
                      label="Correo electrónico"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-col class="my-5" cols="12" md="12">
                  <v-row justify="space-between">
                    <v-btn color="grey" @click="back">Atrás</v-btn>
                    <v-btn color="success" :disabled="!meta.valid" @click="save"
                      >Finalizar</v-btn
                    >
                  </v-row>
                </v-col>
              </v-stepper-window-item>
            </v-stepper-window>
          </v-stepper>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/yup";
import { PublicPathState, useForm } from "vee-validate";
import { computed, ref, watch } from "vue";
import * as yup from "yup";

import * as validations from "@/validations";

import { daysValue } from "@/constants";

const vuetifyConfig = (state: PublicPathState) => ({
  props: {
    "error-messages": state.errors,
  },
});
const { defineField, meta, values, setValues, resetForm } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      category: validations.category(),
      vacant_name: validations.vacant_name(),
      activities: validations.activities(),
      study_profile: validations.study_profile(),
      financial_support: validations.financial_support(),
      support_amount: validations.support_amount(),

      start_day: validations.start_day(),
      end_day: validations.end_day(),
      start_hour: validations.start_hour(),
      end_hour: validations.end_hour(),
      semester: validations.semester(),
      software_use: validations.software_use(),
      software_description: validations.software_description(),
      skills: validations.skills(),
      general_knowledge: validations.general_knowledge(),
      knowledge_description: validations.knowledge_description(),

      contact_name: validations.contact_name(),
      contact_position: validations.contact_position(),
      contact_telphone: validations.contact_telphone(),
      contact_email: validations.contact_email(),
    })
  ),
});

const [vacant_name, vacant_nameProps] = defineField(
  "vacant_name",
  vuetifyConfig
);
const [category, categoryProps] = defineField("category", vuetifyConfig);
const [activities, activitiesProps] = defineField("activities", vuetifyConfig);
const [study_profile, study_profileProps] = defineField(
  "study_profile",
  vuetifyConfig
);
const [financial_support, financial_supportProps] = defineField(
  "financial_support",
  vuetifyConfig
);
const [support_amount, support_amountProps] = defineField(
  "support_amount",
  vuetifyConfig
);
const [start_day, start_dayProps] = defineField("start_day", vuetifyConfig);
const [end_day, end_dayProps] = defineField("end_day", vuetifyConfig);
const [start_hour, start_hourProps] = defineField("start_hour", vuetifyConfig);
const [end_hour, end_hourProps] = defineField("end_hour", vuetifyConfig);

const [semester, semesterProps] = defineField("semester", vuetifyConfig);
const [software_use, software_useProps] = defineField(
  "software_use",
  vuetifyConfig
);
const [software_description, software_descriptionProps] = defineField(
  "software_description",
  vuetifyConfig
);
const [skills, skillsProps] = defineField("skills", vuetifyConfig);
const [general_knowledge, general_knowledgeProps] = defineField(
  "general_knowledge",
  vuetifyConfig
);
const [knowledge_description, knowledge_descriptionProps] = defineField(
  "knowledge_description",
  vuetifyConfig
);
const [contact_name, contact_nameProps] = defineField(
  "contact_name",
  vuetifyConfig
);
const [contact_position, contact_positionProps] = defineField(
  "contact_position",
  vuetifyConfig
);
const [contact_telphone, contact_telphoneProps] = defineField(
  "contact_telphone",
  vuetifyConfig
);
const [contact_email, contact_emailProps] = defineField(
  "contact_email",
  vuetifyConfig
);

const props = defineProps({
  modelValue: { type: Boolean, default: () => false },
  loading: { type: Boolean, default: () => false },
});

const validateStep1 = computed(() => {
  if (support_amount.value === "SI") {
    return vacant_name.value &&
      activities.value &&
      study_profile.value &&
      financial_support.value &&
      support_amount.value
      ? false
      : true;
  }
  return vacant_name.value &&
    activities.value &&
    study_profile.value &&
    financial_support.value
    ? false
    : true;
});

const validateStep2 = computed(() => {
  return start_day.value &&
    end_day.value &&
    start_hour.value &&
    end_hour.value &&
    skills.value &&
    semester.value
    ? false
    : true;
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
      step.value = 1;
    } else {
      category.value = "PROFESSIONAL_PRACTICE";
    }
  }
);

const step = ref(1);

const close = () => {
  emit("update:modelValue", false);
};

const next = () => {
  step.value++;
};

const back = () => {
  step.value--;
};

const save = () => {
  if (meta.value.valid) {
    emit("submit", values);
  }
};
</script>

<style scoped></style>
