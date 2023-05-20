import { UserService, RegisterRequest } from "@/global/api";
import { IStoreModule } from "../../../../global/types";
import axios from "axios";

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
                // const response = await UserService.register(registrationRequest)
                

                // const loginData = {
                //     login: registrationRequest.username,
                //     password: registrationRequest.password || 'password',
                // };

                // const responseLogin = await UsersService.login(loginData);


                // localStorage.setItem("access_token", responseLogin.accessToken);
                // localStorage.setItem("refresh_token", responseLogin.refreshToken);
            } catch (e) {
                console.log(e);
            } finally {

            }
        }
    }
};