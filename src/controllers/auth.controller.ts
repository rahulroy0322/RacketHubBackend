import type { RequestHandler } from 'express';
import type { ResType } from '../@types/res';
import { BadError, ServerError } from '../error/app.error';
import {
  type _UserType,
  loginSchema,
  registerSchema,
} from '../schemas/auth.schema';
import { createUser, getUserByEmail, getUserById } from '../services/auth';
import { hashPassword, validPassword } from '../utils/hash';
import { signToken } from '../utils/token';

const getProfileController: RequestHandler = async (req, res) => {
  if (!req.userId) {
    throw new Error("some event dosn't handled properly!");
  }
  const _user = await getUserById(req.userId);

  if (!_user) {
    res.status(400);
    throw new Error('your account had been deleted!');
  }

  const { _id, name, email, role } = _user;

  res.status(200).json({
    success: true,
    data: {
      user: {
        _id,
        name,
        email,
        role,
      },
    },
  } satisfies ResType);
};

const registerController: RequestHandler = async (req, res) => {
  const valid = registerSchema.safeParse(req.body);

  if (!valid.success) {
    res.status(400).json({
      success: false,
      error: valid.error,
    } satisfies ResType);
    return;
  }

  const { data } = valid;
  const exists = await getUserByEmail(data.email);

  if (exists) {
    throw new BadError('User Already Exists!');
  }

  const passwd = data.password;

  data.password = await hashPassword(passwd);

  const _user = await createUser(data);

  if (!_user) {
    throw new ServerError('something went wrong');
  }
  const { _id, name, email, role } = _user;

  const token = signToken({
    _id: _id,
  });

  res.status(201).json({
    success: true,
    data: {
      user: {
        _id,
        name,
        email,
        role,
      },
      token,
    },
  } satisfies ResType);
};

const loginController: RequestHandler = async (req, res) => {
  const valid = loginSchema.safeParse(req.body);

  if (!valid.success) {
    res.status(400).json({
      success: false,
      error: valid.error,
    } satisfies ResType);
    return;
  }

  const { data } = valid;

  const _user = await getUserByEmail(data.email);

  if (!_user) {
    throw new BadError('Email or Password is invalid!');
  }

  if (
    !(await validPassword({
      current: data.password,
      hash: (_user as unknown as _UserType).password,
    }))
  ) {
    throw new BadError('Email or Password is invalid!');
  }

  const { _id, name, email, role } = _user;

  const token = signToken({
    _id: _id,
  });

  res.status(200).json({
    success: true,
    data: {
      user: {
        _id,
        name,
        email,
        role,
      },
      token,
    },
  } satisfies ResType);
};

export { getProfileController, registerController, loginController };
