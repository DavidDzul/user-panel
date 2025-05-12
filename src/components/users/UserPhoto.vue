<template>
  <template v-if="photos?.length">
    <div v-for="(photo, index) of photos" :key="index">
      <v-img
        :src="photoUrl(photo)"
        lazy-src="https://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif"
        height="300"
        style="position: relative"
      >
        <v-tooltip text="Eliminar" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              style="position: absolute; bottom: 0; right: 0; margin: 10px"
              icon
              color="error"
              v-bind="props"
              @click="removePhoto(photo)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </v-img>
    </div>
  </template>
  <template v-else>
    <div>
      <v-sheet class="pa-10" color="warning" height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <div class="text-h2">{{ isUser ? "Sin foto" : "Sin logo" }}</div>
        </v-row>
      </v-sheet>
    </div>
  </template>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { API_URL } from "../../constants";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  photos: { type: Array, default: () => [] },
  isUser: { type: Boolean, default: false },
});

const emit = defineEmits(["remove"]);

const photoUrl = (value) => {
  return API_URL + "storage/" + value.url;
};

const removePhoto = (photo) => {
  emit("remove", photo);
};
</script>
