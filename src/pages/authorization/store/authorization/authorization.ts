import { UserService } from "@/global/api";
import { ILoginRequest, ILoginResponse } from "../../core";
import { IStoreModule } from "../../../../global/types";

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
                const response = await UserService.login(loginRequest);
                console.log(response);
                
                // localStorage.setItem("access_token", response.accessToken);
                // localStorage.setItem("refresh_token", response.refreshToken);
            } catch (e) {
                console.log(e);
            } finally {

            }
        }
    }
};