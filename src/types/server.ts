import { NextResponse } from 'next/server';
import ServerError from './error';

class Response {
  static success<T>(data: T) {
    return NextResponse.json({ success: true, data }, { status: 200 });
  }

  static error(message: string, status: number) {
    return new ServerError(message, status);
  }

  static parseError(err: unknown) {
    return ServerError.from(err).message;
  }
}

export default Response;
