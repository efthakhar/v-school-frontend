import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthInfo } from '../stores/authinfo.js'
import axios from 'axios'

const router = createRouter({
  mode: 'history',
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: 
  [
    {
      path: '/',
      name: 'application',
      component: () =>  import('../App.vue'),
      
    },
    {
      path: '/users',
      name: 'users',
      component: () =>  import('../views/Users.vue'),
      
    },

    {
      path: '/register',
      name: 'register',
      component: () =>  import('../views/register.vue'),
      
    },
    {
      path: '/login',
      name: 'login',
      component: () =>  import('../views/login.vue'),
      
    },

    {
        // dashboard
        path: '/dashboard',
        name: 'dashboard',
        redirect: { name: 'overview' },
        component: () =>  import('../views/dashboard/dashboard.vue'),

        children: [
           // dashboard overview
          {
            name:'overview',
            path: 'overview',
            component: () =>  import('../views/dashboard/overview.vue'),
            meta: { permissions:['dashboard']}
          },
           // session
          {
            name:'sessions',
            path: 'sessions',
            component: () =>  import('../modules/academic/session/views/sessions.vue'),
            meta: { permissions:'session_view'} 
          },
          // class
          {
            name:'classes',
            path: 'classes',
            component: () =>  import('../modules/academic/class/views/classes.vue'),
            meta: { permissions:['class_view']}
          },

          // building
          {
            name:'buildings',
            path: 'buildings',
            component: () =>  import('../modules/academic/building/views/buildings.vue'),
            meta: { permissions:['building_view']}
          },
          
          // room
          {
            name:'rooms',
            path: 'rooms',
            component: () =>  import('../modules/academic/room/views/rooms.vue'),
            meta: { permissions:['room_view']}
          },




          
          
        ],
    },
   
  ]

})





/// Universal Auth middle ware
router.beforeEach(async (to, from,next) => {
    
  let authInfo = useAuthInfo()
  let user = JSON.parse(localStorage.getItem('user'))
  
  if( to.name =='login' || to.name == 'register') 
  {      
        if(user)
        { 
          next({ name: 'dashboard' })
        }else{
          next()
        }

  }else{

       
        if(!user)
        {   
            console.log('not allowed')
            next({ name: 'login' })

        }else{
          let required_permissions = to.meta.permissions || []
          let user_permissions = authInfo.getPermissions
         
             let permittied = false
             
            if( !Array.isArray(required_permissions)) 
            {
              user_permissions.includes(required_permissions)? permittied = true : false

            }else{

              required_permissions.forEach(permission => {

                user_permissions.includes(permission)? permittied = true : false
 
              });

            }


            if(permittied==true){
               next()
            }else{
              console.log('not_allowed')
              next({ name: 'dashboard' })
            }
        } 

  }


})



export default router
