import { ILoginRequest, ILoginResponse } from "../types";

abstract class AuthorizationServer {
    static async login(body: ILoginRequest): Promise<ILoginResponse> {
        const response: ILoginResponse = {
            ...body,
            accessToken: 'access_token',
            refreshToken:'refresh_token'
        };
        
        return response;
    }
}

export default AuthorizationServer;