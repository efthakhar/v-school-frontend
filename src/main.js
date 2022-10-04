
import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthInfo } from './stores/authinfo'



import App from './App.vue'
import router from './router'

import './assets/main.css'

axios.defaults.withCredentials = true



// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
  }, 
  function (error) {
   
    if (error.response && error.response.status === 401)
     {
         //console.log(error.response.data.message)
         if(error.response.data.message==='Unauthenticated.')
         {
          useAuthInfo().logout()
         } 

    }
    return Promise.reject(error);
  })




const app = createApp(App)


app.use(createPinia())

app.use(router)


axios.defaults.baseURL ='http://127.0.0.1:8000';
app.config.globalProperties.api_url = 'http://127.0.0.1:8000'


app.mount('#app')
