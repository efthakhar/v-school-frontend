import { defineStore } from 'pinia'

export const useAuthInfo = defineStore('authInfo', {

    state: () =>
     ({ 
        log: localStorage.getItem('auth') ,
        user: localStorage.getItem('user'),
        permissions:[
         'session_create','session_view','session_update','session_delete',
         'dashboard'
      ]
     }),

    getters: {

      getLog: (state) => state.log,
      getAuthUser:  (state) => JSON.parse(state.user) ,
      getPermissions: (state) => state.permissions
    },

    actions: {

     logout(){
        localStorage.setItem('auth',false)
        this.log = false
        localStorage.setItem('user', '')
        window.location.reload(true)
        //console.log(JSON.parse(this.user))
        
      },

     login(user){ 

         localStorage.setItem('auth', true)
         this.log =  true

         localStorage.setItem('user',JSON.stringify(user) )
         window.location.reload(true)
        //  console.log(JSON.parse(this.user))
     }

    },
})
