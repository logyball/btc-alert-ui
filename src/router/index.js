import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'home',
    component: HomeView,
    meta: {}
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {}
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: {}
  },
  {
    path: '/alerts/list',
    name: 'alertsList',
    component: () => import('../views/AlertsListView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/alerts/add',
    name: 'alertAdd',
    component: () => import('../views/AlertAddView.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  const authStore = useAuthStore()
  const authRequired = routeTo.matched.some((route) => route.meta.requiresAuth)

  if (!authRequired) return next()
  authStore.$state.isLoggedIn ? next() : redirectToLogin()
  
  function redirectToLogin() {
    next({ path: '/login', query: { redirectFrom: routeTo.fullPath } })
  }
})

export default router
