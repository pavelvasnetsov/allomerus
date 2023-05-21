import { AxiosInstance } from "axios";
import createApiInstance from "../createApiInstance";

const API_URL = import.meta.env.VITE_API_CONTENT_URL;

const contentServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _ContentService {
    async getSketches() {
        
    }

    async getSketchById(id: number) {

    }

    async getMySketches() {

    }

    async createSketch() {

    }

    async updateSketchById(id: number) {

    }

    async deleteSketchById(id: number) {

    }

    async getTags() {

    }

    async getTagById(id: number) {

    }

    async createTag() {

    }

    async updateTagById(id: number) {

    }

    async deleteTagById(id: number) {

    }
}

const ContentService = new _ContentService();

export default ContentService;