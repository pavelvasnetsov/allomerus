import {UserService, RegisterRequest, LoginResponse, LoginRequest} from "@/global/api";
import { IStoreModule } from "@/global/types";

export const registration: IStoreModule = {
    namespaced: true,
    state: () => ({

    }),
    getters: {

    },
    mutations: {

    },
    actions: {
        async registration({}, registrationRequest: RegisterRequest): Promise<void> {
            try {
                await UserService.register(registrationRequest);

                const loginRequest: LoginRequest = {
                    login: registrationRequest.username,
                    password: registrationRequest.password
                };

                const loginResponse: LoginResponse = await UserService.login(loginRequest);

                localStorage.setItem("access_token", loginResponse.accessToken);
                localStorage.setItem("refresh_token", loginResponse.refreshToken);
            } catch (e) {
                console.error(e);
            } finally {

            }
        }
    }
};