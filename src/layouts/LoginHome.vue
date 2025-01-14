<template>
  <v-app>
    <!-- Barra de navegación -->
    <v-toolbar color="primary" fixed class="fixed-toolbar">
      <v-img
        src="@/assets/img/logo.png"
        max-height="40"
        max-width="100px"
      ></v-img>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat @click="emit('user')">
          <v-icon class="mx-2"> mdi-account </v-icon> Talento</v-btn
        >
        <v-btn flat @click="emit('business')">
          <v-icon class="mx-2"> mdi-city </v-icon> Empresas</v-btn
        >
      </v-toolbar-items>
    </v-toolbar>

    <!-- Contenido principal -->
    <v-main class="h-100" style="padding-top: 40px">
      <!-- Carrusel de imágenes -->
      <v-carousel
        height="550"
        hide-delimiters
        interval="5000"
        show-arrows="hover"
        cycle
        hide-delimiter-background
        transition="fade-transition"
        reverse-transition="fade-transition"
      >
        <v-carousel-item v-for="(image, index) in images" :key="index">
          <v-img :src="image.src" :alt="image.alt" height="100%" cover></v-img>
          <div class="overlay">
            <h1 class="bg-img-title">{{ image.title }}</h1>
          </div>
        </v-carousel-item>
      </v-carousel>

      <div class="stats-section">
        <v-container>
          <v-row justify="center" align="center" class="text-center my-5">
            <v-col cols="12" md="4">
              <v-icon style="font-size: 40px"> mdi-account </v-icon>

              <h2
                class="animated-number"
                :data-value="10000"
                style="color: #23b4fe"
              ></h2>
              <h3>USUARIOS REGISTRADOS</h3>
            </v-col>
            <v-col cols="12" md="4">
              <v-icon style="font-size: 40px"> mdi-city </v-icon>

              <h2
                class="animated-number"
                :data-value="500"
                style="color: #23b4fe"
              >
                0
              </h2>
              <h3>EMPRESAS VICULADAS</h3>
            </v-col>
            <v-col cols="12" md="4">
              <v-icon style="font-size: 40px"> mdi-briefcase-check </v-icon>

              <h2
                class="animated-number"
                :data-value="1200"
                style="color: #23b4fe"
              >
                0
              </h2>
              <h3>VACANTES PUBLICADAS</h3>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div class="info-section">
        <v-container>
          <v-row justify="center" align="center" class="text-center my-5">
            <v-col cols="12" md="4">
              <h2 style="color: white">
                DESCUBRE EL PODER DE NUESTRA PLATAFORMA
              </h2>
            </v-col>
            <v-col cols="12" md="8">
              <p style="color: white; margin: 20px">
                <b>Impulso Universitario A.C.</b> conecta a becarios y egresados
                con empresas, creando oportunidades laborales que potencian su
                desarrollo profesional. Nuestra plataforma facilita el encuentro
                entre jóvenes talentos y equipos empresariales que buscan
                innovadores y líderes del futuro.
              </p>
              <p style="font-weight: 600; color: white">
                ¡Juntos construimos el éxito de la próxima generación!
              </p>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div class="contact-section text-center">
        <v-container class="contact-section pt-10" max-width="lg" fluid>
          <v-row justify="center" align="center">
            <v-col cols="12">
              <h2 class="text-center" style="color: #ff7900">
                NUESTROS TESTIMONIOS
              </h2>
            </v-col>
          </v-row>
          <v-carousel
            cycle
            :show-arrows="false"
            height="350"
            hide-delimiter-background
            hide-delimiters
            class="pa-10"
          >
            <v-carousel-item class="pa-5">
              <v-sheet height="100%">
                <v-row>
                  <v-col cols="12" md="12" lg="6">
                    <v-card>
                      <v-card-text style="text-align: center">
                        <v-avatar
                          color="grey-darken-3"
                          image="@/assets/img/logo-amarillo.jpg"
                        ></v-avatar>
                        <p style="font-size: 16px; font-weight: 500">
                          David Fernando Dzul Tzab
                        </p>
                        <p>Ingeniero En Sistemas Computacionales</p>

                        <p class="pt-5">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Itaque excepturi harum laboriosam illo. Itaque,
                          cumque ut. Id quas ab reprehenderit minus assumenda?
                          Unde, minima repellat. Deleniti ab maiores eum magni?
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="12" lg="6">
                    <v-card>
                      <v-card-text style="text-align: center">
                        <v-avatar
                          color="grey-darken-3"
                          image="@/assets/img/logo-amarillo.jpg"
                        ></v-avatar>
                        <p style="font-size: 16px; font-weight: 500">
                          David Fernando Dzul Tzab
                        </p>
                        <p>Ingeniero En Sistemas Computacionales</p>

                        <p class="pt-5">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Itaque excepturi harum laboriosam illo. Itaque,
                          cumque ut. Id quas ab reprehenderit minus assumenda?
                          Unde, minima repellat. Deleniti ab maiores eum magni?
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
            <v-carousel-item class="pa-5">
              <v-sheet height="100%">
                <v-row>
                  <v-col cols="12" md="12" lg="6">
                    <v-card>
                      <v-card-text style="text-align: center">
                        <v-avatar
                          color="grey-darken-3"
                          image="@/assets/img/logo-amarillo.jpg"
                        ></v-avatar>
                        <p style="font-size: 16px; font-weight: 500">
                          David Fernando Dzul Tzab
                        </p>
                        <p>Ingeniero En Sistemas Computacionales</p>

                        <p class="pt-5">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Itaque excepturi harum laboriosam illo. Itaque,
                          cumque ut. Id quas ab reprehenderit minus assumenda?
                          Unde, minima repellat. Deleniti ab maiores eum magni?
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="12" lg="6">
                    <v-card>
                      <v-card-text style="text-align: center">
                        <v-avatar
                          color="grey-darken-3"
                          image="@/assets/img/logo-amarillo.jpg"
                        ></v-avatar>
                        <p style="font-size: 16px; font-weight: 500">
                          David Fernando Dzul Tzab
                        </p>
                        <p>Ingeniero En Sistemas Computacionales</p>

                        <p class="pt-5">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Itaque excepturi harum laboriosam illo. Itaque,
                          cumque ut. Id quas ab reprehenderit minus assumenda?
                          Unde, minima repellat. Deleniti ab maiores eum magni?
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-container>
      </div>

      <div class="contact-section text-center">
        <v-container class="contact-section" max-width="lg" fluid>
          <v-row justify="center" align="center">
            <v-col cols="12">
              <h2 class="text-center" style="color: #ff7900">CONTÁCTANOS</h2>
            </v-col>

            <v-col cols="12" md="4" class="info-block">
              <h3>
                <v-icon size="small">mdi-timer</v-icon> Horarios de atención
              </h3>
              <p>Lunes a Viernes: 9:00 AM - 5:00 PM</p>
              <p>Sábado: 8:00 AM - 2:00 PM</p>
            </v-col>

            <v-col cols="12" md="4" class="info-block">
              <h3>
                <v-icon size="small">mdi-email</v-icon> Correo electrónico
              </h3>
              <p>
                <a href="mailto:contacto@impulsouniversitario.com">
                  contacto@impulsouniversitario.com
                </a>
              </p>
            </v-col>

            <v-col cols="12" md="4" class="info-block">
              <h3><v-icon size="small">mdi-phone</v-icon> Teléfono</h3>
              <p>
                <a href="tel:+521234567890">+52 123 456 7890</a>
              </p>
            </v-col>

            <v-col cols="12" class="info-block">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.4038547788227!2d-89.62538002593752!3d20.976442489575778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f56715e52d992a1%3A0x5e4d1d82239695ed!2sImpulso%20Universitario%2C%20A.C!5e0!3m2!1ses-419!2smx!4v1734681305468!5m2!1ses-419!2smx"
                width="100%"
                height="250"
                style="border: 0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-footer class="bg-black text-center d-flex flex-column">
        <div>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            :icon="icon"
            class="mx-4"
            variant="text"
          ></v-btn>
        </div>

        <v-divider></v-divider>

        <div>
          <strong>Impulso Universitario A.C.</strong>
        </div>
      </v-footer>
    </v-main>

    <!-- Snackbar -->
    <v-snackbar
      v-model="show"
      :timeout="7000"
      :location="'right top'"
      :close-on-content-click="true"
      :color="config.status"
      :vertical="true"
    >
      <div class="d-flex">
        <v-icon
          class="mt-1 mr-2"
          v-if="config?.icon"
          :icon="config.icon"
        ></v-icon>
        <div>
          <div class="text-subtitle-1 font-weight-bold">{{ config.title }}</div>
          <p>{{ config?.body }}</p>
        </div>
      </div>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAlertStore } from "@/stores/alert";
