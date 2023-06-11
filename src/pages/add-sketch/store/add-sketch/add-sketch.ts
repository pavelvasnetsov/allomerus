import {ContextParam, IStoreModule} from "@/global/types";
import {ContentService, CreateSketchPayload, Sketch} from "@/global/api";
import {AxiosError} from "axios";
interface AddSketchState {
    access: 'public',
}
export const addSketch: IStoreModule = {
    namespaced: true,
    state: (): AddSketchState => ({
        access: 'public'
    }),
    getters: {
    },
    mutations: {

    },
    actions: {
        async createSketch({commit, state}: ContextParam<AddSketchState>, payload: CreateSketchPayload) {
            try {
                payload.access = state.access;

                const data: Sketch = await ContentService.createSketch(payload);

                console.log(data);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                throw new Error(e.response.data.message);
            }
        },
    }
};