//@ts-ignore
import { IStoreModule } from "@/global/types";
//@ts-ignore
import { isAuthorized } from "@/global/utils";

export const checkingAuthorization: IStoreModule = {
    namespaced: true,
    state: () => ({
        isAuthorized: isAuthorized()
    }),
    getters: {
        isAuthorized: (state: any) => state.isAuthorized
    },
    mutations: {
        SET_IS_AUTHORIZED: (state: any, isAuthorized: boolean) => {
            state.isAuthorized = isAuthorized;
        }
    },
    actions: {
    }
};