import { onMounted, ref } from "vue";

// Alert data
const { show, config } = storeToRefs(useAlertStore());

const emit = defineEmits(["user", "business"]);

// Images for the carousel

const slides = ["First", "Second", "Third", "Fourth", "Fifth"];

const images = [
  {
    src: "https://iu.org.mx/wp-content/uploads/2024/11/IMG_9126.jpg",
    alt: "Slide 1",
    title: "DA EL PRIMER PASO EN TU CARRERA",
  },
  {
    src: "https://iu.org.mx/wp-content/uploads/2024/03/1.jpg",
    alt: "Slide 2",
    title: "ENCUENTRA EL PERFIL IDEAL PARA TU EMPRESA",
  },
  {
    src: "https://www.somoshermanos.mx/wp-content/uploads/2023/06/Captura-de-Pantalla-2023-06-14-a-las-9.10.31.png",
    alt: "Slide 3",
    title: "PUBLICA TU VACANTE EN MINUTOS",
  },
];

onMounted(() => {
  const animateNumbers = () => {
    const elements = document.querySelectorAll(".animated-number");
    elements.forEach((el) => {
      const value = parseInt(el.getAttribute("data-value") || "0", 10);
      let current = 0;
      const increment = Math.ceil(value / 100);
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          current = value;
          clearInterval(interval);
        }
        el.textContent = current.toString();
      }, 20);
    });
  };

  animateNumbers();
});

const icons = ref([
  "mdi-facebook",
  "mdi-twitter",
  "mdi-linkedin",
  "mdi-instagram",
]);
</script>

<style scoped lang="scss">
.fixed-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.content {
  padding: 16px;
  margin-top: 64px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  color: white;
}

.bg-img-title {
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  text-align: center;
}

/* Estilos para las imágenes junto a las estadísticas */
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.v-img {
  margin-bottom: 10px;
}

/* Transición más suave */
.v-carousel .v-carousel-item {
  transition: all 1s ease-in-out !important;
}

.info-section {
  background: linear-gradient(135deg, #ff5ab5, #301e47);
}

.footer-link {
  color: white;
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
