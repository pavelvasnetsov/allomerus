import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "../utils/createApiInstance";
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    UpdateRequest,
    UpdateResponse,
    UserResponse
} from "./types";

const API_URL = import.meta.env.VITE_API_USERS_URL;

const userServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _UserService {
    async register(body: RegisterRequest): Promise<RegisterResponse> {
        const response: AxiosResponse = await userServiceInstance.post('/register', body);

        return response.data;
    }

    async login(body: LoginRequest): Promise<LoginResponse>{
        const response: AxiosResponse = await userServiceInstance.post('/login', body);

        return response.data;
    }

    async update(body: UpdateRequest): Promise<UpdateResponse> {
        const response: AxiosResponse = await userServiceInstance.post('/update', body);

        return response.data;
    }

    async me(): Promise<UserResponse> {
        const response: AxiosResponse = await userServiceInstance.get('/me');

        return response.data;
    }

    async getUserById(id: number): Promise<UserResponse> {
        const response: AxiosResponse = await userServiceInstance.get(`?id=${id}`);

        return response.data;
    }

    async deleteMe(): Promise<string> {
        const response: AxiosResponse = await userServiceInstance.delete(`/delete`);

        return response.data;
    }
}

const UserService = new _UserService();

export default UserService;