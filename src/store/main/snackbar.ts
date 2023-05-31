import {IStoreModule} from "@/global/types";

interface SnackbarState {
    message: string;
    show: boolean;
}

export const snackbar: IStoreModule = {
    namespaced: true,
    state: (): SnackbarState => ({
        message: 'Ошибка',
        show: false
    }),
    getters: {
        message: (state: SnackbarState): string => state.message,
        show: (state: SnackbarState): boolean => state.show,
    },
    mutations: {
        SET_MESSAGE(state: SnackbarState, payload: string): void {
            state.message = payload;
        },
        SET_SHOW(state: SnackbarState, payload: boolean): void {
            console.log(payload)
            state.show = payload;
        }
    },
    actions: {}
};