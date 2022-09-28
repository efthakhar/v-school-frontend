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

          // class
          {
            name:'classes',
            path: 'classes',
            component: () =>  import('../views/academic/class/classes.vue'),
            meta: { permissions:['class_view']}
          },
          {
            name:'add-class',
            path: 'classes/add-class',
            component: () =>  import('../views/academic/class/add-class.vue'),
            meta: { permissions:['class_create']}
          },
          {
            name:'edit-class',
            path: 'classes/edit-class/:id',
            component: () =>  import('../views/academic/class/edit-class.vue'),
            meta: { permissions:['class_create']}
          },
          {
            name:'view-class',
            path: 'classes/view-class/:id',
            component: () =>  import('../views/academic/class/view-class.vue'),
            meta: { permissions:['class_view']}
          },




          
          
        ],
    },
   
  ]

})


/// Universal Auth middle ware
router.beforeEach(async (to, from,next) => {
    
  let authInfo = useAuthInfo()
  let user = JSON.parse(localStorage.getItem('user'))

 // console.log(user)
  
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



// /// Universal Auth middle ware
// router.beforeEach(async (to, from,next) => {
    
//     let authInfo = useAuthInfo()
//     let logstatus =authInfo.getLog
//     console.log(logstatus)
    
//     if( to.name =='login' || to.name == 'register') 
//     {
//           //if(JSON.parse(authInfo.getLog) === true)
//           if(logstatus == true)
//           { 
//             next({ name: 'dashboard' })
//           }else{
//             next()
//           }

//     }else{

//           //if(JSON.parse(authInfo.getLog) === false)
//           if(logstatus != true)
//           {   console.log(logstatus+'sf')
//               console.log('not allowed')
//               next({ name: 'login' })

//           }else{
//             let required_permissions = to.meta.permissions || []
//             let user_permissions = authInfo.getPermissions
           
//               let permittied = false
              
//                required_permissions.forEach(permission => {

//                 user_permissions.includes(permission)? permittied = true : false

//               });

//               if(permittied==true){
//                  next()
//               }else{
//                 console.log('not_allowed')
//                 next({ name: 'dashboard' })
//               }
//           } 

//     }
 

// })

export default router
