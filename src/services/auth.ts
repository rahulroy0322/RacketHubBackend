import { User } from '../models/user.model';
import type { _UserType, UserType } from '../schemas/auth.schema';

const getUserByEmail = (email: string): Promise<UserType | null> =>
  User.findOne({
    email,
  });

const getUserById = (id: string): Promise<UserType | null> => User.findById(id);

const createUser = (user: _UserType): Promise<UserType | null> =>
  User.create(user) as unknown as Promise<UserType>;

export { getUserByEmail, createUser, getUserById };
