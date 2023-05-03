export interface IRegistrationRequest {
    username: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    bio: string;
    role?: string;
}

export interface IRegistrationResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    bio: string;
    avatar: string;
    loginSource: string;
    roles: string[];
}