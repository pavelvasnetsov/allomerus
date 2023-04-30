import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [

];

const router = createRouter({
    routes,
    history: createWebHashHistory(import.meta.env.VITE_BASE_URL)
});

export default router