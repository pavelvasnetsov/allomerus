import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "../utils/createApiInstance";
import {
    Comment,
    CommentCount,
    ErrorResponse,
    Like,
    LikeCount,
    ReviewQueryParams,
    CommentQueryParams,
    LikeQueryParams,
    ReviewPayload,
    Review
} from './types';

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

    async getReviewCountBySketchId(sketchesIDs: ): Promise
}

const MetadataService = new _MetadataService();

export default MetadataService;