import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores"

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labsComponents from 'vuetify/labs/components'
import { es } from 'vuetify/locale'

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

const myCustomLightTheme = {
    dark: false,
    colors: {
        primary: '#275FFC',
    },
}

const vuetify = createVuetify({
    locale: {
        locale: "es",
        fallback: "es",
        messages: { es },
    },
    directives,
    components: {
        ...components,
        ...labsComponents,
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        },
    },
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(pinia)
app.mount("#app");

router.isReady().then(() => {
    const preloader = document.getElementById('preloader')
    if (preloader) {
        preloader.style.display = 'none'
    }
})