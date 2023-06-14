import {IStoreModule} from "@/global/types";

interface LoaderState {
    show: boolean;
}

export const loader: IStoreModule = {
    namespaced: true,
    state: (): LoaderState => ({
        show: false,
    }),
    getters: {
        show: (state: LoaderState): boolean => state.show,
    },
    mutations: {
        SET_SHOW(state: LoaderState, payload: boolean): void {
            state.show = payload;
        }
    },
    actions: {}
};