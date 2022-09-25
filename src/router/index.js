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
        path: '/dashboard',
        name: 'dashboard',
        component: () =>  import('../views/dashboard.vue'),
        children: [
          {
            path: 'sessions',
            component: () =>  import('../views/academic/sessions.vue'),
          },
          
        ],
    },
   
  ]

})





/// Universal Auth middle ware
router.beforeEach(async (to, from) => {

    const authStatus = useAuthInfo()
    //console.log(authStatus.getAuthUser.id)

    if( to.name =='login' || to.name == 'register' ) 
    {
          if(JSON.parse(authStatus.getLog) === true)
          { 
            return { name: 'dashboard' }
          }
    }else{
          if(JSON.parse(authStatus.getLog) == false)
          { 
            console.log('not allowed')
            return { name: 'login' }
          } 
    }
 

})

export default router
