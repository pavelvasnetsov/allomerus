import {UserService, RegisterRequest, LoginRequest} from "@/global/api";
import {ContextParam, IStoreModule} from "@/global/types";
import {AxiosError} from "axios";

export const registration: IStoreModule = {
    namespaced: true,
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {
        async registration({dispatch, commit}: ContextParam<any>, registrationRequest: RegisterRequest): Promise<void> {
            try {
                await UserService.register(registrationRequest);

                const loginRequest: LoginRequest = {
                    login: registrationRequest.email,
                    password: registrationRequest.password
                };

                dispatch('authorization/login', loginRequest, {root: true});
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                throw new Error(e.response.data.message);
            }
        }
    }
};