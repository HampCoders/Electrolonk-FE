/**
 * @fileoverview Router configuration for the ACME Learning Center application
 * Defines all router and navigation behavior for the application
 */

import { createRouter, createWebHistory } from 'vue-router'

/**
 * @description Lazy-loaded component imports for route configuration
 * Using dynamic imports to enable code splitting and improve initial load performance
 */

const HomeComponent = () => import('../public/pages/home.component.vue')
const AboutComponent = () => import('../public/pages/about.component.vue')
const RegisterTechnicianComponent = () => import('../public/pages/register-technician.component.vue')
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue')
const TechnicianSearchComponent = () => import('../public/pages/technician-search.component.vue');
const ReviewManagementComponent =() => import('../contractingManagement/pages/review-management.component.vue');


const routes = [
  { path: '/home', name: 'home', component: HomeComponent, meta: { title: 'Home' } },
  { path: '/about', name: 'about', component: AboutComponent, meta: { title: 'About us' } },
  { path: '/registro-tecnico', name: 'register', component: RegisterTechnicianComponent, meta: { title: 'Registrar Técnico' } },
  { path: '/buscar-ip', name: 'ip-search', component: TechnicianSearchComponent, meta: { title: 'Buscar por IP' } },
  { path: '/', name: 'default', redirect: { name: 'home' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFoundComponent, meta: { title: 'Page not found' } },
  { path: '/contratacion-reviews', name: 'reviews', component: ReviewManagementComponent, meta: { title: 'Reviews' } },

]

/**
 * @type {import('vue-router').Router}
 * @description Vue Router instance configured with HTML5 history mode
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

/**
 * @description Global navigation guard that runs before each route change
 * Handles:
 * - Navigation logging
 * - Dynamic page title updates based on route metadata
 */
router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.name || 'N/A'} to ${to.name || 'N/A'}`)
  const baseTitle = 'ACME Learning Center'
  document.title = `${baseTitle} | ${to.meta.title || 'ElectroLink'}`
  next()
})

export default router
