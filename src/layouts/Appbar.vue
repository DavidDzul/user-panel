<template>
  <v-app-bar color="primary" density="compact" extended>
    <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->

    <v-app-bar-title>PHOTO</v-app-bar-title>

    <template v-slot:append>
      <ProfileMenu
        v-if="userProfile"
        :user="userProfile"
        :initials="userInitials"
        :full-name="fullName"
        @logout="logout"
      />
    </template>
    <template v-slot:extension>
      <v-row class="fill-height extension-bar" justify="center">
        <v-btn active-class="active-btn" :to="'/inicio'">
          <v-icon>mdi-home</v-icon> INICIO</v-btn
        >
        <template
          v-if="userType === 'BEC_ACTIVE' || userType === 'BEC_INACTIVE'"
        >
          <v-btn :to="'/curriculum'">
            <v-icon>mdi-file-account</v-icon> Mi currículum vitae</v-btn
          >
          <v-btn> <v-icon>mdi-briefcase</v-icon> Vacantes</v-btn>
          <v-btn> <v-icon>mdi-bell</v-icon> Notificaciones</v-btn>
        </template>
        <template v-if="userType === 'BUSINESS'">
          <v-btn>Mi empresa</v-btn>
          <v-btn>Mis vacantes</v-btn>
          <v-btn>Nueva vacante</v-btn>
          <v-btn>Candidatos</v-btn>
        </template>
      </v-row>
    </template>
  </v-app-bar>
  <!-- <v-app-bar color="grey-lighten-2" density="compact" flat></v-app-bar> -->
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/api/authStore";

import ProfileMenu from "@/layouts/ProfileMenu.vue";

const { logout } = useAuthStore();
const { userProfile, userInitials, fullName, userType } = storeToRefs(
  useAuthStore()
);
</script>

<style lang="scss" scoped>
.extension-bar {
  background-color: white; /* Color personalizado */
  color: black;
}
</style>
