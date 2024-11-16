<template>
  <v-container>
    <v-row class="pb-5">
      <v-col cols="12">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum
          provident ipsum quae voluptatem molestiae, fugit itaque adipisci, rem,
          esse neque perferendis aspernatur repellendus dolore. Repudiandae
          aliquam nobis tempora qui?
        </p>
      </v-col>
      <v-col cols="12" class="text-right">
        <v-btn>DESCARGAR CV</v-btn>
      </v-col>
    </v-row>

    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-title>
          <template #default="{ expanded }">
            <PanelHeaderOptions
              title="Foto de perfil"
              button-text="Nueva foto"
              :expanded="expanded"
              @button-click="onPhotoUpload"
            />
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <UserPhoto :user-id="2" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title class="panel-title"
          >Información personal</v-expansion-panel-title
        >
        <v-expansion-panel-text>
          Agregar el resumen profesional
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- <v-expansion-panel>
        <v-expansion-panel-title class="panel-title"
          >Resumen profesional</v-expansion-panel-title
        >
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
      </v-expansion-panel> -->

      <v-expansion-panel>
        <v-expansion-panel-title class="panel-title"
          >Experiencia laboral</v-expansion-panel-title
        >
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title class="panel-title"
          >Formación académica</v-expansion-panel-title
        >
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title class="panel-title"
          >Educación continua</v-expansion-panel-title
        >
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title class="panel-title"
          >Habilidades y/o competencias</v-expansion-panel-title
        >
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title class="panel-title"
          >Conocimientos</v-expansion-panel-title
        >
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title class="panel-title"
          >Referencias laborales
        </v-expansion-panel-title>
        <v-expansion-panel-text> Some content </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import UserPhoto from "@/components/users/UserPhoto.vue";
import PanelHeaderOptions from "@/components/shared/PanelHeaderOptions.vue";

const panel = ref([0, 1, 2, 3, 4, 5, 6, 7, 8]);
</script>
