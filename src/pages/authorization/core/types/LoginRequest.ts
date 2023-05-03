export interface ILoginRequest {
    login: string;
    password: string;
}

export interface ILoginResponse {
    login: string;
    password: string;
    accessToken: string;
    refreshToken: string;
}