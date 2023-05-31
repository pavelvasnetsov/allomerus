import {ContextParam, IStoreModule} from "@/global/types";
import {LoginRequest, LoginResponse} from "@/global/api";
import UserService from "../../../../global/api/api-services/user-service/usersService";
import {AxiosError} from "axios";

export const authorization: IStoreModule = {
    namespaced: true,
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {
        async login({commit}: ContextParam, payload: LoginRequest): Promise<void> {
            try {
                const response: LoginResponse = await UserService.login(payload);
                localStorage.setItem("access_token", response.accessToken);
                localStorage.setItem("refresh_token", response.refreshToken);
                commit('checkingAuthorization/SET_IS_AUTHORIZED', true, {root: true})
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                throw new Error(e.response.data.message);
            }
        }
    }
};