import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap'

axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;

const app = createApp(App)
app.config.performance = true

app
    .use(createPinia())
    .use(router)
    .use(BootstrapVue3)
    .mount("#app")