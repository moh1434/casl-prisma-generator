declare enum UserType {
    ADMIN = "ADMIN",
    USER = "USER"
}
type User = {
    id: string;
    type: UserType;
    password: String;
    createdAt: Date;
};
export type JwtUser = Omit<User, 'password'>;
export {};
