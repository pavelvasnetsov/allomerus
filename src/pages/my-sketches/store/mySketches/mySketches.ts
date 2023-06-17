import {ContextParam, IStoreModule} from "@/global/types";
import {ContentService, Sketch, SketchesListQueryParams, SketchesListResponse} from "@/global/api";
import {AxiosError} from "axios";

interface MySketchesState {
    sketches: Sketch[],
    sketchesCount: number
}
export const mySketches: IStoreModule = {
    namespaced: true,
    state: (): MySketchesState => ({
        sketches: [],
        sketchesCount: 0
    }),
    getters: {
        sketches: ({sketches}: MySketchesState): Sketch[] => sketches,
        sketchesCount: ({sketchesCount}: MySketchesState): number => sketchesCount
    },
    mutations: {
        SET_SKETCHES(state: MySketchesState, payload: Sketch[]): void {
            state.sketches = payload;
        },
        SET_SKETCHES_COUNT(state: MySketchesState, payload: number): void {
            state.sketchesCount = payload;
        }
    },
    actions: {
        async getMySketches({commit}: ContextParam<MySketchesState>, query: SketchesListQueryParams = {}): Promise<void> {
            try {
                commit('loader/SET_SHOW', true, {root: true});
                const data: SketchesListResponse = await ContentService.getMySketches(query);

                commit('SET_SKETCHES', data.data);
                commit('SET_SKETCHES_COUNT', data.count);
                commit('loader/SET_SHOW', false, {root: true});
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                commit('loader/SET_SHOW', false, {root: true});
                throw new Error(e.response.data.message);
            }
        }
    }
};