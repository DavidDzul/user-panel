<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="500px"
    @keydown.stop.esc="close"
    :persistent="true"
  >
    <v-card>
      <v-form>
        <v-toolbar dark>
          <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-item-group mandatory class="mt-1">
            <v-container>
              <!-- <v-row class="text-center">
                <v-col class="mb-4" cols="12">
                  <h2>Becarios/as - Egresados/as</h2>
                </v-col>
              </v-row> -->
              <v-text-field
                v-model="enrollment"
                label="Matrícula"
                prepend-inner-icon="mdi-account"
                maxlength="9"
                :rules="[rules.maxLength]"
                required
                @input="enrollment = enrollment.toUpperCase()"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Contraseña"
                :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append-inner="show = !show"
                prepend-inner-icon="mdi-lock"
              ></v-text-field>
              <v-btn
                size="small"
                variant="text"
                class="text-left d-block px-0 text-disabled"
              >
                <router-link to="">Recuperar contraseña</router-link>
              </v-btn>
              <v-btn
                block
                class="mt-3"
                color="primary"
                :loading="loading"
                @click="save"
                :disabled="enrollment.length === 9 ? false : true"
                >INICIAR SESIÓN</v-btn
              >
            </v-container>
          </v-item-group>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/yup";
import { PublicPathState, useForm } from "vee-validate";
import { PropType, ref } from "vue";
import * as yup from "yup";

defineProps({
  modelValue: { type: Boolean, default: () => false },
  loading: { type: Boolean, default: () => false },
});

const show = ref(false);
const enrollment = ref("");
const password = ref("");

const emit = defineEmits(["submit", "update:modelValue"]);

const rules = {
  maxLength: (value) => value.length >= 9 || "Mínimo 9 caracteres permitidos",
};

const close = () => {
  emit("update:modelValue", false);
};

const save = () => {
  emit("submit", enrollment.value, password.value);
};
</script>
