import jwt from 'jsonwebtoken';

type TokenType = {
  _id: string;
};

const ENV = {
  JWT_SECRET: 'some super secret',
};

const signToken = (data: TokenType) =>
  jwt.sign(data, ENV.JWT_SECRET, {
    expiresIn: '7 day',
  });

const verifyToken = (data: string) =>
  jwt.verify(data, ENV.JWT_SECRET) as TokenType;

export { signToken, verifyToken };
