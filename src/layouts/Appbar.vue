<template>
  <v-app-bar
    color="primary"
    density="compact"
    :extended="mobile ? false : true"
  >
    <!-- Menú de hamburguesa -->
    <v-app-bar-nav-icon v-if="mobile" @click="onClick"></v-app-bar-nav-icon>

    <v-img
      src="@/assets/img/logo.png"
      max-height="40"
      max-width="100px"
    ></v-img>

    <!-- Título de la barra -->
    <!-- <v-app-bar-title>
      <v-img src="@/assets/img/logo.png" max-height="40"></v-img>
    </v-app-bar-title> -->

    <!-- Menú de perfil -->
    <template v-slot:append>
      <ProfileMenu
        v-if="userProfile"
        :user="userProfile"
        :initials="userInitials"
        :full-name="fullName"
        @configuration="openUserDialog"
        @logout="logout"
      />
    </template>

    <!-- Extensión visible solo en pantallas medianas o más grandes -->
    <template v-if="!mobile" v-slot:extension>
      <v-row class="fill-height extension-bar" justify="center">
        <v-btn active-class="active-btn" :to="'/inicio'">
          <v-icon>mdi-home</v-icon> Inicio
        </v-btn>
        <template
          v-if="userType === 'BEC_ACTIVE' || userType === 'BEC_INACTIVE'"
        >
          <v-btn :to="'/curriculum'">
            <v-icon>mdi-file-account</v-icon> Mi currículum vitae
          </v-btn>
          <v-btn :to="'/vacantes'">
            <v-icon>mdi-briefcase</v-icon> Vacantes
          </v-btn>
          <v-btn :to="'/postulaciones-realizadas'">
            <v-icon>mdi-briefcase-check</v-icon> Postulaciones
          </v-btn>
        </template>
        <template v-if="userType === 'BUSINESS'">
          <v-btn :to="'/datos'">
            <v-icon>mdi-google-analytics</v-icon> Datos
          </v-btn>
          <v-btn :to="'/empresa'"> <v-icon>mdi-city</v-icon> Mi empresa</v-btn>
          <v-btn :to="'/publicaciones'">
            <v-icon>mdi-briefcase</v-icon> Mis vacantes</v-btn
          >
          <v-btn v-if="candidates_view" :to="'/candidatos'">
            <v-icon>mdi-account-multiple</v-icon> Candidatos</v-btn
          >
          <v-btn :to="'/postulaciones-recibidas'">
            <v-icon>mdi-briefcase-check</v-icon> Postulaciones</v-btn
          >
        </template>
      </v-row>
    </template>
  </v-app-bar>

  <!-- Drawer para dispositivos móviles -->
  <v-navigation-drawer v-if="mobile" v-model="drawer" app temporary>
    <v-list>
      <v-list-item :to="'/inicio'">
        <v-icon>mdi-home</v-icon> Inicio
      </v-list-item>
      <template v-if="userType === 'BEC_ACTIVE' || userType === 'BEC_INACTIVE'">
        <v-list-item :to="'/curriculum'">
          <v-icon>mdi-file-account</v-icon> Mi currículum vitae
        </v-list-item>
        <v-list-item :to="'/vacantes'">
          <v-icon>mdi-briefcase</v-icon> Vacantes
        </v-list-item>
        <v-list-item :to="'/postulaciones-realizadas'">
          <v-icon>mdi-briefcase-check</v-icon> postulaciones
        </v-list-item>
      </template>
      <template v-if="userType === 'BUSINESS'">
        <v-list-item :to="'/datos'">
          <v-icon>mdi-google-analytics</v-icon> Datos</v-list-item
        >
        <v-list-item :to="'/empresa'">
          <v-icon>mdi-city</v-icon> Mi empresa</v-list-item
        >
        <v-list-item :to="'/publicaciones'">
          <v-icon>mdi-briefcase</v-icon> Mis vacantes</v-list-item
        >
        <v-list-item v-if="candidates_view" :to="'/candidatos'">
          <v-icon>mdi-account-multiple</v-icon> Candidatos</v-list-item
        >
        <v-list-item :to="'/postulaciones-recibidas'">
          <v-icon>mdi-briefcase-check</v-icon> Postulaciones</v-list-item
        >
      </template>
    </v-list>
  </v-navigation-drawer>

  <UserProfileDialog
    v-if="userProfile && userProfile.user_type !== 'BUSINESS'"
    v-model="openUserProfileDialog"
    :edit-item="userProfile"
    :loading="loadingUpdateProfile"
    @submit="updateUserProfile"
  />
  <BusinessProfileDialog
    v-else-if="userProfile && userProfile.user_type === 'BUSINESS'"
    v-model="openUserProfileDialog"
    :edit-item="userProfile"
    :loading="loadingUpdateProfile"
    @submit="updateUserProfile"
  />
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/api/authStore";

import UserProfileDialog from "@/components/auth/UserProfileDialog";
import ProfileMenu from "@/layouts/ProfileMenu.vue";
import BusinessProfileDialog from "@/components/auth/BusinessProfileDialog";

const { mobile } = useDisplay();
const drawer = ref(!mobile.value);

const { logout, updateUserProfile, openUserDialog } = useAuthStore();
const {
  userProfile,
  userInitials,
  fullName,
  userType,
  openUserProfileDialog,
  candidates_view,
  loadingUpdateProfile,
} = storeToRefs(useAuthStore());

const onClick = () => {
  drawer.value = !drawer.value;
};
</script>

<style lang="scss" scoped>
.extension-bar {
  background-color: white; /* Color personalizado */
  color: black;
}
</style>
