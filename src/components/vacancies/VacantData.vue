<template>
  <v-row
    class="pb-5"
    justify="center"
    style="
      background-color: white;
      border-bottom: solid 1px rgb(255, 248, 194, 0.8);
    "
  >
    <v-col cols="12" class="text-center">
      <v-img
        class="img-business mx-auto"
        :src="photoUrl(props.vacant.image)"
        max-height="160"
        max-width="160"
        contain
      ></v-img>
      <h2 style="color: #ff7900">{{ props.vacant.vacant_name }}</h2>
      <p class="text-subtitle-1" style="font-weight: 600">
        {{ props.vacant.business.bs_name }}
      </p>

      <small
        >{{ props.vacant.business.bs_locality }},
        {{ props.vacant.business.bs_state }},
        {{ props.vacant.business.bs_country }}</small
      >
      <small> - {{ formattedHistory(props.vacant.created_at) }} </small>
    </v-col>
  </v-row>
  <v-row style="background-color: white">
    <v-col class="px-10" cols="12">
      <span>
        <a href="/vacantes">Vacantes</a>
        <v-icon size="x-small" class="ml-2">mdi-chevron-double-right</v-icon>
        {{ props.vacant.vacant_name }}</span
      >
    </v-col>
  </v-row>
  <v-container class="pt-8">
    <!-- {{ props.vacant }} -->
    <!-- Sección Superior -->

    <!-- Información Principal -->
    <v-row class="pt-2">
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title style="background-color: rgba(0, 0, 0, 0.03)">
            <b>Sobre la vacante</b>
          </v-card-title>
          <v-card-text class="ma-4">
            <template v-if="props.vacant.category === 'JOB_POSITION'">
              <ul>
                <li><b>Tipo:</b> {{ props.vacant.category }}</li>
                <li>
                  <b>Perfil de estudio:</b> {{ props.vacant.study_profile }}
                </li>
                <li><b>Actividades:</b> {{ props.vacant.activities }}</li>
                <li>
                  <b>Habilidades y/o competencias:</b> {{ props.vacant.skills }}
                </li>
                <li>
                  <b>Experiencia:</b>
                  {{ props.vacant.experience ? "Sí" : "No" }}
                </li>
                <li v-if="props.vacant.experience">
                  <b>Descripción de experiencia:</b>
                  {{ props.vacant.experience_description }}
                </li>
                <li v-if="props.vacant.software_use">
                  <b>Manejo de software:</b>
                  {{ props.vacant.software_description }}
                </li>
              </ul>
            </template>
            <template v-if="props.vacant.category === 'PROFESSIONAL_PRACTICE'">
              <ul>
                <li><b>Tipo:</b> {{ props.vacant.category }}</li>
                <li>
                  <b>Perfil de estudio:</b> {{ props.vacant.study_profile }}
                </li>
                <li>
                  <b>Semestre y/o cuatrimestre admitido:</b>
                  {{ props.vacant.semester }}
                </li>
                <li>
                  <b>Habilidades y/o competencias:</b> {{ props.vacant.skills }}
                </li>

                <li v-if="props.vacant.software_use">
                  <b>Manejo de software:</b>
                  {{ props.vacant.software_description }}
                </li>
                <li>
                  <b>¿Conocimientos sobre algún tema en específico?</b>
                  {{ props.vacant.general_knowledge ? "Sí" : "No" }}
                </li>
                <li v-if="props.vacant.general_knowledge">
                  <b>Descripción de conocimientos</b>
                  {{ props.vacant.knowledge_description }}
                </li>
              </ul>
            </template>
            <!-- <p><b>Salario neto:</b> ${{ props.vacant.net_salary }}</p>
            <p><b>Apoyo financiero:</b> {{ props.vacant.financial_support }}</p>
            <p><b>Monto de apoyo:</b> ${{ props.vacant.support_amount }}</p> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Beneficios -->
    <v-row>
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title style="background-color: rgba(0, 0, 0, 0.03)">
            <b>Te ofrecemos</b>
          </v-card-title>
          <v-card-text class="ma-4">
            <template v-if="props.vacant.category === 'JOB_POSITION'">
              <ul>
                <li>
                  <b>Sueldo neto mensual:</b> ${{ props.vacant.net_salary }}
                </li>
              </ul>
            </template>

            <template v-if="props.vacant.category === 'PROFESSIONAL_PRACTICE'">
              <ul>
                <li>
                  <b>Apoyo económico:</b>
                  {{ props.vacant.financial_support ? "Sí" : "No" }}
                </li>
                <li v-if="props.vacant.financial_support">
                  <b>Monto mensual asignado:</b>
                  ${{ props.vacant.support_amount }}
                </li>
              </ul>
            </template>
            <ul>
              <li>
                <b>Días que se laboran:</b> <br />
                <ul class="mx-5 my-2">
                  <li>
                    <b>
                      {{ props.vacant.start_day }} a
                      {{ props.vacant.end_day }}:</b
                    >
                    {{ props.vacant.start_hour }}:{{
                      props.vacant.start_minute
                    }}
                    - {{ props.vacant.end_hour }}:{{ props.vacant.end_minute }}
                  </li>
                  <li v-if="props.vacant.saturday_hour">
                    <b>Sábados:</b> {{ props.vacant.saturday_start_hour }}:{{
                      props.vacant.saturday_start_minute
                    }}
                    - {{ props.vacant.saturday_end_hour }}:{{
                      props.vacant.saturday_end_minute
                    }}
                  </li>
                </ul>
              </li>
            </ul>
            <ul v-if="props.vacant.category === 'JOB_POSITION'">
              <li><b>Prestaciones de ley</b></li>
              <ul class="mx-5 my-2">
                <li v-if="props.vacant.social_security">Seguro social</li>
                <li v-if="props.vacant.christmas_bonus">Aguinaldo</li>
                <li v-if="props.vacant.vacation_bonus">Prima vacacional</li>
                <li v-if="props.vacant.savings_fund">Fondo de ahorro</li>
                <li v-if="props.vacant.life_insurance">Seguro de vida</li>
                <li v-if="props.vacant.medical_expenses">
                  Gastos médicos mayores
                </li>
              </ul>

              <!-- Agregar más beneficios según los datos -->
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contacto -->
    <v-row class="pb-10">
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title style="background-color: rgba(0, 0, 0, 0.03)">
            <b>Acerca de nosotros</b>
          </v-card-title>
          <v-card-text class="ma-4">
            <b> {{ props.vacant.business.bs_name }} </b>
            <p>
              {{ props.vacant.business.bs_description }}
              <a :href="props.vacant.business.bs_website" target="_blank"
                >Cónoce más sobre nosotros haciendo clic aquí.</a
              >
            </p>
            <!-- <v-btn
              prepend-icon="mdi-web"
              variant="outlined"
              color="secondary"
              class="mt-4"
              @click="openWebSite(props.vacant.business.bs_website)"
            >
              Visitar sitio web
            </v-btn> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Botón para Postularse -->
    <!-- <v-row justify="center" class="mt-4">
      <v-btn color="primary" large @click="applyToVacancy"> Postularme </v-btn>
    </v-row> -->
  </v-container>

  <v-btn
    fixed
    bottom
    color="primary"
    large
    class="postularme-button"
    prepend-icon="mdi-briefcase-check"
    @click="applyToVacancy(props.vacant.id, props.vacant.user_id)"
    :loading="loading"
  >
    Postularme
  </v-btn>
</template>

<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import { API_URL } from "../../constants";

const props = defineProps({
  vacant: { type: Object, required: true },
  loading: { type: Boolean, default: true },
});

dayjs.extend(relativeTime);
dayjs.locale("es");

const emit = defineEmits(["submit"]);

const applyToVacancy = (vacantId, businessId) => {
  emit("submit", vacantId, businessId);
};

const photoUrl = (value) => {
  if (!value) return;
  const url = API_URL + "storage/" + value.url;
  return url;
};

const formattedHistory = (time) => {
  const date = dayjs(time);
  return dayjs().to(date);
};

const openWebSite = (url) => {
  window.open(url, "_blank");
};
</script>

<style scoped>
h2 {
  color: #000000;
  font-weight: bold;
}

.img-business {
  width: 20%;
}
li {
  padding-bottom: 5px;
}

.postularme-button {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; /* Asegura que esté sobre otros elementos */
}
</style>
