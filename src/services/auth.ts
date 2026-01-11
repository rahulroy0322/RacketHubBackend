import { User } from '../models/user.model';
import type { UserType } from '../schemas/auth.schema';

type _UserType = UserType & {
  _id: string;
};

const getUserByEmail = (email: string): Promise<_UserType | null> =>
  User.findOne({
    email,
  });

const getUserById = (id: string): Promise<_UserType | null> =>
  User.findById(id);

const createUser = (user: UserType): Promise<_UserType | null> =>
  User.create(user) as unknown as Promise<_UserType>;

export { getUserByEmail, createUser, getUserById };
