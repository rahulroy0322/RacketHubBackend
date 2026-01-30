import z from 'zod';
import type { Prettify } from '../@types/utils';
import { userRoles } from '../const/role.const';

const passwordSchema = z
  .string('Password must be a string')
  .min(8, 'Password must be at least 8 characters')
  .regex(/(?:.*[a-z]){2,}/, 'Must contain at least 2 lowercase letters')
  .regex(/(?:.*[A-Z]){2,}/, 'Must contain at least 2 uppercase letters')
  .regex(/(?:.*[0-9]){2,}/, 'Must contain at least 2 numbers')
  .regex(
    /(?:.*[^a-zA-Z0-9]){2,}/,
    'Must contain at least 2 special characters'
  );

const userSchema = z.object({
  name: z.string('Name is required').min(1, 'Name is required'),
  email: z.email(),
  password: passwordSchema,
  role: z.enum(userRoles).default('user'),
});

const registerSchema = userSchema;

const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

type _UserType = z.infer<typeof userSchema>;

type UserType = Prettify<
  {
    _id: string;
  } & Omit<_UserType, 'password'>
>;

export type { _UserType, UserType };

export { registerSchema, loginSchema };
