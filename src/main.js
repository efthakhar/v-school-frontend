
import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'



import App from './App.vue'
import router from './router'

import './assets/main.css'

axios.defaults.withCredentials = true

const app = createApp(App)


app.use(createPinia())

app.use(router)


app.config.globalProperties.api_url = 'http://127.0.0.1:8000'
app.mount('#app')
