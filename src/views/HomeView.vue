<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="11">
        <v-sheet elevation="4" class="pa-5 rounded-lg">
          <!-- Título -->
          <h2 class="text-center font-weight-bold text-h5 mb-4">
            DECÁLOGO PARA LA INCLUSIÓN LABORAL DE JÓVENES
          </h2>

          <!-- Imagen -->
          <v-row justify="center" class="mb-5">
            <v-col cols="12" md="6" lg="4">
              <v-img src="@/assets/img/logo_jovenes.png" height="150"></v-img>
            </v-col>
          </v-row>

          <!-- Introducción -->
          <v-card class="pa-4" style="background-color: #ffce00">
            <v-card-text>
              <p class="text-body-1 text-justify">
                <b>Impulso Universitario A.C.,</b> pertenece al grupo
                coordinador de la alianza <b>Jóvenes con Trabajo Digno</b>, cuya
                misión es promover el ejercicio del derecho al trabajo digno de
                jóvenes en México.
              </p>
              <p class="text-body-1 text-justify">
                Este decálogo busca impulsar la contratación equitativa de
                jóvenes, especialmente de aquellos en situación de desventaja,
                garantizando un enfoque basado en derechos y en la no
                discriminación.
              </p>
            </v-card-text>
          </v-card>

          <!-- Expansión de puntos del decálogo -->
          <v-expansion-panels multiple class="mt-5">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <strong> 1. Asumir compromiso público. </strong>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Asumir un compromiso público con el principio de “no
                discriminación”. Presentar las acciones verificables para
                erradicar la discriminación en los centros de trabajo e incluir
                acciones específicas para jóvenes y mujeres. Tener la leyenda de
                inclusión, diversidad e igualdad de oportunidades en oficinas de
                RRHH y sitios Web de la organización.
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <strong>
                  2. Seleccionar con base en el perfil del puesto.
                </strong>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Garantizar que la selección se realice con base en el potencial,
                la experiencia y las habilidades del aspirante para desempeñar
                el puesto de trabajo ofertado, definido desde el inicio.
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <strong> 3. Evitar hacer diferencias subjetivas. </strong>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Solicitar currículum vitae sin fotografía y seleccionar sin
                hacer diferencias por edad, género, lugar de nacimiento, lugar
                de residencia, apariencia física, etnia u otras condiciones que
                aludan a diferencias subjetivas o que afecten la dignidad de las
                personas.
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <strong>
                  4. Respetar la esfera privada de los aspirantes.</strong
                >
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Evitar preguntas sobre datos sensibles en las entrevistas y
                formularios de solicitud, tales como la condición de salud, la
                orientación o preferencia sexual, religión, estado civil, uso de
                tatuajes, y cualquier información que no sea relevante para el
                perfil de trabajo. Evitar solicitar la carta de antecedentes no
                penales.
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <strong>
                  5. Solicitar la información médica indispensable.</strong
                >
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Solicitar información médica o de condiciones de salud sólo
                después de la contratación, evitando pedir pruebas de embarazo o
                VIH. Las pruebas de consumo de drogas, de alcohol, o de
                confianza (polígrafo), solamente son aceptables cuando sean
                indispensables por el perfil del puesto.
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <strong>
                  6. Dar información completa del proceso de selección.</strong
                >
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Dar información completa del proceso de selección. Desde el
                inicio informar a los solicitantes los pasos del proceso de
                reclutamiento, así como los resultados obtenidos en cada paso.
                Informar cuando no han sido seleccionados, dándoles
                retroalimentación que les ayude en el futuro.
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <strong> 7. Tener acciones afirmativas para mujeres.</strong>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Posibilitar condiciones que favorecen la inclusión laboral de
                mujeres, entre otras: jornada compatible con familia y escuelas,
                espacios de lactancia, acceso a centros de cuidado infantil y
                preferencia de contratación cuando sea factible.
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <strong> 8. Tener acciones afirmativas para jovenes.</strong>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Ofrecer jornadas de trabajo compatibles con estudios, incluyendo
                empleos de medio tiempo, prácticas laborales y planes de
                capacitación continua, formas de aprendizaje, posibilidades de
                crecimiento y desarrollo profesional.
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <strong>
                  9. Favorecer la accesibilidad y fomentar la
                  diversidad.</strong
                >
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                Favorecer las condiciones de accesibilidad para la inserción
                laboral de personas con discapacidad y de otras
                vulnerabilidades, y fomentar la diversidad en términos de
                género, etnia, orientación sexual, religión, lugar de
                procedencia, entre otras.
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <strong> 10. Cumplir derechos laborales.</strong>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <b
                  >Cumplir totalmente las normas laborales del derecho al
                  trabajo digno, entre otras:</b
                >
                <v-row class="mx-5 my-1">
                  <v-col cols="12" lg="12" md="12">
                    <ul>
                      <li>
                        A trabajo igual, salario igual, sin distinción entre
                        hombres y mujeres, o entre jóvenes y no jóvenes.
                      </li>
                      <li>
                        Remuneración suficiente para quien trabaja y su familia
                        (no menor al costo de la canasta básica para dos
                        personas).
                      </li>
                      <li>Afiliación a la seguridad social.</li>
                      <li>
                        Jornada de trabajo máxima de 48 horas a la semana con un
                        día de descanso, vacaciones y pago de horas extra.
                      </li>
                      <li>Seguridad e higiene en el trabajo.</li>
                      <li>Acceso a formación y capacitación continua.</li>
                      <li>
                        Libertad de afiliación sindical y negociación colectiva.
                      </li>
                      <li>
                        Normas Oficiales como la NMX 025 (En igualdad laboral y
                        no discriminación), NOM 035 (Factores de riesgo
                        psicosocial en el trabajo), entre otras.
                      </li>
                    </ul>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- Imagen Final -->
          <v-row justify="center" class="my-5">
            <v-col cols="12" md="10">
              <v-img
                class="rounded-lg elevation-3"
                src="@/assets/img/datos_yucatan.jpg"
              ></v-img>
            </v-col>
          </v-row>

          <!-- Botón de Acción -->
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <p class="text-body-1">
                Para conocer más acerca de la alianza
                <b>Jóvenes con Trabajo Digno</b>, visita el siguiente enlace:
              </p>
              <v-btn
                color="primary"
                variant="elevated"
                href="https://www.jovenescontrabajodigno.mx/"
                target="_blank"
                class="mt-3"
              >
                Ir al sitio oficial
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const decálogo = [
  {
    titulo: "Asumir compromiso público",
    descripcion:
      "Asumir un compromiso público con el principio de 'no discriminación'...",
  },
  {
    titulo: "Seleccionar con base en el perfil del puesto",
    descripcion:
      "Garantizar que la selección se realice con base en el potencial...",
  },
  {
    titulo: "Evitar hacer diferencias subjetivas",
    descripcion:
      "Solicitar currículum vitae sin fotografía y seleccionar sin diferencias...",
  },
  {
    titulo: "Respetar la esfera privada de los aspirantes",
    descripcion:
      "Evitar preguntas sobre datos sensibles en entrevistas y formularios...",
  },
  {
    titulo: "Solicitar la información médica indispensable",
    descripcion:
      "Solicitar información médica solo después de la contratación...",
  },
  {
    titulo: "Dar información completa del proceso de selección",
    descripcion:
      "Informar a los solicitantes los pasos del proceso de reclutamiento...",
  },
  {
    titulo: "Tener acciones afirmativas para mujeres",
    descripcion:
      "Posibilitar condiciones que favorecen la inclusión laboral de mujeres...",
  },
  {
    titulo: "Tener acciones afirmativas para jóvenes",
    descripcion:
      "Ofrecer jornadas de trabajo compatibles con estudios, incluyendo empleos de medio tiempo...",
  },
  {
    titulo: "Favorecer la accesibilidad y fomentar la diversidad",
    descripcion:
      "Favorecer las condiciones de accesibilidad y fomentar la diversidad en los centros de trabajo...",
  },
  {
    titulo: "Cumplir derechos laborales",
    descripcion:
      "Cumplir totalmente las normas laborales del derecho al trabajo digno...",
  },
];
</script>
