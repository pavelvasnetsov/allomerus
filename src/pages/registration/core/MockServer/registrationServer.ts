import { IRegistrationRequest, IRegistrationResponse } from "../types";
import { AuthorizationServer } from "../../../authorization";

abstract class RegistrationServer extends AuthorizationServer {
    static async registration(body: IRegistrationRequest): Promise<IRegistrationResponse> {
        const modBody: IRegistrationRequest = {
            ...body
        };

        delete modBody?.role;
        delete modBody?.password;
        
        const response: IRegistrationResponse = {
            id: Date.now(),
            ...modBody,
            status: 'status',
            avatar: 'https://avatar',
            loginSource: 'loginSource',
            roles: ['role1', 'role2']

        };

        return response;
    }
}

export default RegistrationServer;