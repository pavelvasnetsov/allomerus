import { AxiosInstance } from "axios";
import createApiInstance from "../createApiInstance";

const API_URL = import.meta.env.VITE_API_CONTENT_URL;

const contentService: AxiosInstance = createApiInstance(API_URL);



export default contentService;