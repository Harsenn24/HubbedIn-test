export interface UserUpdateDto {
    id: string;
    name: string | null;
    email: string | null;
    birthday: Date | null;
    timezone: string | null;
}

export interface UserCreateDto {
    name: string;
    email: string;
    birthday: Date;
    timezone: string;
}

export interface UserDeleteDto {
    id: string
}