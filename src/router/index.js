import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/liver',
    name: 'liver',
    component: () => import(/* webpackChunkName: "about" */ '../views/Liver.vue')
  },
  {
    path: '/viewer',
    name: 'viewer',
    component: () => import(/* webpackChunkName: "about" */ '../views/Viewer.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../test/father.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
