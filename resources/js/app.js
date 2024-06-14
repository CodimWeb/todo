// import './bootstrap';
import { createApp } from "vue";
import App from './App.vue'
import router from "./router/index.js";
import {myCustomLightTheme} from "./theme.js";
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'



const vuetify = createVuetify({
    defaultTheme: 'myCustomLightTheme',
    themes: {
        myCustomLightTheme,
    },
    components,
    directives,
})

createApp(App).use(router).use(vuetify).mount('#root')
