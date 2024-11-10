<template>
  <v-app-bar color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Photos</v-app-bar-title>

    <template v-slot:append>
      <ProfileMenu
        v-if="userProfile"
        :user="userProfile"
        :initials="userInitials"
        :full-name="fullName"
        @logout="logout"
      />
    </template>
  </v-app-bar>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/api/authStore";

import ProfileMenu from "@/layouts/ProfileMenu.vue";

const { logout } = useAuthStore();
const { userProfile, userInitials, fullName } = storeToRefs(useAuthStore());
</script>
