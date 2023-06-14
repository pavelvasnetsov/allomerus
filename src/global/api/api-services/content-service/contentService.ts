import { AxiosInstance, AxiosResponse } from "axios";
import createApiInstance from "../utils/createApiInstance";
import {
    Tag,
    Sketch,
    UpdateSketchPayload,
    CreateSketchPayload,
    SketchesListQueryParams,
    MeSketchesListQueryParams,
    CreateTagPayload,
    UpdateTagPayload, SketchesListResponse
} from './types';
import { toQueryString } from "@/global/api/api-services/utils/toQueryString";

const API_URL = import.meta.env.VITE_API_CONTENT_URL;

const contentServiceInstance: AxiosInstance = createApiInstance(API_URL);
class _ContentService {
    async getSketches(query: SketchesListQueryParams): Promise<SketchesListResponse> {
        const queryParams = toQueryString(query);

        const response: AxiosResponse = await contentServiceInstance.get(`/sketches${queryParams}`);

        return response.data;
    }

    async getSketchById(id: string): Promise<Sketch> {
        const response: AxiosResponse = await contentServiceInstance.get(`/sketches/${id}`);

        return response.data;
    }

    async getMySketches(query: MeSketchesListQueryParams): Promise<SketchesListResponse> {
        const queryParams = toQueryString(query);

        const response: AxiosResponse = await contentServiceInstance.get(`/sketches/me${queryParams}`);

        return response.data;
    }

    async createSketch(payload: CreateSketchPayload): Promise<Sketch> {
        const form: FormData = new FormData();

        form.append('access', payload.access);
        payload.tags.forEach(tag => {
            form.append('tags', tag);
        });
        form.append('name', payload.name);
        form.append('description', payload.description);
        payload.files.forEach(file => {
            form.append('files', file);
        })

        const response: AxiosResponse = await contentServiceInstance.post(`/sketches`, form);

        return response.data;
    }

    async updateSketchById(id: number, payload: UpdateSketchPayload): Promise<Sketch> {
        const response: AxiosResponse = await contentServiceInstance.put(`/sketches/${id}`, payload);

        return response.data;
    }

    async deleteSketchById(id: string) {
        const response: AxiosResponse = await contentServiceInstance.delete(`/sketches/${id}`);

        return response.data;
    }

    async getTags(): Promise<Tag[]> {
        const response: AxiosResponse = await contentServiceInstance.get(`/tags`);

        return response.data;
    }

    async getTagById(id: number): Promise<Tag> {
        const response: AxiosResponse = await contentServiceInstance.get(`/tags/${id}`);

        return response.data;
    }

    async createTag(payload: CreateTagPayload): Promise<Tag> {
        const response: AxiosResponse = await contentServiceInstance.post(`/tags`, payload);

        return response.data;
    }

    async updateTagById(id: number, payload: UpdateTagPayload): Promise<Tag>{
        const response: AxiosResponse = await contentServiceInstance.put(`/tags/${id}`, payload);

        return response.data;
    }

    async deleteTagById(id: number): Promise<string> {
        const response: AxiosResponse = await contentServiceInstance.delete(`/tags/${id}`);

        return response.data;
    }
}

const ContentService = new _ContentService();

export default ContentService;