<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="780px"
  >
    <v-card>
      <!-- <v-card-title>
        <span class="text-h6"> Información Personal </span>
      </v-card-title> -->
      <v-toolbar dark>
        <v-toolbar-title>Información Personal</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text>
        <v-form ref="formRef" v-model="formValid">
          <v-row>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="form.first_name"
                label="Nombre(s)"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="form.last_name"
                label="Apellidos"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-select
                v-model.number="form.day_birth"
                :items="daysBirth"
                :rules="[rules.required]"
                item-title="text"
                item-value="value"
                label="Día de nacimiento"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-select
                v-model.number="form.month_birth"
                :items="monthBirth"
                :rules="[rules.required]"
                item-title="text"
                item-value="value"
                label="Mes de nacimiento"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model.number="form.year_birth"
                label="Año de nacimiento"
                :rules="[rules.required, rules.validYear]"
                required
                placeholder="Ej: 1998"
                @keypress="onlyNumbers"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="form.country"
                label="País"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="form.state"
                label="Estado"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="form.locality"
                label="Localidad"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="form.phone_num"
                label="Número de celular"
                :rules="[rules.required, rules.validPhone]"
                required
                @keypress="onlyNumbers"
              ></v-text-field>
            </v-col>

            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="form.email"
                label="Correo electrónico"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="form.linkedin"
                label="LinkedIn"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                variant="underlined"
                v-model="form.professional_summary"
                rows="4"
                maxlength="350"
                :rules="[rules.required, rules.maxLength]"
                required
                label="Resumen profesional"
              ></v-textarea>
              <span class="character-counter">
                {{ 350 - form.professional_summary.length }} caracteres
                restantes.
              </span>
            </v-col>
            <v-col cols="12" md="12">
              <span>
                <b>Nota: </b>Pensando en el Programa de Formación Integral y el
                acompañamiento que has llevado en Impulso, menciona las
                habilidades que consideras que has desarrollado.
              </span>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.skill_1"
                label="Habilidad 1"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.skill_2"
                label="Habilidad 2"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.skill_3"
                label="Habilidad 3"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.skill_4"
                label="Habilidad 4"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.skill_5"
                label="Habilidad 5"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="close" :disabled="loading">Cancelar</v-btn>
        <v-btn
          color="primary"
          :disabled="!formValid"
          @click="save"
          :loading="loading"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";

import { daysBirth, monthBirth } from "@/constants";

const props = defineProps({
  modelValue: { type: Boolean, default: () => false },
  initialData: { type: Object, required: false, default: null },
  loading: { type: Boolean, default: () => false },
});

const formValid = ref(false);

const rules = {
  required: (value) => !!value || "Este campo es obligatorio",
  validYear: (value) => /^\d{4}$/.test(value) || "El año debe tener 4 dígitos",
  validPhone: (value) =>
    /^\d{10}$/.test(value) || "El número de celular debe tener 10 dígitos",
  maxLength: (value) =>
    value.length <= 350 || "Máximo 350 caracteres permitidos",
};

const defaultForm = {
  first_name: "",
  last_name: "",
  email: "",
  day_birth: null,
  month_birth: null,
  year_birth: null,
  phone_type: null,
  phone_num: "",
  country: "",
  state: "",
  locality: "",
  linkedin: "",
  professional_summary: "",
  skill_1: "",
  skill_2: "",
  skill_3: "",
  skill_4: "",
  skill_5: "",
};

const form = reactive({ ...defaultForm });

watch(
  () => props.initialData,
  (value) => {
    Object.assign(form, value || defaultForm);
  },
  { immediate: true }
);

const onlyNumbers = (event) => {
  const charCode = event.which ? event.which : event.keyCode;
  // Permite solo números (0-9)
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
};

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  submit: [value: object];
}>();

const close = () => {
  emit("update:modelValue", false);
};

const save = () => {
  emit("submit", form);
};
</script>

<style scoped>
.character-counter {
  font-size: 12px;
  color: gray;
  margin-top: -10px;
}
</style>
