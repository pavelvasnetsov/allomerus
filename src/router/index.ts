import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import {authorizationRouter} from "@/pages/authorization";
import {meRouter} from "@/pages/me";
import {registrationRouter} from "@/pages/registration";
import {sketchesRouter} from "@/pages/sketches";
import {addSketchRouter} from "@/pages/add-sketch";
import {sketchRouter} from "@/pages/sketch";
import {mySketchesRouter} from "@/pages/my-sketches";

const routes: Array<RouteRecordRaw> = [
    ...authorizationRouter,
    ...meRouter,
    ...registrationRouter,
    ...sketchesRouter,
    ...addSketchRouter,
    ...sketchRouter,
    ...mySketchesRouter,
    {
        path: '/:catchAll(.*)',
        redirect: '/authorization'
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;