export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    bio: string;
    role: string;
}

interface RegisterResponseSuccess {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    status: string;
    bio: string;
    avatar: string;
    loginSource: string;
    roles: string[];
}

export type RegisterResponse = RegisterResponseSuccess;