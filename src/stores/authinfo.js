import { defineStore } from 'pinia'

export const useAuthInfo = defineStore('authInfo', {

    state: () =>
     ({ 
        
        user: JSON.parse(localStorage.getItem('user')),
        permissions:[
         'session_create','session_view','session_update','session_delete',
         'class_create','class_view','class_update','class_delete',
         'building_create','building_view','building_update','building_delete',
         'dashboard'
        ]

     }),

    getters: {
      getAuthUser:  (state) => state.user ,
      getPermissions: (state) => state.permissions
    },

    actions: {
     
     logout(){
        
        localStorage.setItem('user', null)
        window.location.reload(true)
        
      },

     login(user){ 

         localStorage.setItem('user',JSON.stringify(user) )
         window.location.reload(true)
         
     }

    },
})
