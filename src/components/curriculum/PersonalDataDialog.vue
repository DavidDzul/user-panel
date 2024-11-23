<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="720px"
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
            <v-col cols="6">
              <v-text-field
                v-model="form.first_name"
                label="Nombre(s)"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.last_name"
                label="Apellidos"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.number="form.day_birth"
                label="Día de nacimiento"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.number="form.month_birth"
                label="Mes de nacimiento"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.number="form.year_birth"
                label="Año de nacimiento"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.country"
                label="País"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.state"
                label="Estado"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.locality"
                label="Localidad"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.phone_num"
                label="Número de celular"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="form.email"
                label="Correo electrónico"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.linkedin"
                label="LinkedIn"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="form.professional_title"
                label="Título profesional"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                variant="underlined"
                v-model="form.professional_summary"
                rows="4"
                :rules="[rules.required]"
                label="Resumén profesional"
              ></v-textarea>
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
        <v-btn color="error" @click="close">Cancelar</v-btn>
        <v-btn color="primary" :disabled="!formValid" @click="save">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: () => false },
  initialData: { type: Object, required: false, default: null },
});

const formValid = ref(false);

const rules = {
  required: (value) => !!value || "Este campo es obligatorio",
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
  professional_title: "",
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
