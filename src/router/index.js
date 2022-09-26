import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthInfo } from '../stores/authinfo.js'

const router = createRouter({

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
            component: () =>  import('../views/academic/session/sessions.vue'),
            meta: { permissions:['session_view']}
          
          },
          {
            name:'add-session',
            path: 'sessions/add-session',
            component: () =>  import('../views/academic/session/add-session.vue'),
            meta: { permissions:['session_create']}
          },
          {
            name:'edit-session',
            path: 'sessions/edit-session/:id',
            component: () =>  import('../views/academic/session/edit-session.vue'),
            meta: { permissions:['session_update']}
          },
          {
            name:'view-session',
            path: 'sessions/view-session/:id',
            component: () =>  import('../views/academic/session/view-session.vue'),
            meta: { permissions:['session_view']}
          },
          
          
        ],
    },
   
  ]

})


/// Universal Auth middle ware
router.beforeEach(async (to, from,next) => {

    let authInfo = useAuthInfo()
    let required_permissions = to.meta.permissions || []
    let user_permissions = authInfo.getPermissions

    
    if( to.name =='login' || to.name == 'register' ) 
    {
          if(JSON.parse(authInfo.getLog) === true)
          { 
            next({ name: 'dashboard' })
          }else{
            next()
          }

    }else{

          if(JSON.parse(authInfo.getLog) == false)
          { 
              console.log('not allowed')
              next({ name: 'login' })

          }else{
           
              let permittied = false
              
               required_permissions.forEach(permission => {

                user_permissions.includes(permission)? permittied = true : false

              });

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
