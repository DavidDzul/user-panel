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
      <v-row class="fill-height" justify="center">
        <v-btn>INICIO</v-btn>
        <v-btn>Mi currículum</v-btn>
        <v-btn>Vacantes</v-btn>
        <v-btn>Notificaciones</v-btn>
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
const { userProfile, userInitials, fullName } = storeToRefs(useAuthStore());
</script>
