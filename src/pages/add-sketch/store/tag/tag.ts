import {ContextParam, IStoreModule} from "@/global/types";
import {ContentService, CreateTagPayload, Tag} from "@/global/api";
import {AxiosError} from "axios";

interface TagState {
    tags: Tag[];
}

export const tag: IStoreModule = {
    namespaced: true,
    state: (): TagState => ({
        tags: []
    }),
    getters: {
        tags: ({tags}: TagState): Tag[] => tags
    },
    mutations: {
        ADD_TAG(state: TagState, payload: Tag): void {
            state.tags.push(payload);
        },
        SET_TAGS(state: TagState, payload: Tag[]): void {
            state.tags = payload;
        }
    },
    actions: {
        async createTag({commit}: ContextParam, payload: CreateTagPayload) {
            try {
                const data: Tag = await ContentService.createTag(payload);
                commit('ADD_TAG', data);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                throw new Error(e.response.data.message);
            }
        },
        async getAllTags({commit}: ContextParam) {
            try {
                const data: Tag[] = await ContentService.getTags();
                commit('SET_TAGS', data);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
            }
        }
    }
};