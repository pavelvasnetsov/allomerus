interface UserResponseSuccess {
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

export type UserResponse = UserResponseSuccess;