import SketchWrapper from "../SketchWrapper.vue";

export const sketchRouter = [
    {
        path: "/sketches/:sketchId",
        name: "sketch",
        component: SketchWrapper
    }
];