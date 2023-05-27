import { AxiosInstance } from "axios";
import createApiInstance from "../utils/createApiInstance";

const API_URL = import.meta.env.VITE_API_METADATA_URL;

const metadataServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _MetadataService {

}

const MetadataService = new _MetadataService();

export default MetadataService;