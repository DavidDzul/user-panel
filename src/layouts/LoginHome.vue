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
        <v-btn flat @click="scrollToContact()">
          <v-icon class="mx-2"> mdi-phone-classic</v-icon> Contacto
        </v-btn>
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
                <b>Impulso Universitario A.C.</b> conecta a jóvenes en formación
                y egresados con empresas, creando oportunidades laborales que
                potencian su desarrollo profesional y personal. Nuestra
                plataforma facilita el encuentro entre jóvenes talentos y
                equipos empresariales que buscan innovar y crear líderes del
                futuro.
              </p>
              <p style="font-weight: 600; color: white">
                ¡Juntos construimos el éxito de la próxima generación!
              </p>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div class="text-center">
        <v-container class="pt-10" max-width="lg" fluid>
          <v-row justify="center" align="center">
            <v-col cols="12">
              <h2 class="text-center" style="color: #ff7900">
                NUESTROS TESTIMONIOS
              </h2>
            </v-col>
          </v-row>
          <v-carousel
            cycle
            :interval="15000"
            show-arrows="hover"
            height="auto"
            class="py-10"
            hide-delimiter-background
          >
            <v-carousel-item class="px-10">
              <v-sheet height="100%">
                <v-row class="px-10">
                  <v-col cols="12">
                    <v-card class="elevation-0">
                      <v-card-text style="text-align: center">
                        <v-avatar
                          color="grey-darken-3"
                          image="@/assets/img/logo_yellow.jpg"
                        ></v-avatar>
                        <p style="font-size: 16px; font-weight: 500">
                          Shirley, Turismo.
                        </p>
                        <p>7 meses de colaboración</p>

                        <p class="pt-5">
                          La plataforma de Vinculación Laboral es una
                          herramienta muy sencilla para la búsqueda de empleo,
                          he tenido mucho aprendizaje de por medio. Gracias a
                          Impulso Universitario la agencia confió en mis
                          habilidades y pude llevar a cabo un grupo para una
                          boda y ayudar en su logística.
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
            <v-carousel-item class="px-10">
              <v-sheet height="100%">
                <v-row class="px-10">
                  <v-col cols="12">
                    <v-card class="elevation-0">
                      <v-card-text style="text-align: center">
                        <v-avatar
                          color="grey-darken-3"
                          image="@/assets/img/logo_blue.jpg"
                        ></v-avatar>
                        <p style="font-size: 16px; font-weight: 500">
                          David, Arquitectura.
                        </p>
                        <p>6 meses de colaboración</p>

                        <p class="pt-5">
                          El Programa de Vinculación Laboral conecta con
                          empresas que comparten el objetivo de un cambio
                          positivo en la sociedad. Gracias al programa encontré
                          mi primera experiencia laboral y ahora estoy
                          completamente enfocado en lo que estudié durante 5
                          años.
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
            <v-carousel-item class="px-10">
              <v-sheet height="100%">
                <v-row class="px-10">
                  <v-col cols="12">
                    <v-card class="elevation-0">
                      <v-card-text style="text-align: center">
                        <v-avatar
                          color="grey-darken-3"
                          image="@/assets/img/logo_red.jpg"
                        ></v-avatar>
                        <p style="font-size: 16px; font-weight: 500">
                          Yoceline, Derecho.
                        </p>
                        <p>11 meses de colaboración.</p>

                        <p class="pt-5">
                          El Programa de Vinculación Laboral me acercó a un
                          trabajo en mi área, fortaleciendo mi seguridad y
                          habilidades. La empresa me asignó un plan de
                          desarrollo, resolvió mis dudas, corrigió errores y
                          reconoció logros, brindándome un entorno seguro para
                          crecer.
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
            <v-carousel-item class="px-10">
              <v-sheet height="100%">
                <v-row class="px-10">
                  <v-col cols="12">
                    <v-card class="elevation-0">
                      <v-card-text style="text-align: center">
                        <v-avatar
                          color="grey-darken-3"
                          image="@/assets/img/logo_pink.jpg"
                        ></v-avatar>
                        <p style="font-size: 16px; font-weight: 500">
                          Jimena, Ingeniería en Gestión Empresarial.
                        </p>
                        <p>1 año y medio de colaboración.</p>

                        <p class="pt-5">
                          Gracias al Programa de Vinculación Laboral encontré un
                          empleo acorde a mi carrera y horarios escolares.
                          Aprendí mucho y desarrollé un puesto que ahora es
                          clave para la empresa, lo cual ha sido una experiencia
                          enriquecedora.
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

      <div class="text-center bg-associated-companies">
        <v-container class="pt-10 pb-6" max-width="lg" fluid>
          <v-row justify="center" align="center">
            <v-col cols="12">
              <h2 class="text-center">ALIADOS</h2>
              <h3>¿Quieres ser parte de esta red de impacto? <br /></h3>
              <p>
                Conviértete en aliado y contribuye al desarrollo de nuevas
                generaciones.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="12" md="4">
              <v-img
                src="@/assets/img/logo.png"
                alt="Aliado 1"
                contain
                height="60"
              ></v-img>
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                src="@/assets/img/logo.png"
                alt="Aliado 2"
                contain
                height="60"
              ></v-img>
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                src="@/assets/img/logo.png"
                alt="Aliado 3"
                contain
                height="60"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div ref="contactSection" class="text-center pt-10">
        <v-container class="" max-width="lg" fluid>
          <v-row justify="center" align="center">
            <v-col cols="12">
              <h2 class="text-center" style="color: #ff7900">CONTÁCTANOS</h2>
            </v-col>

            <v-col cols="12" md="4" class="info-block">
              <h3>
                <v-icon size="small">mdi-timer</v-icon> Horarios de atención
              </h3>
              <p>Lunes a Viernes: 9:00 AM - 5:00 PM</p>
            </v-col>

            <v-col cols="12" md="4" class="info-block">
              <h3>
                <v-icon size="small">mdi-email</v-icon> Correo electrónico
              </h3>
              <p>
                <a href="mailto:contacto@impulsouniversitario.com">
                  vinculacion.laboral@iu.org.mx
                </a>
              </p>
            </v-col>

            <v-col cols="12" md="4" class="info-block">
              <h3><v-icon size="small">mdi-phone</v-icon> Teléfono</h3>
              <p>
                <a href="tel:+521234567890">+52 999 359 7411</a>
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
            :key="icon.red"
            :icon="icon.red"
            class="mx-4"
            variant="text"
            @click="openUrl(icon.url)"
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
const contactSection = ref<HTMLElement | null>(null);

const images = [
  {
    src: "https://iu.org.mx/wp-content/uploads/2025/01/pvl_bg_2-scaled.jpg",
    alt: "Slide 1",
    title: "DA EL PRIMER PASO EN TU CARRERA",
  },
  {
    src: "https://iu.org.mx/wp-content/uploads/2025/01/pvl_bg_3-scaled.jpg",
    alt: "Slide 2",
    title: "ENCUENTRA EL PERFIL IDEAL PARA TU EMPRESA",
  },
  {
    src: "https://iu.org.mx/wp-content/uploads/2025/01/pvl_bg_1-min-scaled.jpg",
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
  {
    red: "mdi-facebook",
    url: "https://www.facebook.com/impulsouniversitarioac",
  },
  {
    red: "mdi-instagram",
    url: "https://www.instagram.com/impulsouniversitario/",
  },
]);

const scrollToContact = () => {
  if (contactSection.value) {
    contactSection.value.scrollIntoView({ behavior: "smooth" });
  }
};

const openUrl = (url: string) => {
  window.open(url, "_blank");
};
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

.bg-associated-companies {
  background-color: #ff7900;
  color: white;
}
</style>
