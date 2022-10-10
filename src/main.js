
import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthInfo } from './stores/authinfo'
import { useNotificationStore } from './stores/notifications'


import App from './App.vue'
import router from './router'

import './assets/main.css'

axios.defaults.withCredentials = true


// Add a response interceptor
axios.interceptors.response.use(

  function (response) {
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

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  
  ////  Prevent create,update and delete operation in demo version ////

  //  if(config.method == "post"||config.method == "put"||config.method == "delete"){

  //     const notifcationStore = useNotificationStore()
  //     notifcationStore.pushNotification({
  //         'message':'ডেমো ভার্সনে এই ফিচারটি ব্যবহার করতে পারবেন না',
  //         'type'   :'error',
  //         'time':9000
  //   })
  //   return

  //  }

  return config;

}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


const app = createApp(App)


app.use(createPinia())

app.use(router)


axios.defaults.baseURL ='http://127.0.0.1:8000';
app.config.globalProperties.api_url = 'http://127.0.0.1:8000'


app.mount('#app')
