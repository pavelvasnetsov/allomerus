import {ContentService, Sketch, SketchesListQueryParams, SketchesListResponse} from "@/global/api";
import {ContextParam, IStoreModule} from "@/global/types";
import {AxiosError} from "axios";

interface SketchesState {
    sketches: Sketch[],
    sketchesCount: number
}
export const sketches: IStoreModule = {
    namespaced: true,
    state: (): SketchesState => ({
        sketches: [],
        sketchesCount: 0
    }),
    getters: {
        sketches: ({sketches}: SketchesState): Sketch[] => sketches,
        sketchesCount: ({sketchesCount}: SketchesState): number => sketchesCount
    },
    mutations: {
        SET_SKETCHES(state: SketchesState, payload: Sketch[]): void {
            state.sketches = payload;
        },
        SET_SKETCHES_COUNT(state: SketchesState, payload: number): void {
            state.sketchesCount = payload;
        }
    },
    actions: {
        async getSketches({commit}: ContextParam<SketchesState>, query: SketchesListQueryParams = {}): Promise<void> {
            try {
                const data: SketchesListResponse = await ContentService.getSketches(query);

                commit('SET_SKETCHES', data.data);
                commit('SET_SKETCHES_COUNT', data.count);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                throw new Error(e.response.data.message);
            }
        }
    }
};