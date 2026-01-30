import { model, Schema } from 'mongoose';
import type { RoleType } from '../../src/const/role.const';
import type { _UserType } from '../../src/schemas/auth.schema';

const UserSchema = new Schema<_UserType>(
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

const User = model<_UserType>('auth', UserSchema);

export { User };
