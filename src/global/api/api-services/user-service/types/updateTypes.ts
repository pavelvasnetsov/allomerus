import { ErrorResponse } from "./errorResponseTypes";

export interface UpdateRequest {
    username: string;
    firstName: string;
    lastName: string;
    bio: string;
    roles: string[];
    avatar: string;
};

interface UpdateResponseSuccess {
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
};

export type UpdateResponse =
    UpdateResponseSuccess |
    ErrorResponse;