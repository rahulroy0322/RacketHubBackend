import type { ZodError as ZE } from 'zod';

type MetaType = Record<string, unknown>;

type ZodErrorType = {
  path: string;
  code: string;
  message: string;
};

const formatZodError = (e: ZE) =>
  e.issues.reduce((acc, { code, path, message }) => {
    acc.push({
      path: path.join('.'),
      message,
      code,
    });

    return acc;
  }, [] as ZodErrorType[]);

// Errors
class AppError extends Error {
  override name = 'AppError';
  constructor(
    message: string,
    public status = 500,
    public meta: MetaType = {}
  ) {
    super(message);
  }
}

// 4**
class ZodError extends AppError {
  override name = 'ZodError';
  // @ts-expect-error
  meta: {
    errors: ZodErrorType[];
  };

  constructor(error: ZE, msg = 'Invalid credentials provided!') {
    super(msg, 400, {
      errors: formatZodError(error),
    });
  }
}

class BadError extends AppError {
  override name = 'BadError';

  constructor(msg = 'Invalid credentials provided!', meta: unknown = {}) {
    super(msg, 400, meta as MetaType);
  }
}

class ExpiredError extends AppError {
  override name = 'Token Expired Error';

  constructor(msg = 'Token Expired!', meta: unknown = {}) {
    super(msg, 401, meta as MetaType);
  }
}

class UnAuthenticatedError extends AppError {
  override name = 'UnAuthenticatedError';

  constructor(msg = 'Token Required!', meta: unknown = {}) {
    super(msg, 401, meta as MetaType);
  }
}

class ForbidenError extends AppError {
  override name = 'ForbidenError';

  constructor(msg = "You Don't Sufficient permition", meta: unknown = {}) {
    super(msg, 403, meta as MetaType);
  }
}

//5**
class ServerError extends AppError {
  override name = 'ServerError';

  constructor(msg = 'Something went wrong!', meta: unknown = {}) {
    super(msg, 500, meta as MetaType);
  }
}

class ServiceError extends AppError {
  override name = 'ServiceError';

  constructor(msg = 'Service not ablleable!', meta: unknown = {}) {
    // TODO!
    super(msg, 503, meta as MetaType);
  }
}

export type { MetaType };

export {
  AppError,
  // 4**
  ZodError,
  BadError,
  ExpiredError,
  UnAuthenticatedError,
  ForbidenError,
  // 5**
  ServerError,
  ServiceError,
};
