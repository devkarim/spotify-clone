import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ErrorResponse } from './api';

class ServerError extends Error {
  constructor(message: string, private statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  res() {
    return NextResponse.json(
      { success: false, message: this.message },
      { status: this.statusCode }
    );
  }

  static from(err: unknown) {
    if (err instanceof ZodError) {
      return ServerError.fromZod(err);
    } else if (err instanceof AxiosError) {
      return ServerError.fromAxios(err);
    } else if (err instanceof Error) {
      return ServerError.fromError(err);
    }
    return ServerError.fromError(new Error('Internal server error.'));
  }

  static fromAxios(err: AxiosError) {
    return new ServerError(
      (err.response?.data as ErrorResponse)?.message ||
        'Internal server error.',
      err.status || 500
    );
  }

  static fromError(err: Error) {
    return new ServerError(err.message, 400);
  }

  static fromZod(err: ZodError) {
    const message = err.errors[0].message;
    return new ServerError(message, 400);
  }
}

export default ServerError;
