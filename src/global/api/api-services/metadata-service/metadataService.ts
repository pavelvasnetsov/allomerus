import { AxiosInstance } from "axios";
import createApiInstance from "../createApiInstance";

const API_URL = import.meta.env.VITE_API_METADATA_URL;

const metadataService: AxiosInstance = createApiInstance(API_URL);



export default metadataService;