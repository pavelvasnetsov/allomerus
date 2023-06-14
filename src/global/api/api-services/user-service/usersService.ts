import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "../utils/createApiInstance";
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    UpdateRequest,
    UpdateResponse,
    User
} from "./types";

const API_URL = import.meta.env.VITE_API_USERS_URL;

const userServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _UserService {
    async register(body: RegisterRequest): Promise<RegisterResponse> {
        const response: AxiosResponse = await userServiceInstance.post('/register', body);

        return response.data;
    }

    async login(body: LoginRequest): Promise<LoginResponse> {
        const response: AxiosResponse = await userServiceInstance.post('/login', body);

        return response.data;
    }

    async update(payload: UpdateRequest): Promise<UpdateResponse> {
        const form: FormData = new FormData();

        form.append('username', payload.username);
        form.append('firstName', payload.firstName);
        form.append('lastName', payload.lastName);
        form.append('bio', payload.bio);
        form.append('roles', payload.roles[0]);
        form.append('avatar', payload.avatar);

        const response: AxiosResponse = await userServiceInstance.post('/update', form);

        return response.data;
    }

    async me(): Promise<User> {
        const response: AxiosResponse = await userServiceInstance.get('/me');

        return response.data;
    }

    async getUserById(id: number): Promise<User> {
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
