//@ts-ignore
import {IStoreModule} from "@/global/types";
//@ts-ignore
import {isAuthorized} from "@/global/utils";

interface CheckingAuthorizationState {
    isAuthorized: boolean;
}

export const checkingAuthorization: IStoreModule = {
    namespaced: true,
    state: (): CheckingAuthorizationState => ({
        isAuthorized: isAuthorized()
    }),
    getters: {
        isAuthorized: (state: CheckingAuthorizationState): boolean => state.isAuthorized
    },
    mutations: {
        SET_IS_AUTHORIZED: (state: CheckingAuthorizationState, isAuthorized: boolean): void => {
            state.isAuthorized = isAuthorized;
        }
    },
    actions: {}
};