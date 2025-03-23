<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="11">
        <v-card class="pa-4" style="background-color: #fc5ed0">
          <v-card-text>
            <p class="text-body-1 text-justify">
              Este informe, proporcionado por
              <strong>Impulso Universitario A.C.</strong>, presenta un resumen
              del número de jóvenes en formación que actualmente buscan
              oportunidades de <strong>prácticas profesionales</strong>,
              <strong>empleo de medio tiempo</strong> o
              <strong>empleo de tiempo completo</strong>, desglosado por sede.
            </p>
            <p class="text-body-1 mt-5 text-justify" style="font-weight: 600">
              💡 Esta información es de carácter referencial. Para encontrar
              candidatos específicos, por favor utiliza la sección
              correspondiente.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Tarjetas de resumen -->
    <v-row>
      <v-col v-for="(stat, index) in stats" :key="index" cols="12" md="4">
        <v-card class="pa-3" elevation="3">
          <v-card-title class="text-h6 font-weight-bold text-center">
            {{ stat.title }}
          </v-card-title>
          <v-card-subtitle class="text-center">
            <v-chip color="primary" class="text-white">
              {{ stat.total }}
            </v-chip>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Gráficas -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-3">
          <v-card-title class="text-h6 font-weight-bold text-center">
            Distribución General
          </v-card-title>
          <BarChart :chart-data="donutData" :chart-options="donutOptions" />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-3">
          <v-card-title class="text-h6 font-weight-bold text-center">
            Distribución por Sede
          </v-card-title>
          <BarChart :chart-data="barData" :chart-options="barOptions" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Datos para las tarjetas
const stats = ref([
  { title: "Prácticas Profesionales", total: 14 },
  { title: "Medio Tiempo", total: 38 },
  { title: "Tiempo Completo", total: 1 },
]);

// Gráfica de Dona
const donutData = ref({
  labels: ["Prácticas", "Medio Tiempo", "Tiempo Completo"],
  datasets: [
    {
      label: "Tipos de empleo",
      data: [14, 38, 1],
      backgroundColor: ["#FF7900", "#23B4FE", "#FFCE00"],
    },
  ],
});

const donutOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false, // Ocultar leyenda
    },
  },
});

// Gráfica de Barras
const barData = ref({
  labels: ["Mérida", "Tizimín", "Oxkutzcab", "Valladolid"],
  datasets: [
    {
      label: "Prácticas",
      data: [7, 4, 3, 0],
      backgroundColor: "#FF4A4A",
    },
    {
      label: "Medio Tiempo",
      data: [22, 11, 4, 1],
      backgroundColor: "#275FFC",
    },
    {
      label: "Tiempo Completo",
      data: [0, 1, 0, 0],
      backgroundColor: "#FFCE00",
    },
  ],
});

const barOptions = ref({
  responsive: true,
  scales: {
    y: { beginAtZero: true },
  },
  plugins: {
    legend: { position: "bottom" },
  },
});
</script>
