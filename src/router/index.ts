import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { authorizationRouter } from "../pages/authorization";
import { meRouter } from "../pages/me";
import { registrationRouter } from "../pages/registration";
import { sketchesRouter } from "../pages/sketches";

const routes: Array<RouteRecordRaw> = [
    ...authorizationRouter,
    ...meRouter,
    ...registrationRouter,
    ...sketchesRouter
];

console.log(routes);


const router = createRouter({
    routes,
    history: createWebHashHistory(import.meta.env.VITE_BASE_URL)
});

export default router;