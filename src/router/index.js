import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () =>  import('../components/home.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () =>  import('../components/about.vue')
      },
   
  ]
})

export default router
