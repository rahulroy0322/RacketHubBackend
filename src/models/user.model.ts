import { model, Schema } from 'mongoose';
import type { RoleType } from '../constants/role.const';
import type { UserType } from '../schemas/auth.schema';

const UserSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: 'user' satisfies RoleType,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<UserType>('auth', UserSchema);

export { User };
