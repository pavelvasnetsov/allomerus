import {ContextParam, IStoreModule} from "@/global/types";
import {Comment, ContentService, Like, MetadataService, Sketch} from "@/global/api";
import {AxiosError} from "axios";

interface SketchState {
    sketchInfo: Sketch,
    sketchLikes: Like[],
    sketchComments: Comment[]
}
export const sketch: IStoreModule = {
    namespaced: true,
    state: (): SketchState => ({
        sketchInfo: {
            id: '',
            authorEmail: '',
            authorName: '',
            access: '',
            tags: [],
            publicationDate: '',
            name: '',
            description: '',
            files: [],
        },
        sketchLikes: [],
        sketchComments: []
    }),
    getters: {
        sketchInfo: ({sketchInfo}: SketchState) => sketchInfo,
        countLikes: ({sketchLikes}: SketchState) => sketchLikes.length,
        thereIsMyLike: ({sketchLikes}: SketchState) => (username: string) => !!sketchLikes.find((like: Like) => like.user === username),
        sketchComments: ({sketchComments}: SketchState) => sketchComments
    },
    mutations: {
        SET_SKETCH_INFO(state: SketchState, payload: Sketch): void {
            state.sketchInfo = payload;
        },
        SET_SKETCH_LIKES(state: SketchState, payload: Like[]): void {
            state.sketchLikes = payload;
        },
        ADD_SKETCH_LIKE(state: SketchState, payload: Like[]): void {
            state.sketchLikes.push(...payload);
        },
        DELETE_SKETCH_LIKE(state: SketchState, payload: string): void {
            const likeIndex = state.sketchLikes.findIndex((like: Like) => like.user === payload);
            state.sketchLikes.splice(likeIndex, 1);
        },
        SET_SKETCH_COMMENTS(state: SketchState, payload: Comment[]): void {
            state.sketchComments = payload.reverse();
        },
        ADD_SKETCH_COMMENT(state: SketchState, payload: Comment): void {
            state.sketchComments.unshift(payload);
        },
        DELETE_SKETCH_COMMENT(state: SketchState, payload: string): void {
            const deletedCommentIndex = state.sketchComments.findIndex((comment: Comment) => comment.id === payload);

            state.sketchComments.splice(deletedCommentIndex, 1);
        }
    },
    actions: {
        async getSketch({commit}: ContextParam<SketchState>, id: string) {
            try {
                const data = await ContentService.getSketchById(id);

                commit('SET_SKETCH_INFO', data);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                commit('loader/SET_SHOW', false, {root: true});
                throw new Error(e.response.data.message);
            }
        },

        async deleteSketch({commit}: ContextParam<SketchState>, sketchId: string) {
            try {
                await ContentService.deleteSketchById(sketchId);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                throw new Error(e.response.data.message);
            }
        },

        async getSketchLikes({commit}: ContextParam<SketchState>, sketchId: string) {
            try {
                const data: Like[] = await MetadataService.getLikesBySketchId({
                    sketch: [sketchId]
                });

                commit('SET_SKETCH_LIKES', data);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                commit('loader/SET_SHOW', false, {root: true});
                throw new Error(e.response.data.message);
            }
        },

        async likeSketch({commit}: ContextParam<SketchState>, sketchId: string) {
            try {
                const data: Like[] = await MetadataService.createLikesBySketchId({
                    sketch: [sketchId]
                });

                commit('ADD_SKETCH_LIKE', data);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                throw new Error(e.response.data.message);
            }
        },

        async deleteLikeSketch({commit}: ContextParam<SketchState>, {
            sketchId,
            userEmail
        } : {
            sketchId: string,
            userEmail: string
        }) {
            try {
                await MetadataService.deleteLikesBySketchId({
                    sketch: [sketchId]
                });

                commit('DELETE_SKETCH_LIKE', userEmail);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                throw new Error(e.response.data.message);
            }
        },

        async getSketchComments({commit}: ContextParam<Sketch>, sketchId: string) {
            try {
                const data: Comment[] = await MetadataService.getCommentsBySketchId(sketchId);

                commit('SET_SKETCH_COMMENTS', data);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                commit('loader/SET_SHOW', false, {root: true});
                throw new Error(e.response.data.message);
            }
        },

        async createSketchComment({commit}: ContextParam<Sketch>, {
            sketchId,
            payload
        } : {
            sketchId: string,
            payload: {
                text: string
            }
        }) {
            try {
                const data: Comment = await MetadataService.createCommentBySketchId(sketchId, payload);

                commit('ADD_SKETCH_COMMENT', data);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                throw new Error(e.response.data.message);
            }
        },

        async deleteSketchComment({commit}: ContextParam<SketchState>, commentId: string) {
            try {
                await MetadataService.deleteCommentByCommentId(commentId);
                commit('DELETE_SKETCH_COMMENT', commentId);
            } catch (e: AxiosError | any) {
                commit('snackbar/SET_MESSAGE', e.response.data.message, {root: true});
                commit('snackbar/SET_SHOW', true, {root: true});
                throw new Error(e.response.data.message);
            }
        },
    }
};