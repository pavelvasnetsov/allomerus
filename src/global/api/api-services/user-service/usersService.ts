import { AxiosInstance, AxiosResponse } from "axios";
import createApiInstance from "../utils/createApiInstance";
import {
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    LoginResponse,
    UpdateRequest,
    UpdateResponse,
    UserResponse
} from "./types";

const API_URL = import.meta.env.VITE_API_USERS_URL;

const userServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _UserService {
    async register(body: RegisterRequest): Promise<RegisterResponse> {
        const response: AxiosResponse = await userServiceInstance.post('/register', body);
        const data: RegisterResponse = response.data;

        return data;
    }

    async login(body: LoginRequest): Promise<LoginResponse>{
        const response: AxiosResponse = await userServiceInstance.post('/login', body);
        const data: LoginResponse = response.data;

        return data;
    }

    async update(body: UpdateRequest): Promise<UpdateResponse> {
        const response: AxiosResponse = await userServiceInstance.post('/update', body); 
        const data: UpdateResponse = response.data;
        
        return data;
    }

    async me(): Promise<UserResponse> {
        const response: AxiosResponse = await userServiceInstance.get('/me'); 
        const data: UserResponse = response.data;
        
        return data;
    }

    async getUserById(id: number): Promise<UserResponse> {
        const response: AxiosResponse = await userServiceInstance.get(`?id=${id}`); 
        const data: UserResponse = response.data;
        
        return data;
    }

    async deleteMe() {
        await userServiceInstance.delete(`/delete`); 
    }
}

const UserService = new _UserService();

export default UserService;