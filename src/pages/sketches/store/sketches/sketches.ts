import {ContentService, Sketch, SketchesListQueryParams} from "@/global/api";
import {ContextParam, IStoreModule} from "@/global/types";
import {AxiosError} from "axios";

interface SketchesState {
    sketches: Sketch[]
}
export const sketches: IStoreModule = {
    namespaced: true,
    state: (): SketchesState => ({
        sketches: []
    }),
    getters: {
        sketches: ({sketches}: SketchesState): Sketch[] => sketches
    },
    mutations: {
        SET_SKETCHES(state: SketchesState, payload: Sketch[]): void {
            state.sketches = payload;
        }
    },
    actions: {
        async getSketches({commit}: ContextParam<SketchesState>, query: SketchesListQueryParams = {}): Promise<void> {
            try {
                const data: Sketch[] = await ContentService.getSketches(query);

                commit('SET_SKETCHES', data);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                throw new Error(e.response.data.message);
            }
        }
    }
};