export enum UserRoles {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SELLER = 'SELLER',
}
export interface UserProfileType {
    id: string;
    email: string;
    username: string;
    role: UserRoles;
}