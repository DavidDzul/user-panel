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
          <v-toolbar-title>Nueva vacante laboral </v-toolbar-title>
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
                :complete="step > 2"
                title="Prestaciones de Ley"
                :value="2"
              ></v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item
                title="Información adicional"
                :value="3"
              ></v-stepper-item>
              <v-divider></v-divider>
              <v-stepper-item title="Contacto" :value="4"></v-stepper-item>
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
                    <v-text-field
                      v-model="net_salary"
                      v-bind="net_salaryProps"
                      label="Sueldo neto"
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
                    <b
                      >Seleccione las prestaciones que ofrece la vacante
                      laboral:</b
                    >
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="employment_contract"
                      v-bind="employment_contractProps"
                      label="Contrato laboral"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="vacation"
                      v-bind="vacationProps"
                      label="Vacaciones"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="christmas_bonus"
                      v-bind="christmas_bonusProps"
                      label="Aguinaldo"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="vacation_bonus"
                      v-bind="vacation_bonusProps"
                      label="Prima vacacional"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="social_security"
                      v-bind="social_securityProps"
                      label="Seguro social"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="grocery_vouchers"
                      v-bind="grocery_vouchersProps"
                      label="Vales de despensa"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="savings_fund"
                      v-bind="savings_fundProps"
                      label="Fondo de ahorro"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="life_insurance"
                      v-bind="life_insuranceProps"
                      label="Seguro de vida"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="medical_expenses"
                      v-bind="medical_expensesProps"
                      label="Seguro de gastos médicos"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="day_off"
                      v-bind="day_offProps"
                      label="Día de descanso obligatorio"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="sunday_bonus"
                      v-bind="sunday_bonusProps"
                      label="Prima dominical"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="paternity_leave"
                      v-bind="paternity_leaveProps"
                      label="Licencia de maternidad/paternidad, de lactancia y/o adpoción"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="transportation_help"
                      v-bind="transportation_helpProps"
                      label="Ayuda o servicios de transporte (vales de gasolina, transporte)"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="productivity_bonus"
                      v-bind="productivity_bonusProps"
                      label="Bonos de productividad"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="automobile"
                      v-bind="automobileProps"
                      label="Automóvil"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="dining_room"
                      v-bind="dining_roomProps"
                      label="Servicio de comedor"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="loans"
                      v-bind="loansProps"
                      label="Préstamos y/o créditos"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-checkbox
                      v-model="other"
                      v-bind="otherProps"
                      label="Otro"
                      density="comfortable"
                    ></v-checkbox>
                    <v-text-field
                      v-if="other"
                      v-model="benefit_description"
                      v-bind="benefit_descriptionProps"
                      label="Especificar"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-col class="my-5" cols="12" md="12">
                  <v-row justify="space-between">
                    <v-btn color="grey" @click="back">Atrás</v-btn>
                    <v-btn color="primary" @click="next">Siguiente</v-btn>
                  </v-row>
                </v-col>
              </v-stepper-window-item>
              <v-stepper-window-item :value="3">
                <v-row>
                  <v-col cols="12" md="12">
                    <b>Horario laboral:</b>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="start_day"
                      :items="daysValue"
                      v-bind="start_dayProps"
                      item-title="text"
                      item-value="value"
                      label="Día laboral inicio"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="end_day"
                      :items="daysValue"
                      v-bind="end_dayProps"
                      item-title="text"
                      item-value="value"
                      label="Día laboral fin"
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
                    <v-checkbox
                      v-model="saturday_hour"
                      v-bind="saturday_hourProps"
                      label="Horario de Sábados"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="6" v-if="saturday_hour">
                    <v-text-field
                      v-model="saturday_start_day"
                      v-bind="saturday_start_dayProps"
                      label="Hora de inicio"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" v-if="saturday_hour">
                    <v-text-field
                      v-model="saturday_end_day"
                      v-bind="saturday_end_dayProps"
                      label="Hora de término"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-textarea
                      v-model="additional_time_info"
                      v-bind="additional_time_infoProps"
                      label="Información adicional respecto al horario"
                      rows="3"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="12">
                    <b>Conocimientos:</b>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-checkbox
                      v-model="experience"
                      v-bind="experienceProps"
                      label="¿Necesita experiencia?"
                      density="comfortable"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="12" v-if="experience">
                    <v-textarea
                      v-model="experience_description"
                      v-bind="experience_descriptionProps"
                      label="Especificar"
                      rows="3"
                    ></v-textarea>
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
                    <v-textarea
                      v-model="observations"
                      v-bind="observationsProps"
                      label="Observaciones"
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
                      :disabled="validateStep3"
                      >Siguiente</v-btn
                    >
                  </v-row>
                </v-col>
              </v-stepper-window-item>
              <v-stepper-window-item :value="4">
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
      net_salary: validations.net_salary(),
      start_day: validations.start_day(),
      end_day: validations.end_day(),
      start_hour: validations.start_hour(),
      end_hour: validations.end_hour(),
      saturday_hour: validations.saturday_hour(),
      saturday_start_day: validations.saturday_start_day(),
      saturday_end_day: validations.saturday_end_day(),
      additional_time_info: validations.additional_time_info(),
      experience: validations.experience(),
      experience_description: validations.experience_description(),
      software_use: validations.software_use(),
      software_description: validations.software_description(),
      skills: validations.skills(),
      observations: validations.observations(),
      contact_name: validations.contact_name(),
      contact_position: validations.contact_position(),
      contact_telphone: validations.contact_telphone(),
      contact_email: validations.contact_email(),

      employment_contract: validations.employment_contract(),
      vacation: validations.vacation(),
      christmas_bonus: validations.christmas_bonus(),
      vacation_bonus: validations.vacation_bonus(),
      social_security: validations.social_security(),
      grocery_vouchers: validations.grocery_vouchers(),
      savings_fund: validations.savings_fund(),
      life_insurance: validations.life_insurance(),
      medical_expenses: validations.medical_expenses(),
      day_off: validations.day_off(),
      sunday_bonus: validations.sunday_bonus(),
      paternity_leave: validations.paternity_leave(),
      transportation_help: validations.transportation_help(),
      productivity_bonus: validations.productivity_bonus(),
      automobile: validations.automobile(),
      dining_room: validations.dining_room(),
      loans: validations.loans(),
      other: validations.other(),
      benefit_description: validations.benefit_description(),
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
const [net_salary, net_salaryProps] = defineField("net_salary", vuetifyConfig);
const [start_day, start_dayProps] = defineField("start_day", vuetifyConfig);
const [end_day, end_dayProps] = defineField("end_day", vuetifyConfig);
const [start_hour, start_hourProps] = defineField("start_hour", vuetifyConfig);
const [end_hour, end_hourProps] = defineField("end_hour", vuetifyConfig);
const [saturday_hour, saturday_hourProps] = defineField(
  "saturday_hour",
  vuetifyConfig
);
const [saturday_start_day, saturday_start_dayProps] = defineField(
  "saturday_start_day",
  vuetifyConfig
);
const [saturday_end_day, saturday_end_dayProps] = defineField(
  "saturday_end_day",
  vuetifyConfig
);
const [additional_time_info, additional_time_infoProps] = defineField(
  "additional_time_info",
  vuetifyConfig
);
const [experience, experienceProps] = defineField("experience", vuetifyConfig);
const [experience_description, experience_descriptionProps] = defineField(
  "experience_description",
  vuetifyConfig
);
const [software_use, software_useProps] = defineField(
  "software_use",
  vuetifyConfig
);
const [software_description, software_descriptionProps] = defineField(
  "software_description",
  vuetifyConfig
);
const [skills, skillsProps] = defineField("skills", vuetifyConfig);
const [observations, observationsProps] = defineField(
  "observations",
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

const [employment_contract, employment_contractProps] = defineField(
  "employment_contract",
  vuetifyConfig
);

const [vacation, vacationProps] = defineField("vacation", vuetifyConfig);
const [christmas_bonus, christmas_bonusProps] = defineField(
  "christmas_bonus",
  vuetifyConfig
);
const [vacation_bonus, vacation_bonusProps] = defineField(
  "vacation_bonus",
  vuetifyConfig
);
const [social_security, social_securityProps] = defineField(
  "social_security",
  vuetifyConfig
);
const [grocery_vouchers, grocery_vouchersProps] = defineField(
  "grocery_vouchers",
  vuetifyConfig
);
const [savings_fund, savings_fundProps] = defineField(
  "savings_fund",
  vuetifyConfig
);
const [life_insurance, life_insuranceProps] = defineField(
  "life_insurance",
  vuetifyConfig
);
const [medical_expenses, medical_expensesProps] = defineField(
  "medical_expenses",
  vuetifyConfig
);
const [day_off, day_offProps] = defineField("day_off", vuetifyConfig);
const [sunday_bonus, sunday_bonusProps] = defineField(
  "sunday_bonus",
  vuetifyConfig
);
const [paternity_leave, paternity_leaveProps] = defineField(
  "paternity_leave",
  vuetifyConfig
);
const [transportation_help, transportation_helpProps] = defineField(
  "transportation_help",
  vuetifyConfig
);
const [productivity_bonus, productivity_bonusProps] = defineField(
  "productivity_bonus",
  vuetifyConfig
);
const [automobile, automobileProps] = defineField("automobile", vuetifyConfig);
const [dining_room, dining_roomProps] = defineField(
  "dining_room",
  vuetifyConfig
);
const [loans, loansProps] = defineField("loans", vuetifyConfig);
const [other, otherProps] = defineField("other", vuetifyConfig);
const [benefit_description, benefit_descriptionProps] = defineField(
  "benefit_description",
  vuetifyConfig
);

const props = defineProps({
  modelValue: { type: Boolean, default: () => false },
  loading: { type: Boolean, default: () => false },
});

const validateStep1 = computed(() => {
  return vacant_name.value &&
    activities.value &&
    study_profile.value &&
    net_salary.value
    ? false
    : true;
});

const validateStep3 = computed(() => {
  return start_day.value &&
    end_day.value &&
    start_hour.value &&
    end_hour.value &&
    skills.value
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
      category.value = "JOB_POSITION";
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
