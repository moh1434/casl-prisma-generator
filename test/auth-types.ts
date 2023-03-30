//In reality this types will be imported from @prisma/client
enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
type User = {
  id: string;
  type: UserType;
  password: String;
  createdAt: Date;
};
//

//Our override type:
export type JwtUser = Omit<User, 'password'>;
