import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.config';

type TokenType = {
  _id: string;
};

const signToken = (data: TokenType) =>
  jwt.sign(data, ENV.JWT_SECRET, {
    expiresIn: '7 day',
  });

const verifyToken = (data: string) =>
  jwt.verify(data, ENV.JWT_SECRET) as TokenType;

export { signToken, verifyToken };
