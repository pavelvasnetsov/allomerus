import { ErrorResponse } from "./errorResponseTypes";

export interface LoginRequest {
    login: string;
    password: string;
};

interface LoginResponseSuccess {
    login: string;
    accessToken: string;
    refreshToken: string;
};

export type LoginResponse = 
    LoginResponseSuccess | 
    ErrorResponse;