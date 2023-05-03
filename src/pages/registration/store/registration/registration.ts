import { RegistrationServer } from "../../core";
import { IRegistrationRequest  } from "../../core";
import { IStoreModule } from "../../../../global/types";

export const registration: IStoreModule = {
    namespaced: true,
    state: () => ({

    }),
    getters: {

    },
    mutations: {

    },
    actions: {
        async registration({}, registrationRequest: IRegistrationRequest): Promise<void> {
            try {
                await RegistrationServer.registration(registrationRequest);

                const loginData = {
                    login: registrationRequest.username,
                    password: registrationRequest.password || 'password',
                };

                const responseLogin = await RegistrationServer.login(loginData);


                localStorage.setItem("access_token", responseLogin.accessToken);
                localStorage.setItem("refresh_token", responseLogin.refreshToken);
            } catch (e) {
                console.log(e);
            } finally {

            }
        }
    }
};