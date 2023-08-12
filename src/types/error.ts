import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { ErrorResponse } from './api';

class ServerError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  static new(message: string, statusCode: number) {
    return new ServerError(message, statusCode);
  }

  static from(err: unknown) {
    if (err instanceof ZodError) {
      return ServerError.fromZod(err);
    } else if (err instanceof AxiosError) {
      return ServerError.fromAxios(err);
    } else if (err instanceof Error) {
      return ServerError.fromError(err);
    }
    return ServerError.fromError(new Error('Internal server error'));
  }

  static fromAxios(err: AxiosError) {
    return new ServerError(
      (err.response?.data as ErrorResponse)?.message || 'Internal server error',
      err.status || 500
    );
  }

  static fromError(err: Error) {
    return new ServerError(err.message, 500);
  }

  static fromZod(err: ZodError) {
    const message = err.errors[0].message;
    return new ServerError(message, 400);
  }
}

export default ServerError;
