import {IStoreModule} from "@/global/types";

interface SnackbarState {
    message: string;
    show: boolean;
    color: string;
}

interface SuccessSnackbar {
    show: boolean;
    color: 'green';
}

export const snackbar: IStoreModule = {
    namespaced: true,
    state: (): SnackbarState => ({
        message: 'Ошибка',
        show: false,
        color: 'red'
    }),
    getters: {
        message: (state: SnackbarState): string => state.message,
        show: (state: SnackbarState): boolean => state.show,
        color: (state: SnackbarState): string => state.color
    },
    mutations: {
        SET_MESSAGE(state: SnackbarState, payload: string): void {
            state.message = payload;
        },
        SET_SHOW(state: SnackbarState, payload: boolean | SuccessSnackbar): void {
            if (typeof payload === 'boolean') {
                state.show = payload;
                state.color = 'red';
            } else {
                state.show = payload.show;
                state.color = payload.color;
            }

        }
    },
    actions: {}
};