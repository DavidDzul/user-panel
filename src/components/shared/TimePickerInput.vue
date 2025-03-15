<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    activator="parent"
    transition="scale-transition"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        v-bind="props"
        v-model="formattedTime"
        :label="inputText || 'Selecciona la hora'"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
      ></v-text-field>
    </template>
    <v-card width="320px">
      <v-time-picker
        v-if="menu"
        v-model="timeValue"
        @update:model-value="updateTime"
        hide-header
        width="320px"
        full-width
      ></v-time-picker>

      <v-card-actions class="justify-end">
        <v-btn color="primary" @click="confirmTime">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  inputText: { type: String, default: "Hora" },
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const menu = ref(false);
const timeValue = ref(props.modelValue);

const formattedTime = computed(() =>
  timeValue.value ? convertTo12HourFormat(timeValue.value) : "--:--"
);

watch(
  () => props.modelValue,
  (newVal) => {
    timeValue.value = newVal;
  }
);

const updateTime = (time: string) => {
  timeValue.value = time;
  emit("update:modelValue", time);
  menu.value = false; // Cierra el menú automáticamente al seleccionar la hora
};

const confirmTime = () => {
  emit("update:modelValue", timeValue.value);
  menu.value = false; // Cierra el menú al hacer clic en "Aceptar"
};

const convertTo12HourFormat = (time: string) => {
  if (!time) return "";
  let [hour, minute] = time.split(":").map(Number);
  if (hour === 0) hour = 12; // Si es 00, convertir a 12
  else if (hour > 12) hour = hour - 12; // Convertir 24h a 12h

  return `${hour}:${minute.toString().padStart(2, "0")}`;
};
</script>
