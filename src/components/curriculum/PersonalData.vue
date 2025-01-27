<template>
  <v-container class="user-details-list" fluid>
    <v-row>
      <!-- Primera columna -->
      <v-col cols="12" md="6">
        <v-list density="comfortable">
          <v-list-item title="Nombre(s):" :subtitle="personal?.first_name" />
          <v-list-item title="Apellidos:" :subtitle="personal?.last_name" />
          <v-list-item title="Fecha de Nacimiento:" :subtitle="birthDay" />
          <v-list-item title="País:" :subtitle="personal?.country" />
          <v-list-item title="Estado:" :subtitle="personal?.state" />
        </v-list>
      </v-col>

      <!-- Segunda columna -->
      <v-col cols="12" md="6">
        <v-list density="comfortable">
          <v-list-item title="Localidad:" :subtitle="personal?.locality" />
          <v-list-item
            title="Número de celular:"
            :subtitle="personal?.phone_num"
          />
          <v-list-item
            title="Correo electrónico:"
            :subtitle="personal?.email"
          />
          <v-list-item title="LinkdeIn:" :subtitle="personal?.linkedin" />
        </v-list>
      </v-col>

      <v-col cols="12" md="12">
        <p style="font-weight: 500">Resumen profesional:</p>
        <p>{{ personal?.professional_summary }}</p>
      </v-col>

      <v-col cols="12" md="6">
        <v-list density="comfortable">
          <v-list-item title="Habilidad 1:" :subtitle="personal?.skill_1" />
          <v-list-item title="Habilidad 2:" :subtitle="personal?.skill_2" />
          <v-list-item title="Habilidad 3:" :subtitle="personal?.skill_3" />
        </v-list>
      </v-col>

      <v-col cols="12" md="6">
        <v-list density="comfortable">
          <v-list-item title="Habilidad 4:" :subtitle="personal?.skill_4" />
          <v-list-item title="Habilidad 5:" :subtitle="personal?.skill_5" />
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";

const props = defineProps({
  personal: { type: Object, required: false, default: {} },
});

const birthDay = computed(() => {
  return `${props.personal?.day_birth ? props.personal?.day_birth + "/" : ""}${
    props.personal?.month_birth ? props.personal?.month_birth + "/" : ""
  }${props.personal?.year_birth || ""}`;
});
</script>

<style lang="scss">
.user-details-list {
  max-width: 100%;
  .v-list-item__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
  }
  .v-list-item-title {
    font-weight: 500;
  }
  .v-list-item-subtitle {
    opacity: 100%;
    color: black;
  }
}
</style>
