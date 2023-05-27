import {AuthorizationServer, ILoginResponse} from "../../core";
import { ILoginRequest } from "../../core";
import { IStoreModule } from "@/global/types";

export const authorization: IStoreModule = {
    namespaced: true,
    state: () => ({

    }),
    getters: {

    },
    mutations: {

    },
    actions: {
        async login({}, loginRequest: ILoginRequest): Promise<void> {
            try {
                const response: ILoginResponse = await AuthorizationServer.login(loginRequest);
                localStorage.setItem("access_token", response.accessToken);
                localStorage.setItem("refresh_token", response.refreshToken);
            } catch (e) {
                console.log(e);
            } finally {

            }
        }
    }
};