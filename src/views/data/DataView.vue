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

    <v-row>
      <v-col cols="12">
        <h2 class="text-center">Distribución de Becarios/as</h2>
      </v-col>

      <!-- Gráficas para BEC_ACTIVE -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold text-center">
            Distribución general
          </v-card-title>
          <v-card-text>
            <PieChart
              :chart-data="generalChartDataActive"
              :chart-options="chartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold text-center">
            Distribución por sede
          </v-card-title>
          <v-card-text>
            <LineChart
              :chart-data="campusChartDataActive"
              :chart-options="chartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="12">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold text-center">
            Distribución por área
          </v-card-title>
          <v-card-text>
            <BarChart
              :chart-data="areaChartDataActive"
              :chart-options="chartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2 class="text-center">Distribución de Egresados/as</h2>
      </v-col>

      <!-- Gráficas para BEC_INACTIVE -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold text-center">
            Distribución general
          </v-card-title>
          <v-card-text>
            <PieChart
              :chart-data="generalChartDataInactive"
              :chart-options="chartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold text-center">
            Distribución por sede
          </v-card-title>
          <v-card-text>
            <LineChart
              :chart-data="campusChartDataInactive"
              :chart-options="chartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="12">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold text-center">
            Distribución por área
          </v-card-title>
          <v-card-text>
            <BarChart
              :chart-data="areaChartDataInactive"
              :chart-options="chartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from "vue";
import { PieChart, LineChart, BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useCandidateDataPageStore } from "@/stores/views/CandidateDataPage";
import { storeToRefs } from "pinia";
import { campusMap, jobTypeMap } from "@/constants";

Chart.register(...registerables);

const { data } = storeToRefs(useCandidateDataPageStore());
const jobTypes = ["PART_TIME", "INTERNSHIP", "FULL_TIME"];
const colors = ["#FF6384", "#36A2EB", "#FFCE56"];

// Function to calculate stats for both BEC_ACTIVE and BEC_INACTIVE
const calculateStats = (data) => {
  const stats = {
    INTERNSHIP: 0,
    PART_TIME: 0,
    FULL_TIME: 0,
  };

  data.forEach((entry) => {
    if (entry.job_type === "INTERNSHIP") stats.INTERNSHIP += entry.count;
    if (entry.job_type === "PART_TIME") stats.PART_TIME += entry.count;
    if (entry.job_type === "FULL_TIME") stats.FULL_TIME += entry.count;
  });

  return [
    { title: "Prácticas Profesionales", total: stats.INTERNSHIP },
    { title: "Medio Tiempo", total: stats.PART_TIME },
    { title: "Tiempo Completo", total: stats.FULL_TIME },
  ];
};

const filterByUserType = (userType) => {
  if (!data.value) {
    return []; // Si data.value es null o undefined, devolvemos un array vacío
  }

  return data.value.filter((entry) => entry.user_type === userType);
};

const createChartData = (filteredData) => {
  const counts = { PART_TIME: 0, INTERNSHIP: 0, FULL_TIME: 0 };
  filteredData.forEach((entry) => {
    if (jobTypes.includes(entry.job_type)) {
      counts[entry.job_type] += entry.count;
    }
  });
  return {
    labels: jobTypes.map((type) =>
      jobTypeMap.get(type) ? jobTypeMap.get(type).text : type
    ), // Mapea job_type a su texto
    datasets: [
      {
        data: jobTypes.map((type) => counts[type]),
        backgroundColor: colors,
      },
    ],
  };
};

const createCampusChartData = (filteredData) => {
  const campusCounts = {};
  filteredData.forEach(({ campus, job_type, count }) => {
    if (!campusCounts[campus]) {
      campusCounts[campus] = { PART_TIME: 0, INTERNSHIP: 0, FULL_TIME: 0 };
    }
    campusCounts[campus][job_type] += count;
  });

  const campusLabels = Object.keys(campusCounts).map((campusCode) => {
    return campusMap.get(campusCode)
      ? campusMap.get(campusCode).text
      : campusCode; // Mapea el campus con el texto
  });

  return {
    labels: campusLabels, // Utiliza los textos del campusMap
    datasets: jobTypes.map((type, index) => ({
      label: jobTypeMap.get(type) ? jobTypeMap.get(type).text : type, // Mapea el job_type con el texto
      data: Object.keys(campusCounts).map(
        (campus) => campusCounts[campus][type]
      ),
      borderColor: colors[index],
      fill: false,
    })),
  };
};

const createAreaChartData = (filteredData) => {
  const areaCounts = {};
  filteredData.forEach(({ area, job_type, count }) => {
    const areaName = area.name;
    if (!areaCounts[areaName]) {
      areaCounts[areaName] = { PART_TIME: 0, INTERNSHIP: 0, FULL_TIME: 0 };
    }
    areaCounts[areaName][job_type] += count;
  });
  return {
    labels: Object.keys(areaCounts),
    datasets: jobTypes.map((type, index) => ({
      label: jobTypeMap.get(type) ? jobTypeMap.get(type).text : type, // Mapea el job_type con el texto
      data: Object.keys(areaCounts).map((area) => areaCounts[area][type]),
      backgroundColor: colors[index],
    })),
  };
};

const generalChartDataActive = computed(() =>
  createChartData(filterByUserType("BEC_ACTIVE"))
);
const campusChartDataActive = computed(() =>
  createCampusChartData(filterByUserType("BEC_ACTIVE"))
);
const areaChartDataActive = computed(() =>
  createAreaChartData(filterByUserType("BEC_ACTIVE"))
);

const generalChartDataInactive = computed(() =>
  createChartData(filterByUserType("BEC_INACTIVE"))
);
const campusChartDataInactive = computed(() =>
  createCampusChartData(filterByUserType("BEC_INACTIVE"))
);
const areaChartDataInactive = computed(() =>
  createAreaChartData(filterByUserType("BEC_INACTIVE"))
);

// Set stats by combining BEC_ACTIVE and BEC_INACTIVE
const stats = computed(() => {
  const activeStats = calculateStats(filterByUserType("BEC_ACTIVE"));
  const inactiveStats = calculateStats(filterByUserType("BEC_INACTIVE"));

  return [
    {
      title: "Prácticas Profesionales",
      total: activeStats[0].total + inactiveStats[0].total,
    },
    {
      title: "Medio Tiempo",
      total: activeStats[1].total + inactiveStats[1].total,
    },
    {
      title: "Tiempo Completo",
      total: activeStats[2].total + inactiveStats[2].total,
    },
  ];
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
  },
};
</script>
