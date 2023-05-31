import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "../utils/createApiInstance";
import {
    Comment,
    CommentCount,
    CommentPayload,
    Like,
    LikeCount,
    ReviewQueryParams,
    CommentQueryParams,
    LikeQueryParams,
    ReviewPayload,
    Review
} from './types';
import {toQueryString} from "@/global/api/api-services/utils/toQueryString";

const API_URL = import.meta.env.VITE_API_METADATA_URL;

const metadataServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _MetadataService {
    async getReviewsBySketchId(sketchId: string): Promise<Review[]> {
        const response: AxiosResponse = await metadataServiceInstance.get(`/review/${sketchId}`);

        return response.data;
    }

    async  updateReviewBySketchId(sketchId: string, payload: ReviewPayload): Promise<Review> {
        const response: AxiosResponse = await metadataServiceInstance.put(`/review/${sketchId}`, payload);

        return response.data;
    }

    async createReviewBySketchId(sketchId: string, payload: ReviewPayload): Promise<Review> {
        const response: AxiosResponse = await metadataServiceInstance.post(`/review/${sketchId}`, payload);

        return response.data;
    }

    async getReviewsCountBySketchId(query: ReviewQueryParams): Promise<CommentCount[]> {
        const queryParams = toQueryString(query);

        const response: AxiosResponse = await metadataServiceInstance.get(`/review/count?${queryParams}`);

        return response.data;
    }

    async deleteReviewsBySketchId(query: ReviewQueryParams): Promise<string> {
        const queryParams = toQueryString(query);

        const response: AxiosResponse = await metadataServiceInstance.delete(`/review?${queryParams}`);

        return response.data;
    }

    async getLikesBySketchId(query: LikeQueryParams): Promise<Like[]> {
        const queryParams = toQueryString(query);

        const response: AxiosResponse = await metadataServiceInstance.get(`/like?${queryParams}`);

        return response.data;
    }

    async getLikesCountBySketchId(query: LikeQueryParams): Promise<LikeCount[]> {
        const queryParams = toQueryString(query);

        const response: AxiosResponse = await metadataServiceInstance.get(`/like/count?${queryParams}`);

        return response.data;
    }

    async createLikesBySketchId(query: LikeQueryParams): Promise<Like[]> {
        const queryParams = toQueryString(query);

        const response: AxiosResponse = await metadataServiceInstance.post(`/like?${queryParams}`);

        return response.data;
    }

    async deleteLikesBySketchId(query: LikeQueryParams): Promise<string> {
        const queryParams = toQueryString(query);

        const response: AxiosResponse = await metadataServiceInstance.delete(`/like?${queryParams}`);

        return response.data;
    }

    async createCommentBySketchId(sketchId: string, payload: CommentPayload): Promise<Comment> {
        const response: AxiosResponse = await metadataServiceInstance.post(`/comment/${sketchId}`, payload);

        return response.data;
    }

    async updateCommentByCommentId(commentId: string, payload: CommentPayload): Promise<Comment> {
        const response: AxiosResponse = await metadataServiceInstance.put(`/comment/${commentId}`, payload);

        return response.data;
    }

    async deleteCommentByCommentId(commentId: string): Promise<string> {
        const response: AxiosResponse = await metadataServiceInstance.delete(`/comment/${commentId}`);

        return response.data;
    }

    async getCommentsBySketchId(sketchId: string): Promise<Comment[]> {
        const response: AxiosResponse = await metadataServiceInstance.get(`/comment/${sketchId}`);

        return response.data;
    }

    async getCommentsCountBySketchId(query: CommentQueryParams): Promise<CommentCount[]> {
        const queryParams = toQueryString(query);

        const response: AxiosResponse = await metadataServiceInstance.get(`/comment/count?${queryParams}`);

        return response.data;
    }
}

const MetadataService = new _MetadataService();

export default MetadataService;