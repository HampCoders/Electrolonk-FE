/**
 * @fileoverview Router configuration for the ACME Learning Center application
 * Defines all router and navigation behavior for the application
 */

import {createRouter, createWebHistory} from "vue-router";


/**
 * @description Lazy-loaded component imports for route configuration
 * Using dynamic imports to enable code splitting and improve initial load performance
 */

const HomeComponent = () => import('../public/pages/home.component.vue');
const AboutComponent = () => import('../public/pages/about.component.vue');
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');
const DashboardView = () => import('../domains/dashboard/views/dashboard-view.vue');
const SchedulePage = () => import('../domains/schedule/pages/schedule-page.vue');
const InventoryPage = () => import('../domains/inventory/pages/inventory-page.vue');
const ScheduleManagementComponent = () => import('../domains/schedule/pages/schedule-management.component.vue');
/**
 * @type {import('vue-router').RouteRecordRaw[]}
 * @description Application route definitions.
 * Each route object contains:
 * - path: URL path for the route
 * - name: Unique identifier for the route
 * - component: Vue component to render
 * - meta: Additional metadata including page title
 */
const routes = [
    {   path: '/home',                  name: 'home',       component: HomeComponent,               meta: {title: 'Home'}},
    {   path: '/about',                 name: 'about',      component: AboutComponent,              meta: {title: 'About us'}},
    {   path: '/',                      name: 'dashboard',  component: DashboardView,               meta: { title: 'Dashboard' } },
    {   path: '/schedule',              name: 'schedule',   component: ScheduleManagementComponent, meta: { title: 'Gestión de Agenda' } },
    {   path: '/inventory',             name: 'inventory',  component: InventoryPage,               meta: { title: 'Gestión de Inventario' } },
    {   path: '/:pathMatch(.*)*',       name: 'not-found',  component: PageNotFoundComponent,       meta: {title: 'Page not found'}},
]

/**
 * @type {import('vue-router').Router}
 * @description Vue Router instance configured with HTML5 history mode
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,

});

/**
 * @description Global navigation guard that runs before each route change
 * Handles:
 * - Navigation logging
 * - Dynamic page title updates based on route metadata
 *
 * @param {import('vue-router').RouteLocationNormalized} to - Target route
 * @param {import('vue-router').RouteLocationNormalized} from - Current route
 * @param {import('vue-router').NavigationGuardNext} next - Function to resolve the navigation
 */

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    // Set the page title
    let baseTitle = 'ElectroLink';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;