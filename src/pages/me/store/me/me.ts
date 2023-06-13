import {ContextParam, IStoreModule} from "@/global/types";
import {User} from "@/global/api";
import UserService from "@/global/api/api-services/user-service/usersService";
import {AxiosError} from "axios";

interface AuthorizationState {
    meInfo: User;
}
export const me: IStoreModule = {
    namespaced: true,
    state: (): AuthorizationState => ({
        meInfo: {
            id: 0,
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            status: '',
            bio: '',
            avatar: '',
            loginSource: '',
            roles: [''],
        }
    }),
    getters: {
        meInfo: (state: AuthorizationState): User => state.meInfo,
        roles: (state: AuthorizationState): string[] => state.meInfo.roles
    },
    mutations: {
        SET_ME_INFO(state: AuthorizationState, payload: User): void {
            state.meInfo = payload;
        }
    },
    actions: {
        async getMeInfo({ commit }: ContextParam<AuthorizationState>): Promise<void> {
            try {
                const response: User = await UserService.me();

                commit('SET_ME_INFO', response);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                throw new Error(e.response.data.message);
            }
        }
    }
};