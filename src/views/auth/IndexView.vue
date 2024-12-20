<template>
  <LoginHome @user="openUserLoginDialog" @business="openUserLoginDialog" />
  <UserLoginDialog
    v-model="userLoginDialog"
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

const { onLogin, openUserLoginDialog } = useLoginPageStore();
const { loading, userLoginDialog } = storeToRefs(useLoginPageStore());

const show = ref(false);
</script>
