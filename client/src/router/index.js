import { createRouter, createWebHistory } from 'vue-router'
import { headerStore } from '@/stores/header.js'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/HomeView.vue')
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('@/views/Play/PlayView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/LoginView.vue')
    },
    {
      path: '/singin',
      name: 'singin',
      component: () => import('@/views/Singin/SinginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  /**
   * cada vez que se cambia se ruta se comprueba si se navega hacia el login o singin 
   * para quitar el header y footer
   */
  setTimeout(() => {
    headerStore().isInAuth(to.path)
    next();
  })
})

export default router
