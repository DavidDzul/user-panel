<template>
  <LoginHome @user="openUserLoginDialog" @business="openBusinessLoginDialog" />
  <UserLoginDialog
    v-model="userLoginDialog"
    :loading="loading"
    @submit="onLoginEnrollment"
  />
  <BusinessLoginDialog
    v-model="businessLoginDialog"
    :loading="loading"
    @submit="onLogin"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { useLoginPageStore } from "@/stores/views/loginPage";
import LoginHome from "@/layouts/LoginHome.vue";
import UserLoginDialog from "@/components/auth/UserLoginDialog.vue";
import BusinessLoginDialog from "@/components/auth/BusinessLoginDialog.vue";

const {
  onLogin,
  onLoginEnrollment,
  openUserLoginDialog,
  openBusinessLoginDialog,
} = useLoginPageStore();
const { loading, userLoginDialog, businessLoginDialog } = storeToRefs(
  useLoginPageStore()
);

const show = ref(false);
</script>
