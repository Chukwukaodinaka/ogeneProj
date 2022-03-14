import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import { IonicVue } from '@ionic/vue';

loadFonts()

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

createApp(App)
    .use(router)
    .use(vuetify)
    .use(IonicVue)
    .mount('#app')
