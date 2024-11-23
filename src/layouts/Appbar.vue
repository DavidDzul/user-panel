<template>
  <v-app-bar color="primary" density="compact" extended>
    <!-- Drawer para dispositivos móviles -->
    <v-navigation-drawer v-if="isMobile" v-model="drawer" app temporary>
      <v-list>
        <v-list-item :to="'/inicio'">
          <v-icon>mdi-home</v-icon> INICIO
        </v-list-item>
        <template
          v-if="userType === 'BEC_ACTIVE' || userType === 'BEC_INACTIVE'"
        >
          <v-list-item :to="'/curriculum'">
            <v-icon>mdi-file-account</v-icon> Mi currículum vitae
          </v-list-item>
          <v-list-item> <v-icon>mdi-briefcase</v-icon> Vacantes </v-list-item>
          <v-list-item> <v-icon>mdi-bell</v-icon> Notificaciones </v-list-item>
        </template>
        <template v-if="userType === 'BUSINESS'">
          <v-list-item>Mi empresa</v-list-item>
          <v-list-item>Mis vacantes</v-list-item>
          <v-list-item>Nueva vacante</v-list-item>
          <v-list-item>Candidatos</v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Menú de hamburguesa -->
    <v-app-bar-nav-icon v-if="isMobile" @click="drawer = !drawer" />

    <!-- Título de la barra -->
    <v-app-bar-title>PHOTO</v-app-bar-title>

    <!-- Menú de perfil -->
    <template v-slot:append>
      <ProfileMenu
        v-if="userProfile"
        :user="userProfile"
        :initials="userInitials"
        :full-name="fullName"
        @logout="logout"
      />
    </template>

    <!-- Extensión visible solo en pantallas medianas o más grandes -->
    <template v-if="!isMobile" v-slot:extension>
      <v-row class="fill-height extension-bar" justify="center">
        <v-btn active-class="active-btn" :to="'/inicio'">
          <v-icon>mdi-home</v-icon> INICIO
        </v-btn>
        <template
          v-if="userType === 'BEC_ACTIVE' || userType === 'BEC_INACTIVE'"
        >
          <v-btn :to="'/curriculum'">
            <v-icon>mdi-file-account</v-icon> Mi currículum vitae
          </v-btn>
          <v-btn> <v-icon>mdi-briefcase</v-icon> Vacantes </v-btn>
          <v-btn> <v-icon>mdi-bell</v-icon> Notificaciones </v-btn>
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
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/api/authStore";

import ProfileMenu from "@/layouts/ProfileMenu.vue";

const { logout } = useAuthStore();
const { userProfile, userInitials, fullName, userType } = storeToRefs(
  useAuthStore()
);

// Estado para el drawer (menú de navegación móvil)
const drawer = ref(false);

// Detectar si es móvil
const { smAndDown } = useDisplay();
const isMobile = smAndDown;
</script>

<style lang="scss" scoped>
.extension-bar {
  background-color: white; /* Color personalizado */
  color: black;
}
</style>
